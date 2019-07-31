import { gifEncoder as GifEncoder } from 'flipnote.js';
import { saveAs } from 'file-saver';
import { resolve } from 'q';

export default class GifConverter {

  constructor() {
    this.gif = null;
  }

  init() {
    return this;
  }

  convert(flipnote) {
    this.gif = GifEncoder.fromFlipnote(flipnote);
    return this;
  }

  saveAs(filename) {
    const blob = this.gif.getBlob();
    saveAs(blob, filename);
  }

}