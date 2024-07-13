'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zustand = require('zustand');
var middleware = require('zustand/middleware');

var useIsNftClaimAvailable = zustand.create()(middleware.devtools(function (set) {
  return {
    isClaimAvailable: false,
    setIsClaimAvailable: function setIsClaimAvailable(isClaimAvailable) {
      set(function () {
        return {
          isClaimAvailable: isClaimAvailable
        };
      });
    }
  };
}, {
  name: "useIsNftClaimAvailable"
}));

exports.useIsNftClaimAvailable = useIsNftClaimAvailable;
