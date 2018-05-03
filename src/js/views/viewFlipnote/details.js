import { h, Component } from "preact";
import format from "util/format";
import flipnoteStudio from "util/flipnoteStudio";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.memo = props.flipnote;
    this.memo.on("load", () => this._memoLoad());
    this.state = {
      author: "",
      details: {}
    };
  }

  render(props, state) {
    var details = [];
    for (var key in state.details) {
      details.push(
        <div class="detail__stat" key={ key }>
          <span class="stat__title">{ key }</span>
          <span class="stat__value">{ state.details[key] }</span>
        </div>
      );
    }
    return (
      <div class="detail">
        <h4 class="detail__title">Flipnote By {state.author}</h4>
        { details }
      </div>
    );
  }

  _memoLoad() {
    var meta = this.memo.meta;
    var author = meta.current.username;
    var details = {
      "Created": meta.timestamp.toLocaleDateString(),
      "Region": flipnoteStudio.getFsidRegion(meta.current.fsid),
      "Frames": meta.frame_count,
      "Frame Speed": meta.frame_speed,
      "File Size": format.byteCount(this.memo.fileLength),
    };
    this.setState({ details, author });
  }
}