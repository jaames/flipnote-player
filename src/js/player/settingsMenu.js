import { h, Component } from "preact";

export default class SettingsMenu extends Component {
  render(props, state) {
    return (
      <div class="settingsMenu">
        { props.children }
      </div>
    );
  }
}

SettingsMenu.defaultProps = {
  disabled: false,
  onHide: function(){}
}