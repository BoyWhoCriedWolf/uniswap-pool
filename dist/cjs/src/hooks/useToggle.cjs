'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function useToggle() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _useState = React.useState(initialState),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var toggle = React.useCallback(function () {
    return setState(function (state) {
      return !state;
    });
  }, []);
  return [state, toggle];
}

module.exports = useToggle;
