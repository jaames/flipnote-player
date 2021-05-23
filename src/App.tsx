import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { GlobalContextProvider } from './context/GlobalContext';
import { NoteListContextProvider } from './context/NoteListContext';
import { PlayerContextProvider } from './context/PlayerContext';

import { Index } from './routes/Index';
import { View } from './routes/View';

export default function App() {
  return (
    <GlobalContextProvider>
      <NoteListContextProvider>
        <PlayerContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={ Index }/>
              <Route path="/view" component={ View }/>
            </Switch>
          </Router>
        </PlayerContextProvider>
      </NoteListContextProvider>
    </GlobalContextProvider>
  );
}