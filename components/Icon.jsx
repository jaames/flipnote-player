import play from '~/assets/svg/play.svg';
import pause from '~/assets/svg/pause.svg';
import loop from '~/assets/svg/loop.svg';
import noloop from '~/assets/svg/noloop.svg';
import firstFrame from '~/assets/svg/firstFrame.svg';
import lastFrame from '~/assets/svg/lastFrame.svg';
import prevFrame from '~/assets/svg/prevFrame.svg';
import nextFrame from '~/assets/svg/nextFrame.svg';
import settings from '~/assets/svg/settings.svg';
import loader from '~/assets/svg/loader.svg';
import chevronLeft from '~/assets/svg/chevronLeft.svg';
import chevronRight from '~/assets/svg/chevronRight.svg';

const svgs = {
  play,
  pause,
  loop,
  noloop,
  firstFrame,
  lastFrame,
  prevFrame,
  nextFrame,
  settings,
  loader,
  chevronLeft,
  chevronRight
};

const Icon = (props) => {
  const { className, icon, disabled, ...innerProps } = props;
  const IconSvg = svgs[icon];
  return (
    <div className={`${className} Icon Icon--${icon} ${disabled ? 'Icon--disabled' : ''}`} {...innerProps}>
      { IconSvg && <IconSvg/> }
    </div>
  )
}

Icon.defaultProps = {
  icon: '',
  className: '',
  disabled: false
};

export default Icon;