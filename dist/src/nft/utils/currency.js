import { formatEther } from '@ethersproject/units';

var formatUsdPrice = function formatUsdPrice(price) {
  if (price > 1000000) {
    return "$".concat((price / 1000000).toFixed(1), "M");
  } else if (price > 1000) {
    return "$".concat((price / 1000).toFixed(1), "K");
  } else {
    return "$".concat(price.toFixed(2));
  }
};
var formatEth = function formatEth(price) {
  if (price > 1000000) {
    return "".concat(Math.round(price / 1000000), "M");
  } else if (price > 1000) {
    return "".concat(Math.round(price / 1000), "K");
  } else if (price < 0.001) {
    return "<0.001";
  } else {
    return "".concat(Math.round(price * 1000 + Number.EPSILON) / 1000);
  }
};
var formatUSDPriceWithCommas = function formatUSDPriceWithCommas(price) {
  return "$".concat(Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};
var formatEthPrice = function formatEthPrice(price) {
  if (!price) return 0;
  var formattedPrice = parseFloat(formatEther(String(price)));
  return Math.round(formattedPrice * (formattedPrice >= 1 ? 100 : 1000) + Number.EPSILON) / (formattedPrice >= 1 ? 100 : 1000);
};
var ethNumberStandardFormatter = function ethNumberStandardFormatter(amount) {
  var includeDollarSign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var removeZeroes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var roundToNearestWholeNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!amount) return "-";
  var amountInDecimals = parseFloat(amount.toString());
  var conditionalDollarSign = includeDollarSign ? "$" : "";
  if (amountInDecimals <= 0) return "-";
  if (amountInDecimals < 0.0001) return "< ".concat(conditionalDollarSign, "0.00001");
  if (amountInDecimals < 1) return "".concat(conditionalDollarSign).concat(parseFloat(amountInDecimals.toFixed(3)));
  var formattedPrice = (removeZeroes ? parseFloat(amountInDecimals.toFixed(2)) : roundToNearestWholeNumber ? Math.round(amountInDecimals) : amountInDecimals.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return conditionalDollarSign + formattedPrice;
};
var formatWeiToDecimal = function formatWeiToDecimal(amount) {
  var removeZeroes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!amount) return "-";
  return ethNumberStandardFormatter(formatEther(amount), false, removeZeroes, false);
};

// prevent BigNumber overflow by properly handling scientific notation and comma delimited values
function wrapScientificNotation(value) {
  return parseFloat(value.toString()).toLocaleString("fullwide", {
    useGrouping: false
  }).replace(",", ".").replace(" ", "");
}

export { ethNumberStandardFormatter, formatEth, formatEthPrice, formatUSDPriceWithCommas, formatUsdPrice, formatWeiToDecimal, wrapScientificNotation };
