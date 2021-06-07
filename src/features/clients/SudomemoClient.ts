/**
 * SudomemoClient
 * API client for www.sudomemo.net, a fan-built online service for the DSiWare version of Flipnote Studio
 * Sudomemo doesn't really have a real API, they do at least support oEmbed for Flipnotes though
 */

import { Flipnote } from 'flipnote.js';
import { ClientType, ExternalServiceClient, ExternalFlipnoteItem, ExternalAuthorItem } from '../../models/ExternalServiceTypes';

export class SudomemoClient implements ExternalServiceClient {

  public service = ClientType.Sudomemo;

  // No point matching Sudomemo URLs since they'll never allow me to load PPMs anyway... annoying
  public testNoteUrlMatch(url: string) {
    return false;
  }

  // See above, lol
  async getNoteFromUrl(url: string) {
    return null;
  }

  // Bug Austin about an API for this?
  async getAuthorDetails(fsid: string): Promise<ExternalAuthorItem[]> {
    return [];
  }

  async getNoteDetails(note: Flipnote): Promise<ExternalFlipnoteItem[]> {
    try {
      const filename = note.meta.current.filename;
      const url = `https://www.sudomemo.net/watch/${ filename }`;
      const oEmbedUrl = `https://www.sudomemo.net/oembed?url=${ url }&format=json`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
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