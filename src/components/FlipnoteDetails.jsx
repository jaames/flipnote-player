import { useState, useEffect } from 'react';
import { useStoreState } from 'pullstate';
import { PlayerStore } from '@/store';
import { flipnoteStudio, format, externalServices } from '@/utils';
import KaeruGallerySvg from '@/svg/kaeru_gallery.svg?react';
import SudomemoFoxSvg from '@/svg/sudomemo_fox.svg?react';
import Icon from '@/components/Icon';

import '@/styles/components/FlipnoteDetails.scss';

export default (props) => {

  const playerNote = useStoreState(PlayerStore, store => store.note);
  const [kaeruGalleryUrl, setKaeruGalleryUrl] = useState(false);
  const [sudomemoUrl, setSudomemoUrl] = useState(false);

  if (!playerNote) {
    return (
      <div className="FlipnoteDetails">
        loading...
      </div>
    );
  }

  const meta = playerNote.meta;

  useEffect(() => {
    if (playerNote.type === 'PPM') {
      externalServices.sudomemo.checkFlipnoteExists(meta.current.fsid, meta.current.filename)
        .then(setSudomemoUrl)
        .catch(err => {});
    } 
    else if (playerNote.type === 'KWZ') {
      externalServices.kaeruGallery.checkFlipnoteExists(meta.current.fsid, meta.current.filename)
        .then(setKaeruGalleryUrl)
        .catch(err => {});
    }
  }, [playerNote]);
  
  
  return (
    <div className="FlipnoteDetails">
      <div className="DetailItemList">
        <div className="DetailItem">
          <span className="DetailItem__title">Created:</span>
          <span className="DetailItem__value">{ meta.timestamp.toLocaleDateString() }</span>
        </div>
        <div className="DetailItem">
          <span className="DetailItem__title">Frames:</span>
          <span className="DetailItem__value">{ meta.frameCount }</span>
        </div>
        <div className="DetailItem">
          <span className="DetailItem__title">Frame Rate:</span>
          <span className="DetailItem__value">{ playerNote.framerate } FPS</span>
        </div>
        <div className="DetailItem">
          <span className="DetailItem__title">Filesize:</span>
          <span className="DetailItem__value">{ format.byteCount(playerNote.buffer.byteLength) }</span>
        </div>
        <div className="DetailItem">
            <span className="DetailItem__title">Author ID:</span>
            <span className="DetailItem__value">{ meta.current.fsid }</span>
          </div>
        { playerNote.format === 'PPM' && (
          <div className="DetailItem">
            <span className="DetailItem__title">Region:</span>
            <span className="DetailItem__value">{ flipnoteStudio.getFsidRegion(meta.current.fsid) }</span>
          </div>
        )}
      </div>
      { kaeruGalleryUrl && (
      <a href={ kaeruGalleryUrl } target="blank" className="DetailLink DetailLink--kaeruGallery">
        <KaeruGallerySvg className="DetailLink__icon"/>
        <div className="DetailLink__title">
          View this Flipnote on Kaeru Gallery
        </div>
        <Icon icon="externalService" disabled={true}></Icon>
      </a>
      )}
      { sudomemoUrl && (
      <a href={ sudomemoUrl } target="blank" className="DetailLink DetailLink--sudomemo">
        <SudomemoFoxSvg className="DetailLink__icon"/>
        <div className="DetailLink__title">
          View this Flipnote on Sudomemo
        </div>
        <Icon icon="externalService" disabled={true}></Icon>
      </a>
      )}
    </div>
  );
}