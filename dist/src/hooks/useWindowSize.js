import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _typeof from '@babel/runtime/helpers/typeof';
import { useState, useEffect } from 'react';

var isClient = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";
function getSize() {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  };
}

// https://usehooks.com/useWindowSize/
function useWindowSize() {
  var _useState = useState(getSize),
    _useState2 = _slicedToArray(_useState, 2),
    windowSize = _useState2[0],
    setWindowSize = _useState2[1];
  useEffect(function () {
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

export { useWindowSize };
