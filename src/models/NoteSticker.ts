export enum NoteSticker {
  Heart,
  Crown,
  Music,
  Skull
};

export function getStickerFromPlaylistName(name: string) {
  switch (name) {
    case 'mark0': return NoteSticker.Heart;
    case 'mark1': return NoteSticker.Crown;
    case 'mark2': return NoteSticker.Music;
    case 'mark3': return NoteSticker.Skull;
  }
}