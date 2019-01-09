import React from 'react'; 
import ChevronRight from '~/assets/svg/chevronRight.svg';
import ChevronLeft from '~/assets/svg/chevronLeft.svg';

import '~/assets/styles/components/Pagination.scss';

export default ({current, itemCount, itemsPerPage, onChange}) => {
  const limit = Math.ceil(itemCount / itemsPerPage) - 1;
  const isMin = current <= 0;
  const isMax = current >= limit;
  
  return (
    <div className="Pagination">
      <ChevronLeft
        className={`Pagination__prev Icon ${isMin ? 'Icon--disabled' : ''}`}
        onClick={e => { if (!isMin) onChange(current - 1) }}
      />
      <span className="Pagination__current">
        { current + 1 }
      </span>
      <ChevronRight
        className={`Pagination__next Icon ${isMax ? 'Icon--disabled' : ''}`}
        onClick={e => { if (!isMax) onChange(current + 1) }}
      />
    </div>
  );
}