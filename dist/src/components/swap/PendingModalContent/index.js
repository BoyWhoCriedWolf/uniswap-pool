import React__default, { useRef, useMemo } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { OrderContent } from '../../AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal.js';
import { ColumnCenter, Column } from '../../Column/index.js';
import Row from '../../Row/index.js';
import { TransactionStatus } from '../../../graphql/data/__generated__/types-and-hooks.js';
import { useUnmountingAnimation } from '../../../hooks/useUnmountingAnimation.js';
import { UniswapXOrderStatus } from '../../../lib/hooks/orders/types.js';
import { TradeFillType } from '../../../state/routing/types.js';
import { useOrder } from '../../../state/signatures/hooks.js';
import { useSwapTransactionStatus, useIsTransactionConfirmed } from '../../../state/transactions/hooks.js';
import styled, { css } from 'styled-components';
import { ExternalLink } from '../../../theme/components/index.js';
import { ThemedText } from '../../../theme/components/text.js';
import { SignatureExpiredError } from '../../../utils/errors.js';
import { getExplorerLink, ExplorerDataType } from '../../../utils/getExplorerLink.js';
import { ConfirmModalState } from '../ConfirmSwapModal.js';
import { slideInAnimation, slideOutAnimation } from './animations.js';
import { AnimationType, LogoContainer, PaperIcon, CurrencyLoader, AnimatedEntranceConfirmationIcon, AnimatedEntranceSubmittedIcon, LoadingIndicatorOverlay } from './Logos.js';
import { TradeSummary } from './TradeSummary.js';
import { TransitionText } from './TransitionText.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var PendingModalContainer = styled(ColumnCenter)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin: 48px 0 8px;\n"])));
var HeaderContainer = styled(ColumnCenter)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", "\n  padding: 0 32px;\n  overflow: visible;\n"])), function (_ref) {
  var $disabled = _ref.$disabled;
  return $disabled && "opacity: 0.5;";
});
var StepCircle = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  background-color: ", ";\n  outline: 3px solid\n    ", ";\n  transition: background-color\n    ", ";\n"])), function (_ref2) {
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
var AnimationWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  min-height: 72px;\n  display: flex;\n  flex-grow: 1;\n"])));
var StepTitleAnimationContainer = styled(Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  transition: display\n    ", ";\n  ", "\n\n  &.", " {\n    ", "\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
}, function (_ref6) {
  var disableEntranceAnimation = _ref6.disableEntranceAnimation;
  return !disableEntranceAnimation && css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n      ", "\n    "])), slideInAnimation);
}, AnimationType.EXITING, slideOutAnimation);

// This component is used for all steps after ConfirmModalState.REVIEWING

