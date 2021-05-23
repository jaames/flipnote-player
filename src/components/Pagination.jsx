import Icon from './_ConversionModal/node_modules/@/components/Icon';
import '@/styles/components/Pagination.scss';

export default ({current, itemCount, itemsPerPage, onChange}) => {
  const limit = Math.ceil(itemCount / itemsPerPage) - 1;
  const isMin = current <= 0;
  const isMax = current >= limit;
  
  return (
    <div className="Pagination">
      <Icon 
        className="Pagination__prev"
        icon="chevronLeft"
        disabled={isMin}
        onClick={e => { if (!isMin) onChange(current - 1) }}
      />
      <span className="Pagination__current">
        { current + 1 } / { limit + 1 }
      </span>
      <Icon
        className="Pagination__next"
        icon="chevronRight"
        disabled={isMax}
        onClick={e => { if (!isMax) onChange(current + 1) }}
      />
    </div>
  );
}