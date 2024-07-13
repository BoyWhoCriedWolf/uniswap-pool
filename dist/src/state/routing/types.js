import { Trade, ONE } from '@uniswap/router-sdk';
import { Fraction, TradeType, CurrencyAmount, Price } from '@uniswap/sdk-core';
import { DutchOrderTrade as DutchOrderTrade$1 } from '@uniswap/uniswapx-sdk';
import { ZERO_PERCENT } from '../../constants/misc.js';

let TradeState = /*#__PURE__*/function (TradeState) {
  TradeState["LOADING"] = "loading";
  TradeState["INVALID"] = "invalid";
  TradeState["STALE"] = "stale";
  TradeState["NO_ROUTE_FOUND"] = "no_route_found";
  TradeState["VALID"] = "valid";
  return TradeState;
}({});
let QuoteMethod = /*#__PURE__*/function (QuoteMethod) {
  QuoteMethod["ROUTING_API"] = "ROUTING_API";
  QuoteMethod["QUICK_ROUTE"] = "QUICK_ROUTE";
  QuoteMethod["CLIENT_SIDE"] = "CLIENT_SIDE";
  QuoteMethod["CLIENT_SIDE_FALLBACK"] = "CLIENT_SIDE_FALLBACK";
  return QuoteMethod;
}({}); // If client-side was used after the routing-api call failed.

// This is excluded from `RouterPreference` enum because it's only used
// internally for token -> USDC trades to get a USD value.
const INTERNAL_ROUTER_PREFERENCE_PRICE = "price";
let RouterPreference = /*#__PURE__*/function (RouterPreference) {
  RouterPreference["X"] = "uniswapx";
  RouterPreference["API"] = "api";
  RouterPreference["CLIENT"] = "client";
  return RouterPreference;
}({});

// from https://github.com/Uniswap/routing-api/blob/main/lib/handlers/schema.ts

function isClassicQuoteResponse(data) {
  return data.routing === URAQuoteType.CLASSIC;
}
let TradeFillType = /*#__PURE__*/function (TradeFillType) {
  TradeFillType["Classic"] = "classic";
  TradeFillType["UniswapX"] = "uniswap_x";
  TradeFillType["None"] = "none";
  return TradeFillType;
}({}); // for preview trades, cant be used for submission
class ClassicTrade extends Trade {
  fillType = TradeFillType.Classic;

  // gas estimate for swaps

  constructor(_ref) {
    let {
      gasUseEstimateUSD,
      blockNumber,
      isUniswapXBetter,
      requestId,
      quoteMethod,
      approveInfo,
      inputTax,
      outputTax,
      ...routes
    } = _ref;
    super(routes);
    this.blockNumber = blockNumber;
    this.gasUseEstimateUSD = gasUseEstimateUSD;
    this.isUniswapXBetter = isUniswapXBetter;
    this.requestId = requestId;
    this.quoteMethod = quoteMethod;
    this.approveInfo = approveInfo;
    this.inputTax = inputTax;
    this.outputTax = outputTax;
  }
  get totalTaxRate() {
    return this.inputTax.add(this.outputTax);
  }
  get postTaxOutputAmount() {
    // Ideally we should calculate the final output amount by ammending the inputAmount based on the input tax and then applying the output tax,
    // but this isn't currently possible because V2Trade reconstructs the total inputAmount based on the swap routes
    // TODO(WEB-2761): Amend V2Trade objects in the v2-sdk to have a separate field for post-input tax routes
    return this.outputAmount.multiply(new Fraction(ONE).subtract(this.totalTaxRate));
  }
  minimumAmountOut(slippageTolerance) {
    let amountOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.outputAmount;
    // Since universal-router-sdk reconstructs V2Trade objects, overriding this method does not actually change the minimumAmountOut that gets submitted on-chain
    // Our current workaround is to add tax rate to slippage tolerance before we submit the trade to universal-router-sdk in useUniversalRouter.ts
    // So the purpose of this override is so the UI displays the same minimum amount out as what is submitted on-chain
    return super.minimumAmountOut(slippageTolerance.add(this.totalTaxRate), amountOut);
  }

  // gas estimate for maybe approve + swap
  get totalGasUseEstimateUSD() {
    if (this.approveInfo.needsApprove && this.gasUseEstimateUSD) {
      return this.approveInfo.approveGasEstimateUSD + this.gasUseEstimateUSD;
    }
    return this.gasUseEstimateUSD;
  }
}
class DutchOrderTrade extends DutchOrderTrade$1 {
  fillType = TradeFillType.UniswapX;

  // The gas estimate of the reference classic trade, if there is one.

