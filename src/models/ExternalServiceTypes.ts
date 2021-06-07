import { Flipnote } from 'flipnote.js';

export enum ClientType {
  Sudomemo,
  KaeruGallery,
  KaeruDsiLibrary,
  IpgFlip
};

export interface ExternalFlipnoteItem {
  service: ClientType;
  url: string;
};

export interface ExternalAuthorItem {
  service: ClientType;
  url: string;
};

export interface ExternalServiceClient {
  service: ClientType;
  testNoteUrlMatch: (url: string) => boolean;
  getNoteFromUrl: (url: string) => Promise<Flipnote | null>;
  getNoteDetails: (note: Flipnote) => Promise<ExternalFlipnoteItem[]>;
  getAuthorDetails: (fsid: string) => Promise<ExternalAuthorItem[]>;
};