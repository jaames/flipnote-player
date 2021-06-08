/**
 * ExternalServices
 * Core interface for interacting with all external service clients
 * Used for detecting if a Flipnote has been uploaded to one of the mainsteam Flipnote fan services,
 * For supporting servicces it can also grab Flipnote files from just their public web URL
 */

import { Flipnote } from 'flipnote.js';
import { ExternalService} from '../models/ExternalServiceTypes';

import { SudomemoClient } from './clients/SudomemoClient';
import { KaeruGalleryClient } from './clients/KaeruGalleryClient';
import { IpgFlipClient } from './clients/IpgFlipClient';
import { KaeruDsiLibraryClient } from './clients/KaeruDsiLibraryClient';

export class ExternalServiceClient {

  private clients: ExternalService[] = [
    new SudomemoClient(),
    new KaeruGalleryClient(),
    new IpgFlipClient(),
    new KaeruDsiLibraryClient(),
  ];

  async getNoteFromUrl(url: string) {
    for (let client of this.clients) {
      if (client.testNoteUrlMatch(url)) {
        const note = await client.getNoteFromUrl(url);
        if (note !== null) return note;
      }
    }
    return null;
  }

  async getNoteDetails(note: Flipnote) {
    const noteDetails = await Promise.all(this.clients.map(client => client.getNoteDetails(note)));
    return noteDetails.flat();
  }

  async getAuthorDetails(fsid: string) {
    const authorDetails = await Promise.all(this.clients.map(client => client.getAuthorDetails(fsid)));
    return authorDetails.flat();
  }

}