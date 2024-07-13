'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var index$4 = require('../../analytics/index.cjs');
var index = require('../Column/index.cjs');
var SpinningLoader = require('../Loader/SpinningLoader.cjs');
var useTransactionDeadline = require('../../hooks/useTransactionDeadline.cjs');
var reactFeather = require('react-feather');
var types = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');
var hooks = require('../../state/user/hooks.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var getRoutingDiagramEntries = require('../../utils/getRoutingDiagramEntries.cjs');
var loggingFormatters = require('../../utils/loggingFormatters.cjs');
var index$1 = require('../Button/index.cjs');
var index$2 = require('../Row/index.cjs');
var styled$1 = require('./styled.cjs');
var SwapLineItem = require('./SwapLineItem.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var DetailsContainer = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 0 8px;\n"])));
var StyledAlertTriangle = styled__default["default"](reactFeather.AlertTriangle)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  margin-right: 8px;\n  min-width: 24px;\n"])));
var ConfirmButton = styled__default["default"](index$1.ButtonError)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: 56px;\n  margin-top: 10px;\n"])));
function SwapModalFooter(_ref) {
  var _useTransactionDeadli;
  var trade = _ref.trade,
    allowedSlippage = _ref.allowedSlippage,
    swapResult = _ref.swapResult,
    onConfirm = _ref.onConfirm,
    swapErrorMessage = _ref.swapErrorMessage,
    disabledConfirm = _ref.disabledConfirm,
    fiatValueInput = _ref.fiatValueInput,
    fiatValueOutput = _ref.fiatValueOutput,
    showAcceptChanges = _ref.showAcceptChanges,
    onAcceptChanges = _ref.onAcceptChanges,
    isLoading = _ref.isLoading;
  var transactionDeadlineSecondsSinceEpoch = (_useTransactionDeadli = useTransactionDeadline()) === null || _useTransactionDeadli === void 0 ? void 0 : _useTransactionDeadli.toNumber(); // in seconds since epoch
  var isAutoSlippage = hooks.useUserSlippageTolerance()[0] === "auto";
  var _useRouterPreference = hooks.useRouterPreference(),
    _useRouterPreference2 = _slicedToArray__default["default"](_useRouterPreference, 1),
    routerPreference = _useRouterPreference2[0];
  var routes = utils.isClassicTrade(trade) ? getRoutingDiagramEntries(trade) : undefined;
  var theme = styled.useTheme();
  var lineItemProps = {
    trade: trade,
    allowedSlippage: allowedSlippage,
    syncing: false
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(DetailsContainer, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.EXCHANGE_RATE
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.PRICE_IMPACT
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.MAX_SLIPPAGE
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.MAXIMUM_INPUT
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.MINIMUM_OUTPUT
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.OUTPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default["default"].createElement(SwapLineItem["default"], _extends__default["default"]({}, lineItemProps, {
    type: SwapLineItem.SwapLineItemType.NETWORK_COST
  }))), showAcceptChanges ? /*#__PURE__*/React__default["default"].createElement(styled$1.SwapShowAcceptChanges, {
    "data-testid": "show-accept-changes"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(StyledAlertTriangle, {
    size: 20
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    color: theme.accent1
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "Ejd0wH",
    message: "Price updated"
  }))), /*#__PURE__*/React__default["default"].createElement(index$1.SmallButtonPrimary, {
    onClick: onAcceptChanges
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "g3UF2V",
    message: "Accept"
  })))) : /*#__PURE__*/React__default["default"].createElement(index$2.AutoRow, null, /*#__PURE__*/React__default["default"].createElement(index$4.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    element: analyticsEvents.InterfaceElementName.CONFIRM_SWAP_BUTTON,
    name: analyticsEvents.SwapEventName.SWAP_SUBMITTED_BUTTON_CLICKED,
    properties: loggingFormatters.formatSwapButtonClickEventProperties({
      trade: trade,
      swapResult: swapResult,
      allowedSlippage: allowedSlippage,
      transactionDeadlineSecondsSinceEpoch: transactionDeadlineSecondsSinceEpoch,
      isAutoSlippage: isAutoSlippage,
      isAutoRouterApi: routerPreference === types.RouterPreference.API,
      routes: routes,
      fiatValueInput: fiatValueInput.data,
      fiatValueOutput: fiatValueOutput.data
    })
  }, /*#__PURE__*/React__default["default"].createElement(ConfirmButton, {
    "data-testid": "confirm-swap-button",
    onClick: onConfirm,
    disabled: disabledConfirm,
    $borderRadius: "12px",
    id: analyticsEvents.InterfaceElementName.CONFIRM_SWAP_BUTTON
  }, isLoading ? /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$2["default"], null, /*#__PURE__*/React__default["default"].createElement(SpinningLoader, null), /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "3aNFm/",
    message: "Finalizing quote..."
  }))) : /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    color: "deprecated_accentTextLightPrimary"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "lQ6r7x",
    message: "Confirm swap"
  })))), swapErrorMessage ? /*#__PURE__*/React__default["default"].createElement(styled$1.SwapCallbackError, {
    error: swapErrorMessage
  }) : null));
}

module.exports = SwapModalFooter;
