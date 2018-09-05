import { h, Component } from "preact";
import Icon from "components/icon";

export default class pagination extends Component {

  render(props) {
    const { current } = props;
    const limit = this.getPageLimit();

    return (
      <div class="pagination">
        <Icon icon="chevronLeft" disabled={current <= 0} onClick={e => this.prevPage()}/>
        <span class="pagination__current">
        { props.current }
        </span>
        <Icon icon="chevronRight" disabled={current >= limit} onClick={e => this.nextPage()}/>
      </div>
    );
  }

  setPage(newPage) {
    const { current, onChange } = this.props;
    const limit = this.getPageLimit();
    newPage = Math.max(Math.min(newPage, limit), 0);
    if (newPage !== current) {
      onChange(newPage);
    }
  }

  getPageLimit() {
    const { itemCount, itemsPerPage } = this.props;
    return Math.ceil(itemCount / itemsPerPage) - 1;
  }

  nextPage() {
    this.setPage(this.props.current + 1);
  }

  prevPage() {
    this.setPage(this.props.current - 1);
  }
};

pagination.defaultProps = {
  onChange: function(){},
  current: 0,
  itemCount: 0,
  itemsPerPage: 0
};