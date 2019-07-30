import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { GridStore, GlobalStore } from '~/store';
import Index from '~/pages/index';
import View from '~/pages/view';

GlobalStore.update(store => { store.isLoading = true });

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
    GlobalStore.update(store => { store.isLoading = false });
  });

export default props => {
  const isDarkMode = useStoreState(GlobalStore, s => s.isDarkMode);

  return (
    <Router>
      <div className={`App ${ isDarkMode ? 'theme--dark' : 'theme--light' }`}>
        <Route path="/" exact component={Index}/>
        <Route path="/view" component={View}/>
      </div>
    </Router>
  )
}