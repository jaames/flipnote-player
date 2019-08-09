import '@/styles/components/FlipnoteGrid.scss';

import FlipnoteThumb from '@/components/FlipnoteThumb';

const FlipnoteGrid = ({ page, items, itemsPerPage, onSelect }) => {
  const startOffset = page * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const pageItems = items.length ? items.slice(startOffset, endOffset) : new Array(itemsPerPage).fill({});
  const hasItems = items.length ? true : false;

  return (
    <div className="FlipnoteGrid">
      { hasItems &&
        pageItems.map((item, index) => (
          <FlipnoteThumb key={index} {...item} onSelect={onSelect}/>
        ))
      }
      { 
        !hasItems &&
        pageItems.map((_, index) => (
          <FlipnoteThumb key={index} placeholder={true}/>
        ))
      }
    </div>
  );
}

FlipnoteGrid.defaultProps = {
  onSelect: function(){},
  items: null,
  page: 0,
  itemsPerPage: 12,
};

export default FlipnoteGrid;