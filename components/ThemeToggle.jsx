import { useStoreState } from 'pullstate';
import { UIStore } from '~/store';
import Switch from '~/components/Switch';

export default (props) => {
  const isDarkMode = useStoreState(UIStore, s => s.isDarkMode);

  return (
    <div className="ThemeToggle">
      <Switch on={ !isDarkMode } onClick={ () => UIStore.update(s => {s.isDarkMode = !isDarkMode}) }/>
    </div>
  );
}