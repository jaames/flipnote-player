import { player as FlipnotePlayer } from 'flipnote.js';
import { saveAs } from 'file-saver';

export default class Mp4Converter {

  constructor() {
    this.blob = null;
  }
  
  onvideocomplete() {}

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
            this.stderr += msg.data + '\n';
            break;
          case 'done':
            console.log('done!')
            this.blob = new Blob([msg.data.MEMFS[0].data], {
              type: 'video/mp4'
            });
            this.onvideocomplete();

            this.worker.terminate();
          case 'exit':
            console.log('Process exited with code ' + msg.data);
            console.log(this.stdout);
            console.log(this.stderr);
            break;
        }
      };
    });
  }

  convert(flipnote) {
    return new Promise((resolve, reject) => {
      this.onvideocomplete = () => {
        resolve(this);
      }
      const canvas = document.createElement('canvas');
      const player = new FlipnotePlayer(canvas);
      const frames = [];
      player.load(flipnote);
      for (let i = 0; i < flipnote.frameCount; i++) {
        player.setFrame(i);
        // get frame as jpeg image
        const dataUri = canvas.toDataURL('image/jpeg');
        // convert base64 image data URI to an array of bytes
        const rawData = window.atob(dataUri.substring(23));
        const rawLength = rawData.length;
        const bytes = new Uint8Array(rawLength);
        for (let byteIndex = 0; byteIndex < rawLength; byteIndex ++) {
          bytes[byteIndex] = rawData.charCodeAt(byteIndex);
        }
        // push frame to the frame file list
        frames.push({
          name: `${i.toString().padStart(3, '0')}.jpeg`,
          data: bytes
        });
      }
      this.worker.postMessage({
        type: "run",
        TOTAL_MEMORY: 268435456,
        MEMFS: frames,
        arguments: [
          '-framerate', `${flipnote.framerate}`, '-i', '%03d.jpeg', '-pix_fmt', 'yuv420p', 'out.mp4']
      });
    });
  }

  saveAs(filename) {
    saveAs(this.blob, filename);
  }
};