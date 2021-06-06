import { Flipnote, GifImage } from 'flipnote.js';

const GIF_MIME = 'image/gif';

export const gifUrlFromNoteThumb = (note: Flipnote) => GifImage.fromFlipnoteFrame(note, note.thumbFrameIndex).getUrl();

export const gifUrlFromNoteAnimation = (note: Flipnote) => GifImage.fromFlipnote(note).getUrl();

export const gifUrlFromArrayBuffer = (data: ArrayBuffer) => URL.createObjectURL(new Blob([data], { type: GIF_MIME }));

export const gifUrlRevoke = (url: string) => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); }