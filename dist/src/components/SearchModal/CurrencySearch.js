import React__default, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { InterfaceEventName, InterfaceModalName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { Trace } from '../../analytics/index.js';
import { useCachedPortfolioBalancesQuery } from '../PrefetchBalancesWrapper/PrefetchBalancesWrapper.js';
import { supportedChainIdFromGQLChain } from '../../graphql/data/util.js';
import useDebounce from '../../hooks/useDebounce.js';
import { useOnClickOutside } from '../../hooks/useOnClickOutside.js';
import useToggle from '../../hooks/useToggle.js';
import useNativeCurrency from '../../lib/hooks/useNativeCurrency.js';
import { getTokenFilter } from '../../lib/hooks/useTokenList/filtering.js';
import { tokenComparator, useSortTokensByQuery } from '../../lib/hooks/useTokenList/sorting.js';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Text } from 'rebass';
import styled, { useTheme } from 'styled-components';
import { CloseIcon } from '../../theme/components/index.js';
import { UserAddedToken } from '../../types/tokens.js';
import { useToken, useIsUserAddedToken, useDefaultActiveTokens, useSearchInactiveTokenLists } from '../../hooks/Tokens.js';
import { isAddress } from '../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { Column } from '../Column/index.js';
import Row, { RowBetween } from '../Row/index.js';
import CommonBases from './CommonBases.js';
import CurrencyList, { CurrencyRow, formatAnalyticsEventProperties } from './CurrencyList/index.js';
import { PaddedColumn, SearchInput, Separator } from './styled.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var ContentWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  width: 100%;\n  overflow: hidden;\n  flex: 1 1;\n  position: relative;\n  border-radius: 20px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
});
function CurrencySearch(_ref2) {
  var selectedCurrency = _ref2.selectedCurrency,
    onCurrencySelect = _ref2.onCurrencySelect,
    otherSelectedCurrency = _ref2.otherSelectedCurrency,
    showCommonBases = _ref2.showCommonBases,
    showCurrencyAmount = _ref2.showCurrencyAmount,
    disableNonToken = _ref2.disableNonToken,
    onDismiss = _ref2.onDismiss,
    isOpen = _ref2.isOpen,
    onlyShowCurrenciesWithBalance = _ref2.onlyShowCurrenciesWithBalance;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId,
    account = _useWeb3React.account;
  var theme = useTheme();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    tokenLoaderTimerElapsed = _useState2[0],
    setTokenLoaderTimerElapsed = _useState2[1];

  // refs for fixed size lists
  var fixedList = useRef();
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    searchQuery = _useState4[0],
    setSearchQuery = _useState4[1];
  var debouncedQuery = useDebounce(searchQuery, 200);
  var isAddressSearch = isAddress(debouncedQuery);
  var searchToken = useToken(debouncedQuery);
  var searchTokenIsAdded = useIsUserAddedToken(searchToken);
  var defaultTokens = useDefaultActiveTokens(chainId);
  var filteredTokens = useMemo(function () {
    return Object.values(defaultTokens).filter(getTokenFilter(debouncedQuery));
  }, [defaultTokens, debouncedQuery]);
  var _useCachedPortfolioBa = useCachedPortfolioBalancesQuery({
      account: account
    }),
    data = _useCachedPortfolioBa.data,
    balancesAreLoading = _useCachedPortfolioBa.loading;
  var balances = useMemo(function () {
    var _data$portfolios$0$to, _data$portfolios;
    return (_data$portfolios$0$to = data === null || data === void 0 || (_data$portfolios = data.portfolios) === null || _data$portfolios === void 0 || (_data$portfolios = _data$portfolios[0].tokenBalances) === null || _data$portfolios === void 0 ? void 0 : _data$portfolios.reduce(function (balanceMap, tokenBalance) {
      var _tokenBalance$token, _tokenBalance$token2, _tokenBalance$token3, _tokenBalance$denomin;
      if ((_tokenBalance$token = tokenBalance.token) !== null && _tokenBalance$token !== void 0 && _tokenBalance$token.chain && supportedChainIdFromGQLChain((_tokenBalance$token2 = tokenBalance.token) === null || _tokenBalance$token2 === void 0 ? void 0 : _tokenBalance$token2.chain) === chainId && ((_tokenBalance$token3 = tokenBalance.token) === null || _tokenBalance$token3 === void 0 ? void 0 : _tokenBalance$token3.address) !== undefined && ((_tokenBalance$denomin = tokenBalance.denominatedValue) === null || _tokenBalance$denomin === void 0 ? void 0 : _tokenBalance$denomin.value) !== undefined) {
        var _tokenBalance$token4, _tokenBalance$token5, _tokenBalance$denomin2;
        var address = ((_tokenBalance$token4 = tokenBalance.token) === null || _tokenBalance$token4 === void 0 ? void 0 : _tokenBalance$token4.standard) === "ERC20" ? (_tokenBalance$token5 = tokenBalance.token) === null || _tokenBalance$token5 === void 0 || (_tokenBalance$token5 = _tokenBalance$token5.address) === null || _tokenBalance$token5 === void 0 ? void 0 : _tokenBalance$token5.toLowerCase() : "ETH";
        var usdValue = (_tokenBalance$denomin2 = tokenBalance.denominatedValue) === null || _tokenBalance$denomin2 === void 0 ? void 0 : _tokenBalance$denomin2.value;
        var balance = tokenBalance.quantity;
        balanceMap[address] = {
          usdValue: usdValue,
          balance: balance !== null && balance !== void 0 ? balance : 0
        };
      }
      return balanceMap;
    }, {})) !== null && _data$portfolios$0$to !== void 0 ? _data$portfolios$0$to : {};
  }, [chainId, data === null || data === void 0 ? void 0 : data.portfolios]);
  var sortedTokens = useMemo(function () {
    return !balancesAreLoading ? filteredTokens.filter(function (token) {
      if (onlyShowCurrenciesWithBalance) {
        var _balances$token$addre, _token$address;
        return ((_balances$token$addre = balances[(_token$address = token.address) === null || _token$address === void 0 ? void 0 : _token$address.toLowerCase()]) === null || _balances$token$addre === void 0 ? void 0 : _balances$token$addre.usdValue) > 0;
      }

      // If there is no query, filter out unselected user-added tokens with no balance.
      if (!debouncedQuery && token instanceof UserAddedToken) {
        var _balances$token$addre2;
        if (selectedCurrency !== null && selectedCurrency !== void 0 && selectedCurrency.equals(token) || otherSelectedCurrency !== null && otherSelectedCurrency !== void 0 && otherSelectedCurrency.equals(token)) return true;
        return ((_balances$token$addre2 = balances[token.address.toLowerCase()]) === null || _balances$token$addre2 === void 0 ? void 0 : _balances$token$addre2.usdValue) > 0;
      }
      return true;
    }).sort(tokenComparator.bind(null, balances)) : filteredTokens;
  }, [balancesAreLoading, filteredTokens, balances, onlyShowCurrenciesWithBalance, debouncedQuery, selectedCurrency, otherSelectedCurrency]);
  var isLoading = Boolean(balancesAreLoading && !tokenLoaderTimerElapsed);
  var filteredSortedTokens = useSortTokensByQuery(debouncedQuery, sortedTokens);
  var _native = useNativeCurrency(chainId);
  var wrapped = _native.wrapped;
  var searchCurrencies = useMemo(function () {
    var _balances$wrapped$add;
    var s = debouncedQuery.toLowerCase().trim();
    var tokens = filteredSortedTokens.filter(function (t) {
      return !(t.equals(wrapped) || disableNonToken && t.isNative);
    });
    var shouldShowWrapped = !onlyShowCurrenciesWithBalance || !balancesAreLoading && ((_balances$wrapped$add = balances[wrapped.address]) === null || _balances$wrapped$add === void 0 ? void 0 : _balances$wrapped$add.usdValue) > 0;
    var natives = (disableNonToken || _native.equals(wrapped) ? [wrapped] : shouldShowWrapped ? [_native, wrapped] : [_native]).filter(function (n) {
      var _n$symbol, _n$name;
      return ((_n$symbol = n.symbol) === null || _n$symbol === void 0 || (_n$symbol = _n$symbol.toLowerCase()) === null || _n$symbol === void 0 ? void 0 : _n$symbol.indexOf(s)) !== -1 || ((_n$name = n.name) === null || _n$name === void 0 || (_n$name = _n$name.toLowerCase()) === null || _n$name === void 0 ? void 0 : _n$name.indexOf(s)) !== -1;
    });
    return [].concat(_toConsumableArray(natives), _toConsumableArray(tokens));
  }, [debouncedQuery, filteredSortedTokens, onlyShowCurrenciesWithBalance, balancesAreLoading, balances, wrapped, disableNonToken, _native]);
  var handleCurrencySelect = useCallback(function (currency, hasWarning) {
    onCurrencySelect(currency, hasWarning);
    if (!hasWarning) onDismiss();
  }, [onDismiss, onCurrencySelect]);

  // clear the input on open
  useEffect(function () {
    if (isOpen) setSearchQuery("");
  }, [isOpen]);

  // manage focus on modal show
  var inputRef = useRef();
  var handleInput = useCallback(function (event) {
    var _fixedList$current;
    var input = event.target.value;
    var checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
    (_fixedList$current = fixedList.current) === null || _fixedList$current === void 0 || _fixedList$current.scrollTo(0);
  }, []);
  var handleEnter = useCallback(function (e) {
    if (e.key === "Enter") {
      var _native$symbol;
      var s = debouncedQuery.toLowerCase().trim();
      if (s === (_native === null || _native === void 0 || (_native$symbol = _native.symbol) === null || _native$symbol === void 0 ? void 0 : _native$symbol.toLowerCase())) {
        handleCurrencySelect(_native);
      } else if (searchCurrencies.length > 0) {
        var _searchCurrencies$0$s;
        if (((_searchCurrencies$0$s = searchCurrencies[0].symbol) === null || _searchCurrencies$0$s === void 0 ? void 0 : _searchCurrencies$0$s.toLowerCase()) === debouncedQuery.trim().toLowerCase() || searchCurrencies.length === 1) {
          handleCurrencySelect(searchCurrencies[0]);
        }
      }
    }
  }, [debouncedQuery, _native, searchCurrencies, handleCurrencySelect]);

  // menu ui
  var _useToggle = useToggle(false),
    _useToggle2 = _slicedToArray(_useToggle, 2),
    open = _useToggle2[0],
    toggle = _useToggle2[1];
  var node = useRef();
  useOnClickOutside(node, open ? toggle : undefined);

  // if no results on main list, show option to expand into inactive
  var filteredInactiveTokens = useSearchInactiveTokenLists(!onlyShowCurrenciesWithBalance && (filteredTokens.length === 0 || debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined);

  // Timeout token loader after 3 seconds to avoid hanging in a loading state.
  useEffect(function () {
    var tokenLoaderTimer = setTimeout(function () {
      setTokenLoaderTimerElapsed(true);
    }, 3000);
    return function () {
      return clearTimeout(tokenLoaderTimer);
    };
  }, []);
  return /*#__PURE__*/React__default.createElement(ContentWrapper, null, /*#__PURE__*/React__default.createElement(Trace, {
    name: InterfaceEventName.TOKEN_SELECTOR_OPENED,
    modal: InterfaceModalName.TOKEN_SELECTOR,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(PaddedColumn, {
    gap: "16px"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(Text, {
    fontWeight: 535,
    fontSize: 16
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "T0Y2+3",
    message: "Select a token"
  })), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(SearchInput, {
    type: "text",
    id: "token-search-input",
    "data-testid": "token-search-input",
    placeholder: i18n._(
    /*i18n*/
    {
      id: "p58/Ov",
      message: "Search name or paste address"
    }),
    autoComplete: "off",
    value: searchQuery,
    ref: inputRef,
    onChange: handleInput,
    onKeyDown: handleEnter
  })), showCommonBases && /*#__PURE__*/React__default.createElement(CommonBases, {
    chainId: chainId,
    onSelect: handleCurrencySelect,
    selectedCurrency: selectedCurrency,
    searchQuery: searchQuery,
    isAddressSearch: isAddressSearch
  })), /*#__PURE__*/React__default.createElement(Separator, null), searchToken && !searchTokenIsAdded ? /*#__PURE__*/React__default.createElement(Column, {
    style: {
      padding: "20px 0",
      height: "100%"
    }
  }, /*#__PURE__*/React__default.createElement(CurrencyRow, {
    currency: searchToken,
    isSelected: Boolean(searchToken && selectedCurrency && selectedCurrency.equals(searchToken)),
    onSelect: function onSelect(hasWarning) {
      return searchToken && handleCurrencySelect(searchToken, hasWarning);
    },
    otherSelected: Boolean(searchToken && otherSelectedCurrency && otherSelectedCurrency.equals(searchToken)),
    showCurrencyAmount: showCurrencyAmount,
    eventProperties: formatAnalyticsEventProperties(searchToken, 0, [searchToken], searchQuery, isAddressSearch)
  })) : (searchCurrencies === null || searchCurrencies === void 0 ? void 0 : searchCurrencies.length) > 0 || (filteredInactiveTokens === null || filteredInactiveTokens === void 0 ? void 0 : filteredInactiveTokens.length) > 0 || isLoading ? /*#__PURE__*/React__default.createElement("div", {
    style: {
      flex: "1"
    }
  }, /*#__PURE__*/React__default.createElement(AutoSizer, {
    disableWidth: true
  }, function (_ref3) {
    var height = _ref3.height;
    return /*#__PURE__*/React__default.createElement(CurrencyList, {
      height: height,
      currencies: searchCurrencies,
      otherListTokens: filteredInactiveTokens,
      onCurrencySelect: handleCurrencySelect,
      otherCurrency: otherSelectedCurrency,
      selectedCurrency: selectedCurrency,
      fixedListRef: fixedList,
      showCurrencyAmount: showCurrencyAmount,
      isLoading: isLoading,
      searchQuery: searchQuery,
      isAddressSearch: isAddressSearch,
      balances: balances
    });
  })) : /*#__PURE__*/React__default.createElement(Column, {
    style: {
      padding: "20px",
      height: "100%"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    color: theme.neutral3,
    textAlign: "center",
    mb: "20px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "MZbQHL",
    message: "No results found."
  })))));
}

export { CurrencySearch };
