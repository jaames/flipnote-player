import { 
  gifEncoder as GifEncoder,
  bitmapEncoder as BitmapEncoder
} from 'flipnote.js';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export function convertFlipnoteToImageSequence(flipnote, imageFormat) {
  const zip = new JSZip();
  if (imageFormat === 'gif') {
    for (let frameIndex = 0; frameIndex < flipnote.frameCount; frameIndex++) {
      const gif = GifEncoder.fromFlipnoteFrame(flipnote, frameIndex);
      const blob = gif.getBlob();
      zip.file(`${ frameIndex }.gif`, blob);
    }
  } else (imageFormat === 'bmp') {
    for (let frameIndex = 0; frameIndex < flipnote.frameCount; frameIndex++) {
      const bmp = BitmapEncoder.fromFlipnoteFrame(flipnote, frameIndex);
      const blob = bmp.getBlob();
      zip.file(`${ frameIndex }.bmp`, blob);
    }
  }
  zip.generateAsync({ type: 'blob' })
  .then(function (blob) {
    saveAs(blob, `${ flipnote.meta.current.filename }.zip`);
  });
}