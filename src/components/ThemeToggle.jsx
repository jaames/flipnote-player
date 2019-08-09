import { useStoreState } from 'pullstate';
import { GlobalStore } from '@/store';
import { storage as localstorage } from '@/utils';
import '@/styles/components/ThemeToggle.scss';

export default (props) => {
  const isDarkMode = useStoreState(GlobalStore, s => s.isDarkMode);
  const toggleDarkMode = () => {
    localstorage.set('theme', !isDarkMode ? 'dark' : 'light');
    GlobalStore.update(s => {s.isDarkMode = !isDarkMode});
  }

  return (
    <div className={`ThemeToggle ${isDarkMode ? 'ThemeToggle--theme-is-dark' : 'ThemeToggle--theme-is-light'}`} onClick={ toggleDarkMode }>
      <div className="ThemeToggle__circle ThemeToggle__circle--light"></div>
      <div className="ThemeToggle__circle ThemeToggle__circle--dark"></div>
    </div>
  );
}