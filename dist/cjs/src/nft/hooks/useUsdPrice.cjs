'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@ethersproject/units');
var sdkCore = require('@uniswap/sdk-core');
var useUSDPrice = require('../../hooks/useUSDPrice.cjs');
var useNativeCurrency = require('../../lib/hooks/useNativeCurrency.cjs');
var tryParseCurrencyAmount = require('../../lib/utils/tryParseCurrencyAmount.cjs');

var useNativeUsdPrice = function useNativeUsdPrice() {
  var _useUSDPrice$data, _useUSDPrice;
  var chainId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sdkCore.ChainId.MAINNET;
  var nativeCurrency = useNativeCurrency(chainId);
  var parsedAmount = tryParseCurrencyAmount("1", nativeCurrency);
  var usdcValue = (_useUSDPrice$data = (_useUSDPrice = useUSDPrice.useUSDPrice(parsedAmount)) === null || _useUSDPrice === void 0 ? void 0 : _useUSDPrice.data) !== null && _useUSDPrice$data !== void 0 ? _useUSDPrice$data : 0;
  return usdcValue;
};

exports.useNativeUsdPrice = useNativeUsdPrice;
