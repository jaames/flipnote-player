import { h, Component } from "preact";

import Transition, { ENTERED, ENTERING, EXITING, EXITED } from "react-transition-group/Transition";

const DURATION = 200;

const states = {
  [ENTERING]: 'entering',
  [ENTERED]: 'entered',
  [EXITING]: 'exiting',
  [EXITED]: 'exited',
};

export default class SettingsMenu extends Component {

  componentWillMount() {
    this._handleClick = this.handleClick.bind(this);
    document.addEventListener("click", this._handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this._handleClick, false);
  }

  render(props, state) {
    return (
      <Transition in={props.show} timeout={DURATION}>
        {(status) => (
          <div ref={(node) => {this.node = node}} className={`settingsMenu fade ${states[status]}`}>  
            { props.children }
          </div>
        )}
      </Transition>
    );
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      return;
    } else {
      this.handleClickOutside(e);
    }
  }

  handleClickOutside(e) {
    e.stopPropagation();
    this.props.onHide();
  }

}

SettingsMenu.defaultProps = {
  show: false,
  className: "",
  onHide: function(){},
}