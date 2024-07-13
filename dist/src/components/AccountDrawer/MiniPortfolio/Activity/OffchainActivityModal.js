import React__default, { useCallback, useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { TradeType, CurrencyAmount } from '@uniswap/sdk-core';
import { ReactComponent as SvgUniswapxError } from '../../../../assets/svg/uniswapx_error.svg.js';
import { AutoColumn, Column } from '../../../Column/index.js';
import { OpacityHoverState } from '../../../Common/index.js';
import { LoaderV3 } from '../../../Icons/LoadingSpinner.js';
import Modal from '../../../Modal/index.js';
import { AnimatedEntranceConfirmationIcon, FadePresence } from '../../../swap/PendingModalContent/Logos.js';
import { TradeSummary } from '../../../swap/PendingModalContent/TradeSummary.js';
import { useCurrency } from '../../../../hooks/Tokens.js';
import { atom } from 'jotai';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { UniswapXOrderStatus } from '../../../../lib/hooks/orders/types.js';
import { X } from 'react-feather';
import { useOrder } from '../../../../state/signatures/hooks.js';
import styled from 'styled-components';
import { ExternalLink } from '../../../../theme/components/index.js';
import { getExplorerLink, ExplorerDataType } from '../../../../utils/getExplorerLink.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var selectedOrderAtom = atom(undefined);
function useOpenOffchainActivityModal() {
  var setSelectedOrder = useUpdateAtom(selectedOrderAtom);
  return useCallback(function (order) {
    return setSelectedOrder(_objectSpread(_objectSpread({}, order), {}, {
      modalOpen: true
    }));
  }, [setSelectedOrder]);
}
var Wrapper = styled(AutoColumn).attrs({
  gap: "md",
  grow: true
})(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 16px;\n"])));
var ContentContainer = styled(AutoColumn).attrs({
  justify: "center",
  gap: "md"
})(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 28px 44px 24px 44px;\n"])));
var StyledXButton = styled(X)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  justify-self: flex-end;\n\n  color: ", ";\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
}, OpacityHoverState);
var LoadingWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 52px;\n  height: 52px;\n  position: relative;\n  margin-bottom: 8px;\n"])));
var LoadingIndicator = styled(LoaderV3)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n"])));
function Loader() {
  return /*#__PURE__*/React__default.createElement(LoadingWrapper, null, /*#__PURE__*/React__default.createElement(FadePresence, null, /*#__PURE__*/React__default.createElement(LoadingIndicator, null)));
}
var Success = styled(AnimatedEntranceConfirmationIcon)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  position: relative;\n  margin-bottom: 10px;\n"])));
var LearnMoreLink = styled(ExternalLink)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  font-weight: 535;\n"])));
var DescriptionText = styled(ThemedText.LabelMicro)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  text-align: center;\n"])));
function useOrderAmounts(orderDetails) {
  var _orderDetails$swapInf, _orderDetails$swapInf2;
  var inputCurrency = useCurrency(orderDetails === null || orderDetails === void 0 || (_orderDetails$swapInf = orderDetails.swapInfo) === null || _orderDetails$swapInf === void 0 ? void 0 : _orderDetails$swapInf.inputCurrencyId, orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.chainId);
  var outputCurrency = useCurrency(orderDetails === null || orderDetails === void 0 || (_orderDetails$swapInf2 = orderDetails.swapInfo) === null || _orderDetails$swapInf2 === void 0 ? void 0 : _orderDetails$swapInf2.outputCurrencyId, orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.chainId);
  if (!orderDetails) return undefined;
  if (!inputCurrency || !outputCurrency) {
    console.error("Could not find token(s) for order ".concat(orderDetails.orderHash));
    return undefined;
  }
  var swapInfo = orderDetails.swapInfo;
  if (swapInfo.tradeType === TradeType.EXACT_INPUT) {
    var _swapInfo$settledOutp;
    return {
      inputAmount: CurrencyAmount.fromRawAmount(inputCurrency, swapInfo.inputCurrencyAmountRaw),
      postTaxOutputAmount: CurrencyAmount.fromRawAmount(outputCurrency, (_swapInfo$settledOutp = swapInfo.settledOutputCurrencyAmountRaw) !== null && _swapInfo$settledOutp !== void 0 ? _swapInfo$settledOutp : swapInfo.expectedOutputCurrencyAmountRaw)
    };
  } else {
    return {
      inputAmount: CurrencyAmount.fromRawAmount(inputCurrency, swapInfo.expectedInputCurrencyAmountRaw),
      postTaxOutputAmount: CurrencyAmount.fromRawAmount(outputCurrency, swapInfo.outputCurrencyAmountRaw)
    };
  }
}
function OrderContent(_ref2) {
  var _order$details, _ref3, _amounts$inputAmount$;
  var order = _ref2.order;
  var amounts = useOrderAmounts(order.details);
  var explorerLink = order !== null && order !== void 0 && (_order$details = order.details) !== null && _order$details !== void 0 && _order$details.txHash ? getExplorerLink(order.details.chainId, order.details.txHash, ExplorerDataType.TRANSACTION) : undefined;
  switch (order.status) {
    case UniswapXOrderStatus.OPEN:
      {
        return /*#__PURE__*/React__default.createElement(ContentContainer, null, /*#__PURE__*/React__default.createElement(Loader, null), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default.createElement(Trans, {
          id: "JPHuMW",
          message: "Swapping"
        })), /*#__PURE__*/React__default.createElement(Column, null, amounts && /*#__PURE__*/React__default.createElement(TradeSummary, {
          trade: amounts
        }), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
          paddingTop: "48px",
          textAlign: "center"
        }, /*#__PURE__*/React__default.createElement(ExternalLink, {
          href: "https://support.uniswap.org/hc/en-us/articles/17515415311501"
        }, /*#__PURE__*/React__default.createElement(Trans, {
          id: "B6UqER",
          message: "Learn more about swapping with UniswapX"
        })))));
      }
    case UniswapXOrderStatus.FILLED:
      return /*#__PURE__*/React__default.createElement(ContentContainer, null, /*#__PURE__*/React__default.createElement(Success, null), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default.createElement(Trans, {
        id: "QSh9Sn",
        message: "Swapped"
      })), /*#__PURE__*/React__default.createElement(Column, null, amounts && /*#__PURE__*/React__default.createElement(TradeSummary, {
        trade: amounts
      }), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
        paddingTop: "48px",
        textAlign: "center"
      }, explorerLink && /*#__PURE__*/React__default.createElement(ExternalLink, {
        href: explorerLink
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "Sjplg3",
        message: "View on Explorer"
      })))));
    case UniswapXOrderStatus.CANCELLED:
      return /*#__PURE__*/React__default.createElement(ContentContainer, null, /*#__PURE__*/React__default.createElement(SvgUniswapxError, null), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default.createElement(Trans, {
        id: "vv7kpg",
        message: "Cancelled"
      })), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
        textAlign: "center"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "WCY/ha",
        message: "This order was cancelled"
      })));
    case UniswapXOrderStatus.EXPIRED:
      return /*#__PURE__*/React__default.createElement(ContentContainer, null, /*#__PURE__*/React__default.createElement(SvgUniswapxError, null), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default.createElement(Trans, {
        id: "WPV7sy",
        message: "Swap expired"
      })), /*#__PURE__*/React__default.createElement(DescriptionText, null, /*#__PURE__*/React__default.createElement(Trans, {
        id: "fe7X/y",
        message: "Your swap expired before it could be filled. Try again or"
      }), " ", /*#__PURE__*/React__default.createElement(LearnMoreLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/17515426867213"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "j1sslr",
        message: "learn more."
      }))));
    case UniswapXOrderStatus.ERROR:
      return /*#__PURE__*/React__default.createElement(ContentContainer, null, /*#__PURE__*/React__default.createElement(SvgUniswapxError, null), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default.createElement(Trans, {
        id: "SlfejT",
        message: "Error"
      })), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
        textAlign: "center"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "TtP8r+",
        message: "Your swap couldn't be filled at this time. Try again or"
      }), " ", /*#__PURE__*/React__default.createElement(LearnMoreLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/17515489874189"
      }, /*#__PURE__*/React__default.createElement(Trans, {
        id: "j1sslr",
        message: "learn more."
      }))));
    case UniswapXOrderStatus.INSUFFICIENT_FUNDS:
      return /*#__PURE__*/React__default.createElement(ContentContainer, null, /*#__PURE__*/React__default.createElement(SvgUniswapxError, null), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default.createElement(Trans, {
        id: "kAuVJp",
        message: "Insufficient funds for swap"
      })), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
        textAlign: "center"
      }, i18n._(
      /*i18n*/
      {
        id: "qMeN7I",
        message: "You didn't have enough {0} to complete this swap.",
        values: {
          "0": (_ref3 = (_amounts$inputAmount$ = amounts === null || amounts === void 0 ? void 0 : amounts.inputAmount.currency.symbol) !== null && _amounts$inputAmount$ !== void 0 ? _amounts$inputAmount$ : amounts === null || amounts === void 0 ? void 0 : amounts.inputAmount.currency.name) !== null && _ref3 !== void 0 ? _ref3 : t(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["of the input token"])))
        }
      })));
  }
}

