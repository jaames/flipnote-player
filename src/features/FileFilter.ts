import { FileIndexer } from './FileIndexer';
import { IndexedFlipnoteWithFile, IndexedFolder, IndexedAuthor } from '../models';
import { stringCompare, dateCompare, setHasAll, setHasAny } from '../utils';

export enum SortMethod {
  Timestamp,
  AuthorName,
  Path
};

interface Filters {
  folders: Set<string | undefined>; // set of folder names
  authors: Set<string | undefined>; // set of user FSIDs
};

export class FileFilter {

  public index: FileIndexer;
  public sortBy: SortMethod = SortMethod.Path;
  public filterBy: Filters = {
    folders: new Set(),
    authors: new Set(),
  };

  constructor(index: FileIndexer) {
    this.index = index;
  }

  public resetFilters() {
    this.filterBy = {
      folders: new Set(),
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

  public toggleAuthorFilter(author: IndexedAuthor) {
    const { authors } = this.filterBy;
    if (authors.has(author.fsid))
      authors.delete(author.fsid);
    else
      authors.add(author.fsid);
  }

  private getFilterFn() {
    const filters = this.filterBy;
    const useFolders = filters.folders.size > 0;
    const useAuthors = filters.authors.size > 0;

    return (item: IndexedFlipnoteWithFile) => {
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

  private getSortFn() {
    switch (this.sortBy) {
      case SortMethod.Timestamp:
        return (a: IndexedFlipnoteWithFile, b: IndexedFlipnoteWithFile) => dateCompare(a.timestamp, b.timestamp);
      case SortMethod.AuthorName:
        return (a: IndexedFlipnoteWithFile, b: IndexedFlipnoteWithFile) => stringCompare(a.authorName, b.authorName);
      case SortMethod.Path:
      default:
        return (a: IndexedFlipnoteWithFile, b: IndexedFlipnoteWithFile) => stringCompare(a.path.full, b.path.full);
    }
  }
}