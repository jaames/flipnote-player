import Switch from '~/components/Switch';
import Slider from '~/components/Slider';

import '~/assets/styles/components/SettingsMenuItem.scss';

const SettingsMenuItem = props => {
  let inputElement = '';

  switch (props.type) {
    case 'slider':
      inputElement = (<Slider {...props} className="SettingsMenuItem__slider"/>);
      break;
    case 'switch':
    default:
      inputElement = (<Switch on={ props.value } onClick={ props.onChange }/>);
      break;
  }

  return (
    <div className="SettingsMenuItem">
      <span className="SettingsMenuItem__label">{ props.label }</span>
      <div className="SettingsMenuItem__input">{ inputElement }</div>
    </div>
  );
}

SettingsMenuItem.defaultProps = {
  label: '',
  type: 'switch',
  value: false,
  min: 0,
  max: 100,
  onBeforeChange: function(){},
  onChange: function(){},
  onAfterChange: function(){},
}

export default SettingsMenuItem;