'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../../node_modules/@lingui/core/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var styled$1 = require('../Loader/styled.cjs');
var index$4 = require('../RouterLabel/index.cjs');
var index$1 = require('../Row/index.cjs');
var index$3 = require('../Tooltip/index.cjs');
var chainInfo = require('../../constants/chainInfo.cjs');
var chains = require('../../constants/chains.cjs');
var useHoverProps = require('../../hooks/useHoverProps.cjs');
require('../../nft/hooks/useBag.cjs');
require('../../nft/hooks/useCollectionFilters.cjs');
require('../../nft/hooks/useFiltersExpanded.cjs');
require('../../nft/hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../nft/hooks/useIsMobile.cjs');
require('../../hooks/useScreenSize.cjs');
require('../../nft/hooks/useNFTList.cjs');
require('../../nft/hooks/useProfilePageState.cjs');
require('../../nft/hooks/useSellAsset.cjs');
require('../../nft/hooks/useSendTransaction.cjs');
var React = require('react');
require('../../nft/hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('../../hooks/useUSDPrice.cjs');
require('../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../lib/hooks/useCurrencyBalance.cjs');
require('../../nft/hooks/useWalletCollections.cjs');
var types$1 = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');
var hooks = require('../../state/user/hooks.cjs');
var types = require('../../state/user/types.cjs');
var styled = require('styled-components');
var index$5 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var prices = require('../../utils/prices.cjs');
var GasBreakdownTooltip = require('./GasBreakdownTooltip.cjs');
var MaxSlippageTooltip = require('./MaxSlippageTooltip.cjs');
var SwapRoute = require('./SwapRoute.cjs');
var TradePrice = require('./TradePrice.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var SwapLineItemType = /*#__PURE__*/function (SwapLineItemType) {
  SwapLineItemType[SwapLineItemType["EXCHANGE_RATE"] = 0] = "EXCHANGE_RATE";
  SwapLineItemType[SwapLineItemType["NETWORK_COST"] = 1] = "NETWORK_COST";
  SwapLineItemType[SwapLineItemType["INPUT_TOKEN_FEE_ON_TRANSFER"] = 2] = "INPUT_TOKEN_FEE_ON_TRANSFER";
  SwapLineItemType[SwapLineItemType["OUTPUT_TOKEN_FEE_ON_TRANSFER"] = 3] = "OUTPUT_TOKEN_FEE_ON_TRANSFER";
  SwapLineItemType[SwapLineItemType["PRICE_IMPACT"] = 4] = "PRICE_IMPACT";
  SwapLineItemType[SwapLineItemType["MAX_SLIPPAGE"] = 5] = "MAX_SLIPPAGE";
  SwapLineItemType[SwapLineItemType["MAXIMUM_INPUT"] = 6] = "MAXIMUM_INPUT";
  SwapLineItemType[SwapLineItemType["MINIMUM_OUTPUT"] = 7] = "MINIMUM_OUTPUT";
  SwapLineItemType[SwapLineItemType["ROUTING_INFO"] = 8] = "ROUTING_INFO";
  return SwapLineItemType;
}({});
var DetailRowValue = styled__default["default"](text.ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  text-align: right;\n  overflow-wrap: break-word;\n"])));
var LabelText = styled__default["default"](text.ThemedText.BodySmall)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  cursor: ", ";\n  color: ", ";\n"])), function (_ref) {
  var hasTooltip = _ref.hasTooltip;
  return hasTooltip ? "help" : "auto";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var ColorWrapper = styled__default["default"].span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), function (_ref3) {
  var textColor = _ref3.textColor,
    theme = _ref3.theme;
  return textColor && "color: ".concat(theme[textColor], ";");
});
var AutoBadge = styled__default["default"](text.ThemedText.LabelMicro).attrs({
  fontWeight: 535
})(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  background: ", ";\n  border-radius: 8px;\n  color: ", ";\n  height: 20px;\n  padding: 0 6px;\n\n  ::after {\n    content: \"", "\";\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral2;
}, index.i18n._(
/*i18n*/
{
  id: "R9Khdg",
  message: "Auto"
}));
function FOTTooltipContent() {
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "82bvRD",
    message: "Some tokens take a fee when they are bought or sold, which is set by the token issuer. Uniswap does not receive any of these fees."
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$5.ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/18673568523789-What-is-a-token-fee-"
  }, "Learn more"));
}
function Loading(_ref6) {
  var _ref6$width = _ref6.width,
    width = _ref6$width === void 0 ? 50 : _ref6$width;
  return /*#__PURE__*/React__default["default"].createElement(styled$1.LoadingRow, {
    "data-testid": "loading-row",
    height: 15,
    width: width
  });
}
function ColoredPercentRow(_ref7) {
  var percent = _ref7.percent;
  var _useFormatter = formatNumbers.useFormatter(),
    formatSlippage = _useFormatter.formatSlippage;
  return /*#__PURE__*/React__default["default"].createElement(ColorWrapper, {
    textColor: prices.getPriceImpactColor(percent)
  }, formatSlippage(percent));
}
function CurrencyAmountRow(_ref8) {
  var amount = _ref8.amount;
  var _useFormatter2 = formatNumbers.useFormatter(),
    formatCurrencyAmount = _useFormatter2.formatCurrencyAmount;
  var formattedAmount = formatCurrencyAmount({
    amount: amount,
    type: formatNumbers.NumberType.SwapDetailsAmount
  });
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, "".concat(formattedAmount, " ").concat(amount.currency.symbol));
}
function useLineItem(props) {
  var trade = props.trade,
    syncing = props.syncing,
    allowedSlippage = props.allowedSlippage,
    type = props.type;
  var _useFormatter3 = formatNumbers.useFormatter(),
    formatNumber = _useFormatter3.formatNumber,
    formatSlippage = _useFormatter3.formatSlippage;
  var isAutoSlippage = hooks.useUserSlippageTolerance()[0] === types.SlippageTolerance.Auto;
  var isUniswapX = utils.isUniswapXTrade(trade);
  var isPreview = utils.isPreviewTrade(trade);
  var chainId = trade.inputAmount.currency.chainId;

  // Tracks the latest submittable trade's fill type, used to 'guess' whether or not to show price impact during preview
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    lastSubmittableFillType = _useState2[0],
    setLastSubmittableFillType = _useState2[1];
  React.useEffect(function () {
    if (trade.fillType !== types$1.TradeFillType.None) setLastSubmittableFillType(trade.fillType);
  }, [trade.fillType]);
  switch (type) {
    case SwapLineItemType.EXCHANGE_RATE:
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "fqDzSu",
            message: "Rate"
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default["default"].createElement(TradePrice, {
            price: trade.executionPrice
          });
        },
        TooltipBody: !isPreview ? function () {
          return /*#__PURE__*/React__default["default"].createElement(SwapRoute.RoutingTooltip, {
            trade: trade
          });
        } : undefined,
        tooltipSize: isUniswapX ? index$3.TooltipSize.Small : index$3.TooltipSize.Large
      };
    case SwapLineItemType.NETWORK_COST:
      if (!chains.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId)) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "bZnukT",
            message: "Network cost"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default["default"].createElement(GasBreakdownTooltip.GasBreakdownTooltip, {
            trade: trade,
            hideUniswapXDescription: true
          });
        },
        Value: function Value() {
          var _getChainInfo;
          if (isPreview) return /*#__PURE__*/React__default["default"].createElement(Loading, null);
          return /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
            gap: "4px"
          }, /*#__PURE__*/React__default["default"].createElement("img", {
            src: (_getChainInfo = chainInfo.getChainInfo(chainId)) === null || _getChainInfo === void 0 ? void 0 : _getChainInfo.logoUrl,
            alt: "gas cost icon",
            width: 16,
            height: 16
          }), formatNumber({
            input: trade.totalGasUseEstimateUSD,
            type: formatNumbers.NumberType.FiatGasPrice
          }));
        }
      };
    case SwapLineItemType.PRICE_IMPACT:
      // Hides price impact row if the current trade is UniswapX or we're expecting a preview trade to result in UniswapX
      if (isUniswapX || isPreview && lastSubmittableFillType === types$1.TradeFillType.UniswapX) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "kH6wUX",
            message: "Price impact"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "CzTADT",
            message: "The impact your trade has on the market price of this pool."
          });
        },
        Value: function Value() {
          return isPreview ? /*#__PURE__*/React__default["default"].createElement(Loading, null) : /*#__PURE__*/React__default["default"].createElement(ColoredPercentRow, {
            percent: trade.priceImpact
          });
        }
      };
    case SwapLineItemType.MAX_SLIPPAGE:
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "KtLldi",
            message: "Max. slippage"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default["default"].createElement(MaxSlippageTooltip.MaxSlippageTooltip, props);
        },
        Value: function Value() {
          return /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
            gap: "8px"
          }, isAutoSlippage && /*#__PURE__*/React__default["default"].createElement(AutoBadge, null), " ", formatSlippage(allowedSlippage));
        }
      };
    case SwapLineItemType.MAXIMUM_INPUT:
      if (trade.tradeType === sdkCore.TradeType.EXACT_INPUT) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "AP0x+f",
            message: "Pay at most"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "e3W9HB",
            message: "The maximum amount you are guaranteed to spend. If the price slips any further, your transaction will revert."
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default["default"].createElement(CurrencyAmountRow, {
            amount: trade.maximumAmountIn(allowedSlippage)
          });
        },
        loaderWidth: 70
      };
    case SwapLineItemType.MINIMUM_OUTPUT:
      if (trade.tradeType === sdkCore.TradeType.EXACT_OUTPUT) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "FfY0F3",
            message: "Receive at least"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "epzH8v",
            message: "The minimum amount you are guaranteed to receive. If the price slips any further, your transaction will revert."
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default["default"].createElement(CurrencyAmountRow, {
            amount: trade.minimumAmountOut(allowedSlippage)
          });
        },
        loaderWidth: 70
      };
    case SwapLineItemType.ROUTING_INFO:
      if (isPreview || syncing) return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "oYELUJ",
            message: "Order routing"
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default["default"].createElement(Loading, null);
        }
      };
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "oYELUJ",
            message: "Order routing"
          });
        },
        TooltipBody: function TooltipBody() {
          if (isUniswapX) return /*#__PURE__*/React__default["default"].createElement(GasBreakdownTooltip.UniswapXDescription, null);
          return /*#__PURE__*/React__default["default"].createElement(SwapRoute.SwapRoute, {
            "data-testid": "swap-route-info",
            trade: trade
          });
        },
        tooltipSize: isUniswapX ? index$3.TooltipSize.Small : index$3.TooltipSize.Large,
        Value: function Value() {
          return /*#__PURE__*/React__default["default"].createElement(index$4, {
            trade: trade
          });
        }
      };
    case SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER:
    case SwapLineItemType.OUTPUT_TOKEN_FEE_ON_TRANSFER:
      return getFOTLineItem(props);
  }
}
function getFOTLineItem(_ref9) {
  var type = _ref9.type,
    trade = _ref9.trade;
  var isInput = type === SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER;
  var currency = isInput ? trade.inputAmount.currency : trade.outputAmount.currency;
  var tax = isInput ? trade.inputTax : trade.outputTax;
  if (tax.equalTo(0)) return;
  return {
    Label: function Label() {
      var _ref10, _currency$symbol;
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, index.i18n._(
      /*i18n*/
      {
        id: "v2rZrT",
        message: "{0} fee",
        values: {
          "0": (_ref10 = (_currency$symbol = currency.symbol) !== null && _currency$symbol !== void 0 ? _currency$symbol : currency.name) !== null && _ref10 !== void 0 ? _ref10 : t(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["Token"])))
        }
      }));
    },
    TooltipBody: FOTTooltipContent,
    Value: function Value() {
      return /*#__PURE__*/React__default["default"].createElement(ColoredPercentRow, {
        percent: tax
      });
    }
  };
}
function ValueWrapper(_ref11) {
  var children = _ref11.children,
    lineItem = _ref11.lineItem,
    labelHovered = _ref11.labelHovered,
    syncing = _ref11.syncing;
  var TooltipBody = lineItem.TooltipBody,
    tooltipSize = lineItem.tooltipSize,
    loaderWidth = lineItem.loaderWidth;
  var isMobile = useIsMobile.useIsMobile();
  if (syncing) return /*#__PURE__*/React__default["default"].createElement(Loading, {
    width: loaderWidth
  });
  if (!TooltipBody) return /*#__PURE__*/React__default["default"].createElement(DetailRowValue, null, children);
  return /*#__PURE__*/React__default["default"].createElement(index$3.MouseoverTooltip, {
    placement: isMobile ? "auto" : "right",
    forceShow: labelHovered // displays tooltip when hovering either both label or value
    ,
    size: tooltipSize,
    text: /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Caption, {
      color: "neutral2"
    }, /*#__PURE__*/React__default["default"].createElement(TooltipBody, null))
  }, /*#__PURE__*/React__default["default"].createElement(DetailRowValue, null, children));
}
function SwapLineItem(props) {
  var _useHoverProps = useHoverProps(),
    _useHoverProps2 = _slicedToArray__default["default"](_useHoverProps, 2),
    labelHovered = _useHoverProps2[0],
    hoverProps = _useHoverProps2[1];
  var LineItem = useLineItem(props);
  if (!LineItem) return null;
  return /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(LabelText, _extends__default["default"]({}, hoverProps, {
    hasTooltip: !!LineItem.TooltipBody,
    "data-testid": "swap-li-label"
  }), /*#__PURE__*/React__default["default"].createElement(LineItem.Label, null)), /*#__PURE__*/React__default["default"].createElement(ValueWrapper, {
    lineItem: LineItem,
    labelHovered: labelHovered,
    syncing: props.syncing
  }, /*#__PURE__*/React__default["default"].createElement(LineItem.Value, null)));
}
var SwapLineItem$1 = /*#__PURE__*/React__default["default"].memo(SwapLineItem);

exports.SwapLineItemType = SwapLineItemType;
exports["default"] = SwapLineItem$1;
