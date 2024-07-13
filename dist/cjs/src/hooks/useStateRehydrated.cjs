'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('../state/hooks.cjs');

function useStateRehydrated() {
  return hooks.useAppSelector(function (state) {
    return state._persist.rehydrated;
  });
}

exports.useStateRehydrated = useStateRehydrated;
