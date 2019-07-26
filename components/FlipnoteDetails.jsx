import { useStoreState } from 'pullstate';
import { PlayerStore } from '~/store';
import { format } from '~/utils';
import convertFlipnoteToGif from '~/converters/gif';

import '~/assets/styles/components/FlipnoteDetails.scss';

export default (props) => {

  const playerNote = useStoreState(PlayerStore, store => store.note);

  if (!playerNote) {
    return (
      <div className="FlipnoteDetails">
        loading...
      </div>
    );
  }

  const meta = playerNote.meta;
  
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
      <div className="Button Button--inline" onClick={ () => { this.convertGif() } }>Convert</div>
    </div>
  );
}