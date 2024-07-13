'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
function calculateGasMargin(value) {
  return value.mul(120).div(100);
}

exports.calculateGasMargin = calculateGasMargin;
