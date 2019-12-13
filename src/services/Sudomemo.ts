import { ServiceBase, fetchAsArrayBuffer, fetchAsJson, rejectPromise } from './ServiceBase';
import SudomemoFoxSvg from '@/svg/sudomemo_fox.svg';

const SUDOMEMO_URL_REGEX = /https?:\/\/(?:www.)?sudomemo.net\/watch\/([0-9A-F]{6}_[0-9A-F]{13}_[0-9]{3})/;

export class SudomemoService extends ServiceBase {

  public id = 'SUDOMEMO';
  public name = 'Sudomemo';
  public homepage = 'https://www.sudomemo.net';
  public icon = SudomemoFoxSvg;

  isFlipnotePublicUrlValid(url: string) {
    return SUDOMEMO_URL_REGEX.test(url);
  }

  async fetchFlipnoteFromPublicUrl(url: string): Promise<ArrayBuffer> { 
    // Sudomemo won't allow this :(
    return rejectPromise<ArrayBuffer>();
  }

  async getFlipnotePublicUrl(fsid: string, filename: string): Promise<string> {
    // Try fetching the thumbnail for a given Flipnote
    // This is the only way to reliably check if a Flipnote exists on Sudomemo AFAIK
    // They do also have a oembed endpoint but it seems to have CORS issues at the moment?
    // https://www.sudomemo.net/oembed?url=https://www.sudomemo.net/watch/${ filename }&format=json
    return new Promise((resolve, reject) => {
      let tempImage = new Image();
      tempImage.onload = () => {
        tempImage = null;
        resolve(`https://www.sudomemo.net/watch/${ filename }`);
      }
      tempImage.onerror = (err) => {
        tempImage = null;
        reject(err);
      }
      tempImage.src = `https://www.sudomemo.net/theatre_assets/images/dynamic/thumbframe/${ fsid }/${ filename }.png?size=s`;
    });
  }
}