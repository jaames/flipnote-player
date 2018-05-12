import { h, render } from "preact";
import { Provider } from "preact-redux";
import App from "./js/app";
import store from "./js/store";

render(<Provider store={store}><App/></Provider>, document.getElementById("root"));