  inputTax = ZERO_PERCENT;
  outputTax = ZERO_PERCENT;
  constructor(_ref2) {
    let {
      currencyIn,
      currenciesOut,
      orderInfo,
      tradeType,
      quoteId,
      requestId,
      wrapInfo,
      approveInfo,
      classicGasUseEstimateUSD,
      auctionPeriodSecs,
      startTimeBufferSecs,
      deadlineBufferSecs,
      slippageTolerance
    } = _ref2;
    super({
      currencyIn,
      currenciesOut,
      orderInfo,
      tradeType
    });
    this.quoteId = quoteId;
    this.requestId = requestId;
    this.approveInfo = approveInfo;
    this.wrapInfo = wrapInfo;
    this.classicGasUseEstimateUSD = classicGasUseEstimateUSD;
    this.auctionPeriodSecs = auctionPeriodSecs;
    this.deadlineBufferSecs = deadlineBufferSecs;
    this.slippageTolerance = slippageTolerance;
    this.startTimeBufferSecs = startTimeBufferSecs;
  }
  get totalGasUseEstimateUSD() {
    if (this.wrapInfo.needsWrap && this.approveInfo.needsApprove) {
      return this.wrapInfo.wrapGasEstimateUSD + this.approveInfo.approveGasEstimateUSD;
    }
    if (this.wrapInfo.needsWrap) return this.wrapInfo.wrapGasEstimateUSD;
    if (this.approveInfo.needsApprove) return this.approveInfo.approveGasEstimateUSD;
    return 0;
  }

  /** For UniswapX, handling token taxes in the output amount is outsourced to quoters */
  get postTaxOutputAmount() {
    return this.outputAmount;
  }
}
class PreviewTrade {
  fillType = TradeFillType.None;
  quoteMethod = QuoteMethod.QUICK_ROUTE;
  constructor(_ref3) {
    let {
      inputAmount,
      outputAmount,
      tradeType,
      inputTax,
      outputTax
    } = _ref3;
    this.inputAmount = inputAmount;
    this.outputAmount = outputAmount;
    this.tradeType = tradeType;
    this.inputTax = inputTax;
    this.outputTax = outputTax;
  }
  get totalTaxRate() {
    return this.inputTax.add(this.outputTax);
  }
  get postTaxOutputAmount() {
    // Ideally we should calculate the final output amount by ammending the inputAmount based on the input tax and then applying the output tax,
    // but this isn't currently possible because V2Trade reconstructs the total inputAmount based on the swap routes
    // TODO(WEB-2761): Amend V2Trade objects in the v2-sdk to have a separate field for post-input tax routes
    return this.outputAmount.multiply(new Fraction(ONE).subtract(this.totalTaxRate));
  }

  // below methods are copied from router-sdk
  // Trade https://github.com/Uniswap/router-sdk/blob/main/src/entities/trade.ts#L10
  minimumAmountOut(slippageTolerance) {
    let amountOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.outputAmount;
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      const slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  maximumAmountIn(slippageTolerance) {
    let amountIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.inputAmount;
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * The price expressed in terms of output amount/input amount.
   */
  get executionPrice() {
    return this._executionPrice ?? (this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient));
  }
  worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
}
let QuoteState = /*#__PURE__*/function (QuoteState) {
  QuoteState["SUCCESS"] = "Success";
  QuoteState["NOT_FOUND"] = "Not found";
  return QuoteState;
}({});
let PoolType = /*#__PURE__*/function (PoolType) {
  PoolType["V2Pool"] = "v2-pool";
  PoolType["V3Pool"] = "v3-pool";
  return PoolType;
}({});

// swap router API special cases these strings to represent native currencies
// all chains except for bnb chain and polygon
// have "ETH" as native currency symbol
let SwapRouterNativeAssets = /*#__PURE__*/function (SwapRouterNativeAssets) {
  SwapRouterNativeAssets["MATIC"] = "MATIC";
  SwapRouterNativeAssets["BNB"] = "BNB";
  SwapRouterNativeAssets["AVAX"] = "AVAX";
  SwapRouterNativeAssets["ETH"] = "ETH";
  return SwapRouterNativeAssets;
}({});
let URAQuoteType = /*#__PURE__*/function (URAQuoteType) {
  URAQuoteType["CLASSIC"] = "CLASSIC";
  URAQuoteType["DUTCH_LIMIT"] = "DUTCH_LIMIT";
  return URAQuoteType;
}({});

export { ClassicTrade, DutchOrderTrade, INTERNAL_ROUTER_PREFERENCE_PRICE, PoolType, PreviewTrade, QuoteMethod, QuoteState, RouterPreference, SwapRouterNativeAssets, TradeFillType, TradeState, URAQuoteType, isClassicQuoteResponse };
