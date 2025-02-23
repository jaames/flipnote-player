import play from '@/svg/play.svg?react';
import pause from '@/svg/pause.svg?react';
import loop from '@/svg/loop.svg?react';
import noloop from '@/svg/noloop.svg?react';
import firstFrame from '@/svg/firstFrame.svg?react';
import lastFrame from '@/svg/lastFrame.svg?react';
import prevFrame from '@/svg/prevFrame.svg?react';
import nextFrame from '@/svg/nextFrame.svg?react';
import settings from '@/svg/settings.svg?react';
import loader from '@/svg/loader.svg?react';
import chevronLeft from '@/svg/chevronLeft.svg?react';
import chevronRight from '@/svg/chevronRight.svg?react';
import externalService from '@/svg/externalService.svg?react';

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