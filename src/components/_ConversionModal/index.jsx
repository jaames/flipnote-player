import { useState } from 'react';
import { useStoreState } from 'pullstate';
import { PlayerStore } from '@/store';
import Modal from '@/components/Modal';
import Mp4Panel from './Mp4Panel';
import GifPanel from './GifPanel';
import ImagePanel from './ImagePanel';
import '@/styles/components/ConversionModal.scss';

export default function ConversionModal({ isVisible, onHide }) {

  const [activeConverter, setActiveConverter] = useState('mp4');
  const playerNote = useStoreState(PlayerStore, store => store.note);

  return (
    <Modal 
      title="Convert Flipnote"
      className="ConversionModal"
      isVisible={ isVisible }
      isBackdropVisible={ true }
      onHide={ onHide }
    >
      <div className="ConversionModelForm">
        <div className="ConversionModelForm--select">
          <div className="FormItem">
            <label htmlFor="format">Format</label>
            <select 
              id="format"
              className="Select"
              value={ activeConverter } 
              onChange={ e => setActiveConverter(e.target.value) }
            >
              <option key="mp4" value="mp4">MP4</option>
              <option key="gif" value="gif">GIF</option>
              <option key="images" value="images">Images</option>
            </select>
          </div>
        </div>
        <div className="ConversionModelForm--main">
          { activeConverter === 'mp4' && (
            <Mp4Panel flipnote={ playerNote }/>
          )}
          { activeConverter === 'gif' && (
            <GifPanel flipnote={ playerNote }/>
          )}
          { activeConverter === 'images' && (
            <ImagePanel flipnote={ playerNote }/>
          )}
        </div>
      </div>
    </Modal>
  );
}