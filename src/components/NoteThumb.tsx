import React, { useContext, useCallback } from 'react';
import { NotegridItem, NotegridItemType } from '../models';
import { PlayerContext } from '../context/PlayerContext';
import { useLongHover, useObjectUrl, gifUrlFromNoteAnimation, gifUrlFromNoteThumb } from '../utils';
import lockIcon from '../assets/svg/Icon/lockOutline.svg';

import styles from '../styles/NoteThumb.module.scss';

interface Props {
  noteItem: NotegridItem;
};

export const NoteThumb: React.FunctionComponent<Props> = ({ noteItem }) => {

  const [isHoverActive, hoverEvents] = useLongHover(750);
  const playerCtx = useContext(PlayerContext);

  // Handle thumbnail clicks to open the note
  const handleClick = useCallback(() => {
    // Sample notes loaded from URL
    if (noteItem && noteItem.type === NotegridItemType.Sample)
      playerCtx.openNoteFromSource(noteItem.source);
    // Upload notes loaded from note object
    else if (noteItem && noteItem.type === NotegridItemType.Uploaded)
      playerCtx.openNote(noteItem.note);
  }, [noteItem]);

  const thumbSrc = useObjectUrl(() => {
    // For upload notes, generate a thumbnail GIF on request
    // TODO: show loader?
    if (noteItem.type === NotegridItemType.Sample)
      return noteItem.thumbUrl;
    else if (noteItem.type === NotegridItemType.Uploaded)
      return gifUrlFromNoteThumb(noteItem.note);
    return '';
  }, [noteItem]);

  const previewSrc = useObjectUrl(() => {
    if (isHoverActive) {
      // Sample notes provide the URL right away
      if (noteItem.type === NotegridItemType.Sample)
        return noteItem.previewUrl;
      // For upload notes, generate an animated GIF on request
      if (noteItem.type === NotegridItemType.Uploaded)
        return gifUrlFromNoteAnimation(noteItem.note);
    }
    return '';
  }, [noteItem, isHoverActive]);

  return (
    <div className={ styles.root } onClick={ handleClick } {...hoverEvents}>
      <div className={ styles.panel }>
        <div
          className={ styles.img }
          style={{ backgroundImage: `url(${ (isHoverActive && previewSrc) ? previewSrc : thumbSrc })` }}
        />
        {noteItem.isLocked && (
          <span className={ styles.lockIcon }>L</span>
        )}
        {noteItem.isSpinoff && (
          <span className={ styles.spinoffIcon }>S</span>
        )}
        <span className={ `${styles.systemIcon} ${noteItem.system}` }>
          { noteItem.system }
        </span>
      </div>
      <div className={ styles.author }>
        { noteItem.authorName }
      </div>
    </div>
  );
}