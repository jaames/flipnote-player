import { useStoreState } from 'pullstate';
import { PlayerStore } from '~/store';
import Modal from './Modal';

function convertGif(flipnote) {
  import('~/converters/gif').then(module => {
    const GifConverter = module.default;
    const gif = new GifConverter();
    gif.convert(flipnote);
    gif.saveAs(`${flipnote.meta.current.filename}.gif`);
  });
}

function convertGifSequence(flipnote) {
  import('~/converters/gifSequence').then(module => {
    const GifSequenceConverter = module.default;
    const gif = new GifSequenceConverter();
    gif.convert(flipnote);
    gif.saveAs(`${flipnote.meta.current.filename}.zip`);
  });
}

export default function ConversionModal({ isVisible, onHide }) {

  const playerNote = useStoreState(PlayerStore, store => store.note);

  return (
    <Modal 
      title="Convert"
      className="ConversionModal"
      isVisible={ isVisible }
      isBackdropVisible={ true }
      onHide={ onHide }
    >
      <div>
      <div className="Button Button--inline" onClick={ () => { convertGif(playerNote) } }>Convert GIF</div>
      <div className="Button Button--inline" onClick={ () => { convertGifSequence(playerNote) } }>Convert GIF Sequence</div>
      </div>
    </Modal>
  );
}