import { Store } from 'pullstate';
import { storage as localstorage } from '~/utils';

export const UIStore = new Store({
  isDarkMode: localstorage.get('theme', 'dark') === 'dark',
});

export const PlayerStore = new Store({
  src: null,
  note: null,
  volume: localstorage.get('volume', 100)
});

export const GridStore = new Store({
  samples: [],
  items: [],
  mode: 'SAMPLE',
  page: 0
});