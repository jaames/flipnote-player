import { h } from "preact";
import FlipnoteGridThumb from "components/flipnoteGridThumb";

export default function flipnoteGrid (props) {
  const { page, items, itemsPerPage } = props;
  const pageItems = items && items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  return (
    <ul class="flipnoteGrid">
      { (items && pageItems.length) && pageItems.map((item, index) => (
        <FlipnoteGridThumb key={index} {...item} onSelect={props.onSelect}/>
      ))}
    </ul>
  );
}

flipnoteGrid.defaultProps = {
  onSelect: function(){},
  items: null,
  page: 0,
  itemsPerPage: 12,
};