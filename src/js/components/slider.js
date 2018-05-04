import { h, Component } from "preact";
import RCSlider from "rc-slider";

export default class Slider extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  onBeforeChange() {
    this.setState({ isActive: true });
  }

  onAfterChange() {
    this.setState({ isActive: false });
  }

  render(props, state) {
    return (
      <RCSlider 
        {...props}
        className={`${props.className || ""} ${state.isActive ? "is-active" : ""}`}
        onBeforeChange={(v) => { this.onBeforeChange(); props.onBeforeChange(v) }}
        onAfterChange={(v) => { this.onAfterChange(); props.onAfterChange(v) }}
      />
    );
  }

}

Slider.defaultProps = {
  onBeforeChange: function(){},
  onAfterChange: function(){}
}