import { ServiceBase, fetchAsArrayBuffer, fetchAsJson } from './ServiceBase';
import KaeruGallerySvg from '@/svg/kaeru_gallery.svg';

const KAERU_URL_REGEX = /https?:\/\/gallery.kaeru.world\/memo\/([0-9a-z]{28})/; 

export class KaeruGalleryService extends ServiceBase {

  public id = 'KAERU_GALERY';
  public name = 'Kaeru Gallery';
  public homepage = 'https://gallery.kaeru.world';
  public icon = KaeruGallerySvg;

  isFlipnotePublicUrlValid(url: string) {
    return KAERU_URL_REGEX.test(url);
  }

  async getFlipnotePublicUrl(fsid: string, filename: string): Promise<string> {
    // Call Kaeru Gallery API
    const data: any = await fetchAsJson(`https://gallery.kaeru.world/api/v0/memo/${ filename }`);
    // Find URL in the response
    return new Promise<string>((resolve, reject) => {   
      if (data['code'] === 200) {
        const memoLinks = data['memo']['link'];
        const selfLink = memoLinks.filter((link: any) => link['rel'] === 'self')[0];
        resolve(selfLink['href']);
      } else {
        reject();
      }
    });
  }

  async fetchFlipnoteFromPublicUrl(url: string): Promise<ArrayBuffer> { 
    // First resolve the CDN location of the Flipnote file 
    const flipnoteUrl = await new Promise<string>((resolve, reject) => {
      const match = url.match(KAERU_URL_REGEX);
      if (match !== null) {
        const filename = match[1];
        resolve(`https://cdn.kaeru.world/memo/kwz/${ filename }.kwz`);
      } else {
        reject();
      }
    });
    // Then fetch it as an ArrayBuffer
    return fetchAsArrayBuffer(flipnoteUrl);
  }

}