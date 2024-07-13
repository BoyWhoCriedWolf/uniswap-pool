'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var sdkCore = require('@uniswap/sdk-core');
var universalRouterSdk = require('@uniswap/universal-router-sdk');
var core = require('@web3-react/core');
var index = require('../../analytics/index.cjs');
var index$2 = require('../../components/AccountDrawer/index.cjs');
var index$7 = require('../../components/AddressInputPanel/index.cjs');
var index$8 = require('../../components/Button/index.cjs');
var index$9 = require('../../components/Card/index.cjs');
var index$4 = require('../../components/Column/index.cjs');
var SwapCurrencyInputPanel = require('../../components/CurrencyInputPanel/SwapCurrencyInputPanel.cjs');
var NetworkAlert = require('../../components/NetworkAlert/NetworkAlert.cjs');
var index$5 = require('../../components/Row/index.cjs');
var confirmPriceImpactWithoutFee = require('../../components/swap/confirmPriceImpactWithoutFee.cjs');
var ConfirmSwapModal = require('../../components/swap/ConfirmSwapModal.cjs');
var PriceImpactModal = require('../../components/swap/PriceImpactModal.cjs');
var PriceImpactWarning = require('../../components/swap/PriceImpactWarning.cjs');
var styled$1 = require('../../components/swap/styled.cjs');
var SwapDetailsDropdown = require('../../components/swap/SwapDetailsDropdown.cjs');
var index$1 = require('../../components/SwitchLocaleLink/index.cjs');
var TokenSafetyModal = require('../../components/TokenSafety/TokenSafetyModal.cjs');
var eagerlyConnect = require('../../connection/eagerlyConnect.cjs');
var chainInfo = require('../../constants/chainInfo.cjs');
var chains = require('../../constants/chains.cjs');
var tokens = require('../../constants/tokens.cjs');
var uniswapXDefault = require('../../featureFlags/flags/uniswapXDefault.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var useIsSwapUnsupported = require('../../hooks/useIsSwapUnsupported.cjs');
var useMaxAmountIn = require('../../hooks/useMaxAmountIn.cjs');
var usePermit2Allowance = require('../../hooks/usePermit2Allowance.cjs');
var usePrevious = require('../../hooks/usePrevious.cjs');
var useSwapCallback = require('../../hooks/useSwapCallback.cjs');
var useSwitchChain = require('../../hooks/useSwitchChain.cjs');
var useUSDPrice = require('../../hooks/useUSDPrice.cjs');
var useWrapCallback = require('../../hooks/useWrapCallback.cjs');
var JSBI = require('jsbi');
var analytics$1 = require('../../lib/utils/analytics.cjs');
var reactFeather = require('react-feather');
var rebass = require('rebass');
var hooks$1 = require('../../state/hooks.cjs');
var types = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');
var actions = require('../../state/swap/actions.cjs');
var hooks = require('../../state/swap/hooks.cjs');
var reducer = require('../../state/swap/reducer.cjs');
var styled = require('styled-components');
var colors = require('../../theme/colors.cjs');
var index$6 = require('../../theme/components/index.cjs');
var swapFlowLoggers = require('../../tracing/swapFlowLoggers.cjs');
var computeFiatValuePriceImpact = require('../../utils/computeFiatValuePriceImpact.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var maxAmountSpend = require('../../utils/maxAmountSpend.cjs');
var prices = require('../../utils/prices.cjs');
var swapErrorToUserReadableMessage = require('../../utils/swapErrorToUserReadableMessage.cjs');
var useScreenSize = require('../../hooks/useScreenSize.cjs');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var TaxTooltipBody = require('./TaxTooltipBody.cjs');
var UniswapXOptIn = require('./UniswapXOptIn.cjs');
var text = require('../../theme/components/text.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ArrowContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  width: 100%;\n  height: 100%;\n"])));
var SwapSection = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  // background-color: ", ";\n\n  border-radius: 16px;\n  color: ", ";\n  font-size: 16px;\n  font-weight: 700;\n  height: 120px;\n  line-height: 20px;\n  position: relative;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var OutputSwapSection = styled__default["default"](SwapSection)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  border-bottom: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return "1px solid ".concat(theme.surface1);
});
function getIsReviewableQuote(trade, tradeState, swapInputError) {
  if (swapInputError) return false;
  // if the current quote is a preview quote, allow the user to progress to the Swap review screen
  if (utils.isPreviewTrade(trade)) return true;
  return Boolean(trade && tradeState === types.TradeState.VALID);
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
  var _useWeb3React = core.useWeb3React(),
    connectedChainId = _useWeb3React.chainId;
  // const loadedUrlParams = useDefaultsFromURLSearch();

  // const location = useLocation();

  var supportedChainId = chains.asSupportedChain(connectedChainId);
  return /*#__PURE__*/React__default["default"].createElement(index.Trace, {
    page: analyticsEvents.InterfacePageName.SWAP_PAGE,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(Swap, {
    className: className,
    chainId: supportedChainId !== null && supportedChainId !== void 0 ? supportedChainId : sdkCore.ChainId.MAINNET
    // initialInputCurrencyId={loadedUrlParams?.[Field.INPUT]?.currencyId}
    // initialOutputCurrencyId={loadedUrlParams?.[Field.OUTPUT]?.currencyId}
    ,
    disableTokenInputs: supportedChainId === undefined
  }), /*#__PURE__*/React__default["default"].createElement(NetworkAlert.NetworkAlert, null), /*#__PURE__*/React__default["default"].createElement(index$1.SwitchLocaleLink, null));
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
  var connectionReady = eagerlyConnect.useConnectionReady();
  var _useWeb3React2 = core.useWeb3React(),
    account = _useWeb3React2.account,
    connectedChainId = _useWeb3React2.chainId,
    connector = _useWeb3React2.connector;
  var trace = analytics.useTrace();

  // token warning stuff
  var prefilledInputCurrency = Tokens.useCurrency(initialInputCurrencyId);
  var prefilledOutputCurrency = Tokens.useCurrency(initialOutputCurrencyId);
  var _useState = React.useState(prefilledInputCurrency),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    loadedInputCurrency = _useState2[0],
    setLoadedInputCurrency = _useState2[1];
  var _useState3 = React.useState(prefilledOutputCurrency),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    loadedOutputCurrency = _useState4[0],
    setLoadedOutputCurrency = _useState4[1];
  React.useEffect(function () {
    setLoadedInputCurrency(prefilledInputCurrency);
    setLoadedOutputCurrency(prefilledOutputCurrency);
  }, [prefilledInputCurrency, prefilledOutputCurrency]);
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    dismissTokenWarning = _useState6[0],
    setDismissTokenWarning = _useState6[1];
  var _useState7 = React.useState(false),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    showPriceImpactModal = _useState8[0],
    setShowPriceImpactModal = _useState8[1];
  var urlLoadedTokens = React.useMemo(function () {
    var _filter, _ref6;
    return (_filter = (_ref6 = [loadedInputCurrency, loadedOutputCurrency]) === null || _ref6 === void 0 ? void 0 : _ref6.filter(function (c) {
      var _c$isToken;
      return (_c$isToken = c === null || c === void 0 ? void 0 : c.isToken) !== null && _c$isToken !== void 0 ? _c$isToken : false;
    })) !== null && _filter !== void 0 ? _filter : [];
  }, [loadedInputCurrency, loadedOutputCurrency]);
  var handleConfirmTokenWarning = React.useCallback(function () {
    setDismissTokenWarning(true);
  }, []);

  // dismiss warning if all imported tokens are in active lists
  var defaultTokens = Tokens.useDefaultActiveTokens(chainId);
  var importTokensNotInDefault = React.useMemo(function () {
    return urlLoadedTokens && urlLoadedTokens.filter(function (token) {
      return !(token.address in defaultTokens);
    }).filter(function (token) {
      // Any token addresses that are loaded from the shorthands map do not need to show the import URL
      var supported = chains.asSupportedChain(chainId);
      if (!supported) return true;
      return !Object.keys(tokens.TOKEN_SHORTHANDS).some(function (shorthand) {
        var shorthandTokenAddress = tokens.TOKEN_SHORTHANDS[shorthand][supported];
        return shorthandTokenAddress && shorthandTokenAddress === token.address;
      });
    });
  }, [chainId, defaultTokens, urlLoadedTokens]);
  var theme = styled.useTheme();

  // toggle wallet when disconnected
  var toggleWalletDrawer = index$2.useToggleAccountDrawer();

  // swap state
  var prefilledState = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, {
      currencyId: initialInputCurrencyId
    }), actions.Field.OUTPUT, {
      currencyId: initialOutputCurrencyId
    });
  }, [initialInputCurrencyId, initialOutputCurrencyId]);
  var _useReducer = React.useReducer(reducer["default"], _objectSpread(_objectSpread({}, reducer.initialState), prefilledState)),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  var typedValue = state.typedValue,
    recipient = state.recipient,
    independentField = state.independentField;
  var previousConnectedChainId = usePrevious(connectedChainId);
  var previousPrefilledState = usePrevious(prefilledState);
  React.useEffect(function () {
    var _previousPrefilledSta, _prefilledState$Field, _previousPrefilledSta2, _prefilledState$Field2;
    var combinedInitialState = _objectSpread(_objectSpread({}, reducer.initialState), prefilledState);
    var chainChanged = previousConnectedChainId && previousConnectedChainId !== connectedChainId;
    var prefilledInputChanged = previousPrefilledState && (previousPrefilledState === null || previousPrefilledState === void 0 || (_previousPrefilledSta = previousPrefilledState[actions.Field.INPUT]) === null || _previousPrefilledSta === void 0 ? void 0 : _previousPrefilledSta.currencyId) !== (prefilledState === null || prefilledState === void 0 || (_prefilledState$Field = prefilledState[actions.Field.INPUT]) === null || _prefilledState$Field === void 0 ? void 0 : _prefilledState$Field.currencyId);
    var prefilledOutputChanged = previousPrefilledState && (previousPrefilledState === null || previousPrefilledState === void 0 || (_previousPrefilledSta2 = previousPrefilledState[actions.Field.OUTPUT]) === null || _previousPrefilledSta2 === void 0 ? void 0 : _previousPrefilledSta2.currencyId) !== (prefilledState === null || prefilledState === void 0 || (_prefilledState$Field2 = prefilledState[actions.Field.OUTPUT]) === null || _prefilledState$Field2 === void 0 ? void 0 : _prefilledState$Field2.currencyId);
    if (chainChanged || prefilledInputChanged || prefilledOutputChanged) {
      var _combinedInitialState, _combinedInitialState2, _combinedInitialState3;
      dispatch(actions.replaceSwapState(_objectSpread(_objectSpread(_objectSpread({}, reducer.initialState), prefilledState), {}, {
        field: (_combinedInitialState = combinedInitialState.independentField) !== null && _combinedInitialState !== void 0 ? _combinedInitialState : actions.Field.INPUT,
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
  var swapInfo = hooks.useDerivedSwapInfo(state, chainId);
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
  var _useMemo = React.useMemo(function () {
      return [!inputTax.equalTo(0), !outputTax.equalTo(0)];
    }, [inputTax, outputTax]),
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 2),
    inputTokenHasTax = _useMemo2[0],
    outputTokenHasTax = _useMemo2[1];
  React.useEffect(function () {
    // Force exact input if the user switches to an output token with tax
    if (outputTokenHasTax && independentField === actions.Field.OUTPUT) dispatch(actions.forceExactInput());
  }, [independentField, outputTokenHasTax, trade === null || trade === void 0 ? void 0 : trade.outputAmount]);
  var _useWrapCallback = useWrapCallback["default"](currencies[actions.Field.INPUT], currencies[actions.Field.OUTPUT], typedValue),
    wrapType = _useWrapCallback.wrapType,
    onWrap = _useWrapCallback.execute,
    wrapInputError = _useWrapCallback.inputError;
  var showWrap = wrapType !== useWrapCallback.WrapType.NOT_APPLICABLE;
  var parsedAmounts = React.useMemo(function () {
    return showWrap ? _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, parsedAmount), actions.Field.OUTPUT, parsedAmount) : _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, independentField === actions.Field.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount), actions.Field.OUTPUT, independentField === actions.Field.OUTPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.postTaxOutputAmount);
  }, [independentField, parsedAmount, showWrap, trade]);
  var showFiatValueInput = Boolean(parsedAmounts[actions.Field.INPUT]);
  var showFiatValueOutput = Boolean(parsedAmounts[actions.Field.OUTPUT]);
  var getSingleUnitAmount = function getSingleUnitAmount(currency) {
    if (!currency) return;
    return sdkCore.CurrencyAmount.fromRawAmount(currency, JSBI__default["default"].BigInt(Math.pow(10, currency.decimals)));
  };
  var fiatValueInput = useUSDPrice.useUSDPrice((_parsedAmounts$Field$ = parsedAmounts[actions.Field.INPUT]) !== null && _parsedAmounts$Field$ !== void 0 ? _parsedAmounts$Field$ : getSingleUnitAmount(currencies[actions.Field.INPUT]), currencies[actions.Field.INPUT]);
  var fiatValueOutput = useUSDPrice.useUSDPrice((_parsedAmounts$Field$2 = parsedAmounts[actions.Field.OUTPUT]) !== null && _parsedAmounts$Field$2 !== void 0 ? _parsedAmounts$Field$2 : getSingleUnitAmount(currencies[actions.Field.OUTPUT]), currencies[actions.Field.OUTPUT]);
  var _useMemo3 = React.useMemo(function () {
      return [tradeState === types.TradeState.NO_ROUTE_FOUND, tradeState === types.TradeState.LOADING, tradeState === types.TradeState.LOADING && Boolean(trade)];
    }, [trade, tradeState]),
    _useMemo4 = _slicedToArray__default["default"](_useMemo3, 3),
    routeNotFound = _useMemo4[0],
    routeIsLoading = _useMemo4[1],
    routeIsSyncing = _useMemo4[2];
  var fiatValueTradeInput = useUSDPrice.useUSDPrice(trade === null || trade === void 0 ? void 0 : trade.inputAmount);
  var fiatValueTradeOutput = useUSDPrice.useUSDPrice(trade === null || trade === void 0 ? void 0 : trade.postTaxOutputAmount);
  var preTaxFiatValueTradeOutput = useUSDPrice.useUSDPrice(trade === null || trade === void 0 ? void 0 : trade.outputAmount);
  var _useMemo5 = React.useMemo(function () {
      return routeIsSyncing || !utils.isClassicTrade(trade) ? [undefined, undefined] : [computeFiatValuePriceImpact.computeFiatValuePriceImpact(fiatValueTradeInput.data, fiatValueTradeOutput.data), computeFiatValuePriceImpact.computeFiatValuePriceImpact(fiatValueTradeInput.data, preTaxFiatValueTradeOutput.data)];
    }, [fiatValueTradeInput, fiatValueTradeOutput, preTaxFiatValueTradeOutput, routeIsSyncing, trade]),
    _useMemo6 = _slicedToArray__default["default"](_useMemo5, 2),
    stablecoinPriceImpact = _useMemo6[0],
    preTaxStablecoinPriceImpact = _useMemo6[1];
  var _useSwapActionHandler = hooks.useSwapActionHandlers(dispatch),
    onSwitchTokens = _useSwapActionHandler.onSwitchTokens,
    onCurrencySelection = _useSwapActionHandler.onCurrencySelection,
    onUserInput = _useSwapActionHandler.onUserInput,
    onChangeRecipient = _useSwapActionHandler.onChangeRecipient;
  var dependentField = independentField === actions.Field.INPUT ? actions.Field.OUTPUT : actions.Field.INPUT;
  var handleTypeInput = React.useCallback(function (value) {
    onUserInput(actions.Field.INPUT, value);
    swapFlowLoggers.maybeLogFirstSwapAction(trace);
  }, [onUserInput, trace]);
  var handleTypeOutput = React.useCallback(function (value) {
    onUserInput(actions.Field.OUTPUT, value);
    swapFlowLoggers.maybeLogFirstSwapAction(trace);
  }, [onUserInput, trace]);

  // const navigate = useNavigate();
  var swapIsUnsupported = useIsSwapUnsupported.useIsSwapUnsupported(currencies[actions.Field.INPUT], currencies[actions.Field.OUTPUT]);

  // reset if they close warning without tokens in params
  var handleDismissTokenWarning = React.useCallback(function () {
    setDismissTokenWarning(true);
  }, []);
  //   navigate("/swap/");
  // }, [navigate]);

  // modal and loading
  var _useState9 = React.useState({
      showConfirm: false,
      tradeToConfirm: undefined,
      swapError: undefined,
      swapResult: undefined
    }),
    _useState10 = _slicedToArray__default["default"](_useState9, 2),
    _useState10$ = _useState10[0],
    showConfirm = _useState10$.showConfirm,
    tradeToConfirm = _useState10$.tradeToConfirm,
    swapError = _useState10$.swapError,
    swapResult = _useState10$.swapResult,
    setSwapState = _useState10[1];
  var _useFormatter = formatNumbers.useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var formattedAmounts = React.useMemo(function () {
    var _parsedAmounts$indepe, _parsedAmounts$indepe2;
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, independentField, typedValue), dependentField, showWrap ? (_parsedAmounts$indepe = (_parsedAmounts$indepe2 = parsedAmounts[independentField]) === null || _parsedAmounts$indepe2 === void 0 ? void 0 : _parsedAmounts$indepe2.toExact()) !== null && _parsedAmounts$indepe !== void 0 ? _parsedAmounts$indepe : "" : formatCurrencyAmount({
      amount: parsedAmounts[dependentField],
      type: formatNumbers.NumberType.SwapTradeAmount,
      placeholder: ""
    }));
  }, [dependentField, formatCurrencyAmount, independentField, parsedAmounts, showWrap, typedValue]);
  var userHasSpecifiedInputOutput = Boolean(currencies[actions.Field.INPUT] && currencies[actions.Field.OUTPUT] && ((_parsedAmounts$indepe3 = parsedAmounts[independentField]) === null || _parsedAmounts$indepe3 === void 0 ? void 0 : _parsedAmounts$indepe3.greaterThan(JSBI__default["default"].BigInt(0))));
  var maximumAmountIn = useMaxAmountIn.useMaxAmountIn(trade, allowedSlippage);
  var allowance = usePermit2Allowance["default"](maximumAmountIn !== null && maximumAmountIn !== void 0 ? maximumAmountIn : (_parsedAmounts$Field$3 = parsedAmounts[actions.Field.INPUT]) !== null && _parsedAmounts$Field$3 !== void 0 && _parsedAmounts$Field$3.currency.isToken ? parsedAmounts[actions.Field.INPUT] : undefined, chains.isSupportedChain(chainId) ? universalRouterSdk.UNIVERSAL_ROUTER_ADDRESS(chainId) : undefined, trade === null || trade === void 0 ? void 0 : trade.fillType);
  var maxInputAmount = React.useMemo(function () {
    return maxAmountSpend.maxAmountSpend(currencyBalances[actions.Field.INPUT]);
  }, [currencyBalances]);
  var showMaxButton = Boolean((maxInputAmount === null || maxInputAmount === void 0 ? void 0 : maxInputAmount.greaterThan(0)) && !((_parsedAmounts$Field$4 = parsedAmounts[actions.Field.INPUT]) !== null && _parsedAmounts$Field$4 !== void 0 && _parsedAmounts$Field$4.equalTo(maxInputAmount)));
  var swapFiatValues = React.useMemo(function () {
    return {
      amountIn: fiatValueTradeInput.data,
      amountOut: fiatValueTradeOutput.data
    };
  }, [fiatValueTradeInput, fiatValueTradeOutput]);

  // the callback to execute the swap
  var swapCallback = useSwapCallback.useSwapCallback(trade, swapFiatValues, allowedSlippage, allowance.state === usePermit2Allowance.AllowanceState.ALLOWED ? allowance.permitSignature : undefined);
  var handleContinueToReview = React.useCallback(function () {
    setSwapState({
      tradeToConfirm: trade,
      swapError: undefined,
      showConfirm: true,
      swapResult: undefined
    });
  }, [trade]);
  var clearSwapState = React.useCallback(function () {
    setSwapState(function (currentState) {
      return _objectSpread(_objectSpread({}, currentState), {}, {
        swapError: undefined,
        swapResult: undefined
      });
    });
  }, []);
  var handleSwap = React.useCallback(function () {
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
  var handleOnWrap = React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    var txHash;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
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
          onUserInput(actions.Field.INPUT, "");
          _context.next = 15;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          if (!swapErrorToUserReadableMessage.didUserReject(_context.t0)) {
            index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_ERROR, {
              wrapType: wrapType,
              input: currencies[actions.Field.INPUT],
              output: currencies[actions.Field.OUTPUT]
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
  var _useMemo7 = React.useMemo(function () {
      if (!utils.isClassicTrade(trade)) {
        return {
          priceImpactSeverity: 0,
          largerPriceImpact: undefined
        };
      }
      var marketPriceImpact = trade !== null && trade !== void 0 && trade.priceImpact ? prices.computeRealizedPriceImpact(trade) : undefined;
      var largerPriceImpact = largerPercentValue(marketPriceImpact, preTaxStablecoinPriceImpact);
      return {
        priceImpactSeverity: prices.warningSeverity(largerPriceImpact),
        largerPriceImpact: largerPriceImpact
      };
    }, [preTaxStablecoinPriceImpact, trade]),
    priceImpactSeverity = _useMemo7.priceImpactSeverity,
    largerPriceImpact = _useMemo7.largerPriceImpact;
  var handleConfirmDismiss = React.useCallback(function () {
    setSwapState(function (currentState) {
      return _objectSpread(_objectSpread({}, currentState), {}, {
        showConfirm: false
      });
    });
    // If there was a swap, we want to clear the input
    if (swapResult) {
      onUserInput(actions.Field.INPUT, "");
    }
  }, [onUserInput, swapResult]);
  var handleAcceptChanges = React.useCallback(function () {
    setSwapState(function (currentState) {
      return _objectSpread(_objectSpread({}, currentState), {}, {
        tradeToConfirm: trade
      });
    });
  }, [trade]);
  var handleInputSelect = React.useCallback(function (inputCurrency) {
    onCurrencySelection(actions.Field.INPUT, inputCurrency);
    onCurrencyChange === null || onCurrencyChange === void 0 || onCurrencyChange(_defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, {
      currencyId: tokens.getSwapCurrencyId(inputCurrency)
    }), actions.Field.OUTPUT, state[actions.Field.OUTPUT]));
    swapFlowLoggers.maybeLogFirstSwapAction(trace);
  }, [onCurrencyChange, onCurrencySelection, state, trace]);
  var inputCurrencyNumericalInputRef = React.useRef(null);
  var handleMaxInput = React.useCallback(function () {
    maxInputAmount && onUserInput(actions.Field.INPUT, maxInputAmount.toExact());
    swapFlowLoggers.maybeLogFirstSwapAction(trace);
  }, [maxInputAmount, onUserInput, trace]);
  var handleOutputSelect = React.useCallback(function (outputCurrency) {
    onCurrencySelection(actions.Field.OUTPUT, outputCurrency);
    onCurrencyChange === null || onCurrencyChange === void 0 || onCurrencyChange(_defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, state[actions.Field.INPUT]), actions.Field.OUTPUT, {
      currencyId: tokens.getSwapCurrencyId(outputCurrency)
    }));
    swapFlowLoggers.maybeLogFirstSwapAction(trace);
  }, [onCurrencyChange, onCurrencySelection, state, trace]);
  var showPriceImpactWarning = utils.isClassicTrade(trade) && largerPriceImpact && priceImpactSeverity > 3;
  var prevTrade = usePrevious(trade);
  React.useEffect(function () {
    if (!trade || prevTrade === trade) return; // no new swap quote to log

    index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_QUOTE_RECEIVED, _objectSpread(_objectSpread({}, analytics$1.formatSwapQuoteReceivedEventProperties(trade, allowedSlippage, swapQuoteLatency, inputTax, outputTax)), trace));
  }, [prevTrade, trade, trace, allowedSlippage, swapQuoteLatency, inputTax, outputTax]);
  var showDetailsDropdown = Boolean(!showWrap && userHasSpecifiedInputOutput && (trade || routeIsLoading || routeIsSyncing));
  var inputCurrency = (_currencies$Field$INP = currencies[actions.Field.INPUT]) !== null && _currencies$Field$INP !== void 0 ? _currencies$Field$INP : undefined;
  var switchChain = useSwitchChain.useSwitchChain();
  var switchingChain = hooks$1.useAppSelector(function (state) {
    return state.wallets.switchingChain;
  });
  var showOptInSmall = !useScreenSize.useScreenSize().navSearchInputVisible;
  var isDark = ThemeToggle.useIsDarkMode();
  var isUniswapXDefaultEnabled = uniswapXDefault.useUniswapXDefaultEnabled();
  var swapElement = /*#__PURE__*/React__default["default"].createElement(styled$1.SwapWrapper, {
    isDark: isDark,
    className: className,
    id: "swap-page"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      backgroundColor: colors.colors.dark_blue,
      padding: 8
    }
  }, /*#__PURE__*/React__default["default"].createElement(TokenSafetyModal, {
    isOpen: importTokensNotInDefault.length > 0 && !dismissTokenWarning,
    tokenAddress: (_importTokensNotInDef = importTokensNotInDefault[0]) === null || _importTokensNotInDef === void 0 ? void 0 : _importTokensNotInDef.address,
    secondTokenAddress: (_importTokensNotInDef2 = importTokensNotInDefault[1]) === null || _importTokensNotInDef2 === void 0 ? void 0 : _importTokensNotInDef2.address,
    onContinue: handleConfirmTokenWarning,
    onCancel: handleDismissTokenWarning,
    showCancel: true
  }), trade && showConfirm && /*#__PURE__*/React__default["default"].createElement(ConfirmSwapModal["default"], {
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
  }), showPriceImpactModal && showPriceImpactWarning && /*#__PURE__*/React__default["default"].createElement(PriceImpactModal, {
    priceImpact: largerPriceImpact,
    onDismiss: function onDismiss() {
      return setShowPriceImpactModal(false);
    },
    onContinue: function onContinue() {
      setShowPriceImpactModal(false);
      handleContinueToReview();
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: "relative"
    }
  }, /*#__PURE__*/React__default["default"].createElement(SwapSection, null, /*#__PURE__*/React__default["default"].createElement(index.Trace, {
    section: analyticsEvents.InterfaceSectionName.CURRENCY_INPUT_PANEL
  }, /*#__PURE__*/React__default["default"].createElement(SwapCurrencyInputPanel, {
    label: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "xNB0TS",
      message: "Sell"
    }),
    disabled: disableTokenInputs,
    value: formattedAmounts[actions.Field.INPUT],
    showMaxButton: showMaxButton,
    currency: (_currencies$Field$INP2 = currencies[actions.Field.INPUT]) !== null && _currencies$Field$INP2 !== void 0 ? _currencies$Field$INP2 : null,
    onUserInput: handleTypeInput,
    onMax: handleMaxInput,
    fiatValue: showFiatValueInput ? fiatValueInput : undefined,
    onCurrencySelect: handleInputSelect,
    otherCurrency: currencies[actions.Field.OUTPUT],
    showCommonBases: true,
    id: analyticsEvents.InterfaceSectionName.CURRENCY_INPUT_PANEL,
    loading: independentField === actions.Field.OUTPUT && routeIsSyncing,
    ref: inputCurrencyNumericalInputRef
  }))), /*#__PURE__*/React__default["default"].createElement(styled$1.ArrowWrapper, {
    clickable: chains.isSupportedChain(chainId)
  }, /*#__PURE__*/React__default["default"].createElement(index.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SwapEventName.SWAP_TOKENS_REVERSED,
    element: analyticsEvents.InterfaceElementName.SWAP_TOKENS_REVERSE_ARROW_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(ArrowContainer, {
    "data-testid": "swap-currency-button",
    onClick: function onClick() {
      if (disableTokenInputs) return;
      onSwitchTokens(inputTokenHasTax, formattedAmounts[dependentField]);
      swapFlowLoggers.maybeLogFirstSwapAction(trace);
    }
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.Repeat, {
    size: "24",
    color: colors.colors.light_blue
  }))))), /*#__PURE__*/React__default["default"].createElement(index$4.AutoColumn, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(OutputSwapSection, null, /*#__PURE__*/React__default["default"].createElement(index.Trace, {
    section: analyticsEvents.InterfaceSectionName.CURRENCY_OUTPUT_PANEL
  }, /*#__PURE__*/React__default["default"].createElement(SwapCurrencyInputPanel, {
    value: formattedAmounts[actions.Field.OUTPUT],
    disabled: disableTokenInputs,
    onUserInput: handleTypeOutput,
    label: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "qiOIiY",
      message: "Buy"
    }),
    showMaxButton: false,
    hideBalance: false,
    fiatValue: showFiatValueOutput ? fiatValueOutput : undefined,
    priceImpact: stablecoinPriceImpact,
    currency: (_currencies$Field$OUT = currencies[actions.Field.OUTPUT]) !== null && _currencies$Field$OUT !== void 0 ? _currencies$Field$OUT : null,
    onCurrencySelect: handleOutputSelect,
    otherCurrency: currencies[actions.Field.INPUT],
    showCommonBases: true,
    id: analyticsEvents.InterfaceSectionName.CURRENCY_OUTPUT_PANEL,
    loading: independentField === actions.Field.INPUT && routeIsSyncing,
    numericalInputSettings: {
      // We disable numerical input here if the selected token has tax, since we cannot guarantee exact_outputs for FOT tokens
      disabled: outputTokenHasTax,
      // Focus the input currency panel if the user tries to type into the disabled output currency panel
      onDisabledClick: function onDisabledClick() {
        var _inputCurrencyNumeric;
        return (_inputCurrencyNumeric = inputCurrencyNumericalInputRef.current) === null || _inputCurrencyNumeric === void 0 ? void 0 : _inputCurrencyNumeric.focus();
      },
      disabledTooltipBody: /*#__PURE__*/React__default["default"].createElement(TaxTooltipBody.OutputTaxTooltipBody, {
        currencySymbol: (_currencies$Field$OUT2 = currencies[actions.Field.OUTPUT]) === null || _currencies$Field$OUT2 === void 0 ? void 0 : _currencies$Field$OUT2.symbol
      })
    }
  })), recipient !== null && !showWrap ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$5.AutoRow, {
    justify: "space-between",
    style: {
      padding: "0 1rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(styled$1.ArrowWrapper, {
    clickable: false
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.ArrowDown, {
    size: "16",
    color: theme.neutral2
  })), /*#__PURE__*/React__default["default"].createElement(index$6.LinkStyledButton, {
    id: "remove-recipient-button",
    onClick: function onClick() {
      return onChangeRecipient(null);
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "ZA1iFe",
    message: "- Remove recipient"
  }))), /*#__PURE__*/React__default["default"].createElement(index$7, {
    id: "recipient",
    value: recipient,
    onChange: onChangeRecipient
  })) : null)), showPriceImpactWarning && /*#__PURE__*/React__default["default"].createElement(PriceImpactWarning, {
    priceImpact: largerPriceImpact
  }), /*#__PURE__*/React__default["default"].createElement("div", null, swapIsUnsupported ? /*#__PURE__*/React__default["default"].createElement(index$8.ButtonPrimary, {
    $borderRadius: "16px",
    disabled: true
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    mb: "4px"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "Z941Tw",
    message: "Unsupported asset"
  }))) : switchingChain ? /*#__PURE__*/React__default["default"].createElement(index$8.ButtonPrimary, {
    $borderRadius: "16px",
    disabled: true
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "dygCbX",
    message: "Connecting to {0}",
    values: {
      "0": (_getChainInfo = chainInfo.getChainInfo(switchingChain)) === null || _getChainInfo === void 0 ? void 0 : _getChainInfo.label
    }
  })) : connectionReady && !account ? /*#__PURE__*/React__default["default"].createElement(index.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED,
    properties: {
      received_swap_quote: getIsReviewableQuote(trade, tradeState, swapInputError)
    },
    element: analyticsEvents.InterfaceElementName.CONNECT_WALLET_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(index$8.ButtonLight, {
    onClick: toggleWalletDrawer,
    fontWeight: 535,
    $borderRadius: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "VHOVEJ",
    message: "Connect wallet"
  }))) : chainId && chainId !== connectedChainId ? /*#__PURE__*/React__default["default"].createElement(index$8.ButtonPrimary, {
    $borderRadius: "16px",
    onClick: /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
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
            if (!swapErrorToUserReadableMessage.didUserReject(_context2.t0)) {
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
  }, "Connect to ", (_getChainInfo2 = chainInfo.getChainInfo(chainId)) === null || _getChainInfo2 === void 0 ? void 0 : _getChainInfo2.label) : showWrap ? /*#__PURE__*/React__default["default"].createElement(index$8.ButtonPrimary, {
    $borderRadius: "16px",
    disabled: Boolean(wrapInputError),
    onClick: handleOnWrap,
    fontWeight: 535,
    "data-testid": "wrap-button"
  }, wrapInputError ? /*#__PURE__*/React__default["default"].createElement(useWrapCallback.WrapErrorText, {
    wrapInputError: wrapInputError
  }) : wrapType === useWrapCallback.WrapType.WRAP ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "hf18Me",
    message: "Wrap"
  }) : wrapType === useWrapCallback.WrapType.UNWRAP ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "R3B9EM",
    message: "Unwrap"
  }) : null) : routeNotFound && userHasSpecifiedInputOutput && !routeIsLoading && !routeIsSyncing ? /*#__PURE__*/React__default["default"].createElement(index$9.GrayCard, {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    mb: "4px"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "t2JA0p",
    message: "Insufficient liquidity for this trade."
  }))) : /*#__PURE__*/React__default["default"].createElement(index.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SharedEventName.ELEMENT_CLICKED,
    element: analyticsEvents.InterfaceElementName.SWAP_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(index$8.ButtonError, {
    onClick: function onClick() {
      showPriceImpactWarning ? setShowPriceImpactModal(true) : handleContinueToReview();
    },
    id: "swap-button",
    "data-testid": "swap-button",
    disabled: !getIsReviewableQuote(trade, tradeState, swapInputError),
    error: !swapInputError && priceImpactSeverity > 2 && allowance.state === usePermit2Allowance.AllowanceState.ALLOWED
  }, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
    fontSize: 20
  }, swapInputError ? swapInputError : routeIsSyncing || routeIsLoading ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "vH2C/2",
    message: "Swap"
  }) : priceImpactSeverity > 2 ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "+q+Wa9",
    message: "Swap anyway"
  }) : /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "vH2C/2",
    message: "Swap"
  })))))), !showOptInSmall && !isUniswapXDefaultEnabled && /*#__PURE__*/React__default["default"].createElement(UniswapXOptIn.UniswapXOptIn, {
    isSmall: false,
    swapInfo: swapInfo
  })), showDetailsDropdown && /*#__PURE__*/React__default["default"].createElement(SwapDetailsDropdown, {
    trade: trade,
    syncing: routeIsSyncing,
    loading: routeIsLoading,
    allowedSlippage: allowedSlippage
  }));
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, swapElement, showOptInSmall && !isUniswapXDefaultEnabled && /*#__PURE__*/React__default["default"].createElement(UniswapXOptIn.UniswapXOptIn, {
    isSmall: true,
    swapInfo: swapInfo
  }));
}

exports.ArrowContainer = ArrowContainer;
exports.Swap = Swap;
exports["default"] = SwapPage;
