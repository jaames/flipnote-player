import { h, Component } from "preact";
import Switch from "react-toggle-switch";

export default class SettingsMenuItem extends Component {
  render(props, state) {

    var inputElement = "";

    switch (props.type) {
      case "switch":
      default:
        inputElement = (<Switch on={ props.value } onClick={ props.handleInput }></Switch>);
        break;
    }

    return (
      <div class="settingsItem">
        <span class="settingsItem__label">{ props.label }</span>
        <div class="settingsItem__input">{ inputElement }</div>
      </div>
    );
  }
}

SettingsMenuItem.defaultProps = {
  label: "",
  type: "switch",
  value: false,
  handleInput: function(){}
}