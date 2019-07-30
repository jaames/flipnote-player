import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStoreState } from 'pullstate';
import { GlobalStore } from '~/store';
import { CSSTransition } from 'react-transition-group';
import useOnClickOutside from '~/utils/useOnClickOutside';

import '~/assets/styles/components/Modal.scss';

export default function Modal({isVisible, isBackdropVisible, onHide, className, title, children}) {
  const isDarkMode = useStoreState(GlobalStore, s => s.isDarkMode);


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
      <div className={`ModalBackdrop ${ isBackdropVisible ? 'ModalBackdrop--visible' : '' } ${ isDarkMode ? 'theme--dark' : 'theme--light' }`}>
        <div ref={ root } className={`Modal ${ className }`}>
          <div className="Modal__head">
            <h4 className="Modal__title">{ title }</h4>
            <span className="Modal__closeIcon" onClick={ () => { onHide() } }>
              Close
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
  title: '',
  isVisible: false,
  isBackdropVisible: false,
  onHide: function(){},
  className: ''
};