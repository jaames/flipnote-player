import { h, Component } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import Dropzone from "react-dropzone";

import FlipnoteGrid from "components/flipnoteGrid";
import Pagination from "components/pagination";

function mapStateToProps(state) {
  return {
    sampleMemos: state.sampleMemos
  };
}

class FileSelect extends Component {

  constructor() {
    super();
    this.state = {
      gridPage: 0
    };
  }

  render(props, state) {
    return (
      <div class="fileSelect modal">
        <div class="fileSelect__side modal__region modal__region--left">
          <div class="region__title">
            <h4 class="title">Upload Flipnote</h4>
          </div>
          <div class="region__body">
            <Dropzone 
              className="dropzone"
              activeClassName="dropzone--active"
              acceptClassName="dropzone--accept"
              rejectClassName="dropzone--reject"
              accept=".ppm, .kwz"
              multiple={false}
              onDrop={ (accepted) => this.onDrop(accepted) }
              style={{}}
            >
              <div class="dropzone__content">
                <p>Drag &amp; drop a Flipnote .PPM or .KWZ file here</p>
                <div class="button button--inline">Browse Files</div>
              </div>
            </Dropzone>
          </div>
        </div>
        <div class="fileSelect__main modal__region modal__region--right modal__region--gray">
          <div class="region__title">
            <h4 class="title">Sample Flipnotes</h4>
            <Pagination 
              current={state.page}
              itemCount={props.sampleMemos.length} 
              itemsPerPage={12} onChange={newPage => this.setPage(newPage) }
            />
          </div>
          <div class="region__body">
            <FlipnoteGrid 
              items={props.sampleMemos}
              page={state.page}
              onSelect={src => this.loadFlipnote(src, true)}
            />
          </div>
        </div>
      </div>
    );
  }

  setPage(newPage) {
    this.setState({page: newPage});
  }

  loadFlipnote(src, isSampleFlipnote=false) {
    var meta = {};
    if (isSampleFlipnote) meta = this.props.sampleMemos.filter(item => (item.src === src))[0];
    this.props.dispatch({ type: "LOAD_FLIPNOTE", src, meta });
    route("/view");
  }

  onDrop(accepted) {
    var file = accepted[0];
    var reader = new FileReader();
    reader.onload = (event) => {
      this.loadFlipnote(event.target.result);
    };
    reader.readAsArrayBuffer(file);
  }
}

export default connect(mapStateToProps)(FileSelect);