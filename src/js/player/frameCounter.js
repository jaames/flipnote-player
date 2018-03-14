import { h, Component } from "preact";

export default class FrameCounter extends Component {

  render() {
    var currentFrame = (this.props.currentFrame + 1).toString();
    var frameCount = (this.props.frameCount).toString();
    return this.props.visible ? (
      <span class="frameCounter">{currentFrame.padStart(3, "0")} / {frameCount.padStart(3, "0")}</span>
    ) : null;
  }

}