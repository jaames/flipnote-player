import { gifEncoder as GifEncoder } from 'flipnote.js';
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
    const bgmSampleRate = sampleRate * ((1 / flipnote.bgmrate) / (1 / flipnote.framerate));
    const duration = (1 / flipnote.framerate) * flipnote.frameCount;
    const preset = FFMPEG_X264_PRESET_MAP[this.compression];

    return new Promise((resolve, reject) => {
      this.oncomplete = () => {
        resolve(this);
      }

      const fileArray = [];

      // Convert frames to GIF
      const gif = GifEncoder.fromFlipnote(flipnote);
      fileArray.push({
        name: 'frames.gif',
        data: new Uint8Array(gif.getBuffer())
      });

      // Get a list of active audio tracks
      const tracks = Object.keys(flipnote.soundMeta).filter(key => flipnote.soundMeta[key].length > 0);

      // Convert audio tracks to raw PCM sound data
      tracks.forEach(track => {
        const pcm = flipnote.decodeAudio(track);
        fileArray.push({
          name: `${ track }.raw`,
          data: new Uint8Array(pcm.buffer)
        });
      });

      const filterGraph = new FilterGraph();
      const mixFilterInputs = [];
      let hasAudio = false;

      if ((tracks.indexOf('bgm') > -1)) {
        mixFilterInputs.push(`${ tracks.indexOf('bgm') + 1 }:0`);
        hasAudio = true;
      }

      let soundEffectIndex = 1;
      flipnote.decodeSoundFlags().forEach((frameFlags, frameIndex) => {
        const frameDelay = Math.round((1000 / flipnote.framerate) * frameIndex);
        frameFlags.forEach((flag, flagIndex) => {
          const track = ['se1', 'se2', 'se3', 'se4'][flagIndex];
          const trackIndex = tracks.indexOf(track);
          if ((trackIndex > -1) && (flag)) {
            const outputName = `e${ soundEffectIndex }`;
            mixFilterInputs.push(outputName);
            filterGraph.delay(`${ trackIndex + 1 }:0`, frameDelay, outputName);
            soundEffectIndex += 1;
            hasAudio = true;
          }
        });
      });

      filterGraph.mix(mixFilterInputs, 'mix');
      filterGraph.volume('mix', mixFilterInputs.length, 'mix_adjust');
      if (this.equalizer) {
        filterGraph.equalize('mix_adjust', [
          ['31.25', '4.1'],
          ['62.5', '1.2'],
          ['125', '0'],
          ['250', '-4.1'],
          ['500', '-2.3'],
          ['1000', '0.5'],
          ['2000', '6.5'],
          ['8000', '5.1'],
          ['16000', '5.1']
        ], 'equalized');
      }

      this.worker.postMessage({
        type: 'run',
        TOTAL_MEMORY: FFMPEG_TOTAL_MEMORY_BYTES,
        MEMFS: fileArray,
        arguments: buildArgumentList([
          '-hide_banner',
          '-loglevel', 'info',
          '-r', framerate.toString(),
          '-i', 'frames.gif',
          tracks.map(track => [
            '-f', 's16le',
            '-ar', `${ track === 'bgm' ? Math.floor(bgmSampleRate) : sampleRate }`,
            '-ac', '1',
            '-i', `${ track }.raw`,
          ]),
          '-vcodec', 'libx264',
          '-pix_fmt', 'yuv420p',
          '-acodec', 'aac',
          hasAudio ? ['-filter_complex', filterGraph.getGraph()] : null,
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