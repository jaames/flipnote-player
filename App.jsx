import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import reducer from '~/store';

const store = createStore(reducer);

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