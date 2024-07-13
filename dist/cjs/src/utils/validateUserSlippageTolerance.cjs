'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');

var SlippageValidationResult = /*#__PURE__*/function (SlippageValidationResult) {
  SlippageValidationResult[SlippageValidationResult["TooLow"] = 0] = "TooLow";
  SlippageValidationResult[SlippageValidationResult["TooHigh"] = 1] = "TooHigh";
  SlippageValidationResult[SlippageValidationResult["Valid"] = 2] = "Valid";
  return SlippageValidationResult;
}({});
var MINIMUM_RECOMMENDED_SLIPPAGE = new sdkCore.Percent(5, 10000);
var MAXIMUM_RECOMMENDED_SLIPPAGE = new sdkCore.Percent(1, 100);
function validateUserSlippageTolerance(userSlippageTolerance) {
  if (userSlippageTolerance.lessThan(MINIMUM_RECOMMENDED_SLIPPAGE)) {
    return SlippageValidationResult.TooLow;
  } else if (userSlippageTolerance.greaterThan(MAXIMUM_RECOMMENDED_SLIPPAGE)) {
    return SlippageValidationResult.TooHigh;
  } else {
    return SlippageValidationResult.Valid;
  }
}

exports.MAXIMUM_RECOMMENDED_SLIPPAGE = MAXIMUM_RECOMMENDED_SLIPPAGE;
exports.MINIMUM_RECOMMENDED_SLIPPAGE = MINIMUM_RECOMMENDED_SLIPPAGE;
exports.SlippageValidationResult = SlippageValidationResult;
exports["default"] = validateUserSlippageTolerance;
