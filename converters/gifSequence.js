import { gifEncoder as GifEncoder } from 'flipnote.js';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export default class GifSequenceConverter {

  constructor() {
    this.zip = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.zip = new JSZip();
      resolve(this);
    });
  }

  convert(flipnote) {
    for (let frameIndex = 0; frameIndex < flipnote.frameCount; frameIndex++) {
      const gif = GifEncoder.fromFlipnoteFrame(flipnote, frameIndex);
      const blob = gif.getBlob();
      this.zip.file(`${ frameIndex.toString().padStart(3, '0') }.gif`, blob);
    }
    return this;
  }

  saveAs(filename) {
    this.zip.generateAsync({ type: 'blob' })
    .then(blob => {
      saveAs(blob, filename);
    });
  }

}