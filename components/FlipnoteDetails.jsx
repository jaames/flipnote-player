import { useState, useEffect } from 'react';
import { useStoreState } from 'pullstate';
import { PlayerStore } from '~/store';
import { flipnoteStudio, format, externalServices } from '~/utils';
import KaeruGallerySvg from '~/assets/svg/kaeru_gallery.svg';
import IpgFlipSvg from '~/assets/svg/ipgflip.svg';
import SudomemoFoxSvg from '~/assets/svg/sudomemo_fox.svg';

import '~/assets/styles/components/FlipnoteDetails.scss';

export default (props) => {

  const playerNote = useStoreState(PlayerStore, store => store.note);
  const [kaeruGalleryUrl, setKaeruGalleryUrl] = useState(false);
  const [ipgFlipUrl, setIpgFlipUrl] = useState(false);
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
      externalServices.ipgFlip.checkFlipnoteExists(meta.current.fsid, meta.current.filename)
        .then(setIpgFlipUrl)
        .catch(err => {});
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
      <div className="DetailItem">
        <span className="DetailItem__title">Created:</span>
        <span className="DetailItem__value">{ meta.timestamp.toLocaleDateString() }</span>
      </div>
      <div className="DetailItem">
        <span className="DetailItem__title">Frames:</span>
        <span className="DetailItem__value">{ meta.frame_count }</span>
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
        <span className="DetailItem__title">User ID:</span>
        <span className="DetailItem__value">{ playerNote.type === 'KWZ' ? flipnoteStudio.formatKwzFsid(meta.current.fsid) : meta.current.fsid }</span>
      </div>
      { playerNote.type === 'PPM' && (
        <div className="DetailItem">
          <span className="DetailItem__title">Region:</span>
          <span className="DetailItem__value">{ flipnoteStudio.getFsidRegion(meta.current.fsid) }</span>
        </div>
      )}
      { kaeruGalleryUrl && (
      <a href={ kaeruGalleryUrl } target="blank" className="DetailLink DetailLink--kaeruGallery">
        <KaeruGallerySvg className="DetailLink__icon"/>
        <div className="DetailLink__title">
          View this Flipnote on Kaeru Gallery
        </div>
      </a>
      )}
      { ipgFlipUrl && (
      <a href={ ipgFlipUrl } target="blank" className="DetailLink DetailLink--ipgFlip">
        <IpgFlipSvg className="DetailLink__icon"/>
        <div className="DetailLink__title">
          View this Flipnote on IPGFlip
        </div>
      </a>
      )}
      { sudomemoUrl && (
      <a href={ sudomemoUrl } target="blank" className="DetailLink DetailLink--sudomemo">
        <SudomemoFoxSvg className="DetailLink__icon"/>
        <div className="DetailLink__title">
          View this Flipnote on Sudomemo
        </div>
      </a>
      )}
    </div>
  );
}