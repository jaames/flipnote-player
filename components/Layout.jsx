import '../static/styles/main.scss';

export default (props) => (
  <main className="app">
    <div className="menuBar menuBar--upper wrap wrap--wide">
      <div className="menuBar__group menuBar__group--left">
        <a href="/">
          {/* <Logo className="menuBar__logo"/> */}
        </a>
        <a href="/" className="menuBar__title">
          <h1>Flipnote Player</h1>
          <h2 className="menuBar__subTitle">Version {process.env.VERSION}</h2>
        </a>
      </div>
      <div className="menuBar__group menuBar__group--right">
        {/* <Icon icon={ props.darkMode ? "darkmodeOn" : "darkmodeOff" } onClick={ e => this.toggleDarkmode() }/> */}
      </div>
    </div>
    <div className="wrap wrap--wide">
      { props.children }
    </div>
    <div className="menuBar menuBar--lower wrap wrap--wide">
      <div className="menuBar__group menuBar__group--right">
        <div>
          Created by <a href="https://github.com/jaames">James Daniel</a> (Source code on <a href="https://github.com/jaames/flipnote-player">GitHub</a>)
        </div>
      </div>
    </div>
  </main>
)