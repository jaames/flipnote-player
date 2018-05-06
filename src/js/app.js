import { h, Component } from "preact";
import Router, { route } from "preact-router";
import ReactGA from "react-ga";

import FlipnoteViewer from "views/flipnoteViewer";
import FileSelect from "views/fileSelect";

import flipnote from "flipnote.js";
import util from "util";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      src: null,
      hasOpenedFlipnote: false,
    };
    this.util = util;
    window.app = this;
    ReactGA.initialize(process.env.GA_TRACKING_ID);
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
            <FileSelect path="/" onFileSelect={ (src) => this.openFlipnote(src) }/>
            <FlipnoteViewer path="/view" src={ state.src }/>
          </Router>
        </div>
      </main>
    );
  }

  handleRoute(e) {
    ReactGA.pageview(e.url);
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
