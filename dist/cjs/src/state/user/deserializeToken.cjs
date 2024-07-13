'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');

function deserializeToken(serializedToken) {
  var Class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sdkCore.Token;
  return new Class(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}

exports.deserializeToken = deserializeToken;
