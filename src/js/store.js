import { createStore } from "redux";
import storage from "util/storage";

const INITIAL = {
  src: null,
  meta: {},
  sampleMemos: new Array(12).fill({}).map(item => ({src: ""})),
  darkMode: storage.get("isDarkMode", false)
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
      let isDarkMode = !state.darkMode;
      storage.set("isDarkMode", isDarkMode);
      return {
        ...state,
        darkMode: isDarkMode
      };
    default:
      return state;
  }
});