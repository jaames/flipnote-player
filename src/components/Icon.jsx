import play from '@/svg/play.svg';
import pause from '@/svg/pause.svg';
import loop from '@/svg/loop.svg';
import noloop from '@/svg/noloop.svg';
import firstFrame from '@/svg/firstFrame.svg';
import lastFrame from '@/svg/lastFrame.svg';
import prevFrame from '@/svg/prevFrame.svg';
import nextFrame from '@/svg/nextFrame.svg';
import settings from '@/svg/settings.svg';
import loader from '@/svg/loader.svg';
import chevronLeft from '@/svg/chevronLeft.svg';
import chevronRight from '@/svg/chevronRight.svg';
import externalService from '@/svg/externalService.svg';

import '@/styles/components/Icon.scss';

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
  chevronRight,
  externalService
};

export default function Icon(props) {
  const { className, icon, disabled, spin, ...innerProps } = props;
  const IconSvg = svgs[icon];
  return (
    <div className={`${className} Icon Icon--${icon} ${disabled ? 'Icon--disabled' : ''} ${spin ? 'Icon--spin' : ''}`} {...innerProps}>
      { IconSvg && <IconSvg/> }
    </div>
  )
}

Icon.defaultProps = {
  icon: '',
  className: '',
  disabled: false,
  spin: false,
};