export const storageSet = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const storageGet = (key: string, defaultValue: any) => {
  if (localStorage.hasOwnProperty(key))
    return JSON.parse(localStorage.getItem(key) || '');
  else
    return defaultValue;
}