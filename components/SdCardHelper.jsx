import { Component } from 'react';
import '~/assets/styles/components/Dropzone.scss';
import { getSdCardRoute } from '~/utils'

export default class SdCardHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      system: '3ds',
      systemOptions: [
        { title: 'Flipnote Studio', value: 'dsi' },
        { title: 'Flipnote Studio 3D', value: '3ds' },
      ],
      region: 'eu',
      regionOptions: [
        { title: 'Europe', value: 'eu' },
        { title: 'Americas', value: 'us' },
        { title: 'Japan', value: 'jp' },
      ]
    };
  }

  render() {
    const { state, props } = this;
    return (
      <div className="SdCardHelper">
        <select value={state.system} onChange={e => this.setState({system: event.target.value})}>
          {state.systemOptions.map(op => (
            <option key={op.value} value={op.value}>{op.title}</option>
          ))}
        </select>
        <select value={state.region} onChange={e => this.setState({region: event.target.value})}>
          {state.regionOptions.map(op => (
            <option key={op.value} value={op.value}>{op.title}</option>
          ))}
        </select>
        SD card path:
        { getSdCardRoute(state.system, state.region) }
      </div>
    );
  }
}