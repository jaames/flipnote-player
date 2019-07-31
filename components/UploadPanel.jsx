import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { externalServices } from '~/utils';
import '~/assets/styles/components/UploadPanel.scss';

import SdCardModal from './SdCardModal';

export default ({ onLoadFiles, onLoadSrc }) => {
  const [showSdCardModal, setShowSdCardModal] = useState(false);
  const [flipnoteSrc, setFlipnoteSrc] = useState('');

  return (
    <div className="UploadPanel">
      <div className="Dropzone">
        <Dropzone 
          accept={ ['.ppm', '.kwz'] }
          onDrop={ onLoadFiles }
        >
          {({getRootProps, getInputProps, isDragActive}) => (
            <div className="Dropzone__inner" {...getRootProps()}>
              <div className="Dropzone__content">
              <input {...getInputProps()} />
                <p>Drag &amp; drop a Flipnote .PPM or .KWZ file here</p>
                <div className="Button Button--inline Button--lg">Browse Files</div>
              </div>
            </div>
          )}
        </Dropzone>
        <span onClick={ () => { setShowSdCardModal(!showSdCardModal) } }>
          Show SD Card Helper
        </span>
        <SdCardModal isVisible={ showSdCardModal } onHide={ () => { setShowSdCardModal(false) } }></SdCardModal>
      </div>
      <div className="UrlForm">
        <p>Or load from a URL</p>
        <div className="FormGroup">
          <div className="FormItem">
            <input 
              className="Input" 
              type="text" 
              placeholder="Flipnote URL"
              value={ flipnoteSrc } 
              onChange={ (e) => { setFlipnoteSrc(e.target.value)} }
            />
          </div>
          <div className="FormItem">
            <div className="Button" onClick={ () => { if (flipnoteSrc) onLoadSrc(externalServices.getFileFromFlipnoteUrl(flipnoteSrc)) } }>Load</div>
          </div>
        </div>
      </div>
    </div>
  )
}