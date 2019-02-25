import { parser as Parser } from 'flipnote.js';

export function readFileArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      resolve(event.target.result);
    };
    reader.onerror = event => {
      reject({type: "fileReadError"});
    };
    reader.readAsArrayBuffer(file);
  });
}

export function getFlipnoteMeta(arrayBuffer) {
  return new Promise((resolve, reject) => {
    const flipnote = new Parser(arrayBuffer);
    const meta = {
      author: flipnote.meta.current.username,
      src: arrayBuffer,
      placeholder: false,
      ext: null,
      thumb: flipnote.getFrameBitmap(flipnote.thumbFrameIndex).getUrl(),
      note: flipnote
    };
    resolve(meta);
  });
}

export function loadFiles(files) {
  return Promise.all(files.map(file => readFileArrayBuffer(file)))
  .then(buffers => Promise.all(buffers.map(buffer => getFlipnoteMeta(buffer))));
}