const path = require('path');
const fs = require('fs');
const flipnote = require('flipnote.js/dist/node');

const basePath = './public/static';
const meta = require(path.resolve(basePath, 'meta.json'));

Promise.all(meta['items'].map(item => {
  const filename = item['filename'];
  const filepath = path.resolve(basePath, filename);
  const filestem = path.basename(filepath, path.extname(filepath));
  const file = fs.readFileSync(filepath);
  return flipnote.parseSource(file.buffer)
    .then(note => {
      const gif = flipnote.gifEncoder.fromFlipnoteFrame(note, note.thumbFrameIndex);
      const gifBuffer = Buffer.from(gif.getBuffer());
      const imageUrl = `data:image/gif;base64,${gifBuffer.toString('base64')}`;
      return {
        ...item,
        filestem: filestem,
        author: note.meta.current.username,
        ext: note.type.toLowerCase(),
        thumb: imageUrl, 
      }
    });
  }
)).then(manifest => {
  const manifestPath = path.resolve(basePath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    items: manifest
  }));
})


