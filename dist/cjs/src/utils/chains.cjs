'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chainInfo = require('../constants/chainInfo.cjs');

function isL2ChainId(chainId) {
  var chainInfo$1 = chainInfo.getChainInfo(chainId);
  return (chainInfo$1 === null || chainInfo$1 === void 0 ? void 0 : chainInfo$1.networkType) === chainInfo.NetworkType.L2;
}

exports.isL2ChainId = isL2ChainId;
