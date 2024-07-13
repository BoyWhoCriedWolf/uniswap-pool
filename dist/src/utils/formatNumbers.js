import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { LOCAL_CURRENCY_SYMBOL_DISPLAY_TYPE, DEFAULT_LOCAL_CURRENCY } from '../constants/localCurrencies.js';
import { DEFAULT_LOCALE } from '../constants/locales.js';
import { useCurrencyConversionFlagEnabled } from '../featureFlags/flags/currencyConversion.js';
import { Currency } from '../graphql/data/__generated__/types-and-hooks.js';
import { useLocalCurrencyConversionRate } from '../graphql/data/ConversionRate.js';
import { useActiveLocalCurrency } from '../hooks/useActiveLocalCurrency.js';
import { useActiveLocale } from '../hooks/useActiveLocale.js';
import usePrevious from '../hooks/usePrevious.js';
import { useCallback, useMemo } from 'react';
import { Bound } from '../state/mint/v3/actions.js';

var _TYPE_TO_FORMATTER_RU;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Number formatting follows the standards laid out in this spec:
// https://www.notion.so/uniswaplabs/Number-standards-fbb9f533f10e4e22820722c2f66d23c0
var FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN = {
  notation: "standard",
  maximumFractionDigits: 5,
  minimumFractionDigits: 2
};
var FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS = {
  notation: "standard",
  maximumFractionDigits: 5,
  minimumFractionDigits: 2,
  useGrouping: false
};
var NO_DECIMALS = {
  notation: "standard",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
};
var THREE_DECIMALS_NO_TRAILING_ZEROS = {
  notation: "standard",
  maximumFractionDigits: 3,
  minimumFractionDigits: 0
};
var THREE_DECIMALS = {
  notation: "standard",
  maximumFractionDigits: 3,
  minimumFractionDigits: 3
};
var THREE_DECIMALS_CURRENCY = {
  notation: "standard",
  maximumFractionDigits: 3,
  minimumFractionDigits: 3,
  currency: "USD",
  style: "currency"
};
var TWO_DECIMALS_NO_TRAILING_ZEROS = {
  notation: "standard",
  maximumFractionDigits: 2
};
var TWO_DECIMALS = {
  notation: "standard",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
};
var TWO_DECIMALS_CURRENCY = {
  notation: "standard",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: "USD",
  style: "currency"
};
var SHORTHAND_TWO_DECIMALS = {
  notation: "compact",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};
var SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS = {
  notation: "compact",
  maximumFractionDigits: 2
};
var SHORTHAND_ONE_DECIMAL = {
  notation: "compact",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
};
var SHORTHAND_CURRENCY_TWO_DECIMALS = {
  notation: "compact",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: "USD",
  style: "currency"
};
var SHORTHAND_CURRENCY_ONE_DECIMAL = {
  notation: "compact",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  currency: "USD",
  style: "currency"
};
var SIX_SIG_FIGS_TWO_DECIMALS = {
  notation: "standard",
  maximumSignificantDigits: 6,
  minimumSignificantDigits: 3,
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
};
var SIX_SIG_FIGS_NO_COMMAS = {
  notation: "standard",
  maximumSignificantDigits: 6,
  useGrouping: false
};
var SIX_SIG_FIGS_TWO_DECIMALS_NO_COMMAS = {
  notation: "standard",
  maximumSignificantDigits: 6,
  minimumSignificantDigits: 3,
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  useGrouping: false
};
var ONE_SIG_FIG_CURRENCY = {
  notation: "standard",
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 1,
  currency: "USD",
  style: "currency"
};
var THREE_SIG_FIGS_CURRENCY = {
  notation: "standard",
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 3,
  currency: "USD",
  style: "currency"
};
var SEVEN_SIG_FIGS__SCI_NOTATION_CURRENCY = {
  notation: "scientific",
  minimumSignificantDigits: 7,
  maximumSignificantDigits: 7,
  currency: "USD",
  style: "currency"
};

