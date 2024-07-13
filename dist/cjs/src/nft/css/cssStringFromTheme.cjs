'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var darkTheme = require('../themes/darkTheme.cjs');
var lightTheme = require('../themes/lightTheme.cjs');
var cssObjectFromTheme = require('./cssObjectFromTheme.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function cssStringFromTheme(theme) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.entries(cssObjectFromTheme.cssObjectFromTheme(theme, options)).map(function (_ref) {
    var _ref2 = _slicedToArray__default["default"](_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return "".concat(key, ":").concat(value, ";");
  }).join("");
}
function rootCssString(isDarkMode) {
  return isDarkMode ? cssStringFromTheme(darkTheme.darkTheme) : cssStringFromTheme(lightTheme.lightTheme);
}

exports.rootCssString = rootCssString;
