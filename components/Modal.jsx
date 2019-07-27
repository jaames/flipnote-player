import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import useOnClickOutside from '~/utils/useOnClickOutside';

import '~/assets/styles/components/Modal.scss';

export default function Modal({isVisible, isBackdropVisible, onHide, className, children}) {
  const body = useRef(document.body);
  const root = useRef();
  useOnClickOutside(root, (e) => {
    onHide();
  });

  useEffect(() => {
    const bodyClasses = body.current.classList;
    if (isVisible && isBackdropVisible) {
      bodyClasses.add('is-modal-open');
    } else {
      bodyClasses.remove('is-modal-open');
    }
  }, [isVisible, isBackdropVisible]);

  return createPortal((
    <CSSTransition
      in={ isVisible }
      timeout={ 300 }
      unmountOnExit
    >
      <div className={`ModalBackdrop ${ isBackdropVisible ? 'ModalBackdrop--visible' : '' }`}>
        <div ref={ root } className={`Modal ${ className }`}>
          <div className="Modal__head">
            <span onClick={ () => { onHide() } }>
              close
            </span>
          </div>
          <div className="Modal__body">
            { children }
          </div>
        </div>
      </div>
    </CSSTransition>
  ), body.current);
}

Modal.defaultProps = {
  isVisible: false,
  isBackdropVisible: false,
  onHide: function(){},
  className: ''
};