// each rule must contain either an `upperBound` or an `exact` value.
// upperBound => number will use that formatter as long as it is < upperBound
// exact => number will use that formatter if it is === exact
// if hardcodedinput is supplied it will override the input value or use the hardcoded output
// these formatter objects dictate which formatter rule to use based on the interval that
// the number falls into. for example, based on the rule set below, if your number
// falls between 1 and 1e6, you'd use TWO_DECIMALS as the formatter.
var tokenNonTxFormatter = [{
  exact: 0,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: 0.001,
  hardCodedInput: {
    input: 0.001,
    prefix: "<"
  },
  formatterOptions: THREE_DECIMALS
}, {
  upperBound: 1,
  formatterOptions: THREE_DECIMALS
}, {
  upperBound: 1e6,
  formatterOptions: TWO_DECIMALS
}, {
  upperBound: 1e15,
  formatterOptions: SHORTHAND_TWO_DECIMALS
}, {
  upperBound: Infinity,
  hardCodedInput: {
    input: 999000000000000,
    prefix: ">"
  },
  formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS
}];
var tokenTxFormatter = [{
  exact: 0,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: 0.00001,
  hardCodedInput: {
    input: 0.00001,
    prefix: "<"
  },
  formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN
}, {
  upperBound: 1,
  formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN
}, {
  upperBound: 10000,
  formatterOptions: SIX_SIG_FIGS_TWO_DECIMALS
}, {
  upperBound: Infinity,
  formatterOptions: TWO_DECIMALS
}];
var swapTradeAmountFormatter = [{
  exact: 0,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: 0.1,
  formatterOptions: SIX_SIG_FIGS_NO_COMMAS
}, {
  upperBound: 1,
  formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN_NO_COMMAS
}, {
  upperBound: Infinity,
  formatterOptions: SIX_SIG_FIGS_TWO_DECIMALS_NO_COMMAS
}];
var swapDetailsAmountFormatter = [{
  upperBound: Infinity,
  formatterOptions: SIX_SIG_FIGS_NO_COMMAS
}];
var swapPriceFormatter = [{
  exact: 0,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: 0.00001,
  hardCodedInput: {
    input: 0.00001,
    prefix: "<"
  },
  formatterOptions: FIVE_DECIMALS_MAX_TWO_DECIMALS_MIN
}].concat(swapTradeAmountFormatter);
var fiatTokenDetailsFormatter = [{
  exact: 0,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: 0.00000001,
  hardCodedInput: {
    input: 0.00000001,
    prefix: "<"
  },
  formatterOptions: ONE_SIG_FIG_CURRENCY
}, {
  upperBound: 0.1,
  formatterOptions: THREE_SIG_FIGS_CURRENCY
}, {
  upperBound: 1.05,
  formatterOptions: THREE_DECIMALS_CURRENCY
}, {
  upperBound: 1e6,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: Infinity,
  formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS
}];
var fiatTokenPricesFormatter = [{
  exact: 0,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: 0.00000001,
  hardCodedInput: {
    input: 0.00000001,
    prefix: "<"
  },
  formatterOptions: ONE_SIG_FIG_CURRENCY
}, {
  upperBound: 1,
  formatterOptions: THREE_SIG_FIGS_CURRENCY
}, {
  upperBound: 1e6,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: 1e16,
  formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS
}, {
  upperBound: Infinity,
  formatterOptions: SEVEN_SIG_FIGS__SCI_NOTATION_CURRENCY
}];
var fiatTokenStatsFormatter = [
// if token stat value is 0, we probably don't have the data for it, so show '-' as a placeholder
{
  exact: 0,
  hardCodedInput: {
    hardcodedOutput: "-"
  },
  formatterOptions: ONE_SIG_FIG_CURRENCY
}, {
  upperBound: 0.01,
  hardCodedInput: {
    input: 0.01,
    prefix: "<"
  },
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: 1000,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: Infinity,
  formatterOptions: SHORTHAND_CURRENCY_ONE_DECIMAL
}];
var fiatGasPriceFormatter = [{
  exact: 0,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: 0.01,
  hardCodedInput: {
    input: 0.01,
    prefix: "<"
  },
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: 1e6,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: Infinity,
  formatterOptions: SHORTHAND_CURRENCY_TWO_DECIMALS
}];
var fiatTokenQuantityFormatter = [{
  exact: 0,
  formatterOptions: TWO_DECIMALS_CURRENCY
}].concat(fiatGasPriceFormatter);
var portfolioBalanceFormatter = [{
  exact: 0,
  formatterOptions: TWO_DECIMALS_CURRENCY
}, {
  upperBound: Infinity,
  formatterOptions: TWO_DECIMALS_CURRENCY
}];
var ntfTokenFloorPriceFormatterTrailingZeros = [{
  exact: 0,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: 0.001,
  hardCodedInput: {
    input: 0.001,
    prefix: "<"
  },
  formatterOptions: THREE_DECIMALS
}, {
  upperBound: 1,
  formatterOptions: THREE_DECIMALS
}, {
  upperBound: 1000,
  formatterOptions: TWO_DECIMALS
}, {
  upperBound: 1e15,
  formatterOptions: SHORTHAND_TWO_DECIMALS
}, {
  upperBound: Infinity,
  hardCodedInput: {
    input: 999000000000000,
    prefix: ">"
  },
  formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS
}];
var ntfTokenFloorPriceFormatter = [{
  exact: 0,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: 0.001,
  hardCodedInput: {
    input: 0.001,
    prefix: "<"
  },
  formatterOptions: THREE_DECIMALS
}, {
  upperBound: 1,
  formatterOptions: THREE_DECIMALS_NO_TRAILING_ZEROS
}, {
  upperBound: 1000,
  formatterOptions: TWO_DECIMALS_NO_TRAILING_ZEROS
}, {
  upperBound: 1e15,
  formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS
}, {
  upperBound: Infinity,
  hardCodedInput: {
    input: 999000000000000,
    prefix: ">"
  },
  formatterOptions: SHORTHAND_TWO_DECIMALS_NO_TRAILING_ZEROS
}];
var ntfCollectionStatsFormatter = [{
  upperBound: 1000,
  formatterOptions: NO_DECIMALS
}, {
  upperBound: Infinity,
  formatterOptions: SHORTHAND_ONE_DECIMAL
}];
var NumberType = /*#__PURE__*/function (NumberType) {
  NumberType["TokenNonTx"] = "token-non-tx";
  NumberType["TokenTx"] = "token-tx";
  NumberType["SwapPrice"] = "swap-price";
  NumberType["SwapTradeAmount"] = "swap-trade-amount";
  NumberType["SwapDetailsAmount"] = "swap-details-amount";
  NumberType["FiatTokenDetails"] = "fiat-token-details";
  NumberType["FiatTokenPrice"] = "fiat-token-price";
  NumberType["FiatTokenStats"] = "fiat-token-stats";
  NumberType["FiatTokenQuantity"] = "fiat-token-quantity";
  NumberType["FiatGasPrice"] = "fiat-gas-price";
  NumberType["PortfolioBalance"] = "portfolio-balance";
  NumberType["NFTTokenFloorPrice"] = "nft-token-floor-price";
  NumberType["NFTCollectionStats"] = "nft-collection-stats";
  NumberType["NFTTokenFloorPriceTrailingZeros"] = "nft-token-floor-price-trailing-zeros";
  return NumberType;
}({});
var TYPE_TO_FORMATTER_RULES = (_TYPE_TO_FORMATTER_RU = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_TYPE_TO_FORMATTER_RU, NumberType.TokenNonTx, tokenNonTxFormatter), NumberType.TokenTx, tokenTxFormatter), NumberType.SwapPrice, swapPriceFormatter), NumberType.SwapTradeAmount, swapTradeAmountFormatter), NumberType.SwapDetailsAmount, swapDetailsAmountFormatter), NumberType.FiatTokenQuantity, fiatTokenQuantityFormatter), NumberType.FiatTokenDetails, fiatTokenDetailsFormatter), NumberType.FiatTokenPrice, fiatTokenPricesFormatter), NumberType.FiatTokenStats, fiatTokenStatsFormatter), NumberType.FiatGasPrice, fiatGasPriceFormatter), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_TYPE_TO_FORMATTER_RU, NumberType.PortfolioBalance, portfolioBalanceFormatter), NumberType.NFTTokenFloorPrice, ntfTokenFloorPriceFormatter), NumberType.NFTTokenFloorPriceTrailingZeros, ntfTokenFloorPriceFormatterTrailingZeros), NumberType.NFTCollectionStats, ntfCollectionStatsFormatter));
function getFormatterRule(input, type, conversionRate) {
  var rules = Array.isArray(type) ? type : TYPE_TO_FORMATTER_RULES[type];
  var _iterator = _createForOfIteratorHelper(rules),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      var shouldConvertInput = rule.formatterOptions.currency && conversionRate;
      var convertedInput = shouldConvertInput ? input * conversionRate : input;
      if (rule.exact !== undefined && convertedInput === rule.exact || rule.upperBound !== undefined && convertedInput < rule.upperBound) {
        return rule;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  throw new Error("formatter for type ".concat(type, " not configured correctly"));
}
function formatNumber(_ref) {
  var input = _ref.input,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? NumberType.TokenNonTx : _ref$type,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "-" : _ref$placeholder,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? DEFAULT_LOCALE : _ref$locale,
    _ref$localCurrency = _ref.localCurrency,
    localCurrency = _ref$localCurrency === void 0 ? DEFAULT_LOCAL_CURRENCY : _ref$localCurrency,
    conversionRate = _ref.conversionRate;
  if (input === null || input === undefined) {
    return placeholder;
  }
  var _getFormatterRule = getFormatterRule(input, type, conversionRate),
    hardCodedInput = _getFormatterRule.hardCodedInput,
    formatterOptions = _getFormatterRule.formatterOptions;
  if (formatterOptions.currency) {
    input = conversionRate ? input * conversionRate : input;
    formatterOptions.currency = localCurrency;
    formatterOptions.currencyDisplay = LOCAL_CURRENCY_SYMBOL_DISPLAY_TYPE[localCurrency];
  }
  if (!hardCodedInput) {
    return new Intl.NumberFormat(locale, formatterOptions).format(input);
  }
  if (hardCodedInput.hardcodedOutput) {
    return hardCodedInput.hardcodedOutput;
  }
  var hardCodedInputValue = hardCodedInput.input,
    prefix = hardCodedInput.prefix;
  if (hardCodedInputValue === undefined) return placeholder;
  return (prefix !== null && prefix !== void 0 ? prefix : "") + new Intl.NumberFormat(locale, formatterOptions).format(hardCodedInputValue);
}
function formatCurrencyAmount(_ref2) {
  var amount = _ref2.amount,
    _ref2$type = _ref2.type,
    type = _ref2$type === void 0 ? NumberType.TokenNonTx : _ref2$type,
    placeholder = _ref2.placeholder,
    _ref2$locale = _ref2.locale,
    locale = _ref2$locale === void 0 ? DEFAULT_LOCALE : _ref2$locale,
    _ref2$localCurrency = _ref2.localCurrency,
    localCurrency = _ref2$localCurrency === void 0 ? DEFAULT_LOCAL_CURRENCY : _ref2$localCurrency,
    conversionRate = _ref2.conversionRate;
  return formatNumber({
    input: amount ? parseFloat(amount.toSignificant()) : undefined,
    type: type,
    placeholder: placeholder,
    locale: locale,
    localCurrency: localCurrency,
    conversionRate: conversionRate
  });
}
function formatPriceImpact(priceImpact) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOCALE;
  if (!priceImpact) return "-";
  return "".concat(Number(priceImpact.multiply(-1).toFixed(3)).toLocaleString(locale, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
    useGrouping: false
  }), "%");
}
function formatSlippage(slippage) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOCALE;
  if (!slippage) return "-";
  return "".concat(Number(slippage.toFixed(3)).toLocaleString(locale, {
    maximumFractionDigits: 3,
    useGrouping: false
  }), "%");
}
function formatPercent(percent) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOCALE;
  if (percent === null || percent === undefined || percent === Infinity || isNaN(percent)) {
    return "-";
  }
  return "".concat(Number(Math.abs(percent).toFixed(2)).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false
  }), "%");
}
function formatPrice(_ref3) {
  var price = _ref3.price,
    _ref3$type = _ref3.type,
    type = _ref3$type === void 0 ? NumberType.FiatTokenPrice : _ref3$type,
    _ref3$locale = _ref3.locale,
    locale = _ref3$locale === void 0 ? DEFAULT_LOCALE : _ref3$locale,
    _ref3$localCurrency = _ref3.localCurrency,
    localCurrency = _ref3$localCurrency === void 0 ? DEFAULT_LOCAL_CURRENCY : _ref3$localCurrency,
    conversionRate = _ref3.conversionRate;
  if (price === null || price === undefined) {
    return "-";
  }
  return formatNumber({
    input: parseFloat(price.toSignificant()),
    type: type,
    locale: locale,
    localCurrency: localCurrency,
    conversionRate: conversionRate
  });
}
function formatTickPrice(_ref4) {
  var price = _ref4.price,
    atLimit = _ref4.atLimit,
    direction = _ref4.direction,
    placeholder = _ref4.placeholder,
    numberType = _ref4.numberType,
    locale = _ref4.locale,
    localCurrency = _ref4.localCurrency,
    conversionRate = _ref4.conversionRate;
  if (atLimit[direction]) {
    return direction === Bound.LOWER ? "0" : "∞";
  }
  if (!price && placeholder !== undefined) {
    return placeholder;
  }
  return formatPrice({
    price: price,
    type: numberType !== null && numberType !== void 0 ? numberType : NumberType.TokenNonTx,
    locale: locale,
    localCurrency: localCurrency,
    conversionRate: conversionRate
  });
}
function formatNumberOrString(_ref5) {
  var input = _ref5.input,
    type = _ref5.type,
    locale = _ref5.locale,
    localCurrency = _ref5.localCurrency,
    conversionRate = _ref5.conversionRate;
  if (input === null || input === undefined) return "-";
  if (typeof input === "string") return formatNumber({
    input: parseFloat(input),
    type: type,
    locale: locale,
    localCurrency: localCurrency,
    conversionRate: conversionRate
  });
  return formatNumber({
    input: input,
    type: type,
    locale: locale,
    localCurrency: localCurrency,
    conversionRate: conversionRate
  });
}
function formatFiatPrice(_ref6) {
  var price = _ref6.price,
    _ref6$type = _ref6.type,
    type = _ref6$type === void 0 ? NumberType.FiatTokenPrice : _ref6$type,
    locale = _ref6.locale,
    localCurrency = _ref6.localCurrency,
    conversionRate = _ref6.conversionRate;
  return formatNumberOrString({
    input: price,
    type: type,
    locale: locale,
    localCurrency: localCurrency,
    conversionRate: conversionRate
  });
}
var MAX_AMOUNT_STR_LENGTH = 9;
function formatReviewSwapCurrencyAmount(amount) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOCALE;
  var formattedAmount = formatCurrencyAmount({
    amount: amount,
    type: NumberType.TokenTx,
    locale: locale
  });
  if (formattedAmount.length > MAX_AMOUNT_STR_LENGTH) {
    formattedAmount = formatCurrencyAmount({
      amount: amount,
      type: NumberType.SwapTradeAmount,
      locale: locale
    });
  }
  return formattedAmount;
}
function useFormatterLocales() {
  var currencyConversionEnabled = useCurrencyConversionFlagEnabled();
  var activeLocale = useActiveLocale();
  var activeLocalCurrency = useActiveLocalCurrency();
  if (currencyConversionEnabled) {
    return {
      formatterLocale: activeLocale,
      formatterLocalCurrency: activeLocalCurrency
    };
  }
  return {
    formatterLocale: DEFAULT_LOCALE,
    formatterLocalCurrency: DEFAULT_LOCAL_CURRENCY
  };
}
function handleFallbackCurrency(selectedCurrency, previousSelectedCurrency, previousConversionRate, shouldFallbackToUSD, shouldFallbackToPrevious) {
  if (shouldFallbackToUSD) return DEFAULT_LOCAL_CURRENCY;
  if (shouldFallbackToPrevious) return previousConversionRate ? previousSelectedCurrency : DEFAULT_LOCAL_CURRENCY;
  return selectedCurrency;
}

