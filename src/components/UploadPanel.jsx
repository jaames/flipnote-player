import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { externalServices } from '@/utils';
import '@/styles/components/UploadPanel.scss';

import SdCardModal from '@/components/SdCardModal';

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
              <p>Drag &amp; drop Flipnote Studio .PPM or .KWZ files here</p>
              <div className="Button Button--inline Button--lg">Browse Files</div>
              <div className="UploadPanel__sdCardLink" onClick={ (e) => { e.stopPropagation(); setShowSdCardModal(!showSdCardModal) } }>
                ? How to find Flipnote files
              </div>
              </div>
            </div>
          )}
        </Dropzone>
        <SdCardModal isVisible={ showSdCardModal } onHide={ () => { setShowSdCardModal(false) } }></SdCardModal>
      </div>
      <div className="UrlForm">
        <div className="FormGroup">
          <div className="FormItem FormItem--flex3">
            <label htmlFor="url">Or load from a URL</label>
            <input 
              className="Input"
              id="url"
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