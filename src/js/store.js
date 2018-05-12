import { createStore } from "redux";

const INITIAL = {
  src: null
};

export default createStore((state=INITIAL, action) => {
  switch (action.type) {
    case "LOAD_FLIPNOTE":
      return {
        src: action.src
      };
    default:
      return state;
  }
});