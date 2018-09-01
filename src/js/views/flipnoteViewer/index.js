import { h, Component } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { HotKeys } from "react-hotkeys";

import Slider from "components/slider";
import SettingsMenu from "components/settingsMenu";
import SettingsMenuItem from "components/settingsMenuItem";
import FrameCounter from "components/frameCounter";
import FlipnoteCanvas from "components/flipnoteCanvas";
import Icon from "components/icon";

import storage from "util/storage";
import format from "util/format";
import flipnoteStudio from "util/flipnoteStudio"

const keyMap = {
  prevFrame: ["left", "a"],
  nextFrame: ["right", "d"],
}

function mapStateToProps(state) {
  return {
    src: state.src,
    meta: state.meta,
  };
}

class ViewFlipnote extends Component {

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
      details: {},
      authorName: ""
    };
    this.keyHandlers = {};
    for (const key in keyMap) if (keyMap.hasOwnProperty(key)) {
      this.keyHandlers[key] = () => this[key]();
    }
  }

  componentDidMount() {
    if (!this.props.src) route("/", true);
  }

  render(props, state) {
    var meta = this.props.meta;
    var isPPM = this.state.type == "PPM";
    return (
      <div class="flipnoteView modal">
        <div class="flipnoteView__main modal__region modal__region--left modal__region--gray">
          <HotKeys keyMap={keyMap} handlers={this.keyHandlers}>
            <div class="player">
              <div class="player__canvasFrame" ref={el => this.canvasFrame = el}>
                <FlipnoteCanvas src={props.src} onLoad={(note) => this._onLoad(note)} onFrameUpdate={(i) => this._frameUpdate(i)} onPlaybackEnd={() => this._playbackEnd()}/>
                <SettingsMenu show={state.showSettingsMenu} container={this.canvasFrame} onHide={() => this.setState({ showSettingsMenu: false })}>
                  <SettingsMenuItem label="Loop" value={state.loop} onChange={() => this.toggleLoop()} />
                  {
                    isPPM &&
                    <SettingsMenuItem label="Volume" type="slider" value={state.volume} onChange={(v) => this.setVolume(v)} />
                  }
                  <SettingsMenuItem label="Show Layer 1" value={state.showLayers[1]} onChange={() => this.toggleLayer(1)} />
                  <SettingsMenuItem label="Show Layer 2" value={state.showLayers[2]} onChange={() => this.toggleLayer(2)} />
                  { !isPPM && 
                    <SettingsMenuItem label="Show Layer 3" value={state.showLayers[3]} onChange={() => this.toggleLayer(3)} />
                  }
                  {
                    isPPM &&
                    <SettingsMenuItem label="Smooth Display" value={state.smoothScaling} onChange={() => this.toggleSmoothing()} />
                  }
                   </SettingsMenu>
                <FrameCounter show={state.showFrameCounter} current={state.currentFrame + 1} total={state.frameCount}/>
              </div>
              <div class="player__progress">
                <Slider
                  className="player__progressSlider"
                  min={0}
                  max={state.frameCount - 1}
                  value={state.currentFrame}
                  onChange={value => this.handleProgressBarEvent("change", value)}
                  onBeforeChange={value => this.handleProgressBarEvent("inputStart", value)}
                  onAfterChange={value => this.handleProgressBarEvent("inputEnd", value)}
                />
              </div>
              <div class="player__controls">
                <div class="controlsGroup controlsGroup--left">
                  <Icon icon={state.paused ? "play" : "pause"} width="32" height="32" onClick={(e) => this.togglePlay(e)}/>
                  <Icon icon="settings" width="32" height="32" onClick={(e) => this.toggleSettings(e)}/>
                </div>
                <div class="controlsGroup controlsGroup--right">
                  <Icon icon="firstFrame" disabled={!state.paused} width="32" height="32" onClick={(e) => this.firstFrame(e)}/>
                  <Icon icon="prevFrame" disabled={!state.paused} width="32" height="32" onClick={(e) => this.prevFrame(e)}/>
                  <Icon icon="nextFrame" disabled={!state.paused} width="32" height="32" onClick={(e) => this.nextFrame(e)}/>
                  <Icon icon="lastFrame" disabled={!state.paused} width="32" height="32" onClick={(e) => this.lastFrame(e)}/>
                </div>
              </div>
            </div>
          </HotKeys>
        </div>
        <div class="flipnoteView__side modal__region modal__region--right">
          <div class="detail">
            <h4 class="detail__title">Flipnote By {state.authorName}</h4>
            { Object.keys(state.details).map((key, index) => (
              <div class="detail__stat" key={ index }>
                <span class="stat__title">{ key }</span>
                <span class="stat__value">{ state.details[key] }</span>
              </div>
            ))}
            { meta.links && 
              <div class="detail__stat detail__stat--links">
                <span class="stat__title">Creator's Links</span>
                <ul class="stat__value"> 
                { Object.keys(meta.links || {}).map((linkTitle, index) => (
                  <li class="link" key={ index }>
                    <a href={ meta.links[linkTitle] }>{ linkTitle }</a>
                  </li>
                 ))}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

  handleProgressBarEvent(type, value) {
    switch (type) {
      case "change":
        this.setFrame(value);
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

  _frameUpdate(frameIndex) {
    this.setState({currentFrame: frameIndex});
  }

  _playbackEnd() {
    this.setState({paused: true});
  }

  _onLoad(flipnote) {
    this.flipnote = flipnote;
    this.setVolume(storage.get("volume", 50));
    this.setSmoothing(storage.get("smoothing", true));
    this.setState({
      type: flipnote.type,
      loop: flipnote.loop,
      currentFrame: flipnote.currentFrame,
      frameCount: flipnote.frameCount,
      authorName: flipnote.meta.current.username,
      details: {
        "Created": flipnote.meta.timestamp.toLocaleDateString(),
        "Region": flipnoteStudio.getFsidRegion(flipnote.meta.current.fsid),
        "Frames": flipnote.meta.frame_count,
        "Frame Speed": flipnote.meta.frame_speed,
        "File Size": format.byteCount(flipnote.fileLength),
      }
    });
  }

  play() {
    this.flipnote.play(); 
    this.setState({
      paused: this.flipnote.paused,
      showFrameCounter: false,
    });
  }

  pause() {
    this.flipnote.pause(); 
    this.setState({
      paused: this.flipnote.paused,
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

  toggleLoop() {
    this.flipnote.loop = !this.flipnote.loop;
    this.setState({
      loop: this.flipnote.loop
    });
  }

  toggleSettings(e) {
    e.stopPropagation();
    this.setState({showSettingsMenu: !this.state.showSettingsMenu});
  }

  toggleLayer(index) {
    var layers = this.state.showLayers;
    layers[index] = !layers[index];
    this.flipnote.setLayerVisibility(index, layers[index]);
    this.setState({showLayers: layers});
  }

  toggleSmoothing() {
    this.setSmoothing(!this.state.smoothScaling);
  }

  setSmoothing(isSmooth) {
    this.flipnote.setSmoothRendering(isSmooth);
    this.setState({smoothScaling: isSmooth});
  }

  setVolume(level) {
    this.flipnote.volume = level / 100;
    storage.set("volume", level);
    this.setState({volume: level});
  }

  setFrame(index) {
    this.flipnote.setFrame(index);
    this.setState({currentFrame: this.flipnote.currentFrame});
  }

  firstFrame() {
    if (this.state.paused) {
      this.flipnote.firstFrame();
      this.setState({currentFrame: this.flipnote.currentFrame});
    }
  }

  prevFrame() {
    if (this.state.paused) {
      this.flipnote.prevFrame();
      this.setState({currentFrame: this.flipnote.currentFrame});
    }
  }

  nextFrame() {
    if (this.state.paused) {
      this.flipnote.nextFrame();
      this.setState({currentFrame: this.flipnote.currentFrame});
    }
  }

  lastFrame() {
    if (this.state.paused) {
      this.flipnote.lastFrame();
      this.setState({currentFrame: this.flipnote.currentFrame});
    }
  }
}

export default connect(mapStateToProps)(ViewFlipnote);