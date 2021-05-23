import { Flipnote, GifImage } from 'flipnote.js';

export function getNoteFrameUrl(note: Flipnote, index: number) {
  const gif = GifImage.fromFlipnoteFrame(note, index);
  return gif.getUrl();
}

export function getNoteThumbUrl(note: Flipnote) {
  const gif = GifImage.fromFlipnoteFrame(note, note.thumbFrameIndex);
  return gif.getUrl();
}

export function getNoteAnimationUrl(note: Flipnote) {
  const gif = GifImage.fromFlipnote(note);
  return gif.getUrl();
}

export function revokeUrl(url: string) {
  if (url.startsWith('blob:'))
    URL.revokeObjectURL(url);
}