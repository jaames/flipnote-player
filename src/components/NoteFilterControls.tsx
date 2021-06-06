import React, { useState, useContext } from 'react';
import { NoteListContext } from '../context/NoteListContext';

interface Props {}

export const NoteFilterControls: React.FunctionComponent<Props> = () => {

  const noteListCtx = useContext(NoteListContext);

  return (
    <div className="FolderList">
      {
      noteListCtx.folders.map(folder => (
        <div
          className="FolderList__item"
          key={ folder.name }
          onClick={() => noteListCtx.toggleFolderFilter(folder)}
        >
          { folder.name }
        </div>
      ))
      }
    </div>
    // <div className="FilterControls">
    //   {(options.formats !== undefined) && (
    //     <div className="FilterControls__formats">
    //       <h3>Formats</h3>
    //       {options.formats.map(format => (
    //         <div className="FilterControls__formatItem">{ format.ext }</div>
    //       ))}
    //     </div>
    //   )}
    //   {(options.folders !== undefined) && (
    //     <div className="FilterControls__files">
    //       <h3>Folders</h3>
    //       {options.folders.map(file => (
    //         <div className="FilterControls__fileItem">{ file.name }</div>
    //       ))}
    //     </div>
    //   )}
    //   {(options.authors !== undefined) && (
    //     <div className="FilterControls__files">
    //       <h3>authors</h3>
    //       {options.authors.map(author => (
    //         <div className="FilterControls__fileItem" key={ author.key }>{ author.username } - { `${author.fsid.toUpperCase().replaceAll('-', '')}00` }</div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  )
}