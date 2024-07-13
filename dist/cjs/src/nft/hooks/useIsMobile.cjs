'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useScreenSize = require('../../hooks/useScreenSize.cjs');

// @deprecated in favor of useScreenSize
function useIsMobile() {
  var isScreenSize = useScreenSize.useScreenSize();
  var isMobile = !isScreenSize["sm"];
  return isMobile;
}

exports.useIsMobile = useIsMobile;
