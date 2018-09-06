import { h } from "preact";
import Icon from "components/icon";

export default function flipnoteGridThumb(props) {
  return (
    <li class="flipnoteGrid__thumb" onClick={(e) => { props.onSelect(props.src) }}>
      <div class="thumb__image" style={{ "background-image": `url(${ props.thumb })` }}>
        {!props.src &&
          <div class="thumb__loader">
            <Icon icon="loader"/>
          </div>
        }
        {props.ext &&
          <span class="thumb__type">{ props.ext == "ppm" ? "DSi" : "3DS" }</span>
        }
      </div>
      <div class="thumb__info">
        <span class="thumb__author">{ props.author }</span>
      </div>
    </li>
  );
};

flipnoteGridThumb.defaultProps = {
  onSelect: function(){},
  src: null,
  thumb: "",
  author: ""
};