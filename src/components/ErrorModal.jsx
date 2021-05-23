import { useStoreState } from './_ConversionModal/node_modules/pullstate';
import { GlobalStore } from './_ConversionModal/node_modules/@/store';
import Modal from './_ConversionModal/node_modules/@/components/Modal';

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
        <p>
          This Flipnote could not be loaded.
        </p>
        <p>
          If this seems to be a bug, please open an issue thread on this <a href="https://github.com/jaames/flipnote-player/issues" target="blank">project's GitHub page</a>, or contact me on <a href="https://twitter.com/rakujira" target="blank">Twitter</a>.
        </p>
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