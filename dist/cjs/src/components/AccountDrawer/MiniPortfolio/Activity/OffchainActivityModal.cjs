'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index$4 = require('../../../../../node_modules/@lingui/react/dist/index.cjs');
var index$5 = require('../../../../../node_modules/@lingui/core/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var uniswapx_error = require('../../../../assets/svg/uniswapx_error.cjs');
var index = require('../../../Column/index.cjs');
var index$1 = require('../../../Common/index.cjs');
var LoadingSpinner = require('../../../Icons/LoadingSpinner.cjs');
var index$3 = require('../../../Modal/index.cjs');
var Logos = require('../../../swap/PendingModalContent/Logos.cjs');
var TradeSummary = require('../../../swap/PendingModalContent/TradeSummary.cjs');
var Tokens = require('../../../../hooks/Tokens.cjs');
var jotai = require('jotai');
var utils = require('jotai/utils');
var types = require('../../../../lib/hooks/orders/types.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../../../state/signatures/hooks.cjs');
var styled = require('styled-components');
var index$2 = require('../../../../theme/components/index.cjs');
var getExplorerLink = require('../../../../utils/getExplorerLink.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var selectedOrderAtom = jotai.atom(undefined);
function useOpenOffchainActivityModal() {
  var setSelectedOrder = utils.useUpdateAtom(selectedOrderAtom);
  return React.useCallback(function (order) {
    return setSelectedOrder(_objectSpread(_objectSpread({}, order), {}, {
      modalOpen: true
    }));
  }, [setSelectedOrder]);
}
var Wrapper = styled__default["default"](index.AutoColumn).attrs({
  gap: "md",
  grow: true
})(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 16px;\n"])));
var ContentContainer = styled__default["default"](index.AutoColumn).attrs({
  justify: "center",
  gap: "md"
})(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: 28px 44px 24px 44px;\n"])));
var StyledXButton = styled__default["default"](reactFeather.X)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  justify-self: flex-end;\n\n  color: ", ";\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
}, index$1.OpacityHoverState);
var LoadingWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: 52px;\n  height: 52px;\n  position: relative;\n  margin-bottom: 8px;\n"])));
var LoadingIndicator = styled__default["default"](LoadingSpinner.LoaderV3)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n"])));
function Loader() {
  return /*#__PURE__*/React__default["default"].createElement(LoadingWrapper, null, /*#__PURE__*/React__default["default"].createElement(Logos.FadePresence, null, /*#__PURE__*/React__default["default"].createElement(LoadingIndicator, null)));
}
var Success = styled__default["default"](Logos.AnimatedEntranceConfirmationIcon)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  margin-bottom: 10px;\n"])));
var LearnMoreLink = styled__default["default"](index$2.ExternalLink)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n"])));
var DescriptionText = styled__default["default"](text.ThemedText.LabelMicro)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  text-align: center;\n"])));
function useOrderAmounts(orderDetails) {
  var _orderDetails$swapInf, _orderDetails$swapInf2;
  var inputCurrency = Tokens.useCurrency(orderDetails === null || orderDetails === void 0 || (_orderDetails$swapInf = orderDetails.swapInfo) === null || _orderDetails$swapInf === void 0 ? void 0 : _orderDetails$swapInf.inputCurrencyId, orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.chainId);
  var outputCurrency = Tokens.useCurrency(orderDetails === null || orderDetails === void 0 || (_orderDetails$swapInf2 = orderDetails.swapInfo) === null || _orderDetails$swapInf2 === void 0 ? void 0 : _orderDetails$swapInf2.outputCurrencyId, orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.chainId);
  if (!orderDetails) return undefined;
  if (!inputCurrency || !outputCurrency) {
    console.error("Could not find token(s) for order ".concat(orderDetails.orderHash));
    return undefined;
  }
  var swapInfo = orderDetails.swapInfo;
  if (swapInfo.tradeType === sdkCore.TradeType.EXACT_INPUT) {
    var _swapInfo$settledOutp;
    return {
      inputAmount: sdkCore.CurrencyAmount.fromRawAmount(inputCurrency, swapInfo.inputCurrencyAmountRaw),
      postTaxOutputAmount: sdkCore.CurrencyAmount.fromRawAmount(outputCurrency, (_swapInfo$settledOutp = swapInfo.settledOutputCurrencyAmountRaw) !== null && _swapInfo$settledOutp !== void 0 ? _swapInfo$settledOutp : swapInfo.expectedOutputCurrencyAmountRaw)
    };
  } else {
    return {
      inputAmount: sdkCore.CurrencyAmount.fromRawAmount(inputCurrency, swapInfo.expectedInputCurrencyAmountRaw),
      postTaxOutputAmount: sdkCore.CurrencyAmount.fromRawAmount(outputCurrency, swapInfo.outputCurrencyAmountRaw)
    };
  }
}
function OrderContent(_ref2) {
  var _order$details, _ref3, _amounts$inputAmount$;
  var order = _ref2.order;
  var amounts = useOrderAmounts(order.details);
  var explorerLink = order !== null && order !== void 0 && (_order$details = order.details) !== null && _order$details !== void 0 && _order$details.txHash ? getExplorerLink.getExplorerLink(order.details.chainId, order.details.txHash, getExplorerLink.ExplorerDataType.TRANSACTION) : undefined;
  switch (order.status) {
    case types.UniswapXOrderStatus.OPEN:
      {
        return /*#__PURE__*/React__default["default"].createElement(ContentContainer, null, /*#__PURE__*/React__default["default"].createElement(Loader, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
          id: "JPHuMW",
          message: "Swapping"
        })), /*#__PURE__*/React__default["default"].createElement(index.Column, null, amounts && /*#__PURE__*/React__default["default"].createElement(TradeSummary.TradeSummary, {
          trade: amounts
        }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
          paddingTop: "48px",
          textAlign: "center"
        }, /*#__PURE__*/React__default["default"].createElement(index$2.ExternalLink, {
          href: "https://support.uniswap.org/hc/en-us/articles/17515415311501"
        }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
          id: "B6UqER",
          message: "Learn more about swapping with UniswapX"
        })))));
      }
    case types.UniswapXOrderStatus.FILLED:
      return /*#__PURE__*/React__default["default"].createElement(ContentContainer, null, /*#__PURE__*/React__default["default"].createElement(Success, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "QSh9Sn",
        message: "Swapped"
      })), /*#__PURE__*/React__default["default"].createElement(index.Column, null, amounts && /*#__PURE__*/React__default["default"].createElement(TradeSummary.TradeSummary, {
        trade: amounts
      }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
        paddingTop: "48px",
        textAlign: "center"
      }, explorerLink && /*#__PURE__*/React__default["default"].createElement(index$2.ExternalLink, {
        href: explorerLink
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "Sjplg3",
        message: "View on Explorer"
      })))));
    case types.UniswapXOrderStatus.CANCELLED:
      return /*#__PURE__*/React__default["default"].createElement(ContentContainer, null, /*#__PURE__*/React__default["default"].createElement(uniswapx_error.ReactComponent, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "vv7kpg",
        message: "Cancelled"
      })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
        textAlign: "center"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "WCY/ha",
        message: "This order was cancelled"
      })));
    case types.UniswapXOrderStatus.EXPIRED:
      return /*#__PURE__*/React__default["default"].createElement(ContentContainer, null, /*#__PURE__*/React__default["default"].createElement(uniswapx_error.ReactComponent, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "WPV7sy",
        message: "Swap expired"
      })), /*#__PURE__*/React__default["default"].createElement(DescriptionText, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "fe7X/y",
        message: "Your swap expired before it could be filled. Try again or"
      }), " ", /*#__PURE__*/React__default["default"].createElement(LearnMoreLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/17515426867213"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "j1sslr",
        message: "learn more."
      }))));
    case types.UniswapXOrderStatus.ERROR:
      return /*#__PURE__*/React__default["default"].createElement(ContentContainer, null, /*#__PURE__*/React__default["default"].createElement(uniswapx_error.ReactComponent, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "SlfejT",
        message: "Error"
      })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
        textAlign: "center"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "TtP8r+",
        message: "Your swap couldn't be filled at this time. Try again or"
      }), " ", /*#__PURE__*/React__default["default"].createElement(LearnMoreLink, {
        href: "https://support.uniswap.org/hc/en-us/articles/17515489874189"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "j1sslr",
        message: "learn more."
      }))));
    case types.UniswapXOrderStatus.INSUFFICIENT_FUNDS:
      return /*#__PURE__*/React__default["default"].createElement(ContentContainer, null, /*#__PURE__*/React__default["default"].createElement(uniswapx_error.ReactComponent, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
        id: "kAuVJp",
        message: "Insufficient funds for swap"
      })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
        textAlign: "center"
      }, index$5.i18n._(
      /*i18n*/
      {
        id: "qMeN7I",
        message: "You didn't have enough {0} to complete this swap.",
        values: {
          "0": (_ref3 = (_amounts$inputAmount$ = amounts === null || amounts === void 0 ? void 0 : amounts.inputAmount.currency.symbol) !== null && _amounts$inputAmount$ !== void 0 ? _amounts$inputAmount$ : amounts === null || amounts === void 0 ? void 0 : amounts.inputAmount.currency.name) !== null && _ref3 !== void 0 ? _ref3 : t(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["of the input token"])))
        }
      })));
  }
}

