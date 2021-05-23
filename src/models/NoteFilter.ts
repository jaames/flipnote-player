import { PlaylistSticker } from './PlaylistItem';

export interface NoteFilterAuthor {
  key: string;
  username: string;
  fsid: string;
  numNotes: number;
}

export interface NoteFilterFormat {
  ext: string;
  numNotes: number;
}

export interface NoteFilterDate {
  year: number;
  numNotes: number;
}

export interface NoteFilterDirectory {
  key: string;
  name: string;
  numNotes: number;
  date?: Date;
  icon?: string;
}

export interface NoteFilterSticker {
  sticker: PlaylistSticker;
  numNotes: number;
}

export interface NoteFilterOptions {
  formats?: NoteFilterFormat[],
  years?: NoteFilterDate[],
  folders?: NoteFilterDirectory[],
  backupFolders?: NoteFilterDirectory[],
  authors?: NoteFilterAuthor[],
  stickers?: PlaylistSticker[]
}

export enum SortOrder {
  Desc,
  Asc
}

export type SortType = 'filename' | 'authorName' | 'timestamp';

export interface SortOptions {
  order?: SortOrder;
  sortType?: SortType;
}