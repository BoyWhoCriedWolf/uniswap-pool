import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useEffect } from 'react';

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
function useLast(value, filterFn) {
  var _useState = useState(value),
    _useState2 = _slicedToArray(_useState, 2),
    last = _useState2[0],
    setLast = _useState2[1];
  useEffect(function () {
    setLast(function (last) {
      var shouldUse = filterFn ? filterFn(value) : true;
      if (shouldUse) return value;
      return last;
    });
  }, [filterFn, value]);
  return last;
}

export { useLast as default };
