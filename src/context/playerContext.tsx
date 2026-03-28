import {
  createContext,
  useContext,
  useState,
} from 'react';

import type {
  Flipnote
} from 'flipnote.js';

import {
  assert,
} from '@/utils';

export type PlayerContextValue = {
  note: Flipnote | null;
  hasNote: boolean;
  isLoading: boolean;
  isSample: boolean;
};

type Props = React.PropsWithChildren<{}>;

const PlayerContext = createContext<PlayerContextValue | null>(null);

export const PlayerContextProvider = ({ children }: Props) => {
  const [note, setNote] = useState<Flipnote | null>(null);
  const [hasNote, setHasNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSample, setIsSample] = useState(false);

  const value: PlayerContextValue = {
    note,
    hasNote,
    isLoading,
    isSample,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayerContext = (): PlayerContextValue => {
  const ctx = useContext(PlayerContext);
  assert(ctx !== null, 'usePlayerContext must be used within PlayerProvider');
  return ctx;
};
