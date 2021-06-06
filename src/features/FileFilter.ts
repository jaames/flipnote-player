import { FileIndexer } from './FileIndexer';
import {
  IndexedFlipnoteWithFile,
  IndexedFolder,
  IndexedBackupFolder,
  IndexedAuthor
} from '../models';
import {
  stringCompare,
  dateCompare,
  setHasAll,
  setHasAny
} from '../utils';

export enum SortMethod {
  Timestamp,
  AuthorName,
  Path
};

interface Filters {
  folders: Set<string | undefined>; // set of folder names
  backupFolders: Set<string | undefined>;
  authors: Set<string | undefined>; // set of user FSIDs
};

export class FileFilter {

  public index: FileIndexer;
  public sortBy: SortMethod = SortMethod.Path;
  public filterBy: Filters = {
    folders: new Set(),
    backupFolders: new Set(),
    authors: new Set(),
  };

  constructor(index: FileIndexer) {
    this.index = index;
  }

  public resetFilters() {
    this.filterBy = {
      folders: new Set(),
      backupFolders: new Set(),
      authors: new Set(),
    }
  }

  public getFilteredNotes() {
    return this.index.notes
      .filter(this.getFilterFn())
      .sort(this.getSortFn());
  }

  public toggleFolderFilter(folder: IndexedFolder) {
    const { folders } = this.filterBy;
    if (folders.has(folder.name))
      folders.delete(folder.name);
    else
      folders.add(folder.name);
  }

  public toggleBackupFilter(folder: IndexedBackupFolder) {
    const { backupFolders } = this.filterBy;
    if (backupFolders.has(folder.name))
      backupFolders.delete(folder.name);
    else
      backupFolders.add(folder.name);
  }

  public toggleAuthorFilter(author: IndexedAuthor) {
    const { authors } = this.filterBy;
    if (authors.has(author.fsid))
      authors.delete(author.fsid);
    else
      authors.add(author.fsid);
  }

  private getFilterFn() {
    const filters = this.filterBy;
    const useBackupFolders = filters.backupFolders.size > 0;
    const useFolders = filters.folders.size > 0;
    const useAuthors = filters.authors.size > 0;

    return (item: IndexedFlipnoteWithFile) => {
      // 
      if (useBackupFolders && !filters.backupFolders.has(item.path.parentFolder))
        return false;
      // 
      if (useFolders && !filters.folders.has(item.path.folder))
        return false;
      //
      if (useAuthors && setHasAny(filters.authors, item.authorFsids))
        return false;
      // otherwise keep it!
      return true;
    }
  }

  private getSortFn(): (a: IndexedFlipnoteWithFile, b: IndexedFlipnoteWithFile) => number {
    switch (this.sortBy) {
      case SortMethod.Timestamp:
        return (a, b) => dateCompare(a.timestamp, b.timestamp);
      case SortMethod.AuthorName:
        return (a, b) => stringCompare(a.authorName, b.authorName);
      case SortMethod.Path:
      default:
        return (a, b) => stringCompare(a.path.full, b.path.full);
    }
  }
}