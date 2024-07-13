'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var index$2 = require('../../analytics/index.cjs');
var index$4 = require('../AnimatedDropdown/index.cjs');
var index$1 = require('../Column/index.cjs');
var styled$1 = require('../Loader/styled.cjs');
var index = require('../Row/index.cjs');
var analytics$1 = require('../../lib/utils/analytics.cjs');
var reactFeather = require('react-feather');
var utils = require('../../state/routing/utils.cjs');
var styled = require('styled-components');
var index$5 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var GasEstimateTooltip = require('./GasEstimateTooltip.cjs');
var SwapLineItem = require('./SwapLineItem.cjs');
var TradePrice = require('./TradePrice.cjs');
var text = require('../../theme/components/text.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledHeaderRow = styled__default["default"](index.RowBetween)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 0;\n  align-items: center;\n  cursor: ", ";\n"])), function (_ref) {
  var disabled = _ref.disabled;
  return disabled ? "initial" : "pointer";
});
var RotatingArrow = styled__default["default"](reactFeather.ChevronDown)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  transform: ", ";\n  transition: transform 0.1s linear;\n"])), function (_ref2) {
  var open = _ref2.open;
  return open ? "rotate(180deg)" : "none";
});
var SwapDetailsWrapper = styled__default["default"](index$1.Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  padding-top: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.grids.md;
});
var Wrapper = styled__default["default"](index$1.Column)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  border-radius: 16px;\n  padding: 12px 16px;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
});
function SwapDetailsDropdown(props) {
  var trade = props.trade,
    syncing = props.syncing,
    loading = props.loading,
    allowedSlippage = props.allowedSlippage;
  var theme = styled.useTheme();
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showDetails = _useState2[0],
    setShowDetails = _useState2[1];
  var trace = analytics.useTrace();
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(index$2.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SwapEventName.SWAP_DETAILS_EXPANDED,
    element: analyticsEvents.InterfaceElementName.SWAP_DETAILS_DROPDOWN,
    properties: _objectSpread(_objectSpread({}, trade ? analytics$1.formatCommonPropertiesForTrade(trade, allowedSlippage) : {}), trace),
    shouldLogImpression: !showDetails
  }, /*#__PURE__*/React__default["default"].createElement(StyledHeaderRow, {
    "data-testid": "swap-details-header-row",
    onClick: function onClick() {
      return setShowDetails(!showDetails);
    },
    disabled: !trade,
    open: showDetails
  }, /*#__PURE__*/React__default["default"].createElement(index.RowFixed, null, trade ? /*#__PURE__*/React__default["default"].createElement(styled$1.LoadingOpacityContainer, {
    $loading: syncing,
    "data-testid": "trade-price-container"
  }, /*#__PURE__*/React__default["default"].createElement(TradePrice, {
    price: trade.executionPrice
  })) : loading || syncing ? /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontSize: 14
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "JdNn1Y",
    message: "Fetching best price..."
  })) : null), /*#__PURE__*/React__default["default"].createElement(index.RowFixed, {
    gap: "xs"
  }, !showDetails && utils.isSubmittableTrade(trade) && /*#__PURE__*/React__default["default"].createElement(GasEstimateTooltip, {
    trade: trade,
    loading: syncing || loading
  }), /*#__PURE__*/React__default["default"].createElement(RotatingArrow, {
    stroke: trade ? theme.neutral3 : theme.surface2,
    open: Boolean(trade && showDetails)
  })))), /*#__PURE__*/React__default["default"].createElement(AdvancedSwapDetails, _extends__default["default"]({}, props, {
    open: showDetails
  })));
}
function AdvancedSwapDetails(props) {
  var open = props.open,
    trade = props.trade,
    allowedSlippage = props.allowedSlippage,
    _props$syncing = props.syncing,
    syncing = _props$syncing === void 0 ? false : _props$syncing;
  var format = formatNumbers.useFormatter();
  if (!trade) return null;
  var lineItemProps = {
    trade: trade,
    allowedSlippage: allowedSlippage,
    format: format,
    syncing: syncing
  };
  return /*#__PURE__*/React__default["default"].createElement(index$4, {
    open: open
  }, /*#__PURE__*/React__default["default"].createElement(SwapDetailsWrapper, {
    gap: "md",
    "data-testid": "advanced-swap-details"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Separator, null), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.PRICE_IMPACT
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.MAX_SLIPPAGE
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.OUTPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.NETWORK_COST
  })), /*#__PURE__*/React__default["default"].createElement(index$5.Separator, null), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.ROUTING_INFO
  }))));
}

module.exports = SwapDetailsDropdown;
