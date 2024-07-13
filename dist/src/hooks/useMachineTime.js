import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import useInterval from '../lib/hooks/useInterval.js';
import { useState, useCallback } from 'react';

var useMachineTimeMs = function useMachineTimeMs(updateInterval) {
  var _useState = useState(Date.now()),
    _useState2 = _slicedToArray(_useState, 2),
    now = _useState2[0],
    setNow = _useState2[1];
  useInterval(useCallback(function () {
    setNow(Date.now());
  }, []), updateInterval);
  return now;
};
var useMachineTimeMs$1 = useMachineTimeMs;

export { useMachineTimeMs$1 as default };
