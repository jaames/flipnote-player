export default class storage {

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key, fallback) {
    if (process.browser && localStorage.hasOwnProperty(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return fallback;
    }
  }

};