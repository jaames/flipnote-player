webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/FlipnoteThumb.jsx":
/*!**************************************!*\
  !*** ./components/FlipnoteThumb.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
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

/***/ })

})
//# sourceMappingURL=index.js.c6298e4e8bdb9780c753.hot-update.js.map