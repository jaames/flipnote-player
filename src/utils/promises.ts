// Resolve promise after a given number of milliseconds have passed
export const promiseWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Try to resolve a promise, but throw an error if it hasn't resolved after a given number of milliseconds have passed
export const promiseWithTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => Promise.race([
  promise,
  new Promise<T>((resolve, reject) => setTimeout(() => reject('TIMEOUT'), ms))
]);