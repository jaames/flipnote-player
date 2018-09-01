import { h } from "preact";
import InlineSVG from "react-svg-inline";
import IconSvg from "assets/logo.svg";

export default function LogoIcon(props) {
  return <InlineSVG classSuffix="__svg" svg={ IconSvg } {...props}/>
}