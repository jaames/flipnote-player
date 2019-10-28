import {
  parseSource,
  gifEncoder as GifEncoder
} from 'flipnote.js';

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

export function createParser(arrayBuffer) {
  return new Promise((resolve, reject) => {
    parseSource(arrayBuffer)
      .then((parser) => {
        resolve(parser);
      })
      .catch(() => {
        resolve(undefined);
      })
  });
}

export function getFlipnoteMeta(flipnote) {
  return new Promise((resolve, reject) => {
    if (!flipnote) {
      reject();
    } else {
    const meta = flipnote.meta;
    const thumb = GifEncoder.fromFlipnoteFrame(flipnote, flipnote.thumbFrameIndex);
    const item = {
      author: meta.current.username,
      lock: meta.lock ? true : false,
      src: flipnote.buffer,
      placeholder: false,
      ext: flipnote.type.toLowerCase(),
      filename: meta.current.filename,
      thumb: thumb.getUrl(),
      note: flipnote,
      timestamp: meta.timestamp
    };
    resolve(item);
    }
  });
}

export function loadFiles(files) {
  return Promise.all(files.map(file => readFileArrayBuffer(file)))
  // create a parser object for each flipnote
  .then(buffers => Promise.all(buffers.map(buffer => createParser(buffer))))
  .then(flipnotes => Promise.all(
    flipnotes
    // filter out any null flipnotes (these are errors!)
    .filter(flipnote => flipnote !== undefined)
    .map(flipnote => getFlipnoteMeta(flipnote))
  ))
}