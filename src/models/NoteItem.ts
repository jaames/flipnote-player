import { Flipnote } from 'flipnote.js';
import { Path } from './Path';

export enum NoteItemSource {
  Upload,
  Sample
}

interface NoteItemBase {
  key: string;
  sourceType: NoteItemSource;
  authorname: string;
  system: '3DS' | 'DSi';
  isSpinoff: boolean;
  isLocked: boolean;
}

export interface UploadedNoteItem extends NoteItemBase {
  sourceType: NoteItemSource.Upload;
  sourceNote: Flipnote;
  path: Path;
}

export interface SampleNoteItem extends NoteItemBase {
  sourceType: NoteItemSource.Sample;
  sourceUrl: string;
  thumbUrl: string;
  previewUrl: string;
}

export type NoteItem = UploadedNoteItem | SampleNoteItem;