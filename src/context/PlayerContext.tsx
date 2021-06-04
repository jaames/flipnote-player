import React, { createContext } from 'react';
import { Flipnote, parseSource } from 'flipnote.js';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {};

interface State {
  isNoteOpen: boolean;
  note?: Flipnote;
  openNote: (note: Flipnote) => void;
  openNoteFromSource: (source: any) => void;
  closeNote: () => void;
};

export const PlayerContext = createContext<State>({
  isNoteOpen: false,
  note: undefined,
  openNote: () => {},
  openNoteFromSource: () => {},
  closeNote: () => {},
});

// actual export w/ withRouter() is below
class _PlayerContextProvider extends React.Component<Props, State> {

  openNote = (note: Flipnote) => {
    this.setState({ isNoteOpen: true, note });
    this.props.history.push('/view');
  }

  openNoteFromSource = async (source: any) => {
    try {
      const note = await parseSource(source);
      this.openNote(note);
    }
    catch(e) {

    }
  }

  closeNote = () => {
    this.setState({
      isNoteOpen: false,
      note: undefined
    });
  }

  state: State = {
    isNoteOpen: false,
    note: undefined,
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