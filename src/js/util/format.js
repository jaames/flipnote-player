export default class format {

  static byteCount(bytes) {
    if (bytes == 0) return "null";
    var k = 1000;
    var sizes = ["B", "KB", "MB", "GB"];
    var exp = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, exp)).toFixed(1) + " " + sizes[exp];
  }

}