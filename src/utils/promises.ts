// Resolve promise after a given number of milliseconds have passed
export const promiseWait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

// Try to resolve a promise, but throw an error if it hasn't resolved after a given number of milliseconds have passed
export const promiseWithTimeout = <T>(promise: Promise<T>, time: number): Promise<T> => Promise.race([
  promise,
  new Promise<T>((resolve, reject) => setTimeout(() => reject('TIMEOUT'), time))
]);