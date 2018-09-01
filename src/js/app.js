import { h, Component } from "preact";
import { connect } from "preact-redux";
import Router, { route } from "preact-router";
import InlineSVG from "react-svg-inline";

import FlipnoteViewer from "views/flipnoteViewer";
import FileSelect from "views/fileSelect";
import Logo from "components/logo";


import flipnote from "flipnote.js";
import util from "util";

function mapStateToProps(state) {
  return {
    src: state.src,
    darkMode: state.darkMode
  };
}

class App extends Component {

  constructor() {
    super();
    this.util = util;
    window.app = this;
    util.ga.init(process.env.GA_TRACKING_ID);
    this.loadSamples();
  }

  render(props, state) {
    return (
      <main class={`app ${props.darkMode ? "is-darkmode" : ""}`}>
        <div class="menuBar menuBar--upper wrap wrap--wide">
          <div class="menuBar__group menuBar__group--left">
            <Logo className="menuBar__logo"/>
            <div class="menuBar__title">
              <h1>Flipnote Player v{process.env.VERSION}</h1>
              <h2 class="menuBar__subTitle">by James Daniel (<a native href="https://twitter.com/rakujira">@rakujira</a>)</h2>
            </div>
          </div>
          <div class="menuBar__group menuBar__group--right">
            <a onClick={ e => this.toggleDarkmode() }>{ props.darkMode ? "Light Mode" : "Dark Mode" }</a>
          </div>
        </div>
        <div class="wrap wrap--wide">
          <Router onChange={ (e) => this.handleRoute(e) }>
            <FileSelect path="/"/>
            <FlipnoteViewer path="/view"/>
          </Router>
        </div>
        <div class="menuBar menuBar--lower wrap wrap--wide">
          <div class="menuBar__group menuBar__group--right">
            <a native href="https://github.com/jaames/flipnote-player">View on GitHub</a>
          </div>
        </div>
      </main>
    );
  }

  loadSamples() {
    util.ajax.getJson("static/ppm/manifest.json", (data) => {
      var items = data["items"].map(item => ({...item, src: `static/ppm/${item.filestem}.ppm`}));
      this.props.dispatch({ type: "LOAD_SAMPLE_MEMOS", data: items });
    });
  }

  toggleDarkmode() {
    this.props.dispatch({ type: "TOGGLE_DARK_MODE" });
  }

  handleRoute(e) {
    util.ga.pageview(e.url);
  }
}

export default connect(mapStateToProps)(App);
