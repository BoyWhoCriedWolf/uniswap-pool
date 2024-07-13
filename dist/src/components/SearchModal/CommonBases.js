import React__default from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { BrowserEvent, InterfaceEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { TraceEvent } from '../../analytics/index.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import { AutoRow } from '../Row/index.js';
import { COMMON_BASES } from '../../constants/routing.js';
import { useTokenInfoFromActiveList } from '../../hooks/useTokenInfoFromActiveList.js';
import { getTokenAddress } from '../../lib/utils/analytics.js';
import { Text } from 'rebass';
import styled from 'styled-components';
import { currencyId } from '../../utils/currencyId.js';

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BaseWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  border-radius: 18px;\n  display: flex;\n  padding: 6px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-right: 12px;\n  line-height: 0px;\n\n  align-items: center;\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n\n  color: ", ";\n  background-color: ", ";\n"])), function (_ref) {
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
    token_address: getTokenAddress(currency),
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
  var bases = chainId !== undefined ? (_COMMON_BASES$chainId = COMMON_BASES[chainId]) !== null && _COMMON_BASES$chainId !== void 0 ? _COMMON_BASES$chainId : [] : [];
  return bases.length > 0 ? /*#__PURE__*/React__default.createElement(AutoRow, {
    gap: "4px"
  }, bases.map(function (currency) {
    var isSelected = selectedCurrency === null || selectedCurrency === void 0 ? void 0 : selectedCurrency.equals(currency);
    return /*#__PURE__*/React__default.createElement(TraceEvent, {
      events: [BrowserEvent.onClick, BrowserEvent.onKeyPress],
      name: InterfaceEventName.TOKEN_SELECTED,
      properties: formatAnalyticsEventProperties(currency, searchQuery, isAddressSearch),
      element: InterfaceElementName.COMMON_BASES_CURRENCY_BUTTON,
      key: currencyId(currency)
    }, /*#__PURE__*/React__default.createElement(BaseWrapper, {
      tabIndex: 0,
      onKeyPress: function onKeyPress(e) {
        return !isSelected && e.key === "Enter" && onSelect(currency);
      },
      onClick: function onClick() {
        return !isSelected && onSelect(currency);
      },
      disable: isSelected,
      key: currencyId(currency),
      "data-testid": "common-base-".concat(currency.symbol)
    }, /*#__PURE__*/React__default.createElement(CurrencyLogoFromList, {
      currency: currency
    }), /*#__PURE__*/React__default.createElement(Text, {
      fontWeight: 535,
      fontSize: 16,
      lineHeight: "16px"
    }, currency.symbol)));
  })) : null;
}

/** helper component to retrieve a base currency from the active token lists */
function CurrencyLogoFromList(_ref7) {
  var currency = _ref7.currency;
  var token = useTokenInfoFromActiveList(currency);
  return /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: token,
    style: {
      marginRight: 8
    }
  });
}

export { CommonBases as default };
