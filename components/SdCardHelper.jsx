import { useState } from 'react';
import Modal from './Modal';
import { getSdCardRoute } from '~/utils'

const appVersionOptions = [
  { title: 'Flipnote Studio', value: 'dsi' },
  { title: 'Flipnote Studio 3D', value: '3ds' },
];

const regionOptions = [
  { title: 'Europe', value: 'eu' },
  { title: 'America', value: 'us' },
  { title: 'Japan', value: 'jp' },
];

export default function SdCardHelper({ isVisible, onHide }) {
  const [appVersion, setAppVersion] = useState('3ds');
  const [region, setRegion] = useState('eu');
  
  return (
    <Modal isVisible={ isVisible } onHide={ onHide } className="SdCardHelper">
      <div>
        <select value={ appVersion } onChange={ e => setAppVersion(event.target.value) }>
          {appVersionOptions.map(op => (
            <option key={op.value} value={op.value}>{op.title}</option>
          ))}
        </select>
        <select value={ region } onChange={ e => setRegion(event.target.value) }>
          {regionOptions.map(op => (
            <option key={op.value} value={op.value}>{op.title}</option>
          ))}
        </select>
        SD card path:
        <code>
          <pre>
            { getSdCardRoute(appVersion, region) }
          </pre>
        </code>
      </div>
    </Modal>
  );
}

SdCardHelper.defaultProps = {
  onHide: function(){},
  isVisible: false,
}