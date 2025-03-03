import { GifImage, Player, Html5Canvas } from 'flipnote.js';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export default class ImageSequenceConverter {

  constructor() {
    this.zip = null;
    this.format = null;
  }

  init({ format }) {
    this.zip = new JSZip();
    this.format = format;
    return this;
  }

  async convert(flipnote) {
    if (this.format === 'gif') {
      for (let frameIndex = 0; frameIndex < flipnote.frameCount; frameIndex++) {
        const gif = GifImage.fromFlipnoteFrame(flipnote, frameIndex);
        const blob = gif.getBlob();
        this.zip.file(`${ frameIndex.toString().padStart(3, '0') }.gif`, blob);
      }
    }
    else if (this.format === 'png' || this.format === 'jpeg') {
      const el = document.createElement('div');
      const renderer = new Html5Canvas(el, flipnote.imageWidth, flipnote.imageHeight, {
        useDpi: false,
        useSmoothing: false,
      });
      renderer.setNote(flipnote);
      const mimeType = `image/${ this.format }`;
      for (let frameIndex = 0; frameIndex < flipnote.frameCount; frameIndex++) {
        renderer.drawFrame(frameIndex);
        const blob = await renderer.getBlob(mimeType);
        const filename = `${ frameIndex.toString().padStart(3, '0') }.${ this.format }`;
        this.zip.file(filename, blob);
      }
      renderer.destroy();
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