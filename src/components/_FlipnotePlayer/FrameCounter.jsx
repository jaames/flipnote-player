import { CSSTransition } from '../_ConversionModal/node_modules/react-transition-group';
import '@/styles/components/FrameCounter.scss';

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