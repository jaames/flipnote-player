export enum SortOrder {
  Desc,
  Asc
}

export type SortType = 'filename' | 'authorName' | 'timestamp';

export interface SortOptions {
  order?: SortOrder;
  sortType?: SortType;
}