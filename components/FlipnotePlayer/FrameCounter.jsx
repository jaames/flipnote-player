import { CSSTransition } from 'react-transition-group';
import '~/assets/styles/components/FrameCounter.scss';

export default ({isVisible, current, total}) => ((
  <CSSTransition
    in={ isVisible }
    timeout={ 150 }
    unmountOnExit
  >
    <span className="FrameCounter">
      { current.toString().padStart(3, '0') } / { total.toString().padStart(3, '0') }
    </span>
  </CSSTransition>
));