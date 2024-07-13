'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index$2 = require('../../../../node_modules/@lingui/core/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var OffchainActivityModal = require('../../AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal.cjs');
var index = require('../../Column/index.cjs');
var index$1 = require('../../Row/index.cjs');
var typesAndHooks = require('../../../graphql/data/__generated__/types-and-hooks.cjs');
var useUnmountingAnimation = require('../../../hooks/useUnmountingAnimation.cjs');
var types$1 = require('../../../lib/hooks/orders/types.cjs');
var types = require('../../../state/routing/types.cjs');
var hooks$1 = require('../../../state/signatures/hooks.cjs');
var hooks = require('../../../state/transactions/hooks.cjs');
var styled = require('styled-components');
var index$3 = require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');
var errors = require('../../../utils/errors.cjs');
var getExplorerLink = require('../../../utils/getExplorerLink.cjs');
var ConfirmSwapModal = require('../ConfirmSwapModal.cjs');
var animations = require('./animations.cjs');
var Logos = require('./Logos.cjs');
var TradeSummary = require('./TradeSummary.cjs');
var TransitionText = require('./TransitionText.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var PendingModalContainer = styled__default["default"](index.ColumnCenter)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin: 48px 0 8px;\n"])));
var HeaderContainer = styled__default["default"](index.ColumnCenter)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  padding: 0 32px;\n  overflow: visible;\n"])), function (_ref) {
  var $disabled = _ref.$disabled;
  return $disabled && "opacity: 0.5;";
});
var StepCircle = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  background-color: ", ";\n  outline: 3px solid\n    ", ";\n  transition: background-color\n    ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme,
    active = _ref2.active;
  return active ? theme.accent1 : theme.neutral3;
}, function (_ref3) {
  var theme = _ref3.theme,
    active = _ref3.active;
  return active ? theme.accent2 : theme.deprecated_accentTextLightPrimary;
}, function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var AnimationWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  width: 100%;\n  min-height: 72px;\n  display: flex;\n  flex-grow: 1;\n"])));
var StepTitleAnimationContainer = styled__default["default"](index.Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  transition: display\n    ", ";\n  ", "\n\n  &.", " {\n    ", "\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
}, function (_ref6) {
  var disableEntranceAnimation = _ref6.disableEntranceAnimation;
  return !disableEntranceAnimation && styled.css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n      ", "\n    "])), animations.slideInAnimation);
}, Logos.AnimationType.EXITING, animations.slideOutAnimation);

// This component is used for all steps after ConfirmModalState.REVIEWING

