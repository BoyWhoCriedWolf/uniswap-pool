'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var eagerlyConnect = require('../../connection/eagerlyConnect.cjs');
var fotAdjustments = require('../../featureFlags/flags/fotAdjustments.cjs');
var useAutoSlippageTolerance = require('../../hooks/useAutoSlippageTolerance.cjs');
var useDebouncedTrade = require('../../hooks/useDebouncedTrade.cjs');
var useSwapTaxes = require('../../hooks/useSwapTaxes.cjs');
var tryParseCurrencyAmount = require('../../lib/utils/tryParseCurrencyAmount.cjs');
require('react-redux');
var utils = require('../routing/utils.cjs');
var hooks = require('../user/hooks.cjs');
var tokens = require('../../constants/tokens.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var useENS = require('../../hooks/useENS.cjs');
require('qs');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var useCurrencyBalance = require('../../lib/hooks/useCurrencyBalance.cjs');
var actions = require('./actions.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function useSwapActionHandlers(dispatch) {
  var onCurrencySelection = React.useCallback(function (field, currency) {
    dispatch(actions.selectCurrency({
      field: field,
      currencyId: currency.isToken ? currency.address : currency.isNative ? "ETH" : ""
    }));
  }, [dispatch]);
  var onSwitchTokens = React.useCallback(function (newOutputHasTax, previouslyEstimatedOutput) {
    dispatch(actions.switchCurrencies({
      newOutputHasTax: newOutputHasTax,
      previouslyEstimatedOutput: previouslyEstimatedOutput
    }));
  }, [dispatch]);
  var onUserInput = React.useCallback(function (field, typedValue) {
    dispatch(actions.typeInput({
      field: field,
      typedValue: typedValue
    }));
  }, [dispatch]);
  var onChangeRecipient = React.useCallback(function (recipient) {
    dispatch(actions.setRecipient({
      recipient: recipient
    }));
  }, [dispatch]);
  return {
    onSwitchTokens: onSwitchTokens,
    onCurrencySelection: onCurrencySelection,
    onUserInput: onUserInput,
    onChangeRecipient: onChangeRecipient
  };
}
var BAD_RECIPIENT_ADDRESSES = {
  "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f": true,
  // v2 factory
  "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a": true,
  // v2 router 01
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D": true // v2 router 02
};

// from the current swap inputs, compute the best trade and return it.
function useDerivedSwapInfo(state, chainId) {
  var _ref, _ref3;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var independentField = state.independentField,
    typedValue = state.typedValue,
    inputCurrencyId = state[actions.Field.INPUT].currencyId,
    outputCurrencyId = state[actions.Field.OUTPUT].currencyId,
    recipient = state.recipient;
  var inputCurrency = Tokens.useCurrency(inputCurrencyId, chainId);
  var outputCurrency = Tokens.useCurrency(outputCurrencyId, chainId);
  var fotAdjustmentsEnabled = fotAdjustments.useFotAdjustmentsEnabled();
  var _useSwapTaxes = useSwapTaxes.useSwapTaxes(inputCurrency !== null && inputCurrency !== void 0 && inputCurrency.isToken && fotAdjustmentsEnabled ? inputCurrency.address : undefined, outputCurrency !== null && outputCurrency !== void 0 && outputCurrency.isToken && fotAdjustmentsEnabled ? outputCurrency.address : undefined),
    inputTax = _useSwapTaxes.inputTax,
    outputTax = _useSwapTaxes.outputTax;
  var recipientLookup = useENS(recipient !== null && recipient !== void 0 ? recipient : undefined);
  var to = (_ref = recipient === null ? account : recipientLookup.address) !== null && _ref !== void 0 ? _ref : null;
  var relevantTokenBalances = useCurrencyBalance.useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, React.useMemo(function () {
    return [inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined];
  }, [inputCurrency, outputCurrency]));
  var isExactIn = independentField === actions.Field.INPUT;
  var parsedAmount = React.useMemo(function () {
    var _ref2;
    return tryParseCurrencyAmount(typedValue, (_ref2 = isExactIn ? inputCurrency : outputCurrency) !== null && _ref2 !== void 0 ? _ref2 : undefined);
  }, [inputCurrency, isExactIn, outputCurrency, typedValue]);
  var trade = useDebouncedTrade.useDebouncedTrade(isExactIn ? sdkCore.TradeType.EXACT_INPUT : sdkCore.TradeType.EXACT_OUTPUT, parsedAmount, (_ref3 = isExactIn ? outputCurrency : inputCurrency) !== null && _ref3 !== void 0 ? _ref3 : undefined, undefined, account, inputTax, outputTax);
  var currencyBalances = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, relevantTokenBalances[0]), actions.Field.OUTPUT, relevantTokenBalances[1]);
  }, [relevantTokenBalances]);
  var currencies = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, inputCurrency), actions.Field.OUTPUT, outputCurrency);
  }, [inputCurrency, outputCurrency]);

  // allowed slippage for classic trades is either auto slippage, or custom user defined slippage if auto slippage disabled
  var classicAutoSlippage = useAutoSlippageTolerance(utils.isClassicTrade(trade.trade) ? trade.trade : undefined);

  // slippage for uniswapx trades is defined by the quote response
  var uniswapXAutoSlippage = utils.isUniswapXTrade(trade.trade) ? trade.trade.slippageTolerance : undefined;

  // Uniswap interface recommended slippage amount
  var autoSlippage = uniswapXAutoSlippage !== null && uniswapXAutoSlippage !== void 0 ? uniswapXAutoSlippage : classicAutoSlippage;
  var classicAllowedSlippage = hooks.useUserSlippageToleranceWithDefault(autoSlippage);

  // slippage amount used to submit the trade
  var allowedSlippage = uniswapXAutoSlippage !== null && uniswapXAutoSlippage !== void 0 ? uniswapXAutoSlippage : classicAllowedSlippage;
  var connectionReady = eagerlyConnect.useConnectionReady();
  var inputError = React.useMemo(function () {
    var _trade$trade;
    var inputError;
    if (!account) {
      inputError = connectionReady ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "VHOVEJ",
        message: "Connect wallet"
      }) : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "/txPYw",
        message: "Connecting wallet..."
      });
    }
    if (!currencies[actions.Field.INPUT] || !currencies[actions.Field.OUTPUT]) {
      var _inputError;
      inputError = (_inputError = inputError) !== null && _inputError !== void 0 ? _inputError : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "T0Y2+3",
        message: "Select a token"
      });
    }
    if (!parsedAmount) {
      var _inputError2;
      inputError = (_inputError2 = inputError) !== null && _inputError2 !== void 0 ? _inputError2 : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "iPMIoT",
        message: "Enter an amount"
      });
    }
    var formattedTo = addresses.isAddress(to);
    if (!to || !formattedTo) {
      var _inputError3;
      inputError = (_inputError3 = inputError) !== null && _inputError3 !== void 0 ? _inputError3 : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "i2JEQa",
        message: "Enter a recipient"
      });
    } else {
      if (BAD_RECIPIENT_ADDRESSES[formattedTo]) {
        var _inputError4;
        inputError = (_inputError4 = inputError) !== null && _inputError4 !== void 0 ? _inputError4 : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "kkUlw8",
          message: "Invalid recipient"
        });
      }
    }

    // compare input balance to max input based on version
    var _ref6 = [currencyBalances[actions.Field.INPUT], trade === null || trade === void 0 || (_trade$trade = trade.trade) === null || _trade$trade === void 0 ? void 0 : _trade$trade.maximumAmountIn(allowedSlippage)],
      balanceIn = _ref6[0],
      maxAmountIn = _ref6[1];
    if (balanceIn && maxAmountIn && balanceIn.lessThan(maxAmountIn)) {
      inputError = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "m6RmA/",
        message: "Insufficient {0} balance",
        values: {
          "0": balanceIn.currency.symbol
        }
      });
    }
    return inputError;
  }, [account, currencies, parsedAmount, to, currencyBalances, trade === null || trade === void 0 ? void 0 : trade.trade, allowedSlippage, connectionReady]);
  return React.useMemo(function () {
    return {
      currencies: currencies,
      currencyBalances: currencyBalances,
      parsedAmount: parsedAmount,
      inputError: inputError,
      trade: trade,
      autoSlippage: autoSlippage,
      allowedSlippage: allowedSlippage,
      inputTax: inputTax,
      outputTax: outputTax
    };
  }, [allowedSlippage, autoSlippage, currencies, currencyBalances, inputError, inputTax, outputTax, parsedAmount, trade]);
}
function parseCurrencyFromURLParameter(urlParam) {
  if (typeof urlParam === "string") {
    var valid = addresses.isAddress(urlParam);
    if (valid) return valid;
    var upper = urlParam.toUpperCase();
    if (upper === "ETH") return "ETH";
    if (upper in tokens.TOKEN_SHORTHANDS) return upper;
  }
  return "";
}
function parseTokenAmountURLParameter(urlParam) {
  return typeof urlParam === "string" && !isNaN(parseFloat(urlParam)) ? urlParam : "";
}
function parseIndependentFieldURLParameter(urlParam) {
  return typeof urlParam === "string" && urlParam.toLowerCase() === "output" ? actions.Field.OUTPUT : actions.Field.INPUT;
}
var ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
var ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient) {
  if (typeof recipient !== "string") return null;
  var address = addresses.isAddress(recipient);
  if (address) return address;
  if (ENS_NAME_REGEX.test(recipient)) return recipient;
  if (ADDRESS_REGEX.test(recipient)) return recipient;
  return null;
}
function queryParametersToSwapState(parsedQs) {
  var _inputCurrency, _outputCurrency;
  var inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
  var outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);
  var typedValue = parseTokenAmountURLParameter(parsedQs.exactAmount);
  var independentField = parseIndependentFieldURLParameter(parsedQs.exactField);
  if (inputCurrency === "" && outputCurrency === "" && typedValue === "" && independentField === actions.Field.INPUT) {
    // Defaults to having the native currency selected
    inputCurrency = "ETH";
  } else if (inputCurrency === outputCurrency) {
    // clear output if identical
    outputCurrency = "";
  }
  var recipient = validatedRecipient(parsedQs.recipient);
  return _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, {
    currencyId: inputCurrency === "" ? null : (_inputCurrency = inputCurrency) !== null && _inputCurrency !== void 0 ? _inputCurrency : null
  }), actions.Field.OUTPUT, {
    currencyId: outputCurrency === "" ? null : (_outputCurrency = outputCurrency) !== null && _outputCurrency !== void 0 ? _outputCurrency : null
  }), "typedValue", typedValue), "independentField", independentField), "recipient", recipient);
}

exports.queryParametersToSwapState = queryParametersToSwapState;
exports.useDerivedSwapInfo = useDerivedSwapInfo;
exports.useSwapActionHandlers = useSwapActionHandlers;
