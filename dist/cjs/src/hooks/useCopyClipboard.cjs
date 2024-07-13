'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var copy = require('copy-to-clipboard');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var copy__default = /*#__PURE__*/_interopDefaultLegacy(copy);

function useCopyClipboard() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isCopied = _useState2[0],
    setIsCopied = _useState2[1];
  var staticCopy = React.useCallback(function (text) {
    var didCopy = copy__default["default"](text);
    setIsCopied(didCopy);
  }, []);
  React.useEffect(function () {
    if (isCopied) {
      var hide = setTimeout(function () {
        setIsCopied(false);
      }, timeout);
      return function () {
        clearTimeout(hide);
      };
    }
    return undefined;
  }, [isCopied, setIsCopied, timeout]);
  return [isCopied, staticCopy];
}

module.exports = useCopyClipboard;
