import { h, Component } from "preact";
import Dropzone from "react-dropzone";

import FlipnoteGrid from "components/flipnoteGrid";
import FlipnoteGridThumb from "components/flipnoteGridThumb";
import ajax from "util/ajax";

// TEMPORARY
function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}


export default class fileSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridItems: []
    };
  }

  componentDidMount() {
    ajax.getJson("static/ppm/manifest.json", (data) => {
      this.setState({ gridItems: getRandomSubarray(data["items"], 12) })
    });
  }

  render(props, state) {
    return (
      <div class="fileSelect modal">
        <div class="fileSelect__side modal__region modal__region--left">
          <h4 class="region__title">Upload Flipnote</h4>
          <div class="region__body">
            <Dropzone 
              className="dropzone"
              activeClassName="dropzone--active"
              acceptClassName="dropzone--accept"
              rejectClassName="dropzone--reject"
              accept=".ppm"
              multiple={false}
              onDrop={ (accepted) => this.onDrop(accepted) }
              style={{}}
            >
              <div class="dropzone__content">
                <p>Drag &amp; drop a Flipnote .PPM file here</p>
                <div class="button button--inline">Browse Files</div>
              </div>
            </Dropzone>
          </div>
        </div>
        <div class="fileSelect__main modal__region modal__region--right modal__region--gray">
          <h4 class="region__title">Sample Flipnotes</h4>
          <FlipnoteGrid>
            { state.gridItems.map((item, index) => {
              return (<FlipnoteGridThumb key={index} onSelect={(stem) => { this.onGridSelect(stem) }} filestem={item.filestem} imageUrl={item.thumb} author={item.author}/>); 
            }) }
          </FlipnoteGrid>
        </div>
      </div>
    );
  }

  loadFlipnote(source) {
    this.props.onFileSelect(source);
  }

  onGridSelect(stem) {
    this.loadFlipnote(`static/ppm/${stem}.ppm`);
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