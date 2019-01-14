import { Component } from 'react';
import { connect } from 'react-redux';
import Switch from '~/components/Switch';

class ThemeToggle extends Component {

  render() {
    return (
      <div className="ThemeToggle">
        <Switch on={ this.props.theme === 'light' } onClick={ () => this.toggleTheme() }/>
      </div>
    );
  }

  toggleTheme() {
    this.props.dispatch({
      type: 'SET_THEME',
      payload: {
        theme: this.props.theme === 'light' ? 'dark' : 'light'
      }
    });
  }

}

export default connect(state => state)(ThemeToggle);