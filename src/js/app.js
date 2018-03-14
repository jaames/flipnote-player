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
      interpolation: "linear"
    });
    window.app = this;
  }

  componentDidMount() {
    this.flipnote.open("./samples/keke.ppm");
  }

  render() {
    return (
      <main class="app">
        <div class="wrap">
          <div class="modal viewer">
            <div class="viewer__player">
              <Player flipnote={this.flipnote} ref={(node) => {this.player = node;}}/>
            </div>
            <div class="viewer__details">
              <Details flipnote={this.flipnote}/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
