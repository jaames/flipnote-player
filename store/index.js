const initialState = {
  sampleFlipnotes: [],
  playerSrc: '',
  playerVolume: 1,
  playerSmoothingEnabled: true,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOAD_SAMPLE_FLIPNOTES':
      return { ...state, sampleFlipnotes: action.payload.sampleFlipnotes };
    case 'PLAYER_LOAD_FLIPNOTE':
      return { ...state, playerSrc: action.payload.src };
    case 'PLAYER_SET_VOLUME':
      const volume = action.payload.volume;
      return { ...state, playerVolume: volume };
    case 'PLAYER_SET_SMOOTHING':
      const enabled = action.payload.enabled;
      return { ...state, playerSmoothingEnabled: enabled };
    default:  
      return state;
  }
}

export default reducer;