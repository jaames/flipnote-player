/**
 * NoteIndexerWorker
 * Handles processing uploaded files and indexing them so that they can be searched/filtered later,
 * this is rather intensive (especially for large file sets!) so it is implemented as a webworker
 * to make use of multithreading where possible
 * Webworker threads are managed by NoteIndexer
 */

import { expose } from 'threads/worker';
import { parseSource, FlipnoteFormat, FlipnoteVersion, GifImage } from 'flipnote.js';
import { FilelistParser, FilelistType } from '../features/FilelistParser';
import { stringHash } from '../utils/strings';
import {
  Path,
  parsePath,
  SystemType,
  NoteSticker,
  getStickerFromPlaylistName,
  IndexerItem,
  IndexedItemType,
  IndexedError,
  IndexedFlipnote,
  IndexedFolder,
  IndexedBackupFolder,
  IndexedFolderIcon,
  IndexedAuthor
} from '../models';

const DSI_BACKUP_FOLDER_REGEX = /^(\d{4})(\d{2})(\d{2})$/;

export interface WorkerStats {
  numNotes: number;
  numPlaylists: number;
  numIcons: number;
};

const stats: WorkerStats = {
  numNotes: 0,
  numPlaylists: 0,
  numIcons: 0
};

const errors: any[] = [];
const notes: any[] = [];
const icons: any[] = [];
const authors = new Map<number, IndexedAuthor>();
// creation timestamps grouped by year
// const timestamps = new Map<number, NoteFilterDate>();
const folders = new Map<string, IndexedFolder>();
const backupFolders = new Map<string, IndexedBackupFolder>();
const stickerLists = new Map<NoteSticker, Path[]>();

async function digestFile(pathStr: string, data: ArrayBuffer) {
  const path = parsePath(pathStr);
  // Handle Flipnote files (ppm, kwz) or 3DS comments (kwc) with flipnote.js
  if (path.ext === 'ppm' || path.ext === 'kwz' || path.ext === 'kwc') {
    return await digestNote(path, data);
  }
  // DSi playlists (used for tracking stickers) and file lists (used for tracking folder content)
  else if (path.ext === 'pls' || path.base === 'dirmemo' || path.base === 'dirmemo2') {
    return await digestPlaylist(FilelistType.Ppm, path, data);
  }
  // 3DS folder icons
  else if (path.ext === 'ico') {
    return await digestIcon(path, data);
  }
  // 3DS file lists (uses a slightly different format)
  else if ((path.base === '!!' || path.base === 'reserve') && path.ext === 'lst') {
    return await digestPlaylist(FilelistType.Kwz, path, data);
  }
}

async function digestPlaylist(type: FilelistType, path: Path, data: ArrayBuffer) {
  stats.numPlaylists += 1;
  try {
    const playlist = new FilelistParser(type, data);
    const sticker = getStickerFromPlaylistName(path.base);
    if (sticker) {
      const paths = stickerLists.get(sticker);
      if (paths)
        stickerLists.set(sticker, paths.concat(playlist.items));
      else
        stickerLists.set(sticker, playlist.items);
    }
  }
  catch (e)  {
    const errorItem: IndexedError = {
      type: IndexedItemType.Error,
      error: e,
      path,
    };
    errors.push(errorItem);
    return errorItem;
  }
}

async function digestIcon(path: Path, data: ArrayBuffer) {
  stats.numIcons += 1;
  try {
    const icon = await parseSource(data);
    const gif = GifImage.fromFlipnoteFrame(icon, 0);
    const item: IndexedFolderIcon = {
      type: IndexedItemType.FolderIcon,
      path,
      width: icon.imageWidth,
      height: icon.imageHeight,
      gifData: gif.getArrayBuffer()
    };
    icons.push(item);
    return item;
  }
  catch (e) {
    const errorItem: IndexedError = {
      type: IndexedItemType.Error,
      error: e,
      path,
    };
    errors.push(errorItem);
    return errorItem;
  } 
}

async function digestNote(path: Path, data: ArrayBuffer) {
  stats.numNotes += 1;
  try {
    const note = await parseSource(data);
    const meta = note.meta;
    const item: IndexedFlipnote = {
      type: IndexedItemType.Flipnote,
      path,
      hash: stringHash(path.full),
      system: note.format === 'PPM' ? SystemType.NinDSi : SystemType.Nin3DS,
      authorName: meta.current.username,
      timestamp: meta.timestamp,
      isSpinoff: meta.isSpinoff,
      isLocked: meta.lock,
      authorFsids: [
        meta.current.fsid,
        meta.parent.fsid,
        meta.root.fsid,
      ]
    };
    digestNoteVersion(meta.current);
    digestNoteVersion(meta.parent);
    digestNoteVersion(meta.root);
    digestNotePath(path);
    notes.push(item);
    return item;
  }
  catch (e) {
    const errorItem: IndexedError = {
      type: IndexedItemType.Error,
      error: e,
      path,
    };
    errors.push(errorItem);
    return errorItem;
  }
}

function digestNoteVersion(version: FlipnoteVersion) {
  const hash = stringHash(version.fsid + version.username);
  if (!authors.has(hash)) {
    const author: IndexedAuthor = {
      type: IndexedItemType.Author,
      hash: hash,
      username: version.username,
      fsid: version.fsid,
    };
    authors.set(hash, author);
  }
  return hash;
}

function digestNotePath(path: Path) {
  const { folder, parentFolder, ext } = path;
  let ignoreSubFolder = false;
  // Check if parent folder looks like a DSi Flipnote backup folder
  if (parentFolder && DSI_BACKUP_FOLDER_REGEX.test(parentFolder)) {
    digestBackupFolder(parentFolder);
    // DSi backup folders contain sub-folders, but they're never seen in Flipnote Studio so they can be ignored
    ignoreSubFolder = true;
  }
  // If folder is available, keep track of it
  if (folder && !ignoreSubFolder) 
    digestFolder(folder);
}

function digestBackupFolder(parentFolder: string) {
  let match;
  if ((!backupFolders.has(parentFolder)) && (match = parentFolder.match(DSI_BACKUP_FOLDER_REGEX))) {
    const year = parseInt(match[1]);
    const month = parseInt(match[2]);
    const day = parseInt(match[3]);
    backupFolders.set(parentFolder, {
      type: IndexedItemType.BackupFolder,
      name: parentFolder,
      date: { year, month, day }
    });
  }
}

function digestFolder(folder: string) {
  if(!folders.has(folder)) {
    folders.set(folder, {
      type: IndexedItemType.Folder,
      name: folder
    });
  }
}

const worker = {
  getStats() {
    return stats;
  },
  getErrors() {
    return errors;
  },
  getNotes() {
    return notes;
  },
  getIcons() {
    return icons;
  },
  getFolders() {
    return folders;
  },
  getBackupFolders() {
    return backupFolders;
  },
  getAuthors() {
    return authors
  },
  getStickerLists() {
    return stickerLists;
  },
  digestFile
};

expose(worker);

export type FileIndexerWorker = typeof worker;