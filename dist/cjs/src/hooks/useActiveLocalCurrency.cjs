'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var localCurrencies = require('../constants/localCurrencies.cjs');
var utils = require('jotai/utils');
var React = require('react');
var useParsedQueryString = require('./useParsedQueryString.cjs');

var activeLocalCurrencyAtom = utils.atomWithStorage("activeLocalCurrency", localCurrencies.DEFAULT_LOCAL_CURRENCY);
function useUrlLocalCurrency() {
  var parsed = useParsedQueryString["default"]();
  var parsedLocalCurrency = parsed.cur;
  if (typeof parsedLocalCurrency !== "string") return undefined;
  var lowerCaseSupportedLocalCurrency = parsedLocalCurrency.toLowerCase();
  return localCurrencies.SUPPORTED_LOCAL_CURRENCIES.find(function (localCurrency) {
    return localCurrency.toLowerCase() === lowerCaseSupportedLocalCurrency;
  });
}
function useActiveLocalCurrency() {
  var activeLocalCurrency = utils.useAtomValue(activeLocalCurrencyAtom);
  var urlLocalCurrency = useUrlLocalCurrency();
  return React.useMemo(function () {
    return urlLocalCurrency !== null && urlLocalCurrency !== void 0 ? urlLocalCurrency : activeLocalCurrency;
  }, [activeLocalCurrency, urlLocalCurrency]);
}

exports.activeLocalCurrencyAtom = activeLocalCurrencyAtom;
exports.useActiveLocalCurrency = useActiveLocalCurrency;
