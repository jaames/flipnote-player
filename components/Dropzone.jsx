import { useState } from 'react';
import Dropzone from 'react-dropzone';
import '~/assets/styles/components/Dropzone.scss';

import SdCardHelper from './SdCardHelper';

export default props => {
  const [showSdCardHelper, setShowSdCardHelper] = useState(false);
  return (
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
      <span onClick={ () => { setShowSdCardHelper(!showSdCardHelper) } }>
        Show SD Card Helper
      </span>
      <SdCardHelper isVisible={ showSdCardHelper } onHide={ () => { setShowSdCardHelper(false) } }></SdCardHelper>
    </div>
  )
}