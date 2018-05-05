import { h, Component } from "preact";
import flipnote from "flipnote.js";

export default class FlipnoteCanvas extends Component {
  
  constructor(props) {
    super(props);
    var renderer = new flipnote.player(document.createElement("canvas"), 512, 384);
    renderer.canvas.setFilter("linear");
    renderer.canvas.el.className = "player__canvas";
    renderer.on("frame:update", (index) => { this.props.onFrameUpdate(index) });
    renderer.on("playback:end", () => { this.props.onPlaybackEnd() });
    renderer.on("load", () => { this.props.onLoad(renderer) });
    this.renderer = renderer;
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.src) && (nextProps.src !== this.props.src)) {
      this.open(nextProps.src);
    }
  }

  componentDidMount() {
    this.resizeCanvas();
    this._resizeHandler = (e) => { this.resizeCanvas(); }
    window.addEventListener("resize", this._resizeHandler);
    window.onblur = () => {
      this.props.onPlaybackEnd();
      this.renderer.pause();
    }
    window.flipnote = this.renderer;
    this._wrapper.appendChild(this.renderer.canvas.el);
  }

  componentWillUnmount() {
    this.renderer.close();
    this.renderer.destroy();
    window.removeEventListener("resize", this._resizeHandler);
    window.onblur = undefined;
    this._wrapper.removeChild(this.renderer.canvas.el);
    this.renderer = null;
  }

  render(props, state) {
    return <div ref={(wrapper) => this._wrapper = wrapper}/>;
  }

  open(src) {
    if (src) this.renderer.open(src);
  }

  resizeCanvas() {
    var rect = this._wrapper.getBoundingClientRect();
    this.renderer.canvas.resize(rect.width, rect.width * 0.75);
    if (rect.height > 0 && rect.width > 0) this.renderer.canvas.refresh();
  }
}