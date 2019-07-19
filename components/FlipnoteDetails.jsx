import { Component } from 'react';
import { connect } from 'react-redux';
import flipnote from 'flipnote.js';
import { format } from '~/utils';
import convertFlipnoteToGif from '~/converters/gif';

import '~/assets/styles/components/FlipnoteDetails.scss';

class FlipnoteDetails extends Component {
  constructor(props) {
    super(props);
  }

  convertGif() {
    // convertFlipnoteToGif(note);
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
        <div className="DetailItem">
          <span className="DetailItem__title">Created:</span>
          <span className="DetailItem__value">{ meta.timestamp.toLocaleDateString() }</span>
        </div>
        <div className="DetailItem">
          <span className="DetailItem__title">Frames:</span>
          <span className="DetailItem__value">{ meta.frame_count }</span>
        </div>
        <div className="DetailItem">
          <span className="DetailItem__title">Frame Speed:</span>
          <span className="DetailItem__value">{ meta.frame_speed }</span>
        </div>
        <div className="DetailItem">
          <span className="DetailItem__title">Filesize:</span>
          <span className="DetailItem__value">{ format.byteCount(meta.filesize) }</span>
        </div>
        <div className="Button Button--inline" onClick={ () => { this.convertGif() } }>Convert</div>
      </div>
    );
  }
}

export default connect(state => state)(FlipnoteDetails);