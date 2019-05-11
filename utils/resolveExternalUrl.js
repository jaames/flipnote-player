const KAERU_LINK_REGEX = /https?:\/\/gallery.kaeru.world\/memo\/([0-9a-z]{28})/; 
const IPG_LINK_REGEX = /https?:\/\/(?:www.)?ipgflip.xyz\/watch\/([0-9A-F]{6}_[0-9A-F]{13}_[0-9]{3})/;

export function resolveExternalUrl(url) {
  if (KAERU_LINK_REGEX.test(url)) {
    return url.replace(KAERU_LINK_REGEX, filename => (`https://cdn.kaeru.world/memo/kwz/${filename}.kwz`));
  }
  else if (IPG_LINK_REGEX.test(url)) {
    return url.replace(IPG_LINK_REGEX, filename => (`https://content.ipgflip.xyz/movie/${filename}.ppm`));
  }
  return url;
}