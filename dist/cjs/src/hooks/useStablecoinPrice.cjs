'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var tryParseCurrencyAmount = require('../lib/utils/tryParseCurrencyAmount.cjs');
var React = require('react');
var types = require('../state/routing/types.cjs');
var useRoutingAPITrade = require('../state/routing/useRoutingAPITrade.cjs');
var tokens = require('../constants/tokens.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

// Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
var STABLECOIN_AMOUNT_OUT = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, sdkCore.CurrencyAmount.fromRawAmount(tokens.USDC_MAINNET, 100000e6)), sdkCore.ChainId.ARBITRUM_ONE, sdkCore.CurrencyAmount.fromRawAmount(tokens.BRIDGED_USDC_ARBITRUM, 10000e6)), sdkCore.ChainId.OPTIMISM, sdkCore.CurrencyAmount.fromRawAmount(tokens.DAI_OPTIMISM, 10000e18)), sdkCore.ChainId.POLYGON, sdkCore.CurrencyAmount.fromRawAmount(tokens.USDC_POLYGON, 10000e6)), sdkCore.ChainId.CELO, sdkCore.CurrencyAmount.fromRawAmount(tokens.CUSD_CELO, 10000e18)), sdkCore.ChainId.BNB, sdkCore.CurrencyAmount.fromRawAmount(tokens.USDT_BSC, 100e18)), sdkCore.ChainId.AVALANCHE, sdkCore.CurrencyAmount.fromRawAmount(tokens.USDC_AVALANCHE, 10000e6));

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
function useStablecoinPrice(currency) {
  var chainId = currency === null || currency === void 0 ? void 0 : currency.chainId;
  var amountOut = chainId ? STABLECOIN_AMOUNT_OUT[chainId] : undefined;
  var stablecoin = amountOut === null || amountOut === void 0 ? void 0 : amountOut.currency;
  var _useRoutingAPITrade = useRoutingAPITrade.useRoutingAPITrade(false /* skip */, sdkCore.TradeType.EXACT_OUTPUT, amountOut, currency, types.INTERNAL_ROUTER_PREFERENCE_PRICE),
    trade = _useRoutingAPITrade.trade;
  var price = React.useMemo(function () {
    if (!currency || !stablecoin) {
      return undefined;
    }

    // handle usdc
    if (currency !== null && currency !== void 0 && currency.wrapped.equals(stablecoin)) {
      return new sdkCore.Price(stablecoin, stablecoin, "1", "1");
    }
    if (trade) {
      var _trade$routes$0$midPr = trade.routes[0].midPrice,
        numerator = _trade$routes$0$midPr.numerator,
        denominator = _trade$routes$0$midPr.denominator;
      return new sdkCore.Price(currency, stablecoin, denominator, numerator);
    }
    return undefined;
  }, [currency, stablecoin, trade]);
  var lastPrice = React.useRef(price);
  if (!price || !lastPrice.current || !price.equalTo(lastPrice.current) || !price.baseCurrency.equals(lastPrice.current.baseCurrency)) {
    lastPrice.current = price;
  }
  return lastPrice.current;
}
function useStablecoinValue(currencyAmount) {
  var price = useStablecoinPrice(currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency);
  return React.useMemo(function () {
    if (!price || !currencyAmount) return null;
    try {
      return price.quote(currencyAmount);
    } catch (error) {
      return null;
    }
  }, [currencyAmount, price]);
}

/**
 *
 * @param fiatValue string representation of a USD amount
 * @returns CurrencyAmount where currency is stablecoin on active chain
 */
function useStablecoinAmountFromFiatValue(fiatValue) {
  var _STABLECOIN_AMOUNT_OU2;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var stablecoin = chainId ? (_STABLECOIN_AMOUNT_OU2 = STABLECOIN_AMOUNT_OUT[chainId]) === null || _STABLECOIN_AMOUNT_OU2 === void 0 ? void 0 : _STABLECOIN_AMOUNT_OU2.currency : undefined;
  return React.useMemo(function () {
    if (fiatValue === null || fiatValue === undefined || !chainId || !stablecoin) {
      return undefined;
    }

    // trim for decimal precision when parsing
    var parsedForDecimals = fiatValue.toFixed(stablecoin.decimals).toString();
    try {
      // parse USD string into CurrencyAmount based on stablecoin decimals
      return tryParseCurrencyAmount(parsedForDecimals, stablecoin);
    } catch (error) {
      return undefined;
    }
  }, [chainId, fiatValue, stablecoin]);
}

exports["default"] = useStablecoinPrice;
exports.useStablecoinAmountFromFiatValue = useStablecoinAmountFromFiatValue;
exports.useStablecoinValue = useStablecoinValue;
