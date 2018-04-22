import { h, Component } from "preact";
import Switch from "react-toggle-switch";

export default class PopoverMenu extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render(props, state) {
    return (
      <div class="settingsMenu">
        <div class="settingsItem">
          <span class="settingsItem__label">Volume</span>
          <div class="settingsItem__input">
            <Switch></Switch>
          </div>
        </div>
        <div class="settingsItem">
          <span class="settingsItem__label">Loop</span>
          <div class="settingsItem__input">
            <Switch></Switch>
          </div>
        </div>
        <div class="settingsItem">
          <span class="settingsItem__label">Layer 1</span>
          <div class="settingsItem__input">
            <Switch on={true}></Switch>
          </div>
        </div>
        <div class="settingsItem">
          <span class="settingsItem__label">Layer 2</span>
          <div class="settingsItem__input">
            <Switch></Switch>
          </div>
        </div>
        <div class="settingsItem">
          <span class="settingsItem__label">Rendering</span>
          <div class="settingsItem__input">
            <Switch></Switch>
          </div>
        </div>
      </div>
    );
  }
}

PopoverMenu.defaultProps = {
  disabled: false,
  onHide: function(){}
}