// const fs = require('fs').promises;
const Flipnote = require('flipnote.js');
const path = require('path');
const fs = require('fs');

const basePath = './public/static';
const meta = require(path.resolve(basePath, 'meta.json'));

// console.log(meta)

Promise.all(meta['items'].map(item => {
  const filename = item['filename'];
  const filepath = path.resolve(basePath, filename);
  const filestem = path.basename(filepath, path.extname(filepath));
  const file = fs.readFileSync(filepath);
  return Flipnote.parseSource(file)
    .then(note => {
      const gif = Flipnote.GifImage.fromFlipnoteFrame(note, note.thumbFrameIndex);
      const gifBuffer = gif.getBuffer();
      const imageUrl = `data:image/gif;base64,${gifBuffer.toString('base64')}`;
      return {
        ...item,
        filestem: filestem,
        author: note.meta.current.username,
        ext: note.formatString,
        thumb: imageUrl,
        timestamp: note.meta.timestamp
      }
    });
  }
)).then(manifest => {
  const manifestPath = path.resolve(basePath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    items: manifest
  }));
})


