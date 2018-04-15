import { h, Component } from "preact";
import initEventHandler from "react-handle-event";

export default class ProgressBar extends Component {

  constructor(props) {
    super(props);
    initEventHandler(this);
    this.state = {
      value: props.value,
      percentage: 0,
    };
  }

  render(props, state) {
    return (
      <div class="progressBar" onMouseDown={ this }>
        <div class={["slider", state.active ? "is-active" : ""].join(" ")}>
          <div class="slider__level" style={"width:" + state.percentage + "%"}></div>
          <span class="slider__handle" style={"left:" + state.percentage + "%"}></span>
        </div>
      </div>
    );
  }

  setValue(value) {
    var range = this.props.max - this.props.min;
    var percentage = (value - this.props.min) / range * 100;
    this.setState({ value, percentage });
  }

  handleEvent(event) {
    switch (event.type) {
      case "mousedown":
        ["mousemove", "mouseup"].forEach(eventType => {
          document.addEventListener(eventType, this);
        });
        if ("function" == typeof this.props.onInputStart) this.props.onInputStart(this.state);
        this.handleInputEvent(event);
        this.setState({active: true});
        document.body.classList.add("is-slider-active");
        break;
        
      case "mousemove":
        this.handleInputEvent(event);
        break;

      case "mouseup":
        ["mousemove", "mouseup"].forEach(eventType => {
          document.removeEventListener(eventType, this);
        });
        if ("function" == typeof this.props.onInputEnd) this.props.onInputEnd(this.state);
        this.setState({active: false});
        document.body.classList.remove("is-slider-active");
        break;
    }
  }

  handleInputEvent(event) {
    var bounds = this.base.getBoundingClientRect();
    var x = Math.max(bounds.left, Math.min(bounds.right, event.clientX)) - bounds.left;
    var range = this.props.max - this.props.min;
    var value = this.props.min + Math.round(((x / bounds.width) * range) / this.props.step) * this.props.step;
    this.setValue(value);
    if ("function" == typeof this.props.onChange) this.props.onChange(this.state);
  }

}

ProgressBar.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  onChange: null,
  onInputStart: null,
  onInputEnd: null,
}