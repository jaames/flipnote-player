export default class ajax {

  static getJson(endpoint, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
        try {
          var data = JSON.parse(xhr.responseText);
        } catch(err) {
          console.warn(err.message + " in " + xhr.responseText);
          return;
        }
        callback(data);
      }
    };
    xhr.open("GET", endpoint, true);
    xhr.send();
  }

}