import { useState } from 'react';
import '~/assets/styles/components/Dropzone.scss';
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

export default function SdCardHelper() {
  const [appVersion, setAppVersion] = useState('3ds');
  const [region, setRegion] = useState('eu');
  
  return (
    <div className="SdCardHelper">
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
  );
}