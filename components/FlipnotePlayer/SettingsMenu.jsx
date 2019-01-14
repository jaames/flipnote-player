import { Component } from 'react';
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from 'react-transition-group/Transition';

import '~/assets/styles/components/SettingsMenu.scss';

const DURATION = 200;

const states = {
  [ENTERING]: 'entering',
  [ENTERED]: 'entered',
  [EXITING]: 'exiting',
  [EXITED]: 'exited',
};

class SettingsMenu extends Component {

  componentWillReceiveProps(newProps) {
    if (process.browser) {
      // if menu has become visible
      if (!this.props.isVisible && newProps.isVisible) {
        this._handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this._handleClick, false);
      }
      // if menu has become invisible
      else if (this.props.isVisible && !newProps.isVisible) {
        document.removeEventListener('click', this._handleClick, false);
      }
    }
  }

  render() {
    return (
      <Transition in={this.props.isVisible} timeout={DURATION}>
        {status => (
          <div ref={el => {this.el = el}} className={`SettingsMenu SettingsMenuTransition ${states[status]}`}>  
            { this.props.children }
          </div>
        )}
      </Transition>
    );
  }

  handleClick(e) {
    if (this.el.contains(e.target)) {
      return;
    } else {
      e.stopPropagation();
      this.props.onHide();
    }
  }
}

SettingsMenu.defaultProps = {
  isVisible: false,
  className: "",
  onHide: function(){},
}

export default SettingsMenu;