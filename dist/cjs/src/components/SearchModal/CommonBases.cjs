'use strict';

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var analyticsEvents = require('@uniswap/analytics-events');
var index$1 = require('../../analytics/index.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var index = require('../Row/index.cjs');
var routing = require('../../constants/routing.cjs');
var useTokenInfoFromActiveList = require('../../hooks/useTokenInfoFromActiveList.cjs');
var analytics = require('../../lib/utils/analytics.cjs');
var rebass = require('rebass');
var styled = require('styled-components');
var currencyId = require('../../utils/currencyId.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BaseWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  border-radius: 18px;\n  display: flex;\n  padding: 6px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-right: 12px;\n  line-height: 0px;\n\n  align-items: center;\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n\n  color: ", ";\n  background-color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var disable = _ref2.disable;
  return !disable && "pointer";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_hoverDefault;
}, function (_ref4) {
  var theme = _ref4.theme,
    disable = _ref4.disable;
  return disable && theme.neutral1;
}, function (_ref5) {
  var theme = _ref5.theme,
    disable = _ref5.disable;
  return disable && theme.surface3;
});
var formatAnalyticsEventProperties = function formatAnalyticsEventProperties(currency, searchQuery, isAddressSearch) {
  return _objectSpread({
    token_symbol: currency === null || currency === void 0 ? void 0 : currency.symbol,
    token_chain_id: currency === null || currency === void 0 ? void 0 : currency.chainId,
    token_address: analytics.getTokenAddress(currency),
    is_suggested_token: true,
    is_selected_from_list: false,
    is_imported_by_user: false
  }, isAddressSearch === false ? {
    search_token_symbol_input: searchQuery
  } : {
    search_token_address_input: isAddressSearch
  });
};
function CommonBases(_ref6) {
  var _COMMON_BASES$chainId;
  var chainId = _ref6.chainId,
    onSelect = _ref6.onSelect,
    selectedCurrency = _ref6.selectedCurrency,
    searchQuery = _ref6.searchQuery,
    isAddressSearch = _ref6.isAddressSearch;
  var bases = chainId !== undefined ? (_COMMON_BASES$chainId = routing.COMMON_BASES[chainId]) !== null && _COMMON_BASES$chainId !== void 0 ? _COMMON_BASES$chainId : [] : [];
  return bases.length > 0 ? /*#__PURE__*/React__default["default"].createElement(index.AutoRow, {
    gap: "4px"
  }, bases.map(function (currency) {
    var isSelected = selectedCurrency === null || selectedCurrency === void 0 ? void 0 : selectedCurrency.equals(currency);
    return /*#__PURE__*/React__default["default"].createElement(index$1.TraceEvent, {
      events: [analyticsEvents.BrowserEvent.onClick, analyticsEvents.BrowserEvent.onKeyPress],
      name: analyticsEvents.InterfaceEventName.TOKEN_SELECTED,
      properties: formatAnalyticsEventProperties(currency, searchQuery, isAddressSearch),
      element: analyticsEvents.InterfaceElementName.COMMON_BASES_CURRENCY_BUTTON,
      key: currencyId.currencyId(currency)
    }, /*#__PURE__*/React__default["default"].createElement(BaseWrapper, {
      tabIndex: 0,
      onKeyPress: function onKeyPress(e) {
        return !isSelected && e.key === "Enter" && onSelect(currency);
      },
      onClick: function onClick() {
        return !isSelected && onSelect(currency);
      },
      disable: isSelected,
      key: currencyId.currencyId(currency),
      "data-testid": "common-base-".concat(currency.symbol)
    }, /*#__PURE__*/React__default["default"].createElement(CurrencyLogoFromList, {
      currency: currency
    }), /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
      fontWeight: 535,
      fontSize: 16,
      lineHeight: "16px"
    }, currency.symbol)));
  })) : null;
}

/** helper component to retrieve a base currency from the active token lists */
function CurrencyLogoFromList(_ref7) {
  var currency = _ref7.currency;
  var token = useTokenInfoFromActiveList.useTokenInfoFromActiveList(currency);
  return /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: token,
    style: {
      marginRight: 8
    }
  });
}

module.exports = CommonBases;
