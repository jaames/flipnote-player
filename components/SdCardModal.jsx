import { useState } from 'react';
import Modal from './Modal';
import { flipnoteStudio } from '~/utils'

const appVersionOptions = [
  { title: 'Flipnote Studio', value: 'dsi' },
  { title: 'Flipnote Studio 3D', value: '3ds' },
];

const regionOptions = [
  { title: 'Europe', value: 'eu' },
  { title: 'America', value: 'us' },
  { title: 'Japan', value: 'jp' },
];

export default function SdCardModal({ isVisible, onHide }) {
  const [appVersion, setAppVersion] = useState('3ds');
  const [region, setRegion] = useState('eu');
  
  return (
    <Modal isVisible={ isVisible } isBackdropVisible={ true } onHide={ onHide } title="Flipnote File Location" className="SdCardHelper">
      <div className="FormGroup">
        <div className="FormItem">
          <label htmlFor="appVersion">
            App version
          </label>
          <select id="appVersion" value={ appVersion } onChange={ e => setAppVersion(event.target.value) }>
            {appVersionOptions.map(op => (
              <option key={ op.value } value={ op.value }>{ op.title }</option>
            ))}
          </select>
        </div>
        <div className="FormItem">
          <label htmlFor="region">
            Region
          </label>
          <select id="region" value={ region } onChange={ e => setRegion(event.target.value) }>
            {regionOptions.map(op => (
              <option key={ op.value } value={ op.value }>{ op.title }</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <p>
          Any Flipnotes that are saved to your { appVersion === 'dsi' ? "Nintendo DSi's" : "Nintendo 3DS'" } SD card can be found at the following folder location:
        </p>
        <code>
          { flipnoteStudio.getSdCardRoute(appVersion, region) }
        </code>
      </div>
    </Modal>
  );
}

SdCardModal.defaultProps = {
  onHide: function(){},
  isVisible: false,
}