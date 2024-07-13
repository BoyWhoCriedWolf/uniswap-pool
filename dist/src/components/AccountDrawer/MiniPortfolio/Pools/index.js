import React__default, { useReducer, useMemo, useCallback } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { BrowserEvent, SharedEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { TraceEvent } from '../../../../analytics/index.js';
import { useToggleAccountDrawer } from '../../index.js';
import Row from '../../../Row/index.js';
import { MouseoverTooltip } from '../../../Tooltip/index.js';
import { useFilterPossiblyMaliciousPositions } from '../../../../hooks/useFilterPossiblyMaliciousPositions.js';
import { useSwitchChain } from '../../../../hooks/useSwitchChain.js';
import { EmptyWalletModule } from '../../../../nft/components/profile/view/EmptyWalletContent.js';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../../theme/components/index.js';
import { useFormatter, NumberType } from '../../../../utils/formatNumbers.js';
import { ExpandoRow } from '../ExpandoRow.js';
import { PortfolioLogo } from '../PortfolioLogo.js';
import PortfolioRow, { PortfolioSkeleton, PortfolioTabWrapper } from '../PortfolioRow.js';
import { useFeeValues } from './hooks.js';
import useMultiChainPositions from './useMultiChainPositions.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Takes an array of PositionInfo objects (format used by the Uniswap Labs gql API).
 * The hook access PositionInfo.details (format used by the NFT position contract),
 * filters the PositionDetails data for malicious content,
 * and then returns the original data in its original format.
 */
function useFilterPossiblyMaliciousPositionInfo(positions) {
  var tokenIdsToPositionInfo = useMemo(function () {
    return positions ? positions.reduce(function (acc, position) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, position.details.tokenId.toString(), position));
    }, {}) : {};
  }, [positions]);
  var positionDetails = useMemo(function () {
    var _positions$map;
    return (_positions$map = positions === null || positions === void 0 ? void 0 : positions.map(function (position) {
      return position.details;
    })) !== null && _positions$map !== void 0 ? _positions$map : [];
  }, [positions]);
  var filteredPositionDetails = useFilterPossiblyMaliciousPositions(positionDetails);
  return useMemo(function () {
    return filteredPositionDetails.map(function (positionDetails) {
      return tokenIdsToPositionInfo[positionDetails.tokenId.toString()];
    });
  }, [filteredPositionDetails, tokenIdsToPositionInfo]);
}
function Pools(_ref) {
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var _useMultiChainPositio = useMultiChainPositions(account),
    positions = _useMultiChainPositio.positions,
    loading = _useMultiChainPositio.loading;
  var filteredPositions = useFilterPossiblyMaliciousPositionInfo(positions);
  var _useReducer = useReducer(function (showClosed) {
      return !showClosed;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    showClosed = _useReducer2[0],
    toggleShowClosed = _useReducer2[1];
  var _useMemo = useMemo(function () {
      var openPositions = [];
      var closedPositions = [];
      for (var i = 0; i < filteredPositions.length; i++) {
        var position = filteredPositions[i];
        if (position.closed) {
          closedPositions.push(position);
        } else {
          openPositions.push(position);
        }
      }
      return [openPositions, closedPositions];
    }, [filteredPositions]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    openPositions = _useMemo2[0],
    closedPositions = _useMemo2[1];
  var toggleWalletDrawer = useToggleAccountDrawer();
  if (!filteredPositions || loading) {
    return /*#__PURE__*/React__default.createElement(PortfolioSkeleton, null);
  }
  if (filteredPositions.length === 0) {
    return /*#__PURE__*/React__default.createElement(EmptyWalletModule, {
      type: "pool",
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  }
  return /*#__PURE__*/React__default.createElement(PortfolioTabWrapper, null, openPositions.map(function (positionInfo) {
    return /*#__PURE__*/React__default.createElement(PositionListItem, {
      key: positionInfo.details.tokenId.toString() + positionInfo.chainId,
      positionInfo: positionInfo
    });
  }), /*#__PURE__*/React__default.createElement(ExpandoRow, {
    title: i18n._(
    /*i18n*/
    {
      id: "Qi+lxU",
      message: "Closed Positions"
    }),
    isExpanded: showClosed,
    toggle: toggleShowClosed,
    numItems: closedPositions.length
  }, closedPositions.map(function (positionInfo) {
    return /*#__PURE__*/React__default.createElement(PositionListItem, {
      key: positionInfo.details.tokenId.toString() + positionInfo.chainId,
      positionInfo: positionInfo
    });
  })));
}
var ActiveDot = styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 50%;\n  height: 8px;\n  width: 8px;\n  margin-left: 4px;\n  margin-top: 1px;\n"])), function (_ref2) {
  var theme = _ref2.theme,
    closed = _ref2.closed,
    outOfRange = _ref2.outOfRange;
  return closed ? theme.neutral2 : outOfRange ? theme.deprecated_accentWarning : theme.success;
});
function calculcateLiquidityValue(price0, price1, position) {
  if (!price0 || !price1) return undefined;
  var value0 = parseFloat(position.amount0.toExact()) * price0;
  var value1 = parseFloat(position.amount1.toExact()) * price1;
  return value0 + value1;
}
function PositionListItem(_ref3) {
  var _pool$token;
  var positionInfo = _ref3.positionInfo;
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  var chainId = positionInfo.chainId,
    position = positionInfo.position,
    pool = positionInfo.pool,
    details = positionInfo.details,
    inRange = positionInfo.inRange,
    closed = positionInfo.closed;
  var _useFeeValues = useFeeValues(positionInfo),
    priceA = _useFeeValues.priceA,
    priceB = _useFeeValues.priceB,
    feeValue = _useFeeValues.fees;
  var liquidityValue = calculcateLiquidityValue(priceA, priceB, position);
  var navigate = useNavigate();
  var toggleWalletDrawer = useToggleAccountDrawer();
  var _useWeb3React = useWeb3React(),
    walletChainId = _useWeb3React.chainId,
    connector = _useWeb3React.connector;
  var switchChain = useSwitchChain();
  var onClick = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(walletChainId !== chainId)) {
            _context.next = 3;
            break;
          }
          _context.next = 3;
          return switchChain(connector, chainId);
        case 3:
          toggleWalletDrawer();
          navigate("/pool/" + details.tokenId);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [walletChainId, chainId, switchChain, connector, toggleWalletDrawer, navigate, details.tokenId]);
  var analyticsEventProperties = useMemo(function () {
    return {
      chain_id: chainId,
      pool_token_0_symbol: pool.token0.symbol,
      pool_token_1_symbol: pool.token1.symbol,
      pool_token_0_address: pool.token0.address,
      pool_token_1_address: pool.token1.address
    };
  }, [chainId, pool.token0.address, pool.token0.symbol, pool.token1.address, pool.token1.symbol]);
  return /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SharedEventName.ELEMENT_CLICKED,
    element: InterfaceElementName.MINI_PORTFOLIO_POOLS_ROW,
    properties: analyticsEventProperties
  }, /*#__PURE__*/React__default.createElement(PortfolioRow, {
    onClick: onClick,
    left: /*#__PURE__*/React__default.createElement(PortfolioLogo, {
      chainId: chainId,
      currencies: [pool.token0, pool.token1]
    }),
    title: /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, pool.token0.symbol, " / ", (_pool$token = pool.token1) === null || _pool$token === void 0 ? void 0 : _pool$token.symbol)),
    descriptor: /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, "".concat(pool.fee / 10000, "%")),
    right: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
      placement: "left",
      text: /*#__PURE__*/React__default.createElement("div", {
        style: {
          padding: "4px 0px"
        }
      }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, "".concat(formatNumber({
        input: liquidityValue,
        type: NumberType.PortfolioBalance
      }), " (liquidity) + ").concat(formatNumber({
        input: feeValue,
        type: NumberType.PortfolioBalance
      }), " (fees)")))
    }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, formatNumber({
      input: (liquidityValue !== null && liquidityValue !== void 0 ? liquidityValue : 0) + (feeValue !== null && feeValue !== void 0 ? feeValue : 0),
      type: NumberType.PortfolioBalance
    }))), /*#__PURE__*/React__default.createElement(Row, {
      justify: "flex-end"
    }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
      color: "neutral2"
    }, closed ? i18n._(
    /*i18n*/
    {
      id: "D87pha",
      message: "Closed"
    }) : inRange ? i18n._(
    /*i18n*/
    {
      id: "vOyUlD",
      message: "In range"
    }) : i18n._(
    /*i18n*/
    {
      id: "i3Z+/Z",
      message: "Out of range"
    })), /*#__PURE__*/React__default.createElement(ActiveDot, {
      closed: closed,
      outOfRange: !inRange
    })))
  }));
}

export { Pools as default };
