import { parse, GifImage } from 'flipnote.js';
import { readFile, writeFile } from 'fs/promises';
import { resolve, basename, extname } from 'path';
import { createHash } from 'crypto';
import { BSON } from 'bson';

import type {
  SampleMetaEntry,
  SampleManifestEntry,
} from '../src/core/samples/types';

const BASE_PATH = './public/static';

const META_PATH = resolve(BASE_PATH, 'meta.json');
const MANIFEST_PATH = resolve(BASE_PATH, 'manifest.bson');

const meta: SampleMetaEntry[] = JSON.parse(await readFile(META_PATH, 'utf-8'));

const manifest: SampleManifestEntry[] = await Promise.all(
  meta.map(async (item) => {
    const filepath = resolve(BASE_PATH, item.filename);
    const file = await readFile(filepath);
    const note = await parse(file);
    const thumbImg = GifImage.fromFlipnoteFrame(note, note.thumbFrameIndex);
    const thumbBuffer = new Uint8Array(thumbImg.getArrayBuffer());
    const stem = basename(filepath, extname(filepath));
    const hash = createHash('shake256', { outputLength: 6 })
      .update(note.meta.current.filename)
      .digest('hex');
    
    return {
      ...item,
      thumb: thumbBuffer,
      author: note.meta.current.username,
      ext: note.format,
      timestamp: note.meta.timestamp,
      lock: note.meta.lock,
      stem,
      hash,
    };
  }),
);

await writeFile(MANIFEST_PATH, BSON.serialize({ items: manifest }));
