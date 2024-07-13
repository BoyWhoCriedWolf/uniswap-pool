import React__default from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { BrowserEvent, InterfaceElementName, SwapEventName } from '@uniswap/analytics-events';
import { TraceEvent } from '../../analytics/index.js';
import { Column } from '../Column/index.js';
import SpinningLoader from '../Loader/SpinningLoader.js';
import useTransactionDeadline from '../../hooks/useTransactionDeadline.js';
import { AlertTriangle } from 'react-feather';
import { RouterPreference } from '../../state/routing/types.js';
import { isClassicTrade } from '../../state/routing/utils.js';
import { useUserSlippageTolerance, useRouterPreference } from '../../state/user/hooks.js';
import styled, { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import getRoutingDiagramEntries from '../../utils/getRoutingDiagramEntries.js';
import { formatSwapButtonClickEventProperties } from '../../utils/loggingFormatters.js';
import { ButtonError, SmallButtonPrimary } from '../Button/index.js';
import Row, { RowBetween, RowFixed, AutoRow } from '../Row/index.js';
import { SwapShowAcceptChanges, SwapCallbackError } from './styled.js';
import SwapLineItem, { SwapLineItemType } from './SwapLineItem.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3;
var DetailsContainer = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 0 8px;\n"])));
var StyledAlertTriangle = styled(AlertTriangle)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-right: 8px;\n  min-width: 24px;\n"])));
var ConfirmButton = styled(ButtonError)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 56px;\n  margin-top: 10px;\n"])));
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
  var isAutoSlippage = useUserSlippageTolerance()[0] === "auto";
  var _useRouterPreference = useRouterPreference(),
    _useRouterPreference2 = _slicedToArray(_useRouterPreference, 1),
    routerPreference = _useRouterPreference2[0];
  var routes = isClassicTrade(trade) ? getRoutingDiagramEntries(trade) : undefined;
  var theme = useTheme();
  var lineItemProps = {
    trade: trade,
    allowedSlippage: allowedSlippage,
    syncing: false
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DetailsContainer, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.EXCHANGE_RATE
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.PRICE_IMPACT
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.MAX_SLIPPAGE
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.MAXIMUM_INPUT
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.MINIMUM_OUTPUT
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.OUTPUT_TOKEN_FEE_ON_TRANSFER
  })), /*#__PURE__*/React__default.createElement(SwapLineItem, _extends({}, lineItemProps, {
    type: SwapLineItemType.NETWORK_COST
  }))), showAcceptChanges ? /*#__PURE__*/React__default.createElement(SwapShowAcceptChanges, {
    "data-testid": "show-accept-changes"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(StyledAlertTriangle, {
    size: 20
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    color: theme.accent1
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Ejd0wH",
    message: "Price updated"
  }))), /*#__PURE__*/React__default.createElement(SmallButtonPrimary, {
    onClick: onAcceptChanges
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "g3UF2V",
    message: "Accept"
  })))) : /*#__PURE__*/React__default.createElement(AutoRow, null, /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    element: InterfaceElementName.CONFIRM_SWAP_BUTTON,
    name: SwapEventName.SWAP_SUBMITTED_BUTTON_CLICKED,
    properties: formatSwapButtonClickEventProperties({
      trade: trade,
      swapResult: swapResult,
      allowedSlippage: allowedSlippage,
      transactionDeadlineSecondsSinceEpoch: transactionDeadlineSecondsSinceEpoch,
      isAutoSlippage: isAutoSlippage,
      isAutoRouterApi: routerPreference === RouterPreference.API,
      routes: routes,
      fiatValueInput: fiatValueInput.data,
      fiatValueOutput: fiatValueOutput.data
    })
  }, /*#__PURE__*/React__default.createElement(ConfirmButton, {
    "data-testid": "confirm-swap-button",
    onClick: onConfirm,
    disabled: disabledConfirm,
    $borderRadius: "12px",
    id: InterfaceElementName.CONFIRM_SWAP_BUTTON
  }, isLoading ? /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(SpinningLoader, null), /*#__PURE__*/React__default.createElement(Trans, {
    id: "3aNFm/",
    message: "Finalizing quote..."
  }))) : /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    color: "deprecated_accentTextLightPrimary"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "lQ6r7x",
    message: "Confirm swap"
  })))), swapErrorMessage ? /*#__PURE__*/React__default.createElement(SwapCallbackError, {
    error: swapErrorMessage
  }) : null));
}

export { SwapModalFooter as default };
