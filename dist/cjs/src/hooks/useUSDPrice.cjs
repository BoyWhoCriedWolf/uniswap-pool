'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var Apollo = require('@apollo/client');
var sdkCore = require('@uniswap/sdk-core');
var tokens = require('../constants/tokens.cjs');
var typesAndHooks = require('../graphql/data/__generated__/types-and-hooks.cjs');
var util = require('../graphql/data/util.cjs');
var React = require('react');
var types = require('../state/routing/types.cjs');
var useRoutingAPITrade = require('../state/routing/useRoutingAPITrade.cjs');
var nativeTokens = require('../utils/nativeTokens.cjs');
var useStablecoinPrice = require('./useStablecoinPrice.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

// ETH amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
var ETH_AMOUNT_OUT = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, sdkCore.CurrencyAmount.fromRawAmount(tokens.nativeOnChain(sdkCore.ChainId.MAINNET), 50e18)), sdkCore.ChainId.ARBITRUM_ONE, sdkCore.CurrencyAmount.fromRawAmount(tokens.nativeOnChain(sdkCore.ChainId.ARBITRUM_ONE), 10e18)), sdkCore.ChainId.OPTIMISM, sdkCore.CurrencyAmount.fromRawAmount(tokens.nativeOnChain(sdkCore.ChainId.OPTIMISM), 10e18)), sdkCore.ChainId.POLYGON, sdkCore.CurrencyAmount.fromRawAmount(tokens.nativeOnChain(sdkCore.ChainId.POLYGON), 10000e18)), sdkCore.ChainId.CELO, sdkCore.CurrencyAmount.fromRawAmount(tokens.nativeOnChain(sdkCore.ChainId.CELO), 10e18));
function useETHPrice(currency) {
  var chainId = currency === null || currency === void 0 ? void 0 : currency.chainId;
  var isSupported = currency && util.isGqlSupportedChain(chainId);
  var amountOut = isSupported ? ETH_AMOUNT_OUT[chainId] : undefined;
  var _useRoutingAPITrade = useRoutingAPITrade.useRoutingAPITrade(!isSupported /* skip */, sdkCore.TradeType.EXACT_OUTPUT, amountOut, currency, types.INTERNAL_ROUTER_PREFERENCE_PRICE),
    trade = _useRoutingAPITrade.trade,
    state = _useRoutingAPITrade.state;
  return React.useMemo(function () {
    if (!isSupported) {
      return {
        data: undefined,
        isLoading: false
      };
    }
    if (currency !== null && currency !== void 0 && currency.wrapped.equals(tokens.nativeOnChain(chainId).wrapped)) {
      return {
        data: new sdkCore.Price(currency, currency, "1", "1"),
        isLoading: false
      };
    }
    if (!trade || state === types.TradeState.LOADING) {
      return {
        data: undefined,
        isLoading: state === types.TradeState.LOADING
      };
    }
    var _trade$routes$0$midPr = trade.routes[0].midPrice,
      numerator = _trade$routes$0$midPr.numerator,
      denominator = _trade$routes$0$midPr.denominator;
    var price = new sdkCore.Price(currency, tokens.nativeOnChain(chainId), denominator, numerator);
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
  var chain = chainId ? util.chainIdToBackendName(chainId) : undefined;

  // Use ETH-based pricing if available.
  var _useETHPrice = useETHPrice(currency),
    tokenEthPrice = _useETHPrice.data,
    isTokenEthPriceLoading = _useETHPrice.isLoading;
  var isTokenEthPriced = Boolean(tokenEthPrice || isTokenEthPriceLoading);
  var _useTokenSpotPriceQue = typesAndHooks.useTokenSpotPriceQuery({
      variables: {
        chain: chain !== null && chain !== void 0 ? chain : typesAndHooks.Chain.Ethereum,
        address: nativeTokens.getNativeTokenDBAddress(chain !== null && chain !== void 0 ? chain : typesAndHooks.Chain.Ethereum)
      },
      skip: !isTokenEthPriced,
      pollInterval: util.PollingInterval.Normal,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-first"
    }),
    data = _useTokenSpotPriceQue.data,
    networkStatus = _useTokenSpotPriceQue.networkStatus;

  // Use USDC-based pricing for chains not yet supported by backend (for ETH-based pricing).
  var stablecoinPrice = useStablecoinPrice["default"](isTokenEthPriced ? undefined : currency);
  return React.useMemo(function () {
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
          isLoading: isTokenEthPriceLoading || networkStatus === Apollo.NetworkStatus.loading
        };
      }
    }
  }, [currencyAmount, data === null || data === void 0 || (_data$token2 = data.token) === null || _data$token2 === void 0 || (_data$token2 = _data$token2.project) === null || _data$token2 === void 0 ? void 0 : _data$token2.markets, tokenEthPrice, isTokenEthPriceLoading, networkStatus, stablecoinPrice]);
}

exports.useUSDPrice = useUSDPrice;
