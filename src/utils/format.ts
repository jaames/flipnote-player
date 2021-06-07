export const formatFileSize = (bytes: number) => {
  const k = 1000;
  const units = ['bytes', 'kB', 'MB', 'GB'];
  const exp = Math.floor(Math.log(bytes) / Math.log(k));
  const counter = bytes / Math.pow(k, exp);
  return `${ counter.toFixed(1) } ${ units[exp] }`;
}