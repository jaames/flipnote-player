import React, { useState, useContext, useEffect } from 'react';
import { NoteListContext } from '../context/NoteListContext';
import { IndexedItemType, IndexedFolder, IndexedBackupFolder } from '../models';
import { gifUrlFromArrayBuffer, useObjectUrl } from '../utils';

import styles from '../styles/FolderItem.module.scss';

interface Props {
  folder: IndexedFolder | IndexedBackupFolder
}

export const FolderItem: React.FunctionComponent<Props> = ({ folder }) => {

  const noteListCtx = useContext(NoteListContext);
  const iconSrc = useObjectUrl(() => {
    if (folder.type === IndexedItemType.Folder && folder.icon)
      return gifUrlFromArrayBuffer(folder.icon.gifData);
    else
      return '';
  }, [folder]);

  if (folder.type === IndexedItemType.Folder) {
    return (
      <div className={ styles.root } onClick={() => noteListCtx.toggleFolderFilter(folder)}>
        <img className={ styles.icon } src={ iconSrc }/>
        <div className={ styles.name }>{ folder.name }</div>
      </div>
    )
  }

  else {
    return (
      <div className={ styles.root } onClick={() => noteListCtx.toggleBackupFilter(folder)}>
        <img className={ styles.icon } src={ iconSrc }/>
        <div className={ styles.name }>{ folder.date.day }/{ folder.date.month }/{ folder.date.year }</div>
      </div>
    )
  }
}