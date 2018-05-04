import { h } from "preact";

export default function flipnoteGrid(props) {
  return (
    <ul class="flipnoteGrid">
      { props.children }
    </ul>
  );
};