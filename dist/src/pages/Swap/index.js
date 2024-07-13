import React__default, { useState, useEffect, useMemo, useCallback, useReducer, useRef } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfacePageName, SwapEventName, InterfaceSectionName, BrowserEvent, InterfaceElementName, InterfaceEventName, SharedEventName } from '@uniswap/analytics-events';
import { ChainId, CurrencyAmount } from '@uniswap/sdk-core';
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk';
import { useWeb3React } from '@web3-react/core';
import { Trace, sendAnalyticsEvent, TraceEvent } from '../../analytics/index.js';
import { useToggleAccountDrawer } from '../../components/AccountDrawer/index.js';
import AddressInputPanel from '../../components/AddressInputPanel/index.js';
import { ButtonPrimary, ButtonLight, ButtonError } from '../../components/Button/index.js';
import { GrayCard } from '../../components/Card/index.js';
import { AutoColumn } from '../../components/Column/index.js';
import SwapCurrencyInputPanel from '../../components/CurrencyInputPanel/SwapCurrencyInputPanel.js';
import { NetworkAlert } from '../../components/NetworkAlert/NetworkAlert.js';
import { AutoRow } from '../../components/Row/index.js';
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee.js';
import ConfirmSwapModal from '../../components/swap/ConfirmSwapModal.js';
import PriceImpactModal from '../../components/swap/PriceImpactModal.js';
import PriceImpactWarning from '../../components/swap/PriceImpactWarning.js';
import { SwapWrapper, ArrowWrapper } from '../../components/swap/styled.js';
import SwapDetailsDropdown from '../../components/swap/SwapDetailsDropdown.js';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink/index.js';
import TokenSafetyModal from '../../components/TokenSafety/TokenSafetyModal.js';
import { useConnectionReady } from '../../connection/eagerlyConnect.js';
import { getChainInfo } from '../../constants/chainInfo.js';
import { asSupportedChain, isSupportedChain } from '../../constants/chains.js';
import { TOKEN_SHORTHANDS, getSwapCurrencyId } from '../../constants/tokens.js';
import { useUniswapXDefaultEnabled } from '../../featureFlags/flags/uniswapXDefault.js';
import { useCurrency, useDefaultActiveTokens } from '../../hooks/Tokens.js';
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported.js';
import { useMaxAmountIn } from '../../hooks/useMaxAmountIn.js';
import usePermit2Allowance, { AllowanceState } from '../../hooks/usePermit2Allowance.js';
import usePrevious from '../../hooks/usePrevious.js';
import { useSwapCallback } from '../../hooks/useSwapCallback.js';
import { useSwitchChain } from '../../hooks/useSwitchChain.js';
import { useUSDPrice } from '../../hooks/useUSDPrice.js';
import useWrapCallback, { WrapType, WrapErrorText } from '../../hooks/useWrapCallback.js';
import JSBI from 'jsbi';
import { formatSwapQuoteReceivedEventProperties } from '../../lib/utils/analytics.js';
import { Repeat, ArrowDown } from 'react-feather';
import { Text } from 'rebass';
import { useAppSelector } from '../../state/hooks.js';
import { TradeState } from '../../state/routing/types.js';
import { isClassicTrade, isPreviewTrade } from '../../state/routing/utils.js';
import { Field, replaceSwapState, forceExactInput } from '../../state/swap/actions.js';
import { useDerivedSwapInfo, useSwapActionHandlers } from '../../state/swap/hooks.js';
import swapReducer, { initialState } from '../../state/swap/reducer.js';
import styled, { useTheme } from 'styled-components';
import { colors } from '../../theme/colors.js';
import { LinkStyledButton } from '../../theme/components/index.js';
import { maybeLogFirstSwapAction } from '../../tracing/swapFlowLoggers.js';
import { computeFiatValuePriceImpact } from '../../utils/computeFiatValuePriceImpact.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { maxAmountSpend } from '../../utils/maxAmountSpend.js';
import { computeRealizedPriceImpact, warningSeverity } from '../../utils/prices.js';
import { didUserReject } from '../../utils/swapErrorToUserReadableMessage.js';
import { useScreenSize } from '../../hooks/useScreenSize.js';
import { useIsDarkMode } from '../../theme/components/ThemeToggle.js';
import { OutputTaxTooltipBody } from './TaxTooltipBody.js';
import { UniswapXOptIn } from './UniswapXOptIn.js';
import { ThemedText } from '../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ArrowContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  width: 100%;\n  height: 100%;\n"])));
var SwapSection = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  // background-color: ", ";\n\n  border-radius: 16px;\n  color: ", ";\n  font-size: 16px;\n  font-weight: 700;\n  height: 120px;\n  line-height: 20px;\n  position: relative;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var OutputSwapSection = styled(SwapSection)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-bottom: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return "1px solid ".concat(theme.surface1);
});
function getIsReviewableQuote(trade, tradeState, swapInputError) {
  if (swapInputError) return false;
  // if the current quote is a preview quote, allow the user to progress to the Swap review screen
  if (isPreviewTrade(trade)) return true;
  return Boolean(trade && tradeState === TradeState.VALID);
}
function largerPercentValue(a, b) {
  if (a && b) {
    return a.greaterThan(b) ? a : b;
  } else if (a) {
    return a;
  } else if (b) {
    return b;
  }
  return undefined;
}
function SwapPage(_ref4) {
  var className = _ref4.className;
  var _useWeb3React = useWeb3React(),
    connectedChainId = _useWeb3React.chainId;
  // const loadedUrlParams = useDefaultsFromURLSearch();

  // const location = useLocation();

  var supportedChainId = asSupportedChain(connectedChainId);
  return /*#__PURE__*/React__default.createElement(Trace, {
    page: InterfacePageName.SWAP_PAGE,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(Swap, {
    className: className,
    chainId: supportedChainId !== null && supportedChainId !== void 0 ? supportedChainId : ChainId.MAINNET
    // initialInputCurrencyId={loadedUrlParams?.[Field.INPUT]?.currencyId}
    // initialOutputCurrencyId={loadedUrlParams?.[Field.OUTPUT]?.currencyId}
    ,
    disableTokenInputs: supportedChainId === undefined
  }), /*#__PURE__*/React__default.createElement(NetworkAlert, null), /*#__PURE__*/React__default.createElement(SwitchLocaleLink, null));
}

/**
 * The swap component displays the swap interface, manages state for the swap, and triggers onchain swaps.
 *
 * In most cases, chainId should refer to the connected chain, i.e. `useWeb3React().chainId`.
 * However if this component is being used in a context that displays information from a different, unconnected
 * chain (e.g. the TDP), then chainId should refer to the unconnected chain.
 */
function Swap(_ref5) {
  var _parsedAmounts$Field$, _parsedAmounts$Field$2, _parsedAmounts$indepe3, _parsedAmounts$Field$3, _parsedAmounts$Field$4, _currencies$Field$INP, _importTokensNotInDef, _importTokensNotInDef2, _currencies$Field$INP2, _currencies$Field$OUT, _currencies$Field$OUT2, _getChainInfo, _getChainInfo2;
  var className = _ref5.className,
    initialInputCurrencyId = _ref5.initialInputCurrencyId,
    initialOutputCurrencyId = _ref5.initialOutputCurrencyId,
    chainId = _ref5.chainId,
    onCurrencyChange = _ref5.onCurrencyChange,
    _ref5$disableTokenInp = _ref5.disableTokenInputs,
    disableTokenInputs = _ref5$disableTokenInp === void 0 ? false : _ref5$disableTokenInp;
  var connectionReady = useConnectionReady();
  var _useWeb3React2 = useWeb3React(),
    account = _useWeb3React2.account,
    connectedChainId = _useWeb3React2.chainId,
    connector = _useWeb3React2.connector;
  var trace = useTrace();

  // token warning stuff
  var prefilledInputCurrency = useCurrency(initialInputCurrencyId);
  var prefilledOutputCurrency = useCurrency(initialOutputCurrencyId);
  var _useState = useState(prefilledInputCurrency),
    _useState2 = _slicedToArray(_useState, 2),
    loadedInputCurrency = _useState2[0],
    setLoadedInputCurrency = _useState2[1];
  var _useState3 = useState(prefilledOutputCurrency),
    _useState4 = _slicedToArray(_useState3, 2),
    loadedOutputCurrency = _useState4[0],
    setLoadedOutputCurrency = _useState4[1];
  useEffect(function () {
    setLoadedInputCurrency(prefilledInputCurrency);
    setLoadedOutputCurrency(prefilledOutputCurrency);
  }, [prefilledInputCurrency, prefilledOutputCurrency]);
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    dismissTokenWarning = _useState6[0],
    setDismissTokenWarning = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showPriceImpactModal = _useState8[0],
    setShowPriceImpactModal = _useState8[1];
  var urlLoadedTokens = useMemo(function () {
    var _filter, _ref6;
    return (_filter = (_ref6 = [loadedInputCurrency, loadedOutputCurrency]) === null || _ref6 === void 0 ? void 0 : _ref6.filter(function (c) {
      var _c$isToken;
      return (_c$isToken = c === null || c === void 0 ? void 0 : c.isToken) !== null && _c$isToken !== void 0 ? _c$isToken : false;
    })) !== null && _filter !== void 0 ? _filter : [];
  }, [loadedInputCurrency, loadedOutputCurrency]);
  var handleConfirmTokenWarning = useCallback(function () {
    setDismissTokenWarning(true);
  }, []);

  // dismiss warning if all imported tokens are in active lists
  var defaultTokens = useDefaultActiveTokens(chainId);
  var importTokensNotInDefault = useMemo(function () {
    return urlLoadedTokens && urlLoadedTokens.filter(function (token) {
      return !(token.address in defaultTokens);
    }).filter(function (token) {
      // Any token addresses that are loaded from the shorthands map do not need to show the import URL
      var supported = asSupportedChain(chainId);
      if (!supported) return true;
      return !Object.keys(TOKEN_SHORTHANDS).some(function (shorthand) {
        var shorthandTokenAddress = TOKEN_SHORTHANDS[shorthand][supported];
        return shorthandTokenAddress && shorthandTokenAddress === token.address;
      });
    });
  }, [chainId, defaultTokens, urlLoadedTokens]);
  var theme = useTheme();

  // toggle wallet when disconnected
  var toggleWalletDrawer = useToggleAccountDrawer();

  // swap state
  var prefilledState = useMemo(function () {
    return _defineProperty(_defineProperty({}, Field.INPUT, {
      currencyId: initialInputCurrencyId
    }), Field.OUTPUT, {
      currencyId: initialOutputCurrencyId
    });
  }, [initialInputCurrencyId, initialOutputCurrencyId]);
  var _useReducer = useReducer(swapReducer, _objectSpread(_objectSpread({}, initialState), prefilledState)),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  var typedValue = state.typedValue,
    recipient = state.recipient,
    independentField = state.independentField;
  var previousConnectedChainId = usePrevious(connectedChainId);
  var previousPrefilledState = usePrevious(prefilledState);
  useEffect(function () {
    var _previousPrefilledSta, _prefilledState$Field, _previousPrefilledSta2, _prefilledState$Field2;
    var combinedInitialState = _objectSpread(_objectSpread({}, initialState), prefilledState);
    var chainChanged = previousConnectedChainId && previousConnectedChainId !== connectedChainId;
    var prefilledInputChanged = previousPrefilledState && (previousPrefilledState === null || previousPrefilledState === void 0 || (_previousPrefilledSta = previousPrefilledState[Field.INPUT]) === null || _previousPrefilledSta === void 0 ? void 0 : _previousPrefilledSta.currencyId) !== (prefilledState === null || prefilledState === void 0 || (_prefilledState$Field = prefilledState[Field.INPUT]) === null || _prefilledState$Field === void 0 ? void 0 : _prefilledState$Field.currencyId);
    var prefilledOutputChanged = previousPrefilledState && (previousPrefilledState === null || previousPrefilledState === void 0 || (_previousPrefilledSta2 = previousPrefilledState[Field.OUTPUT]) === null || _previousPrefilledSta2 === void 0 ? void 0 : _previousPrefilledSta2.currencyId) !== (prefilledState === null || prefilledState === void 0 || (_prefilledState$Field2 = prefilledState[Field.OUTPUT]) === null || _prefilledState$Field2 === void 0 ? void 0 : _prefilledState$Field2.currencyId);
    if (chainChanged || prefilledInputChanged || prefilledOutputChanged) {
      var _combinedInitialState, _combinedInitialState2, _combinedInitialState3;
      dispatch(replaceSwapState(_objectSpread(_objectSpread(_objectSpread({}, initialState), prefilledState), {}, {
        field: (_combinedInitialState = combinedInitialState.independentField) !== null && _combinedInitialState !== void 0 ? _combinedInitialState : Field.INPUT,
        inputCurrencyId: (_combinedInitialState2 = combinedInitialState.INPUT.currencyId) !== null && _combinedInitialState2 !== void 0 ? _combinedInitialState2 : undefined,
        outputCurrencyId: (_combinedInitialState3 = combinedInitialState.OUTPUT.currencyId) !== null && _combinedInitialState3 !== void 0 ? _combinedInitialState3 : undefined
      })));
      // reset local state
      setSwapState({
        tradeToConfirm: undefined,
        swapError: undefined,
        showConfirm: false,
        swapResult: undefined
      });
    }
  }, [connectedChainId, prefilledState, previousConnectedChainId, previousPrefilledState]);
  var swapInfo = useDerivedSwapInfo(state, chainId);
  var _swapInfo$trade = swapInfo.trade,
    tradeState = _swapInfo$trade.state,
    trade = _swapInfo$trade.trade,
    swapQuoteLatency = _swapInfo$trade.swapQuoteLatency,
    allowedSlippage = swapInfo.allowedSlippage,
    currencyBalances = swapInfo.currencyBalances,
    parsedAmount = swapInfo.parsedAmount,
    currencies = swapInfo.currencies,
    swapInputError = swapInfo.inputError,
    inputTax = swapInfo.inputTax,
    outputTax = swapInfo.outputTax;
  var _useMemo = useMemo(function () {
      return [!inputTax.equalTo(0), !outputTax.equalTo(0)];
    }, [inputTax, outputTax]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    inputTokenHasTax = _useMemo2[0],
    outputTokenHasTax = _useMemo2[1];
  useEffect(function () {
    // Force exact input if the user switches to an output token with tax
    if (outputTokenHasTax && independentField === Field.OUTPUT) dispatch(forceExactInput());
  }, [independentField, outputTokenHasTax, trade === null || trade === void 0 ? void 0 : trade.outputAmount]);
  var _useWrapCallback = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue),
    wrapType = _useWrapCallback.wrapType,
    onWrap = _useWrapCallback.execute,
    wrapInputError = _useWrapCallback.inputError;
  var showWrap = wrapType !== WrapType.NOT_APPLICABLE;
  var parsedAmounts = useMemo(function () {
    return showWrap ? _defineProperty(_defineProperty({}, Field.INPUT, parsedAmount), Field.OUTPUT, parsedAmount) : _defineProperty(_defineProperty({}, Field.INPUT, independentField === Field.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount), Field.OUTPUT, independentField === Field.OUTPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.postTaxOutputAmount);
  }, [independentField, parsedAmount, showWrap, trade]);
  var showFiatValueInput = Boolean(parsedAmounts[Field.INPUT]);
  var showFiatValueOutput = Boolean(parsedAmounts[Field.OUTPUT]);
  var getSingleUnitAmount = function getSingleUnitAmount(currency) {
    if (!currency) return;
    return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(Math.pow(10, currency.decimals)));
  };
  var fiatValueInput = useUSDPrice((_parsedAmounts$Field$ = parsedAmounts[Field.INPUT]) !== null && _parsedAmounts$Field$ !== void 0 ? _parsedAmounts$Field$ : getSingleUnitAmount(currencies[Field.INPUT]), currencies[Field.INPUT]);
  var fiatValueOutput = useUSDPrice((_parsedAmounts$Field$2 = parsedAmounts[Field.OUTPUT]) !== null && _parsedAmounts$Field$2 !== void 0 ? _parsedAmounts$Field$2 : getSingleUnitAmount(currencies[Field.OUTPUT]), currencies[Field.OUTPUT]);
  var _useMemo3 = useMemo(function () {
      return [tradeState === TradeState.NO_ROUTE_FOUND, tradeState === TradeState.LOADING, tradeState === TradeState.LOADING && Boolean(trade)];
    }, [trade, tradeState]),
    _useMemo4 = _slicedToArray(_useMemo3, 3),
    routeNotFound = _useMemo4[0],
    routeIsLoading = _useMemo4[1],
    routeIsSyncing = _useMemo4[2];
  var fiatValueTradeInput = useUSDPrice(trade === null || trade === void 0 ? void 0 : trade.inputAmount);
  var fiatValueTradeOutput = useUSDPrice(trade === null || trade === void 0 ? void 0 : trade.postTaxOutputAmount);
  var preTaxFiatValueTradeOutput = useUSDPrice(trade === null || trade === void 0 ? void 0 : trade.outputAmount);
  var _useMemo5 = useMemo(function () {
      return routeIsSyncing || !isClassicTrade(trade) ? [undefined, undefined] : [computeFiatValuePriceImpact(fiatValueTradeInput.data, fiatValueTradeOutput.data), computeFiatValuePriceImpact(fiatValueTradeInput.data, preTaxFiatValueTradeOutput.data)];
    }, [fiatValueTradeInput, fiatValueTradeOutput, preTaxFiatValueTradeOutput, routeIsSyncing, trade]),
    _useMemo6 = _slicedToArray(_useMemo5, 2),
    stablecoinPriceImpact = _useMemo6[0],
    preTaxStablecoinPriceImpact = _useMemo6[1];
  var _useSwapActionHandler = useSwapActionHandlers(dispatch),
    onSwitchTokens = _useSwapActionHandler.onSwitchTokens,
    onCurrencySelection = _useSwapActionHandler.onCurrencySelection,
    onUserInput = _useSwapActionHandler.onUserInput,
    onChangeRecipient = _useSwapActionHandler.onChangeRecipient;
  var dependentField = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;
  var handleTypeInput = useCallback(function (value) {
    onUserInput(Field.INPUT, value);
    maybeLogFirstSwapAction(trace);
  }, [onUserInput, trace]);
  var handleTypeOutput = useCallback(function (value) {
    onUserInput(Field.OUTPUT, value);
    maybeLogFirstSwapAction(trace);
  }, [onUserInput, trace]);

  // const navigate = useNavigate();
  var swapIsUnsupported = useIsSwapUnsupported(currencies[Field.INPUT], currencies[Field.OUTPUT]);

  // reset if they close warning without tokens in params
  var handleDismissTokenWarning = useCallback(function () {
    setDismissTokenWarning(true);
  }, []);
  //   navigate("/swap/");
  // }, [navigate]);

  // modal and loading
  var _useState9 = useState({
      showConfirm: false,
      tradeToConfirm: undefined,
      swapError: undefined,
      swapResult: undefined
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    _useState10$ = _useState10[0],
    showConfirm = _useState10$.showConfirm,
    tradeToConfirm = _useState10$.tradeToConfirm,
    swapError = _useState10$.swapError,
    swapResult = _useState10$.swapResult,
    setSwapState = _useState10[1];
  var _useFormatter = useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var formattedAmounts = useMemo(function () {
    var _parsedAmounts$indepe, _parsedAmounts$indepe2;
    return _defineProperty(_defineProperty({}, independentField, typedValue), dependentField, showWrap ? (_parsedAmounts$indepe = (_parsedAmounts$indepe2 = parsedAmounts[independentField]) === null || _parsedAmounts$indepe2 === void 0 ? void 0 : _parsedAmounts$indepe2.toExact()) !== null && _parsedAmounts$indepe !== void 0 ? _parsedAmounts$indepe : "" : formatCurrencyAmount({
      amount: parsedAmounts[dependentField],
      type: NumberType.SwapTradeAmount,
      placeholder: ""
    }));
  }, [dependentField, formatCurrencyAmount, independentField, parsedAmounts, showWrap, typedValue]);
  var userHasSpecifiedInputOutput = Boolean(currencies[Field.INPUT] && currencies[Field.OUTPUT] && ((_parsedAmounts$indepe3 = parsedAmounts[independentField]) === null || _parsedAmounts$indepe3 === void 0 ? void 0 : _parsedAmounts$indepe3.greaterThan(JSBI.BigInt(0))));
  var maximumAmountIn = useMaxAmountIn(trade, allowedSlippage);
  var allowance = usePermit2Allowance(maximumAmountIn !== null && maximumAmountIn !== void 0 ? maximumAmountIn : (_parsedAmounts$Field$3 = parsedAmounts[Field.INPUT]) !== null && _parsedAmounts$Field$3 !== void 0 && _parsedAmounts$Field$3.currency.isToken ? parsedAmounts[Field.INPUT] : undefined, isSupportedChain(chainId) ? UNIVERSAL_ROUTER_ADDRESS(chainId) : undefined, trade === null || trade === void 0 ? void 0 : trade.fillType);
  var maxInputAmount = useMemo(function () {
    return maxAmountSpend(currencyBalances[Field.INPUT]);
  }, [currencyBalances]);
  var showMaxButton = Boolean((maxInputAmount === null || maxInputAmount === void 0 ? void 0 : maxInputAmount.greaterThan(0)) && !((_parsedAmounts$Field$4 = parsedAmounts[Field.INPUT]) !== null && _parsedAmounts$Field$4 !== void 0 && _parsedAmounts$Field$4.equalTo(maxInputAmount)));
  var swapFiatValues = useMemo(function () {
    return {
      amountIn: fiatValueTradeInput.data,
      amountOut: fiatValueTradeOutput.data
    };
  }, [fiatValueTradeInput, fiatValueTradeOutput]);

  // the callback to execute the swap
  var swapCallback = useSwapCallback(trade, swapFiatValues, allowedSlippage, allowance.state === AllowanceState.ALLOWED ? allowance.permitSignature : undefined);
  var handleContinueToReview = useCallback(function () {
    setSwapState({
      tradeToConfirm: trade,
      swapError: undefined,
      showConfirm: true,
      swapResult: undefined
    });
  }, [trade]);
  var clearSwapState = useCallback(function () {
    setSwapState(function (currentState) {
      return _objectSpread(_objectSpread({}, currentState), {}, {
        swapError: undefined,
        swapResult: undefined
      });
    });
  }, []);
  var handleSwap = useCallback(function () {
    if (!swapCallback) {
      return;
    }
    if (preTaxStablecoinPriceImpact && !confirmPriceImpactWithoutFee(preTaxStablecoinPriceImpact)) {
      return;
    }
    swapCallback().then(function (result) {
      setSwapState(function (currentState) {
        return _objectSpread(_objectSpread({}, currentState), {}, {
          swapError: undefined,
          swapResult: result
        });
      });
    })["catch"](function (error) {
      setSwapState(function (currentState) {
        return _objectSpread(_objectSpread({}, currentState), {}, {
          swapError: error,
          swapResult: undefined
        });
      });
    });
  }, [swapCallback, preTaxStablecoinPriceImpact]);
  var handleOnWrap = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var txHash;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (onWrap) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          _context.prev = 2;
          _context.next = 5;
          return onWrap();
        case 5:
          txHash = _context.sent;
          setSwapState(function (currentState) {
            return _objectSpread(_objectSpread({}, currentState), {}, {
              swapError: undefined,
              txHash: txHash
            });
          });
          onUserInput(Field.INPUT, "");
          _context.next = 15;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          if (!didUserReject(_context.t0)) {
            sendAnalyticsEvent(SwapEventName.SWAP_ERROR, {
              wrapType: wrapType,
              input: currencies[Field.INPUT],
              output: currencies[Field.OUTPUT]
            });
          }
          console.error("Could not wrap/unwrap", _context.t0);
          setSwapState(function (currentState) {
            return _objectSpread(_objectSpread({}, currentState), {}, {
              swapError: _context.t0,
              txHash: undefined
            });
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 10]]);
  })), [currencies, onUserInput, onWrap, wrapType]);

  // warnings on the greater of fiat value price impact and execution price impact
  var _useMemo7 = useMemo(function () {
      if (!isClassicTrade(trade)) {
        return {
          priceImpactSeverity: 0,
          largerPriceImpact: undefined
        };
      }
      var marketPriceImpact = trade !== null && trade !== void 0 && trade.priceImpact ? computeRealizedPriceImpact(trade) : undefined;
      var largerPriceImpact = largerPercentValue(marketPriceImpact, preTaxStablecoinPriceImpact);
      return {
        priceImpactSeverity: warningSeverity(largerPriceImpact),
        largerPriceImpact: largerPriceImpact
      };
    }, [preTaxStablecoinPriceImpact, trade]),
    priceImpactSeverity = _useMemo7.priceImpactSeverity,
    largerPriceImpact = _useMemo7.largerPriceImpact;
  var handleConfirmDismiss = useCallback(function () {
    setSwapState(function (currentState) {
      return _objectSpread(_objectSpread({}, currentState), {}, {
        showConfirm: false
      });
    });
    // If there was a swap, we want to clear the input
    if (swapResult) {
      onUserInput(Field.INPUT, "");
    }
  }, [onUserInput, swapResult]);
  var handleAcceptChanges = useCallback(function () {
    setSwapState(function (currentState) {
      return _objectSpread(_objectSpread({}, currentState), {}, {
        tradeToConfirm: trade
      });
    });
  }, [trade]);
  var handleInputSelect = useCallback(function (inputCurrency) {
    onCurrencySelection(Field.INPUT, inputCurrency);
    onCurrencyChange === null || onCurrencyChange === void 0 || onCurrencyChange(_defineProperty(_defineProperty({}, Field.INPUT, {
      currencyId: getSwapCurrencyId(inputCurrency)
    }), Field.OUTPUT, state[Field.OUTPUT]));
    maybeLogFirstSwapAction(trace);
  }, [onCurrencyChange, onCurrencySelection, state, trace]);
  var inputCurrencyNumericalInputRef = useRef(null);
  var handleMaxInput = useCallback(function () {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact());
    maybeLogFirstSwapAction(trace);
  }, [maxInputAmount, onUserInput, trace]);
  var handleOutputSelect = useCallback(function (outputCurrency) {
    onCurrencySelection(Field.OUTPUT, outputCurrency);
    onCurrencyChange === null || onCurrencyChange === void 0 || onCurrencyChange(_defineProperty(_defineProperty({}, Field.INPUT, state[Field.INPUT]), Field.OUTPUT, {
      currencyId: getSwapCurrencyId(outputCurrency)
    }));
    maybeLogFirstSwapAction(trace);
  }, [onCurrencyChange, onCurrencySelection, state, trace]);
  var showPriceImpactWarning = isClassicTrade(trade) && largerPriceImpact && priceImpactSeverity > 3;
  var prevTrade = usePrevious(trade);
  useEffect(function () {
    if (!trade || prevTrade === trade) return; // no new swap quote to log

    sendAnalyticsEvent(SwapEventName.SWAP_QUOTE_RECEIVED, _objectSpread(_objectSpread({}, formatSwapQuoteReceivedEventProperties(trade, allowedSlippage, swapQuoteLatency, inputTax, outputTax)), trace));
  }, [prevTrade, trade, trace, allowedSlippage, swapQuoteLatency, inputTax, outputTax]);
  var showDetailsDropdown = Boolean(!showWrap && userHasSpecifiedInputOutput && (trade || routeIsLoading || routeIsSyncing));
  var inputCurrency = (_currencies$Field$INP = currencies[Field.INPUT]) !== null && _currencies$Field$INP !== void 0 ? _currencies$Field$INP : undefined;
  var switchChain = useSwitchChain();
  var switchingChain = useAppSelector(function (state) {
    return state.wallets.switchingChain;
  });
  var showOptInSmall = !useScreenSize().navSearchInputVisible;
  var isDark = useIsDarkMode();
  var isUniswapXDefaultEnabled = useUniswapXDefaultEnabled();
  var swapElement = /*#__PURE__*/React__default.createElement(SwapWrapper, {
    isDark: isDark,
    className: className,
    id: "swap-page"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      backgroundColor: colors.dark_blue,
      padding: 8
    }
  }, /*#__PURE__*/React__default.createElement(TokenSafetyModal, {
    isOpen: importTokensNotInDefault.length > 0 && !dismissTokenWarning,
    tokenAddress: (_importTokensNotInDef = importTokensNotInDefault[0]) === null || _importTokensNotInDef === void 0 ? void 0 : _importTokensNotInDef.address,
    secondTokenAddress: (_importTokensNotInDef2 = importTokensNotInDefault[1]) === null || _importTokensNotInDef2 === void 0 ? void 0 : _importTokensNotInDef2.address,
    onContinue: handleConfirmTokenWarning,
    onCancel: handleDismissTokenWarning,
    showCancel: true
  }), trade && showConfirm && /*#__PURE__*/React__default.createElement(ConfirmSwapModal, {
    trade: trade,
    inputCurrency: inputCurrency,
    originalTrade: tradeToConfirm,
    onAcceptChanges: handleAcceptChanges,
    onCurrencySelection: onCurrencySelection,
    swapResult: swapResult,
    allowedSlippage: allowedSlippage,
    clearSwapState: clearSwapState,
    onConfirm: handleSwap,
    allowance: allowance,
    swapError: swapError,
    onDismiss: handleConfirmDismiss,
    fiatValueInput: fiatValueTradeInput,
    fiatValueOutput: fiatValueTradeOutput
  }), showPriceImpactModal && showPriceImpactWarning && /*#__PURE__*/React__default.createElement(PriceImpactModal, {
    priceImpact: largerPriceImpact,
    onDismiss: function onDismiss() {
      return setShowPriceImpactModal(false);
    },
    onContinue: function onContinue() {
      setShowPriceImpactModal(false);
      handleContinueToReview();
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "relative"
    }
  }, /*#__PURE__*/React__default.createElement(SwapSection, null, /*#__PURE__*/React__default.createElement(Trace, {
    section: InterfaceSectionName.CURRENCY_INPUT_PANEL
  }, /*#__PURE__*/React__default.createElement(SwapCurrencyInputPanel, {
    label: /*#__PURE__*/React__default.createElement(Trans, {
      id: "xNB0TS",
      message: "Sell"
    }),
    disabled: disableTokenInputs,
    value: formattedAmounts[Field.INPUT],
    showMaxButton: showMaxButton,
    currency: (_currencies$Field$INP2 = currencies[Field.INPUT]) !== null && _currencies$Field$INP2 !== void 0 ? _currencies$Field$INP2 : null,
    onUserInput: handleTypeInput,
    onMax: handleMaxInput,
    fiatValue: showFiatValueInput ? fiatValueInput : undefined,
    onCurrencySelect: handleInputSelect,
    otherCurrency: currencies[Field.OUTPUT],
    showCommonBases: true,
    id: InterfaceSectionName.CURRENCY_INPUT_PANEL,
    loading: independentField === Field.OUTPUT && routeIsSyncing,
    ref: inputCurrencyNumericalInputRef
  }))), /*#__PURE__*/React__default.createElement(ArrowWrapper, {
    clickable: isSupportedChain(chainId)
  }, /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SwapEventName.SWAP_TOKENS_REVERSED,
    element: InterfaceElementName.SWAP_TOKENS_REVERSE_ARROW_BUTTON
  }, /*#__PURE__*/React__default.createElement(ArrowContainer, {
    "data-testid": "swap-currency-button",
    onClick: function onClick() {
      if (disableTokenInputs) return;
      onSwitchTokens(inputTokenHasTax, formattedAmounts[dependentField]);
      maybeLogFirstSwapAction(trace);
    }
  }, /*#__PURE__*/React__default.createElement(Repeat, {
    size: "24",
    color: colors.light_blue
  }))))), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(OutputSwapSection, null, /*#__PURE__*/React__default.createElement(Trace, {
    section: InterfaceSectionName.CURRENCY_OUTPUT_PANEL
  }, /*#__PURE__*/React__default.createElement(SwapCurrencyInputPanel, {
    value: formattedAmounts[Field.OUTPUT],
    disabled: disableTokenInputs,
    onUserInput: handleTypeOutput,
    label: /*#__PURE__*/React__default.createElement(Trans, {
      id: "qiOIiY",
      message: "Buy"
    }),
    showMaxButton: false,
    hideBalance: false,
    fiatValue: showFiatValueOutput ? fiatValueOutput : undefined,
    priceImpact: stablecoinPriceImpact,
    currency: (_currencies$Field$OUT = currencies[Field.OUTPUT]) !== null && _currencies$Field$OUT !== void 0 ? _currencies$Field$OUT : null,
    onCurrencySelect: handleOutputSelect,
    otherCurrency: currencies[Field.INPUT],
    showCommonBases: true,
    id: InterfaceSectionName.CURRENCY_OUTPUT_PANEL,
    loading: independentField === Field.INPUT && routeIsSyncing,
    numericalInputSettings: {
      // We disable numerical input here if the selected token has tax, since we cannot guarantee exact_outputs for FOT tokens
      disabled: outputTokenHasTax,
      // Focus the input currency panel if the user tries to type into the disabled output currency panel
      onDisabledClick: function onDisabledClick() {
        var _inputCurrencyNumeric;
        return (_inputCurrencyNumeric = inputCurrencyNumericalInputRef.current) === null || _inputCurrencyNumeric === void 0 ? void 0 : _inputCurrencyNumeric.focus();
      },
      disabledTooltipBody: /*#__PURE__*/React__default.createElement(OutputTaxTooltipBody, {
        currencySymbol: (_currencies$Field$OUT2 = currencies[Field.OUTPUT]) === null || _currencies$Field$OUT2 === void 0 ? void 0 : _currencies$Field$OUT2.symbol
      })
    }
  })), recipient !== null && !showWrap ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(AutoRow, {
    justify: "space-between",
    style: {
      padding: "0 1rem"
    }
  }, /*#__PURE__*/React__default.createElement(ArrowWrapper, {
    clickable: false
  }, /*#__PURE__*/React__default.createElement(ArrowDown, {
    size: "16",
    color: theme.neutral2
  })), /*#__PURE__*/React__default.createElement(LinkStyledButton, {
    id: "remove-recipient-button",
    onClick: function onClick() {
      return onChangeRecipient(null);
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "ZA1iFe",
    message: "- Remove recipient"
  }))), /*#__PURE__*/React__default.createElement(AddressInputPanel, {
    id: "recipient",
    value: recipient,
    onChange: onChangeRecipient
  })) : null)), showPriceImpactWarning && /*#__PURE__*/React__default.createElement(PriceImpactWarning, {
    priceImpact: largerPriceImpact
  }), /*#__PURE__*/React__default.createElement("div", null, swapIsUnsupported ? /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    $borderRadius: "16px",
    disabled: true
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    mb: "4px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Z941Tw",
    message: "Unsupported asset"
  }))) : switchingChain ? /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    $borderRadius: "16px",
    disabled: true
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "dygCbX",
    message: "Connecting to {0}",
    values: {
      "0": (_getChainInfo = getChainInfo(switchingChain)) === null || _getChainInfo === void 0 ? void 0 : _getChainInfo.label
    }
  })) : connectionReady && !account ? /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED,
    properties: {
      received_swap_quote: getIsReviewableQuote(trade, tradeState, swapInputError)
    },
    element: InterfaceElementName.CONNECT_WALLET_BUTTON
  }, /*#__PURE__*/React__default.createElement(ButtonLight, {
    onClick: toggleWalletDrawer,
    fontWeight: 535,
    $borderRadius: "16px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "VHOVEJ",
    message: "Connect wallet"
  }))) : chainId && chainId !== connectedChainId ? /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    $borderRadius: "16px",
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return switchChain(connector, chainId);
          case 3:
            _context2.next = 11;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            if (!didUserReject(_context2.t0)) {
              _context2.next = 10;
              break;
            }
            _context2.next = 11;
            break;
          case 10:
            throw _context2.t0;
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 5]]);
    }))
  }, "Connect to ", (_getChainInfo2 = getChainInfo(chainId)) === null || _getChainInfo2 === void 0 ? void 0 : _getChainInfo2.label) : showWrap ? /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    $borderRadius: "16px",
    disabled: Boolean(wrapInputError),
    onClick: handleOnWrap,
    fontWeight: 535,
    "data-testid": "wrap-button"
  }, wrapInputError ? /*#__PURE__*/React__default.createElement(WrapErrorText, {
    wrapInputError: wrapInputError
  }) : wrapType === WrapType.WRAP ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "hf18Me",
    message: "Wrap"
  }) : wrapType === WrapType.UNWRAP ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "R3B9EM",
    message: "Unwrap"
  }) : null) : routeNotFound && userHasSpecifiedInputOutput && !routeIsLoading && !routeIsSyncing ? /*#__PURE__*/React__default.createElement(GrayCard, {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    mb: "4px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "t2JA0p",
    message: "Insufficient liquidity for this trade."
  }))) : /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SharedEventName.ELEMENT_CLICKED,
    element: InterfaceElementName.SWAP_BUTTON
  }, /*#__PURE__*/React__default.createElement(ButtonError, {
    onClick: function onClick() {
      showPriceImpactWarning ? setShowPriceImpactModal(true) : handleContinueToReview();
    },
    id: "swap-button",
    "data-testid": "swap-button",
    disabled: !getIsReviewableQuote(trade, tradeState, swapInputError),
    error: !swapInputError && priceImpactSeverity > 2 && allowance.state === AllowanceState.ALLOWED
  }, /*#__PURE__*/React__default.createElement(Text, {
    fontSize: 20
  }, swapInputError ? swapInputError : routeIsSyncing || routeIsLoading ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "vH2C/2",
    message: "Swap"
  }) : priceImpactSeverity > 2 ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "+q+Wa9",
    message: "Swap anyway"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "vH2C/2",
    message: "Swap"
  })))))), !showOptInSmall && !isUniswapXDefaultEnabled && /*#__PURE__*/React__default.createElement(UniswapXOptIn, {
    isSmall: false,
    swapInfo: swapInfo
  })), showDetailsDropdown && /*#__PURE__*/React__default.createElement(SwapDetailsDropdown, {
    trade: trade,
    syncing: routeIsSyncing,
    loading: routeIsLoading,
    allowedSlippage: allowedSlippage
  }));
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, swapElement, showOptInSmall && !isUniswapXDefaultEnabled && /*#__PURE__*/React__default.createElement(UniswapXOptIn, {
    isSmall: true,
    swapInfo: swapInfo
  }));
}

export { ArrowContainer, Swap, SwapPage as default };
