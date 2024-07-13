'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Add opacity information to a hex color
 * @param amount opacity value from 0 to 100
 * @param hexColor
 */
function opacify(amount, hexColor) {
  if (!hexColor.startsWith("#")) {
    return hexColor;
  }
  if (hexColor.length !== 7) {
    throw new Error("opacify: provided color ".concat(hexColor, " was not in hexadecimal format (e.g. #000000)"));
  }
  if (amount < 0 || amount > 100) {
    throw new Error("opacify: provided amount should be between 0 and 100");
  }
  var opacityHex = Math.round(amount / 100 * 255).toString(16);
  var opacifySuffix = opacityHex.length < 2 ? "0".concat(opacityHex) : opacityHex;
  return "".concat(hexColor.slice(0, 7)).concat(opacifySuffix);
}

exports.opacify = opacify;
