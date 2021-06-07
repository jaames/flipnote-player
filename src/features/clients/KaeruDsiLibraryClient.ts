/**
 * KaeruDsiLibraryClient
 * API client for https://gallery.kaeru.world/dsi, a frontend for the small Internet Archive backup of some DSi Library Flipnotes
 * Doesn't have an API for now, so this is just stubbed for later
 */

import { Flipnote, parseSource } from 'flipnote.js';
import { ClientType, ExternalServiceClient, ExternalFlipnoteItem, ExternalAuthorItem } from '../../models/ExternalServiceTypes';

export class KaeruDsiLibraryClient implements ExternalServiceClient {

  public service = ClientType.KaeruDsiLibrary;

  public testNoteUrlMatch(url: string) {
    return false;
  }

  async getNoteFromUrl(url: string) {
    return null;
  }

  async getAuthorDetails(fsid: string): Promise<ExternalAuthorItem[]> {
    return [];
  }

  async getNoteDetails(note: Flipnote): Promise<ExternalFlipnoteItem[]> {
    return [];
  }
}