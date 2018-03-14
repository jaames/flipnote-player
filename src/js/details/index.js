import { h, Component } from "preact";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.memo = props.flipnote;
    this.memo.on("load", () => this._memoLoad());
    this.state = {
      author: "",
      spinoff: false,
      lock: false,
      fps: 0
    };
  }

  render() {
    return (
      <div class="memoInfo">
        <div class="memoInfo__content">
          <h4 class="memoInfo__title">Flipnote By {this.state.author}</h4>
          {this.state.lock ? "locked" : "unlocked"} {this.state.spinoff ? "spinoff" : ""} <br/><br/>
          more meta <br/>
          would go here <br/>
          obviously <br/>
        </div>
      </div>
    );
  }

  _memoLoad() {
    var meta = this.memo.meta;
    this.setState({
      thumbSrc: this.memo.getThumbImage(this.state.thumbWidth, this.state.thumbHeight),
      meta: meta,
      author: meta.current.username,
      spinoff: meta.spinoff,
      lock: meta.lock
    });
  }
}