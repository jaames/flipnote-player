/**
 * SudomemoClient
 * API client for www.sudomemo.net, a fan-built online service for the DSiWare version of Flipnote Studio
 * Sudomemo doesn't really have a real API, they do at least support oEmbed for Flipnotes though
 */

import { Flipnote, FlipnoteFormat } from 'flipnote.js';
import { ClientType, ExternalService, ExternalFlipnoteItem, ExternalAuthorItem } from '../../models/ExternalServiceTypes';
import { stringCompileTemplate } from '../../utils';
import sudomemoIcon from '../../assets/svg/sudomemo_fox.svg';

const URL_TEMPLATE_MEMO = stringCompileTemplate`https://www.sudomemo.net/watch/${0}`;
const URL_TEMPLATE_EMBED = stringCompileTemplate`https://www.sudomemo.net/oembed?url=${0}&format=json`;

export class SudomemoClient implements ExternalService {

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
      // Sudomemo only hosts PPMs
      if (note.format !== FlipnoteFormat.PPM)
        throw '';
      // Do oembed fetch
      const filename = note.meta.current.filename;
      const url = URL_TEMPLATE_MEMO([filename]);
      const oEmbedUrl = URL_TEMPLATE_EMBED([url]);
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
    
      return [
        {
          service: this.service,
          iconUrl: sudomemoIcon,
          url
        }
      ];
    }
    catch (e) {
      return [];
    }
  }
}