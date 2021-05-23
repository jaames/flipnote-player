import React, { useState, useContext } from 'react';
import { NoteItem } from '../models';
import { NoteThumb } from './NoteThumb';
import styles from '../styles/NoteGrid.module.scss';

interface Props {
  notes: NoteItem[];
  // pageIndex: number;
  // numPages: number;

}

export const NoteGrid: React.FunctionComponent<Props> = ({ notes, }) => {
  return (
    <div className={ styles.container }>
      {notes.map(noteItem => (
        <NoteThumb noteItem={ noteItem } key={ noteItem.key } />
      ))}
    </div>
  );
}