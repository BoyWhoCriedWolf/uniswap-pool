'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('../state/hooks.cjs');

function useIsNotOriginCountry(country) {
  var originCountry = hooks.useAppSelector(function (state) {
    return state.user.originCountry;
  });
  return Boolean(originCountry) && originCountry !== country;
}

exports.useIsNotOriginCountry = useIsNotOriginCountry;
