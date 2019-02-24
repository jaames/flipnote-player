import Dropzone from 'react-dropzone';
import '~/assets/styles/components/Dropzone.scss';

export default props => (
  <Dropzone 
    className="Dropzone"
    activeClassName="Dropzone--active"
    acceptClassName="Dropzone--accept"
    rejectClassName="Dropzone--reject"
    accept=".ppm, .kwz"
    multiple={true}
    onDrop={accepted => props.onDrop(accepted)}
    style={{}}
  >
    <div className="Dropzone__content">
      <p>Drag &amp; drop a Flipnote .PPM or .KWZ file here</p>
      <div className="Button Button--inline">Browse Files</div>
    </div>
  </Dropzone>
)