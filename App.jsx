import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { GridStore, UIStore } from '~/store';
import Index from './pages/index';
import View from './pages/view';

fetch('./static/manifest.json')
  .then(res => res.json())
  .then(data => {
    const items = data['items'].map(item => ({
      ...item, 
      src: `./static/${item.ext}/${item.filestem}.${item.ext}`
    }));
    GridStore.update(store => {
      store.samples = items;
      store.items = items;
    });
  });

export default props => {
  const isDarkMode = useStoreState(UIStore, s => s.isDarkMode);

  return (
    <Router>
      <div className={`App ${ isDarkMode ? 'theme--dark' : 'theme--light' }`}>
        <Route path="/" exact component={Index}/>
        <Route path="/view" component={View}/>
      </div>
    </Router>
  )
}