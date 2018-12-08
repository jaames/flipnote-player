module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/FlipnoteGrid.jsx":
/*!*************************************!*\
  !*** ./components/FlipnoteGrid.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FlipnoteThumb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FlipnoteThumb */ "./components/FlipnoteThumb.jsx");
var _jsxFileName = "/Users/james/Documents/web/labs/flipnote-player/components/FlipnoteGrid.jsx";



function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var FlipnoteGrid = function FlipnoteGrid(props) {
  var page = props.page,
      items = props.items,
      itemsPerPage = props.itemsPerPage;
  var startOffset = page * itemsPerPage;
  var endOffset = startOffset + itemsPerPage; // const pageItems = items && items.slice(startOffset, endOffset);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "jsx-3199712516" + " " + "FlipnoteGrid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, items && items.length && items.map(function (item, index) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FlipnoteThumb__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      key: index
    }, item, {
      onSelect: props.onSelect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    }));
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3199712516",
    css: ".FlipnoteGrid.jsx-3199712516{list-style-type:none;display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:24px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW1lcy9Eb2N1bWVudHMvd2ViL2xhYnMvZmxpcG5vdGUtcGxheWVyL2NvbXBvbmVudHMvRmxpcG5vdGVHcmlkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFha0IsQUFHZ0MscUJBQ1IsYUFDcUIsa0NBQ3BCLGNBQ2hCIiwiZmlsZSI6Ii9Vc2Vycy9qYW1lcy9Eb2N1bWVudHMvd2ViL2xhYnMvZmxpcG5vdGUtcGxheWVyL2NvbXBvbmVudHMvRmxpcG5vdGVHcmlkLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGbGlwbm90ZVRodW1iIGZyb20gJy4vRmxpcG5vdGVUaHVtYic7XG5cbmNvbnN0IEZsaXBub3RlR3JpZCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHBhZ2UsIGl0ZW1zLCBpdGVtc1BlclBhZ2UgfSA9IHByb3BzO1xuICBjb25zdCBzdGFydE9mZnNldCA9IHBhZ2UgKiBpdGVtc1BlclBhZ2U7XG4gIGNvbnN0IGVuZE9mZnNldCA9IHN0YXJ0T2Zmc2V0ICsgaXRlbXNQZXJQYWdlO1xuICAvLyBjb25zdCBwYWdlSXRlbXMgPSBpdGVtcyAmJiBpdGVtcy5zbGljZShzdGFydE9mZnNldCwgZW5kT2Zmc2V0KTtcblxuICByZXR1cm4gKFxuICAgIDx1bCBjbGFzc05hbWU9XCJGbGlwbm90ZUdyaWRcIj5cbiAgICAgIHsgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCkgJiYgaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICA8RmxpcG5vdGVUaHVtYiBrZXk9e2luZGV4fSB7Li4uaXRlbX0gb25TZWxlY3Q9e3Byb3BzLm9uU2VsZWN0fS8+XG4gICAgICApKX1cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLkZsaXBub3RlR3JpZCB7XG4gICAgICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgICAgICAgICBncmlkLWdhcDogMjRweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvdWw+XG4gICk7XG59XG5cbkZsaXBub3RlR3JpZC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiBmdW5jdGlvbigpe30sXG4gIGl0ZW1zOiBudWxsLFxuICBwYWdlOiAwLFxuICBpdGVtc1BlclBhZ2U6IDEyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRmxpcG5vdGVHcmlkOyJdfQ== */\n/*@ sourceURL=/Users/james/Documents/web/labs/flipnote-player/components/FlipnoteGrid.jsx */",
    __self: this
  }));
};

FlipnoteGrid.defaultProps = {
  onSelect: function onSelect() {},
  items: null,
  page: 0,
  itemsPerPage: 12
};
/* harmony default export */ __webpack_exports__["default"] = (FlipnoteGrid);

/***/ }),

