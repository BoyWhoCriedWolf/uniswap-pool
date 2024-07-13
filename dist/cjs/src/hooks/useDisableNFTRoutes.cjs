'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('jotai/utils');
var atoms = require('../state/application/atoms.cjs');

function useDisableNFTRoutes() {
  return utils.useAtomValue(atoms.shouldDisableNFTRoutesAtom);
}

exports.useDisableNFTRoutes = useDisableNFTRoutes;
