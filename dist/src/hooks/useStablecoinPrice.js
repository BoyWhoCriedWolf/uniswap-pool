import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { ChainId, CurrencyAmount, TradeType, Price } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import tryParseCurrencyAmount from '../lib/utils/tryParseCurrencyAmount.js';
import { useMemo, useRef } from 'react';
import { INTERNAL_ROUTER_PREFERENCE_PRICE } from '../state/routing/types.js';
import { useRoutingAPITrade } from '../state/routing/useRoutingAPITrade.js';
import { USDC_MAINNET, BRIDGED_USDC_ARBITRUM, DAI_OPTIMISM, USDC_POLYGON, CUSD_CELO, USDT_BSC, USDC_AVALANCHE } from '../constants/tokens.js';

// Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
var STABLECOIN_AMOUNT_OUT = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ChainId.MAINNET, CurrencyAmount.fromRawAmount(USDC_MAINNET, 100000e6)), ChainId.ARBITRUM_ONE, CurrencyAmount.fromRawAmount(BRIDGED_USDC_ARBITRUM, 10000e6)), ChainId.OPTIMISM, CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 10000e18)), ChainId.POLYGON, CurrencyAmount.fromRawAmount(USDC_POLYGON, 10000e6)), ChainId.CELO, CurrencyAmount.fromRawAmount(CUSD_CELO, 10000e18)), ChainId.BNB, CurrencyAmount.fromRawAmount(USDT_BSC, 100e18)), ChainId.AVALANCHE, CurrencyAmount.fromRawAmount(USDC_AVALANCHE, 10000e6));

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
function useStablecoinPrice(currency) {
  var chainId = currency === null || currency === void 0 ? void 0 : currency.chainId;
  var amountOut = chainId ? STABLECOIN_AMOUNT_OUT[chainId] : undefined;
  var stablecoin = amountOut === null || amountOut === void 0 ? void 0 : amountOut.currency;
  var _useRoutingAPITrade = useRoutingAPITrade(false /* skip */, TradeType.EXACT_OUTPUT, amountOut, currency, INTERNAL_ROUTER_PREFERENCE_PRICE),
    trade = _useRoutingAPITrade.trade;
  var price = useMemo(function () {
    if (!currency || !stablecoin) {
      return undefined;
    }

    // handle usdc
    if (currency !== null && currency !== void 0 && currency.wrapped.equals(stablecoin)) {
      return new Price(stablecoin, stablecoin, "1", "1");
    }
    if (trade) {
      var _trade$routes$0$midPr = trade.routes[0].midPrice,
        numerator = _trade$routes$0$midPr.numerator,
        denominator = _trade$routes$0$midPr.denominator;
      return new Price(currency, stablecoin, denominator, numerator);
    }
    return undefined;
  }, [currency, stablecoin, trade]);
  var lastPrice = useRef(price);
  if (!price || !lastPrice.current || !price.equalTo(lastPrice.current) || !price.baseCurrency.equals(lastPrice.current.baseCurrency)) {
    lastPrice.current = price;
  }
  return lastPrice.current;
}
function useStablecoinValue(currencyAmount) {
  var price = useStablecoinPrice(currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency);
  return useMemo(function () {
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
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var stablecoin = chainId ? (_STABLECOIN_AMOUNT_OU2 = STABLECOIN_AMOUNT_OUT[chainId]) === null || _STABLECOIN_AMOUNT_OU2 === void 0 ? void 0 : _STABLECOIN_AMOUNT_OU2.currency : undefined;
  return useMemo(function () {
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

export { useStablecoinPrice as default, useStablecoinAmountFromFiatValue, useStablecoinValue };
