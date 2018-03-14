import { h, Component } from "preact";
import FrameCounter from "./frameCounter";


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
    };
  }

  render() {
    return (
      <div class="memoPlayer">
        <div class="memoPlayer__canvas" ref={(el) => {this.canvasContainer = el}}>
          <FrameCounter visible={this.state.showFrameCounter} currentFrame={this.state.currentFrame} frameCount={this.state.frameCount}/>
          {/* webgl canvas is inserted here */}
        </div>
        <div class="memoPlayer__controls controls">
          <div class="controlsGroup controlsGroup--left">
            <i class="icon icon--play" onClick={(e) => this.handleClick("togglePlay", e)}></i>
            <i class="icon icon--loop" onClick={(e) => this.handleClick("toggleLoop", e)}></i>
            {/* <span onClick={(e) => this.handleClick("togglePlay", e)}>{this.state.paused ? "play" : "pause"}</span>
            <span onClick={(e) => this.handleClick("toggleLoop", e)}>{this.state.loop ? "loop on" : "loop off"}</span> */}
          </div>
          <div class="controlsGroup controlsGroup--right">  
            <i class="icon icon--firstFrame" onClick={(e) => this.handleClick("firstFrame", e)}></i>
            <i class="icon icon--prevFrame" onClick={(e) => this.handleClick("prevFrame", e)}></i>
            <i class="icon icon--nextFrame" onClick={(e) => this.handleClick("nextFrame", e)}></i>
            <i class="icon icon--lastFrame" onClick={(e) => this.handleClick("lastFrame", e)}></i>
          </div>
        </div>
      </div>
    );
  }

  _frameUpdate(frameIndex) {
    this.setState({currentFrame: frameIndex})
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

  togglePlay() {
    if (this.state.paused) {
      this.memo.play();
    } else {
      this.memo.pause();
    }
    this.setState({
      paused: this.memo.paused
    });
  }

  toggleLoop() {
    this.memo.loop = !this.memo.loop;
    this.setState({
      loop: this.memo.loop
    });
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

  handleClick(type, e) {
    if ("function" === typeof this[type]) this[type](e);
  }

  resizeCanvas() {
    var rect = this.canvasContainer.getBoundingClientRect();
    this.memo.canvas.resize(rect.width, rect.width * 0.75);
  }

  componentDidMount() {
    this.resizeCanvas();
    this.canvasContainer.appendChild(this.memo.canvas.el);
    this._frameUpdate = this._frameUpdate.bind(this);
    this._playbackEnd = this._playbackEnd.bind(this);
    this._memoLoad = this._memoLoad.bind(this);
    this.memo.on("frame:update", this._frameUpdate);
    this.memo.on("playback:end", this._playbackEnd);
    this.memo.on("load", this._memoLoad);
  }

  componentWillUnmount() {
    this.canvasContainer.removeChild(this.memo.canvas.el);
    this.memo.off("frame:update", this._frameUpdate);
    this.memo.off("playback:end", this._playbackEnd);
    this.memo.off("load", this._memoLoad);
  }
}