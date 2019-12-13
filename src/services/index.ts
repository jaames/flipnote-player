import { IpgFlipService } from './IpgFlip';
import { SudomemoService } from './Sudomemo';
import { KaeruGalleryService } from './KaeruGallery';
import { fetchAsArrayBuffer } from './ServiceBase';

export const ServiceList = [
  new IpgFlipService(),
  new SudomemoService(),
  new KaeruGalleryService()
  // add another service here if you want m8s
];

export interface UrlInfo {
  url: string;
  service: string;
  name: string;
  icon: any;
};

// Check across all servies to see if a Flipnote exists there
export function getFlipnotePublicUrls(fsid: string, filename: string): Promise<UrlInfo[]> {
  // Concurrently call getFlipnotePublicUrl for every service in ServiceList
  return Promise.all(ServiceList.map((service) => {
    // Promise.all will reject everything if only one promise rejects
    // So we wrap getFlipnotePublicUrl and call resolve even if it rejects
    return new Promise<string>((resolve, reject) => {
      service.getFlipnotePublicUrl(fsid, filename)
      .then(url => resolve(url))
      .catch(() => resolve(null));
    });
  }))
  // Take url strings and return UrlInfo objects
  .then((urlList: string[]) => {
    return urlList.map((url, index) => (<UrlInfo>{
      url: url,
      service: ServiceList[index].id,
      name: ServiceList[index].name,
      icon: ServiceList[index].icon
    }));
  })
  // Filter out null URLs that didn't resolve
  .then((urlInfo: UrlInfo[]) => {
    return urlInfo.filter(info => info.url !== null);
  });
}

export function fetchFlipnoteFromPublicUrl(url: string): Promise<ArrayBuffer> {
  // If the URL provided matches the URL pattern of a service, try fetching it from there
  for (const service of ServiceList) {
    if (service.isFlipnotePublicUrlValid(url)) {
      return service.fetchFlipnoteFromPublicUrl(url);
    }
  }
  // Otherwise just try to fetch the URL directly, yolo
  return fetchAsArrayBuffer(url);
}