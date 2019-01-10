import { Component } from 'react';
import { connect } from 'react-redux';
import { format } from '~/utils'

class FlipnoteDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const meta = this.props.playerMeta;

    if (!meta) {
      return (
        <div className="FlipnoteDetails">
          loading...
        </div>
      );
    }

    return (
      <div className="FlipnoteDetails">
        <div>Flipnote by { meta.current.username }</div>
        <div>Created: { meta.timestamp.toLocaleDateString() }</div>
        <div>Frame Speed: { meta.frame_speed }</div>
        <div>Filesize: { format.byteCount(meta.filesize) }</div>
      </div>
    );
  }
}

export default connect(state => state)(FlipnoteDetails);