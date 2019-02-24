import Logo from '../assets/svg/logo.svg';
import ThemeToggle from './ThemeToggle';
import '~/assets/styles/components/Header.scss';

export default (props) => (
  <header className="Header">
    <div className="Header__group Header__group--left">
      <a href="/">
        <Logo className="Header__logo"/>
      </a>
      <a href="/" className="Header__title">
        <h1>Flipnote Player</h1>
        <h2 className="Header__subtitle">Version {process.env.__VERSION__}</h2>
      </a>
    </div>
    <div className="Header__group Header__group--right">
      <ThemeToggle/>
    </div>
  </header>
);