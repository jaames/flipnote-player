import { useStoreState } from 'pullstate';
import { UIStore } from '~/store';
import { storage as localstorage } from '~/utils';
import Switch from '~/components/Switch';

export default (props) => {
  const isDarkMode = useStoreState(UIStore, s => s.isDarkMode);
  const toggleDarkMode = () => {
    localstorage.set('theme', !isDarkMode ? 'dark' : 'light');
    UIStore.update(s => {s.isDarkMode = !isDarkMode});
  }

  return (
    <div className="ThemeToggle">
      <Switch on={ !isDarkMode } onClick={ toggleDarkMode }/>
    </div>
  );
}