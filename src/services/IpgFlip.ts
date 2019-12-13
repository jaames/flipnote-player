import { ServiceBase, fetchAsArrayBuffer, fetchAsJson } from './ServiceBase';
import IpgFlipSvg from '@/svg/ipgflip.svg';

const IPG_URL_REGEX = /https?:\/\/(?:www.)?ipgflip.xyz\/watch\/([0-9A-F]{6}_[0-9A-F]{13}_[0-9]{3})/;

export class IpgFlipService extends ServiceBase {

  public id = 'IPGFLIP';
  public name = 'IPGFlip';
  public homepage = 'https://ipgflip.xyz';
  public icon = IpgFlipSvg;

  isFlipnotePublicUrlValid(url: string) {
    return IPG_URL_REGEX.test(url);
  }

  async fetchFlipnoteFromPublicUrl(url: string): Promise<ArrayBuffer> { 
    // First resolve the CDN location of the Flipnote file 
    const flipnoteUrl = await new Promise<string>((resolve, reject) => {
      const match = url.match(IPG_URL_REGEX);
      if (match !== null) {
        const filename = match[1];
        resolve(`https://content.ipgflip.xyz/movie/${ filename }.ppm`);
      } else {
        reject();
      }
    });
    // Then fetch it as an ArrayBuffer
    return fetchAsArrayBuffer(flipnoteUrl);
  }

  async getFlipnotePublicUrl(fsid: string, filename: string): Promise<string> {
    // Call IPGFlip API
    const data: any = await fetchAsJson(`https://api.ipgflip.xyz/flipnote/${ filename }`);
    // Check if the responce was successful
    return new Promise<string>((resolve, reject) => {   
      if (data['success'] === true) {
        resolve(`https://ipgflip.xyz/watch/${ filename }`);
      } else {
        reject();
      }
    });
  }

}