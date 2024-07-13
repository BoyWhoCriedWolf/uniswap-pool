'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../../../../node_modules/@lingui/react/dist/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BuyButtonStates = /*#__PURE__*/function (BuyButtonStates) {
  BuyButtonStates[BuyButtonStates["WALLET_NOT_CONNECTED"] = 0] = "WALLET_NOT_CONNECTED";
  BuyButtonStates[BuyButtonStates["NOT_SUPPORTED_CHAIN"] = 1] = "NOT_SUPPORTED_CHAIN";
  BuyButtonStates[BuyButtonStates["INSUFFICIENT_BALANCE"] = 2] = "INSUFFICIENT_BALANCE";
  BuyButtonStates[BuyButtonStates["ERROR"] = 3] = "ERROR";
  BuyButtonStates[BuyButtonStates["IN_WALLET_CONFIRMATION"] = 4] = "IN_WALLET_CONFIRMATION";
  BuyButtonStates[BuyButtonStates["PROCESSING_TRANSACTION"] = 5] = "PROCESSING_TRANSACTION";
  BuyButtonStates[BuyButtonStates["FETCHING_TOKEN_ROUTE"] = 6] = "FETCHING_TOKEN_ROUTE";
  BuyButtonStates[BuyButtonStates["INVALID_TOKEN_ROUTE"] = 7] = "INVALID_TOKEN_ROUTE";
  BuyButtonStates[BuyButtonStates["NO_TOKEN_ROUTE_FOUND"] = 8] = "NO_TOKEN_ROUTE_FOUND";
  BuyButtonStates[BuyButtonStates["LOADING_ALLOWANCE"] = 9] = "LOADING_ALLOWANCE";
  BuyButtonStates[BuyButtonStates["IN_WALLET_ALLOWANCE_APPROVAL"] = 10] = "IN_WALLET_ALLOWANCE_APPROVAL";
  BuyButtonStates[BuyButtonStates["PROCESSING_APPROVAL"] = 11] = "PROCESSING_APPROVAL";
  BuyButtonStates[BuyButtonStates["REQUIRE_APPROVAL"] = 12] = "REQUIRE_APPROVAL";
  BuyButtonStates[BuyButtonStates["CONFIRM_UPDATED_PRICE"] = 13] = "CONFIRM_UPDATED_PRICE";
  BuyButtonStates[BuyButtonStates["PRICE_IMPACT_HIGH"] = 14] = "PRICE_IMPACT_HIGH";
  BuyButtonStates[BuyButtonStates["PAY"] = 15] = "PAY";
  return BuyButtonStates;
}({});
function getBuyButtonStateData(buyButtonState, theme, handleClickOverride, usingPayWithAnyToken, priceImpact) {
  var _buyButtonStateData;
  var defaultBuyButtonState = {
    handleClick: function handleClick() {
      return undefined;
    },
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "nwtY4N",
      message: "Something went wrong"
    }),
    disabled: true,
    warningText: undefined,
    warningTextColor: theme.deprecated_accentWarning,
    helperText: undefined,
    helperTextColor: theme.neutral2,
    buttonColor: theme.accent1,
    buttonTextColor: theme.deprecated_accentTextLightPrimary
  };
  var buyButtonStateData = (_buyButtonStateData = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_buyButtonStateData, BuyButtonStates.WALLET_NOT_CONNECTED, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    handleClick: handleClickOverride !== null && handleClickOverride !== void 0 ? handleClickOverride : function () {
      return undefined;
    },
    disabled: false,
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "VHOVEJ",
      message: "Connect wallet"
    })
  })), BuyButtonStates.NOT_SUPPORTED_CHAIN, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    handleClick: handleClickOverride !== null && handleClickOverride !== void 0 ? handleClickOverride : function () {
      return undefined;
    },
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "ffOtfc",
      message: "Switch networks"
    }),
    disabled: false,
    warningText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "IwI0rY",
      message: "Wrong network"
    })
  })), BuyButtonStates.INSUFFICIENT_BALANCE, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "4fL/V7",
      message: "Pay"
    }),
    warningText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "cPcTW+",
      message: "Insufficient funds"
    })
  })), BuyButtonStates.ERROR, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    warningText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "fWsBTs",
      message: "Something went wrong. Please try again."
    })
  })), BuyButtonStates.IN_WALLET_CONFIRMATION, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "CpEYLQ",
      message: "Proceed in wallet"
    })
  })), BuyButtonStates.PROCESSING_TRANSACTION, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "SqYgw0",
      message: "Transaction pending"
    })
  })), BuyButtonStates.FETCHING_TOKEN_ROUTE, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "hQHwxA",
      message: "Fetching route"
    })
  })), BuyButtonStates.INVALID_TOKEN_ROUTE, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "4fL/V7",
      message: "Pay"
    })
  })), BuyButtonStates.NO_TOKEN_ROUTE_FOUND, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "dLAScn",
      message: "Insufficient liquidity"
    }),
    buttonColor: theme.surface3,
    buttonTextColor: theme.neutral1,
    helperText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "1u70J/",
      message: "Insufficient pool liquidity to complete transaction"
    })
  })), BuyButtonStates.LOADING_ALLOWANCE, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "TuN3Z4",
      message: "Loading allowance"
    })
  })), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_buyButtonStateData, BuyButtonStates.IN_WALLET_ALLOWANCE_APPROVAL, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "4k/lBP",
      message: "Approve in your wallet"
    })
  })), BuyButtonStates.PROCESSING_APPROVAL, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "gHko4n",
      message: "Approval pending"
    })
  })), BuyButtonStates.REQUIRE_APPROVAL, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    disabled: false,
    handleClick: handleClickOverride !== null && handleClickOverride !== void 0 ? handleClickOverride : function () {
      return undefined;
    },
    helperText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "kpa6xe",
      message: "An approval is needed to use this token."
    }),
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "Z7ZXbT",
      message: "Approve"
    })
  })), BuyButtonStates.CONFIRM_UPDATED_PRICE, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    handleClick: handleClickOverride !== null && handleClickOverride !== void 0 ? handleClickOverride : function () {
      return undefined;
    },
    disabled: false,
    warningTextColor: theme.accent1,
    warningText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "Ejd0wH",
      message: "Price updated"
    }),
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "4fL/V7",
      message: "Pay"
    })
  })), BuyButtonStates.PRICE_IMPACT_HIGH, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    handleClick: handleClickOverride !== null && handleClickOverride !== void 0 ? handleClickOverride : function () {
      return undefined;
    },
    disabled: false,
    buttonColor: priceImpact ? priceImpact.priceImpactSeverity.color : defaultBuyButtonState.buttonColor,
    helperText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "NF0esC",
      message: "Price impact warning"
    }),
    helperTextColor: priceImpact ? priceImpact.priceImpactSeverity.color : defaultBuyButtonState.helperTextColor,
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "2AEplS",
      message: "Pay Anyway"
    })
  })), BuyButtonStates.PAY, _objectSpread(_objectSpread({}, defaultBuyButtonState), {}, {
    handleClick: handleClickOverride !== null && handleClickOverride !== void 0 ? handleClickOverride : function () {
      return undefined;
    },
    disabled: false,
    buttonText: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "4fL/V7",
      message: "Pay"
    }),
    helperText: usingPayWithAnyToken ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "3BWxOM",
      message: "Refunds for unavailable items will be given in ETH"
    }) : undefined
  })));
  return buyButtonStateData[buyButtonState];
}

exports.BuyButtonStates = BuyButtonStates;
exports.getBuyButtonStateData = getBuyButtonStateData;
