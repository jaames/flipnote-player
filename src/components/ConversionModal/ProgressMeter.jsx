import { CSSTransition } from 'react-transition-group';
import Icon from '@/components/Icon';

export default function ProgressMeter({ isActive, percent, status }) {
  return (
    <div className="ProgressMeter">
      <div className="ProgressMeter__main">
        <div className="ProgressMeter__status">
          { status } 
        </div>
        <CSSTransition in={ isActive } timeout={200}>
          <div className="ProgressBar">
            <div className="ProgressBar__level" style={ {width: `${percent}%`} }></div>
          </div>
        </CSSTransition>
      </div>
      <div className="ProgressMeter__icon">
        <CSSTransition in={ isActive } timeout={200} unmountOnExit>
          <Icon icon="loader" spin={ true }/> 
        </CSSTransition>
      </div>
    </div>
  )
}