/* Returns the order currently selected in the UI synced with updates from order status polling */
function useSyncedSelectedOrder() {
  var _selectedOrder$orderH;
  var selectedOrder = useAtomValue(selectedOrderAtom);
  var localPendingOrder = useOrder((_selectedOrder$orderH = selectedOrder === null || selectedOrder === void 0 ? void 0 : selectedOrder.orderHash) !== null && _selectedOrder$orderH !== void 0 ? _selectedOrder$orderH : "");
  return useMemo(function () {
    var _localPendingOrder$st;
    if (!selectedOrder) return undefined;
    return _objectSpread(_objectSpread({}, selectedOrder), {}, {
      status: (_localPendingOrder$st = localPendingOrder === null || localPendingOrder === void 0 ? void 0 : localPendingOrder.status) !== null && _localPendingOrder$st !== void 0 ? _localPendingOrder$st : selectedOrder.status,
      details: localPendingOrder
    });
  }, [localPendingOrder, selectedOrder]);
}
function OffchainActivityModal() {
  var syncedSelectedOrder = useSyncedSelectedOrder();
  var setSelectedOrder = useUpdateAtom(selectedOrderAtom);
  var reset = useCallback(function () {
    setSelectedOrder(function (order) {
      return order && _objectSpread(_objectSpread({}, order), {}, {
        modalOpen: false
      });
    });
  }, [setSelectedOrder]);
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: !!(syncedSelectedOrder !== null && syncedSelectedOrder !== void 0 && syncedSelectedOrder.modalOpen),
    onDismiss: reset
  }, /*#__PURE__*/React__default.createElement(Wrapper, {
    "data-testid": "offchain-activity-modal"
  }, /*#__PURE__*/React__default.createElement(StyledXButton, {
    onClick: reset
  }), syncedSelectedOrder && /*#__PURE__*/React__default.createElement(OrderContent, {
    order: syncedSelectedOrder
  })));
}

export { OffchainActivityModal, OrderContent, useOpenOffchainActivityModal };
