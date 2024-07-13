import '@ethersproject/units';
import { ChainId } from '@uniswap/sdk-core';
import { useUSDPrice } from '../../hooks/useUSDPrice.js';
import useNativeCurrency from '../../lib/hooks/useNativeCurrency.js';
import tryParseCurrencyAmount from '../../lib/utils/tryParseCurrencyAmount.js';

var useNativeUsdPrice = function useNativeUsdPrice() {
  var _useUSDPrice$data, _useUSDPrice;
  var chainId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChainId.MAINNET;
  var nativeCurrency = useNativeCurrency(chainId);
  var parsedAmount = tryParseCurrencyAmount("1", nativeCurrency);
  var usdcValue = (_useUSDPrice$data = (_useUSDPrice = useUSDPrice(parsedAmount)) === null || _useUSDPrice === void 0 ? void 0 : _useUSDPrice.data) !== null && _useUSDPrice$data !== void 0 ? _useUSDPrice$data : 0;
  return usdcValue;
};

export { useNativeUsdPrice };
