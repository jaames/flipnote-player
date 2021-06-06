import React, { createContext } from 'react';
import {
  IndexedFlipnoteWithFile,
  IndexedAuthor,
  IndexedFolder,
  IndexedBackupFolder,
  NotegridItem,
  notegridItemFromIndexedNote
} from '../models';

import { FileIndexer } from '../features/FileIndexer';
import { FileFilter } from '../features/FileFilter';

interface Props {}

interface State {
  notes: IndexedFlipnoteWithFile[];
  folders: IndexedFolder[];
  backupFolders: IndexedBackupFolder[];
  authors: IndexedAuthor[];
  numPages: number;
  notesPerPage: number;
  currPageIndex: number;
  currPageNotes: NotegridItem[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  processUploads: (files: File[]) => void;
  toggleFolderFilter: (folder: IndexedFolder) => void,
  toggleBackupFilter: (folder: IndexedBackupFolder) => void,
  toggleAuthorFilter: (folder: IndexedAuthor) => void,
  nextPage: () => void,
  prevPage: () => void,
}

export const NoteListContext = createContext<State>({
  notes: [],
  folders: [],
  backupFolders: [],
  authors: [],
  numPages: 0,
  notesPerPage: 12,
  currPageIndex: 0,
  currPageNotes: [],
  hasPrevPage: false,
  hasNextPage: false,
  processUploads: () => {},
  toggleFolderFilter: () => {},
  toggleBackupFilter: () => {},
  toggleAuthorFilter: () => {},
  nextPage: () => {},
  prevPage: () => {},
});

export class NoteListContextProvider extends React.Component<Props, State> {

  private indexer = new FileIndexer();
  private filter = new FileFilter(this.indexer);

  processUploads = async (files: File[]) => {
    // Process files with file indexer
    await this.indexer.init();
    for (let i = 0; i < files.length; i++)
      this.indexer.digestFile(files[i]);
    await this.indexer.completed();
    await this.indexer.terminate();
    this.filter.resetFilters();
    console.log(this.indexer);
    this.updateNoteList();
  }

  toggleFolderFilter = async (folder: IndexedFolder) => {
    this.filter.toggleFolderFilter(folder);
    await this.updateNoteList();
  }

  toggleBackupFilter = async (folder: IndexedBackupFolder) => {
    this.filter.toggleBackupFilter(folder);
    await this.updateNoteList();
  }

  toggleAuthorFilter = async (author: IndexedAuthor) => {
    this.filter.toggleAuthorFilter(author);
    await this.updateNoteList();
  }

  nextPage = () => {
    const { hasNextPage, currPageIndex } = this.state;
    if (hasNextPage)
      this.setPageIndex(currPageIndex + 1);
  }

  prevPage = () => {
    const { hasPrevPage, currPageIndex } = this.state;
    if (hasPrevPage)
      this.setPageIndex(currPageIndex - 1);
  }

  private async setStateAsync(state: any) {
    return new Promise<void>((resolve) => this.setState(state, resolve));
  }

  private async updateNoteList() {
    const notes = this.filter.getFilteredNotes();
    const folders = this.indexer.folders;
    const backupFolders = this.indexer.backupFolders;
    const authors = this.indexer.authors;
    await this.setStateAsync({
      notes,
      folders,
      backupFolders,
      authors,
      numPages: Math.ceil(notes.length / this.state.notesPerPage)
    });
    await this.setPageIndex(0);
  }

  private async setPageIndex(pageIndex: number) {
    const { notes, notesPerPage, numPages } = this.state;
    const startIndex = notesPerPage * pageIndex;
    const endIndex = startIndex + notesPerPage;
    const pageNotes = await Promise.all(
      notes.slice(startIndex, endIndex)
      .map(notegridItemFromIndexedNote)    
    );
    this.setState({
      currPageNotes: pageNotes,
      currPageIndex: pageIndex,
      hasPrevPage: pageIndex > 0,
      hasNextPage: pageIndex < numPages - 1,
    });
  }

  state: State = {
    notes: [],
    folders: [],
    backupFolders: [],
    authors: [],
    // filterOptions: {},
    numPages: 0,
    notesPerPage: 12,
    currPageIndex: 0,
    currPageNotes: [],
    hasPrevPage: false,
    hasNextPage: false,
    processUploads: this.processUploads,
    toggleFolderFilter: this.toggleFolderFilter,
    toggleBackupFilter: this.toggleBackupFilter,
    toggleAuthorFilter: this.toggleAuthorFilter,
    nextPage: this.nextPage,
    prevPage: this.prevPage,
  };

  render() {
    return (
      <NoteListContext.Provider value={ this.state }>
        { this.props.children }
      </NoteListContext.Provider>
    );
  }

}