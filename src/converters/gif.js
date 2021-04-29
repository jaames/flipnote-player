import { GifImage } from 'flipnote.js';
import { saveAs } from 'file-saver';

export default class GifConverter {

  constructor() {
    this.gif = null;
  }

  init() {
    return this;
  }

  convert(flipnote) {
    this.gif = GifImage.fromFlipnote(flipnote);
    return this;
  }

  saveAs(filename) {
    const blob = this.gif.getBlob();
    saveAs(blob, filename);
  }

}