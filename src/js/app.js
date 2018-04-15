import { h, Component } from "preact";

import flipnote from "./flipnote";
import Player from "./player";
import Details from "./details";


class App extends Component {

  constructor() {
    super();
    this.flipnote = new flipnote(document.createElement("canvas"), {
      width: 512,
      height: 384,
      className: "player__canvas",
      interpolation: "linear",
    });
    window.app = this;
  }

  componentDidMount() {
    this.flipnote.open("./static/ppm/hatch.ppm");
    this.flipnote.volume = 0.5;
  }

  render(props, state) {
    return (
      <main class="app">
        <div class="wrap wrap--wide">
          <div class="modal flipnoteView">
            <div class="flipnoteView__main">
             <Player flipnote={this.flipnote}></Player>
            </div>
            <div class="flipnoteView__side">
              <Details flipnote={this.flipnote}></Details>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
