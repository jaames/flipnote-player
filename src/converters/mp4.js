import { GifImage } from 'flipnote.js';
import { saveAs } from 'file-saver';
import { FilterGraph, buildArgumentList } from '@/utils/ffmpeg.js';

const FFMPEG_WORKER_PATH = '/static/workers/ffmpeg-worker-mp4.js';
const FFMPEG_TOTAL_MEMORY_BYTES = 419430400;
// https://trac.ffmpeg.org/wiki/Encode/H.264
const FFMPEG_X264_PRESET_MAP = {
  slow: 'slow',
  medium: 'medium',
  fast: 'ultrafast'
};

export default class Mp4Converter {

  constructor() {
    this.blob = null;
    this.totalFrames = 0;
    this.scale = 1;
    this.compression = 'medium';
    this.equalizer = false;
  }
  
  onvideocomplete() {}

  onerror() {}

  onprogress(progress) {}

  init({ compression, scale, equalizer }) {
    this.compression = compression;
    this.scale = scale;
    this.equalizer = equalizer;

    return new Promise((resolve, reject) => {
      this.worker = new Worker(FFMPEG_WORKER_PATH);
      this.stdout = '';
      this.stderr = '';
      this.worker.onmessage = (e) => {
        const msg = e.data;
        switch (msg.type) {
          case 'ready':
            resolve(this);
            break;
          case 'stdout':
            this.stdout += msg.data + '\n';
            break;
          case 'stderr':
            // parse progress
            // https://gist.github.com/edwardstock/90b41d4d53af4c32853073865a319222
            const match = msg.data.match(/^frame=\s*([0-9]+)/);
            if (match) {
              const frameIndex = parseInt(match[1]);
              this.onprogress((frameIndex / this.totalFrames) * 100);
            }
            this.stderr += msg.data + '\n';
            break;
          case 'done':
            if (msg.data.MEMFS.length) {
              this.blob = new Blob([msg.data.MEMFS[0].data], {
                type: 'video/mp4'
              });
              this.oncomplete();
            } else {
              this.onerror();
              console.warn(this.stdout);
              console.warn(this.stderr);
            }
            this.worker.terminate();
            break;
          // TODO: The worker doesnt seem to post the exit message? Why is that?
          case 'exit':
            console.log('exit');
            break;
        }
      };
    });
  }

  convert(flipnote) {

    this.totalFrames = flipnote.frameCount;
    const framerate = flipnote.framerate;
    const sampleRate = flipnote.sampleRate;
    const duration = flipnote.duration;
    const preset = FFMPEG_X264_PRESET_MAP[this.compression];

    return new Promise((resolve, reject) => {
      this.oncomplete = () => {
        resolve(this);
      }

      const fileArray = [];

      // Convert frames to GIF
      const gif = GifImage.fromFlipnote(flipnote);
      fileArray.push({
        name: 'frames.gif',
        data: new Uint8Array(gif.getArrayBuffer())
      });

      const audioTrack = flipnote.getAudioMasterPcm();
      const audioRate = flipnote.sampleRate;
      fileArray.push({
        name: `audio.raw`,
        data: new Uint8Array(audioTrack.buffer)
      });

      this.worker.postMessage({
        type: 'run',
        TOTAL_MEMORY: FFMPEG_TOTAL_MEMORY_BYTES,
        MEMFS: fileArray,
        arguments: buildArgumentList([
          '-hide_banner',
          '-loglevel', 'info',
          // frame input
          '-r', framerate.toString(),
          '-i', 'frames.gif',
          // audio input
          '-f', 's16le',
          '-ar', `${ audioRate }`,
          '-ac', '1',
          '-i', `audio.raw`,
          '-vcodec', 'libx264',
          '-pix_fmt', 'yuv420p',
          '-acodec', 'aac',
          '-vf', `scale=iw*${ this.scale }:ih*${ this.scale }:flags=neighbor`,
          '-preset', preset,
          '-tune', 'animation',
          '-t', `${ Math.floor(duration / 60) }:${ duration % 60 }`,
          'out.mp4'
        ])
      });
    });
  }

  saveAs(filename) {
    saveAs(this.blob, filename);
  }
};