import { h } from "preact";

export default function flipnoteGridThumb(props) {
  return (
    <li class="flipnoteGrid__thumb" onClick={(e) => { props.onSelect(props.filestem) }}>
      <div class="thumb__image" style={{ "background-image": `url(${ props.imageUrl })` }}></div>
      <div class="thumb__author">{ props.author }</div>
    </li>
  );
};