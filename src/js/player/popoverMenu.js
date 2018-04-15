import { h, Component } from "preact";

export default class PopoverMenu extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render(props, state) {
    return (
      <div class="settingsMenu">
        hello
      </div>
    );
  }
}

PopoverMenu.defaultProps = {
  disabled: false,
  onHide: function(){}
}