function getPendingConfirmationContent(_ref7) {
  var swapConfirmed = _ref7.swapConfirmed,
    swapPending = _ref7.swapPending,
    trade = _ref7.trade,
    chainId = _ref7.chainId,
    swapResult = _ref7.swapResult,
    swapError = _ref7.swapError,
    onRetryUniswapXSignature = _ref7.onRetryUniswapXSignature;
  var title = swapPending ? i18n._(
  /*i18n*/
  {
    id: "Lx+htK",
    message: "Swap submitted"
  }) : swapConfirmed ? i18n._(
  /*i18n*/
  {
    id: "NEk/oT",
    message: "Swap success!"
  }) : i18n._(
  /*i18n*/
  {
    id: "tbOs8j",
    message: "Confirm Swap"
  });
  var tradeSummary = trade ? /*#__PURE__*/React__default.createElement(TradeSummary, {
    trade: trade
  }) : null;
  if (swapPending && (trade === null || trade === void 0 ? void 0 : trade.fillType) === TradeFillType.UniswapX) {
    return {
      title: title,
      subtitle: tradeSummary,
      bottomLabel: /*#__PURE__*/React__default.createElement(ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/17515415311501",
        color: "neutral2"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "B6UqER",
        message: "Learn more about swapping with UniswapX"
      }))
    };
  } else if ((swapPending || swapConfirmed) && chainId && (swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === TradeFillType.Classic) {
    var explorerLink = /*#__PURE__*/React__default.createElement(ExternalLink, {
      href: getExplorerLink(chainId, swapResult.response.hash, ExplorerDataType.TRANSACTION),
      color: "neutral2"
    }, /*#__PURE__*/React__default.createElement(Trans, {
      id: "Sjplg3",
      message: "View on Explorer"
    }));
    if (swapPending) {
      // On Mainnet, we show a "submitted" state while the transaction is pending confirmation.
      return {
        title: title,
        subtitle: chainId === ChainId.MAINNET ? explorerLink : tradeSummary,
        bottomLabel: chainId === ChainId.MAINNET ? i18n._(
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
  } else if (swapError instanceof SignatureExpiredError) {
    return {
      title: /*#__PURE__*/React__default.createElement(TransitionText, {
        key: swapError.id,
        initialText: /*#__PURE__*/React__default.createElement(Trans, {
          id: "E2I/E8",
          message: "Time expired"
        }),
        transitionText: /*#__PURE__*/React__default.createElement(Trans, {
          id: "lt9w7z",
          message: "Retry confirmation"
        }),
        onTransition: onRetryUniswapXSignature
      }),
      subtitle: tradeSummary,
      bottomLabel: i18n._(
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
      bottomLabel: i18n._(
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
  return useMemo(function () {
    var _approvalCurrency$sym, _approvalCurrency$sym2;
    return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ConfirmModalState.WRAPPING, {
      title: i18n._(
      /*i18n*/
      {
        id: "r0DyLj",
        message: "Wrap ETH"
      }),
      subtitle: /*#__PURE__*/React__default.createElement(ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/16015852009997"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "biTeKT",
        message: "Why is this required?"
      })),
      bottomLabel: wrapPending ? i18n._(
      /*i18n*/
      {
        id: "NF0e1Q",
        message: "Pending..."
      }) : i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmModalState.RESETTING_TOKEN_ALLOWANCE, {
      title: i18n._(
      /*i18n*/
      {
        id: "Wjrg/3",
        message: "Reset {0}",
        values: {
          "0": approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol
        }
      }),
      subtitle: i18n._(
      /*i18n*/
      {
        id: "vfB+oI",
        message: "{0} requires resetting approval when spending limits are too low.",
        values: {
          "0": approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol
        }
      }),
      bottomLabel: revocationPending ? i18n._(
      /*i18n*/
      {
        id: "NF0e1Q",
        message: "Pending..."
      }) : i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmModalState.APPROVING_TOKEN, {
      title: i18n._(
      /*i18n*/
      {
        id: "bxizPt",
        message: "Enable spending {0} on Uniswap",
        values: {
          "0": (_approvalCurrency$sym = approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol) !== null && _approvalCurrency$sym !== void 0 ? _approvalCurrency$sym : "this token"
        }
      }),
      subtitle: /*#__PURE__*/React__default.createElement(ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/8120520483085"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "biTeKT",
        message: "Why is this required?"
      })),
      bottomLabel: tokenApprovalPending ? i18n._(
      /*i18n*/
      {
        id: "NF0e1Q",
        message: "Pending..."
      }) : i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmModalState.PERMITTING, {
      title: i18n._(
      /*i18n*/
      {
        id: "z053iC",
        message: "Allow {0} to be used for swapping",
        values: {
          "0": (_approvalCurrency$sym2 = approvalCurrency === null || approvalCurrency === void 0 ? void 0 : approvalCurrency.symbol) !== null && _approvalCurrency$sym2 !== void 0 ? _approvalCurrency$sym2 : "this token"
        }
      }),
      subtitle: /*#__PURE__*/React__default.createElement(ExternalLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/8120520483085"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "biTeKT",
        message: "Why is this required?"
      })),
      bottomLabel: i18n._(
      /*i18n*/
      {
        id: "3lNluM",
        message: "Proceed in your wallet"
      })
    }), ConfirmModalState.PENDING_CONFIRMATION, getPendingConfirmationContent({
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
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var swapStatus = useSwapTransactionStatus(swapResult);
  var order = useOrder((swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === TradeFillType.UniswapX ? swapResult.response.orderHash : "");
  var swapConfirmed = swapStatus === TransactionStatus.Confirmed || (order === null || order === void 0 ? void 0 : order.status) === UniswapXOrderStatus.FILLED;
  var wrapConfirmed = useIsTransactionConfirmed(wrapTxHash);
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
  var currentStepContainerRef = useRef(null);
  useUnmountingAnimation(currentStepContainerRef, function () {
    return AnimationType.EXITING;
  });
  if (steps.length === 0) {
    return null;
  }

  // Return finalized-order-specifc content if available
  if (order && order.status !== UniswapXOrderStatus.OPEN) {
    return /*#__PURE__*/React__default.createElement(OrderContent, {
      order: {
        status: order.status,
        orderHash: order.orderHash,
        details: order
      }
    });
  }

  // On mainnet, we show a different icon when the transaction is submitted but pending confirmation.
  var showSubmitted = swapPending && !swapConfirmed && chainId === ChainId.MAINNET;
  var showSuccess = swapConfirmed || chainId !== ChainId.MAINNET && swapPending;
  var transactionPending = revocationPending || tokenApprovalPending || wrapPending || swapPending;
  return /*#__PURE__*/React__default.createElement(PendingModalContainer, {
    gap: "lg"
  }, /*#__PURE__*/React__default.createElement(LogoContainer, null, currentStep === ConfirmModalState.APPROVING_TOKEN && /*#__PURE__*/React__default.createElement(PaperIcon, null), currentStep !== ConfirmModalState.PENDING_CONFIRMATION && /*#__PURE__*/React__default.createElement(CurrencyLoader, {
    currency: trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency,
    asBadge: currentStep === ConfirmModalState.APPROVING_TOKEN
  }), currentStep === ConfirmModalState.PENDING_CONFIRMATION && showSuccess && /*#__PURE__*/React__default.createElement(AnimatedEntranceConfirmationIcon, null), currentStep === ConfirmModalState.PENDING_CONFIRMATION && showSubmitted && /*#__PURE__*/React__default.createElement(AnimatedEntranceSubmittedIcon, null), (currentStep !== ConfirmModalState.PENDING_CONFIRMATION && transactionPending || currentStep === ConfirmModalState.PENDING_CONFIRMATION && !showSuccess && !showSubmitted) && /*#__PURE__*/React__default.createElement(LoadingIndicatorOverlay, null)), /*#__PURE__*/React__default.createElement(HeaderContainer, {
    gap: "md",
    $disabled: transactionPending
  }, /*#__PURE__*/React__default.createElement(AnimationWrapper, null, steps.map(function (step) {
    // We only render one step at a time, but looping through the array allows us to keep
    // the exiting step in the DOM during its animation.
    return Boolean(step === currentStep) && /*#__PURE__*/React__default.createElement(StepTitleAnimationContainer, {
      disableEntranceAnimation: steps[0] === currentStep,
      gap: "md",
      key: step,
      ref: step === currentStep ? currentStepContainerRef : undefined
    }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, {
      width: "100%",
      textAlign: "center",
      "data-testid": "pending-modal-content-title"
    }, stepContents[step].title), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
      textAlign: "center"
    }, stepContents[step].subtitle));
  })), /*#__PURE__*/React__default.createElement(Row, {
    justify: "center",
    marginTop: "32px",
    minHeight: "24px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, stepContents[currentStep].bottomLabel))), stepContents[currentStep].button && /*#__PURE__*/React__default.createElement(Row, {
    justify: "center"
  }, stepContents[currentStep].button), !hideStepIndicators && !showSuccess && /*#__PURE__*/React__default.createElement(Row, {
    gap: "14px",
    justify: "center"
  }, steps.map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(StepCircle, {
      key: i,
      active: steps.indexOf(currentStep) === i
    });
  })));
}

export { PendingModalContainer, PendingModalContent };
