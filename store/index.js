const initialState = {
  sampleFlipnotes: [],
  playerSrc: '',
  playerVolume: 1,
  playerSmoothingEnabled: true,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOAD_SAMPLES':
      return { ...state, sampleFlipnotes: action.sampleFlipnotes };
    case 'PLAYER_LOAD_FLIPNOTE':
      return { ...state, playerSrc: action.src };
    case 'PLAYER_SET_VOLUME':
      const volume = action.volume;
      return { ...state, playerVolume: volume };
    case 'PLAYER_SET_SMOOTHING':
      const enabled = action.enabled;
      return { ...state, playerSmoothingEnabled: enabled };
    default:  
      return state;
  }
}

export default reducer;