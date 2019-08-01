import { useState } from 'react';
import Switch from '~/components/Switch';

export default function GifPanel({ flipnote }) {

  const [progress, setProgress] = useState(0);
  const [imageFormat, setImageFormat] = useState('gif');
  const [filename, setFilename] = useState(`${ flipnote.meta.current.filename }.zip`);

  function convert(flipnote) {
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
        gifSequence.saveAs(filename);
      });
  }  

  return (
    <div className="GifConverter">
      <div className="FormGroup">
        <div className="FormItem">
          <label htmlFor="format">Image Format</label>
          <select 
            id="format"
            className="Select"
            value={ imageFormat }
            onChange={ e => setImageFormat(event.target.value) }
          >
            <option key="gif" value="gif">GIF</option>
            <option key="png" value="png">PNG</option>
            <option key="jpeg" value="jpeg">JPEG</option>
          </select>
        </div>
      </div>
      <div className="FormGroup">
        <div className="FormItem FormItem--flex3">
          <label htmlFor="filename">Output Filename</label>
          <input 
            id="filename"
            className="Input"
            type="text"
            placeholder="Video Filename"
            value={ filename } 
            onChange={ (e) => { setFilename(e.target.value)} }
          />
        </div>
        <div className="FormItem">
          <div className="Button Button--inline" onClick={ () => { convert(flipnote) } }>Convert</div>
        </div>
      </div>
    </div>
  );
}