import { h } from "preact";

export default function FrameCounter(props) {
  var currentFrame = (this.props.currentFrame + 1).toString();
  var frameCount = (this.props.frameCount).toString();
  if (this.props.visible) {
    return (<span class="frameCounter">{currentFrame.padStart(3, "0")} / {frameCount.padStart(3, "0")}</span>);
  } else {
    return null;
  }
}