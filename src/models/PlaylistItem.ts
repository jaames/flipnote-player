import { Path } from './Path';
import { FilelistParser } from '../features/FilelistParser';

export enum PlaylistSticker {
  Heart,
  Crown,
  Music,
  Skull
}

export interface PlaylistItem {
  path: Path;
  playlist: FilelistParser;
  sticker?: PlaylistSticker;
}