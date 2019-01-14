import { Component } from 'react';
import RCSlider from 'rc-slider';

import '~/assets/styles/components/Slider.scss';

class Slider extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  onBeforeChange() {
    this.setState({ isActive: true });
  }

  onAfterChange() {
    this.setState({ isActive: false });
  }

  render() {
    const { props, state } = this;
    return (
      <RCSlider 
        {...props}
        className={`${props.className || ""} ${state.isActive ? "is-active" : ""}`}
        onBeforeChange={(v) => { this.onBeforeChange(); props.onBeforeChange(v) }}
        onAfterChange={(v) => { this.onAfterChange(); props.onAfterChange(v) }}
      />
    );
  }
}

Slider.defaultProps = {
  onBeforeChange: function(){},
  onAfterChange: function(){}
}

export default Slider;