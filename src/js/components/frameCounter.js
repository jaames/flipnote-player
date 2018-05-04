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
  var current = props.current.toString(),
      total = props.total.toString();

  return (
    <Transition in={props.show} timeout={DURATION}>
      {(status) => (
        <span className={`frameCounter fade ${states[status]}`}>{current.padStart(3, "0")} / {total.padStart(3, "0")}</span>
      )}
    </Transition>
  );
}

FrameCounter.defaultProps = {
  current: 0,
  total: 0,
  show: true
}