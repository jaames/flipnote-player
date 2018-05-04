import { h, Component } from "preact";
import Router, { route } from "preact-router";
import flipnote from "flipnote.js";
import util from "util";

import FlipnoteViewer from "views/flipnoteViewer";
import FileSelect from "views/fileSelect";

export default class App extends Component {

  constructor() {
    super();
    this.flipnote = new flipnote.player(document.createElement("canvas"), 512, 384);
    this.flipnote.canvas.setFilter("linear");
    this.flipnote.canvas.el.className = "player__canvas";
    this.util = util;
    window.app = this;
  }

  render(props, state) {
    return (
      <main class="app">
        <div class="topBar wrap wrap--wide">
          <div class="topBar__group topBar__group--left">
          </div>
          <div class="topBar__group topBar__group--right">
          </div>
        </div>
        <div class="wrap wrap--wide">
          <Router>
            <FileSelect path="/" default onFileSelect={ (source) => this.openFlipnote(source) }/>
            <FlipnoteViewer path="/view" flipnote={this.flipnote}/>
          </Router>
        </div>
      </main>
    );
  }

  openFlipnote(source) {
    this.flipnote.open(source);
    route("/view");
  }
}
