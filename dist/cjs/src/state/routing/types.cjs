'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _get = require('@babel/runtime/helpers/get');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var routerSdk = require('@uniswap/router-sdk');
var sdkCore = require('@uniswap/sdk-core');
var uniswapxSdk = require('@uniswap/uniswapx-sdk');
var misc = require('../../constants/misc.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _excluded = ["gasUseEstimateUSD", "blockNumber", "isUniswapXBetter", "requestId", "quoteMethod", "approveInfo", "inputTax", "outputTax"];
function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }
  derived = _getPrototypeOf__default["default"](derived);
  return _possibleConstructorReturn__default["default"](_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf__default["default"](_this).constructor) : derived.apply(_this, args));
}
var TradeState = /*#__PURE__*/function (TradeState) {
  TradeState["LOADING"] = "loading";
  TradeState["INVALID"] = "invalid";
  TradeState["STALE"] = "stale";
  TradeState["NO_ROUTE_FOUND"] = "no_route_found";
  TradeState["VALID"] = "valid";
  return TradeState;
}({});
var QuoteMethod = /*#__PURE__*/function (QuoteMethod) {
  QuoteMethod["ROUTING_API"] = "ROUTING_API";
  QuoteMethod["QUICK_ROUTE"] = "QUICK_ROUTE";
  QuoteMethod["CLIENT_SIDE"] = "CLIENT_SIDE";
  QuoteMethod["CLIENT_SIDE_FALLBACK"] = "CLIENT_SIDE_FALLBACK";
  return QuoteMethod;
}({}); // If client-side was used after the routing-api call failed.

// This is excluded from `RouterPreference` enum because it's only used
// internally for token -> USDC trades to get a USD value.
var INTERNAL_ROUTER_PREFERENCE_PRICE = "price";
var RouterPreference = /*#__PURE__*/function (RouterPreference) {
  RouterPreference["X"] = "uniswapx";
  RouterPreference["API"] = "api";
  RouterPreference["CLIENT"] = "client";
  return RouterPreference;
}({});

// from https://github.com/Uniswap/routing-api/blob/main/lib/handlers/schema.ts

