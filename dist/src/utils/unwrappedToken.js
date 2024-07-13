import { asSupportedChain } from '../constants/chains.js';
import { WRAPPED_NATIVE_CURRENCY, nativeOnChain } from '../constants/tokens.js';

function unwrappedToken(currency) {
  var _WRAPPED_NATIVE_CURRE;
  if (currency.isNative) return currency;
  var formattedChainId = asSupportedChain(currency.chainId);
  if (formattedChainId && (_WRAPPED_NATIVE_CURRE = WRAPPED_NATIVE_CURRENCY[formattedChainId]) !== null && _WRAPPED_NATIVE_CURRE !== void 0 && _WRAPPED_NATIVE_CURRE.equals(currency)) return nativeOnChain(currency.chainId);
  return currency;
}

export { unwrappedToken };
