'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$5 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$1 = require('../../analytics/index.cjs');
var index = require('../Badge/index.cjs');
var index$2 = require('../Modal/index.cjs');
var index$6 = require('../Row/index.cjs');
var chainInfo = require('../../constants/chainInfo.cjs');
var typesAndHooks = require('../../graphql/data/__generated__/types-and-hooks.cjs');
var useMaxAmountIn = require('../../hooks/useMaxAmountIn.cjs');
var usePermit2Allowance = require('../../hooks/usePermit2Allowance.cjs');
var usePrevious = require('../../hooks/usePrevious.cjs');
var useWrapCallback = require('../../hooks/useWrapCallback.cjs');
var useNativeCurrency = require('../../lib/hooks/useNativeCurrency.cjs');
var analytics = require('../../lib/utils/analytics.cjs');
var types = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');
var actions = require('../../state/swap/actions.cjs');
var hooks = require('../../state/transactions/hooks.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var invariant = require('tiny-invariant');
var chains = require('../../utils/chains.cjs');
var errors = require('../../utils/errors.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var loggingFormatters = require('../../utils/loggingFormatters.cjs');
var swapErrorToUserReadableMessage = require('../../utils/swapErrorToUserReadableMessage.cjs');
var tradeMeaningFullyDiffer = require('../../utils/tradeMeaningFullyDiffer.cjs');
var index$4 = require('../TransactionConfirmationModal/index.cjs');
var constants = require('./constants.cjs');
var index$3 = require('./PendingModalContent/index.cjs');
var ErrorModalContent = require('./PendingModalContent/ErrorModalContent.cjs');
var SwapModalFooter = require('./SwapModalFooter.cjs');
var SwapModalHeader = require('./SwapModalHeader.cjs');
var text = require('../../theme/components/text.cjs');
var analytics$1 = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var invariant__default = /*#__PURE__*/_interopDefaultLegacy(invariant);

var _templateObject, _templateObject2;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ConfirmModalState = /*#__PURE__*/function (ConfirmModalState) {
  ConfirmModalState[ConfirmModalState["REVIEWING"] = 0] = "REVIEWING";
  ConfirmModalState[ConfirmModalState["WRAPPING"] = 1] = "WRAPPING";
  ConfirmModalState[ConfirmModalState["RESETTING_TOKEN_ALLOWANCE"] = 2] = "RESETTING_TOKEN_ALLOWANCE";
  ConfirmModalState[ConfirmModalState["APPROVING_TOKEN"] = 3] = "APPROVING_TOKEN";
  ConfirmModalState[ConfirmModalState["PERMITTING"] = 4] = "PERMITTING";
  ConfirmModalState[ConfirmModalState["PENDING_CONFIRMATION"] = 5] = "PENDING_CONFIRMATION";
  return ConfirmModalState;
}({});
var StyledL2Badge = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 6px 8px;\n"])));
var StyledL2Logo = styled__default["default"].img(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 16px;\n"])));
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
  var _useState = React.useState(ConfirmModalState.REVIEWING),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    confirmModalState = _useState2[0],
    setConfirmModalState = _useState2[1];
  var _useState3 = React.useState(),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    approvalError = _useState4[0],
    setApprovalError = _useState4[1];
  var _useState5 = React.useState([]),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    pendingModalSteps = _useState6[0],
    setPendingModalSteps = _useState6[1];
  var _useFormatter = formatNumbers.useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;

  // This is a function instead of a memoized value because we do _not_ want it to update as the allowance changes.
  // For example, if the user needs to complete 3 steps initially, we should always show 3 step indicators
  // at the bottom of the modal, even after they complete steps 1 and 2.
  var generateRequiredSteps = React.useCallback(function () {
    var steps = [];
    if (trade.fillType === types.TradeFillType.UniswapX && trade.wrapInfo.needsWrap) {
      steps.push(ConfirmModalState.WRAPPING);
    }
    if (allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.needsSetupApproval && constants.RESET_APPROVAL_TOKENS.some(function (token) {
      return token.equals(allowance.token);
    }) && allowance.allowedAmount.greaterThan(0)) {
      steps.push(ConfirmModalState.RESETTING_TOKEN_ALLOWANCE);
    }
    if (allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.needsSetupApproval) {
      steps.push(ConfirmModalState.APPROVING_TOKEN);
    }
    if (allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.needsPermitSignature) {
      steps.push(ConfirmModalState.PERMITTING);
    }
    steps.push(ConfirmModalState.PENDING_CONFIRMATION);
    return steps;
  }, [allowance, trade]);
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var trace = analytics$1.useTrace();
  var maximumAmountIn = useMaxAmountIn.useMaxAmountIn(trade, allowedSlippage);
  var nativeCurrency = useNativeCurrency(chainId);
  var _useState7 = React.useState(),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    wrapTxHash = _useState8[0],
    setWrapTxHash = _useState8[1];
  var _useWrapCallback = useWrapCallback["default"](nativeCurrency, trade.inputAmount.currency, formatCurrencyAmount({
      amount: trade.inputAmount,
      type: formatNumbers.NumberType.SwapTradeAmount
    })),
    onWrap = _useWrapCallback.execute;
  var wrapConfirmed = hooks.useIsTransactionConfirmed(wrapTxHash);
  var prevWrapConfirmed = usePrevious(wrapConfirmed);
  var catchUserReject = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(e, errorType) {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setConfirmModalState(ConfirmModalState.REVIEWING);
            if (!swapErrorToUserReadableMessage.didUserReject(e)) {
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
  var performStep = React.useCallback( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(step) {
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
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
              onCurrencySelection(actions.Field.INPUT, trade.inputAmount.currency);
              index$1.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, _objectSpread(_objectSpread({
                chain_id: chainId,
                token_symbol: maximumAmountIn === null || maximumAmountIn === void 0 ? void 0 : maximumAmountIn.currency.symbol,
                token_address: maximumAmountIn === null || maximumAmountIn === void 0 ? void 0 : maximumAmountIn.currency.address
              }, trade), trace));
            })["catch"](function (e) {
              return catchUserReject(e, ErrorModalContent.PendingModalError.WRAP_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 6:
            setConfirmModalState(ConfirmModalState.RESETTING_TOKEN_ALLOWANCE);
            invariant__default["default"](allowance.state === usePermit2Allowance.AllowanceState.REQUIRED, "Allowance should be required");
            allowance.revoke()["catch"](function (e) {
              return catchUserReject(e, ErrorModalContent.PendingModalError.TOKEN_APPROVAL_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 10:
            setConfirmModalState(ConfirmModalState.APPROVING_TOKEN);
            invariant__default["default"](allowance.state === usePermit2Allowance.AllowanceState.REQUIRED, "Allowance should be required");
            allowance.approve()["catch"](function (e) {
              return catchUserReject(e, ErrorModalContent.PendingModalError.TOKEN_APPROVAL_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 14:
            setConfirmModalState(ConfirmModalState.PERMITTING);
            invariant__default["default"](allowance.state === usePermit2Allowance.AllowanceState.REQUIRED, "Allowance should be required");
            allowance.permit()["catch"](function (e) {
              return catchUserReject(e, ErrorModalContent.PendingModalError.TOKEN_APPROVAL_ERROR);
            });
            return _context2.abrupt("break", 23);
          case 18:
            setConfirmModalState(ConfirmModalState.PENDING_CONFIRMATION);
            try {
              onSwap();
            } catch (e) {
              catchUserReject(e, ErrorModalContent.PendingModalError.CONFIRMATION_ERROR);
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
  var startSwapFlow = React.useCallback(function () {
    var steps = generateRequiredSteps();
    setPendingModalSteps(steps);
    performStep(steps[0]);
  }, [generateRequiredSteps, performStep]);
  var previousSetupApprovalNeeded = usePrevious(allowance.state === usePermit2Allowance.AllowanceState.REQUIRED ? allowance.needsSetupApproval : undefined);
  React.useEffect(function () {
    // If the wrapping step finished, trigger the next step (allowance or swap).
    if (wrapConfirmed && !prevWrapConfirmed) {
      // moves on to either approve WETH or to swap submission
      performStep(pendingModalSteps[1]);
    }
  }, [pendingModalSteps, performStep, prevWrapConfirmed, wrapConfirmed]);
  React.useEffect(function () {
    if (allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.needsPermitSignature &&
    // If the token approval switched from missing to fulfilled, trigger the next step (permit2 signature).
    !allowance.needsSetupApproval && previousSetupApprovalNeeded) {
      performStep(ConfirmModalState.PERMITTING);
    }
  }, [allowance, performStep, previousSetupApprovalNeeded]);
  var previousRevocationPending = usePrevious(allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.isRevocationPending);
  React.useEffect(function () {
    if (allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && previousRevocationPending && !allowance.isRevocationPending) {
      performStep(ConfirmModalState.APPROVING_TOKEN);
    }
  }, [allowance, performStep, previousRevocationPending]);
  React.useEffect(function () {
    // Automatically triggers the next phase if the local modal state still thinks we're in the approval phase,
    // but the allowance has been set. This will automaticaly trigger the swap.
    if (isInApprovalPhase(confirmModalState) && allowance.state === usePermit2Allowance.AllowanceState.ALLOWED) {
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
  var _useWeb3React2 = core.useWeb3React(),
    chainId = _useWeb3React2.chainId;
  var doesTradeDiffer = originalTrade && tradeMeaningFullyDiffer.tradeMeaningfullyDiffers(trade, originalTrade, allowedSlippage);
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
  var swapStatus = hooks.useSwapTransactionStatus(swapResult);

  // Swap was reverted onchain.
  var swapReverted = swapStatus === typesAndHooks.TransactionStatus.Failed;
  // Swap failed locally and was not broadcast to the blockchain.
  var localSwapFailure = Boolean(swapError) && !swapErrorToUserReadableMessage.didUserReject(swapError);
  var swapFailed = localSwapFailure || swapReverted;
  React.useEffect(function () {
    // Reset the modal state if the user rejected the swap.
    if (swapError && !swapFailed) {
      onCancel();
    }
  }, [onCancel, swapError, swapFailed]);
  var showAcceptChanges = Boolean(trade && doesTradeDiffer && confirmModalState !== ConfirmModalState.PENDING_CONFIRMATION);
  var _useState9 = React.useState(trade === null || trade === void 0 ? void 0 : trade.executionPrice),
    _useState10 = _slicedToArray__default["default"](_useState9, 2),
    lastExecutionPrice = _useState10[0],
    setLastExecutionPrice = _useState10[1];
  var _useState11 = React.useState(),
    _useState12 = _slicedToArray__default["default"](_useState11, 2),
    priceUpdate = _useState12[0],
    setPriceUpdate = _useState12[1];
  React.useEffect(function () {
    if (lastExecutionPrice && !trade.executionPrice.equalTo(lastExecutionPrice)) {
      setPriceUpdate(analytics.getPriceUpdateBasisPoints(lastExecutionPrice, trade.executionPrice));
      setLastExecutionPrice(trade.executionPrice);
    }
  }, [lastExecutionPrice, setLastExecutionPrice, trade]);
  var onModalDismiss = React.useCallback(function () {
    if (showAcceptChanges) {
      // If the user dismissed the modal while showing the price update, log the event as rejected.
      index$1.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_PRICE_UPDATE_ACKNOWLEDGED, loggingFormatters.formatSwapPriceUpdatedEventProperties(trade, priceUpdate, analyticsEvents.SwapPriceUpdateUserResponse.REJECTED));
    }
    onDismiss();
    setTimeout(function () {
      // Reset local state after the modal dismiss animation finishes, to avoid UI flicker as it dismisses
      onCancel();
    }, index$2.MODAL_TRANSITION_DURATION);
  }, [onCancel, onDismiss, priceUpdate, showAcceptChanges, trade]);
  var modalHeader = React.useCallback(function () {
    if (confirmModalState !== ConfirmModalState.REVIEWING && !showAcceptChanges) {
      return null;
    }
    return /*#__PURE__*/React__default["default"].createElement(SwapModalHeader, {
      inputCurrency: inputCurrency,
      trade: trade,
      allowedSlippage: allowedSlippage
    });
  }, [allowedSlippage, confirmModalState, showAcceptChanges, trade, inputCurrency]);
  var modalBottom = React.useCallback(function () {
    if (confirmModalState === ConfirmModalState.REVIEWING || showAcceptChanges) {
      return /*#__PURE__*/React__default["default"].createElement(SwapModalFooter, {
        onConfirm: startSwapFlow,
        trade: trade,
        swapResult: swapResult,
        allowedSlippage: allowedSlippage,
        isLoading: utils.isPreviewTrade(trade),
        disabledConfirm: showAcceptChanges || utils.isPreviewTrade(trade) || allowance.state === usePermit2Allowance.AllowanceState.LOADING,
        fiatValueInput: fiatValueInput,
        fiatValueOutput: fiatValueOutput,
        showAcceptChanges: showAcceptChanges,
        onAcceptChanges: onAcceptChanges,
        swapErrorMessage: swapFailed ? swapError === null || swapError === void 0 ? void 0 : swapError.message : undefined
      });
    }
    return /*#__PURE__*/React__default["default"].createElement(index$3.PendingModalContent, {
      hideStepIndicators: pendingModalSteps.length === 1,
      steps: pendingModalSteps,
      currentStep: confirmModalState,
      trade: trade,
      swapResult: swapResult,
      wrapTxHash: wrapTxHash,
      tokenApprovalPending: allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.isApprovalPending,
      revocationPending: allowance.state === usePermit2Allowance.AllowanceState.REQUIRED && allowance.isRevocationPending,
      swapError: swapError,
      onRetryUniswapXSignature: onConfirm
    });
  }, [confirmModalState, showAcceptChanges, pendingModalSteps, trade, swapResult, wrapTxHash, allowance, swapError, startSwapFlow, allowedSlippage, fiatValueInput, fiatValueOutput, onAcceptChanges, swapFailed, onConfirm]);
  var l2Badge = function l2Badge() {
    if (chains.isL2ChainId(chainId) && confirmModalState !== ConfirmModalState.REVIEWING) {
      var info = chainInfo.getChainInfo(chainId);
      return /*#__PURE__*/React__default["default"].createElement(StyledL2Badge, null, /*#__PURE__*/React__default["default"].createElement(index$6.RowFixed, {
        "data-testid": "confirmation-modal-chain-icon",
        gap: "sm"
      }, /*#__PURE__*/React__default["default"].createElement(StyledL2Logo, {
        src: info.logoUrl
      }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, null, info.label)));
    }
    return undefined;
  };
  var getErrorType = function getErrorType() {
    if (approvalError) return approvalError;
    // SignatureExpiredError is a special case. The UI is shown in the PendingModalContent component.
    if (swapError instanceof errors.SignatureExpiredError) return;
    if (swapError && !swapErrorToUserReadableMessage.didUserReject(swapError)) return ErrorModalContent.PendingModalError.CONFIRMATION_ERROR;
    return;
  };
  var errorType = getErrorType();
  return /*#__PURE__*/React__default["default"].createElement(index$1.Trace, {
    modal: analyticsEvents.InterfaceModalName.CONFIRM_SWAP
  }, /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    isOpen: true,
    $scrollOverlay: true,
    onDismiss: onModalDismiss,
    maxHeight: 90
  }, errorType ? /*#__PURE__*/React__default["default"].createElement(ErrorModalContent.ErrorModalContent, {
    errorType: errorType,
    onRetry: startSwapFlow
  }) : /*#__PURE__*/React__default["default"].createElement(index$4.ConfirmationModalContent, {
    title: confirmModalState === ConfirmModalState.REVIEWING ? /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
      id: "pacjvx",
      message: "Review swap"
    }) : undefined,
    onDismiss: onModalDismiss,
    topContent: modalHeader,
    bottomContent: modalBottom,
    headerContent: l2Badge
  })));
}

exports.ConfirmModalState = ConfirmModalState;
exports["default"] = ConfirmSwapModal;
