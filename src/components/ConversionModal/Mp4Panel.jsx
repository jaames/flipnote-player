import { useState } from 'react';
import Switch from '@/components/Switch';
import ProgressMeter from './ProgressMeter';

export default function Mp4Panel({ flipnote }) {

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [videoCompression, setVideoCompression] = useState('fast');
  const [videoScale, setVideoScale] = useState('2');
  const [audioEq, setAudioEq] = useState(true);
  const [filename, setFilename] = useState(`${ flipnote.meta.current.filename }.mp4`);

  function convert(flipnote) {
    import('@/converters/mp4')
      .then(module => {
        const Mp4Converter = module.default;
        return new Mp4Converter();
      })
      .then(mp4 => {
        mp4.onprogress = setProgress;
        mp4.onerror = () => {
          setProgress(0);
          setIsConverting(false);
          setStatus('Error: Could not convert Flipnote to video')
        };
        setStatus('Preparing...');
        setProgress(0);
        setIsConverting(true);
        return mp4.init({
          compression: videoCompression,
          scale: videoScale,
          equalizer: audioEq
        });
      })
      .then(mp4 => {
        setStatus('Converting...');
        return mp4.convert(flipnote);
      })
      .then(mp4 => {
        setIsConverting(false);
        setStatus('Done!');
        mp4.saveAs(filename);
      });
  }

  return (
    <div className="Mp4Converter">
      <p className="Note">
        This feature is highly experimental. Video conversion may not work on certain devices.
      </p>
      <div className="FormGroup">
        <div className="FormItem">
          <label htmlFor="quality">Compression</label>
          <select 
            id="quality"
            className="Select"
            value={ videoCompression } 
            onChange={ e => setVideoCompression(event.target.value) }
          >
            <option key="fast" value="fast">Fast</option>
            <option key="medium" value="medium">Medium</option>
            <option key="slow" value="slow">Slow</option>
          </select>
        </div>
        <div className="FormItem">
          <label htmlFor="scale">Video Scale</label>
          <select 
            id="scale"
            className="Select"
            value={ videoScale }
            onChange={ e => setVideoScale(event.target.value) }
          >
            <option key="1" value="1">1x</option>
            <option key="2" value="2">2x</option>
            <option key="4" value="4">4x</option>
          </select>
        </div>
        <div className="FormItem">
          <label htmlFor="">Enhance Audio</label>
          <Switch on={ audioEq } className="Switch--large" onClick={ e => { setAudioEq(!audioEq) } }></Switch>
        </div>
      </div>
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
      <ProgressMeter isActive={ isConverting } percent={ progress } status={ status }/>
    </div>
  );
}