import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  assert,
} from '@/utils';

export type Theme = 'light' | 'dark';

export type GlobalContextValue = {
  theme: Theme;
  isLoading: boolean;
  toggleTheme: () => void;
  toggleLoading: () => void;
};

type Props = React.PropsWithChildren<{}>;

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleLoading = useCallback(() => {
    setIsLoading((prev) => !prev);
  }, []);

  const value: GlobalContextValue = {
    theme,
    isLoading,
    toggleTheme,
    toggleLoading,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export const useGlobalContext = (): GlobalContextValue => {
  const ctx = useContext(GlobalContext);
  assert(ctx !== null, 'useGlobalContext must be used within GlobalProvider');
  return ctx;
};
