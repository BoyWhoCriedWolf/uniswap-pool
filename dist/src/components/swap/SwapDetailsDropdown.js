import React__default, { useState } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { BrowserEvent, SwapEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { TraceEvent } from '../../analytics/index.js';
import AnimatedDropdown from '../AnimatedDropdown/index.js';
import { Column } from '../Column/index.js';
import { LoadingOpacityContainer } from '../Loader/styled.js';
import { RowBetween, RowFixed } from '../Row/index.js';
import { formatCommonPropertiesForTrade } from '../../lib/utils/analytics.js';
import { ChevronDown } from 'react-feather';
import { isSubmittableTrade } from '../../state/routing/utils.js';
import styled, { useTheme } from 'styled-components';
import { Separator } from '../../theme/components/index.js';
import { useFormatter } from '../../utils/formatNumbers.js';
import GasEstimateTooltip from './GasEstimateTooltip.js';
import SwapLineItem, { SwapLineItemType } from './SwapLineItem.js';
import TradePrice from './TradePrice.js';
import { ThemedText } from '../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledHeaderRow = styled(RowBetween)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 0;\n  align-items: center;\n  cursor: ", ";\n"])), function (_ref) {
  var disabled = _ref.disabled;
  return disabled ? "initial" : "pointer";
});
var RotatingArrow = styled(ChevronDown)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  transform: ", ";\n  transition: transform 0.1s linear;\n"])), function (_ref2) {
  var open = _ref2.open;
  return open ? "rotate(180deg)" : "none";
});
var SwapDetailsWrapper = styled(Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding-top: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.grids.md;
});
var Wrapper = styled(Column)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  border-radius: 16px;\n  padding: 12px 16px;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
});
function SwapDetailsDropdown(props) {
  var trade = props.trade,
    syncing = props.syncing,
    loading = props.loading,
    allowedSlippage = props.allowedSlippage;
  var theme = useTheme();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showDetails = _useState2[0],
    setShowDetails = _useState2[1];
  var trace = useTrace();
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SwapEventName.SWAP_DETAILS_EXPANDED,
    element: InterfaceElementName.SWAP_DETAILS_DROPDOWN,
    properties: _objectSpread(_objectSpread({}, trade ? formatCommonPropertiesForTrade(trade, allowedSlippage) : {}), trace),
    shouldLogImpression: !showDetails
  }, /*#__PURE__*/React__default.createElement(StyledHeaderRow, {
    "data-testid": "swap-details-header-row",
    onClick: function onClick() {
      return setShowDetails(!showDetails);
    },
    disabled: !trade,
    open: showDetails
  }, /*#__PURE__*/React__default.createElement(RowFixed, null, trade ? /*#__PURE__*/React__default.createElement(LoadingOpacityContainer, {
    $loading: syncing,
    "data-testid": "trade-price-container"
  }, /*#__PURE__*/React__default.createElement(TradePrice, {
    price: trade.executionPrice
  })) : loading || syncing ? /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontSize: 14
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "JdNn1Y",
    message: "Fetching best price..."
  })) : null), /*#__PURE__*/React__default.createElement(RowFixed, {
    gap: "xs"
  }, !showDetails && isSubmittableTrade(trade) && /*#__PURE__*/React__default.createElement(GasEstimateTooltip, {
    trade: trade,
    loading: syncing || loading
  }), /*#__PURE__*/React__default.createElement(RotatingArrow, {
    stroke: trade ? theme.neutral3 : theme.surface2,
    open: Boolean(trade && showDetails)
  })))), /*#__PURE__*/React__default.createElement(AdvancedSwapDetails, _extends({}, props, {
    open: showDetails
  })));
}
function AdvancedSwapDetails(props) {
  var open = props.open,
    trade = props.trade,
    allowedSlippage = props.allowedSlippage,
    _props$syncing = props.syncing,
    syncing = _props$syncing === void 0 ? false : _props$syncing;
  var format = useFormatter();
  if (!trade) return null;
  var lineItemProps = {
    trade: trade,
    allowedSlippage: allowedSlippage,
    format: format,
    syncing: syncing
  };
  return /*#__PURE__*/React__default.createElement(AnimatedDropdown, {
    open: open
  }, /*#__PURE__*/React__default.createElement(SwapDetailsWrapper, {
    gap: "md",
    "data-testid": "advanced-swap-details"
  }, /*#__PURE__*/React__default.createElement(Separator, null), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.PRICE_IMPACT
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.MAX_SLIPPAGE
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.OUTPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.NETWORK_COST
  })), /*#__PURE__*/React__default.createElement(Separator, null), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.ROUTING_INFO
  }))));
}

export { SwapDetailsDropdown as default };
