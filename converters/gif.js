import { gifEncoder as GifEncoder } from 'flipnote.js';
import { saveAs } from 'file-saver';

export default function convertFlipnoteToGif(flipnote) {
  const gif = GifEncoder.fromFlipnote(flipnote);
  const blob = gif.toBlob();
  saveAs(blob, `${flipnote.meta.current.filename}.gif`);
}