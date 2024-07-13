import { Percent } from '@uniswap/sdk-core';

var SlippageValidationResult = /*#__PURE__*/function (SlippageValidationResult) {
  SlippageValidationResult[SlippageValidationResult["TooLow"] = 0] = "TooLow";
  SlippageValidationResult[SlippageValidationResult["TooHigh"] = 1] = "TooHigh";
  SlippageValidationResult[SlippageValidationResult["Valid"] = 2] = "Valid";
  return SlippageValidationResult;
}({});
var MINIMUM_RECOMMENDED_SLIPPAGE = new Percent(5, 10000);
var MAXIMUM_RECOMMENDED_SLIPPAGE = new Percent(1, 100);
function validateUserSlippageTolerance(userSlippageTolerance) {
  if (userSlippageTolerance.lessThan(MINIMUM_RECOMMENDED_SLIPPAGE)) {
    return SlippageValidationResult.TooLow;
  } else if (userSlippageTolerance.greaterThan(MAXIMUM_RECOMMENDED_SLIPPAGE)) {
    return SlippageValidationResult.TooHigh;
  } else {
    return SlippageValidationResult.Valid;
  }
}

export { MAXIMUM_RECOMMENDED_SLIPPAGE, MINIMUM_RECOMMENDED_SLIPPAGE, SlippageValidationResult, validateUserSlippageTolerance as default };
