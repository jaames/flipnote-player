/**
 * KaeruGalleryClient
 * API client for https://gallery.kaeru.world/, a fan-built online service for Flipnote Studio 3D
 * Thanks Lauren for taking time to clean up API stuff for me :)
 */

import { Flipnote, parseSource } from 'flipnote.js';
import { ClientType, ExternalServiceClient, ExternalFlipnoteItem, ExternalAuthorItem } from '../../models/ExternalServiceTypes';
import { stringCompileTemplate } from '../../utils';

const URL_REGEX = /https?:\/\/gallery.kaeru.world\/memo\/([0-9a-z]{28})/;
const URL_TEMPLATE_KWZ = stringCompileTemplate`https://cdn.kaeru.world/memo/kwz/${0}.kwz`;
const URL_TEMPLATE_MEMO = stringCompileTemplate`https://gallery.kaeru.world/api/v0/memo/${0}`;

export class KaeruGalleryClient implements ExternalServiceClient {

  public service = ClientType.KaeruGallery;

  public testNoteUrlMatch(url: string) { 
    return URL_REGEX.test(url);
  }

  async getNoteFromUrl(url: string) { 
    if (!this.testNoteUrlMatch(url)) {
      return null;
    }
    try {
      const noteSrc = url.replace(URL_REGEX, (m, filename) => URL_TEMPLATE_KWZ([filename]));
      return await parseSource(noteSrc);
    }
    catch (e) {
      return null;
    }
  }

  // Bug Lauren for API endpoint?
  async getAuthorDetails(fsid: string): Promise<ExternalAuthorItem[]> {
    return [];
  }

  async getNoteDetails(note: Flipnote): Promise<ExternalFlipnoteItem[]> {
    try {
      const filename = note.meta.current.filename;
      const url = URL_TEMPLATE_MEMO([filename]);
      const response = await fetch(url);
      const data = await response.json();
      if (data.code !== 200 || data.memo === undefined)
        throw '';
      return [
        {
          service: this.service,
          url
        }
      ];
    }
    catch (e) {
      return [];
    }
  }
}