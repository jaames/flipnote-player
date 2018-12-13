import '../assets/styles/components/FlipnoteGrid.scss';

import FlipnoteThumb from './FlipnoteThumb';

const FlipnoteGrid = (props) => {
  const { page, items, itemsPerPage } = props;
  const startOffset = page * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const pageItems = items && items.slice(startOffset, endOffset);

  return (
    <ul className="FlipnoteGrid">
      { (pageItems && pageItems.length) && pageItems.map((item, index) => (
        <FlipnoteThumb key={index} {...item} onSelect={props.onSelect}/>
      ))}
    </ul>
  );
}

FlipnoteGrid.defaultProps = {
  onSelect: function(){},
  items: null,
  page: 0,
  itemsPerPage: 12,
};

export default FlipnoteGrid;