function isClassicQuoteResponse(data) {
  return data.routing === URAQuoteType.CLASSIC;
}
var TradeFillType = /*#__PURE__*/function (TradeFillType) {
  TradeFillType["Classic"] = "classic";
  TradeFillType["UniswapX"] = "uniswap_x";
  TradeFillType["None"] = "none";
  return TradeFillType;
}({}); // for preview trades, cant be used for submission
var ClassicTrade = /*#__PURE__*/function (_Trade) {
  // gas estimate for swaps

  function ClassicTrade(_ref) {
    var _this2;
    var gasUseEstimateUSD = _ref.gasUseEstimateUSD,
      blockNumber = _ref.blockNumber,
      isUniswapXBetter = _ref.isUniswapXBetter,
      requestId = _ref.requestId,
      quoteMethod = _ref.quoteMethod,
      approveInfo = _ref.approveInfo,
      inputTax = _ref.inputTax,
      outputTax = _ref.outputTax,
      routes = _objectWithoutProperties__default["default"](_ref, _excluded);
    _classCallCheck__default["default"](this, ClassicTrade);
    _this2 = _callSuper(this, ClassicTrade, [routes]);
    _defineProperty__default["default"](_this2, "fillType", TradeFillType.Classic);
    _this2.blockNumber = blockNumber;
    _this2.gasUseEstimateUSD = gasUseEstimateUSD;
    _this2.isUniswapXBetter = isUniswapXBetter;
    _this2.requestId = requestId;
    _this2.quoteMethod = quoteMethod;
    _this2.approveInfo = approveInfo;
    _this2.inputTax = inputTax;
    _this2.outputTax = outputTax;
    return _this2;
  }
  _inherits__default["default"](ClassicTrade, _Trade);
  return _createClass__default["default"](ClassicTrade, [{
    key: "totalTaxRate",
    get: function get() {
      return this.inputTax.add(this.outputTax);
    }
  }, {
    key: "postTaxOutputAmount",
    get: function get() {
      // Ideally we should calculate the final output amount by ammending the inputAmount based on the input tax and then applying the output tax,
      // but this isn't currently possible because V2Trade reconstructs the total inputAmount based on the swap routes
      // TODO(WEB-2761): Amend V2Trade objects in the v2-sdk to have a separate field for post-input tax routes
      return this.outputAmount.multiply(new sdkCore.Fraction(routerSdk.ONE).subtract(this.totalTaxRate));
    }
  }, {
    key: "minimumAmountOut",
    value: function minimumAmountOut(slippageTolerance) {
      var amountOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.outputAmount;
      // Since universal-router-sdk reconstructs V2Trade objects, overriding this method does not actually change the minimumAmountOut that gets submitted on-chain
      // Our current workaround is to add tax rate to slippage tolerance before we submit the trade to universal-router-sdk in useUniversalRouter.ts
      // So the purpose of this override is so the UI displays the same minimum amount out as what is submitted on-chain
      return _get__default["default"](_getPrototypeOf__default["default"](ClassicTrade.prototype), "minimumAmountOut", this).call(this, slippageTolerance.add(this.totalTaxRate), amountOut);
    }

    // gas estimate for maybe approve + swap
  }, {
    key: "totalGasUseEstimateUSD",
    get: function get() {
      if (this.approveInfo.needsApprove && this.gasUseEstimateUSD) {
        return this.approveInfo.approveGasEstimateUSD + this.gasUseEstimateUSD;
      }
      return this.gasUseEstimateUSD;
    }
  }]);
}(routerSdk.Trade);
var DutchOrderTrade = /*#__PURE__*/function (_IDutchOrderTrade) {
  function DutchOrderTrade(_ref2) {
    var _this3;
    var currencyIn = _ref2.currencyIn,
      currenciesOut = _ref2.currenciesOut,
      orderInfo = _ref2.orderInfo,
      tradeType = _ref2.tradeType,
      quoteId = _ref2.quoteId,
      requestId = _ref2.requestId,
      wrapInfo = _ref2.wrapInfo,
      approveInfo = _ref2.approveInfo,
      classicGasUseEstimateUSD = _ref2.classicGasUseEstimateUSD,
      auctionPeriodSecs = _ref2.auctionPeriodSecs,
      startTimeBufferSecs = _ref2.startTimeBufferSecs,
      deadlineBufferSecs = _ref2.deadlineBufferSecs,
      slippageTolerance = _ref2.slippageTolerance;
    _classCallCheck__default["default"](this, DutchOrderTrade);
    _this3 = _callSuper(this, DutchOrderTrade, [{
      currencyIn: currencyIn,
      currenciesOut: currenciesOut,
      orderInfo: orderInfo,
      tradeType: tradeType
    }]);
    _defineProperty__default["default"](_this3, "fillType", TradeFillType.UniswapX);
    _defineProperty__default["default"](_this3, "inputTax", misc.ZERO_PERCENT);
    _defineProperty__default["default"](_this3, "outputTax", misc.ZERO_PERCENT);
    _this3.quoteId = quoteId;
    _this3.requestId = requestId;
    _this3.approveInfo = approveInfo;
    _this3.wrapInfo = wrapInfo;
    _this3.classicGasUseEstimateUSD = classicGasUseEstimateUSD;
    _this3.auctionPeriodSecs = auctionPeriodSecs;
    _this3.deadlineBufferSecs = deadlineBufferSecs;
    _this3.slippageTolerance = slippageTolerance;
    _this3.startTimeBufferSecs = startTimeBufferSecs;
    return _this3;
  }
  _inherits__default["default"](DutchOrderTrade, _IDutchOrderTrade);
  return _createClass__default["default"](DutchOrderTrade, [{
    key: "totalGasUseEstimateUSD",
    get: function get() {
      if (this.wrapInfo.needsWrap && this.approveInfo.needsApprove) {
        return this.wrapInfo.wrapGasEstimateUSD + this.approveInfo.approveGasEstimateUSD;
      }
      if (this.wrapInfo.needsWrap) return this.wrapInfo.wrapGasEstimateUSD;
      if (this.approveInfo.needsApprove) return this.approveInfo.approveGasEstimateUSD;
      return 0;
    }

    /** For UniswapX, handling token taxes in the output amount is outsourced to quoters */
  }, {
    key: "postTaxOutputAmount",
    get: function get() {
      return this.outputAmount;
    }
  }]);
}(uniswapxSdk.DutchOrderTrade);
var PreviewTrade = /*#__PURE__*/function () {
  function PreviewTrade(_ref3) {
    var inputAmount = _ref3.inputAmount,
      outputAmount = _ref3.outputAmount,
      tradeType = _ref3.tradeType,
      inputTax = _ref3.inputTax,
      outputTax = _ref3.outputTax;
    _classCallCheck__default["default"](this, PreviewTrade);
    _defineProperty__default["default"](this, "fillType", TradeFillType.None);
    _defineProperty__default["default"](this, "quoteMethod", QuoteMethod.QUICK_ROUTE);
    this.inputAmount = inputAmount;
    this.outputAmount = outputAmount;
    this.tradeType = tradeType;
    this.inputTax = inputTax;
    this.outputTax = outputTax;
  }
  return _createClass__default["default"](PreviewTrade, [{
    key: "totalTaxRate",
    get: function get() {
      return this.inputTax.add(this.outputTax);
    }
  }, {
    key: "postTaxOutputAmount",
    get: function get() {
      // Ideally we should calculate the final output amount by ammending the inputAmount based on the input tax and then applying the output tax,
      // but this isn't currently possible because V2Trade reconstructs the total inputAmount based on the swap routes
      // TODO(WEB-2761): Amend V2Trade objects in the v2-sdk to have a separate field for post-input tax routes
      return this.outputAmount.multiply(new sdkCore.Fraction(routerSdk.ONE).subtract(this.totalTaxRate));
    }

    // below methods are copied from router-sdk
    // Trade https://github.com/Uniswap/router-sdk/blob/main/src/entities/trade.ts#L10
  }, {
    key: "minimumAmountOut",
    value: function minimumAmountOut(slippageTolerance) {
      var amountOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.outputAmount;
      if (this.tradeType === sdkCore.TradeType.EXACT_OUTPUT) {
        return amountOut;
      } else {
        var slippageAdjustedAmountOut = new sdkCore.Fraction(routerSdk.ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
        return sdkCore.CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
      }
    }
  }, {
    key: "maximumAmountIn",
    value: function maximumAmountIn(slippageTolerance) {
      var amountIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.inputAmount;
      if (this.tradeType === sdkCore.TradeType.EXACT_INPUT) {
        return amountIn;
      } else {
        var slippageAdjustedAmountIn = new sdkCore.Fraction(routerSdk.ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
        return sdkCore.CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
      }
    }
  }, {
    key: "executionPrice",
    get:
    /**
     * The price expressed in terms of output amount/input amount.
     */
    function get() {
      var _this$_executionPrice;
      return (_this$_executionPrice = this._executionPrice) !== null && _this$_executionPrice !== void 0 ? _this$_executionPrice : this._executionPrice = new sdkCore.Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
  }, {
    key: "worstExecutionPrice",
    value: function worstExecutionPrice(slippageTolerance) {
      return new sdkCore.Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
    }
  }]);
}();
var QuoteState = /*#__PURE__*/function (QuoteState) {
  QuoteState["SUCCESS"] = "Success";
  QuoteState["NOT_FOUND"] = "Not found";
  return QuoteState;
}({});
var PoolType = /*#__PURE__*/function (PoolType) {
  PoolType["V2Pool"] = "v2-pool";
  PoolType["V3Pool"] = "v3-pool";
  return PoolType;
}({});

// swap router API special cases these strings to represent native currencies
// all chains except for bnb chain and polygon
// have "ETH" as native currency symbol
var SwapRouterNativeAssets = /*#__PURE__*/function (SwapRouterNativeAssets) {
  SwapRouterNativeAssets["MATIC"] = "MATIC";
  SwapRouterNativeAssets["BNB"] = "BNB";
  SwapRouterNativeAssets["AVAX"] = "AVAX";
  SwapRouterNativeAssets["ETH"] = "ETH";
  return SwapRouterNativeAssets;
}({});
var URAQuoteType = /*#__PURE__*/function (URAQuoteType) {
  URAQuoteType["CLASSIC"] = "CLASSIC";
  URAQuoteType["DUTCH_LIMIT"] = "DUTCH_LIMIT";
  return URAQuoteType;
}({});

exports.ClassicTrade = ClassicTrade;
exports.DutchOrderTrade = DutchOrderTrade;
exports.INTERNAL_ROUTER_PREFERENCE_PRICE = INTERNAL_ROUTER_PREFERENCE_PRICE;
exports.PoolType = PoolType;
exports.PreviewTrade = PreviewTrade;
exports.QuoteMethod = QuoteMethod;
exports.QuoteState = QuoteState;
exports.RouterPreference = RouterPreference;
exports.SwapRouterNativeAssets = SwapRouterNativeAssets;
exports.TradeFillType = TradeFillType;
exports.TradeState = TradeState;
exports.URAQuoteType = URAQuoteType;
exports.isClassicQuoteResponse = isClassicQuoteResponse;
