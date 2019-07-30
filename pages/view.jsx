import { useEffect } from 'react';
import { useStoreState } from 'pullstate';
import { PlayerStore } from '~/store';
import Layout from '~/components/Layout';
import FlipnotePlayer from '~/components/FlipnotePlayer';
import FlipnoteDetails from '~/components/FlipnoteDetails';

import '~/assets/styles/pages/view.scss';

export default (props) => {

  const playerNote = useStoreState(PlayerStore, store => store.note);

  if (playerNote === null) {
    props.history.push('/');
    return null;
  }

  const playerAuthor = playerNote.meta.current.username;

  return (
    <Layout page="view">
      <div className="Section Section--main">
        <div className="Section__body">
          <FlipnotePlayer/>
        </div>
      </div>
      <div className="Section Section--side">
        <div className="Section__title">
          { playerAuthor && <h4 className="title">Flipnote by { playerAuthor }</h4> }
        </div>
        <div className="Section__body">
          <FlipnoteDetails/>
        </div>
      </div>
    </Layout>
  );
}