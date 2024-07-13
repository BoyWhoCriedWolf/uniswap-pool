'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../Button/index.cjs');
var d3 = require('d3');
var React = require('react');
var reactFeather = require('react-feather');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n  grid-template-columns: repeat(", ", 1fr);\n  grid-gap: 6px;\n\n  position: absolute;\n  top: -32px;\n  right: 0;\n"])), function (_ref) {
  var count = _ref.count;
  return count.toString();
});
var Button = styled__default["default"](index.ButtonGray)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  width: 32px;\n  height: 32px;\n  padding: 4px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
});
var ZoomOverlay = styled__default["default"].rect(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  fill: transparent;\n  cursor: grab;\n\n  &:active {\n    cursor: grabbing;\n  }\n"])));
function Zoom(_ref4) {
  var svg = _ref4.svg,
    xScale = _ref4.xScale,
    setZoom = _ref4.setZoom,
    width = _ref4.width,
    height = _ref4.height,
    resetBrush = _ref4.resetBrush,
    showResetButton = _ref4.showResetButton,
    zoomLevels = _ref4.zoomLevels;
  var zoomBehavior = React.useRef();
  var _useMemo = React.useMemo(function () {
      return [function () {
        return svg && zoomBehavior.current && d3.select(svg).transition().call(zoomBehavior.current.scaleBy, 2);
      }, function () {
        return svg && zoomBehavior.current && d3.select(svg).transition().call(zoomBehavior.current.scaleBy, 0.5);
      }, function () {
        return svg && zoomBehavior.current && d3.select(svg).transition().call(zoomBehavior.current.scaleTo, 0.5);
      }, function () {
        return svg && zoomBehavior.current && d3.select(svg).call(zoomBehavior.current.transform, d3.zoomIdentity.translate(0, 0).scale(1)).transition().call(zoomBehavior.current.scaleTo, 0.5);
      }];
    }, [svg]),
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 4),
    zoomIn = _useMemo2[0],
    zoomOut = _useMemo2[1],
    zoomInitial = _useMemo2[2],
    zoomReset = _useMemo2[3];
  React.useEffect(function () {
    if (!svg) return;
    zoomBehavior.current = d3.zoom().scaleExtent([zoomLevels.min, zoomLevels.max]).extent([[0, 0], [width, height]]).on("zoom", function (_ref5) {
      var transform = _ref5.transform;
      return setZoom(transform);
    });
    d3.select(svg).call(zoomBehavior.current);
  }, [height, width, setZoom, svg, xScale, zoomBehavior, zoomLevels, zoomLevels.max, zoomLevels.min]);
  React.useEffect(function () {
    // reset zoom to initial on zoomLevel change
    zoomInitial();
  }, [zoomInitial, zoomLevels]);
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    count: showResetButton ? 3 : 2
  }, showResetButton && /*#__PURE__*/React__default["default"].createElement(Button, {
    onClick: function onClick() {
      resetBrush();
      zoomReset();
    },
    disabled: false
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.RefreshCcw, {
    size: 16
  })), /*#__PURE__*/React__default["default"].createElement(Button, {
    onClick: zoomIn,
    disabled: false
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.ZoomIn, {
    size: 16
  })), /*#__PURE__*/React__default["default"].createElement(Button, {
    onClick: zoomOut,
    disabled: false
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.ZoomOut, {
    size: 16
  })));
}

exports.ZoomOverlay = ZoomOverlay;
exports["default"] = Zoom;
