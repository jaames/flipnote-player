import {
  Flipnote,
  FlipnoteFormat,
  FlipnoteMeta,
  FlipnoteRegion,
  FlipnoteVersion,
  parseSource
} from 'flipnote.js'; 

import {
  FilelistType as PlaylistType,
  FilelistParser as PlaylistParser
} from './FilelistParser';

import {
  compareString,
  compareDate
} from './compareUtils';

import {
  Path,
  parsePath,
  PlaylistItem,
  PlaylistSticker,
  UploadedNoteItem,
  NoteItemSource,
  NoteFilterOptions,
  NoteFilterDate,
  NoteFilterFormat,
  NoteFilterAuthor,
  NoteFilterDirectory,
  NoteFilterSticker,
  SortOptions,
  SortType,
  SortOrder
} from '../models';

import {
  generateUid
} from '../utils';

export * from '../models/NoteFilter';

const DSI_BACKUP_FOLDER_REGEX = /^(\d{4})(\d{2})(\d{2})$/;

export class NoteFilter {

  static defaultFilterOptions: NoteFilterOptions = {
    formats: [],
    years: [],
    folders: [],
    backupFolders: [],
    authors: [],
    stickers: []
  };

  public notes: UploadedNoteItem[] = [];
  // track formats available
  public formats = new Map<string, NoteFilterFormat>();
  // username : NoteAuthor
  // indexed by username combined with fsid since:
  // - users can change their name arbitrarily, but you might only remember one of their names
  // - multiple fsids can use the same username but be distinct users
  public authors = new Map<string, NoteFilterAuthor>();
  // directory name : DirectoryItem
  public folders = new Map<string, NoteFilterDirectory>();
  public backupFolders = new Map<string, NoteFilterDirectory>();
  // playlist directory : Playlist
  public playlists = new Map<string, PlaylistParser>();
  // if available, dsi playlists can be read to see which flipnotes are marked with stickers
  public stickers = new Map<PlaylistSticker, PlaylistParser>();
  // creation timestamps grouped by year
  public timestamps = new Map<number, NoteFilterDate>();

  public errors: any[] = [];

  public async digestFiles(fileList: File[]): Promise<NoteFilter> {
    this.notes = [];
    this.formats = new Map();
    this.authors = new Map();
    this.folders = new Map();
    this.backupFolders = new Map();
    this.playlists = new Map();
    this.stickers = new Map();
    this.timestamps = new Map();
    this.errors = [];
    console.time('full digest');
    // Parse and load everything... needs to be async, sorry
    for (let file of fileList) {
      const path = parsePath(file.path || file.name);
      // Handle Flipnote files (ppm, kwz) or 3DS comments (kwc) with flipnote.js
      if (path.ext === 'ppm' || path.ext === 'kwz' || path.ext === 'kwc') {
        console.time('digest note');
        await this.digestNote(file, path);
        console.timeEnd('digest note');
      }
      // Playlists (used for tracking stickers) and file lists (used for tracking folder content)
      else if (path.ext === 'pls' || path.base === 'dirmemo' || path.base === 'dirmemo2') {
        console.time('digest dsi playlist');
        await this.digestPlaylist(PlaylistType.Ppm, file, path);
        console.timeEnd('digest dsi playlist');
      }
      // 3DS folder icons
      else if (path.ext === 'ico') {
        await this.digestIcon(file, path);
      }
      // 3DS file lists (uses a slightly different format)
      else if ((path.base === '!!' || path.base === 'reserve') && path.ext === 'lst') {
        await this.digestPlaylist(PlaylistType.Kwz, file, path);
      }
    }
    console.timeEnd('full digest');
    return this;
  }

  public getAvailableFilterOptions(): NoteFilterOptions {
    return {
      formats: Array.from(this.formats.values()),
      years: Array.from(this.timestamps.values()).sort((a, b) => a.year - b.year),
      folders: Array.from(this.folders.values()).sort((a, b) => compareString(a.name, b.name)),
      backupFolders: Array.from(this.backupFolders.values()).sort((a, b) => compareString(a.name, b.name)),
      authors: Array.from(this.authors.values()).sort((a, b) => compareString(a.username, b.username)),
      stickers: Array.from(this.stickers.keys())
    }
  }

  public apply(filter: NoteFilterOptions = {}, sort: Partial<SortOptions> = {}) {
    const formats = filter.formats?.map(format => format.ext);
    const authorIds = filter.authors?.map(author => author.fsid);
    const folderNames = filter.folders?.map(folder => folder.key);
    const backupFolderNames = filter.backupFolders?.map(folder => folder.key);
    const years = filter.years?.map(timestamp => timestamp.year);
    const stickerPlaylists = filter.stickers?.map(sticker => this.stickers.get(sticker));
    const stickerFilenames = stickerPlaylists?.map(playlist => playlist?.list.map(item => item.name)).flat();

    return this.notes
      .filter(({ sourceNote: note, path }) => {
        const meta = note.meta as FlipnoteMeta;
        // Check file format
        if (formats && (!formats.includes(path.ext)))
          return false;
        // Check timestamp year
        if (years && (!years.includes(meta.timestamp.getFullYear())))
          return false;
        // Check folder names
        if (path.folder && folderNames && (!folderNames.includes(path.folder)))
          return false;
        // Check backup folders
        if (path.parentFolder && backupFolderNames && (!backupFolderNames.includes(path.parentFolder)))
          return false;
        // Check sticker playlists
        if (stickerFilenames && (!stickerFilenames.includes(path.name)))
          return false;
        // Check current, parent and root Flipnote authors
        if (authorIds) {
          if (
            (!authorIds.includes(meta.current.fsid)) &&
            (!authorIds.includes(meta.parent.fsid)) &&
            (!authorIds.includes(meta.root.fsid))
          ) {
            return false;
          }
        }
        // otherwise... keep it!
        return true;
      })
      .sort(this.getSortFn(sort));
  }

