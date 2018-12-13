// import '../assets/styles/components/Footer.scss';

export default ({current, itemCount, itemsPerPage, onChange}) => {
  const limit = Math.ceil(itemCount / itemsPerPage) - 1;
  const isMin = current <= 0;
  const isMax = current >= limit;
  
  return (
    <div className="Pagination">
      <span 
        className={`Pagination__prev ${isMin ? 'disabled' : ''}`}
        onClick={e => { if (!isMin) onChange(current - 1) }}
      >
        prev
      </span>
      {/* <Icon icon="chevronLeft" disabled={current <= 0} onClick={e => this.prevPage()}/> */}
      <span className="Pagination__current">
        { current + 1 }
      </span>
      <span
        className={`Pagination__next ${isMax ? 'disabled' : ''}`}
        onClick={e => { if (!isMax) onChange(current + 1) }}
      >
        next
      </span>
      {/* <Icon icon="chevronRight" disabled={current >= limit} onClick={e => this.nextPage()}/> */}
    </div>
  );
}