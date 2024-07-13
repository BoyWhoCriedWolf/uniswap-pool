'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index$7 = require('../../../../node_modules/@lingui/core/dist/index.cjs');
var units = require('@ethersproject/units');
var analyticsEvents = require('@uniswap/analytics-events');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var index$5 = require('../../../analytics/index.cjs');
var index$3 = require('../../../components/AccountDrawer/index.cjs');
var index = require('../../../components/Column/index.cjs');
var LoadingSpinner = require('../../../components/Icons/LoadingSpinner.cjs');
var CurrencyLogo = require('../../../components/Logo/CurrencyLogo.cjs');
var index$1 = require('../../../components/Row/index.cjs');
var CurrencySearchModal = require('../../../components/SearchModal/CurrencySearchModal.cjs');
var loading = require('../../../components/Tokens/loading.cjs');
var index$6 = require('../../../components/Tooltip/index.cjs');
var chains = require('../../../constants/chains.cjs');
var NftUniversalRouterAddress = require('../../../graphql/data/nft/NftUniversalRouterAddress.cjs');
var Tokens = require('../../../hooks/Tokens.cjs');
var usePermit2Allowance = require('../../../hooks/usePermit2Allowance.cjs');
var useStablecoinPrice = require('../../../hooks/useStablecoinPrice.cjs');
var useSwitchChain = require('../../../hooks/useSwitchChain.cjs');
var useCurrencyBalance = require('../../../lib/hooks/useCurrencyBalance.cjs');
var tryParseCurrencyAmount = require('../../../lib/utils/tryParseCurrencyAmount.cjs');
var useBag = require('../../hooks/useBag.cjs');
var useBagTotalEthPrice = require('../../hooks/useBagTotalEthPrice.cjs');
var useDerivedPayWithAnyTokenSwapInfo = require('../../hooks/useDerivedPayWithAnyTokenSwapInfo.cjs');
var useFetchAssets = require('../../hooks/useFetchAssets.cjs');
var usePayWithAnyTokenSwap = require('../../hooks/usePayWithAnyTokenSwap.cjs');
var usePriceImpact = require('../../hooks/usePriceImpact.cjs');
var useSubscribeTransactionState = require('../../hooks/useSubscribeTransactionState.cjs');
var useTokenInput = require('../../hooks/useTokenInput.cjs');
var useWalletBalance = require('../../hooks/useWalletBalance.cjs');
var index$2 = require('../../types/checkout/index.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('../icons.cjs');
require('uuid');
var currency = require('../../utils/currency.cjs');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
require('@ethersproject/bignumber');
var reactFeather = require('react-feather');
var types = require('../../../state/routing/types.cjs');
var styled = require('styled-components');
require('../../../theme/components/index.cjs');
var ButtonStates = require('./ButtonStates.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var FooterContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 0px 12px;\n"])));
var Footer = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border-top: 1px solid ", ";\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  margin: 0px 16px 8px;\n  padding: 12px 0px;\n  border-bottom-left-radius: 12px;\n  border-bottom-right-radius: 12px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
});
var FooterHeader = styled__default["default"](index.Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  padding-top: 8px;\n  padding-bottom: 16px;\n"])));
var CurrencyRow = styled__default["default"](index$1["default"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n  align-items: start;\n  gap: 8px;\n"])));
var TotalColumn = styled__default["default"](index.Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  text-align: end;\n  overflow: hidden;\n"])));
var WarningIcon = styled__default["default"](reactFeather.AlertTriangle)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  width: 14px;\n  margin-right: 4px;\n  color: inherit;\n"])));
var WarningText = styled__default["default"](text.ThemedText.BodyPrimary)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  margin-bottom: 10px !important;\n  text-align: center;\n"])), function (_ref3) {
  var $color = _ref3.$color;
  return $color;
});
var HelperText = styled__default["default"](text.ThemedText.BodySmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  margin-bottom: 10px !important;\n"])), function (_ref4) {
  var $color = _ref4.$color;
  return $color;
});
var CurrencyInput = styled__default["default"](index$1["default"])(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  gap: 8px;\n  cursor: pointer;\n"])));
var ActionButton = styled__default["default"].button(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  background: ", ";\n  color: ", ";\n  font-weight: 535;\n  line-height: 24px;\n  font-size: 16px;\n  gap: 16px;\n  justify-content: center;\n  border: none;\n  border-radius: 12px;\n  padding: 12px 0px;\n  cursor: pointer;\n  align-items: center;\n\n  &:disabled {\n    opacity: 0.6;\n    cursor: auto;\n  }\n"])), function (_ref5) {
  var $backgroundColor = _ref5.$backgroundColor;
  return $backgroundColor;
}, function (_ref6) {
  var $color = _ref6.$color;
  return $color;
});
var FiatLoadingBubble = styled__default["default"](loading.LoadingBubble)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 4px;\n  width: 4rem;\n  height: 20px;\n  align-self: end;\n"])));
var PriceImpactContainer = styled__default["default"](index$1["default"])(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  justify-content: flex-end;\n"])));
var PriceImpactRow = styled__default["default"](index$1["default"])(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  gap: 8px;\n"])));
var ValueText = styled__default["default"](text.ThemedText.BodyPrimary)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  line-height: 20px;\n  font-weight: 535;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  scrollbar-width: none;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"])));
var Warning = function Warning(_ref7) {
  var color = _ref7.color,
    children = _ref7.children;
  if (!children) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(WarningText, {
    "data-testid": "nft-buy-button-warning",
    fontSize: "14px",
    lineHeight: "20px",
    $color: color
  }, /*#__PURE__*/React__default["default"].createElement(WarningIcon, null), children);
};
var Helper = function Helper(_ref8) {
  var children = _ref8.children,
    color = _ref8.color;
  if (!children) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(HelperText, {
    lineHeight: "16px",
    $color: color
  }, children);
};
var InputCurrencyValue = function InputCurrencyValue(_ref9) {
  var usingPayWithAnyToken = _ref9.usingPayWithAnyToken,
    totalEthPrice = _ref9.totalEthPrice,
    activeCurrency = _ref9.activeCurrency,
    tradeState = _ref9.tradeState,
    trade = _ref9.trade;
  if (!usingPayWithAnyToken) {
    var _activeCurrency$symbo;
    return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
      lineHeight: "20px",
      fontWeight: "535"
    }, currency.formatWeiToDecimal(totalEthPrice.toString()), "\xA0", (_activeCurrency$symbo = activeCurrency === null || activeCurrency === void 0 ? void 0 : activeCurrency.symbol) !== null && _activeCurrency$symbo !== void 0 ? _activeCurrency$symbo : "ETH");
  }
  if (tradeState === types.TradeState.LOADING && !trade) {
    return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
      color: "neutral3",
      lineHeight: "20px",
      fontWeight: "535"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
      id: "hwuHLB",
      message: "Fetching price..."
    }));
  }
  return /*#__PURE__*/React__default["default"].createElement(ValueText, {
    color: tradeState === types.TradeState.LOADING ? "neutral3" : "neutral1"
  }, currency.ethNumberStandardFormatter(trade === null || trade === void 0 ? void 0 : trade.inputAmount.toExact()));
};
var FiatValue = function FiatValue(_ref10) {
  var usdcValue = _ref10.usdcValue,
    priceImpact = _ref10.priceImpact,
    tradeState = _ref10.tradeState,
    usingPayWithAnyToken = _ref10.usingPayWithAnyToken;
  if (!usdcValue) {
    if (usingPayWithAnyToken && (tradeState === types.TradeState.INVALID || tradeState === types.TradeState.NO_ROUTE_FOUND)) {
      return null;
    }
    return /*#__PURE__*/React__default["default"].createElement(FiatLoadingBubble, null);
  }
  return /*#__PURE__*/React__default["default"].createElement(PriceImpactContainer, null, priceImpact && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$6.MouseoverTooltip, {
    text: index$7.i18n._(
    /*i18n*/
    {
      id: "KaCkzz",
      message: "The estimated difference between the USD values of input and output amounts."
    })
  }, /*#__PURE__*/React__default["default"].createElement(PriceImpactRow, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    color: priceImpact.priceImpactSeverity.color,
    size: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    style: {
      color: priceImpact.priceImpactSeverity.color
    },
    lineHeight: "20px"
  }, "(", /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": priceImpact.displayPercentage()
    }
  }), ")")))), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral3",
    lineHeight: "20px"
  }, "".concat(currency.ethNumberStandardFormatter(usdcValue === null || usdcValue === void 0 ? void 0 : usdcValue.toExact(), true))));
};
var PENDING_BAG_STATUSES = [index$2.BagStatus.FETCHING_ROUTE, index$2.BagStatus.CONFIRMING_IN_WALLET, index$2.BagStatus.FETCHING_FINAL_ROUTE, index$2.BagStatus.PROCESSING_TRANSACTION];
var BagFooter = function BagFooter(_ref11) {
  var setModalIsOpen = _ref11.setModalIsOpen,
    eventProperties = _ref11.eventProperties;
  var toggleWalletDrawer = index$3.useToggleAccountDrawer();
  var theme = styled.useTheme();
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    connector = _useWeb3React.connector;
  var connected = Boolean(account && chainId);
  var totalEthPrice = useBagTotalEthPrice.useBagTotalEthPrice();
  var _useTokenInput = useTokenInput.useTokenInput(function (_ref12) {
      var inputCurrency = _ref12.inputCurrency;
      return {
        inputCurrency: inputCurrency
      };
    }),
    inputCurrency = _useTokenInput.inputCurrency;
  var setInputCurrency = useTokenInput.useTokenInput(function (state) {
    return state.setInputCurrency;
  });
  var defaultCurrency = Tokens.useCurrency("ETH");
  var inputCurrencyBalance = useCurrencyBalance.useTokenBalance(account !== null && account !== void 0 ? account : undefined, !!inputCurrency && inputCurrency.isToken ? inputCurrency : undefined);
  var _useBag = useBag.useBag(function (_ref13) {
      var isLocked = _ref13.isLocked,
        bagStatus = _ref13.bagStatus,
        setBagExpanded = _ref13.setBagExpanded,
        setBagStatus = _ref13.setBagStatus;
      return {
        isLocked: isLocked,
        bagStatus: bagStatus,
        setBagExpanded: setBagExpanded,
        setBagStatus: setBagStatus
      };
    }),
    bagIsLocked = _useBag.isLocked,
    bagStatus = _useBag.bagStatus,
    setBagExpanded = _useBag.setBagExpanded,
    setBagStatus = _useBag.setBagStatus;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    tokenSelectorOpen = _useState2[0],
    setTokenSelectorOpen = _useState2[1];
  var isPending = PENDING_BAG_STATUSES.includes(bagStatus);
  var activeCurrency = inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : defaultCurrency;
  var usingPayWithAnyToken = !!inputCurrency && chainId === sdkCore.ChainId.MAINNET;
  var _useNftUniversalRoute = NftUniversalRouterAddress.useNftUniversalRouterAddress(),
    universalRouterAddress = _useNftUniversalRoute.universalRouterAddress,
    universalRouterAddressIsLoading = _useNftUniversalRoute.universalRouterAddressIsLoading;
  useSubscribeTransactionState.useSubscribeTransactionState(setModalIsOpen);
  var fetchAssets = useFetchAssets.useFetchAssets();
  var parsedOutputAmount = React.useMemo(function () {
    return tryParseCurrencyAmount(units.formatEther(totalEthPrice.toString()), defaultCurrency !== null && defaultCurrency !== void 0 ? defaultCurrency : undefined);
  }, [defaultCurrency, totalEthPrice]);
  var _useDerivedPayWithAny = useDerivedPayWithAnyTokenSwapInfo(usingPayWithAnyToken ? inputCurrency : undefined, parsedOutputAmount),
    tradeState = _useDerivedPayWithAny.state,
    trade = _useDerivedPayWithAny.trade,
    maximumAmountIn = _useDerivedPayWithAny.maximumAmountIn,
    allowedSlippage = _useDerivedPayWithAny.allowedSlippage;
  var allowance = usePermit2Allowance["default"](maximumAmountIn, NftUniversalRouterAddress.getURAddress(chainId, universalRouterAddress), types.TradeFillType.Classic);
  var loadingAllowance = allowance.state === usePermit2Allowance.AllowanceState.LOADING || universalRouterAddressIsLoading;
  usePayWithAnyTokenSwap(trade, allowance, allowedSlippage);
  var priceImpact = usePriceImpact.usePriceImpact(trade);
  var fiatValueTradeInput = useStablecoinPrice.useStablecoinValue(trade === null || trade === void 0 ? void 0 : trade.inputAmount);
  var fiatValueTradeOutput = useStablecoinPrice.useStablecoinValue(parsedOutputAmount);
  var usdcValue = usingPayWithAnyToken ? fiatValueTradeInput : fiatValueTradeOutput;
  var _useWalletBalance = useWalletBalance.useWalletBalance(),
    balanceInEth = _useWalletBalance.balance;
  var sufficientBalance = React.useMemo(function () {
    if (!connected || chainId !== sdkCore.ChainId.MAINNET) {
      return undefined;
    }
    if (inputCurrency) {
      var inputAmount = trade === null || trade === void 0 ? void 0 : trade.inputAmount;
      if (!inputCurrencyBalance || !inputAmount) {
        return undefined;
      }
      return !inputCurrencyBalance.lessThan(inputAmount);
    }
    return units.parseEther(balanceInEth).gte(totalEthPrice);
  }, [connected, chainId, inputCurrency, balanceInEth, totalEthPrice, trade === null || trade === void 0 ? void 0 : trade.inputAmount, inputCurrencyBalance]);
  React.useEffect(function () {
    setBagStatus(index$2.BagStatus.ADDING_TO_BAG);
  }, [inputCurrency, setBagStatus]);
  var switchChain = useSwitchChain.useSwitchChain();
  var _useMemo = React.useMemo(function () {
      if (connected && chainId !== sdkCore.ChainId.MAINNET) {
        var _handleClick = function _handleClick() {
          return switchChain(connector, sdkCore.ChainId.MAINNET);
        };
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.NOT_SUPPORTED_CHAIN, theme, _handleClick);
      }
      if (sufficientBalance === false) {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.INSUFFICIENT_BALANCE, theme);
      }
      if (bagStatus === index$2.BagStatus.WARNING) {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.ERROR, theme);
      }
      if (!connected) {
        var _handleClick2 = function _handleClick2() {
          toggleWalletDrawer();
          setBagExpanded({
            bagExpanded: false
          });
        };
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.WALLET_NOT_CONNECTED, theme, _handleClick2);
      }
      if (bagStatus === index$2.BagStatus.FETCHING_FINAL_ROUTE || bagStatus === index$2.BagStatus.CONFIRMING_IN_WALLET) {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.IN_WALLET_CONFIRMATION, theme);
      }
      if (bagStatus === index$2.BagStatus.PROCESSING_TRANSACTION) {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.PROCESSING_TRANSACTION, theme);
      }
      if (usingPayWithAnyToken && tradeState !== types.TradeState.VALID) {
        if (tradeState === types.TradeState.INVALID) {
          return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.INVALID_TOKEN_ROUTE, theme);
        }
        if (tradeState === types.TradeState.NO_ROUTE_FOUND) {
          return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.NO_TOKEN_ROUTE_FOUND, theme);
        }
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.FETCHING_TOKEN_ROUTE, theme);
      }
      var allowanceRequired = allowance.state === usePermit2Allowance.AllowanceState.REQUIRED;
      var handleClick = function handleClick() {
        return allowanceRequired && allowance.approveAndPermit();
      };
      if (loadingAllowance) {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.LOADING_ALLOWANCE, theme, handleClick);
      }
      if (allowanceRequired) {
        if (allowance.isApprovalPending) {
          return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.IN_WALLET_ALLOWANCE_APPROVAL, theme, handleClick);
        } else if (allowance.isApprovalLoading) {
          return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.PROCESSING_APPROVAL, theme, handleClick);
        } else {
          return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.REQUIRE_APPROVAL, theme, handleClick);
        }
      }
      if (bagStatus === index$2.BagStatus.CONFIRM_QUOTE) {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.CONFIRM_UPDATED_PRICE, theme, fetchAssets);
      }
      if (priceImpact && priceImpact.priceImpactSeverity.type === "error") {
        return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.PRICE_IMPACT_HIGH, theme, fetchAssets, usingPayWithAnyToken, priceImpact);
      }
      return ButtonStates.getBuyButtonStateData(ButtonStates.BuyButtonStates.PAY, theme, fetchAssets, usingPayWithAnyToken);
    }, [connected, chainId, sufficientBalance, bagStatus, usingPayWithAnyToken, tradeState, loadingAllowance, allowance, priceImpact, theme, fetchAssets, switchChain, connector, toggleWalletDrawer, setBagExpanded]),
    buttonText = _useMemo.buttonText,
    buttonTextColor = _useMemo.buttonTextColor,
    disabled = _useMemo.disabled,
    warningText = _useMemo.warningText,
    warningTextColor = _useMemo.warningTextColor,
    helperText = _useMemo.helperText,
    helperTextColor = _useMemo.helperTextColor,
    handleClick = _useMemo.handleClick,
    buttonColor = _useMemo.buttonColor;
  var traceEventProperties = _objectSpread({
    usd_value: usdcValue === null || usdcValue === void 0 ? void 0 : usdcValue.toExact(),
    using_erc20: !!inputCurrency
  }, eventProperties);
  return /*#__PURE__*/React__default["default"].createElement(FooterContainer, null, /*#__PURE__*/React__default["default"].createElement(Footer, null, /*#__PURE__*/React__default["default"].createElement(FooterHeader, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(CurrencyRow, null, /*#__PURE__*/React__default["default"].createElement(index.Column, {
    gap: "xs"
  }, chains.isSupportedChain(chainId) && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "JQjhrO",
    message: "Pay with"
  })), /*#__PURE__*/React__default["default"].createElement(CurrencyInput, {
    onClick: function onClick() {
      if (!bagIsLocked) {
        setTokenSelectorOpen(true);
        index$5.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_BUY_TOKEN_SELECTOR_CLICKED);
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: activeCurrency,
    size: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    fontWeight: 535,
    lineHeight: "24px"
  }, activeCurrency === null || activeCurrency === void 0 ? void 0 : activeCurrency.symbol), /*#__PURE__*/React__default["default"].createElement(reactFeather.ChevronDown, {
    size: 20,
    color: theme.neutral2
  })))), /*#__PURE__*/React__default["default"].createElement(TotalColumn, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "72c5Qo",
    message: "Total"
  })), /*#__PURE__*/React__default["default"].createElement(InputCurrencyValue, {
    usingPayWithAnyToken: usingPayWithAnyToken,
    totalEthPrice: totalEthPrice,
    activeCurrency: activeCurrency,
    tradeState: tradeState,
    trade: trade
  }))), /*#__PURE__*/React__default["default"].createElement(FiatValue, {
    usdcValue: usdcValue,
    priceImpact: priceImpact,
    tradeState: tradeState,
    usingPayWithAnyToken: usingPayWithAnyToken
  })), /*#__PURE__*/React__default["default"].createElement(index$5.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.NFTEventName.NFT_BUY_BAG_PAY,
    element: analyticsEvents.InterfaceElementName.NFT_BUY_BAG_PAY_BUTTON,
    properties: _objectSpread({}, traceEventProperties),
    shouldLogImpression: connected && !disabled
  }, /*#__PURE__*/React__default["default"].createElement(Warning, {
    color: warningTextColor
  }, warningText), /*#__PURE__*/React__default["default"].createElement(Helper, {
    color: helperTextColor
  }, helperText), /*#__PURE__*/React__default["default"].createElement(ActionButton, {
    "data-testid": "nft-buy-button",
    onClick: handleClick,
    disabled: disabled || isPending,
    $backgroundColor: buttonColor,
    $color: buttonTextColor
  }, isPending && /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], {
    size: "20px",
    stroke: "white"
  }), buttonText))), /*#__PURE__*/React__default["default"].createElement(CurrencySearchModal, {
    isOpen: tokenSelectorOpen,
    onDismiss: function onDismiss() {
      return setTokenSelectorOpen(false);
    },
    onCurrencySelect: function onCurrencySelect(currency) {
      setInputCurrency(currency.isNative ? undefined : currency);
      if (currency.isToken) {
        index$5.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_BUY_TOKEN_SELECTED, {
          token_address: currency.address,
          token_symbol: currency.symbol
        });
      }
    },
    selectedCurrency: activeCurrency !== null && activeCurrency !== void 0 ? activeCurrency : undefined,
    onlyShowCurrenciesWithBalance: true
  }));
};

exports.BagFooter = BagFooter;
