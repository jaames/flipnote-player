import { Store } from 'pullstate';
import { storage as localstorage } from '~/utils';

export const GlobalStore = new Store({
  isLoading: false,
  isDarkMode: localstorage.get('theme', 'dark') === 'dark',
  hasError: false,
  errorType: null,
  errorData: {},
});

export const PlayerStore = new Store({
  src: null,
  note: null,
  forcePause: false,
  volume: localstorage.get('volume', 100)
});

export const GridStore = new Store({
  samples: [],
  items: [],
  mode: 'SAMPLE',
  page: 0
});