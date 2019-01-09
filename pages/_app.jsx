import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import reducer from '~/store';

const store = createStore(reducer);

class MyApp extends App {

  render() {
    const {Component, pageProps, reduxStore} = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }

}

export default MyApp;