import ReactGA from 'react-ga';

const IS_PROD = process.env.NODE_ENV == 'production';

// feel free to stub this out if you dont like analytics

export default class ga {

  static init(id) {
    if (IS_PROD) {
      ReactGA.initialize(id);
      // gotta make sure not to collect user's IP addresses here, thanks to the well-considered nuances of the EU GDPR legislation
      ReactGA.set({ anonymizeIp: true });
    }
  }

  static pageview(url) {
    if (IS_PROD) ReactGA.pageview(url);
  }

}