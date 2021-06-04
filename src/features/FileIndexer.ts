/**
 * NoteIndexer
 * Manages a pool of FileIndexerWorker threads to handle processing large file sets so they can be searched/filtered
 * Used by NoteListContext
 */

import { spawn, Pool, Worker, ModuleThread } from 'threads';
import { WorkerDescriptor } from 'threads/dist/master/pool-types';
import { FileIndexerWorker, WorkerStats } from '../workers/FileIndexerWorker';
import { mapMerge, mapMergeToArray } from '../utils';
import {
  Path,
  NoteSticker,
  IndexedAuthor,
  IndexedFlipnote,
  IndexedFlipnoteWithFile,
  IndexedFolderIcon,
  IndexedFolder,
  IndexedBackupFolder,
  IndexedError,
} from '../models';

export class NoteIndexer {

  private _numThreads = (navigator?.hardwareConcurrency) || 4;
  private _pool: Pool<ModuleThread<FileIndexerWorker>>;
  private _fileMap: Map<string, File> = new Map();

  public numFilesDigested = 0;
  public notes: IndexedFlipnoteWithFile[] = [];
  public errors: IndexedError[] = [];
  public authors: IndexedAuthor[] = [];
  public folders: IndexedFolder[] = [];
  public backupFolders: IndexedBackupFolder[] = [];

  constructor() {
    this._pool = Pool(this.spawnThread, this._numThreads);
  }
  
  private spawnThread() {
    return spawn<FileIndexerWorker>(new Worker('../workers/FileIndexerWorker.ts'));
  }

  public digestFile(file: File) {
    this._fileMap.set(file.path, file);
    file.arrayBuffer().then(data => {
      this.numFilesDigested += 1;
      return this._pool.queue(thread => thread.digestFile(file.path, data));
    });
  }

  public getThreads() {
    const pool = this._pool as any;
    return pool.workers.map((w: WorkerDescriptor<ModuleThread<FileIndexerWorker>>) => w.init) as Promise<ModuleThread<FileIndexerWorker>>[];
  }

  public mapThreads(fn: (thread: ModuleThread<FileIndexerWorker>) => any) {
    const threads = this.getThreads();
    return threads.map(async thread => fn(await thread));
  }

  public async mapThreadsThenMergeResult(fn: (thread: ModuleThread<FileIndexerWorker>) => any) {
    return (await Promise.all(this.mapThreads(fn))).flat();
  }

  public async getNotes() {
    const notes = await this.mapThreadsThenMergeResult(thread => thread.getNotes());
    notes.forEach(note => {
      note.file = this._fileMap.get(note.path.full);
    });
    return notes;
  }

  public async getAuthors() {
    const authors = await this.mapThreadsThenMergeResult(thread => thread.getAuthors());
    return mapMergeToArray<IndexedAuthor>(...authors);
  }

  public async getFolders() {
    const folders = await this.mapThreadsThenMergeResult(thread => thread.getFolders());
    const icons = await this.mapThreadsThenMergeResult(thread => thread.getIcons());
    const folderMap = mapMerge<string, IndexedFolder>(...folders);
    // connect icons to their prospective folders if there are any
    icons.forEach((icon: IndexedFolderIcon) => {
      const iconFolder = icon.path.folder;
      if (iconFolder && folderMap.has(iconFolder)) {
        const folder = folderMap.get(iconFolder);
        if (folder) folder.icon = icon;
      }
    });
    return [...folderMap.values()];
  }

  public async getBackupFolders() {
    const folders = await this.mapThreadsThenMergeResult(thread => thread.getBackupFolders());
    return mapMergeToArray<IndexedBackupFolder>(...folders);
  }

  public async getErrors() {
    return this.mapThreadsThenMergeResult(thread => thread.getErrors());
  }

  public async getStickerLists() {
    const result = new Map<NoteSticker, Path[]>([
      [NoteSticker.Heart, []],
      [NoteSticker.Crown, []],
      [NoteSticker.Music, []],
      [NoteSticker.Skull, []],
    ]);
    const stickerLists = await Promise.all(this.mapThreads(thread => thread.getStickerLists()));
    stickerLists.forEach(threadList => {
      result.forEach((stickerList, stickerType) => {
        const paths = threadList.get(stickerType);
        if (paths)
          result.set(stickerType, stickerList.concat(paths));
      });
    });
    return result;
  }

  public async getThreadStats() {
    return await Promise.all<WorkerStats>(this.mapThreads(thread => thread.getStats()));
  }

  public async printDebugInfo() {
    const threads = await this.getThreadStats();
    console.log(`Processed ${ this.numFilesDigested } files with ${ this._numThreads } threads:`)
    console.table(threads.reduce((table: any, stats, i) => {
      table[`Thread #${ i + 1 }`] = {
        'Flipnotes': stats.numNotes,
        'Playlists': stats.numPlaylists,
        'Icons': stats.numIcons,
      };
      return table;
    }, {}));
  }

  public async completed() {
    await this._pool.completed();
    this.notes = await this.getNotes();
    this.authors = await this.getAuthors();
    this.folders = await this.getFolders();
    this.backupFolders = await this.getBackupFolders();
    this.errors = await this.getErrors();
    await this.printDebugInfo();
    this._fileMap.clear();
    return;
  }

  public async terminate() {
    await this._pool.terminate();
  }

  public async forceTerminate() {
    await this._pool.terminate(true);
  }
}