import { h } from "preact";
import InlineSVG from "react-svg-inline";
import play from "assets/play.svg";
import pause from "assets/pause.svg";
import nextFrame from "assets/nextFrame.svg";
import prevFrame from "assets/prevFrame.svg";
import firstFrame from "assets/firstFrame.svg";
import lastFrame from "assets/lastFrame.svg";
import settings from "assets/settings.svg";
import chevronLeft from "assets/chevronLeft.svg";
import chevronRight from "assets/chevronRight.svg";
import darkmodeOn from "assets/darkmodeOn.svg";
import darkmodeOff from "assets/darkmodeOff.svg";
import loader from "assets/loader.svg";

const ICON_LIST = {
  play,
  pause,
  nextFrame,
  prevFrame,
  firstFrame,
  lastFrame,
  settings,
  chevronLeft,
  chevronRight,
  darkmodeOn,
  darkmodeOff,
  loader,
};

export default function Icon(props) {
  let {icon, disabled, ...propList} = props;
  return <InlineSVG 
    className={`icon icon--${icon}${ disabled ? " icon--disabled" : "" }`}
    classSuffix=""
    component="i"
    cleanup={true}
    svg={ ICON_LIST[icon] }
    {...propList}
  />
}