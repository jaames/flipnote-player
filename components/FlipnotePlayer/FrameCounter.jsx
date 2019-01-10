import Transition, { ENTERED, ENTERING, EXITING, EXITED } from 'react-transition-group/Transition';
import '~/assets/styles/components/FrameCounter.scss';

const DURATION = 200;

const states = {
  [ENTERING]: 'entering',
  [ENTERED]: 'entered',
  [EXITING]: 'exiting',
  [EXITED]: 'exited',
};

const FrameCounter = ({isVisible, current, total}) => ((
  <Transition in={isVisible} timeout={DURATION}>
    {(status) => (
      <span className={`FrameCounter FrameCounterTransition ${states[status]}`}>
        { current.toString().padStart(3, '0') } / { total.toString().padStart(3, '0') }
      </span>
    )}
  </Transition>
));

export default FrameCounter