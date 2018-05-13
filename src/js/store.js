import { createStore } from "redux";

const INITIAL = {
  src: null,
  meta: {},
  sampleMemos: new Array(12).fill({}).map(item => ({src: ""})),
  darkMode: false
};

export default createStore((state=INITIAL, action) => {
  switch (action.type) {
    case "LOAD_FLIPNOTE":
      return {
        ...state,
        src: action.src,
        meta: action.meta || {}
      };
    case "LOAD_SAMPLE_MEMOS":
      return {
        ...state,
        sampleMemos: action.data
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
});