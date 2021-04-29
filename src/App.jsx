import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { GridStore, GlobalStore } from '@/store';
import Index from '@/pages/index';
import View from '@/pages/view';
import NoMatch from '@/pages/404';

GlobalStore.update(store => { store.isLoading = true });

fetch('./static/manifest.json')
  .then(res => res.json())
  .then(data => {
    const items = data['items'].map(item => ({
      ...item,
      src: `./static/${item.ext}/${item.filestem}.${item.ext}`
    }));

    items.map(x => x.timestamp = new Date(x.timestamp));
    items.sort((a, b) => b.timestamp - a.timestamp);

    GridStore.update(store => {
      store.samples = items;
      store.items = items;
    });
    GlobalStore.update(store => { store.isLoading = false });
  });

export default props => {
  const isDarkMode = useStoreState(GlobalStore, s => s.isDarkMode);

  return (
    <div className={`App ${ isDarkMode ? 'theme--dark' : 'theme--light' }`}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Index }/>
          <Route exact path="/view" component={ View }/>
          <Route component={ NoMatch }/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}