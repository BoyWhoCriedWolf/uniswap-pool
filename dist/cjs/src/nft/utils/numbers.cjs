'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var locales = require('../../constants/locales.cjs');
var numbro = require('numbro');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var numbro__default = /*#__PURE__*/_interopDefaultLegacy(numbro);

var isNumber = function isNumber(s) {
  var reg = /^-?\d+\.?\d*$/;
  return reg.test(s) && !isNaN(parseFloat(s)) && isFinite(parseFloat(s));
};
var floorFormatter = function floorFormatter(n) {
  if (n === 0) return "0.00";
  if (!n) return "";
  if (n < 0.001) {
    return "<0.001";
  }
  if (n >= 0.001 && n < 1) {
    return "".concat(parseFloat(n.toFixed(3)).toLocaleString(locales.DEFAULT_LOCALE, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 3
    }));
  }
  if (n >= 1 && n < 1e6) {
    return "".concat(parseFloat(n.toPrecision(6)).toLocaleString(locales.DEFAULT_LOCALE, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }));
  }
  if (n >= 1e6 && n < 1e15) {
    return numbro__default["default"](n).format({
      average: true,
      mantissa: 2,
      optionalMantissa: true,
      abbreviations: {
        million: "M",
        billion: "B",
        trillion: "T"
      }
    }).toUpperCase();
  }
  if (n >= 1e15) {
    return "".concat(n.toExponential(3).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1"));
  }
  return "".concat(Number(n.toFixed(2)).toLocaleString(locales.DEFAULT_LOCALE, {
    minimumFractionDigits: 2
  }));
};

exports.floorFormatter = floorFormatter;
exports.isNumber = isNumber;