/* Returns the order currently selected in the UI synced with updates from order status polling */
function useSyncedSelectedOrder() {
  var _selectedOrder$orderH;
  var selectedOrder = utils.useAtomValue(selectedOrderAtom);
  var localPendingOrder = hooks.useOrder((_selectedOrder$orderH = selectedOrder === null || selectedOrder === void 0 ? void 0 : selectedOrder.orderHash) !== null && _selectedOrder$orderH !== void 0 ? _selectedOrder$orderH : "");
  return React.useMemo(function () {
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
  var setSelectedOrder = utils.useUpdateAtom(selectedOrderAtom);
  var reset = React.useCallback(function () {
    setSelectedOrder(function (order) {
      return order && _objectSpread(_objectSpread({}, order), {}, {
        modalOpen: false
      });
    });
  }, [setSelectedOrder]);
  return /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
    isOpen: !!(syncedSelectedOrder !== null && syncedSelectedOrder !== void 0 && syncedSelectedOrder.modalOpen),
    onDismiss: reset
  }, /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    "data-testid": "offchain-activity-modal"
  }, /*#__PURE__*/React__default["default"].createElement(StyledXButton, {
    onClick: reset
  }), syncedSelectedOrder && /*#__PURE__*/React__default["default"].createElement(OrderContent, {
    order: syncedSelectedOrder
  })));
}

exports.OffchainActivityModal = OffchainActivityModal;
exports.OrderContent = OrderContent;
exports.useOpenOffchainActivityModal = useOpenOffchainActivityModal;
