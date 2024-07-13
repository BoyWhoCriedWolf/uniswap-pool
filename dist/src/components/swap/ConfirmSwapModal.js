import React__default, { useEffect, useState, useCallback } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { SwapPriceUpdateUserResponse, SwapEventName, InterfaceModalName, InterfaceEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent, Trace } from '../../analytics/index.js';
import Badge from '../Badge/index.js';
import Modal, { MODAL_TRANSITION_DURATION } from '../Modal/index.js';
import { RowFixed } from '../Row/index.js';
import { getChainInfo } from '../../constants/chainInfo.js';
import { TransactionStatus } from '../../graphql/data/__generated__/types-and-hooks.js';
import { useMaxAmountIn } from '../../hooks/useMaxAmountIn.js';
import { AllowanceState } from '../../hooks/usePermit2Allowance.js';
import usePrevious from '../../hooks/usePrevious.js';
import useWrapCallback from '../../hooks/useWrapCallback.js';
import useNativeCurrency from '../../lib/hooks/useNativeCurrency.js';
import { getPriceUpdateBasisPoints } from '../../lib/utils/analytics.js';
import { TradeFillType } from '../../state/routing/types.js';
import { isPreviewTrade } from '../../state/routing/utils.js';
import { Field } from '../../state/swap/actions.js';
import { useSwapTransactionStatus, useIsTransactionConfirmed } from '../../state/transactions/hooks.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import invariant from 'tiny-invariant';
import { isL2ChainId } from '../../utils/chains.js';
import { SignatureExpiredError } from '../../utils/errors.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { formatSwapPriceUpdatedEventProperties } from '../../utils/loggingFormatters.js';
import { didUserReject } from '../../utils/swapErrorToUserReadableMessage.js';
import { tradeMeaningfullyDiffers } from '../../utils/tradeMeaningFullyDiffer.js';
import { ConfirmationModalContent } from '../TransactionConfirmationModal/index.js';
import { RESET_APPROVAL_TOKENS } from './constants.js';
import { PendingModalContent } from './PendingModalContent/index.js';
import { ErrorModalContent, PendingModalError } from './PendingModalContent/ErrorModalContent.js';
import SwapModalFooter from './SwapModalFooter.js';
import SwapModalHeader from './SwapModalHeader.js';
import { ThemedText } from '../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject, _templateObject2;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ConfirmModalState = /*#__PURE__*/function (ConfirmModalState) {
  ConfirmModalState[ConfirmModalState["REVIEWING"] = 0] = "REVIEWING";
  ConfirmModalState[ConfirmModalState["WRAPPING"] = 1] = "WRAPPING";
  ConfirmModalState[ConfirmModalState["RESETTING_TOKEN_ALLOWANCE"] = 2] = "RESETTING_TOKEN_ALLOWANCE";
  ConfirmModalState[ConfirmModalState["APPROVING_TOKEN"] = 3] = "APPROVING_TOKEN";
  ConfirmModalState[ConfirmModalState["PERMITTING"] = 4] = "PERMITTING";
  ConfirmModalState[ConfirmModalState["PENDING_CONFIRMATION"] = 5] = "PENDING_CONFIRMATION";
  return ConfirmModalState;
}({});
var StyledL2Badge = styled(Badge)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 6px 8px;\n"])));
var StyledL2Logo = styled.img(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n"])));
function isInApprovalPhase(confirmModalState) {
  return confirmModalState === ConfirmModalState.RESETTING_TOKEN_ALLOWANCE || confirmModalState === ConfirmModalState.APPROVING_TOKEN || confirmModalState === ConfirmModalState.PERMITTING;
}
function useConfirmModalState(_ref) {
  var trade = _ref.trade,
    allowedSlippage = _ref.allowedSlippage,
    onSwap = _ref.onSwap,
    allowance = _ref.allowance,
    doesTradeDiffer = _ref.doesTradeDiffer,
    onCurrencySelection = _ref.onCurrencySelection;
  var _useState = useState(ConfirmModalState.REVIEWING),
    _useState2 = _slicedToArray(_useState, 2),
    confirmModalState = _useState2[0],
    setConfirmModalState = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    approvalError = _useState4[0],
    setApprovalError = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    pendingModalSteps = _useState6[0],
    setPendingModalSteps = _useState6[1];
  var _useFormatter = useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;

  // This is a function instead of a memoized value because we do _not_ want it to update as the allowance changes.
  // For example, if the user needs to complete 3 steps initially, we should always show 3 step indicators
  // at the bottom of the modal, even after they complete steps 1 and 2.
  var generateRequiredSteps = useCallback(function () {
    var steps = [];
    if (trade.fillType === TradeFillType.UniswapX && trade.wrapInfo.needsWrap) {
      steps.push(ConfirmModalState.WRAPPING);
    }
    if (allowance.state === AllowanceState.REQUIRED && allowance.needsSetupApproval && RESET_APPROVAL_TOKENS.some(function (token) {
      return token.equals(allowance.token);
    }) && allowance.allowedAmount.greaterThan(0)) {
      steps.push(ConfirmModalState.RESETTING_TOKEN_ALLOWANCE);
    }
    if (allowance.state === AllowanceState.REQUIRED && allowance.needsSetupApproval) {
      steps.push(ConfirmModalState.APPROVING_TOKEN);
    }
    if (allowance.state === AllowanceState.REQUIRED && allowance.needsPermitSignature) {
      steps.push(ConfirmModalState.PERMITTING);
    }
    steps.push(ConfirmModalState.PENDING_CONFIRMATION);
    return steps;
  }, [allowance, trade]);
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var trace = useTrace();
  var maximumAmountIn = useMaxAmountIn(trade, allowedSlippage);
  var nativeCurrency = useNativeCurrency(chainId);
  var _useState7 = useState(),
    _useState8 = _slicedToArray(_useState7, 2),
    wrapTxHash = _useState8[0],
    setWrapTxHash = _useState8[1];
  var _useWrapCallback = useWrapCallback(nativeCurrency, trade.inputAmount.currency, formatCurrencyAmount({
      amount: trade.inputAmount,
      type: NumberType.SwapTradeAmount
    })),
    onWrap = _useWrapCallback.execute;
  var wrapConfirmed = useIsTransactionConfirmed(wrapTxHash);
  var prevWrapConfirmed = usePrevious(wrapConfirmed);
  var catchUserReject = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e, errorType) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setConfirmModalState(ConfirmModalState.REVIEWING);
            if (!didUserReject(e)) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            console.error(e);
            setApprovalError(errorType);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function catchUserReject(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var performStep = useCallback( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(step) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = step;
            _context2.next = _context2.t0 === ConfirmModalState.WRAPPING ? 3 : _context2.t0 === ConfirmModalState.RESETTING_TOKEN_ALLOWANCE ? 6 : _context2.t0 === ConfirmModalState.APPROVING_TOKEN ? 10 : _context2.t0 === ConfirmModalState.PERMITTING ? 14 : _context2.t0 === ConfirmModalState.PENDING_CONFIRMATION ? 18 : 21;
            break;
          case 3:
            setConfirmModalState(ConfirmModalState.WRAPPING);
            onWrap === null || onWrap === void 0 || onWrap().then(function (wrapTxHash) {
              setWrapTxHash(wrapTxHash);
              // After the wrap has succeeded, reset the input currency to be WETH
              // because the trade will be on WETH -> token
              onCurrencySelection(Field.INPUT, trade.inputAmount.currency);
              sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, _objectSpread(_objectSpread({
                chain_id: chainId,
                token_symbol: maximumAmountIn === null || maximumAmountIn === void 0 ? void 0 : maximumAmountIn.currency.symbol,
                token_address: maximumAmountIn === null || maximumAmountIn === void 0 ? void 0 : maximumAmountIn.currency.address
              }, trade), trace));
            })["catch"](function (e) {
              return catchUserReject(e, PendingModalError.WRAP_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 6:
            setConfirmModalState(ConfirmModalState.RESETTING_TOKEN_ALLOWANCE);
            invariant(allowance.state === AllowanceState.REQUIRED, "Allowance should be required");
            allowance.revoke()["catch"](function (e) {
              return catchUserReject(e, PendingModalError.TOKEN_APPROVAL_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 10:
            setConfirmModalState(ConfirmModalState.APPROVING_TOKEN);
            invariant(allowance.state === AllowanceState.REQUIRED, "Allowance should be required");
            allowance.approve()["catch"](function (e) {
              return catchUserReject(e, PendingModalError.TOKEN_APPROVAL_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 14:
            setConfirmModalState(ConfirmModalState.PERMITTING);
            invariant(allowance.state === AllowanceState.REQUIRED, "Allowance should be required");
            allowance.permit()["catch"](function (e) {
              return catchUserReject(e, PendingModalError.TOKEN_APPROVAL_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 18:
            setConfirmModalState(ConfirmModalState.PENDING_CONFIRMATION);
            try {
              onSwap();
            } catch (e) {
              catchUserReject(e, PendingModalError.CONFIRMATION_ERROR);
            }
            return _context2.abrupt("break", 23);
          case 21:
            setConfirmModalState(ConfirmModalState.REVIEWING);
            return _context2.abrupt("break", 23);
          case 23:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }(), [allowance, chainId, maximumAmountIn === null || maximumAmountIn === void 0 ? void 0 : maximumAmountIn.currency.address, maximumAmountIn === null || maximumAmountIn === void 0 ? void 0 : maximumAmountIn.currency.symbol, onSwap, onWrap, trace, trade, onCurrencySelection]);
  var startSwapFlow = useCallback(function () {
    var steps = generateRequiredSteps();
    setPendingModalSteps(steps);
    performStep(steps[0]);
  }, [generateRequiredSteps, performStep]);
  var previousSetupApprovalNeeded = usePrevious(allowance.state === AllowanceState.REQUIRED ? allowance.needsSetupApproval : undefined);
  useEffect(function () {
    // If the wrapping step finished, trigger the next step (allowance or swap).
    if (wrapConfirmed && !prevWrapConfirmed) {
      // moves on to either approve WETH or to swap submission
      performStep(pendingModalSteps[1]);
    }
  }, [pendingModalSteps, performStep, prevWrapConfirmed, wrapConfirmed]);
  useEffect(function () {
    if (allowance.state === AllowanceState.REQUIRED && allowance.needsPermitSignature &&
    // If the token approval switched from missing to fulfilled, trigger the next step (permit2 signature).
    !allowance.needsSetupApproval && previousSetupApprovalNeeded) {
      performStep(ConfirmModalState.PERMITTING);
    }
  }, [allowance, performStep, previousSetupApprovalNeeded]);
  var previousRevocationPending = usePrevious(allowance.state === AllowanceState.REQUIRED && allowance.isRevocationPending);
  useEffect(function () {
    if (allowance.state === AllowanceState.REQUIRED && previousRevocationPending && !allowance.isRevocationPending) {
      performStep(ConfirmModalState.APPROVING_TOKEN);
    }
  }, [allowance, performStep, previousRevocationPending]);
  useEffect(function () {
    // Automatically triggers the next phase if the local modal state still thinks we're in the approval phase,
    // but the allowance has been set. This will automaticaly trigger the swap.
    if (isInApprovalPhase(confirmModalState) && allowance.state === AllowanceState.ALLOWED) {
      // Caveat: prevents swap if trade has updated mid approval flow.
      if (doesTradeDiffer) {
        setConfirmModalState(ConfirmModalState.REVIEWING);
        return;
      }
      performStep(ConfirmModalState.PENDING_CONFIRMATION);
    }
  }, [allowance, confirmModalState, doesTradeDiffer, performStep]);
  var onCancel = function onCancel() {
    setConfirmModalState(ConfirmModalState.REVIEWING);
    setApprovalError(undefined);
  };
  return {
    startSwapFlow: startSwapFlow,
    onCancel: onCancel,
    confirmModalState: confirmModalState,
    approvalError: approvalError,
    pendingModalSteps: pendingModalSteps,
    wrapTxHash: wrapTxHash
  };
}
function ConfirmSwapModal(_ref4) {
  var trade = _ref4.trade,
    inputCurrency = _ref4.inputCurrency,
    originalTrade = _ref4.originalTrade,
    onAcceptChanges = _ref4.onAcceptChanges,
    allowedSlippage = _ref4.allowedSlippage,
    allowance = _ref4.allowance,
    clearSwapState = _ref4.clearSwapState,
    onConfirm = _ref4.onConfirm,
    onDismiss = _ref4.onDismiss,
    onCurrencySelection = _ref4.onCurrencySelection,
    swapError = _ref4.swapError,
    swapResult = _ref4.swapResult,
    fiatValueInput = _ref4.fiatValueInput,
    fiatValueOutput = _ref4.fiatValueOutput;
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId;
  var doesTradeDiffer = originalTrade && tradeMeaningfullyDiffers(trade, originalTrade, allowedSlippage);
  var _useConfirmModalState = useConfirmModalState({
      trade: trade,
      allowedSlippage: allowedSlippage,
      onSwap: function onSwap() {
        clearSwapState();
        onConfirm();
      },
      onCurrencySelection: onCurrencySelection,
      allowance: allowance,
      doesTradeDiffer: Boolean(doesTradeDiffer)
    }),
    startSwapFlow = _useConfirmModalState.startSwapFlow,
    onCancel = _useConfirmModalState.onCancel,
    confirmModalState = _useConfirmModalState.confirmModalState,
    approvalError = _useConfirmModalState.approvalError,
    pendingModalSteps = _useConfirmModalState.pendingModalSteps,
    wrapTxHash = _useConfirmModalState.wrapTxHash;
  var swapStatus = useSwapTransactionStatus(swapResult);

  // Swap was reverted onchain.
  var swapReverted = swapStatus === TransactionStatus.Failed;
  // Swap failed locally and was not broadcast to the blockchain.
  var localSwapFailure = Boolean(swapError) && !didUserReject(swapError);
  var swapFailed = localSwapFailure || swapReverted;
  useEffect(function () {
    // Reset the modal state if the user rejected the swap.
    if (swapError && !swapFailed) {
      onCancel();
    }
  }, [onCancel, swapError, swapFailed]);
  var showAcceptChanges = Boolean(trade && doesTradeDiffer && confirmModalState !== ConfirmModalState.PENDING_CONFIRMATION);
  var _useState9 = useState(trade === null || trade === void 0 ? void 0 : trade.executionPrice),
    _useState10 = _slicedToArray(_useState9, 2),
    lastExecutionPrice = _useState10[0],
    setLastExecutionPrice = _useState10[1];
  var _useState11 = useState(),
    _useState12 = _slicedToArray(_useState11, 2),
    priceUpdate = _useState12[0],
    setPriceUpdate = _useState12[1];
  useEffect(function () {
    if (lastExecutionPrice && !trade.executionPrice.equalTo(lastExecutionPrice)) {
      setPriceUpdate(getPriceUpdateBasisPoints(lastExecutionPrice, trade.executionPrice));
      setLastExecutionPrice(trade.executionPrice);
    }
  }, [lastExecutionPrice, setLastExecutionPrice, trade]);
  var onModalDismiss = useCallback(function () {
    if (showAcceptChanges) {
      // If the user dismissed the modal while showing the price update, log the event as rejected.
      sendAnalyticsEvent(SwapEventName.SWAP_PRICE_UPDATE_ACKNOWLEDGED, formatSwapPriceUpdatedEventProperties(trade, priceUpdate, SwapPriceUpdateUserResponse.REJECTED));
    }
    onDismiss();
    setTimeout(function () {
      // Reset local state after the modal dismiss animation finishes, to avoid UI flicker as it dismisses
      onCancel();
    }, MODAL_TRANSITION_DURATION);
  }, [onCancel, onDismiss, priceUpdate, showAcceptChanges, trade]);
  var modalHeader = useCallback(function () {
    if (confirmModalState !== ConfirmModalState.REVIEWING && !showAcceptChanges) {
      return null;
    }
    return /*#__PURE__*/React__default.createElement(SwapModalHeader, {
      inputCurrency: inputCurrency,
      trade: trade,
      allowedSlippage: allowedSlippage
    });
  }, [allowedSlippage, confirmModalState, showAcceptChanges, trade, inputCurrency]);
  var modalBottom = useCallback(function () {
    if (confirmModalState === ConfirmModalState.REVIEWING || showAcceptChanges) {
      return /*#__PURE__*/React__default.createElement(SwapModalFooter, {
        onConfirm: startSwapFlow,
        trade: trade,
        swapResult: swapResult,
        allowedSlippage: allowedSlippage,
        isLoading: isPreviewTrade(trade),
        disabledConfirm: showAcceptChanges || isPreviewTrade(trade) || allowance.state === AllowanceState.LOADING,
        fiatValueInput: fiatValueInput,
        fiatValueOutput: fiatValueOutput,
        showAcceptChanges: showAcceptChanges,
        onAcceptChanges: onAcceptChanges,
        swapErrorMessage: swapFailed ? swapError === null || swapError === void 0 ? void 0 : swapError.message : undefined
      });
    }
    return /*#__PURE__*/React__default.createElement(PendingModalContent, {
      hideStepIndicators: pendingModalSteps.length === 1,
      steps: pendingModalSteps,
      currentStep: confirmModalState,
      trade: trade,
      swapResult: swapResult,
      wrapTxHash: wrapTxHash,
      tokenApprovalPending: allowance.state === AllowanceState.REQUIRED && allowance.isApprovalPending,
      revocationPending: allowance.state === AllowanceState.REQUIRED && allowance.isRevocationPending,
      swapError: swapError,
      onRetryUniswapXSignature: onConfirm
    });
  }, [confirmModalState, showAcceptChanges, pendingModalSteps, trade, swapResult, wrapTxHash, allowance, swapError, startSwapFlow, allowedSlippage, fiatValueInput, fiatValueOutput, onAcceptChanges, swapFailed, onConfirm]);
  var l2Badge = function l2Badge() {
    if (isL2ChainId(chainId) && confirmModalState !== ConfirmModalState.REVIEWING) {
      var info = getChainInfo(chainId);
      return /*#__PURE__*/React__default.createElement(StyledL2Badge, null, /*#__PURE__*/React__default.createElement(RowFixed, {
        "data-testid": "confirmation-modal-chain-icon",
        gap: "sm"
      }, /*#__PURE__*/React__default.createElement(StyledL2Logo, {
        src: info.logoUrl
      }), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, null, info.label)));
    }
    return undefined;
  };
  var getErrorType = function getErrorType() {
    if (approvalError) return approvalError;
    // SignatureExpiredError is a special case. The UI is shown in the PendingModalContent component.
    if (swapError instanceof SignatureExpiredError) return;
    if (swapError && !didUserReject(swapError)) return PendingModalError.CONFIRMATION_ERROR;
    return;
  };
  var errorType = getErrorType();
  return /*#__PURE__*/React__default.createElement(Trace, {
    modal: InterfaceModalName.CONFIRM_SWAP
  }, /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: true,
    $scrollOverlay: true,
    onDismiss: onModalDismiss,
    maxHeight: 90
  }, errorType ? /*#__PURE__*/React__default.createElement(ErrorModalContent, {
    errorType: errorType,
    onRetry: startSwapFlow
  }) : /*#__PURE__*/React__default.createElement(ConfirmationModalContent, {
    title: confirmModalState === ConfirmModalState.REVIEWING ? /*#__PURE__*/React__default.createElement(Trans, {
      id: "pacjvx",
      message: "Review swap"
    }) : undefined,
    onDismiss: onModalDismiss,
    topContent: modalHeader,
    bottomContent: modalBottom,
    headerContent: l2Badge
  })));
}

export { ConfirmModalState, ConfirmSwapModal as default };
