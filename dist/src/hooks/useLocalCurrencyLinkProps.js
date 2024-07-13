import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { sendAnalyticsEvent } from '../analytics/index.js';
import useParsedQueryString from './useParsedQueryString.js';
import { useAtom } from 'jotai';
import { stringify } from 'qs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useActiveLocalCurrency, activeLocalCurrencyAtom } from './useActiveLocalCurrency.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useLocalCurrencyLinkProps(localCurrency) {
  var location = useLocation();
  var qs = useParsedQueryString();
  var activeLocalCurrency = useActiveLocalCurrency();
  var _useAtom = useAtom(activeLocalCurrencyAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    updateActiveLocalCurrency = _useAtom2[1];
  return useMemo(function () {
    return !localCurrency ? {} : {
      to: _objectSpread(_objectSpread({}, location), {}, {
        search: stringify(_objectSpread(_objectSpread({}, qs), {}, {
          cur: localCurrency
        }))
      }),
      onClick: function onClick() {
        updateActiveLocalCurrency(localCurrency);
        sendAnalyticsEvent("Local Currency Selected", {
          previous_local_currency: activeLocalCurrency,
          new_local_currency: localCurrency
        });
      }
    };
  }, [localCurrency, location, qs, updateActiveLocalCurrency, activeLocalCurrency]);
}

export { useLocalCurrencyLinkProps };
