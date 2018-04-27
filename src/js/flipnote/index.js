import flipnote from "flipnote.js";

export default class flipnotePlayer extends flipnote.player {
  constructor(canvas, params) {
    super(canvas, params.width, params.height);
    if (params.className) {
      this.canvas.el.classList.add(params.className);
    }
    this.canvas.setFilter(params.interpolation);
    this._linearInterpolation = params.interpolation === "linear";
    this._layerVisibility = {
      1: true,
      2: true
    };
  }

  get progress() {
    return (100 / this.frameCount) * (this.currentFrame + 1); 
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
    this.setLayerVisibilty(visible);
    return visible;
  }

  setLayerVisibilty(index, value) {
    this._layerVisibility = value;
    this.canvas.setLayerVisibilty(index, value ? 1 : 0);
    this.canvas.refresh();
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
    this.setInterpolation(linear ? "linear" : "nearest");
    return linear;
  }

  setInterpolation(filter) {
    this.canvas.setFilter(filter);
    this.canvas.refresh();
  }
}