import flipnote from "flipnote.js";

export default class flipnotePlayer extends flipnote.player {
  constructor(canvas, params) {
    super(canvas, params.width, params.height);
    this.canvas.setFilter(params.interpolation);
    this._linearInterpolation = params.interpolation === "linear";
    this._layerVisibility = {
      1: true,
      2: true
    };
  }

  get progress() {
    return (100 / this.frameCount) * this.currentFrame; 
  }

  set progress(value) {
    this.currentFrame = this.frameCount * (value / 100);
  }

  close() {
    super.close();
    this.emit("unload");
  }

  toggleLayer(index) {
    var visible = this._layerVisibility[index] = !this._layerVisibility[index];
    this.canvas.setLayerVisibilty(index, visible ? 1 : 0);
    this.canvas.refresh();
    return visible;
  }

  togglePlay() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
    return this.paused;
  }

  toggleInterpolation() {
    var linear = this._linearInterpolation = !this._linearInterpolation;
    this.canvas.setFilter(linear ? "linear" : "nearest");
    this.canvas.refresh();
    return linear;
  }
}