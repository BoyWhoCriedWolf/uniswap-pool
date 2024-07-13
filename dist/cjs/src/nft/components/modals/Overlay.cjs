'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var noop = require('../../../utils/noop.cjs');
var Box = require('../Box.cjs');
var Overlay_css = require('./Overlay.css.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var stopPropagation = function stopPropagation(event) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};
var Overlay = function Overlay(_ref) {
  var _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? noop : _ref$onClick;
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: Overlay_css.overlay,
    onClick: onClick
  });
};

exports.Overlay = Overlay;
exports.stopPropagation = stopPropagation;
