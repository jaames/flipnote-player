/**
 * IpgFlipClient
 * API client for https://ipgflip.xyz, a fan-built online service for the DSiWare version of Flipnote Studio
 * The only Flipnote service to have all the API endpoints I want!?
 */

import { Flipnote, parseSource } from 'flipnote.js';
import { ClientType, ExternalServiceClient, ExternalFlipnoteItem, ExternalAuthorItem } from '../../models/ExternalServiceTypes';
import { stringCompileTemplate } from '../../utils';

const URL_REGEX = /https?:\/\/(?:www.)?ipgflip.xyz\/watch\/([0-9A-F]{6}_[0-9A-F]{13}_[0-9]{3})/;
const URL_TEMPLATE_PPM = stringCompileTemplate`https://content.ipgflip.xyz/movie/${0}.ppm`;
const URL_TEMPLATE_MEMO = stringCompileTemplate`https://api.ipgflip.xyz/flipnote/${0}`;
const URL_TEMPLATE_USER = stringCompileTemplate`https://api.ipgflip.xyz/user/${0}@DSi`;

export class IpgFlipClient implements ExternalServiceClient {

  public service = ClientType.IpgFlip;

  public testNoteUrlMatch(url: string) { 
    return URL_REGEX.test(url);
  }

  async getNoteFromUrl(url: string) { 
    if (!this.testNoteUrlMatch(url)) {
      return null;
    }
    try {
      const noteSrc = url.replace(URL_REGEX, (match, filename) => URL_TEMPLATE_PPM([filename]));
      return await parseSource(noteSrc);
    }
    catch (e) {
      return null;
    }
  }

  async getAuthorDetails(fsid: string): Promise<ExternalAuthorItem[]> {
    try {
      const url = URL_TEMPLATE_USER([fsid]);
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
      const url = URL_TEMPLATE_MEMO([filename]);
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