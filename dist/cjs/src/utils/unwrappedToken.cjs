'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chains = require('../constants/chains.cjs');
var tokens = require('../constants/tokens.cjs');

function unwrappedToken(currency) {
  var _WRAPPED_NATIVE_CURRE;
  if (currency.isNative) return currency;
  var formattedChainId = chains.asSupportedChain(currency.chainId);
  if (formattedChainId && (_WRAPPED_NATIVE_CURRE = tokens.WRAPPED_NATIVE_CURRENCY[formattedChainId]) !== null && _WRAPPED_NATIVE_CURRE !== void 0 && _WRAPPED_NATIVE_CURRE.equals(currency)) return tokens.nativeOnChain(currency.chainId);
  return currency;
}

exports.unwrappedToken = unwrappedToken;
