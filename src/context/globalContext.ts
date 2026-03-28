import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
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

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleLoading = useCallback(() => {
    setIsLoading((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isLoading,
      toggleTheme,
      toggleLoading,
    }),
    [theme, isLoading, toggleTheme, toggleLoading],
  );

  return createElement(GlobalContext.Provider, { value }, children);
}

export const useGlobalContext = (): GlobalContextValue => {
  const ctx = useContext(GlobalContext);
  assert(ctx !== null, 'useGlobalContext must be used within GlobalProvider');
  return ctx;
};
