import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/root.css';

import { App } from './App';
import { GlobalContextProvider } from './context/globalContext';
import { PlayerContextProvider } from './context/playerContext';
import { NoteListContextProvider } from './context/noteListContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <PlayerContextProvider>
          <NoteListContextProvider>
            <App />
          </NoteListContextProvider>
        </PlayerContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