/***/ "./components/FlipnoteThumb.jsx":
/*!**************************************!*\
  !*** ./components/FlipnoteThumb.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/james/Documents/web/labs/flipnote-player/components/FlipnoteThumb.jsx";



var FlipnoteThumb = function FlipnoteThumb(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    onClick: function onClick(e) {
      props.onSelect(props.src);
    },
    className: "jsx-1551701140" + " " + "FlipnoteThumb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      "background-image": "url(".concat(props.thumb, ")")
    },
    className: "jsx-1551701140" + " " + "FlipnoteThumb__image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    },
    __self: this
  }, !props.src && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-1551701140" + " " + "FlipnoteThumb__loader",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), props.ext && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "jsx-1551701140" + " " + "FlipnoteThumb__type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, props.ext == "ppm" ? "DSi" : "3DS")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-1551701140" + " " + "FlipnoteThumb__info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "jsx-1551701140" + " " + "FlipnoteThumb__author",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, props.author)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "1551701140",
    css: ".FlipnoteThumb.jsx-1551701140{padding:8px;position:relative;}.FlipnoteThumb__image.jsx-1551701140{cursor:pointer;background-repeat:no-repeat;background-size:100%;padding-bottom:75%;overflow:hidden;width:100%;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW1lcy9Eb2N1bWVudHMvd2ViL2xhYnMvZmxpcG5vdGUtcGxheWVyL2NvbXBvbmVudHMvRmxpcG5vdGVUaHVtYi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZWdCLEFBR3FCLEFBS0csWUFKRyxHQUtVLGVBSjlCLGFBS3VCLHFCQUVGLG1CQUNILGdCQUNMLFdBQ2IiLCJmaWxlIjoiL1VzZXJzL2phbWVzL0RvY3VtZW50cy93ZWIvbGFicy9mbGlwbm90ZS1wbGF5ZXIvY29tcG9uZW50cy9GbGlwbm90ZVRodW1iLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEZsaXBub3RlVGh1bWIgPSAocHJvcHMpID0+IChcbiAgPGxpIGNsYXNzTmFtZT1cIkZsaXBub3RlVGh1bWJcIiBvbkNsaWNrPXsoZSkgPT4geyBwcm9wcy5vblNlbGVjdChwcm9wcy5zcmMpIH19PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiRmxpcG5vdGVUaHVtYl9faW1hZ2VcIiBzdHlsZT17eyBcImJhY2tncm91bmQtaW1hZ2VcIjogYHVybCgkeyBwcm9wcy50aHVtYiB9KWAgfX0+XG4gICAgICB7IXByb3BzLnNyYyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkZsaXBub3RlVGh1bWJfX2xvYWRlclwiPlxuICAgICAgICAgIHsvKiA8SWNvbiBpY29uPVwibG9hZGVyXCIvPiAqL31cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG4gICAgICB7cHJvcHMuZXh0ICYmXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIkZsaXBub3RlVGh1bWJfX3R5cGVcIj57IHByb3BzLmV4dCA9PSBcInBwbVwiID8gXCJEU2lcIiA6IFwiM0RTXCIgfTwvc3Bhbj5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkZsaXBub3RlVGh1bWJfX2luZm9cIj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIkZsaXBub3RlVGh1bWJfX2F1dGhvclwiPnsgcHJvcHMuYXV0aG9yIH08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLkZsaXBub3RlVGh1bWIge1xuICAgICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLkZsaXBub3RlVGh1bWJfX2ltYWdlIHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyOyAgXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcbiAgICAgICAgLy8gcHJlc2VydmUgYXNwZWN0IHJhdGlvICg0OjMpXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiA3NSU7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9saT5cbilcblxuRmxpcG5vdGVUaHVtYi5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiBmdW5jdGlvbigpe30sXG4gIHNyYzogbnVsbCxcbiAgdGh1bWI6IFwiXCIsXG4gIGF1dGhvcjogXCJcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBGbGlwbm90ZVRodW1iO1xuXG4iXX0= */\n/*@ sourceURL=/Users/james/Documents/web/labs/flipnote-player/components/FlipnoteThumb.jsx */",
    __self: this
  }));
};

FlipnoteThumb.defaultProps = {
  onSelect: function onSelect() {},
  src: null,
  thumb: "",
  author: ""
};
/* harmony default export */ __webpack_exports__["default"] = (FlipnoteThumb);

/***/ }),

/***/ "./components/Layout.jsx":
/*!*******************************!*\
  !*** ./components/Layout.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/styles/main.scss */ "./static/styles/main.scss");
/* harmony import */ var _static_styles_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_static_styles_main_scss__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/james/Documents/web/labs/flipnote-player/components/Layout.jsx";


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "app",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menuBar menuBar--upper wrap wrap--wide",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menuBar__group menuBar__group--left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/",
    className: "menuBar__title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, "Flipnote Player"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "menuBar__subTitle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "Version ", process.env.VERSION))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menuBar__group menuBar__group--right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wrap wrap--wide",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, props.children), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menuBar menuBar--lower wrap wrap--wide",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menuBar__group menuBar__group--right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "Created by ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/jaames",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "James Daniel"), " (Source code on ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/jaames/flipnote-player",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "GitHub"), ")"))));
});

/***/ }),

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.jsx");
/* harmony import */ var _components_FlipnoteGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FlipnoteGrid */ "./components/FlipnoteGrid.jsx");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "/Users/james/Documents/web/labs/flipnote-player/pages/index.jsx";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Index = function Index(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "fileSelect modal",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "fileSelect__side modal__region modal__region--left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "region__title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, "Upload Flipnote")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "region__body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "fileSelect__main modal__region modal__region--right modal__region--gray",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "region__title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, "Sample Flipnotes")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "region__body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_FlipnoteGrid__WEBPACK_IMPORTED_MODULE_3__["default"], {
    items: props.memos // page={state.page}
    // onSelect={src => this.loadFlipnote(src, true)}
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  })))));
};

Index.getInitialProps =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(context) {
    var res, data;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default()("http://localhost:3000/static/manifest.json");

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            data = _context.sent;
            return _context.abrupt("return", {
              memos: data['items']
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./static/styles/main.scss":
/*!*********************************!*\
  !*** ./static/styles/main.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/index.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/index.jsx */"./pages/index.jsx");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map