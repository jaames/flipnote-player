import { h, Component } from "preact";

import Player from "./player.js";
import Details from "./details.js";

class ViewFlipnote extends Component {
  render(props, state) {
    return (
      <div class="flipnoteView modal">
        <div class="flipnoteView__main modal__region modal__region--left modal__region--gray">
          <Player flipnote={ props.flipnote }></Player>
        </div>
        <div class="flipnoteView__side modal__region modal__region--right">
          <Details flipnote={ props.flipnote }></Details>
        </div>
      </div>
    );
  }
}

export default ViewFlipnote;
