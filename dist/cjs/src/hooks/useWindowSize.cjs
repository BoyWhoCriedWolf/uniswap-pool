'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _typeof = require('@babel/runtime/helpers/typeof');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

var isClient = (typeof window === "undefined" ? "undefined" : _typeof__default["default"](window)) === "object";
function getSize() {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  };
}

// https://usehooks.com/useWindowSize/
function useWindowSize() {
  var _useState = React.useState(getSize),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    windowSize = _useState2[0],
    setWindowSize = _useState2[1];
  React.useEffect(function () {
    function handleResize() {
      setWindowSize(getSize());
    }
    if (isClient) {
      window.addEventListener("resize", handleResize);
      return function () {
        window.removeEventListener("resize", handleResize);
      };
    }
    return undefined;
  }, []);
  return windowSize;
}

exports.useWindowSize = useWindowSize;
