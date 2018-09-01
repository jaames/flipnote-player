import { h } from "preact";
import InlineSVG from "react-svg-inline";
import play from "assets/play.svg";
import pause from "assets/pause.svg";
import nextFrame from "assets/nextFrame.svg";
import prevFrame from "assets/prevFrame.svg";
import firstFrame from "assets/firstFrame.svg";
import lastFrame from "assets/lastFrame.svg";
import settings from "assets/settings.svg";

const ICON_LIST = {
  play,
  pause,
  nextFrame,
  prevFrame,
  firstFrame,
  lastFrame,
  settings
};

export default function Icon(props) {
  let {icon, disabled, ...propList} = props;
  return <InlineSVG 
    className={`icon ${ disabled ? "icon--disabled" : "" }`}
    classSuffix=""
    component="i"
    cleanup={true}
    svg={ ICON_LIST[icon] }
    {...propList}
  />
}