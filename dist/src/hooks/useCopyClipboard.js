import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import copy from 'copy-to-clipboard';
import { useState, useCallback, useEffect } from 'react';

function useCopyClipboard() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isCopied = _useState2[0],
    setIsCopied = _useState2[1];
  var staticCopy = useCallback(function (text) {
    var didCopy = copy(text);
    setIsCopied(didCopy);
  }, []);
  useEffect(function () {
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

export { useCopyClipboard as default };
