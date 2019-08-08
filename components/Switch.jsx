import '~/assets/styles/components/Switch.scss';

export default function Switch(props) {
  const className = [
    'Switch',
    props.on ? 'Switch--on' : '',
    props.disabled ? 'Switch--disabled' : '',
    props.className
  ].filter(cls => cls).join(' ');
  
  return (
    <div className={ className } onClick={ props.onClick }>
      <div className="Switch__toggle"></div>
    </div>
  );
}

Switch.defaultProps = {
  on: false,
  disabled: false,
  className: '',
  onClick: function(){}
};