export abstract class ServiceBase {

  abstract id: string;
  abstract name: string;
  abstract homepage: string;
  abstract icon: any;

  abstract isFlipnotePublicUrlValid(url: string): boolean;

  // Finds a public Flipnote URL for an FSID + filename
  // Used for checking if a Flipnote is available to view publicly on the given service
  // The Promise can just be rejected if this is not applicable or if the Flipnote isn't available
  abstract async getFlipnotePublicUrl(authorId: string, filename: string): Promise<string>;

  // Takes a public URL and provides raw Flipnote data (KWZ or PPM) as an ArrayBuffer
  // The "public URL" should be the web-facing URL if you have one e.g. https://myflipnoteservice.com/watch/F78DA8_021D2712538CC_005
  // The Promise can just be rejected if this is not applicable
  abstract async fetchFlipnoteFromPublicUrl(url: string): Promise<ArrayBuffer>;

}

// Generic service utils

export async function fetchAsArrayBuffer(req: RequestInfo) {
  return fetch(req).then(resp => resp.arrayBuffer());
}

export async function fetchAsJson(req: RequestInfo) {
  return fetch(req).then(resp => resp.json());
}

export function rejectPromise<T=any>() {
  return new Promise<T>((resolve, reject) => reject());
}