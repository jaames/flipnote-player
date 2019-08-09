import { useRef } from 'react';
import '@/styles/components/Slider.scss';

const eventParams = { passive: false };

export default function Slider(props) {

  const root = useRef();

  const handleInput = (e) => {
    e.preventDefault();
    const bounds = root.current.getBoundingClientRect();
    const point = e.touches ? e.changedTouches[0] : e;
    const dist = Math.max(Math.min(point.clientX - bounds.left, bounds.width), 0);
    const percent = (1 / bounds.width) * dist;
    const newValue = ((props.max - props.min) * percent) - props.min;
    props.onChange(newValue);
  }

  const handleMouseUp = (e) => {
    handleInput(e);
    document.removeEventListener('mousemove', handleInput, eventParams);
    document.removeEventListener('mouseup', handleMouseUp, eventParams);
    document.removeEventListener('touchmove', handleInput, eventParams);
    document.removeEventListener('touchend', handleMouseUp, eventParams);
    props.onAfterChange(e);
  }

  const handleMouseDown = (e) => {
    props.onBeforeChange(e);
    handleInput(e);
    document.addEventListener('mousemove', handleInput, eventParams);
    document.addEventListener('mouseup', handleMouseUp, eventParams);
    document.addEventListener('touchmove', handleInput, eventParams);
    document.addEventListener('touchend', handleMouseUp, eventParams);
  }

  const value = Math.max(props.min, Math.min(props.max, props.value));
  const progress = ((value - props.min) / (props.max - props.min)) * 100;

  return (
    <div 
      ref={ root }
      className={ `Slider ${ props.className }` }
      onMouseDown={ handleMouseDown }
      onTouchStart={ handleMouseDown }
    >
      <div className="Slider__bar">
        <div className="Slider__progress" style={{ left: 0, width: `${ progress }%` }}></div>
        <div className="Slider__handle" style={{ left: `${ progress }%` }}></div>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  onChange: function() {},
  onBeforeChange: function() {},
  onAfterChange: function() {},
}