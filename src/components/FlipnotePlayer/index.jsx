import { Player } from 'flipnote.js';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useStoreState } from 'pullstate';
import { PlayerStore } from '@/store';
import hotkeys from 'hotkeys-js';
import Icon from '@/components/Icon';
import Slider from '@/components/Slider';
import FrameCounter from './FrameCounter';
import SettingsMenu from './SettingsMenu';
import SettingsMenuItem from './SettingsMenuItem';
import '@/styles/components/FlipnotePlayer.scss';

export default function FlipnotePlayer(props) {

  const playerNote = useStoreState(PlayerStore, store => store.note);
  const playerForcePause = useStoreState(PlayerStore, store => store.forcePause);

  const canvasWrapper = useRef(null);
  const mainElement = useRef(null);

  window.mainElement = mainElement;

  const [type, setType] = useState('PPM');
  const [paused, setPaused] = useState(true);
  const [loop, setLoop] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(1);
  const [showFrameCounter, setShowFrameCounter] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState({ 1: true, 2: true, 3: true });
  const [volume, setVolume] = useState(100);

  const togglePlay = () => {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
    setPaused(player.paused);
  }

  const toggleLayer = layerIndex => {
    let isVisible = !layerVisibility[layerIndex];
    player.setLayerVisibility(layerIndex, isVisible);
    setLayerVisibility({...layerVisibility, [layerIndex]: isVisible});
  }

  useLayoutEffect(() => {
    const playerCanvas = document.createElement('canvas');
    window.player = new Player(playerCanvas, 640, 480);
    player.on('progress', progress => { setCurrentProgress(progress) });
    player.on('frame:update', (e, a, b) => { console.log(e, a, b) });
    player.on('*', (e, a, b) => { console.log(e, a, b) });
    player.on('frame:update', frameIndex => { setCurrentFrame(frameIndex) });
    player.on('frame:update', frameIndex => { setCurrentFrame(frameIndex) });
    player.on('playback:end', () => { setPaused(true) });
    player.on('load', () => {
      setType(player.noteFormat);
      setLoop(player.loop);
      setFrameCount(player.frameCount);
    });
    const resizeCanvas = () => {
      const rect = canvasWrapper.current.getBoundingClientRect();
      player.resize(rect.width, rect.width * 0.75);
    }
    resizeCanvas();
    canvasWrapper.current.appendChild(playerCanvas);
    window.addEventListener('resize', resizeCanvas);
    player.openNote(playerNote);

    hotkeys('space, left, a, right, d, shift+left, shift+a, shift+right, shift+d', 'player', (e, handler) => {
      switch (handler.key) {
        case 'space':
          togglePlay();
          break;
        case 'right':
        case 'd':
          if (player.paused) player.nextFrame();
          break;
        case 'left':
        case 'a':
          if (player.paused) player.prevFrame();
          break;
        case 'shift+right':
        case 'shift+d':
          if (player.paused) player.lastFrame();
          break;
        case 'shift+left':
        case 'shift+a':
          if (player.paused) player.firstFrame();
          break;
      }
      return false;
    });
    hotkeys.setScope('player');

    return () => {
      hotkeys.deleteScope('player');
      window.removeEventListener('resize', resizeCanvas);
      player.clearEvents();
      player.closeNote();
      player.destroy();
    };
  }, []);

  useEffect(() => {
    if (playerForcePause) {
      player.pause();
      setPaused(true);
    }
  }, [playerForcePause]);

  useEffect(() => {
    setShowFrameCounter(paused);
  }, [paused]);

  return (
    <div className="Player" ref={mainElement}>
      <div className="Player__canvasFrame">
        <div className="Player__overlay" onClick={(e) => togglePlay()}>
        </div>
        <div className="Player__canvas" ref={canvasWrapper}>
        </div>
        <FrameCounter 
          isVisible={showFrameCounter}
          current={currentFrame + 1}
          total={frameCount}
        />
        <SettingsMenu
          isVisible={showSettingsMenu}
          onHide={e => setShowSettingsMenu(false) }
        >
          <SettingsMenuItem
            label="Loop"
            value={loop}
            onChange={() => { player.loop = !loop; setLoop(!loop); }}
          />
          <SettingsMenuItem
            label="Volume"
            type="slider"
            value={volume}
            onChange={(v) => { player.volume = v / 100; setVolume(v); }}
          />
          <SettingsMenuItem
            label="Show Layer 1"
            value={layerVisibility[1]}
            onChange={() => toggleLayer(1)}
          />
          <SettingsMenuItem
            label="Show Layer 2"
            value={layerVisibility[2]}
            onChange={() => toggleLayer(2)}
          />
          { type === 'KWZ' &&
            <SettingsMenuItem
              label="Show Layer 3"
              value={layerVisibility[3]}
              onChange={() => toggleLayer(3)}
            />
          }
        </SettingsMenu>
      </div>
      <div className="Player__progress">
        <Slider
          className="Player__progressSlider"
          min={0}
          max={100}
          step={.1}
          value={currentProgress}
          onChange={value => { player.progress = value; setCurrentProgress(value)}}
          onBeforeChange={() => { if (!paused) { player.wasPlaying = true; player.pause(); } }}
          onAfterChange={() => { if (player.wasPlaying) { player.wasPlaying = false; player.play(); } }}
        />
      </div>
      <div className="Player__controls">
        <div className="ControlsGroup ControlsGroup--left">
          <Icon icon={paused ? 'play' : 'pause'} onClick={e => { togglePlay() }}></Icon>
          <Icon icon="settings" onClick={e => setShowSettingsMenu(!showSettingsMenu)}/>
        </div>
        <div className="ControlsGroup ControlsGroup--right">
          <Icon icon="firstFrame" disabled={!paused} onClick={e => { if (paused) player.firstFrame()}}/>
          <Icon icon="prevFrame" disabled={!paused} onClick={e => { if (paused) player.prevFrame()}}/>
          <Icon icon="nextFrame" disabled={!paused} onClick={e => { if (paused) player.nextFrame()}}/>
          <Icon icon="lastFrame" disabled={!paused} onClick={(e) => { if (paused) player.lastFrame()}}/>
        </div>
      </div>
    </div>
  );
}