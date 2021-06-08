import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { GlobalContextProvider } from './context/GlobalContext';
import { NoteListContextProvider } from './context/NoteListContext';
import { PlayerContextProvider } from './context/PlayerContext';

import { Index } from './routes/Index';
import { View } from './routes/View';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <NoteListContextProvider>
          <PlayerContextProvider>
            <Switch>
              <Route exact path="/" component={ Index }/>
              <Route path="/view" component={ View }/>
            </Switch>
          </PlayerContextProvider>
        </NoteListContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}