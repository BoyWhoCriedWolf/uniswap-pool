import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { NetworkStatus } from '@apollo/client';
import { ChainId, CurrencyAmount, TradeType, Price } from '@uniswap/sdk-core';
import { nativeOnChain } from '../constants/tokens.js';
import { useTokenSpotPriceQuery, Chain } from '../graphql/data/__generated__/types-and-hooks.js';
import { chainIdToBackendName, PollingInterval, isGqlSupportedChain } from '../graphql/data/util.js';
import { useMemo } from 'react';
import { TradeState, INTERNAL_ROUTER_PREFERENCE_PRICE } from '../state/routing/types.js';
import { useRoutingAPITrade } from '../state/routing/useRoutingAPITrade.js';
import { getNativeTokenDBAddress } from '../utils/nativeTokens.js';
import useStablecoinPrice from './useStablecoinPrice.js';

// ETH amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
var ETH_AMOUNT_OUT = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ChainId.MAINNET, CurrencyAmount.fromRawAmount(nativeOnChain(ChainId.MAINNET), 50e18)), ChainId.ARBITRUM_ONE, CurrencyAmount.fromRawAmount(nativeOnChain(ChainId.ARBITRUM_ONE), 10e18)), ChainId.OPTIMISM, CurrencyAmount.fromRawAmount(nativeOnChain(ChainId.OPTIMISM), 10e18)), ChainId.POLYGON, CurrencyAmount.fromRawAmount(nativeOnChain(ChainId.POLYGON), 10000e18)), ChainId.CELO, CurrencyAmount.fromRawAmount(nativeOnChain(ChainId.CELO), 10e18));
function useETHPrice(currency) {
  var chainId = currency === null || currency === void 0 ? void 0 : currency.chainId;
  var isSupported = currency && isGqlSupportedChain(chainId);
  var amountOut = isSupported ? ETH_AMOUNT_OUT[chainId] : undefined;
  var _useRoutingAPITrade = useRoutingAPITrade(!isSupported /* skip */, TradeType.EXACT_OUTPUT, amountOut, currency, INTERNAL_ROUTER_PREFERENCE_PRICE),
    trade = _useRoutingAPITrade.trade,
    state = _useRoutingAPITrade.state;
  return useMemo(function () {
    if (!isSupported) {
      return {
        data: undefined,
        isLoading: false
      };
    }
    if (currency !== null && currency !== void 0 && currency.wrapped.equals(nativeOnChain(chainId).wrapped)) {
      return {
        data: new Price(currency, currency, "1", "1"),
        isLoading: false
      };
    }
    if (!trade || state === TradeState.LOADING) {
      return {
        data: undefined,
        isLoading: state === TradeState.LOADING
      };
    }
    var _trade$routes$0$midPr = trade.routes[0].midPrice,
      numerator = _trade$routes$0$midPr.numerator,
      denominator = _trade$routes$0$midPr.denominator;
    var price = new Price(currency, nativeOnChain(chainId), denominator, numerator);
    return {
      data: price,
      isLoading: false
    };
  }, [chainId, currency, isSupported, state, trade]);
}
function useUSDPrice(currencyAmount, prefetchCurrency) {
  var _currencyAmount$curre, _data$token2;
  var currency = (_currencyAmount$curre = currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency) !== null && _currencyAmount$curre !== void 0 ? _currencyAmount$curre : prefetchCurrency;
  var chainId = currency === null || currency === void 0 ? void 0 : currency.chainId;
  var chain = chainId ? chainIdToBackendName(chainId) : undefined;

  // Use ETH-based pricing if available.
  var _useETHPrice = useETHPrice(currency),
    tokenEthPrice = _useETHPrice.data,
    isTokenEthPriceLoading = _useETHPrice.isLoading;
  var isTokenEthPriced = Boolean(tokenEthPrice || isTokenEthPriceLoading);
  var _useTokenSpotPriceQue = useTokenSpotPriceQuery({
      variables: {
        chain: chain !== null && chain !== void 0 ? chain : Chain.Ethereum,
        address: getNativeTokenDBAddress(chain !== null && chain !== void 0 ? chain : Chain.Ethereum)
      },
      skip: !isTokenEthPriced,
      pollInterval: PollingInterval.Normal,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-first"
    }),
    data = _useTokenSpotPriceQue.data,
    networkStatus = _useTokenSpotPriceQue.networkStatus;

  // Use USDC-based pricing for chains not yet supported by backend (for ETH-based pricing).
  var stablecoinPrice = useStablecoinPrice(isTokenEthPriced ? undefined : currency);
  return useMemo(function () {
    if (!currencyAmount) {
      return {
        data: undefined,
        isLoading: false
      };
    } else if (stablecoinPrice) {
      return {
        data: parseFloat(stablecoinPrice.quote(currencyAmount).toSignificant()),
        isLoading: false
      };
    } else {
      var _data$token;
      // Otherwise, get the price of the token in ETH, and then multiply by the price of ETH.
      var ethUSDPrice = data === null || data === void 0 || (_data$token = data.token) === null || _data$token === void 0 || (_data$token = _data$token.project) === null || _data$token === void 0 || (_data$token = _data$token.markets) === null || _data$token === void 0 || (_data$token = _data$token[0]) === null || _data$token === void 0 || (_data$token = _data$token.price) === null || _data$token === void 0 ? void 0 : _data$token.value;
      if (ethUSDPrice && tokenEthPrice) {
        return {
          data: parseFloat(tokenEthPrice.quote(currencyAmount).toExact()) * ethUSDPrice,
          isLoading: false
        };
      } else {
        return {
          data: undefined,
          isLoading: isTokenEthPriceLoading || networkStatus === NetworkStatus.loading
        };
      }
    }
  }, [currencyAmount, data === null || data === void 0 || (_data$token2 = data.token) === null || _data$token2 === void 0 || (_data$token2 = _data$token2.project) === null || _data$token2 === void 0 ? void 0 : _data$token2.markets, tokenEthPrice, isTokenEthPriceLoading, networkStatus, stablecoinPrice]);
}

export { useUSDPrice };
