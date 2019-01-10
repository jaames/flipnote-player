import flipnote from 'flipnote.js';
import { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import Icon from '~/components/Icon';
import Slider from './Slider';
import FrameCounter from './FrameCounter';

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
      frameCount: 1,
      showFrameCounter: true,
      showSettingsMenu: false,
      showLayers: { 1: true, 2: true, 3: true },
      smoothScaling: true,
      volume: 100,
    };
    if (process.browser) {
      const playerCanvas = document.createElement('canvas');
      const player = new flipnote.player(playerCanvas, 512, 384);
      player.on('frame:update', index => { this.onFrameUpdate(index) });
      player.on('playback:end', () => { this.onPlaybackEnd() });
      player.on('load', () => { this.onLoad() });
      window.player = player;
      this.player = player;
    }
  }

  componentDidMount() {
    const { player, props } = this;
    if (process.browser) {
      this.resizeCanvas();
      this._resizeHandler = e => { this.resizeCanvas(); }
      window.addEventListener('resize', this._resizeHandler);
      window.onblur = () => {
        this.onPlaybackEnd();
        player.pause();
      };
      this._canvasWrapper.appendChild(player.canvas.el);
      player.open(props.src);
    }
  }

  componentWillUnmount() {
    const { player } = this;
    if (process.browser) {
      player.close();
      player.destroy();
      window.removeEventListener('resize', this._resizeHandler);
      window.onblur = undefined;
      this._canvasWrapper.removeChild(player.canvas.el);
      player = null;
    }
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
          </div>
          <div className="Player__progress">
            <Slider
              className="player__progressSlider"
              min={0}
              max={state.frameCount - 1}
              value={state.currentFrame}
              onChange={value => this.handleProgressBarEvent('change', value)}
              onBeforeChange={value => this.handleProgressBarEvent('inputStart', value)}
              onAfterChange={value => this.handleProgressBarEvent('inputEnd', value)}
            />
          </div>
          <div className="Player__controls">
            <div className="Player__controls__left">
              <Icon icon={state.paused ? 'play' : 'pause'} onClick={e => this.togglePlay()}></Icon>
              <Icon icon="settings" onClick={e => this.toggleSettings()}/>
            </div>
            <div className="Player__controls__right">
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

  }

  onLoad() {
    const { player } = this;
    this.setState({
      type: player.type,
      loop: player.loop,
      currentFrame: player.currentFrame,
      frameCount: player.frameCount,
    });
  }

  handleProgressBarEvent(type, value) {
    switch (type) {
      case 'change':
        this.player.setFrame(value);
        break;
      case "inputStart":
        this.wasPlaying = !this.state.paused;
        this.pause();
        break;
      case "inputEnd":
        if (this.wasPlaying) {
          this.play();
          this.wasPlaying = null;
        }
        break;
    }
  }

  onPlaybackEnd() {
    this.setState({paused: true});
  }

  onFrameUpdate(index) {
    this.setState({currentFrame: index});
  }

  resizeCanvas() {
    var rect = this._canvasWrapper.getBoundingClientRect();
    this.player.resize(rect.width, rect.width * 0.75);
  }
}

FlipnotePlayer.defaultProps = {
  src: '',
};

export default FlipnotePlayer;