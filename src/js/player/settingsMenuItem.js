import { h, Component } from "preact";
import Switch from "react-toggle-switch";
import Slider from "rc-slider";

export default class SettingsMenuItem extends Component {
  render(props, state) {

    var inputElement = "";

    switch (props.type) {
      case "slider":
        inputElement = (
        <Slider
          className="settingsItem__slider"
          value={ props.value }
          min={ props.min }
          max={ props.max }
          onChange={ props.onChange }
          onAfterChange={ props.onAfterChange }
          onBeforeChange={ props.onBeforeChange }
        />);
        break;
      case "switch":
      default:
        inputElement = (
        <Switch 
          on={ props.value } 
          onClick={ props.onChange }
        />);
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
  min: 0,
  max: 100,
  onBeforeChange: function(){},
  onChange: function(){},
  onAfterChange: function(){},
}