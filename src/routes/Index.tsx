import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Flipnote } from 'flipnote.js';
import Dropzone from 'react-dropzone';

import { Layout } from '../components/Layout';
import { NoteFilterControls } from '../components/NoteFilterControls';
import { NoteGrid } from '../components/NoteGrid';

import { GlobalContext } from '../context/GlobalContext';
import { PlayerContext } from '../context/PlayerContext';
import { NoteListContext } from '../context/NoteListContext';

import styles from '../styles/Homepage.module.scss';

export function Index() {
  const history = useHistory();
  const globalCtx = useContext(GlobalContext);
  const playerCtx = useContext(PlayerContext);
  const noteListCtx = useContext(NoteListContext);

  async function onLoadFiles(files: File[]) {
    globalCtx.startLoading();
    await noteListCtx.processUploads(files);
    globalCtx.stopLoading();
  }

  function loadNote(note: Flipnote) {
    playerCtx.openNote(note);
    history.push('/view');
  }

  return (
    <Layout page="home">
      <div className={ styles.container }>
        <div className={ styles.main }>
          <h3>Notes: { noteListCtx.currPageIndex }/{ noteListCtx.numPages }</h3>
          <div>
            <span onClick={ () => noteListCtx.prevPage() }>prev page</span>
            <span onClick={ () => noteListCtx.nextPage() }>next page</span>
          </div>
          <NoteGrid notes={ noteListCtx.currPageNotes }></NoteGrid>
        </div>
        <div className={ styles.side }>
          <Dropzone 
            accept={ ['.ppm', '.kwz', '.kwc', '.ico', '.lst', '.pls'] }
            onDrop={ onLoadFiles }
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div className="Dropzone__inner" { ...getRootProps() }>
                <div className="Dropzone__content">
                  <input { ...getInputProps() }/>
                  <p>Drag &amp; drop Flipnote Studio .PPM or .KWZ files here</p>
                  <div className="Button Button--inline Button--lg">Browse Files</div>
                </div>
              </div>
            )}
          </Dropzone>
          {/* <NoteFilterControls options={ noteListCtx.filterOptions }></NoteFilterControls> */}
        </div>
      </div>
    </Layout>
  );
}