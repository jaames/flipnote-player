import { h, Component } from "preact";
import { connect } from "preact-redux";
import Router, { route } from "preact-router";
import InlineSVG from "react-svg-inline";

import FlipnoteViewer from "views/flipnoteViewer";
import FileSelect from "views/fileSelect";
import Logo from "components/logo";
import Icon from "components/icon";

import flipnote from "flipnote.js";
import util from "util";

function mapStateToProps(state) {
  return {
    src: state.src,
    darkMode: state.darkMode
  };
}

class App extends Component {

  constructor(props) {
    super(props);
    this.util = util;
    window.app = this;
    util.ga.init(process.env.GA_TRACKING_ID);
  }

  render(props, state) {
    return (
      <main class={`app ${props.darkMode ? "is-darkmode" : ""}`}>
        <div class="menuBar menuBar--upper wrap wrap--wide">
          <div class="menuBar__group menuBar__group--left">
            <a href="/">
              <Logo className="menuBar__logo"/>
            </a>
            <a href="/" class="menuBar__title">
              <h1>Flipnote Player</h1>
              <h2 class="menuBar__subTitle">Version {process.env.VERSION}</h2>
            </a>
          </div>
          <div class="menuBar__group menuBar__group--right">
            <Icon icon={ props.darkMode ? "darkmodeOn" : "darkmodeOff" } onClick={ e => this.toggleDarkmode() }/>
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
            <div>
              Built by <a native href="https://twitter.com/rakujira">James Daniel</a> (Source code on <a native href="https://github.com/jaames/flipnote-player">GitHub</a>)
            </div>
          </div>
        </div>
      </main>
    );
  }

  componentDidMount() {
    fetch("static/manifest.json")
      .then(response => response.json())
      .then(json => {
        this.props.dispatch({
          type: "LOAD_SAMPLE_MEMOS", 
          data: json["items"].map(item => ({
            ...item, 
            src: `static/${item.ext}/${item.filestem}.${item.ext}`
          }))
        });
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
