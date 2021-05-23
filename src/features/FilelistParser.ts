/**
 * Flipnote Studio + Flipnote Studio 3D filelist (.lst, .pls) file parser
 * File format specs:
 *  ppm list: https://github.com/Flipnote-Collective/flipnote-studio-docs/wiki/.pls-and-.lst-files
 *  kwz list: https://github.com/Flipnote-Collective/flipnote-studio-3d-docs/wiki/lst-format
 */

import { Path, parsePath } from '../models/Path';

export enum FilelistType {
  Ppm = 0, // DSi filelist (*.pls, dirmemo.lst, dirmemo2.lst)
  Kwz = 1, // 3DS filelist (!!.lst)
};

const XOR_KEY = [
  0xF7, 0x4C, 0x6A, 0x3A, 0xFB, 0x82, 0xA6, 0x37,
  0x6E, 0x11, 0x38, 0xCF, 0xA0, 0xDD, 0x85, 0xC0,
  0xC7, 0x9B, 0xC4, 0xD8, 0xDD, 0x28, 0x8A, 0x87,
  0x53, 0x20, 0xEE, 0xE0, 0x0B, 0xEB, 0x43, 0xA0,
  0xDB, 0x55, 0x0F, 0x75, 0x36, 0x37, 0xEB, 0x35,
  0x6A, 0x34, 0x7F, 0xB5, 0x0F, 0x99, 0xF7, 0xEF,
  0x43, 0x25, 0xCE, 0xA0, 0x29, 0x46, 0xD9, 0xD4,
  0x4D, 0xBB, 0x04, 0x66, 0x68, 0x08, 0xF1, 0xF8,
];

export class FilelistParser {

  public type: FilelistType;
  public bytes: Uint8Array;
  public size: number;
  public list: Path[] = [];

  constructor (type: FilelistType, buffer: ArrayBuffer) {
    this.bytes = new Uint8Array(buffer);
    this.size = this.bytes.length;
    this.type = type;
    this.xorDecrypt();
    this.parseList();
  }

  static async fromFile(type: FilelistType, file: File) {
    const buffer = await file.arrayBuffer();
    return new FilelistParser(type, buffer);
  }

  private xorDecrypt() {
    const { type, bytes, size } = this;
    // DSi list
    if (type === FilelistType.Ppm) {
      for (let i = 0; i < size; i++) {
        bytes[i] = bytes[i] ^ XOR_KEY[i % 64];
      }
    }
    // 3DS list
    // These use almost the same xor key but the last 3 bytes are cut off by mistake, lol
    // They also start with an unencrypted 6-byte header
    else if (type === FilelistType.Kwz) {
      for (let i = 6, j = 0; i < size; i++, j++) {
        bytes[i] = bytes[i] ^ XOR_KEY[j % 61];
      }
    }
  }

  private parseList() {
    const { type, bytes, size } = this;
    let currPath = '';
    // DSi lists use 8-bit text
    if (type === FilelistType.Ppm) {
      for (let i = 0; i < size; i++) {
        const char = bytes[i];
        if (char === 0x0A) {
          this.addPath(currPath); 
          currPath = '';
          continue;
        }
        currPath += String.fromCharCode(char);
      }
    }
    // 3DS lists use 16-bit text and seem to specify a separator char in the header (only ever seen it as a newline, though)
    else if (type === FilelistType.Kwz) {
      const separator = this.readUint16(4);
      for (let i = 6; i < size; i += 2) {
        const char = this.readUint16(i);
        if (char === separator) {
          this.addPath(currPath); 
          currPath = '';
          continue;
        }
        currPath += String.fromCharCode(char);
      }
    }
  }

  private readUint16(offset: number) {
    return this.bytes[offset] | (this.bytes[offset + 1] << 8);
  }

  private addPath(pathStr: string) {
    this.list.push(parsePath(pathStr));
  }
  
}