'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function isVisibilityStateSupported() {
  return "visibilityState" in document;
}
function isWindowVisible() {
  return !isVisibilityStateSupported() || document.visibilityState !== "hidden";
}

/**
 * Returns whether the window is currently visible to the user.
 */
function useIsWindowVisible() {
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    focused = _useState2[0],
    setFocused = _useState2[1];
  var listener = React.useCallback(function () {
    setFocused(isWindowVisible());
  }, [setFocused]);
  React.useEffect(function () {
    if (!isVisibilityStateSupported()) return undefined;
    setFocused(function () {
      return isWindowVisible();
    });
    document.addEventListener("visibilitychange", listener);
    return function () {
      document.removeEventListener("visibilitychange", listener);
    };
  }, [listener]);
  return focused;
}

module.exports = useIsWindowVisible;
