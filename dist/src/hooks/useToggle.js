import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useCallback } from 'react';

function useToggle() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _useState = useState(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var toggle = useCallback(function () {
    return setState(function (state) {
      return !state;
    });
  }, []);
  return [state, toggle];
}

export { useToggle as default };
