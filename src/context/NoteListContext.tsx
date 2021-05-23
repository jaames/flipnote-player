import React, { createContext } from 'react';
import { Flipnote, GifImage } from 'flipnote.js';
import { NoteItem, NoteItemSource } from '../models';
import { NoteFilter, NoteFilterOptions } from '../features/NoteFilter';

interface Props {}

interface State {
  notes: NoteItem[];
  filterOptions: NoteFilterOptions;
  numPages: number;
  notesPerPage: number;
  currPageIndex: number;
  currPageNotes: NoteItem[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  processUploads: (files: File[]) => void;
  setPageIndex: (pageIndex: number) => void;
  nextPage: () => void,
  prevPage: () => void,
}

export const NoteListContext = createContext<State>({
  notes: [],
  filterOptions: {},
  numPages: 0,
  notesPerPage: 12,
  currPageIndex: 0,
  currPageNotes: [],
  hasPrevPage: false,
  hasNextPage: false,
  processUploads: () => {},
  setPageIndex: () => {},
  nextPage: () => {},
  prevPage: () => {},
});

export class NoteListContextProvider extends React.Component<Props, State> {

  private uploadFilter = new NoteFilter();

  processUploads = async (files: File[]) => {
    const filter = await this.uploadFilter.digestFiles(files);
    const filterOptions = filter.getAvailableFilterOptions();
    const notes = filter.apply();
    this.setState({ filterOptions });
    this.setNotesList(notes)
  }

  setNotesList = (notes: NoteItem[]) => {
    this.setState({
      notes,
      numPages: Math.ceil(notes.length / this.state.notesPerPage)
    });
    this.setPageIndex(0);
  }

  setPageIndex = (pageIndex: number) => {
    const { notes, notesPerPage, numPages } = this.state;
    const startIndex = notesPerPage * pageIndex;
    const endIndex = startIndex + notesPerPage;
    const pageNotes = notes.slice(startIndex, endIndex);
    this.setState({
      currPageNotes: pageNotes,
      currPageIndex: pageIndex,
      hasPrevPage: pageIndex > 0,
      hasNextPage: pageIndex < numPages - 1,
    });
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

  state: State = {
    notes: [],
    filterOptions: {},
    numPages: 0,
    notesPerPage: 12,
    currPageIndex: 0,
    currPageNotes: [],
    hasPrevPage: false,
    hasNextPage: false,
    processUploads: this.processUploads,
    setPageIndex: this.setPageIndex,
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