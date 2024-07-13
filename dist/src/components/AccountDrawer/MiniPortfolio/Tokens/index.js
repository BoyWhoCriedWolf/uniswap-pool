import React__default, { useState, useMemo, useCallback } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { BrowserEvent, SharedEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { TraceEvent } from '../../../../analytics/index.js';
import { useCachedPortfolioBalancesQuery } from '../../../PrefetchBalancesWrapper/PrefetchBalancesWrapper.js';
import Row from '../../../Row/index.js';
import { DeltaArrow } from '../../../Tokens/TokenDetails/Delta.js';
import { getTokenDetailsURL, gqlToCurrency, logSentryErrorForUnsupportedChain } from '../../../../graphql/data/util.js';
import { useAtomValue } from 'jotai/utils';
import { EmptyWalletModule } from '../../../../nft/components/profile/view/EmptyWalletContent.js';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EllipsisStyle } from '../../../../theme/components/index.js';
import { useFormatter, NumberType } from '../../../../utils/formatNumbers.js';
import { splitHiddenTokens } from '../../../../utils/splitHiddenTokens.js';
import { useToggleAccountDrawer } from '../../index.js';
import { hideSmallBalancesAtom } from '../../SmallBalanceToggle.js';
import { ExpandoRow } from '../ExpandoRow.js';
import { PortfolioLogo } from '../PortfolioLogo.js';
import PortfolioRow, { PortfolioSkeleton, PortfolioTabWrapper } from '../PortfolioRow.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2;
function Tokens(_ref) {
  var _data$portfolios;
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var toggleWalletDrawer = useToggleAccountDrawer();
  var hideSmallBalances = useAtomValue(hideSmallBalancesAtom);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showHiddenTokens = _useState2[0],
    setShowHiddenTokens = _useState2[1];
  var _useCachedPortfolioBa = useCachedPortfolioBalancesQuery({
      account: account
    }),
    data = _useCachedPortfolioBa.data;
  var tokenBalances = data === null || data === void 0 || (_data$portfolios = data.portfolios) === null || _data$portfolios === void 0 ? void 0 : _data$portfolios[0].tokenBalances;
  var _useMemo = useMemo(function () {
      return splitHiddenTokens(tokenBalances !== null && tokenBalances !== void 0 ? tokenBalances : [], {
        hideSmallBalances: hideSmallBalances
      });
    }, [hideSmallBalances, tokenBalances]),
    visibleTokens = _useMemo.visibleTokens,
    hiddenTokens = _useMemo.hiddenTokens;
  if (!data) {
    return /*#__PURE__*/React__default.createElement(PortfolioSkeleton, null);
  }
  if ((tokenBalances === null || tokenBalances === void 0 ? void 0 : tokenBalances.length) === 0) {
    // TODO: consider launching moonpay here instead of just closing the drawer
    return /*#__PURE__*/React__default.createElement(EmptyWalletModule, {
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
  return /*#__PURE__*/React__default.createElement(PortfolioTabWrapper, null, visibleTokens.map(function (tokenBalance) {
    return tokenBalance.token && /*#__PURE__*/React__default.createElement(TokenRow, _extends({
      key: tokenBalance.id
    }, tokenBalance, {
      token: tokenBalance.token
    }));
  }), /*#__PURE__*/React__default.createElement(ExpandoRow, {
    isExpanded: showHiddenTokens,
    toggle: toggleHiddenTokens,
    numItems: hiddenTokens.length
  }, hiddenTokens.map(function (tokenBalance) {
    return tokenBalance.token && /*#__PURE__*/React__default.createElement(TokenRow, _extends({
      key: tokenBalance.id
    }, tokenBalance, {
      token: tokenBalance.token
    }));
  })));
}
var TokenBalanceText = styled(ThemedText.BodySecondary)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n"])), EllipsisStyle);
var TokenNameText = styled(ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", "\n"])), EllipsisStyle);
function TokenRow(_ref2) {
  var _tokenProjectMarket$p, _tokenProjectMarket$p2;
  var token = _ref2.token,
    quantity = _ref2.quantity,
    denominatedValue = _ref2.denominatedValue,
    tokenProjectMarket = _ref2.tokenProjectMarket;
  var _useFormatter = useFormatter(),
    formatPercent = _useFormatter.formatPercent;
  var percentChange = (_tokenProjectMarket$p = tokenProjectMarket === null || tokenProjectMarket === void 0 || (_tokenProjectMarket$p2 = tokenProjectMarket.pricePercentChange) === null || _tokenProjectMarket$p2 === void 0 ? void 0 : _tokenProjectMarket$p2.value) !== null && _tokenProjectMarket$p !== void 0 ? _tokenProjectMarket$p : 0;
  var navigate = useNavigate();
  var toggleWalletDrawer = useToggleAccountDrawer();
  var navigateToTokenDetails = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          navigate(getTokenDetailsURL(token));
          toggleWalletDrawer();
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [navigate, token, toggleWalletDrawer]);
  var _useFormatter2 = useFormatter(),
    formatNumber = _useFormatter2.formatNumber;
  var currency = gqlToCurrency(token);
  if (!currency) {
    logSentryErrorForUnsupportedChain({
      extras: {
        token: token
      },
      errorMessage: "Token from unsupported chain received from Mini Portfolio Token Balance Query"
    });
    return null;
  }
  return /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SharedEventName.ELEMENT_CLICKED,
    element: InterfaceElementName.MINI_PORTFOLIO_TOKEN_ROW,
    properties: {
      chain_id: currency.chainId,
      token_name: token === null || token === void 0 ? void 0 : token.name,
      address: token === null || token === void 0 ? void 0 : token.address
    }
  }, /*#__PURE__*/React__default.createElement(PortfolioRow, {
    left: /*#__PURE__*/React__default.createElement(PortfolioLogo, {
      chainId: currency.chainId,
      currencies: [currency],
      size: "40px"
    }),
    title: /*#__PURE__*/React__default.createElement(TokenNameText, null, token === null || token === void 0 ? void 0 : token.name),
    descriptor: /*#__PURE__*/React__default.createElement(TokenBalanceText, null, formatNumber({
      input: quantity,
      type: NumberType.TokenNonTx
    }), " ", token === null || token === void 0 ? void 0 : token.symbol),
    onClick: navigateToTokenDetails,
    right: denominatedValue && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, formatNumber({
      input: denominatedValue === null || denominatedValue === void 0 ? void 0 : denominatedValue.value,
      type: NumberType.PortfolioBalance
    })), /*#__PURE__*/React__default.createElement(Row, {
      justify: "flex-end"
    }, /*#__PURE__*/React__default.createElement(DeltaArrow, {
      delta: percentChange
    }), /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, formatPercent(percentChange))))
  }));
}

export { Tokens as default };
