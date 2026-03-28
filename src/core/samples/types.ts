import type { FlipnoteFormat } from 'flipnote.js';

export type SampleMetaEntry = {
  filename: string;
  author?: string;
  links?: {
    name: string;
    url: string;
  }[];
};

export type SampleManifestEntry = SampleMetaEntry & {
  thumb: Uint8Array;
  author: string;
  ext: FlipnoteFormat;
  timestamp: Date;
  lock: boolean;
  stem: string;
  hash: string;
};

export type ExpandedSampleManifestEntry = SampleManifestEntry & {
  thumbUrl: string;
};