// Constructs an object that injects the correct locale and local currency into each of the above formatter functions.
function useFormatter() {
  var _useFormatterLocales = useFormatterLocales(),
    formatterLocale = _useFormatterLocales.formatterLocale,
    formatterLocalCurrency = _useFormatterLocales.formatterLocalCurrency;
  var formatterLocalCurrencyIsUSD = formatterLocalCurrency === Currency.Usd;
  var _useLocalCurrencyConv = useLocalCurrencyConversionRate(formatterLocalCurrency, formatterLocalCurrencyIsUSD),
    localCurrencyConversionRate = _useLocalCurrencyConv.data,
    localCurrencyConversionRateIsLoading = _useLocalCurrencyConv.isLoading;
  var previousSelectedCurrency = usePrevious(formatterLocalCurrency);
  var previousConversionRate = usePrevious(localCurrencyConversionRate);
  var shouldFallbackToPrevious = !localCurrencyConversionRate && localCurrencyConversionRateIsLoading;
  var shouldFallbackToUSD = !localCurrencyConversionRate && !localCurrencyConversionRateIsLoading;
  var currencyToFormatWith = handleFallbackCurrency(formatterLocalCurrency, previousSelectedCurrency, previousConversionRate, shouldFallbackToUSD, shouldFallbackToPrevious);
  var localCurrencyConversionRateToFormatWith = shouldFallbackToPrevious ? previousConversionRate : localCurrencyConversionRate;
  var formatNumberWithLocales = useCallback(function (options) {
    return formatNumber(_objectSpread(_objectSpread({}, options), {}, {
      locale: formatterLocale,
      localCurrency: currencyToFormatWith,
      conversionRate: localCurrencyConversionRateToFormatWith
    }));
  }, [currencyToFormatWith, formatterLocale, localCurrencyConversionRateToFormatWith]);
  var formatCurrencyAmountWithLocales = useCallback(function (options) {
    return formatCurrencyAmount(_objectSpread(_objectSpread({}, options), {}, {
      locale: formatterLocale,
      localCurrency: currencyToFormatWith,
      conversionRate: localCurrencyConversionRateToFormatWith
    }));
  }, [currencyToFormatWith, formatterLocale, localCurrencyConversionRateToFormatWith]);
  var formatPriceWithLocales = useCallback(function (options) {
    return formatPrice(_objectSpread(_objectSpread({}, options), {}, {
      locale: formatterLocale,
      localCurrency: currencyToFormatWith,
      conversionRate: localCurrencyConversionRateToFormatWith
    }));
  }, [currencyToFormatWith, formatterLocale, localCurrencyConversionRateToFormatWith]);
  var formatPriceImpactWithLocales = useCallback(function (priceImpact) {
    return formatPriceImpact(priceImpact, formatterLocale);
  }, [formatterLocale]);
  var formatReviewSwapCurrencyAmountWithLocales = useCallback(function (amount) {
    return formatReviewSwapCurrencyAmount(amount, formatterLocale);
  }, [formatterLocale]);
  var formatSlippageWithLocales = useCallback(function (slippage) {
    return formatSlippage(slippage, formatterLocale);
  }, [formatterLocale]);
  var formatTickPriceWithLocales = useCallback(function (options) {
    return formatTickPrice(_objectSpread(_objectSpread({}, options), {}, {
      locale: formatterLocale,
      localCurrency: currencyToFormatWith,
      conversionRate: localCurrencyConversionRateToFormatWith
    }));
  }, [currencyToFormatWith, formatterLocale, localCurrencyConversionRateToFormatWith]);
  var formatNumberOrStringWithLocales = useCallback(function (options) {
    return formatNumberOrString(_objectSpread(_objectSpread({}, options), {}, {
      locale: formatterLocale,
      localCurrency: currencyToFormatWith,
      conversionRate: localCurrencyConversionRateToFormatWith
    }));
  }, [currencyToFormatWith, formatterLocale, localCurrencyConversionRateToFormatWith]);
  var formatFiatPriceWithLocales = useCallback(function (options) {
    return formatFiatPrice(_objectSpread(_objectSpread({}, options), {}, {
      locale: formatterLocale,
      localCurrency: currencyToFormatWith,
      conversionRate: localCurrencyConversionRateToFormatWith
    }));
  }, [currencyToFormatWith, formatterLocale, localCurrencyConversionRateToFormatWith]);
  var formatPercentWithLocales = useCallback(function (percent) {
    return formatPercent(percent, formatterLocale);
  }, [formatterLocale]);
  return useMemo(function () {
    return {
      formatCurrencyAmount: formatCurrencyAmountWithLocales,
      formatFiatPrice: formatFiatPriceWithLocales,
      formatNumber: formatNumberWithLocales,
      formatNumberOrString: formatNumberOrStringWithLocales,
      formatPercent: formatPercentWithLocales,
      formatPrice: formatPriceWithLocales,
      formatPriceImpact: formatPriceImpactWithLocales,
      formatReviewSwapCurrencyAmount: formatReviewSwapCurrencyAmountWithLocales,
      formatSlippage: formatSlippageWithLocales,
      formatTickPrice: formatTickPriceWithLocales
    };
  }, [formatCurrencyAmountWithLocales, formatFiatPriceWithLocales, formatNumberOrStringWithLocales, formatNumberWithLocales, formatPercentWithLocales, formatPriceImpactWithLocales, formatPriceWithLocales, formatReviewSwapCurrencyAmountWithLocales, formatSlippageWithLocales, formatTickPriceWithLocales]);
}

export { NumberType, useFormatter, useFormatterLocales };
