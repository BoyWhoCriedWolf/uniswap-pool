'use strict';

var React = require('react');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var analyticsEvents = require('@uniswap/analytics-events');
var index$2 = require('../../../../analytics/index.cjs');
var PrefetchBalancesWrapper = require('../../../PrefetchBalancesWrapper/PrefetchBalancesWrapper.cjs');
var index$3 = require('../../../Row/index.cjs');
var Delta = require('../../../Tokens/TokenDetails/Delta.cjs');
var util = require('../../../../graphql/data/util.cjs');
var utils = require('jotai/utils');
var EmptyWalletContent = require('../../../../nft/components/profile/view/EmptyWalletContent.cjs');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
var index = require('../../../../theme/components/index.cjs');
var formatNumbers = require('../../../../utils/formatNumbers.cjs');
var splitHiddenTokens = require('../../../../utils/splitHiddenTokens.cjs');
var index$1 = require('../../index.cjs');
var SmallBalanceToggle = require('../../SmallBalanceToggle.cjs');
var ExpandoRow = require('../ExpandoRow.cjs');
var PortfolioLogo = require('../PortfolioLogo.cjs');
var PortfolioRow = require('../PortfolioRow.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
function Tokens(_ref) {
  var _data$portfolios;
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var toggleWalletDrawer = index$1.useToggleAccountDrawer();
  var hideSmallBalances = utils.useAtomValue(SmallBalanceToggle.hideSmallBalancesAtom);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showHiddenTokens = _useState2[0],
    setShowHiddenTokens = _useState2[1];
  var _useCachedPortfolioBa = PrefetchBalancesWrapper.useCachedPortfolioBalancesQuery({
      account: account
    }),
    data = _useCachedPortfolioBa.data;
  var tokenBalances = data === null || data === void 0 || (_data$portfolios = data.portfolios) === null || _data$portfolios === void 0 ? void 0 : _data$portfolios[0].tokenBalances;
  var _useMemo = React.useMemo(function () {
      return splitHiddenTokens.splitHiddenTokens(tokenBalances !== null && tokenBalances !== void 0 ? tokenBalances : [], {
        hideSmallBalances: hideSmallBalances
      });
    }, [hideSmallBalances, tokenBalances]),
    visibleTokens = _useMemo.visibleTokens,
    hiddenTokens = _useMemo.hiddenTokens;
  if (!data) {
    return /*#__PURE__*/React__default["default"].createElement(PortfolioRow.PortfolioSkeleton, null);
  }
  if ((tokenBalances === null || tokenBalances === void 0 ? void 0 : tokenBalances.length) === 0) {
    // TODO: consider launching moonpay here instead of just closing the drawer
    return /*#__PURE__*/React__default["default"].createElement(EmptyWalletContent.EmptyWalletModule, {
      type: "token",
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  }
  var toggleHiddenTokens = function toggleHiddenTokens() {
    return setShowHiddenTokens(function (showHiddenTokens) {
      return !showHiddenTokens;
    });
  };
  return /*#__PURE__*/React__default["default"].createElement(PortfolioRow.PortfolioTabWrapper, null, visibleTokens.map(function (tokenBalance) {
    return tokenBalance.token && /*#__PURE__*/React__default["default"].createElement(TokenRow, _extends__default["default"]({
      key: tokenBalance.id
    }, tokenBalance, {
      token: tokenBalance.token
    }));
  }), /*#__PURE__*/React__default["default"].createElement(ExpandoRow.ExpandoRow, {
    isExpanded: showHiddenTokens,
    toggle: toggleHiddenTokens,
    numItems: hiddenTokens.length
  }, hiddenTokens.map(function (tokenBalance) {
    return tokenBalance.token && /*#__PURE__*/React__default["default"].createElement(TokenRow, _extends__default["default"]({
      key: tokenBalance.id
    }, tokenBalance, {
      token: tokenBalance.token
    }));
  })));
}
var TokenBalanceText = styled__default["default"](text.ThemedText.BodySecondary)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), index.EllipsisStyle);
var TokenNameText = styled__default["default"](text.ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), index.EllipsisStyle);
function TokenRow(_ref2) {
  var _tokenProjectMarket$p, _tokenProjectMarket$p2;
  var token = _ref2.token,
    quantity = _ref2.quantity,
    denominatedValue = _ref2.denominatedValue,
    tokenProjectMarket = _ref2.tokenProjectMarket;
  var _useFormatter = formatNumbers.useFormatter(),
    formatPercent = _useFormatter.formatPercent;
  var percentChange = (_tokenProjectMarket$p = tokenProjectMarket === null || tokenProjectMarket === void 0 || (_tokenProjectMarket$p2 = tokenProjectMarket.pricePercentChange) === null || _tokenProjectMarket$p2 === void 0 ? void 0 : _tokenProjectMarket$p2.value) !== null && _tokenProjectMarket$p !== void 0 ? _tokenProjectMarket$p : 0;
  var navigate = reactRouterDom.useNavigate();
  var toggleWalletDrawer = index$1.useToggleAccountDrawer();
  var navigateToTokenDetails = React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          navigate(util.getTokenDetailsURL(token));
          toggleWalletDrawer();
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [navigate, token, toggleWalletDrawer]);
  var _useFormatter2 = formatNumbers.useFormatter(),
    formatNumber = _useFormatter2.formatNumber;
  var currency = util.gqlToCurrency(token);
  if (!currency) {
    util.logSentryErrorForUnsupportedChain({
      extras: {
        token: token
      },
      errorMessage: "Token from unsupported chain received from Mini Portfolio Token Balance Query"
    });
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(index$2.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SharedEventName.ELEMENT_CLICKED,
    element: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_TOKEN_ROW,
    properties: {
      chain_id: currency.chainId,
      token_name: token === null || token === void 0 ? void 0 : token.name,
      address: token === null || token === void 0 ? void 0 : token.address
    }
  }, /*#__PURE__*/React__default["default"].createElement(PortfolioRow["default"], {
    left: /*#__PURE__*/React__default["default"].createElement(PortfolioLogo.PortfolioLogo, {
      chainId: currency.chainId,
      currencies: [currency],
      size: "40px"
    }),
    title: /*#__PURE__*/React__default["default"].createElement(TokenNameText, null, token === null || token === void 0 ? void 0 : token.name),
    descriptor: /*#__PURE__*/React__default["default"].createElement(TokenBalanceText, null, formatNumber({
      input: quantity,
      type: formatNumbers.NumberType.TokenNonTx
    }), " ", token === null || token === void 0 ? void 0 : token.symbol),
    onClick: navigateToTokenDetails,
    right: denominatedValue && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, formatNumber({
      input: denominatedValue === null || denominatedValue === void 0 ? void 0 : denominatedValue.value,
      type: formatNumbers.NumberType.PortfolioBalance
    })), /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
      justify: "flex-end"
    }, /*#__PURE__*/React__default["default"].createElement(Delta.DeltaArrow, {
      delta: percentChange
    }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, formatPercent(percentChange))))
  }));
}

module.exports = Tokens;
