import { h, Component } from "preact";
import { Overlay } from "react-overlays";

import FadeTransition from "components/fadeTransition";

export default class SettingsMenu extends Component {
  render(props, state) {
    return (
      <Overlay
        transition={ FadeTransition }
        show={ props.show }
        container={ props.container }
        onHide={ props.onHide }
        rootClose={true}
      >
        <div className={`settingsMenu ${props.className}`}>  
          { props.children }
        </div>
      </Overlay>
    );
  }
}

SettingsMenu.defaultProps = {
  show: false,
  className: "",
  onHide: function(){},
}