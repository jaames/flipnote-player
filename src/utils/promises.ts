export const promiseWait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const promiseWithTimeout = <T>(promise: Promise<T>, time: number) => {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => setTimeout(() => reject('TIMEOUT'), time))
  ]);
}