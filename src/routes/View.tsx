import React, { useContext } from 'react';
import { FlipnotePlayer } from '../components/FlipnotePlayer';
import { PlayerContext } from '../context/PlayerContext';

interface Props {}

interface State {

}

export function View() {

  const playerCtx = useContext(PlayerContext);
  const meta = playerCtx.note?.meta;
  // const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  // const canvas = useRef<HTMLCanvasElement>(null);
  // useEffect(() => {
  //   if (canvas.current) {
  //     player = new Player(canvas.current, 640, 480);
  //     setIsPlayerReady(true);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (player && playerCtx.note) {
  //     player.openNote(playerCtx.note);
  //   }
  // }, [playerCtx.note]);
  // const meta = playerCtx.note?.meta;

  return (
    <div className="">
      Flipnote by { meta?.current.username }
      {/* <FlipnotePlayer></FlipnotePlayer> */}
    </div>
  );
}