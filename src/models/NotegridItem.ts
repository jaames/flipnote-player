import { parseSource, Flipnote, GifImage } from 'flipnote.js'
import { IndexedFlipnoteWithFile } from './FileIndexerTypes';
import { Path } from './Path';
import { SystemType } from './System';

export enum NotegridItemType {
  Uploaded,
  Sample
};

interface NotegridItemBase {
  type: NotegridItemType;
  hash: number;
  authorName: string;
  system: SystemType;
  isSpinoff: boolean;
  isLocked: boolean;
};

export interface NotegridUploadedItem extends NotegridItemBase {
  type: NotegridItemType.Uploaded;
  path: Path;
  note: Flipnote;
  file: File;
  thumbUrl: string;
}

export interface NotegridSampleItem extends NotegridItemBase {
  type: NotegridItemType.Sample;
  source: string;
  thumbUrl: string;
  previewUrl: string;
}

export type NotegridItem = NotegridUploadedItem | NotegridSampleItem;

export const notegridItemFromIndexedNote = async (indexedNote: IndexedFlipnoteWithFile): Promise<NotegridItem> => {
  const { path, file, hash, authorName, isSpinoff, isLocked, system } = indexedNote;
  const note = await parseSource(file);
  const gif = GifImage.fromFlipnoteFrame(note, note.thumbFrameIndex);
  const thumbUrl = gif.getUrl();

  return {
    type: NotegridItemType.Uploaded,
    path,
    hash,
    note,
    file,
    system,
    thumbUrl,
    authorName,
    isSpinoff,
    isLocked,
  };
}