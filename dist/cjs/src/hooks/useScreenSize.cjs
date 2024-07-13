'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var index = require('../theme/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isClient = typeof window !== "undefined";
var navSearchInputVisibleSize = 1100;

// for breakpoints that are not meant to be used except for in marginal areas of the app
// we don't want to expose the types everywhere, just make them available via this hook
var BREAKPOINTS_ADDITIONAL = _objectSpread(_objectSpread({}, index.BREAKPOINTS), {}, {
  navSearchInputVisible: navSearchInputVisibleSize
});
function getScreenSize() {
  return Object.keys(BREAKPOINTS_ADDITIONAL).reduce(function (obj, key) {
    return Object.assign(obj, _defineProperty__default["default"]({}, key, isClient ? window.innerWidth >= BREAKPOINTS_ADDITIONAL[key] : false));
  }, {});
}
function useScreenSize() {
  var _useState = React.useState(getScreenSize()),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  React.useEffect(function () {
    function handleResize() {
      setScreenSize(getScreenSize());
    }
    if (isClient) {
      window.addEventListener("resize", handleResize);
      return function () {
        window.removeEventListener("resize", handleResize);
      };
    }
    return undefined;
  }, []);
  return screenSize;
}

exports.navSearchInputVisibleSize = navSearchInputVisibleSize;
exports.useScreenSize = useScreenSize;
