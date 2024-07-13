'use strict';

var React = require('react');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$1 = require('../../../../../node_modules/@lingui/core/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$2 = require('../../../../analytics/index.cjs');
var index = require('../../index.cjs');
var index$3 = require('../../../Row/index.cjs');
var index$4 = require('../../../Tooltip/index.cjs');
var useFilterPossiblyMaliciousPositions = require('../../../../hooks/useFilterPossiblyMaliciousPositions.cjs');
var useSwitchChain = require('../../../../hooks/useSwitchChain.cjs');
var EmptyWalletContent = require('../../../../nft/components/profile/view/EmptyWalletContent.cjs');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var formatNumbers = require('../../../../utils/formatNumbers.cjs');
var ExpandoRow = require('../ExpandoRow.cjs');
var PortfolioLogo = require('../PortfolioLogo.cjs');
var PortfolioRow = require('../PortfolioRow.cjs');
var hooks = require('./hooks.cjs');
var useMultiChainPositions = require('./useMultiChainPositions.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Takes an array of PositionInfo objects (format used by the Uniswap Labs gql API).
 * The hook access PositionInfo.details (format used by the NFT position contract),
 * filters the PositionDetails data for malicious content,
 * and then returns the original data in its original format.
 */
function useFilterPossiblyMaliciousPositionInfo(positions) {
  var tokenIdsToPositionInfo = React.useMemo(function () {
    return positions ? positions.reduce(function (acc, position) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty__default["default"]({}, position.details.tokenId.toString(), position));
    }, {}) : {};
  }, [positions]);
  var positionDetails = React.useMemo(function () {
    var _positions$map;
    return (_positions$map = positions === null || positions === void 0 ? void 0 : positions.map(function (position) {
      return position.details;
    })) !== null && _positions$map !== void 0 ? _positions$map : [];
  }, [positions]);
  var filteredPositionDetails = useFilterPossiblyMaliciousPositions.useFilterPossiblyMaliciousPositions(positionDetails);
  return React.useMemo(function () {
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
  var _useReducer = React.useReducer(function (showClosed) {
      return !showClosed;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    showClosed = _useReducer2[0],
    toggleShowClosed = _useReducer2[1];
  var _useMemo = React.useMemo(function () {
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
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 2),
    openPositions = _useMemo2[0],
    closedPositions = _useMemo2[1];
  var toggleWalletDrawer = index.useToggleAccountDrawer();
  if (!filteredPositions || loading) {
    return /*#__PURE__*/React__default["default"].createElement(PortfolioRow.PortfolioSkeleton, null);
  }
  if (filteredPositions.length === 0) {
    return /*#__PURE__*/React__default["default"].createElement(EmptyWalletContent.EmptyWalletModule, {
      type: "pool",
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  }
  return /*#__PURE__*/React__default["default"].createElement(PortfolioRow.PortfolioTabWrapper, null, openPositions.map(function (positionInfo) {
    return /*#__PURE__*/React__default["default"].createElement(PositionListItem, {
      key: positionInfo.details.tokenId.toString() + positionInfo.chainId,
      positionInfo: positionInfo
    });
  }), /*#__PURE__*/React__default["default"].createElement(ExpandoRow.ExpandoRow, {
    title: index$1.i18n._(
    /*i18n*/
    {
      id: "Qi+lxU",
      message: "Closed Positions"
    }),
    isExpanded: showClosed,
    toggle: toggleShowClosed,
    numItems: closedPositions.length
  }, closedPositions.map(function (positionInfo) {
    return /*#__PURE__*/React__default["default"].createElement(PositionListItem, {
      key: positionInfo.details.tokenId.toString() + positionInfo.chainId,
      positionInfo: positionInfo
    });
  })));
}
var ActiveDot = styled__default["default"].span(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 50%;\n  height: 8px;\n  width: 8px;\n  margin-left: 4px;\n  margin-top: 1px;\n"])), function (_ref2) {
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
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  var chainId = positionInfo.chainId,
    position = positionInfo.position,
    pool = positionInfo.pool,
    details = positionInfo.details,
    inRange = positionInfo.inRange,
    closed = positionInfo.closed;
  var _useFeeValues = hooks.useFeeValues(positionInfo),
    priceA = _useFeeValues.priceA,
    priceB = _useFeeValues.priceB,
    feeValue = _useFeeValues.fees;
  var liquidityValue = calculcateLiquidityValue(priceA, priceB, position);
  var navigate = reactRouterDom.useNavigate();
  var toggleWalletDrawer = index.useToggleAccountDrawer();
  var _useWeb3React = core.useWeb3React(),
    walletChainId = _useWeb3React.chainId,
    connector = _useWeb3React.connector;
  var switchChain = useSwitchChain.useSwitchChain();
  var onClick = React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
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
  var analyticsEventProperties = React.useMemo(function () {
    return {
      chain_id: chainId,
      pool_token_0_symbol: pool.token0.symbol,
      pool_token_1_symbol: pool.token1.symbol,
      pool_token_0_address: pool.token0.address,
      pool_token_1_address: pool.token1.address
    };
  }, [chainId, pool.token0.address, pool.token0.symbol, pool.token1.address, pool.token1.symbol]);
  return /*#__PURE__*/React__default["default"].createElement(index$2.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SharedEventName.ELEMENT_CLICKED,
    element: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_POOLS_ROW,
    properties: analyticsEventProperties
  }, /*#__PURE__*/React__default["default"].createElement(PortfolioRow["default"], {
    onClick: onClick,
    left: /*#__PURE__*/React__default["default"].createElement(PortfolioLogo.PortfolioLogo, {
      chainId: chainId,
      currencies: [pool.token0, pool.token1]
    }),
    title: /*#__PURE__*/React__default["default"].createElement(index$3["default"], null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, pool.token0.symbol, " / ", (_pool$token = pool.token1) === null || _pool$token === void 0 ? void 0 : _pool$token.symbol)),
    descriptor: /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, "".concat(pool.fee / 10000, "%")),
    right: /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$4.MouseoverTooltip, {
      placement: "left",
      text: /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          padding: "4px 0px"
        }
      }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, "".concat(formatNumber({
        input: liquidityValue,
        type: formatNumbers.NumberType.PortfolioBalance
      }), " (liquidity) + ").concat(formatNumber({
        input: feeValue,
        type: formatNumbers.NumberType.PortfolioBalance
      }), " (fees)")))
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, formatNumber({
      input: (liquidityValue !== null && liquidityValue !== void 0 ? liquidityValue : 0) + (feeValue !== null && feeValue !== void 0 ? feeValue : 0),
      type: formatNumbers.NumberType.PortfolioBalance
    }))), /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
      justify: "flex-end"
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
      color: "neutral2"
    }, closed ? index$1.i18n._(
    /*i18n*/
    {
      id: "D87pha",
      message: "Closed"
    }) : inRange ? index$1.i18n._(
    /*i18n*/
    {
      id: "vOyUlD",
      message: "In range"
    }) : index$1.i18n._(
    /*i18n*/
    {
      id: "i3Z+/Z",
      message: "Out of range"
    })), /*#__PURE__*/React__default["default"].createElement(ActiveDot, {
      closed: closed,
      outOfRange: !inRange
    })))
  }));
}

module.exports = Pools;
