import { player as FlipnotePlayer, wavEncoder as WavEncoder } from 'flipnote.js';
import { saveAs } from 'file-saver';

export default class Mp4Converter {

  constructor() {
    this.blob = null;
    this.ffmpegError = false;
    this.totalFrames = 0;
  }
  
  onvideocomplete() {}

  onprogress(progress) {}

  init() {
    return new Promise((resolve, reject) => {
      this.worker = new Worker('/static/workers/ffmpeg-worker-mp4.js');
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
            if (!this.ffmpegError && msg.data.MEMFS.length) {
              this.blob = new Blob([msg.data.MEMFS[0].data], {
                type: 'video/mp4'
              });
              this.oncomplete();
              this.worker.terminate();
            } 
              console.warn('-------- FFMPEG ERROR --------')
              console.warn(this.stdout);
              console.warn(this.stderr);
              this.worker.terminate();
            // }
            break;
          case 'exit':
              console.log('exit');
            console.log(msg.data);
            if (msg.data === 1) { // check exit code
              this.ffmpegError = false;
              console.warn('-------- FFMPEG ERROR --------')
              console.warn(this.stdout);
              console.warn(this.stderr);
              this.worker.terminate();
            }
            break;
        }
      };
    });
  }

  getDurationString(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${ minutes }:${ seconds }`
  }

  getFlipnoteFrames(fileArray, flipnote, width, height) {
    const canvas = document.createElement('canvas');
    const player = new FlipnotePlayer(canvas, width, height);
    player.load(flipnote);
    for (let frameIndex = 0; frameIndex < flipnote.frameCount; frameIndex++) {
      player.setFrame(frameIndex);
      // get frame as jpeg image
      const dataUri = canvas.toDataURL('image/jpeg', 1);
      // convert base64 image data URI to an array of bytes
      const rawData = window.atob(dataUri.substring(23));
      const rawLength = rawData.length;
      const bytes = new Uint8Array(rawLength);
      for (let byteIndex = 0; byteIndex < rawLength; byteIndex++) {
        bytes[byteIndex] = rawData.charCodeAt(byteIndex);
      }
      fileArray.push({
        name: `${ frameIndex.toString().padStart(3, '0') }.jpeg`,
        data: bytes
      });
    }
    player.destroy();
    return fileArray;
  }

  getFlipnoteAudioTracks(fileArray, flipnote) {
    const pcmData = flipnote.decodeAudio('bgm');
    fileArray.push({
      name: `bgm.raw`,
      data: new Uint8Array(pcmData.buffer)
    });
  }

  convert(flipnote, { quality, scale, equalizer }) {

    this.totalFrames = flipnote.frameCount;
    scale = 2;
    const width = flipnote.width * 2;
    const height = flipnote.height * 2;
    const framerate = flipnote.framerate;
    const bgmSampleRate = flipnote.sampleRate * ((1 / flipnote.bgmrate) / (1 / flipnote.framerate));
    const duration = (1 / flipnote.framerate) * flipnote.frameCount;

    return new Promise((resolve, reject) => {
      this.oncomplete = () => {
        resolve(this);
      }

      const fileArray = [];

      this.getFlipnoteFrames(fileArray, flipnote, width, height);
      this.getFlipnoteAudioTracks(fileArray, flipnote);

      this.worker.postMessage({
        type: 'run',
        TOTAL_MEMORY: 268435456,
        MEMFS: fileArray,
        arguments: [
          '-hide_banner',
          // '-loglevel', 'info',
          '-s', `${ width }x${ height }`,
          '-r', `${ framerate }`,
          '-i', '%03d.jpeg',
          '-f', 's16le',
          '-ar', `${ Math.floor(bgmSampleRate) }`,
          '-ac', '1',
          '-ss', '00:00',
          '-i', 'bgm.raw',
          '-vcodec', 'libx264',
          '-pix_fmt', 'yuv420p',
          '-acodec', 'aac',
          // '-vf', `scale=${ width * scale }:${ height * scale }:flags=neighbor`,
          // '-af', "firequalizer=gain_entry='entry(0\\\,-23);entry(250\\\,-11.5);entry(1000\\\,0);entry(4000\\\,8);entry(16000\\\,16)'",
          '-af', "firequalizer=gain_entry='entry(31.25\\\,4.1);entry(62.5\\\,1.2);entry(125\\\,0);entry(250\\\,-4.1);entry(500\\\,-2.3);entry(1000\\\,0.5);entry(2000\\\,6.5);entry(8000\\\,5.1);entry(16000\\\,5.1)'",
          '-preset', 'medium',
          '-tune', 'animation',
          '-t', this.getDurationString(duration),
          'out.mp4'
        ]
      });
    });
  }

  saveAs(filename) {
    saveAs(this.blob, filename);
  }
};