import { useState, useEffect } from 'react';
import { useStoreState } from 'pullstate';
import { PlayerStore } from '~/store';
import Layout from '~/components/Layout';
import FlipnotePlayer from '~/components/FlipnotePlayer';
import FlipnoteDetails from '~/components/FlipnoteDetails';
import ConversionModal from '~/components/ConversionModal';

import '~/assets/styles/pages/view.scss';

export default (props) => {

  const playerNote = useStoreState(PlayerStore, store => store.note);
  const [showConversionModal, setShowConversionModal] = useState(false);

  useEffect(() => {
    PlayerStore.update(store => { store.forcePause = showConversionModal });
  }, [showConversionModal]);

  if (playerNote === null) {
    props.history.push('/');
    return null;
  }

  return (
    <Layout page="view">
      <div className="Section Section--main">
        <div className="Section__body">
          <FlipnotePlayer/>
        </div>
      </div>
      <div className="Section Section--side">
        <div className="Section__title">
          { playerNote && <h4 className="title">Flipnote by { playerNote.meta.current.username }</h4> }
          <div className="Section__actions">
            <div className="Button Button--inline Button--nobg" onClick={ () => { setShowConversionModal(true) } }>Convert</div>
          </div>
        </div>
        <div className="Section__body">
          <FlipnoteDetails/>
        </div>
      </div>
      <ConversionModal isVisible={ showConversionModal } onHide={ () => { setShowConversionModal(false) } }/>
    </Layout>
  );
}