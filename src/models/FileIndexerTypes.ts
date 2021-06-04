// import { Flipnote } from 'flipnote.js'
import { Path } from './Path';
import { SystemType } from './System';

export enum IndexedItemType {
  Error,
  Flipnote,
  Folder,
  BackupFolder,
  FolderIcon,
  Author
};

interface IndexedItemBase {
  type: IndexedItemType;
};

export interface IndexedError extends IndexedItemBase {
  type: IndexedItemType.Error;
  path: Path;
  error: string;
};

export interface IndexedAuthor extends IndexedItemBase {
  type: IndexedItemType.Author;
  hash: number;
  fsid: string;
  username: string;
};

export interface IndexedFlipnote extends IndexedItemBase {
  type: IndexedItemType.Flipnote;
  hash: number;
  path: Path;
  system: SystemType;
  authorName: string;
  timestamp: Date;
  isSpinoff: boolean;
  isLocked: boolean;
  authorFsids: string[]; // fsids for root, parent and current authors
};

export interface IndexedFlipnoteWithFile extends IndexedFlipnote {
  file: File;
};

export interface IndexedFolderIcon extends IndexedItemBase {
  type: IndexedItemType.FolderIcon;
  path: Path;
  width: number;
  height: number;
  gifData: ArrayBufferLike;
};

export interface IndexedFolder extends IndexedItemBase {
  type: IndexedItemType.Folder;
  name: string;
  icon?: IndexedFolderIcon;
};

export interface IndexedBackupFolder extends IndexedItemBase {
  type: IndexedItemType.BackupFolder;
  name: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
};

export type IndexerItem = IndexedItemBase 
  | IndexedAuthor
  | IndexedFlipnote
  | IndexedFolderIcon
  | IndexedFolder 
  | IndexedBackupFolder;