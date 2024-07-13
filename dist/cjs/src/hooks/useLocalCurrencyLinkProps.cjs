'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index = require('../analytics/index.cjs');
var useParsedQueryString = require('./useParsedQueryString.cjs');
var jotai = require('jotai');
var qs = require('qs');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var useActiveLocalCurrency = require('./useActiveLocalCurrency.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useLocalCurrencyLinkProps(localCurrency) {
  var location = reactRouterDom.useLocation();
  var qs$1 = useParsedQueryString["default"]();
  var activeLocalCurrency = useActiveLocalCurrency.useActiveLocalCurrency();
  var _useAtom = jotai.useAtom(useActiveLocalCurrency.activeLocalCurrencyAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    updateActiveLocalCurrency = _useAtom2[1];
  return React.useMemo(function () {
    return !localCurrency ? {} : {
      to: _objectSpread(_objectSpread({}, location), {}, {
        search: qs.stringify(_objectSpread(_objectSpread({}, qs$1), {}, {
          cur: localCurrency
        }))
      }),
      onClick: function onClick() {
        updateActiveLocalCurrency(localCurrency);
        index.sendAnalyticsEvent("Local Currency Selected", {
          previous_local_currency: activeLocalCurrency,
          new_local_currency: localCurrency
        });
      }
    };
  }, [localCurrency, location, qs$1, updateActiveLocalCurrency, activeLocalCurrency]);
}

exports.useLocalCurrencyLinkProps = useLocalCurrencyLinkProps;
