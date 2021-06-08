import React, { createContext } from 'react';
import { Flipnote, parseSource } from 'flipnote.js';
import { withRouter, RouteComponentProps } from 'react-router';
import { ExternalServiceClient } from '../features/ExternalServiceClient';
import { ExternalFlipnoteItem, ExternalAuthorItem } from '../models/ExternalServiceTypes';

interface Props extends RouteComponentProps {};

interface State {
  isNoteOpen: boolean;
  note?: Flipnote;
  externalNotes: ExternalFlipnoteItem[];
  externalAuthors: ExternalAuthorItem[];
  openNote: (note: Flipnote) => void;
  openNoteFromSource: (source: any) => void;
  closeNote: () => void;
};

export const PlayerContext = createContext<State>({
  isNoteOpen: false,
  note: undefined,
  externalNotes: [],
  externalAuthors: [],
  openNote: () => {},
  openNoteFromSource: () => {},
  closeNote: () => {},
});

// actual export w/ withRouter() is below
class _PlayerContextProvider extends React.Component<Props, State> {

  public serviceClient = new ExternalServiceClient();

  openNote = (note: Flipnote) => {
    this.setState({ isNoteOpen: true, note });
    this.props.history.push('/view');
    this.fetchExternalLinks(note);
  }

  openNoteFromSource = async (source: any) => {
    try {
      // TODO: if source is string, try to transform url through serviceClient
      const note = await parseSource(source);
      this.openNote(note);
    }
    catch(e) {

    }
  }

  closeNote = () => {
    this.setState({
      isNoteOpen: false,
      note: undefined,
      externalNotes: [],
      externalAuthors: []
    });
  }

  fetchExternalLinks = async (note: Flipnote) => {
    const [externalNotes, externalAuthors] = await Promise.all([
      this.serviceClient.getNoteDetails(note),
      this.serviceClient.getAuthorDetails(note.meta.current.fsid),
    ]);
    this.setState({ externalNotes, externalAuthors });
  }

  state: State = {
    isNoteOpen: false,
    note: undefined,
    externalNotes: [],
    externalAuthors: [],
    openNote: this.openNote,
    openNoteFromSource: this.openNoteFromSource,
    closeNote: this.closeNote,
  };

  render() {
    return (
      <PlayerContext.Provider value={ this.state }>
        { this.props.children }
      </PlayerContext.Provider>
    );
  }
}

export const PlayerContextProvider = withRouter(_PlayerContextProvider);