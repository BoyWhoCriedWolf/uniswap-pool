import React__default, { useMemo, useCallback } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { BrowserEvent, InterfaceEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { CurrencyAmount } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { TraceEvent } from '../../../analytics/index.js';
import Loader from '../../Icons/LoadingSpinner.js';
import TokenSafetyIcon from '../../TokenSafety/TokenSafetyIcon.js';
import { checkWarning } from '../../../constants/tokenSafety.js';
import tryParseCurrencyAmount from '../../../lib/utils/tryParseCurrencyAmount.js';
import { Check } from 'react-feather';
import { FixedSizeList } from 'react-window';
import { Text } from 'rebass';
import styled from 'styled-components';
import '../../../theme/components/index.js';
import { useIsUserAddedToken } from '../../../hooks/Tokens.js';
import { WrappedTokenInfo } from '../../../state/lists/wrappedTokenInfo.js';
import { Column, AutoColumn } from '../../Column/index.js';
import CurrencyLogo from '../../Logo/CurrencyLogo.js';
import Row, { RowFixed } from '../../Row/index.js';
import { MouseoverTooltip } from '../../Tooltip/index.js';
import { MenuItem, LoadingRows } from '../styled.js';
import { scrollbarStyle } from './index.css.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function currencyKey(currency) {
  return currency.isToken ? currency.address : "ETHER";
}
var CheckIcon = styled(Check)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 20px;\n  width: 20px;\n  margin-left: 4px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
});
var StyledBalanceText = styled(Text)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  text-overflow: ellipsis;\n"])));
var CurrencyName = styled(Text)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"])));
var Tag = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  color: ", ";\n  font-size: 14px;\n  border-radius: 4px;\n  padding: 0.25rem 0.3rem 0.25rem 0.3rem;\n  max-width: 6rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  justify-self: flex-end;\n  margin-right: 4px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface2;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var WarningContainer = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  margin-left: 0.3em;\n"])));
function Balance(_ref4) {
  var balance = _ref4.balance;
  return /*#__PURE__*/React__default.createElement(StyledBalanceText, {
    title: balance.toExact()
  }, balance.toSignificant(4));
}
var TagContainer = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: flex-end;\n"])));
function TokenTags(_ref5) {
  var currency = _ref5.currency;
  if (!(currency instanceof WrappedTokenInfo)) {
    return null;
  }
  var tags = currency.tags;
  if (!tags || tags.length === 0) return /*#__PURE__*/React__default.createElement("span", null);
  var tag = tags[0];
  return /*#__PURE__*/React__default.createElement(TagContainer, null, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: tag.description
  }, /*#__PURE__*/React__default.createElement(Tag, {
    key: tag.id
  }, tag.name)), tags.length > 1 ? /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: tags.slice(1).map(function (_ref6) {
      var name = _ref6.name,
        description = _ref6.description;
      return "".concat(name, ": ").concat(description);
    }).join("; \n")
  }, /*#__PURE__*/React__default.createElement(Tag, null, "...")) : null);
}
function CurrencyRow(_ref7) {
  var currency = _ref7.currency,
    onSelect = _ref7.onSelect,
    isSelected = _ref7.isSelected,
    otherSelected = _ref7.otherSelected,
    style = _ref7.style,
    showCurrencyAmount = _ref7.showCurrencyAmount,
    eventProperties = _ref7.eventProperties,
    balance = _ref7.balance;
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var key = currencyKey(currency);
  var customAdded = useIsUserAddedToken(currency);
  var warning = currency.isNative ? null : checkWarning(currency.address);
  var isBlockedToken = !!warning && !warning.canProceed;
  var blockedTokenOpacity = "0.6";

  // only show add or remove buttons if not on selected list
  return /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick, BrowserEvent.onKeyPress],
    name: InterfaceEventName.TOKEN_SELECTED,
    properties: _objectSpread({
      is_imported_by_user: customAdded
    }, eventProperties),
    element: InterfaceElementName.TOKEN_SELECTOR_ROW
  }, /*#__PURE__*/React__default.createElement(MenuItem, {
    tabIndex: 0,
    style: style,
    className: "token-item-".concat(key),
    onKeyPress: function onKeyPress(e) {
      return !isSelected && e.key === "Enter" ? onSelect(!!warning) : null;
    },
    onClick: function onClick() {
      return isSelected ? null : onSelect(!!warning);
    },
    disabled: isSelected,
    selected: otherSelected,
    dim: isBlockedToken
  }, /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: currency,
    size: "36px",
    style: {
      opacity: isBlockedToken ? blockedTokenOpacity : "1"
    }
  })), /*#__PURE__*/React__default.createElement(AutoColumn, {
    style: {
      opacity: isBlockedToken ? blockedTokenOpacity : "1"
    }
  }, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(CurrencyName, {
    title: currency.name
  }, currency.name), /*#__PURE__*/React__default.createElement(WarningContainer, null, /*#__PURE__*/React__default.createElement(TokenSafetyIcon, {
    warning: warning
  }))), /*#__PURE__*/React__default.createElement(ThemedText.LabelMicro, {
    ml: "0px"
  }, currency.symbol)), /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(RowFixed, {
    style: {
      justifySelf: "flex-end"
    }
  }, /*#__PURE__*/React__default.createElement(TokenTags, {
    currency: currency
  }))), showCurrencyAmount ? /*#__PURE__*/React__default.createElement(RowFixed, {
    style: {
      justifySelf: "flex-end"
    }
  }, account ? balance ? /*#__PURE__*/React__default.createElement(Balance, {
    balance: balance
  }) : /*#__PURE__*/React__default.createElement(Loader, null) : null, isSelected && /*#__PURE__*/React__default.createElement(CheckIcon, null)) : isSelected && /*#__PURE__*/React__default.createElement(RowFixed, {
    style: {
      justifySelf: "flex-end"
    }
  }, /*#__PURE__*/React__default.createElement(CheckIcon, null))));
}
var formatAnalyticsEventProperties = function formatAnalyticsEventProperties(token, index, data, searchQuery, isAddressSearch) {
  return _objectSpread({
    token_symbol: token === null || token === void 0 ? void 0 : token.symbol,
    token_address: token === null || token === void 0 ? void 0 : token.address,
    is_suggested_token: false,
    is_selected_from_list: true,
    scroll_position: "",
    token_list_index: index,
    token_list_length: data.length
  }, isAddressSearch === false ? {
    search_token_symbol_input: searchQuery
  } : {
    search_token_address_input: isAddressSearch
  });
};
var LoadingRow = function LoadingRow() {
  return /*#__PURE__*/React__default.createElement(LoadingRows, {
    "data-testid": "loading-rows"
  }, /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement("div", null));
};
function CurrencyList(_ref8) {
  var height = _ref8.height,
    currencies = _ref8.currencies,
    otherListTokens = _ref8.otherListTokens,
    selectedCurrency = _ref8.selectedCurrency,
    onCurrencySelect = _ref8.onCurrencySelect,
    otherCurrency = _ref8.otherCurrency,
    fixedListRef = _ref8.fixedListRef,
    showCurrencyAmount = _ref8.showCurrencyAmount,
    isLoading = _ref8.isLoading,
    searchQuery = _ref8.searchQuery,
    isAddressSearch = _ref8.isAddressSearch,
    balances = _ref8.balances;
  var itemData = useMemo(function () {
    if (otherListTokens && (otherListTokens === null || otherListTokens === void 0 ? void 0 : otherListTokens.length) > 0) {
      return [].concat(_toConsumableArray(currencies), _toConsumableArray(otherListTokens));
    }
    return currencies;
  }, [currencies, otherListTokens]);
  var Row = useCallback(function TokenRow(_ref9) {
    var _tryParseCurrencyAmou, _balances$balance, _balances, _currency$address;
    var data = _ref9.data,
      index = _ref9.index,
      style = _ref9.style;
    var row = data[index];
    var currency = row;
    var balance = (_tryParseCurrencyAmou = tryParseCurrencyAmount(String((_balances$balance = (_balances = balances[currency.isNative ? "ETH" : (_currency$address = currency.address) === null || _currency$address === void 0 ? void 0 : _currency$address.toLowerCase()]) === null || _balances === void 0 ? void 0 : _balances.balance) !== null && _balances$balance !== void 0 ? _balances$balance : 0), currency)) !== null && _tryParseCurrencyAmou !== void 0 ? _tryParseCurrencyAmou : CurrencyAmount.fromRawAmount(currency, 0);
    var isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency));
    var otherSelected = Boolean(currency && otherCurrency && otherCurrency.equals(currency));
    var handleSelect = function handleSelect(hasWarning) {
      return currency && onCurrencySelect(currency, hasWarning);
    };
    var token = currency === null || currency === void 0 ? void 0 : currency.wrapped;
    if (isLoading) {
      return LoadingRow();
    } else if (currency) {
      return /*#__PURE__*/React__default.createElement(CurrencyRow, {
        style: style,
        currency: currency,
        isSelected: isSelected,
        onSelect: handleSelect,
        otherSelected: otherSelected,
        showCurrencyAmount: showCurrencyAmount,
        eventProperties: formatAnalyticsEventProperties(token, index, data, searchQuery, isAddressSearch),
        balance: balance
      });
    } else {
      return null;
    }
  }, [selectedCurrency, otherCurrency, isLoading, onCurrencySelect, showCurrencyAmount, searchQuery, isAddressSearch, balances]);
  var itemKey = useCallback(function (index, data) {
    var currency = data[index];
    return currencyKey(currency);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    "data-testid": "currency-list-wrapper"
  }, isLoading ? /*#__PURE__*/React__default.createElement(FixedSizeList, {
    className: scrollbarStyle,
    height: height,
    ref: fixedListRef,
    width: "100%",
    itemData: [],
    itemCount: 10,
    itemSize: 56
  }, LoadingRow) : /*#__PURE__*/React__default.createElement(FixedSizeList, {
    className: scrollbarStyle,
    height: height,
    ref: fixedListRef,
    width: "100%",
    itemData: itemData,
    itemCount: itemData.length,
    itemSize: 56,
    itemKey: itemKey
  }, Row));
}

export { CurrencyRow, CurrencyList as default, formatAnalyticsEventProperties };