  private getSortFn(sort: SortOptions) {
    if (sort.sortType === 'timestamp')
      return (a: UploadedNoteItem, b: UploadedNoteItem) => compareDate(a.sourceNote.meta.timestamp, b.sourceNote.meta.timestamp);
    if (sort.sortType === 'authorName')
      return (a: UploadedNoteItem, b: UploadedNoteItem) => compareString(a.sourceNote.meta.current.username, b.sourceNote.meta.current.username);
    else 
      return (a: UploadedNoteItem, b: UploadedNoteItem) => compareString(a.path.base, b.path.base);
  }

  private async digestNote(file: File, path: Path) {
    try {
      const note = await parseSource(file)
      const meta: FlipnoteMeta = note.meta;
      const system = note.format === FlipnoteFormat.PPM ? 'DSi' : '3DS';
      // Keep track of the flipnotes' parent folder and other misc path info
      this.digestNotePath(path);
      // 
      this.digestNoteTimestamp(meta.timestamp);
      // Keep track of all authors
      this.digestNoteVersion(meta.current);
      this.digestNoteVersion(meta.parent);
      this.digestNoteVersion(meta.root);
      this.notes.push({
        sourceType: NoteItemSource.Upload,
        sourceNote: note,
        key: `${ note.meta.current.filename }_${ generateUid() }`,
        path,
        system,
        isSpinoff: meta.isSpinoff,
        isLocked: meta.lock,
        authorname: meta.current.username
      });
    }
    catch(e) {
      this.errors.push(e);
    }
  }

  private async digestNoteTimestamp(timestamp: Date) {
    const year = timestamp.getFullYear();
    if (!this.timestamps.has(year))
      this.timestamps.set(year, { year, numNotes: 0 });
  }

  private async digestNoteVersion(version: FlipnoteVersion) {
    const { fsid, username, region } = version;
    const key = `${ fsid }_${ username }`;
    if (!this.authors.has(key))
      this.authors.set(key, { key, fsid, username, numNotes: 0 });
    // TODO: region
  }

  private async digestIcon(file: File, path: Path) {
    // try {
    //   const note = await parseSource(file);
    //   this.addIcon(note, path);
    // }
    // catch(e) {
    //   this.errors.push(e);
    // }
  }
  
  private async digestPlaylist(type: PlaylistType, file: File, path: Path) {
    try {
      const playlist = await PlaylistParser.fromFile(PlaylistType.Kwz, file);
      if (path.ext === 'lst' && path.folder)
        this.playlists.set(path.folder, playlist);
      else if (path.base === 'mark0')
        this.stickers.set(PlaylistSticker.Heart, playlist);
      else if (path.base === 'mark1')
        this.stickers.set(PlaylistSticker.Crown, playlist);
      else if (path.base === 'mark2')
        this.stickers.set(PlaylistSticker.Note, playlist);
      else if (path.base === 'mark3')
        this.stickers.set(PlaylistSticker.Skull, playlist);
    }
    catch(e) {
      this.errors.push(e);
    }
  }

  private digestNotePath(path: Path) {
    const { folder, parentFolder, ext } = path;
    // Keep track of different formats seen
    this.digestExt(ext);
    let ignoreSubFolder = false;
    // Check if parent folder looks like a DSi Flipnote backup folder
    if (parentFolder && DSI_BACKUP_FOLDER_REGEX.test(parentFolder)) {
      this.digestBackupFolder(parentFolder);
      // DSi backup folders contain sub-folders, but they're never seen in Flipnote Studio so they can be ignored
      ignoreSubFolder = true;
    }
    // If folder is available, keep track of it
    if (folder && !ignoreSubFolder) 
      this.digestFolder(folder);
  }

  private digestBackupFolder(parentFolder: string) {
    let match;
    if ((!this.backupFolders.has(parentFolder)) && (match = parentFolder.match(DSI_BACKUP_FOLDER_REGEX))) {
      const year = parseInt(match[1]);
      const month = parseInt(match[2]);
      const day = parseInt(match[3]);
      const date = new Date(year, month - 1, day);
      const name = `${ year }/${ month }/${ day }`;
      this.backupFolders.set(parentFolder, {
        numNotes: 0,
        key: parentFolder,
        name,
        date 
      });
    }
  }

  private digestFolder(folder: string) {
    if(!this.folders.has(folder)) {
      this.folders.set(folder, {
        numNotes: 0,
        key: folder,
        name: folder
      });
    }
  }

  private digestExt(ext: string) {
    if (!this.formats.has(ext)) {
      this.formats.set(ext, {
        numNotes: 0,
        ext
      });
    }
  }
}