import { DEFAULT_LOCAL_CURRENCY, SUPPORTED_LOCAL_CURRENCIES } from '../constants/localCurrencies.js';
import { atomWithStorage, useAtomValue } from 'jotai/utils';
import { useMemo } from 'react';
import useParsedQueryString from './useParsedQueryString.js';

var activeLocalCurrencyAtom = atomWithStorage("activeLocalCurrency", DEFAULT_LOCAL_CURRENCY);
function useUrlLocalCurrency() {
  var parsed = useParsedQueryString();
  var parsedLocalCurrency = parsed.cur;
  if (typeof parsedLocalCurrency !== "string") return undefined;
  var lowerCaseSupportedLocalCurrency = parsedLocalCurrency.toLowerCase();
  return SUPPORTED_LOCAL_CURRENCIES.find(function (localCurrency) {
    return localCurrency.toLowerCase() === lowerCaseSupportedLocalCurrency;
  });
}
function useActiveLocalCurrency() {
  var activeLocalCurrency = useAtomValue(activeLocalCurrencyAtom);
  var urlLocalCurrency = useUrlLocalCurrency();
  return useMemo(function () {
    return urlLocalCurrency !== null && urlLocalCurrency !== void 0 ? urlLocalCurrency : activeLocalCurrency;
  }, [activeLocalCurrency, urlLocalCurrency]);
}

export { activeLocalCurrencyAtom, useActiveLocalCurrency };
