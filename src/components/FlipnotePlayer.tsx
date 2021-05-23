import React, { createRef, Component } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Player, PlayerEvent } from 'flipnote.js';

interface Props {};

interface State {
  isPlaying: boolean
};

export class FlipnotePlayer extends Component<Props, State> {

  static contextType = PlayerContext;

  public state: State = {
    isPlaying: false
  };

  public playerContainer = createRef<HTMLDivElement>();
  public playerCanvas = document.createElement('canvas');
  public player = new Player(this.playerCanvas, 640, 480);

  constructor(props: Props) {
    super(props);
    const player = this.player;
    player.on(PlayerEvent.Play, () => {
      this.setState({ isPlaying: true });
    });
    player.on(PlayerEvent.Pause, () => {
      this.setState({ isPlaying: false });
    });
  }

  componentDidMount() {
    const el = this.playerContainer.current;
    el?.appendChild(this.playerCanvas);
    if (this.context.note) {
      this.player.openNote(this.context.note);
    }
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    const props = this.props;
    const state = this.state;
    return (
      <div className="FlipnotePlayer">
        <div className="PlayerWrapper" ref={ this.playerContainer }></div>
        <div onClick={ this.togglePlay }>{ state.isPlaying ? 'pause' : 'play' }</div>
        <div onClick={ this.nextFrame }> next</div>
      </div>
    );
  }

  togglePlay = () => {
    this.player.togglePlay();
  }

  nextFrame = () => {
    this.player.nextFrame();
  }

}