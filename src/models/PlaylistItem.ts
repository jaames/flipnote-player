import { Path } from './Path';
import { FilelistParser } from '../features/FilelistParser';

export enum PlaylistSticker {
  Heart,
  Crown,
  Note,
  Skull
}

export interface PlaylistItem {
  path: Path;
  playlist: FilelistParser;
  sticker?: PlaylistSticker;
}