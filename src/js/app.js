import { h, Component } from "preact";
import Router, { route } from "preact-router";
import flipnote from "flipnote.js";
import util from "util";

import FlipnoteViewer from "views/flipnoteViewer";
import FileSelect from "views/fileSelect";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      src: null,
      hasOpenedFlipnote: false,
    };
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
          <Router onChange={ (e) => this.handleRoute(e) }>
            <FlipnoteViewer path="/view" src={ state.src }/>
            <FileSelect path="/" default onFileSelect={ (src) => this.openFlipnote(src) }/>
          </Router>
        </div>
      </main>
    );
  }

  handleRoute(e) {
    switch(e.url) {
      case "/":
        this.closeFlipnote();
        break;
      case "/view":
        if (!this.state.hasOpenedFlipnote) route("/");
        break;
    }
  }

  openFlipnote(src) {
    this.setState({
      src,
      hasOpenedFlipnote: true,
    });
    route("/view");
  }

  closeFlipnote() {
    route("/");
    this.setState({src: null});
  }
}
