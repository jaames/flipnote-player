import { h } from "preact";
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from "react-transition-group/Transition";

const DURATION = 200;

const states = {
  [ENTERING]: 'entering',
  [ENTERED]: 'entered',
  [EXITING]: 'exiting',
  [EXITED]: 'exited',
};

export default function FrameCounter(props) {
  var current = props.current.toString().padStart(3, "0"),
      total = props.total.toString().padStart(3, "0");

  return (
    <Transition in={props.show} timeout={DURATION}>
      {(status) => (
        <span className={`frameCounter fade ${states[status]}`}>
          { current } / { total }
        </span>
      )}
    </Transition>
  );
}

FrameCounter.defaultProps = {
  current: 0,
  total: 0,
  show: true
}