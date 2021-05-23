import { useRef } from 'react';
import { CSSTransition } from '../_ConversionModal/node_modules/react-transition-group';
import useOnClickOutside from '@/utils/useOnClickOutside';

import '@/styles/components/SettingsMenu.scss';

export default function SettingsMenu({ isVisible, onHide, children }) {

  const root = useRef();
  useOnClickOutside(root, (e) => {
    onHide();
  });

  return (
    <CSSTransition
      in={ isVisible }
      timeout={ 150 }
      unmountOnExit
    >
      <div ref={ root } className="SettingsMenu">  
        { children }
      </div>
    </CSSTransition>
  );
}

SettingsMenu.defaultProps = {
  isVisible: false,
  onHide: function(){},
}