import { h, Component } from "preact";

import Player from "./player.js";
import Details from "./details.js";

class ViewFlipnote extends Component {
  render(props, state) {
    return (
      <div class="modal flipnoteView">
        <div class="flipnoteView__main">
          <Player flipnote={ props.flipnote }></Player>
        </div>
        <div class="flipnoteView__side">
          <Details flipnote={ props.flipnote }></Details>
        </div>
      </div>
    );
  }
}

export default ViewFlipnote;
