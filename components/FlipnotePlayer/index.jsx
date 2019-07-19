import flipnote from 'flipnote.js';
import { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';
import Icon from '~/components/Icon';
import Slider from '~/components/Slider';
import FrameCounter from './FrameCounter';
import SettingsMenu from './SettingsMenu';
import SettingsMenuItem from './SettingsMenuItem';

import '~/assets/styles/components/FlipnotePlayer.scss';

const keymap = {
  prevFrame: ['left', 'a'],
  nextFrame: ['right', 'd'],
};

class FlipnotePlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      loop: false,
      type: null,
      currentFrame: 0,
      currentProgress: 0,
      frameCount: 1,
      showFrameCounter: true,
      showSettingsMenu: false,
      showLayers: { 1: true, 2: true, 3: true },
      volume: 100,
    };
    const playerCanvas = document.createElement('canvas');
    const player = new flipnote.player(playerCanvas, 512, 384);
    player.on('progress', progress => { this.onPlayerProgress(progress) });
    player.on('frame:update', frameIndex => { this.onPlayerFrame(frameIndex) });
    player.on('playback:end', () => { this.onPlaybackEnd() });
    player.on('load', () => { this.onLoad() });
    window.player = player;
    this.player = player;
  }

  componentDidMount() {
    const { player, props } = this;
    this.resizeCanvas();
    this._resizeHandler = e => { this.resizeCanvas(); }
    window.addEventListener('resize', this._resizeHandler);
    this._canvasWrapper.appendChild(player.canvas.el);
    player.open(props.src);
  }

  componentWillUnmount() {
    const { player } = this;
    player.close();
    player.destroy();
    window.removeEventListener('resize', this._resizeHandler);
    window.onblur = undefined;
    this._canvasWrapper.removeChild(player.canvas.el);
    this.player = null;
  }

  render() {
    const { props, state } = this;
    return (
      <HotKeys keyMap={keymap} handlers={this}>
        <div className="Player">
          <div className="Player__canvasFrame">
            <div className="Player__canvas" ref={el => this._canvasWrapper = el}></div>
            <FrameCounter 
              isVisible={state.showFrameCounter}
              current={state.currentFrame + 1}
              total={state.frameCount}
            />
            <SettingsMenu isVisible={state.showSettingsMenu} onHide={e => this.toggleSettings()}>
              <SettingsMenuItem label="Loop" value={state.loop} onChange={() => this.toggleLoop()} />
              <SettingsMenuItem label="Volume" type="slider" value={props.playerVolume} onChange={(v) => this.setVolume(v)} />
              <SettingsMenuItem label="Show Layer 1" value={state.showLayers[1]} onChange={() => this.toggleLayer(1)} />
              <SettingsMenuItem label="Show Layer 2" value={state.showLayers[2]} onChange={() => this.toggleLayer(2)} />
              { state.type === 'KWZ' &&
                <SettingsMenuItem label="Show Layer 3" value={state.showLayers[3]} onChange={() => this.toggleLayer(3)} />
              }
            </SettingsMenu>
          </div>
          <div className="Player__progress">
            <Slider
              className="player__progressSlider"
              min={0}
              max={100}
              step={.1}
              value={state.currentProgress}
              onChange={value => this.player.seek(value)}
              onBeforeChange={value => this.player.startSeek()}
              onAfterChange={value => this.player.endSeek()}
            />
          </div>
          <div className="Player__controls">
            <div className="ControlsGroup ControlsGroup--left">
              <Icon icon={state.paused ? 'play' : 'pause'} onClick={e => this.togglePlay()}></Icon>
              <Icon icon="settings" onClick={e => this.toggleSettings()}/>
            </div>
            <div className="ControlsGroup ControlsGroup--right">
              <Icon icon="firstFrame" disabled={!state.paused} onClick={e => this.player.firstFrame()}/>
              <Icon icon="prevFrame" disabled={!state.paused} onClick={e => this.player.prevFrame()}/>
              <Icon icon="nextFrame" disabled={!state.paused} onClick={e => this.player.nextFrame()}/>
              <Icon icon="lastFrame" disabled={!state.paused} onClick={(e) => this.player.lastFrame()}/>
            </div>
          </div>
        </div>
      </HotKeys>
    );
  }

  nextFrame() {

  }

  play() {
    const { player } = this;
    player.play();
    this.setState({
      paused: player.paused,
      showFrameCounter: false,
    });
  }

  pause() {
    const { player } = this;
    player.pause(); 
    this.setState({
      paused: player.paused,
      showFrameCounter: true,
    });
  }

  togglePlay() {
    if (this.state.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  toggleSettings() {
    this.setState({showSettingsMenu: !this.state.showSettingsMenu});
  }

  toggleLoop() {
    const loop = !this.player.loop;
    this.player.loop = loop;
    this.setState({loop: loop})
  }

  toggleLayer(index) {
    var layers = this.state.showLayers;
    layers[index] = !layers[index];
    this.player.setLayerVisibility(index, layers[index]);
    this.setState({showLayers: layers});
  }

  setVolume(value) {
    this.player.volume = value / 100;
    this.props.dispatch({
      type: 'PLAYER_SET_VOLUME',
      payload: {
        volume: value
      }
    });
  }

  onLoad() {
    const player = this.player;
    const meta = player.meta;
    const byteLength = player.note.byteLength;
    this.setState({
      type: player.type,
      loop: player.loop,
      currentFrame: player.currentFrame,
      frameCount: player.frameCount,
    });
    this.props.dispatch({
      type: 'PLAYER_SET_META',
      payload: {
        meta: {
          filesize: byteLength,
          ...meta
        }
      }
    });
  }

  onPlaybackEnd() {
    this.setState({paused: true});
  }

  onPlayerProgress(progress) {
    this.setState({currentProgress: progress});
  }

  onPlayerFrame(frameIndex) {
    this.setState({currentFrame: frameIndex});
  }

  resizeCanvas() {
    var rect = this._canvasWrapper.getBoundingClientRect();
    this.player.resize(rect.width, rect.width * 0.75);
  }
}

FlipnotePlayer.defaultProps = {
  src: '',
};

export default connect(state => state)(FlipnotePlayer);