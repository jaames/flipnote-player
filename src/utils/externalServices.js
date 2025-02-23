const KAERU_URL_REGEX = /https?:\/\/gallery.kaeru.world\/memo\/([0-9a-z]{28})/; 

export class kaeruGallery {

  static getFlipnoteUrl(fsid, filename) {
    return `https://gallery.kaeru.world/memo/${ filename }`;
  }

  static getFileFromFlipnoteUrl(flipnoteUrl) {
    if (KAERU_URL_REGEX.test(flipnoteUrl)) {
      return flipnoteUrl.replace(KAERU_URL_REGEX, (match, filename) => (`https://cdn.kaeru.world/memo/kwz/${ filename }.kwz`));
    }
    return null;
  }

  static checkFlipnoteExists(fsid, filename) {
    return new Promise((resolve, reject) => {
      fetch(`https://gallery.kaeru.world/api/v0/memo/${ filename }`)
        .then(res => res.json())
        .then(data => {
          if (data['code'] === 200) {
            const link = data['memo']['link'].filter(link => link['rel'] === 'self')[0];
            resolve(link['href']);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
    
  }

}

export class sudomemo {

  static getFlipnoteUrl(fsid, filename) {
    return `https://www.sudomemo.net/watch/${ filename }`;
  }

  static getFileFromFlipnoteUrl(flipnoteUrl) {
    // lol there's no way sudomemo will allow this
    return null;
  }

  static checkFlipnoteExists(fsid, filename) {
    return new Promise((resolve, reject) => {
      let tempImage = new Image();
      tempImage.onload = () => {
        tempImage = null;
        resolve(sudomemo.getFlipnoteUrl(fsid, filename));
      }
      tempImage.onerror = (err) => {
        tempImage = null;
        reject(err);
      };
      tempImage.src = `https://www.sudomemo.net/theatre_assets/images/dynamic/thumbframe/${ fsid }/${ filename }.png?size=s`;
    });
  }
}

export function getFileFromFlipnoteUrl(flipnoteUrl) {
  const supportedServices = [kaeruGallery];
  for (const service of supportedServices) {
    const url = service.getFileFromFlipnoteUrl(flipnoteUrl); 
    if (url) {
      return url
    }
  }
  return flipnoteUrl;
}

export default {
  getFileFromFlipnoteUrl,
  kaeruGallery,
  sudomemo
}