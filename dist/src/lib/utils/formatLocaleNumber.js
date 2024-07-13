import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../../constants/locales.js';

function formatLocaleNumber(_ref) {
  var number = _ref.number,
    locale = _ref.locale,
    sigFigs = _ref.sigFigs,
    fixedDecimals = _ref.fixedDecimals,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options;
  var localeArg;
  if (!locale || locale && !SUPPORTED_LOCALES.includes(locale)) {
    localeArg = DEFAULT_LOCALE;
  } else {
    localeArg = [locale, DEFAULT_LOCALE];
  }
  options.minimumFractionDigits = options.minimumFractionDigits || fixedDecimals;
  options.maximumFractionDigits = options.maximumFractionDigits || fixedDecimals;

  // Fixed decimals should override significant figures.
  options.maximumSignificantDigits = options.maximumSignificantDigits || fixedDecimals ? undefined : sigFigs;
  var numberString;
  if (typeof number === "number") {
    numberString = fixedDecimals ? parseFloat(number.toFixed(fixedDecimals)) : number;
  } else {
    var baseString = parseFloat(number.toSignificant(sigFigs));
    numberString = fixedDecimals ? parseFloat(baseString.toFixed(fixedDecimals)) : baseString;
  }
  return numberString.toLocaleString(localeArg, options);
}

export { formatLocaleNumber as default };
