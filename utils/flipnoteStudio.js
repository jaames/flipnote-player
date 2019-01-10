export default class flipnoteStudio {

  static getFsidRegion(fsid) {
    switch (fsid.charAt(0)) {
      case '0':
      case '1':
        return 'Japan';
        break;
      case '5':
        return 'America';
        break;
      case '9':
        return 'Europe';
        break;
      default:
        return '???';
        break;
    }
  }

}