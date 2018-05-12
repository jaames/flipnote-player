
import ReactGA from "react-ga";

const IS_PROD = process.env.NODE_ENV == "production";

// feel free to stub this out if you dont like analytics

export default class ga {

  static init(id) {
    if (IS_PROD) ReactGA.initialize(id);
  }

  static pageview(url) {
    if (IS_PROD) ReactGA.pageview(url);
  }

}