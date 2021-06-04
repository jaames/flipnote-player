import React, { useState, useContext } from 'react';
import { NotegridItem } from '../models';
import { NoteThumb } from './NoteThumb';
import styles from '../styles/NoteGrid.module.scss';

interface Props {
  notes: NotegridItem[];
  // pageIndex: number;
  // numPages: number;

}

export const NoteGrid: React.FunctionComponent<Props> = ({ notes, }) => {
  return (
    <div className={ styles.container }>
      {notes.map(noteItem => (
        <NoteThumb noteItem={ noteItem } key={ noteItem.hash } />
      ))}
    </div>
  );
}