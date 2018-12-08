import FlipnoteThumb from './FlipnoteThumb';

const FlipnoteGrid = (props) => {
  const { page, items, itemsPerPage } = props;
  const startOffset = page * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  // const pageItems = items && items.slice(startOffset, endOffset);

  return (
    <ul className="FlipnoteGrid">
      { (items && items.length) && items.map((item, index) => (
        <FlipnoteThumb key={index} {...item} onSelect={props.onSelect}/>
      ))}
      <style jsx>{`
        .FlipnoteGrid {
          list-style-type: none;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 24px;
        }
      `}</style>
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