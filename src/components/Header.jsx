import { useStoreState } from 'pullstate';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { GlobalStore } from '@/store';
import ThemeToggle from '@/components/ThemeToggle';
import Icon from '@/components/Icon';
import Logo from '@/svg/logo.svg?react';
import '@/styles/components/Header.scss';

export default () => {
  const isLoading = useStoreState(GlobalStore, s => s.isLoading);

  return (
    <header className="Header">
      <div className="Header__group Header__group--left">
        <Link to="/">
          <Logo className="Header__logo"/>
        </Link>
        <Link to="/" className="Header__title">
          <h1>Flipnote Player</h1>
          <h2 className="Header__subtitle">Version { __VERSION__ }</h2>
        </Link>
        <CSSTransition
          in={ isLoading }
          timeout={200}
          unmountOnExit
        >
          <Icon className="Header__loadIndicator" icon="loader" spin={ true }/>
        </CSSTransition>
      </div>
      <div className="Header__group Header__group--right">
        <ThemeToggle/>
      </div>
    </header>
  )
}