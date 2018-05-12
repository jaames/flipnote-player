import { h, Component } from "preact";
import { connect } from "preact-redux";
import { HotKeys } from "react-hotkeys";

import Slider from "components/slider";
import SettingsMenu from "components/settingsMenu";
import SettingsMenuItem from "components/settingsMenuItem";
import FrameCounter from "components/frameCounter";
import FlipnoteCanvas from "components/flipnoteCanvas";

import storage from "util/storage";
import format from "util/format";
import flipnoteStudio from "util/flipnoteStudio"

const keyMap = {
  prevFrame: ["left", "a"],
  nextFrame: ["right", "d"],
}

function mapStateToProps(state) {
  return {
    src: state.src
  };
}

class ViewFlipnote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      loop: false,
      currentFrame: 0,
      frameCount: 1,
      showFrameCounter: true,
      showSettingsMenu: false,
      showLayers: { 1: true, 2: true },
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

  render(props, state) {
    return (
      <div class="flipnoteView modal">
        <div class="flipnoteView__main modal__region modal__region--left modal__region--gray">
          <HotKeys keyMap={keyMap} handlers={this.keyHandlers}>
            <div class="player">
              <div class="player__canvasFrame" ref={el => this.canvasFrame = el}>
                <FlipnoteCanvas src={props.src} onLoad={(note) => this._onLoad(note)} onFrameUpdate={(i) => this._frameUpdate(i)} onPlaybackEnd={() => this._playbackEnd()}/>
                <SettingsMenu show={state.showSettingsMenu} container={this.canvasFrame} onHide={() => this.setState({ showSettingsMenu: false })}>
                  <SettingsMenuItem label="Loop" value={state.loop} onChange={() => this.toggleLoop()} />
                  <SettingsMenuItem label="Volume" type="slider" value={state.volume} onChange={(v) => this.setVolume(v)} />
                  <SettingsMenuItem label="Show Layer 1" value={state.showLayers[1]} onChange={() => this.toggleLayer(1)} />
                  <SettingsMenuItem label="Show Layer 2" value={state.showLayers[2]} onChange={() => this.toggleLayer(2)} />
                  <SettingsMenuItem label="Smooth Display" value={state.smoothScaling} onChange={() => this.toggleSmoothing()} />
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
                  <i class={`icon ${state.paused ? "icon--play" : "icon--pause"}`} onClick={(e) => this.handleIcon("togglePlay", e)}></i>
                  <i class="icon icon--settings" onClick={(e) => this.handleIcon("toggleSettings", e)}></i>
                </div>
                <div class="controlsGroup controlsGroup--right">  
                  <i class={`icon icon--firstFrame ${state.paused ? "" : "icon--disabled"}`} onClick={(e) => this.handleIcon("firstFrame", e)}></i>
                  <i class={`icon icon--prevFrame ${state.paused ? "" : "icon--disabled"}`} onClick={(e) => this.handleIcon("prevFrame", e)}></i>
                  <i class={`icon icon--nextFrame ${state.paused ? "" : "icon--disabled"}`} onClick={(e) => this.handleIcon("nextFrame", e)}></i>
                  <i class={`icon icon--lastFrame ${state.paused ? "" : "icon--disabled"}`} onClick={(e) => this.handleIcon("lastFrame", e)}></i>
                </div>
              </div>
            </div>
          </HotKeys>
        </div>
        <div class="flipnoteView__side modal__region modal__region--right">
          <div class="detail">
            <h4 class="detail__title">Flipnote By {state.authorName}</h4>
            { 
              Object.keys(state.details).map((key, index) => {
                return (
                  <div class="detail__stat" key={ key }>
                    <span class="stat__title">{ key }</span>
                    <span class="stat__value">{ state.details[key] }</span>
                  </div>
                );
              })
            }
            { props.test }
          </div>
        </div>
      </div>
    );
  }

  handleIcon(type, e) {
    if (type == "toggleSettings") e.stopPropagation();
    if ("function" === typeof this[type]) this[type](e);
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

  toggleSettings() {
    this.setState({showSettingsMenu: !this.state.showSettingsMenu});
  }

  toggleLayer(index) {
    var layers = this.state.showLayers;
    layers[index] = !layers[index];
    this.flipnote.canvas.setLayerVisibilty(index, layers[index] ? 1 : 0);
    this.flipnote.canvas.refresh();
    this.setState({showLayers: layers});
  }

  toggleSmoothing() {
    this.setSmoothing(!this.state.smoothScaling);
  }

  setSmoothing(isSmooth) {
    this.flipnote.canvas.setFilter(isSmooth ? "linear" : "nearest");
    this.flipnote.canvas.refresh();
    storage.set("smoothing", isSmooth);
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