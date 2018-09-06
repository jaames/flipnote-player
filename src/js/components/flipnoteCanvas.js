import { h, Component } from "preact";
import flipnote from "flipnote.js";

export default class FlipnoteCanvas extends Component {
  
  constructor(props) {
    super(props);
    var player = new flipnote.player(document.createElement("canvas"), 512, 384);
    player.canvas.el.className = "player__canvas";
    player.on("frame:update", (index) => { this.props.onFrameUpdate(index) });
    player.on("playback:end", () => { this.props.onPlaybackEnd() });
    player.on("load", () => { this.props.onLoad(player) });
    this.player = player;
  }

  componentDidMount() {
    this.resizeCanvas();
    this._resizeHandler = (e) => { this.resizeCanvas(); }
    window.addEventListener("resize", this._resizeHandler);
    window.onblur = () => {
      this.props.onPlaybackEnd();
      this.player.pause();
    }
    window.flipnote = this.player;
    this._wrapper.appendChild(this.player.canvas.el);
    this.open(this.props.src);
  }

  componentWillUnmount() {
    this.player.close();
    this.player.destroy();
    window.removeEventListener("resize", this._resizeHandler);
    window.onblur = undefined;
    this._wrapper.removeChild(this.player.canvas.el);
    this.player = null;
  }

  render(props, state) {
    return <div ref={(wrapper) => this._wrapper = wrapper}/>;
  }

  open(src) {
    if (src) this.player.open(src);
  }

  resizeCanvas() {
    var rect = this._wrapper.getBoundingClientRect();
    this.player.resize(rect.width, rect.width * 0.75);
    // if (rect.height > 0 && rect.width > 0) this.player.canvas.refresh();
  }
}