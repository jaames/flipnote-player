import { BSON } from 'bson';
import {
  assert,
  isObject,
  isString,
  isArray,
  isTypedArray,
  isBoolean,
  isDate,
} from '../utils';
import { ExpandedSampleManifestEntry, SampleManifestEntry } from './types';

export * from './types';

const SAMPLE_MANIFEST = '/static/manifest.bson';

export const getSampleFlipnotes = async (): Promise<
  ExpandedSampleManifestEntry[]
> => {
  const res = await fetch(SAMPLE_MANIFEST);

  assert(res.ok, `Failed to fetch sample Flipnote manifest: ${res.statusText}`);

  const data = BSON.deserialize(await res.bytes(), {
    promoteBuffers: true,
  }) as { items: SampleManifestEntry[] };

  assert(isArray(data.items), 'Sample Flipnote manifest is not an array');
  assert(
    data.items.every((item: any) => {
      return (
        isObject(item) &&
        isString(item.filename) &&
        isTypedArray(item.thumb) &&
        isString(item.author) &&
        isString(item.ext) &&
        ['PPM', 'KWZ'].includes(item.ext) &&
        isDate(item.timestamp) &&
        isBoolean(item.lock)
      );
    }),
    'Sample Flipnote manifest contains invalid items',
  );

  return data.items.map((item) => ({
    ...item,
    thumbUrl: URL.createObjectURL(new Blob([item.thumb])),
  }));
};

export const destroySampleFlipnoteThumbnails = (
  items: ExpandedSampleManifestEntry[],
): void => {
  items.forEach((item) => {
    URL.revokeObjectURL(item.thumbUrl);
  });
};
