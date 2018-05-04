import { h } from "preact";
import { Overlay } from "react-overlays";

import FadeTransition from "components/fadeTransition";

export default function SettingsMenu(props) {
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

SettingsMenu.defaultProps = {
  show: false,
  className: "",
  onHide: function(){},
}