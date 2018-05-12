import { createStore } from "redux";

const INITIAL = {
  src: null,
  sampleMemos: new Array(12).fill({}).map(item => ({src: ""}))
};

export default createStore((state=INITIAL, action) => {
  switch (action.type) {
    case "LOAD_FLIPNOTE":
      return {
        ...state,
        src: action.src
      };
    case "LOAD_SAMPLE_MEMOS":
      return {
        ...state,
        sampleMemos: action.data
      };
    default:
      return state;
  }
});