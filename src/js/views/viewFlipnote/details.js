import { h, Component } from "preact";

function humanReadableByteCount(bytes) {
  if (bytes == 0) return "null";
  var k = 1000;
  var sizes = ["B", "KB", "MB", "GB"];
  var exp = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, exp)).toFixed(1) + " " + sizes[exp];
}

function getFsidRegion(fsid) {
  switch (fsid.charAt(0)) {
    case "0":
    case "1":
      return "Japan";
      break;
    case "5":
      return "America";
      break;
    case "9":
      return "Europe";
      break;
    default:
      return "???";
      break;
  }
}

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
      "Region": getFsidRegion(meta.current.fsid),
      "Frames": meta.frame_count,
      "Frame Speed": meta.frame_speed,
      "File Size": humanReadableByteCount(this.memo.fileLength),
    };
    this.setState({ details, author });
  }
}