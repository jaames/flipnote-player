import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import type {
  Flipnote
} from 'flipnote.js';

import {
  assert,
} from '@/utils';

export type NoteListContextValue = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
};

type Props = React.PropsWithChildren<{}>;

const NoteListContext = createContext<NoteListContextValue | null>(null);

export const NoteListContextProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const value: NoteListContextValue = {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
  };

  return <NoteListContext.Provider value={value}>{children}</NoteListContext.Provider>;
}

export const useNoteListContext = (): NoteListContextValue => {
  const ctx = useContext(NoteListContext);
  assert(ctx !== null, 'useNoteListContext must be used within NoteListProvider');
  return ctx;
};
