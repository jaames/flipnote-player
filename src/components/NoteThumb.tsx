import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLongHover } from '../utils';
import { getNoteThumbUrl, getNoteAnimationUrl, revokeUrl } from '../features/GifConverter';
import { NotegridItem, NotegridItemType } from '../models';
import { PlayerContext } from '../context/PlayerContext';
import lockIcon from '../assets/svg/Icon/lockOutline.svg';

import styles from '../styles/NoteThumb.module.scss';

interface Props {
  noteItem: NotegridItem;
}

export const NoteThumb: React.FunctionComponent<Props> = ({ noteItem }) => {

  const [thumbSrc, setThumbSrc] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [isHoverActive, hoverEvents] = useLongHover(750);
  const playerCtx = useContext(PlayerContext);

  // Handle thumbnail clicks to open the note
  const handleClick = useCallback(() => {
    // If no noteItem
    if (!noteItem) {
      setThumbSrc('');
      setPreviewSrc('');
    }
    // Sample notes loaded from URL
    else if (noteItem && noteItem.type === NotegridItemType.Sample)
      playerCtx.openNoteFromSource(noteItem.source);
    // Upload notes loaded from note object
    else if (noteItem && noteItem.type === NotegridItemType.Uploaded)
      playerCtx.openNote(noteItem.note);
  }, [noteItem]);

  // Handle updating images whenever the note item changes
  useEffect(() => {
    // Sample notes provide the URL right away
    if (noteItem.type === NotegridItemType.Sample)
      setThumbSrc(noteItem.thumbUrl);
    // For upload notes, generate a thumbnail GIF on request
    // TODO: show loader?
    else if (noteItem.type === NotegridItemType.Uploaded)
      setThumbSrc(getNoteThumbUrl(noteItem.note));
    // Revoke old image blob urls (helps reduce memory usage)
    return () => {
      setThumbSrc('');
      setPreviewSrc('');
      revokeUrl(thumbSrc);
      revokeUrl(previewSrc);
    }
  }, [noteItem]);

  // Handle showing a preview GIF on long hover
  useEffect(() => {
    if (isHoverActive && !previewSrc) {
      // Sample notes provide the URL right away
      if (noteItem.type === NotegridItemType.Sample)
        setPreviewSrc(noteItem.previewUrl);
      // For upload notes, generate an animated GIF on request
      if (noteItem.type === NotegridItemType.Uploaded)
        setPreviewSrc(getNoteAnimationUrl(noteItem.note));
    }
  }, [isHoverActive, noteItem]);

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