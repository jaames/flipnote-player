import { useStoreState } from 'pullstate';
import { GlobalStore } from '~/store';
import Modal from './Modal';

export default function ErrorModal() {
  const hasError = useStoreState(GlobalStore, s => s.hasError);
  const errorType = useStoreState(GlobalStore, s => s.errorType);
  const errorData = useStoreState(GlobalStore, s => s.errorData);
  const closeModal = () => {GlobalStore.update((store) => {
    store.hasError = false;
  })}

  if (errorType === 'FLIPNOTE_COULD_NOT_BE_LOADED') {
    var content = (
      <div>
        <div className="ErrorModal__errorFile">
          Download error file
        </div>
      </div>
    );
  } else {
    var content = ''
  }

  return (
    <Modal 
      title="Error"
      className="ErrorModal"
      isVisible={ hasError }
      isBackdropVisible={ true }
      onHide={ closeModal }
    >
      { content }
    </Modal>
  );
}