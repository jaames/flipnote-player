import React, { useState, useContext, useEffect } from 'react';
import { NoteListContext } from '../context/NoteListContext';
import { IndexedItemType, IndexedFolder, IndexedBackupFolder } from '../models';
import { getArrayBufferUrl, revokeUrl } from '../features/GifConverter';

import styles from '../styles/FolderItem.module.scss';

interface Props {
  folder: IndexedFolder | IndexedBackupFolder
}

export const FolderItem: React.FunctionComponent<Props> = ({ folder }) => {

  const [iconSrc, setIconSrc] = useState<string>('');
  const noteListCtx = useContext(NoteListContext);

  // Handle updating images whenever the folder changes
  useEffect(() => {
    if (folder.type === IndexedItemType.Folder && folder.icon)
      setIconSrc(getArrayBufferUrl(folder.icon.gifData));
    else
      setIconSrc('');
    // Revoke old image blob urls (helps reduce memory usage)
    return () => {
      setIconSrc('');
      revokeUrl(iconSrc);
    }
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
      <div className="FolderItem FolderItem--backupFolder">
        { folder.name }
      </div>
    )
  }
}