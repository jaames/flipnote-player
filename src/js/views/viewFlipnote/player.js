import { h, Component } from "preact";
import { HotKeys } from "react-hotkeys";

import Slider from "components/slider";
import SettingsMenu from "components/settingsMenu";
import SettingsMenuItem from "components/settingsMenuItem";
import FrameCounter from "components/frameCounter";

const keyMap = {
  prevFrame: ["left", "a"],
  nextFrame: ["right", "d"],
}

export default class player extends Component {

  constructor(props) {
    super(props);
    this.memo = props.flipnote;
    this.state = {
      paused: true,
      loop: false,
      currentFrame: 0,
      frameCount: 1,
      showFrameCounter: false,
      showSettingsMenu: false,
      showLayers: { 1: true, 2: true },
      smoothScaling: true,
      volume: props.flipnote.volume * 100,
    };
    this.keyHandlers = {};
    for (const key in keyMap) if (keyMap.hasOwnProperty(key)) {
      this.keyHandlers[key] = () => this[key]();
    }
  }

  componentDidMount() {
    this.resizeCanvas();
    this.canvasFrame.appendChild(this.memo.canvas.el);
    this._frameUpdate = this._frameUpdate.bind(this);
    this._playbackEnd = this._playbackEnd.bind(this);
    this._memoLoad = this._memoLoad.bind(this);
    this.memo.on("frame:update", this._frameUpdate);
    this.memo.on("playback:end", this._playbackEnd);
    this.memo.on("load", this._memoLoad);
    this._resizeHandler = (e) => { this.resizeCanvas() }
    window.addEventListener("resize", this._resizeHandler);
  }

  componentWillUnmount() {
    this.canvasFrame.removeChild(this.memo.canvas.el);
    this.memo.off("frame:update", this._frameUpdate);
    this.memo.off("playback:end", this._playbackEnd);
    this.memo.off("load", this._memoLoad);
    window.removeEventListener("resize", this._resizeHandler);
  }

  render(props, state) {

    return (
      <HotKeys keyMap={keyMap} handlers={this.keyHandlers}>
      <div class="player">
        <div class="player__canvasFrame" ref={el => this.canvasFrame = el}>
          <SettingsMenu show={this.state.showSettingsMenu} container={this.canvasFrame} onHide={() => this.setState({ showSettingsMenu: false })}>
            <SettingsMenuItem label="Loop" value={this.state.loop} onChange={() => this.toggleLoop()} />
            <SettingsMenuItem label="Volume" type="slider" value={this.state.volume} onChange={(v) => this.setVolume(v)} />
            <SettingsMenuItem label="Layer 1" value={this.state.showLayers[1]} onChange={() => this.toggleLayer(1)} />
            <SettingsMenuItem label="Layer 2" value={this.state.showLayers[2]} onChange={() => this.toggleLayer(2)} />
            <SettingsMenuItem label="Smooth Scaling" value={this.state.smoothScaling} onChange={() => this.toggleSmooth()} />
          </SettingsMenu>
          <FrameCounter visible={this.state.showFrameCounter} currentFrame={this.state.currentFrame} frameCount={this.state.frameCount}/>
          {/* webgl canvas is inserted here -- canvas has the "player__canvas" class*/}
        </div>
        <div class="player__progress">
          <Slider
            className="player__progressSlider"
            min={0}
            max={this.state.frameCount}
            value={this.state.currentFrame}
            onChange={value => this.handleProgressBarEvent("change", value)}
            onBeforeChange={value => this.handleProgressBarEvent("inputStart", value)}
            onAfterChange={value => this.handleProgressBarEvent("inputEnd", value)}
          />
        </div>
        <div class="player__controls controls">
          <div class="controlsGroup controlsGroup--left">
            <i class={["icon", state.paused ? "icon--play" : "icon--pause"].join(" ")} onClick={(e) => this.handleClick("togglePlay", e)}></i>
            <i class="icon icon--cog" onClick={(e) => this.handleClick("toggleSettings", e)}></i>
          </div>
          <div class="controlsGroup controlsGroup--right">  
            <i class="icon icon--firstFrame" onClick={(e) => this.handleClick("firstFrame", e)}></i>
            <i class="icon icon--prevFrame" onClick={(e) => this.handleClick("prevFrame", e)}></i>
            <i class="icon icon--nextFrame" onClick={(e) => this.handleClick("nextFrame", e)}></i>
            <i class="icon icon--lastFrame" onClick={(e) => this.handleClick("lastFrame", e)}></i>
          </div>
        </div>
      </div>
      </HotKeys>
    );
  }

  handleClick(type, e) {
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

  _memoLoad() {
    this.setState({
      loop: this.memo.loop,
      currentFrame: this.memo.currentFrame,
      frameCount: this.memo.frameCount,
    });
  }

  play() {
    this.memo.play(); 
    this.setState({
      paused: this.memo.paused
    });
  }

  pause() {
    this.memo.pause(); 
    this.setState({
      paused: this.memo.paused
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
    this.memo.loop = !this.memo.loop;
    this.setState({
      loop: this.memo.loop
    });
  }

  toggleSettings() {
    this.setState({showSettingsMenu: !this.state.showSettingsMenu});
  }

  toggleLayer(index) {
    var layers = this.state.showLayers;
    layers[index] = !layers[index];
    this.memo.canvas.setLayerVisibilty(index, layers[index] ? 1 : 0);
    this.memo.canvas.refresh();
    this.setState({showLayers: layers});
  }

  toggleSmooth() {
    var smooth = !this.state.smoothScaling;
    this.memo.canvas.setFilter(smooth ? "linear" : "nearest");
    this.memo.canvas.refresh();
    this.setState({smoothScaling: smooth});
  }

  setVolume(level) {
    this.memo.volume = level / 100;
    this.setState({volume: level});
  }

  setFrame(index) {
    this.memo.setFrame(index);
    this.setState({currentFrame: this.memo.currentFrame});
  }

  firstFrame() {
    if (this.state.paused) {
      this.memo.firstFrame();
      this.setState({currentFrame: this.memo.currentFrame});
    }
  }

  prevFrame() {
    if (this.state.paused) {
      this.memo.prevFrame();
      this.setState({currentFrame: this.memo.currentFrame});
    }
  }

  nextFrame() {
    if (this.state.paused) {
      this.memo.nextFrame();
      this.setState({currentFrame: this.memo.currentFrame});
    }
  }

  lastFrame() {
    if (this.state.paused) {
      this.memo.lastFrame();
      this.setState({currentFrame: this.memo.currentFrame});
    }
  }

  resizeCanvas() {
    var rect = this.canvasFrame.getBoundingClientRect();
    this.memo.canvas.resize(rect.width, rect.width * 0.75);
  }
}