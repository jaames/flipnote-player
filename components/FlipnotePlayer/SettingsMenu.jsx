import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useOnClickOutside from '~/utils/useOnClickOutside';

import '~/assets/styles/components/SettingsMenu.scss';

export default function SettingsMenu(props) {

  const root = useRef();
  useOnClickOutside(root, (e) => {
    props.onHide();
  });

  return (
    <CSSTransition
      in={props.isVisible}
      timeout={200}
      unmountOnExit>
      <div ref={ root } className="SettingsMenu">  
        { props.children }
      </div>
    </CSSTransition>
  );
}

SettingsMenu.defaultProps = {
  isVisible: false,
  onHide: function(){},
}