function getPendingConfirmationContent(_ref7) {
  var swapConfirmed = _ref7.swapConfirmed,
    swapPending = _ref7.swapPending,
    trade = _ref7.trade,
    chainId = _ref7.chainId,
    swapResult = _ref7.swapResult,
    swapError = _ref7.swapError,
    onRetryUniswapXSignature = _ref7.onRetryUniswapXSignature;
  var title = swapPending ? index$2.i18n._(
  /*i18n*/
  {
    id: "Lx+htK",
    message: "Swap submitted"
  }) : swapConfirmed ? index$2.i18n._(
  /*i18n*/
  {
    id: "NEk/oT",
    message: "Swap success!"
  }) : index$2.i18n._(
  /*i18n*/
  {
    id: "tbOs8j",
    message: "Confirm Swap"
  });
  var tradeSummary = trade ? /*#__PURE__*/React__default["default"].createElement(TradeSummary.TradeSummary, {
    trade: trade
  }) : null;
  if (swapPending && (trade === null || trade === void 0 ? void 0 : trade.fillType) === types.TradeFillType.UniswapX) {
    return {
      title: title,
      subtitle: tradeSummary,
      bottomLabel: /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/17515415311501",
        color: "neutral2"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "B6UqER",
        message: "Learn more about swapping with UniswapX"
      }))
    };
  } else if ((swapPending || swapConfirmed) && chainId && (swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === types.TradeFillType.Classic) {
    var explorerLink = /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
      href: getExplorerLink.getExplorerLink(chainId, swapResult.response.hash, getExplorerLink.ExplorerDataType.TRANSACTION),
      color: "neutral2"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
      id: "Sjplg3",
      message: "View on Explorer"
    }));
    if (swapPending) {
      // On Mainnet, we show a "submitted" state while the transaction is pending confirmation.
      return {
        title: title,
        subtitle: chainId === sdkCore.ChainId.MAINNET ? explorerLink : tradeSummary,
        bottomLabel: chainId === sdkCore.ChainId.MAINNET ? index$2.i18n._(
        /*i18n*/
        {
          id: "MjfwUk",
          message: "Transaction pending..."
        }) : explorerLink
      };
    } else {
      return {
        title: title,
        subtitle: explorerLink,
        bottomLabel: null
      };
    }
  } else if (swapError instanceof errors.SignatureExpiredError) {
    return {
      title: /*#__PURE__*/React__default["default"].createElement(TransitionText.TransitionText, {
        key: swapError.id,
        initialText: /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
          id: "E2I/E8",
          message: "Time expired"
        }),
        transitionText: /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
          id: "lt9w7z",
          message: "Retry confirmation"
        }),
        onTransition: onRetryUniswapXSignature
      }),
      subtitle: tradeSummary,
      bottomLabel: index$2.i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    };
  } else {
    return {
      title: title,
      subtitle: tradeSummary,
      bottomLabel: index$2.i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    };
  }
}
function useStepContents(args) {
  var wrapPending = args.wrapPending,
    approvalCurrency = args.approvalCurrency,
    swapConfirmed = args.swapConfirmed,
    swapPending = args.swapPending,
    tokenApprovalPending = args.tokenApprovalPending,
    revocationPending = args.revocationPending,
    trade = args.trade,
    swapResult = args.swapResult,
    chainId = args.chainId,
    swapError = args.swapError,
    onRetryUniswapXSignature = args.onRetryUniswapXSignature;
  return React.useMemo(function () {
    var _approvalCurrency$sym, _approvalCurrency$sym2;
    return _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, ConfirmSwapModal.ConfirmModalState.WRAPPING, {
      title: index$2.i18n._(
      /*i18n*/
      {
        id: "r0DyLj",
        message: "Wrap ETH"
      }),
      subtitle: /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/16015852009997"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "biTeKT",
        message: "Why is this required?"
      })),
      bottomLabel: wrapPending ? index$2.i18n._(
      /*i18n*/
      {
        id: "NF0e1Q",
        message: "Pending..."
      }) : index$2.i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmSwapModal.ConfirmModalState.RESETTING_TOKEN_ALLOWANCE, {
      title: index$2.i18n._(
      /*i18n*/
      {
        id: "Wjrg/3",
        message: "Reset {0}",
        values: {
          "0": approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol
        }
      }),
      subtitle: index$2.i18n._(
      /*i18n*/
      {
        id: "vfB+oI",
        message: "{0} requires resetting approval when spending limits are too low.",
        values: {
          "0": approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol
        }
      }),
      bottomLabel: revocationPending ? index$2.i18n._(
      /*i18n*/
      {
        id: "NF0e1Q",
        message: "Pending..."
      }) : index$2.i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmSwapModal.ConfirmModalState.APPROVING_TOKEN, {
      title: index$2.i18n._(
      /*i18n*/
      {
        id: "bxizPt",
        message: "Enable spending {0} on Uniswap",
        values: {
          "0": (_approvalCurrency$sym = approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol) !== null && _approvalCurrency$sym !== void 0 ? _approvalCurrency$sym : "this token"
        }
      }),
      subtitle: /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/8120520483085"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "biTeKT",
        message: "Why is this required?"
      })),
      bottomLabel: tokenApprovalPending ? index$2.i18n._(
      /*i18n*/
      {
        id: "NF0e1Q",
        message: "Pending..."
      }) : index$2.i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmSwapModal.ConfirmModalState.PERMITTING, {
      title: index$2.i18n._(
      /*i18n*/
      {
        id: "z053iC",
        message: "Allow {0} to be used for swapping",
        values: {
          "0": (_approvalCurrency$sym2 = approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol) !== null && _approvalCurrency$sym2 !== void 0 ? _approvalCurrency$sym2 : "this token"
        }
      }),
      subtitle: /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/8120520483085"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "biTeKT",
        message: "Why is this required?"
      })),
      bottomLabel: index$2.i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmSwapModal.ConfirmModalState.PENDING_CONFIRMATION, getPendingConfirmationContent({
      chainId: chainId,
      swapConfirmed: swapConfirmed,
      swapPending: swapPending,
      swapResult: swapResult,
      trade: trade,
      swapError: swapError,
      onRetryUniswapXSignature: onRetryUniswapXSignature
    }));
  }, [approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol, chainId, revocationPending, swapConfirmed, swapPending, swapResult, tokenApprovalPending, trade, wrapPending, swapError, onRetryUniswapXSignature]);
}
function PendingModalContent(_ref9) {
  var steps = _ref9.steps,
    currentStep = _ref9.currentStep,
    trade = _ref9.trade,
    swapResult = _ref9.swapResult,
    wrapTxHash = _ref9.wrapTxHash,
    hideStepIndicators = _ref9.hideStepIndicators,
    _ref9$tokenApprovalPe = _ref9.tokenApprovalPending,
    tokenApprovalPending = _ref9$tokenApprovalPe === void 0 ? false : _ref9$tokenApprovalPe,
    _ref9$revocationPendi = _ref9.revocationPending,
    revocationPending = _ref9$revocationPendi === void 0 ? false : _ref9$revocationPendi,
    swapError = _ref9.swapError,
    onRetryUniswapXSignature = _ref9.onRetryUniswapXSignature;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var swapStatus = hooks.useSwapTransactionStatus(swapResult);
  var order = hooks$1.useOrder((swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === types.TradeFillType.UniswapX ? swapResult.response.orderHash : "");
  var swapConfirmed = swapStatus === typesAndHooks.TransactionStatus.Confirmed || (order === null || order === void 0 ? void 0 : order.status) === types$1.UniswapXOrderStatus.FILLED;
  var wrapConfirmed = hooks.useIsTransactionConfirmed(wrapTxHash);
  var swapPending = swapResult !== undefined && !swapConfirmed;
  var wrapPending = wrapTxHash != undefined && !wrapConfirmed;
  var stepContents = useStepContents({
    approvalCurrency: trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency,
    swapConfirmed: swapConfirmed,
    swapPending: swapPending,
    wrapPending: wrapPending,
    tokenApprovalPending: tokenApprovalPending,
    revocationPending: revocationPending,
    swapResult: swapResult,
    trade: trade,
    chainId: chainId,
    swapError: swapError,
    onRetryUniswapXSignature: onRetryUniswapXSignature
  });
  var currentStepContainerRef = React.useRef(null);
  useUnmountingAnimation.useUnmountingAnimation(currentStepContainerRef, function () {
    return Logos.AnimationType.EXITING;
  });
  if (steps.length === 0) {
    return null;
  }

  // Return finalized-order-specifc content if available
  if (order && order.status !== types$1.UniswapXOrderStatus.OPEN) {
    return /*#__PURE__*/React__default["default"].createElement(OffchainActivityModal.OrderContent, {
      order: {
        status: order.status,
        orderHash: order.orderHash,
        details: order
      }
    });
  }

  // On mainnet, we show a different icon when the transaction is submitted but pending confirmation.
  var showSubmitted = swapPending && !swapConfirmed && chainId === sdkCore.ChainId.MAINNET;
  var showSuccess = swapConfirmed || chainId !== sdkCore.ChainId.MAINNET && swapPending;
  var transactionPending = revocationPending || tokenApprovalPending || wrapPending || swapPending;
  return /*#__PURE__*/React__default["default"].createElement(PendingModalContainer, {
    gap: "lg"
  }, /*#__PURE__*/React__default["default"].createElement(Logos.LogoContainer, null, currentStep === ConfirmSwapModal.ConfirmModalState.APPROVING_TOKEN && /*#__PURE__*/React__default["default"].createElement(Logos.PaperIcon, null), currentStep !== ConfirmSwapModal.ConfirmModalState.PENDING_CONFIRMATION && /*#__PURE__*/React__default["default"].createElement(Logos.CurrencyLoader, {
    currency: trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency,
    asBadge: currentStep === ConfirmSwapModal.ConfirmModalState.APPROVING_TOKEN
  }), currentStep === ConfirmSwapModal.ConfirmModalState.PENDING_CONFIRMATION && showSuccess && /*#__PURE__*/React__default["default"].createElement(Logos.AnimatedEntranceConfirmationIcon, null), currentStep === ConfirmSwapModal.ConfirmModalState.PENDING_CONFIRMATION && showSubmitted && /*#__PURE__*/React__default["default"].createElement(Logos.AnimatedEntranceSubmittedIcon, null), (currentStep !== ConfirmSwapModal.ConfirmModalState.PENDING_CONFIRMATION && transactionPending || currentStep === ConfirmSwapModal.ConfirmModalState.PENDING_CONFIRMATION && !showSuccess && !showSubmitted) && /*#__PURE__*/React__default["default"].createElement(Logos.LoadingIndicatorOverlay, null)), /*#__PURE__*/React__default["default"].createElement(HeaderContainer, {
    gap: "md",
    $disabled: transactionPending
  }, /*#__PURE__*/React__default["default"].createElement(AnimationWrapper, null, steps.map(function (step) {
    // We only render one step at a time, but looping through the array allows us to keep
    // the exiting step in the DOM during its animation.
    return Boolean(step === currentStep) && /*#__PURE__*/React__default["default"].createElement(StepTitleAnimationContainer, {
      disableEntranceAnimation: steps[0] === currentStep,
      gap: "md",
      key: step,
      ref: step === currentStep ? currentStepContainerRef : undefined
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, {
      width: "100%",
      textAlign: "center",
      "data-testid": "pending-modal-content-title"
    }, stepContents[step].title), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
      textAlign: "center"
    }, stepContents[step].subtitle));
  })), /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    justify: "center",
    marginTop: "32px",
    minHeight: "24px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, stepContents[currentStep].bottomLabel))), stepContents[currentStep].button && /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    justify: "center"
  }, stepContents[currentStep].button), !hideStepIndicators && !showSuccess && /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    gap: "14px",
    justify: "center"
  }, steps.map(function (_, i) {
    return /*#__PURE__*/React__default["default"].createElement(StepCircle, {
      key: i,
      active: steps.indexOf(currentStep) === i
    });
  })));
}

exports.PendingModalContainer = PendingModalContainer;
exports.PendingModalContent = PendingModalContent;
