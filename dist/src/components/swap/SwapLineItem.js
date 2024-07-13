import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { TradeType } from '@uniswap/sdk-core';
import { LoadingRow } from '../Loader/styled.js';
import RouterLabel from '../RouterLabel/index.js';
import Row, { RowBetween } from '../Row/index.js';
import { TooltipSize, MouseoverTooltip } from '../Tooltip/index.js';
import { getChainInfo } from '../../constants/chainInfo.js';
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from '../../constants/chains.js';
import useHoverProps from '../../hooks/useHoverProps.js';
import '../../nft/hooks/useBag.js';
import '../../nft/hooks/useCollectionFilters.js';
import '../../nft/hooks/useFiltersExpanded.js';
import '../../nft/hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../nft/hooks/useIsMobile.js';
import '../../hooks/useScreenSize.js';
import '../../nft/hooks/useNFTList.js';
import '../../nft/hooks/useProfilePageState.js';
import '../../nft/hooks/useSellAsset.js';
import '../../nft/hooks/useSendTransaction.js';
import React__default, { useState, useEffect } from 'react';
import '../../nft/hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '../../hooks/useUSDPrice.js';
import '../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../lib/hooks/useCurrencyBalance.js';
import '../../nft/hooks/useWalletCollections.js';
import { TradeFillType } from '../../state/routing/types.js';
import { isUniswapXTrade, isPreviewTrade } from '../../state/routing/utils.js';
import { useUserSlippageTolerance } from '../../state/user/hooks.js';
import { SlippageTolerance } from '../../state/user/types.js';
import styled from 'styled-components';
import { ExternalLink } from '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { getPriceImpactColor } from '../../utils/prices.js';
import { UniswapXDescription, GasBreakdownTooltip } from './GasBreakdownTooltip.js';
import { MaxSlippageTooltip } from './MaxSlippageTooltip.js';
import { SwapRoute, RoutingTooltip } from './SwapRoute.js';
import TradePrice from './TradePrice.js';
import { ThemedText } from '../../theme/components/text.js';

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
var DetailRowValue = styled(ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  text-align: right;\n  overflow-wrap: break-word;\n"])));
var LabelText = styled(ThemedText.BodySmall)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  cursor: ", ";\n  color: ", ";\n"])), function (_ref) {
  var hasTooltip = _ref.hasTooltip;
  return hasTooltip ? "help" : "auto";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var ColorWrapper = styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", "\n"])), function (_ref3) {
  var textColor = _ref3.textColor,
    theme = _ref3.theme;
  return textColor && "color: ".concat(theme[textColor], ";");
});
var AutoBadge = styled(ThemedText.LabelMicro).attrs({
  fontWeight: 535
})(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: 8px;\n  color: ", ";\n  height: 20px;\n  padding: 0 6px;\n\n  ::after {\n    content: \"", "\";\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral2;
}, i18n._(
/*i18n*/
{
  id: "R9Khdg",
  message: "Auto"
}));
function FOTTooltipContent() {
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "82bvRD",
    message: "Some tokens take a fee when they are bought or sold, which is set by the token issuer. Uniswap does not receive any of these fees."
  }), " ", /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/18673568523789-What-is-a-token-fee-"
  }, "Learn more"));
}
function Loading(_ref6) {
  var _ref6$width = _ref6.width,
    width = _ref6$width === void 0 ? 50 : _ref6$width;
  return /*#__PURE__*/React__default.createElement(LoadingRow, {
    "data-testid": "loading-row",
    height: 15,
    width: width
  });
}
function ColoredPercentRow(_ref7) {
  var percent = _ref7.percent;
  var _useFormatter = useFormatter(),
    formatSlippage = _useFormatter.formatSlippage;
  return /*#__PURE__*/React__default.createElement(ColorWrapper, {
    textColor: getPriceImpactColor(percent)
  }, formatSlippage(percent));
}
function CurrencyAmountRow(_ref8) {
  var amount = _ref8.amount;
  var _useFormatter2 = useFormatter(),
    formatCurrencyAmount = _useFormatter2.formatCurrencyAmount;
  var formattedAmount = formatCurrencyAmount({
    amount: amount,
    type: NumberType.SwapDetailsAmount
  });
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "".concat(formattedAmount, " ").concat(amount.currency.symbol));
}
function useLineItem(props) {
  var trade = props.trade,
    syncing = props.syncing,
    allowedSlippage = props.allowedSlippage,
    type = props.type;
  var _useFormatter3 = useFormatter(),
    formatNumber = _useFormatter3.formatNumber,
    formatSlippage = _useFormatter3.formatSlippage;
  var isAutoSlippage = useUserSlippageTolerance()[0] === SlippageTolerance.Auto;
  var isUniswapX = isUniswapXTrade(trade);
  var isPreview = isPreviewTrade(trade);
  var chainId = trade.inputAmount.currency.chainId;

  // Tracks the latest submittable trade's fill type, used to 'guess' whether or not to show price impact during preview
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    lastSubmittableFillType = _useState2[0],
    setLastSubmittableFillType = _useState2[1];
  useEffect(function () {
    if (trade.fillType !== TradeFillType.None) setLastSubmittableFillType(trade.fillType);
  }, [trade.fillType]);
  switch (type) {
    case SwapLineItemType.EXCHANGE_RATE:
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "fqDzSu",
            message: "Rate"
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default.createElement(TradePrice, {
            price: trade.executionPrice
          });
        },
        TooltipBody: !isPreview ? function () {
          return /*#__PURE__*/React__default.createElement(RoutingTooltip, {
            trade: trade
          });
        } : undefined,
        tooltipSize: isUniswapX ? TooltipSize.Small : TooltipSize.Large
      };
    case SwapLineItemType.NETWORK_COST:
      if (!SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId)) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "bZnukT",
            message: "Network cost"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default.createElement(GasBreakdownTooltip, {
            trade: trade,
            hideUniswapXDescription: true
          });
        },
        Value: function Value() {
          var _getChainInfo;
          if (isPreview) return /*#__PURE__*/React__default.createElement(Loading, null);
          return /*#__PURE__*/React__default.createElement(Row, {
            gap: "4px"
          }, /*#__PURE__*/React__default.createElement("img", {
            src: (_getChainInfo = getChainInfo(chainId)) === null || _getChainInfo === void 0 ? void 0 : _getChainInfo.logoUrl,
            alt: "gas cost icon",
            width: 16,
            height: 16
          }), formatNumber({
            input: trade.totalGasUseEstimateUSD,
            type: NumberType.FiatGasPrice
          }));
        }
      };
    case SwapLineItemType.PRICE_IMPACT:
      // Hides price impact row if the current trade is UniswapX or we're expecting a preview trade to result in UniswapX
      if (isUniswapX || isPreview && lastSubmittableFillType === TradeFillType.UniswapX) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "kH6wUX",
            message: "Price impact"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "CzTADT",
            message: "The impact your trade has on the market price of this pool."
          });
        },
        Value: function Value() {
          return isPreview ? /*#__PURE__*/React__default.createElement(Loading, null) : /*#__PURE__*/React__default.createElement(ColoredPercentRow, {
            percent: trade.priceImpact
          });
        }
      };
    case SwapLineItemType.MAX_SLIPPAGE:
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "KtLldi",
            message: "Max. slippage"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default.createElement(MaxSlippageTooltip, props);
        },
        Value: function Value() {
          return /*#__PURE__*/React__default.createElement(Row, {
            gap: "8px"
          }, isAutoSlippage && /*#__PURE__*/React__default.createElement(AutoBadge, null), " ", formatSlippage(allowedSlippage));
        }
      };
    case SwapLineItemType.MAXIMUM_INPUT:
      if (trade.tradeType === TradeType.EXACT_INPUT) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "AP0x+f",
            message: "Pay at most"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "e3W9HB",
            message: "The maximum amount you are guaranteed to spend. If the price slips any further, your transaction will revert."
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default.createElement(CurrencyAmountRow, {
            amount: trade.maximumAmountIn(allowedSlippage)
          });
        },
        loaderWidth: 70
      };
    case SwapLineItemType.MINIMUM_OUTPUT:
      if (trade.tradeType === TradeType.EXACT_OUTPUT) return;
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "FfY0F3",
            message: "Receive at least"
          });
        },
        TooltipBody: function TooltipBody() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "epzH8v",
            message: "The minimum amount you are guaranteed to receive. If the price slips any further, your transaction will revert."
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default.createElement(CurrencyAmountRow, {
            amount: trade.minimumAmountOut(allowedSlippage)
          });
        },
        loaderWidth: 70
      };
    case SwapLineItemType.ROUTING_INFO:
      if (isPreview || syncing) return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "oYELUJ",
            message: "Order routing"
          });
        },
        Value: function Value() {
          return /*#__PURE__*/React__default.createElement(Loading, null);
        }
      };
      return {
        Label: function Label() {
          return /*#__PURE__*/React__default.createElement(Trans, {
            id: "oYELUJ",
            message: "Order routing"
          });
        },
        TooltipBody: function TooltipBody() {
          if (isUniswapX) return /*#__PURE__*/React__default.createElement(UniswapXDescription, null);
          return /*#__PURE__*/React__default.createElement(SwapRoute, {
            "data-testid": "swap-route-info",
            trade: trade
          });
        },
        tooltipSize: isUniswapX ? TooltipSize.Small : TooltipSize.Large,
        Value: function Value() {
          return /*#__PURE__*/React__default.createElement(RouterLabel, {
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
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, i18n._(
      /*i18n*/
      {
        id: "v2rZrT",
        message: "{0} fee",
        values: {
          "0": (_ref10 = (_currency$symbol = currency.symbol) !== null && _currency$symbol !== void 0 ? _currency$symbol : currency.name) !== null && _ref10 !== void 0 ? _ref10 : t(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Token"])))
        }
      }));
    },
    TooltipBody: FOTTooltipContent,
    Value: function Value() {
      return /*#__PURE__*/React__default.createElement(ColoredPercentRow, {
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
  var isMobile = useIsMobile();
  if (syncing) return /*#__PURE__*/React__default.createElement(Loading, {
    width: loaderWidth
  });
  if (!TooltipBody) return /*#__PURE__*/React__default.createElement(DetailRowValue, null, children);
  return /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    placement: isMobile ? "auto" : "right",
    forceShow: labelHovered // displays tooltip when hovering either both label or value
    ,
    size: tooltipSize,
    text: /*#__PURE__*/React__default.createElement(ThemedText.Caption, {
      color: "neutral2"
    }, /*#__PURE__*/React__default.createElement(TooltipBody, null))
  }, /*#__PURE__*/React__default.createElement(DetailRowValue, null, children));
}
function SwapLineItem(props) {
  var _useHoverProps = useHoverProps(),
    _useHoverProps2 = _slicedToArray(_useHoverProps, 2),
    labelHovered = _useHoverProps2[0],
    hoverProps = _useHoverProps2[1];
  var LineItem = useLineItem(props);
  if (!LineItem) return null;
  return /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(LabelText, _extends({}, hoverProps, {
    hasTooltip: !!LineItem.TooltipBody,
    "data-testid": "swap-li-label"
  }), /*#__PURE__*/React__default.createElement(LineItem.Label, null)), /*#__PURE__*/React__default.createElement(ValueWrapper, {
    lineItem: LineItem,
    labelHovered: labelHovered,
    syncing: props.syncing
  }, /*#__PURE__*/React__default.createElement(LineItem.Value, null)));
}
var SwapLineItem$1 = /*#__PURE__*/React__default.memo(SwapLineItem);

export { SwapLineItemType, SwapLineItem$1 as default };
