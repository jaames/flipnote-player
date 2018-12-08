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
    className: "jsx-2986685540" + " " + "FlipnoteGrid",
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
    styleId: "2986685540",
    css: ".FlipnoteGrid.jsx-2986685540{list-style-type:none;display:grid;grid-template-columns:1fr;grid-gap:$grid-gap;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW1lcy9Eb2N1bWVudHMvd2ViL2xhYnMvZmxpcG5vdGUtcGxheWVyL2NvbXBvbmVudHMvRmxpcG5vdGVHcmlkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFha0IsQUFHZ0MscUJBQ1IsYUFDYSwwQkFDUCxtQkFDckIiLCJmaWxlIjoiL1VzZXJzL2phbWVzL0RvY3VtZW50cy93ZWIvbGFicy9mbGlwbm90ZS1wbGF5ZXIvY29tcG9uZW50cy9GbGlwbm90ZUdyaWQuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZsaXBub3RlVGh1bWIgZnJvbSAnLi9GbGlwbm90ZVRodW1iJztcblxuY29uc3QgRmxpcG5vdGVHcmlkID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcGFnZSwgaXRlbXMsIGl0ZW1zUGVyUGFnZSB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gcGFnZSAqIGl0ZW1zUGVyUGFnZTtcbiAgY29uc3QgZW5kT2Zmc2V0ID0gc3RhcnRPZmZzZXQgKyBpdGVtc1BlclBhZ2U7XG4gIC8vIGNvbnN0IHBhZ2VJdGVtcyA9IGl0ZW1zICYmIGl0ZW1zLnNsaWNlKHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpO1xuXG4gIHJldHVybiAoXG4gICAgPHVsIGNsYXNzTmFtZT1cIkZsaXBub3RlR3JpZFwiPlxuICAgICAgeyAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSAmJiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgIDxGbGlwbm90ZVRodW1iIGtleT17aW5kZXh9IHsuLi5pdGVtfSBvblNlbGVjdD17cHJvcHMub25TZWxlY3R9Lz5cbiAgICAgICkpfVxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAuRmxpcG5vdGVHcmlkIHtcbiAgICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICAgICAgICBncmlkLWdhcDogJGdyaWQtZ2FwO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC91bD5cbiAgKTtcbn1cblxuRmxpcG5vdGVHcmlkLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6IGZ1bmN0aW9uKCl7fSxcbiAgaXRlbXM6IG51bGwsXG4gIHBhZ2U6IDAsXG4gIGl0ZW1zUGVyUGFnZTogMTIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbGlwbm90ZUdyaWQ7Il19 */\n/*@ sourceURL=/Users/james/Documents/web/labs/flipnote-player/components/FlipnoteGrid.jsx */",
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
//# sourceMappingURL=index.js.86545b1d7a4edddc9da1.hot-update.js.map