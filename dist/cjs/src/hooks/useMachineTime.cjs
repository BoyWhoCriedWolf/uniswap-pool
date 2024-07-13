'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var useInterval = require('../lib/hooks/useInterval.cjs');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var useMachineTimeMs = function useMachineTimeMs(updateInterval) {
  var _useState = React.useState(Date.now()),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    now = _useState2[0],
    setNow = _useState2[1];
  useInterval(React.useCallback(function () {
    setNow(Date.now());
  }, []), updateInterval);
  return now;
};
var useMachineTimeMs$1 = useMachineTimeMs;

module.exports = useMachineTimeMs$1;
