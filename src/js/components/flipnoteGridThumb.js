import { h } from "preact";

export default function flipnoteGridThumb(props) {
  return (
    <li class="flipnoteGrid__thumb" onClick={(e) => { props.onSelect(props.src) }}>
      <div class="thumb__image" style={{ "background-image": `url(${ props.thumb })` }}>
        {!props.src &&
          <div class="thumb__loader"></div>
        }
      </div>
      <div class="thumb__author">{ props.author }</div>
    </li>
  );
};

flipnoteGridThumb.defaultProps = {
  onSelect: function(){},
  src: null,
  thumb: "",
  author: ""
};