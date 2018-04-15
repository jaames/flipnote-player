'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var flipnote = _interopDefault(require('flipnote.js'));
var preact = require('preact');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return _get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var flipnotePlayer =
/*#__PURE__*/
function (_flipnote$player) {
  _inherits(flipnotePlayer, _flipnote$player);

  function flipnotePlayer(canvas, params) {
    var _this;

    _classCallCheck(this, flipnotePlayer);

    _this = _possibleConstructorReturn(this, (flipnotePlayer.__proto__ || Object.getPrototypeOf(flipnotePlayer)).call(this, canvas, params.width, params.height));

    _this.canvas.setFilter(params.interpolation);

    _this._linearInterpolation = params.interpolation === "linear";
    _this._layerVisibility = {
      1: true,
      2: true
    };
    return _this;
  }

  _createClass(flipnotePlayer, [{
    key: "close",
    value: function close() {
      _get(flipnotePlayer.prototype.__proto__ || Object.getPrototypeOf(flipnotePlayer.prototype), "close", this).call(this);

      this.emit("unload");
    }
  }, {
    key: "toggleLayer",
    value: function toggleLayer(index) {
      var visible = this._layerVisibility[index] = !this._layerVisibility[index];
      this.canvas.setLayerVisibilty(index, visible ? 1 : 0);
      this.canvas.refresh();
      return visible;
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }

      return this.paused;
    }
  }, {
    key: "toggleInterpolation",
    value: function toggleInterpolation() {
      var linear = this._linearInterpolation = !this._linearInterpolation;
      this.canvas.setFilter(linear ? "linear" : "nearest");
      this.canvas.refresh();
      return linear;
    }
  }, {
    key: "progress",
    get: function get$$1() {
      return 100 / this.frameCount * this.currentFrame;
    },
    set: function set(value) {
      this.currentFrame = this.frameCount * (value / 100);
    }
  }]);

  return flipnotePlayer;
}(flipnote.player);

// import Details from "./details";

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));
    _this.flipnote = new flipnotePlayer(document.createElement("canvas"), {
      width: 512,
      height: 384,
      interpolation: "linear"
    });
    window.app = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {// this.flipnote.open("./samples/keke.ppm");
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("main", {
        "class": "app"
      }, React.createElement("div", {
        "class": "wrap"
      }, React.createElement("div", {
        "class": "modal"
      }, "hi")));
    }
  }]);

  return App;
}(preact.Component);

preact.render(React.createElement(App, null), document.getElementById("root"));
