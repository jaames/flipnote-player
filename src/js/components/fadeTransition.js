import { h, cloneElement } from "preact";
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from "react-transition-group/Transition";

const FADE_DURATION = 200;

const fadeStyles = {
  [ENTERING]: 'entering',
  [ENTERED]: 'entered',
  [EXITING]: 'exiting',
  [EXITED]: 'exited',
};

export default ({ children, ...props }) => {
  return (
    <Transition {...props} timeout={FADE_DURATION}>
      {(status, innerProps) => cloneElement(children, {
        ...innerProps,
        className: `fade ${fadeStyles[status]}`,
      })}
    </Transition>
  );
}