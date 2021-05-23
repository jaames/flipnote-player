import React from 'react';

import { GlobalContext } from '../context/GlobalContext';
import { ReactComponent as Spinner } from '../assets/svg/loader.svg';
import styles from '../styles/Header.module.scss';

export const Header: React.FunctionComponent = () => (
  <GlobalContext.Consumer>
    {context => (
      <header className={ styles.Root }>
        <div className={ `${styles.Group} ${styles.GroupLeft }` }>
          <h3>flipnote.website</h3>
          {context.isLoaderVisible && (
            <Spinner className="Icon Icon--spinner"/>
          )}
        </div>
        <div className={ `${styles.Group} ${styles.GroupRight }` }>
          <span>theme: { context.theme } </span>
          <span onClick={ () => context.toggleTheme() }> toggle theme </span>
        </div>
      </header>
    )}
  </GlobalContext.Consumer>
);