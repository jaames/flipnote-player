webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/FlipnoteGrid.jsx":
/*!*************************************!*\
  !*** ./components/FlipnoteGrid.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
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

/***/ })

})
//# sourceMappingURL=index.js.19887bfea3ffc85150bd.hot-update.js.map