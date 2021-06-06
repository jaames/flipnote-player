import { Path } from './Path';
import { SystemType } from './System';

// TODO: this enum isn't really needed, but was useful for debugging. remove sometime?
export enum IndexedItemType {
  Error = 'Error',
  Flipnote = 'Flipnote',
  Folder = 'Folder',
  BackupFolder = 'BackupFolder',
  FolderIcon = 'FolderIcon',
  Author = 'Author'
};

// TODO: not needed anymore?
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
  isSelected: boolean;
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
  isSelected: boolean;
};

export interface IndexedBackupFolder extends IndexedItemBase {
  type: IndexedItemType.BackupFolder;
  name: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  isSelected: boolean;
};

// TODO: not needed anymore?
export type IndexerItem = IndexedItemBase 
  | IndexedAuthor
  | IndexedFlipnote
  | IndexedFolderIcon
  | IndexedFolder 
  | IndexedBackupFolder;