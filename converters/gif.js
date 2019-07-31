import { gifEncoder as GifEncoder } from 'flipnote.js';
import { saveAs } from 'file-saver';

export default class GifConverter {

  constructor() {
    this.gif = null;
  }

  convert(flipnote) {
    this.gif = GifEncoder.fromFlipnote(flipnote);
  }

  saveAs(filename) {
    const blob = this.gif.getBlob();
    saveAs(blob, filename);
  }

}