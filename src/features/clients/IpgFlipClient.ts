/**
 * IpgFlipClient
 * API client for https://ipgflip.xyz, a fan-built online service for the DSiWare version of Flipnote Studio
 * The only Flipnote service to have all the API endpoints I want!?
 */

import { Flipnote, parseSource } from 'flipnote.js';
import { ClientType, ExternalServiceClient, ExternalFlipnoteItem, ExternalAuthorItem } from '../../models/ExternalServiceTypes';

const IPG_URL_REGEX = /https?:\/\/(?:www.)?ipgflip.xyz\/watch\/([0-9A-F]{6}_[0-9A-F]{13}_[0-9]{3})/;

export class IpgFlipClient implements ExternalServiceClient {

  public service = ClientType.IpgFlip;

  public testNoteUrlMatch(url: string) { 
    return IPG_URL_REGEX.test(url);
  }

  async getNoteFromUrl(url: string) { 
    if (!this.testNoteUrlMatch(url)) {
      return null;
    }
    try {
      const noteSrc = url.replace(IPG_URL_REGEX, (match, filename) => (`https://content.ipgflip.xyz/movie/${ filename }.ppm`));
      return await parseSource(noteSrc);
    }
    catch (e) {
      return null;
    }
  }

  async getAuthorDetails(fsid: string): Promise<ExternalAuthorItem[]> {
    try {
      const url = `https://api.ipgflip.xyz/user/${ fsid }@DSi`;
      const response = await fetch(url);
      const data = await response.json();
      if (!data.sucess)
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

  async getNoteDetails(note: Flipnote): Promise<ExternalFlipnoteItem[]> {
    try {
      const filename = note.meta.current.filename;
      const url = `https://api.ipgflip.xyz/flipnote/${ filename }`
      const response = await fetch(url);
      const data = await response.json();
      if (!data.sucess)
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