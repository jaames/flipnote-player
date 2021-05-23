import React, { createContext } from 'react';

type ThemeType = 'dark' | 'light';

interface Props {}

interface State {
  // Global UI theme
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  // Show loading spinner in header
  isLoaderVisible: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const GlobalContext = createContext<State>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  isLoaderVisible: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export class GlobalContextProvider extends React.Component<Props, State> {

  setTheme = (theme: ThemeType) => {
    this.setState({ theme });
  }

  toggleTheme = () => {
    if (this.state.theme === 'dark') {
      this.setTheme('light');
    }
    else {
      this.setTheme('dark');
    }
  }

  showLoader = () => {
    this.setState({ isLoaderVisible : true });
  }

  hideLoader = () => {
    this.setState({ isLoaderVisible : false });
  }

  state: State = {
    theme: 'dark',
    setTheme: this.setTheme,
    toggleTheme: this.toggleTheme,
    isLoaderVisible: false,
    startLoading: this.showLoader,
    stopLoading: this.hideLoader,
  };

  render() {
    return (
      <GlobalContext.Provider value={ this.state }>
        { this.props.children }
      </GlobalContext.Provider>
    );
  }

}