import Dropzone from 'react-dropzone';
import '~/assets/styles/components/Dropzone.scss';

import SdCardHelper from './SdCardHelper';

export default props => (
  <div>
    <Dropzone 
      accept={[".ppm", ".kwz"]}
      onDrop={(accepted, rejected) => {props.onDrop(accepted)}}
    >
      {({getRootProps, getInputProps, isDragActive}) => (
        <div className="Dropzone" {...getRootProps()}>
          <div className="Dropzone__content">
          <input {...getInputProps()} />
            <p>Drag &amp; drop a Flipnote .PPM or .KWZ file here</p>
            <div className="Button Button--inline">Browse Files</div>
          </div>
        </div>
      )}
    </Dropzone>
   <SdCardHelper></SdCardHelper>
  </div>
)