import { useState } from 'react';
import Switch from '~/components/Switch';

export default function GifPanel({ flipnote }) {

  const [filename, setFilename] = useState(`${ flipnote.meta.current.filename }.gif`);

  function convert(flipnote) {
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

  return (
    <div className="GifConverter">
      <div className="FormGroup">
        <div className="FormItem FormItem--flex3">
          <label htmlFor="filename">Output Filename</label>
          <input 
            className="Input"
            id="filename"
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