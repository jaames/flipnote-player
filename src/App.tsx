import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { GlobalContextProvider } from './context/GlobalContext';
import { NoteListContextProvider } from './context/NoteListContext';
import { PlayerContextProvider } from './context/PlayerContext';

import { Index } from './routes/Index';
import { View } from './routes/View';

import {SudomemoService, KaeruGalleryService} from './features/ExternalServices';

(async () => {
  const n = await KaeruGalleryService.getNoteMatchingUrl('https://gallery.kaeru.world/memo/cptmrsepzdnokt5jh5amezju1chc');
  console.log(n);
  // await SudomemoService.getNoteInfo();
  // await sudomemo.getUserInfo();
})()


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