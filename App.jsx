import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import reducer from '~/store';

const store = createStore(reducer);

fetch('./static/manifest.json')
  .then(res => res.json())
  .then(data => {
    let items = data['items'].map(item => ({
      ...item, 
      src: `./static/${item.ext}/${item.filestem}.${item.ext}`
    }));

    store.dispatch({
      type: 'LOAD_SAMPLE_FLIPNOTES', 
      payload: {
        sampleFlipnotes: items
      }
    });

  });


import Index from './pages/index';
import View from './pages/view';

export default props => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Route path="/" exact component={Index}/>
        <Route path="/view" component={View}/>
      </div>
    </Router>
  </Provider>
)