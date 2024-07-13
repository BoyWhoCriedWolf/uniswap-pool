import React__default, { useState, useMemo, useEffect } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { formatEther, parseEther } from '@ethersproject/units';
import { NFTEventName, BrowserEvent, InterfaceElementName } from '@uniswap/analytics-events';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent, TraceEvent } from '../../../analytics/index.js';
import { useToggleAccountDrawer } from '../../../components/AccountDrawer/index.js';
import { Column } from '../../../components/Column/index.js';
import Loader from '../../../components/Icons/LoadingSpinner.js';
import CurrencyLogo from '../../../components/Logo/CurrencyLogo.js';
import Row from '../../../components/Row/index.js';
import CurrencySearchModal from '../../../components/SearchModal/CurrencySearchModal.js';
import { LoadingBubble } from '../../../components/Tokens/loading.js';
import { MouseoverTooltip } from '../../../components/Tooltip/index.js';
import { isSupportedChain } from '../../../constants/chains.js';
import { useNftUniversalRouterAddress, getURAddress } from '../../../graphql/data/nft/NftUniversalRouterAddress.js';
import { useCurrency } from '../../../hooks/Tokens.js';
import usePermit2Allowance, { AllowanceState } from '../../../hooks/usePermit2Allowance.js';
import { useStablecoinValue } from '../../../hooks/useStablecoinPrice.js';
import { useSwitchChain } from '../../../hooks/useSwitchChain.js';
import { useTokenBalance } from '../../../lib/hooks/useCurrencyBalance.js';
import tryParseCurrencyAmount from '../../../lib/utils/tryParseCurrencyAmount.js';
import { useBag } from '../../hooks/useBag.js';
import { useBagTotalEthPrice } from '../../hooks/useBagTotalEthPrice.js';
import useDerivedPayWithAnyTokenSwapInfo from '../../hooks/useDerivedPayWithAnyTokenSwapInfo.js';
import { useFetchAssets } from '../../hooks/useFetchAssets.js';
import usePayWithAnyTokenSwap from '../../hooks/usePayWithAnyTokenSwap.js';
import { usePriceImpact } from '../../hooks/usePriceImpact.js';
import { useSubscribeTransactionState } from '../../hooks/useSubscribeTransactionState.js';
import { useTokenInput } from '../../hooks/useTokenInput.js';
import { useWalletBalance } from '../../hooks/useWalletBalance.js';
import { BagStatus } from '../../types/checkout/index.js';
import '@babel/runtime/helpers/toConsumableArray';
import '../icons.js';
import 'uuid';
import { formatWeiToDecimal, ethNumberStandardFormatter } from '../../utils/currency.js';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../utils/pooledAssets.js';
import '../../utils/time.js';
import '@ethersproject/bignumber';
import { AlertTriangle, ChevronDown } from 'react-feather';
import { TradeFillType, TradeState } from '../../../state/routing/types.js';
import styled, { useTheme } from 'styled-components';
import '../../../theme/components/index.js';
import { getBuyButtonStateData, BuyButtonStates } from './ButtonStates.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var FooterContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 0px 12px;\n"])));
var Footer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-top: 1px solid ", ";\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  margin: 0px 16px 8px;\n  padding: 12px 0px;\n  border-bottom-left-radius: 12px;\n  border-bottom-right-radius: 12px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
});
var FooterHeader = styled(Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding-top: 8px;\n  padding-bottom: 16px;\n"])));
var CurrencyRow = styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n  align-items: start;\n  gap: 8px;\n"])));
var TotalColumn = styled(Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  text-align: end;\n  overflow: hidden;\n"])));
var WarningIcon = styled(AlertTriangle)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 14px;\n  margin-right: 4px;\n  color: inherit;\n"])));
var WarningText = styled(ThemedText.BodyPrimary)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  margin-bottom: 10px !important;\n  text-align: center;\n"])), function (_ref3) {
  var $color = _ref3.$color;
  return $color;
});
var HelperText = styled(ThemedText.BodySmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  margin-bottom: 10px !important;\n"])), function (_ref4) {
  var $color = _ref4.$color;
  return $color;
});
var CurrencyInput = styled(Row)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  gap: 8px;\n  cursor: pointer;\n"])));
var ActionButton = styled.button(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  display: flex;\n  background: ", ";\n  color: ", ";\n  font-weight: 535;\n  line-height: 24px;\n  font-size: 16px;\n  gap: 16px;\n  justify-content: center;\n  border: none;\n  border-radius: 12px;\n  padding: 12px 0px;\n  cursor: pointer;\n  align-items: center;\n\n  &:disabled {\n    opacity: 0.6;\n    cursor: auto;\n  }\n"])), function (_ref5) {
  var $backgroundColor = _ref5.$backgroundColor;
  return $backgroundColor;
}, function (_ref6) {
  var $color = _ref6.$color;
  return $color;
});
var FiatLoadingBubble = styled(LoadingBubble)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  border-radius: 4px;\n  width: 4rem;\n  height: 20px;\n  align-self: end;\n"])));
var PriceImpactContainer = styled(Row)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  justify-content: flex-end;\n"])));
var PriceImpactRow = styled(Row)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  align-items: center;\n  gap: 8px;\n"])));
var ValueText = styled(ThemedText.BodyPrimary)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  line-height: 20px;\n  font-weight: 535;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  scrollbar-width: none;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"])));
var Warning = function Warning(_ref7) {
  var color = _ref7.color,
    children = _ref7.children;
  if (!children) {
    return null;
  }
  return /*#__PURE__*/React__default.createElement(WarningText, {
    "data-testid": "nft-buy-button-warning",
    fontSize: "14px",
    lineHeight: "20px",
    $color: color
  }, /*#__PURE__*/React__default.createElement(WarningIcon, null), children);
};
var Helper = function Helper(_ref8) {
  var children = _ref8.children,
    color = _ref8.color;
  if (!children) {
    return null;
  }
  return /*#__PURE__*/React__default.createElement(HelperText, {
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
    return /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
      lineHeight: "20px",
      fontWeight: "535"
    }, formatWeiToDecimal(totalEthPrice.toString()), "\xA0", (_activeCurrency$symbo = activeCurrency === null || activeCurrency === void 0 ? void 0 : activeCurrency.symbol) !== null && _activeCurrency$symbo !== void 0 ? _activeCurrency$symbo : "ETH");
  }
  if (tradeState === TradeState.LOADING && !trade) {
    return /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
      color: "neutral3",
      lineHeight: "20px",
      fontWeight: "535"
    }, /*#__PURE__*/React__default.createElement(Trans, {
      id: "hwuHLB",
      message: "Fetching price..."
    }));
  }
  return /*#__PURE__*/React__default.createElement(ValueText, {
    color: tradeState === TradeState.LOADING ? "neutral3" : "neutral1"
  }, ethNumberStandardFormatter(trade === null || trade === void 0 ? void 0 : trade.inputAmount.toExact()));
};
var FiatValue = function FiatValue(_ref10) {
  var usdcValue = _ref10.usdcValue,
    priceImpact = _ref10.priceImpact,
    tradeState = _ref10.tradeState,
    usingPayWithAnyToken = _ref10.usingPayWithAnyToken;
  if (!usdcValue) {
    if (usingPayWithAnyToken && (tradeState === TradeState.INVALID || tradeState === TradeState.NO_ROUTE_FOUND)) {
      return null;
    }
    return /*#__PURE__*/React__default.createElement(FiatLoadingBubble, null);
  }
  return /*#__PURE__*/React__default.createElement(PriceImpactContainer, null, priceImpact && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: i18n._(
    /*i18n*/
    {
      id: "KaCkzz",
      message: "The estimated difference between the USD values of input and output amounts."
    })
  }, /*#__PURE__*/React__default.createElement(PriceImpactRow, null, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    color: priceImpact.priceImpactSeverity.color,
    size: "16px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    style: {
      color: priceImpact.priceImpactSeverity.color
    },
    lineHeight: "20px"
  }, "(", /*#__PURE__*/React__default.createElement(Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": priceImpact.displayPercentage()
    }
  }), ")")))), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral3",
    lineHeight: "20px"
  }, "".concat(ethNumberStandardFormatter(usdcValue === null || usdcValue === void 0 ? void 0 : usdcValue.toExact(), true))));
};
var PENDING_BAG_STATUSES = [BagStatus.FETCHING_ROUTE, BagStatus.CONFIRMING_IN_WALLET, BagStatus.FETCHING_FINAL_ROUTE, BagStatus.PROCESSING_TRANSACTION];
var BagFooter = function BagFooter(_ref11) {
  var setModalIsOpen = _ref11.setModalIsOpen,
    eventProperties = _ref11.eventProperties;
  var toggleWalletDrawer = useToggleAccountDrawer();
  var theme = useTheme();
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    connector = _useWeb3React.connector;
  var connected = Boolean(account && chainId);
  var totalEthPrice = useBagTotalEthPrice();
  var _useTokenInput = useTokenInput(function (_ref12) {
      var inputCurrency = _ref12.inputCurrency;
      return {
        inputCurrency: inputCurrency
      };
    }),
    inputCurrency = _useTokenInput.inputCurrency;
  var setInputCurrency = useTokenInput(function (state) {
    return state.setInputCurrency;
  });
  var defaultCurrency = useCurrency("ETH");
  var inputCurrencyBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, !!inputCurrency && inputCurrency.isToken ? inputCurrency : undefined);
  var _useBag = useBag(function (_ref13) {
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
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    tokenSelectorOpen = _useState2[0],
    setTokenSelectorOpen = _useState2[1];
  var isPending = PENDING_BAG_STATUSES.includes(bagStatus);
  var activeCurrency = inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : defaultCurrency;
  var usingPayWithAnyToken = !!inputCurrency && chainId === ChainId.MAINNET;
  var _useNftUniversalRoute = useNftUniversalRouterAddress(),
    universalRouterAddress = _useNftUniversalRoute.universalRouterAddress,
    universalRouterAddressIsLoading = _useNftUniversalRoute.universalRouterAddressIsLoading;
  useSubscribeTransactionState(setModalIsOpen);
  var fetchAssets = useFetchAssets();
  var parsedOutputAmount = useMemo(function () {
    return tryParseCurrencyAmount(formatEther(totalEthPrice.toString()), defaultCurrency !== null && defaultCurrency !== void 0 ? defaultCurrency : undefined);
  }, [defaultCurrency, totalEthPrice]);
  var _useDerivedPayWithAny = useDerivedPayWithAnyTokenSwapInfo(usingPayWithAnyToken ? inputCurrency : undefined, parsedOutputAmount),
    tradeState = _useDerivedPayWithAny.state,
    trade = _useDerivedPayWithAny.trade,
    maximumAmountIn = _useDerivedPayWithAny.maximumAmountIn,
    allowedSlippage = _useDerivedPayWithAny.allowedSlippage;
  var allowance = usePermit2Allowance(maximumAmountIn, getURAddress(chainId, universalRouterAddress), TradeFillType.Classic);
  var loadingAllowance = allowance.state === AllowanceState.LOADING || universalRouterAddressIsLoading;
  usePayWithAnyTokenSwap(trade, allowance, allowedSlippage);
  var priceImpact = usePriceImpact(trade);
  var fiatValueTradeInput = useStablecoinValue(trade === null || trade === void 0 ? void 0 : trade.inputAmount);
  var fiatValueTradeOutput = useStablecoinValue(parsedOutputAmount);
  var usdcValue = usingPayWithAnyToken ? fiatValueTradeInput : fiatValueTradeOutput;
  var _useWalletBalance = useWalletBalance(),
    balanceInEth = _useWalletBalance.balance;
  var sufficientBalance = useMemo(function () {
    if (!connected || chainId !== ChainId.MAINNET) {
      return undefined;
    }
    if (inputCurrency) {
      var inputAmount = trade === null || trade === void 0 ? void 0 : trade.inputAmount;
      if (!inputCurrencyBalance || !inputAmount) {
        return undefined;
      }
      return !inputCurrencyBalance.lessThan(inputAmount);
    }
    return parseEther(balanceInEth).gte(totalEthPrice);
  }, [connected, chainId, inputCurrency, balanceInEth, totalEthPrice, trade === null || trade === void 0 ? void 0 : trade.inputAmount, inputCurrencyBalance]);
  useEffect(function () {
    setBagStatus(BagStatus.ADDING_TO_BAG);
  }, [inputCurrency, setBagStatus]);
  var switchChain = useSwitchChain();
  var _useMemo = useMemo(function () {
      if (connected && chainId !== ChainId.MAINNET) {
        var _handleClick = function _handleClick() {
          return switchChain(connector, ChainId.MAINNET);
        };
        return getBuyButtonStateData(BuyButtonStates.NOT_SUPPORTED_CHAIN, theme, _handleClick);
      }
      if (sufficientBalance === false) {
        return getBuyButtonStateData(BuyButtonStates.INSUFFICIENT_BALANCE, theme);
      }
      if (bagStatus === BagStatus.WARNING) {
        return getBuyButtonStateData(BuyButtonStates.ERROR, theme);
      }
      if (!connected) {
        var _handleClick2 = function _handleClick2() {
          toggleWalletDrawer();
          setBagExpanded({
            bagExpanded: false
          });
        };
        return getBuyButtonStateData(BuyButtonStates.WALLET_NOT_CONNECTED, theme, _handleClick2);
      }
      if (bagStatus === BagStatus.FETCHING_FINAL_ROUTE || bagStatus === BagStatus.CONFIRMING_IN_WALLET) {
        return getBuyButtonStateData(BuyButtonStates.IN_WALLET_CONFIRMATION, theme);
      }
      if (bagStatus === BagStatus.PROCESSING_TRANSACTION) {
        return getBuyButtonStateData(BuyButtonStates.PROCESSING_TRANSACTION, theme);
      }
      if (usingPayWithAnyToken && tradeState !== TradeState.VALID) {
        if (tradeState === TradeState.INVALID) {
          return getBuyButtonStateData(BuyButtonStates.INVALID_TOKEN_ROUTE, theme);
        }
        if (tradeState === TradeState.NO_ROUTE_FOUND) {
          return getBuyButtonStateData(BuyButtonStates.NO_TOKEN_ROUTE_FOUND, theme);
        }
        return getBuyButtonStateData(BuyButtonStates.FETCHING_TOKEN_ROUTE, theme);
      }
      var allowanceRequired = allowance.state === AllowanceState.REQUIRED;
      var handleClick = function handleClick() {
        return allowanceRequired && allowance.approveAndPermit();
      };
      if (loadingAllowance) {
        return getBuyButtonStateData(BuyButtonStates.LOADING_ALLOWANCE, theme, handleClick);
      }
      if (allowanceRequired) {
        if (allowance.isApprovalPending) {
          return getBuyButtonStateData(BuyButtonStates.IN_WALLET_ALLOWANCE_APPROVAL, theme, handleClick);
        } else if (allowance.isApprovalLoading) {
          return getBuyButtonStateData(BuyButtonStates.PROCESSING_APPROVAL, theme, handleClick);
        } else {
          return getBuyButtonStateData(BuyButtonStates.REQUIRE_APPROVAL, theme, handleClick);
        }
      }
      if (bagStatus === BagStatus.CONFIRM_QUOTE) {
        return getBuyButtonStateData(BuyButtonStates.CONFIRM_UPDATED_PRICE, theme, fetchAssets);
      }
      if (priceImpact && priceImpact.priceImpactSeverity.type === "error") {
        return getBuyButtonStateData(BuyButtonStates.PRICE_IMPACT_HIGH, theme, fetchAssets, usingPayWithAnyToken, priceImpact);
      }
      return getBuyButtonStateData(BuyButtonStates.PAY, theme, fetchAssets, usingPayWithAnyToken);
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
  return /*#__PURE__*/React__default.createElement(FooterContainer, null, /*#__PURE__*/React__default.createElement(Footer, null, /*#__PURE__*/React__default.createElement(FooterHeader, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(CurrencyRow, null, /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, isSupportedChain(chainId) && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "JQjhrO",
    message: "Pay with"
  })), /*#__PURE__*/React__default.createElement(CurrencyInput, {
    onClick: function onClick() {
      if (!bagIsLocked) {
        setTokenSelectorOpen(true);
        sendAnalyticsEvent(NFTEventName.NFT_BUY_TOKEN_SELECTOR_CLICKED);
      }
    }
  }, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: activeCurrency,
    size: "24px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    fontWeight: 535,
    lineHeight: "24px"
  }, activeCurrency === null || activeCurrency === void 0 ? void 0 : activeCurrency.symbol), /*#__PURE__*/React__default.createElement(ChevronDown, {
    size: 20,
    color: theme.neutral2
  })))), /*#__PURE__*/React__default.createElement(TotalColumn, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "72c5Qo",
    message: "Total"
  })), /*#__PURE__*/React__default.createElement(InputCurrencyValue, {
    usingPayWithAnyToken: usingPayWithAnyToken,
    totalEthPrice: totalEthPrice,
    activeCurrency: activeCurrency,
    tradeState: tradeState,
    trade: trade
  }))), /*#__PURE__*/React__default.createElement(FiatValue, {
    usdcValue: usdcValue,
    priceImpact: priceImpact,
    tradeState: tradeState,
    usingPayWithAnyToken: usingPayWithAnyToken
  })), /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: NFTEventName.NFT_BUY_BAG_PAY,
    element: InterfaceElementName.NFT_BUY_BAG_PAY_BUTTON,
    properties: _objectSpread({}, traceEventProperties),
    shouldLogImpression: connected && !disabled
  }, /*#__PURE__*/React__default.createElement(Warning, {
    color: warningTextColor
  }, warningText), /*#__PURE__*/React__default.createElement(Helper, {
    color: helperTextColor
  }, helperText), /*#__PURE__*/React__default.createElement(ActionButton, {
    "data-testid": "nft-buy-button",
    onClick: handleClick,
    disabled: disabled || isPending,
    $backgroundColor: buttonColor,
    $color: buttonTextColor
  }, isPending && /*#__PURE__*/React__default.createElement(Loader, {
    size: "20px",
    stroke: "white"
  }), buttonText))), /*#__PURE__*/React__default.createElement(CurrencySearchModal, {
    isOpen: tokenSelectorOpen,
    onDismiss: function onDismiss() {
      return setTokenSelectorOpen(false);
    },
    onCurrencySelect: function onCurrencySelect(currency) {
      setInputCurrency(currency.isNative ? undefined : currency);
      if (currency.isToken) {
        sendAnalyticsEvent(NFTEventName.NFT_BUY_TOKEN_SELECTED, {
          token_address: currency.address,
          token_symbol: currency.symbol
        });
      }
    },
    selectedCurrency: activeCurrency !== null && activeCurrency !== void 0 ? activeCurrency : undefined,
    onlyShowCurrenciesWithBalance: true
  }));
};

export { BagFooter };
