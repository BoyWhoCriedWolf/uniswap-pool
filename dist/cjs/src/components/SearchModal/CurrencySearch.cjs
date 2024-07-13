'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$5 = require('../../../node_modules/@lingui/core/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$1 = require('../../analytics/index.cjs');
var PrefetchBalancesWrapper = require('../PrefetchBalancesWrapper/PrefetchBalancesWrapper.cjs');
var util = require('../../graphql/data/util.cjs');
var useDebounce = require('../../hooks/useDebounce.cjs');
var useOnClickOutside = require('../../hooks/useOnClickOutside.cjs');
var useToggle = require('../../hooks/useToggle.cjs');
var useNativeCurrency = require('../../lib/hooks/useNativeCurrency.cjs');
var filtering = require('../../lib/hooks/useTokenList/filtering.cjs');
var sorting = require('../../lib/hooks/useTokenList/sorting.cjs');
var AutoSizer = require('react-virtualized-auto-sizer');
var rebass = require('rebass');
var styled = require('styled-components');
var index$4 = require('../../theme/components/index.cjs');
var tokens = require('../../types/tokens.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var index = require('../Column/index.cjs');
var index$2 = require('../Row/index.cjs');
var CommonBases = require('./CommonBases.cjs');
var index$6 = require('./CurrencyList/index.cjs');
var styled$1 = require('./styled.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var AutoSizer__default = /*#__PURE__*/_interopDefaultLegacy(AutoSizer);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var ContentWrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  width: 100%;\n  overflow: hidden;\n  flex: 1 1;\n  position: relative;\n  border-radius: 20px;\n"])), function (_ref) {
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
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId,
    account = _useWeb3React.account;
  var theme = styled.useTheme();
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    tokenLoaderTimerElapsed = _useState2[0],
    setTokenLoaderTimerElapsed = _useState2[1];

  // refs for fixed size lists
  var fixedList = React.useRef();
  var _useState3 = React.useState(""),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    searchQuery = _useState4[0],
    setSearchQuery = _useState4[1];
  var debouncedQuery = useDebounce(searchQuery, 200);
  var isAddressSearch = addresses.isAddress(debouncedQuery);
  var searchToken = Tokens.useToken(debouncedQuery);
  var searchTokenIsAdded = Tokens.useIsUserAddedToken(searchToken);
  var defaultTokens = Tokens.useDefaultActiveTokens(chainId);
  var filteredTokens = React.useMemo(function () {
    return Object.values(defaultTokens).filter(filtering.getTokenFilter(debouncedQuery));
  }, [defaultTokens, debouncedQuery]);
  var _useCachedPortfolioBa = PrefetchBalancesWrapper.useCachedPortfolioBalancesQuery({
      account: account
    }),
    data = _useCachedPortfolioBa.data,
    balancesAreLoading = _useCachedPortfolioBa.loading;
  var balances = React.useMemo(function () {
    var _data$portfolios$0$to, _data$portfolios;
    return (_data$portfolios$0$to = data === null || data === void 0 || (_data$portfolios = data.portfolios) === null || _data$portfolios === void 0 || (_data$portfolios = _data$portfolios[0].tokenBalances) === null || _data$portfolios === void 0 ? void 0 : _data$portfolios.reduce(function (balanceMap, tokenBalance) {
      var _tokenBalance$token, _tokenBalance$token2, _tokenBalance$token3, _tokenBalance$denomin;
      if ((_tokenBalance$token = tokenBalance.token) !== null && _tokenBalance$token !== void 0 && _tokenBalance$token.chain && util.supportedChainIdFromGQLChain((_tokenBalance$token2 = tokenBalance.token) === null || _tokenBalance$token2 === void 0 ? void 0 : _tokenBalance$token2.chain) === chainId && ((_tokenBalance$token3 = tokenBalance.token) === null || _tokenBalance$token3 === void 0 ? void 0 : _tokenBalance$token3.address) !== undefined && ((_tokenBalance$denomin = tokenBalance.denominatedValue) === null || _tokenBalance$denomin === void 0 ? void 0 : _tokenBalance$denomin.value) !== undefined) {
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
  var sortedTokens = React.useMemo(function () {
    return !balancesAreLoading ? filteredTokens.filter(function (token) {
      if (onlyShowCurrenciesWithBalance) {
        var _balances$token$addre, _token$address;
        return ((_balances$token$addre = balances[(_token$address = token.address) === null || _token$address === void 0 ? void 0 : _token$address.toLowerCase()]) === null || _balances$token$addre === void 0 ? void 0 : _balances$token$addre.usdValue) > 0;
      }

      // If there is no query, filter out unselected user-added tokens with no balance.
      if (!debouncedQuery && token instanceof tokens.UserAddedToken) {
        var _balances$token$addre2;
        if (selectedCurrency !== null && selectedCurrency !== void 0 && selectedCurrency.equals(token) || otherSelectedCurrency !== null && otherSelectedCurrency !== void 0 && otherSelectedCurrency.equals(token)) return true;
        return ((_balances$token$addre2 = balances[token.address.toLowerCase()]) === null || _balances$token$addre2 === void 0 ? void 0 : _balances$token$addre2.usdValue) > 0;
      }
      return true;
    }).sort(sorting.tokenComparator.bind(null, balances)) : filteredTokens;
  }, [balancesAreLoading, filteredTokens, balances, onlyShowCurrenciesWithBalance, debouncedQuery, selectedCurrency, otherSelectedCurrency]);
  var isLoading = Boolean(balancesAreLoading && !tokenLoaderTimerElapsed);
  var filteredSortedTokens = sorting.useSortTokensByQuery(debouncedQuery, sortedTokens);
  var _native = useNativeCurrency(chainId);
  var wrapped = _native.wrapped;
  var searchCurrencies = React.useMemo(function () {
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
    return [].concat(_toConsumableArray__default["default"](natives), _toConsumableArray__default["default"](tokens));
  }, [debouncedQuery, filteredSortedTokens, onlyShowCurrenciesWithBalance, balancesAreLoading, balances, wrapped, disableNonToken, _native]);
  var handleCurrencySelect = React.useCallback(function (currency, hasWarning) {
    onCurrencySelect(currency, hasWarning);
    if (!hasWarning) onDismiss();
  }, [onDismiss, onCurrencySelect]);

  // clear the input on open
  React.useEffect(function () {
    if (isOpen) setSearchQuery("");
  }, [isOpen]);

  // manage focus on modal show
  var inputRef = React.useRef();
  var handleInput = React.useCallback(function (event) {
    var _fixedList$current;
    var input = event.target.value;
    var checksummedInput = addresses.isAddress(input);
    setSearchQuery(checksummedInput || input);
    (_fixedList$current = fixedList.current) === null || _fixedList$current === void 0 || _fixedList$current.scrollTo(0);
  }, []);
  var handleEnter = React.useCallback(function (e) {
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
    _useToggle2 = _slicedToArray__default["default"](_useToggle, 2),
    open = _useToggle2[0],
    toggle = _useToggle2[1];
  var node = React.useRef();
  useOnClickOutside.useOnClickOutside(node, open ? toggle : undefined);

  // if no results on main list, show option to expand into inactive
  var filteredInactiveTokens = Tokens.useSearchInactiveTokenLists(!onlyShowCurrenciesWithBalance && (filteredTokens.length === 0 || debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined);

  // Timeout token loader after 3 seconds to avoid hanging in a loading state.
  React.useEffect(function () {
    var tokenLoaderTimer = setTimeout(function () {
      setTokenLoaderTimerElapsed(true);
    }, 3000);
    return function () {
      return clearTimeout(tokenLoaderTimer);
    };
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(ContentWrapper, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trace, {
    name: analyticsEvents.InterfaceEventName.TOKEN_SELECTOR_OPENED,
    modal: analyticsEvents.InterfaceModalName.TOKEN_SELECTOR,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(styled$1.PaddedColumn, {
    gap: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
    fontWeight: 535,
    fontSize: 16
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "T0Y2+3",
    message: "Select a token"
  })), /*#__PURE__*/React__default["default"].createElement(index$4.CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default["default"].createElement(index$2["default"], null, /*#__PURE__*/React__default["default"].createElement(styled$1.SearchInput, {
    type: "text",
    id: "token-search-input",
    "data-testid": "token-search-input",
    placeholder: index$5.i18n._(
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
  })), showCommonBases && /*#__PURE__*/React__default["default"].createElement(CommonBases, {
    chainId: chainId,
    onSelect: handleCurrencySelect,
    selectedCurrency: selectedCurrency,
    searchQuery: searchQuery,
    isAddressSearch: isAddressSearch
  })), /*#__PURE__*/React__default["default"].createElement(styled$1.Separator, null), searchToken && !searchTokenIsAdded ? /*#__PURE__*/React__default["default"].createElement(index.Column, {
    style: {
      padding: "20px 0",
      height: "100%"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$6.CurrencyRow, {
    currency: searchToken,
    isSelected: Boolean(searchToken && selectedCurrency && selectedCurrency.equals(searchToken)),
    onSelect: function onSelect(hasWarning) {
      return searchToken && handleCurrencySelect(searchToken, hasWarning);
    },
    otherSelected: Boolean(searchToken && otherSelectedCurrency && otherSelectedCurrency.equals(searchToken)),
    showCurrencyAmount: showCurrencyAmount,
    eventProperties: index$6.formatAnalyticsEventProperties(searchToken, 0, [searchToken], searchQuery, isAddressSearch)
  })) : (searchCurrencies === null || searchCurrencies === void 0 ? void 0 : searchCurrencies.length) > 0 || (filteredInactiveTokens === null || filteredInactiveTokens === void 0 ? void 0 : filteredInactiveTokens.length) > 0 || isLoading ? /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      flex: "1"
    }
  }, /*#__PURE__*/React__default["default"].createElement(AutoSizer__default["default"], {
    disableWidth: true
  }, function (_ref3) {
    var height = _ref3.height;
    return /*#__PURE__*/React__default["default"].createElement(index$6["default"], {
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
  })) : /*#__PURE__*/React__default["default"].createElement(index.Column, {
    style: {
      padding: "20px",
      height: "100%"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    color: theme.neutral3,
    textAlign: "center",
    mb: "20px"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "MZbQHL",
    message: "No results found."
  })))));
}

exports.CurrencySearch = CurrencySearch;
