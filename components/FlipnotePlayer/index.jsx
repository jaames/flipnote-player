import flipnote from 'flipnote.js';
import { Component, useState, useRef, useLayoutEffect } from 'react';
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';
import Icon from '~/components/Icon';
import Slider from '~/components/Slider';
import FrameCounter from './FrameCounter';
import SettingsMenu from './SettingsMenu';
import SettingsMenuItem from './SettingsMenuItem';

import '~/assets/styles/components/FlipnotePlayer.scss';

const useStateWithCallback = (initialState, callback) => {
  const [state, setState] = useState(initialState);
  useLayoutEffect(() => callback(state), [state, callback]);
  return [state, setState];
};

const keymap = {
  prevFrame: ['left', 'a'],
  nextFrame: ['right', 'd'],
};

function FlipnotePlayer(props) {

  const canvasWrapper = useRef(null);

  const [type, setType] = useState('PPM');
  const [paused, setPaused] = useStateWithCallback(true, paused => {
    
  });
  const [loop, setLoop] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(1);
  const [showFrameCounter, setShowFrameCounter] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState({ 1: true, 2: true, 3: true });
  const [volume, setVolume] = useState(100);

  useLayoutEffect(() => {
    const playerCanvas = document.createElement('canvas');
    const player = new flipnote.player(playerCanvas, 512, 384);
    player.on('progress', progress => { setCurrentProgress(progress) });
    player.on('frame:update', frameIndex => { setCurrentFrame(frameIndex) });
    player.on('playback:end', () => { setPaused(true) });
    player.on('load', () => {
      setType(player.type);
      setLoop(player.loop);
      setFrameCount(player.frameCount);

      this.props.dispatch({
        type: 'PLAYER_SET_META',
        payload: {
          meta: {
            filesize: player.note.byteLength,
            ...player.meya
          }
        }
      });
     });
    const resizeCanvas = () => {
      const rect = canvasWrapper.current.getBoundingClientRect();
      player.resize(rect.width, rect.width * 0.75);
    }
    resizeCanvas();
    canvasWrapper.current.appendChild(playerCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.player = player;
    player.open(props.src);

    return () => {
      player.clearEvents();
      player.close();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <HotKeys keyMap={keymap} handlers={this}>
      <div className="Player">
        <div className="Player__canvasFrame">
          <div className="Player__canvas" ref={canvasWrapper}>
          </div>
          <FrameCounter 
            isVisible={showFrameCounter}
            current={currentFrame + 1}
            total={frameCount}
          />
          <SettingsMenu
            isVisible={showSettingsMenu}
            onHide={e => setShowSettingsMenu(false) }
          >
            <SettingsMenuItem
              label="Loop"
              value={loop}
              onChange={() => setLoop(!loop)}
            />
            <SettingsMenuItem
              label="Volume"
              type="slider"
              value={props.playerVolume}
              onChange={(v) => this.setVolume(v)}
            />
            <SettingsMenuItem
              label="Show Layer 1"
              value={layerVisibility[1]}
              onChange={() => setLayerVisibility({...layerVisibility, 1: !layerVisibility[1]})}
            />
            <SettingsMenuItem
              label="Show Layer 2"
              value={layerVisibility[2]}
              onChange={() => setLayerVisibility({...layerVisibility, 2: !layerVisibility[2]})}
            />
            { type === 'KWZ' &&
              <SettingsMenuItem
                label="Show Layer 3"
                value={layerVisibility[3]}
                onChange={() => setLayerVisibility({...layerVisibility, 3: !layerVisibility[3]})}
              />
            }
          </SettingsMenu>
        </div>
        <div className="Player__progress">
          <Slider
            className="player__progressSlider"
            min={0}
            max={100}
            step={.1}
            value={currentProgress}
            onChange={value => { player.progress = value; setCurrentProgress(value)}}
            // onBeforeChange={}
            // onAfterChange={}
          />
        </div>
        <div className="Player__controls">
          <div className="ControlsGroup ControlsGroup--left">
            <Icon icon={paused ? 'play' : 'pause'} onClick={e => {setPaused(!paused); if(paused) { player.play() } else { player.pause() }}}></Icon>
            <Icon icon="settings" onClick={e => setShowSettingsMenu(!showSettingsMenu)}/>
          </div>
          <div className="ControlsGroup ControlsGroup--right">
            <Icon icon="firstFrame" disabled={!paused} onClick={e => player.firstFrame()}/>
            <Icon icon="prevFrame" disabled={!paused} onClick={e => player.prevFrame()}/>
            <Icon icon="nextFrame" disabled={!paused} onClick={e => player.nextFrame()}/>
            <Icon icon="lastFrame" disabled={!paused} onClick={(e) => player.lastFrame()}/>
          </div>
        </div>
      </div>
    </HotKeys>
  );

}

// class FlipnotePlayer extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       paused: true,
//       loop: false,
//       type: null,
//       currentFrame: 0,
//       currentProgress: 0,
//       frameCount: 1,
//       showFrameCounter: true,
//       showSettingsMenu: false,
//       showLayers: { 1: true, 2: true, 3: true },
//       volume: 100,
//     };
//     const playerCanvas = document.createElement('canvas');
//     const player = new flipnote.player(playerCanvas, 512, 384);
//     player.on('progress', progress => { this.onPlayerProgress(progress) });
//     player.on('frame:update', frameIndex => { this.onPlayerFrame(frameIndex) });
//     player.on('playback:end', () => { this.onPlaybackEnd() });
//     player.on('load', () => { this.onLoad() });
//     window.player = player;
//     this.player = player;
//   }

//   componentDidMount() {
//     const { player, props } = this;
//     this.resizeCanvas();
//     this._resizeHandler = e => { this.resizeCanvas(); }
//     window.addEventListener('resize', this._resizeHandler);
//     this._canvasWrapper.appendChild(player.canvas.el);
//     player.open(props.src);
//   }

//   componentWillUnmount() {
//     const { player } = this;
//     player.close();
//     player.destroy();
//     window.removeEventListener('resize', this._resizeHandler);
//     window.onblur = undefined;
//     this._canvasWrapper.removeChild(player.canvas.el);
//     this.player = null;
//   }

//   render() {
//     const { props, state } = this;
    
//   }

//   nextFrame() {

//   }

//   play() {
//     const { player } = this;
//     player.play();
//     this.setState({
//       paused: player.paused,
//       showFrameCounter: false,
//     });
//   }

//   pause() {
//     const { player } = this;
//     player.pause(); 
//     this.setState({
//       paused: player.paused,
//       showFrameCounter: true,
//     });
//   }

//   togglePlay() {
//     if (this.state.paused) {
//       this.play();
//     } else {
//       this.pause();
//     }
//   }

//   toggleSettings() {
//     this.setState({showSettingsMenu: !this.state.showSettingsMenu});
//   }

//   toggleLoop() {
//     const loop = !this.player.loop;
//     this.player.loop = loop;
//     this.setState({loop: loop})
//   }

//   toggleLayer(index) {
//     var layers = this.state.showLayers;
//     layers[index] = !layers[index];
//     this.player.setLayerVisibility(index, layers[index]);
//     this.setState({showLayers: layers});
//   }

//   setVolume(value) {
//     this.player.volume = value / 100;
//     this.props.dispatch({
//       type: 'PLAYER_SET_VOLUME',
//       payload: {
//         volume: value
//       }
//     });
//   }

//   onLoad() {
//     
//   }

//   onPlaybackEnd() {
//     this.setState({paused: true});
//   }

//   onPlayerProgress(progress) {
//     this.setState({currentProgress: progress});
//   }

//   onPlayerFrame(frameIndex) {
//     this.setState({currentFrame: frameIndex});
//   }

//   resizeCanvas() {
//     var rect = this._canvasWrapper.getBoundingClientRect();
//     this.player.resize(rect.width, rect.width * 0.75);
//   }
// }

// FlipnotePlayer.defaultProps = {
//   src: '',
// };

export default connect(state => state)(FlipnotePlayer);