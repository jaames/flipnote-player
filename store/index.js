import { storage as localstorage } from '~/utils';

const initialState = {
  theme: localstorage.get('theme', 'dark'),
  sampleFlipnotes: [],
  gridMode: 'SAMPLE',
  gridItems: [],
  gridPage: 0,
  playerSrc: '',
  playerVolume: localstorage.get('volume', 100),
  playerSmoothingEnabled: true,
  playerMeta: null,
  playerAuthor: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_THEME':
      let theme = action.payload.theme;
      localstorage.set('theme', theme);
      return {
        ...state,
        theme: theme
      };
    case 'LOAD_SAMPLE_FLIPNOTES':
      return {
        ...state,
        sampleFlipnotes: action.payload.sampleFlipnotes,
        gridItems: action.payload.sampleFlipnotes
      };
    case 'GRID_SET_PAGE':
      return {
        ...state,
        gridPage: action.payload.page
      };
    case 'GRID_SET_MODE':
      return {
        ...state,
        gridItems: action.payload.items,
        gridMode: action.payload.mode,
        gridPage: 0
      };
    case 'GRID_SET_ITEMS':
      return {
        ...state,
        gridItems: action.payload.items
      };
    case 'PLAYER_LOAD_FLIPNOTE':
      return {
        ...state,
        playerSrc: action.payload.src
      };
    case 'PLAYER_UNLOAD_FLIPNOTE':
      return {
        ...state,
        playerSrc: '',
        playerMeta: null,
        playerAuthor: ''
      };
    case 'PLAYER_SET_VOLUME':
      let volume = action.payload.volume;
      return {
        ...state,
        playerVolume: volume
      };
    case 'PLAYER_SET_SMOOTHING':
      let enabled = action.payload.enabled;
      return {
        ...state,
        playerSmoothingEnabled: enabled
      };
    case 'PLAYER_SET_META':
      let meta = action.payload.meta;
      return {
        ...state, 
        playerMeta: meta,
        playerAuthor: meta.current.username
      };
    default:  
      return state;
  }
}

export default reducer;