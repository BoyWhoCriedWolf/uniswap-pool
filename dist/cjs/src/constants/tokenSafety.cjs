'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index = require('../../node_modules/@lingui/react/dist/index.cjs');
require('../graphql/data/__generated__/types-and-hooks.cjs');
var misc = require('./misc.cjs');
var tokens = require('./tokens.cjs');
var tokenSafetyLookup = require('./tokenSafetyLookup.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var TOKEN_SAFETY_ARTICLE = "https://support.uniswap.org/hc/en-us/articles/8723118437133";
var WARNING_LEVEL = /*#__PURE__*/function (WARNING_LEVEL) {
  WARNING_LEVEL[WARNING_LEVEL["MEDIUM"] = 0] = "MEDIUM";
  WARNING_LEVEL[WARNING_LEVEL["UNKNOWN"] = 1] = "UNKNOWN";
  WARNING_LEVEL[WARNING_LEVEL["BLOCKED"] = 2] = "BLOCKED";
  return WARNING_LEVEL;
}({});
function getWarningCopy(warning) {
  var plural = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var heading = null,
    description = null;
  if (warning) {
    switch (warning.level) {
      case WARNING_LEVEL.MEDIUM:
        heading = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "+AISKU",
          message: "{0, plural, =1 {This token isn't traded on leading U.S. centralized exchanges.} other {These tokens aren't traded on leading U.S. centralized exchanges.}}",
          values: {
            "0": plural ? 2 : 1
          }
        });
        description = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "Nvt/UN",
          message: "Always conduct your own research before trading."
        });
        break;
      case WARNING_LEVEL.UNKNOWN:
        heading = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "2na2+J",
          message: "{0, plural, =1 {This token isn't traded on leading U.S. centralized exchanges or frequently swapped on Uniswap.} other {These tokens aren't traded on leading U.S. centralized exchanges or frequently swapped on Uniswap.}}",
          values: {
            "0": plural ? 2 : 1
          }
        });
        description = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "Nvt/UN",
          message: "Always conduct your own research before trading."
        });
        break;
      case WARNING_LEVEL.BLOCKED:
        description = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "T/CHJH",
          message: "{0, plural, =1 {You can't trade this token using the Uniswap App.} other {You can't trade these tokens using the Uniswap App.}}",
          values: {
            "0": plural ? 2 : 1
          }
        });
        break;
    }
  }
  return {
    heading: heading,
    description: description
  };
}
var MediumWarning = {
  level: WARNING_LEVEL.MEDIUM,
  message: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "VvjZ7K",
    message: "Caution"
  }),
  canProceed: true
};
var StrongWarning = {
  level: WARNING_LEVEL.UNKNOWN,
  message: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "r6y+jM",
    message: "Warning"
  }),
  canProceed: true
};
var BlockedWarning = {
  level: WARNING_LEVEL.BLOCKED,
  message: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "OJx3wK",
    message: "Not available"
  }),
  canProceed: false
};
var NotFoundWarning = {
  level: WARNING_LEVEL.UNKNOWN,
  message: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "6L88mW",
    message: "Token not found"
  }),
  canProceed: false
};
function checkWarning(tokenAddress, chainId) {
  if (tokenAddress === tokens.NATIVE_CHAIN_ID || tokenAddress === misc.ZERO_ADDRESS) {
    return null;
  }
  switch (tokenSafetyLookup["default"].checkToken(tokenAddress.toLowerCase(), chainId)) {
    case tokenSafetyLookup.TOKEN_LIST_TYPES.UNI_DEFAULT:
      return null;
    case tokenSafetyLookup.TOKEN_LIST_TYPES.UNI_EXTENDED:
      return MediumWarning;
    case tokenSafetyLookup.TOKEN_LIST_TYPES.UNKNOWN:
      return StrongWarning;
    case tokenSafetyLookup.TOKEN_LIST_TYPES.BLOCKED:
      return BlockedWarning;
    case tokenSafetyLookup.TOKEN_LIST_TYPES.BROKEN:
      return BlockedWarning;
  }
}
function displayWarningLabel(warning) {
  return warning && warning.level !== WARNING_LEVEL.MEDIUM;
}

exports.NotFoundWarning = NotFoundWarning;
exports.TOKEN_SAFETY_ARTICLE = TOKEN_SAFETY_ARTICLE;
exports.WARNING_LEVEL = WARNING_LEVEL;
exports.checkWarning = checkWarning;
exports.displayWarningLabel = displayWarningLabel;
exports.getWarningCopy = getWarningCopy;
