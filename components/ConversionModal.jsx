import { useStoreState } from 'pullstate';
import { PlayerStore } from '~/store';
import Modal from './Modal';

function convertToGif(flipnote) {
  import('~/converters/gif')
    .then(module => {
      const GifConverter = module.default;
      return new GifConverter();
    })
    .then(gif => {
      return gif.init();
    })
    .then(gif => {
      return gif.convert(flipnote);
    })
    .then(gif => {
      gif.saveAs(`${ flipnote.meta.current.filename }.gif`);
    });
}

function convertToGifSequence(flipnote) {
  import('~/converters/gifSequence')
    .then(module => {
      const GifSequenceConverter = module.default;
      return new GifSequenceConverter();
    })
    .then(gifSequence => {
      return gifSequence.init();
    })
    .then(gifSequence => {
      return gifSequence.convert(flipnote);
    })
    .then(gifSequence => {
      gifSequence.saveAs(`${ flipnote.meta.current.filename }.zip`);
    });
}

function convertToMp4(flipnote) {
  import('~/converters/mp4')
    .then(module => {
      const Mp4Converter = module.default;
      return new Mp4Converter();
    })
    .then(mp4 => {
      return mp4.init();
    })
    .then(mp4 => {
      return mp4.convert(flipnote);
    })
    .then(mp4 => {
      mp4.saveAs(`${ flipnote.meta.current.filename }.mp4`);
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
      <div className="Button Button--inline" onClick={ () => { convertToGif(playerNote) } }>Convert GIF</div>
      <div className="Button Button--inline" onClick={ () => { convertToGifSequence(playerNote) } }>Convert GIF Sequence</div>
      <div className="Button Button--inline" onClick={ () => { convertToMp4(playerNote) } }>Convert MP4</div>
      </div>
    </Modal>
  );
}