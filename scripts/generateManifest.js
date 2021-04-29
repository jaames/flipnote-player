const path = require('path');
const fs = require('fs');
const flipnote = require('flipnote.js');

const basePath = './public/static';
const meta = require(path.resolve(basePath, 'meta.json'));

Promise.all(meta['items'].map(item => {
  const filename = item['filename'];
  const filepath = path.resolve(basePath, filename);
  const filestem = path.basename(filepath, path.extname(filepath));
  const file = fs.readFileSync(filepath);
  return flipnote.parseSource(file.buffer)
    .then(note => {
      const meta = note.meta;
      const thumbImg = flipnote.GifImage.fromFlipnoteFrame(note, note.thumbFrameIndex);
      const thumbBuffer = thumbImg.getBuffer();
      const thumbDataUrl = `data:image/gif;base64,${thumbBuffer.toString('base64')}`;
      return {
        ...item,
        filestem: filestem,
        author: meta.current.username,
        ext: note.format.toLowerCase(),
        thumb: thumbDataUrl,
        timestamp: meta.timestamp
      }
    });
  }
)).then(manifest => {
  const manifestPath = path.resolve(basePath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    items: manifest
  }));
})


