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
    className: "jsx-1648568141" + " " + "FlipnoteThumb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      "background-image": "url(".concat(props.thumb, ")")
    },
    className: "jsx-1648568141" + " " + "FlipnoteThumb__image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    },
    __self: this
  }, !props.src && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-1648568141" + " " + "FlipnoteThumb__loader",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), props.ext && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "jsx-1648568141" + " " + "FlipnoteThumb__type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, props.ext == "ppm" ? "DSi" : "3DS")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-1648568141" + " " + "FlipnoteThumb__info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "jsx-1648568141" + " " + "FlipnoteThumb__author",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, props.author)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "1648568141",
    css: ".FlipnoteThumb.jsx-1648568141{list-style-type:none;display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:$grid-gap;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW1lcy9Eb2N1bWVudHMvd2ViL2xhYnMvZmxpcG5vdGUtcGxheWVyL2NvbXBvbmVudHMvRmxpcG5vdGVUaHVtYi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZWdCLEFBRzhCLHFCQUNSLGFBQ3FCLGtDQUNmLG1CQUNyQiIsImZpbGUiOiIvVXNlcnMvamFtZXMvRG9jdW1lbnRzL3dlYi9sYWJzL2ZsaXBub3RlLXBsYXllci9jb21wb25lbnRzL0ZsaXBub3RlVGh1bWIuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmxpcG5vdGVUaHVtYiA9IChwcm9wcykgPT4gKFxuICA8bGkgY2xhc3NOYW1lPVwiRmxpcG5vdGVUaHVtYlwiIG9uQ2xpY2s9eyhlKSA9PiB7IHByb3BzLm9uU2VsZWN0KHByb3BzLnNyYykgfX0+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJGbGlwbm90ZVRodW1iX19pbWFnZVwiIHN0eWxlPXt7IFwiYmFja2dyb3VuZC1pbWFnZVwiOiBgdXJsKCR7IHByb3BzLnRodW1iIH0pYCB9fT5cbiAgICAgIHshcHJvcHMuc3JjICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRmxpcG5vdGVUaHVtYl9fbG9hZGVyXCI+XG4gICAgICAgICAgey8qIDxJY29uIGljb249XCJsb2FkZXJcIi8+ICovfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICAgIHtwcm9wcy5leHQgJiZcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiRmxpcG5vdGVUaHVtYl9fdHlwZVwiPnsgcHJvcHMuZXh0ID09IFwicHBtXCIgPyBcIkRTaVwiIDogXCIzRFNcIiB9PC9zcGFuPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiRmxpcG5vdGVUaHVtYl9faW5mb1wiPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiRmxpcG5vdGVUaHVtYl9fYXV0aG9yXCI+eyBwcm9wcy5hdXRob3IgfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuRmxpcG5vdGVUaHVtYiB7XG4gICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgICAgICAgZ3JpZC1nYXA6ICRncmlkLWdhcDtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvbGk+XG4pXG5cbkZsaXBub3RlVGh1bWIuZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdDogZnVuY3Rpb24oKXt9LFxuICBzcmM6IG51bGwsXG4gIHRodW1iOiBcIlwiLFxuICBhdXRob3I6IFwiXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmxpcG5vdGVUaHVtYjtcblxuIl19 */\n/*@ sourceURL=/Users/james/Documents/web/labs/flipnote-player/components/FlipnoteThumb.jsx */",
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
//# sourceMappingURL=index.js.0b6125f50244e9b77bdb.hot-update.js.map