'use strict';

var sdkCore = require('@uniswap/sdk-core');
var smartOrderRouter = require('@uniswap/smart-order-router');
var index = require('./index-620446e3.cjs');
var JSBI = require('jsbi');
var routerSdk = require('@uniswap/router-sdk');
var v3Sdk = require('@uniswap/v3-sdk');
require('react');
require('@reach/dialog/styles.css');
require('@web3-react/coinbase-wallet');
require('@web3-react/core');
require('@web3-react/gnosis-safe');
require('@web3-react/metamask');
require('@web3-react/network');
require('@web3-react/types');
require('ua-parser-js');
require('@ethersproject/providers');
require('@ethersproject/properties');
require('@reduxjs/toolkit');
require('ms');
require('@web3-react/walletconnect-v2');
require('@babel/runtime/helpers/extends');
require('@uniswap/analytics');
require('jotai/utils');
require('inter-ui');
require('polyfill-object.fromentries');
require('@juggle/resize-observer');
require('array.prototype.flat');
require('array.prototype.flatmap');
require('buffer');
require('@sentry/react');
require('@sentry/tracing');
require('@uniswap/analytics-events');
require('@reduxjs/toolkit/query/react');
require('redux-persist');
require('@uniswap/redux-multicall');
require('tiny-invariant');
require('statsig-react');
require('@ethersproject/address');
require('@ethersproject/constants');
require('@ethersproject/contracts');
require('localforage');
require('@uniswap/token-lists');
require('@uniswap/uniswapx-sdk');
require('@ethersproject/bignumber');
require('@uniswap/v2-sdk');
require('@uniswap/permit2-sdk');
require('react-redux');
require('uuid');
require('@apollo/client');
require('@apollo/client/utilities');
require('react-query');
require('rebass/styled-components');
require('styled-components');
require('jotai');
require('react-feather');
require('copy-to-clipboard');
require('react-router-dom');
require('rebass');
require('@ethersproject/bytes');
require('@ethersproject/strings');
require('qs');
require('polished');
require('@vanilla-extract/css');
require('@vanilla-extract/sprinkles');
require('zustand/middleware');
require('zustand/shallow');
require('zustand/traditional');
require('zustand');
require('@vanilla-extract/dynamic');
require('@ethersproject/abi');
require('@ethersproject/units');
require('video-extensions');
require('numbro');
require('@reach/dialog');
require('react-spring');
require('react-use-gesture');
require('use-resize-observer');
require('@reach/portal');
require('react-popper');
require('@ethersproject/hash');
require('graphql');
require('ethers/lib/utils');
require('@metamask/jazzicon');
require('cids');
require('multicodec');
require('multihashes');
require('@babel/runtime/helpers/esm/typeof');
require('clsx');
require('focus-visible');
require('react-infinite-scroll-component');
require('ethers/lib/ethers');
require('react-virtualized-auto-sizer');
require('react-window');
require('@uniswap/universal-router-sdk');
require('react-dom');
require('@looksrare/sdk');
require('@opensea/seaport-js');
require('@opensea/seaport-js/lib/constants');
require('@ethersproject/keccak256');
require('@ethersproject/random');
require('react-window-infinite-loader');
require('web-vitals');
require('d3');
require('jpeg-js');
require('png-ts');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

// from routing-api (https://github.com/Uniswap/routing-api/blob/main/lib/handlers/quote/quote.ts#L243-L311)
function transformSwapRouteToGetQuoteResult(tradeType, amount, _ref) {
  let {
    quote,
    quoteGasAdjusted,
    route,
    estimatedGasUsed,
    estimatedGasUsedQuoteToken,
    estimatedGasUsedUSD,
    gasPriceWei,
    methodParameters,
    blockNumber
  } = _ref;
  const routeResponse = [];
  for (const subRoute of route) {
    const {
      amount,
      quote,
      tokenPath
    } = subRoute;
    const pools = subRoute.protocol === routerSdk.Protocol.V2 ? subRoute.route.pairs : subRoute.route.pools;
    const curRoute = [];
    for (let i = 0; i < pools.length; i++) {
      const nextPool = pools[i];
      const tokenIn = tokenPath[i];
      const tokenOut = tokenPath[i + 1];
      let edgeAmountIn = undefined;
      if (i === 0) {
        edgeAmountIn = tradeType === sdkCore.TradeType.EXACT_INPUT ? amount.quotient.toString() : quote.quotient.toString();
      }
      let edgeAmountOut = undefined;
      if (i === pools.length - 1) {
        edgeAmountOut = tradeType === sdkCore.TradeType.EXACT_INPUT ? quote.quotient.toString() : amount.quotient.toString();
      }
      if (nextPool instanceof v3Sdk.Pool) {
        curRoute.push({
          type: "v3-pool",
          tokenIn: {
            chainId: tokenIn.chainId,
            decimals: tokenIn.decimals,
            address: tokenIn.address,
            symbol: tokenIn.symbol
          },
          tokenOut: {
            chainId: tokenOut.chainId,
            decimals: tokenOut.decimals,
            address: tokenOut.address,
            symbol: tokenOut.symbol
          },
          fee: nextPool.fee.toString(),
          liquidity: nextPool.liquidity.toString(),
          sqrtRatioX96: nextPool.sqrtRatioX96.toString(),
          tickCurrent: nextPool.tickCurrent.toString(),
          amountIn: edgeAmountIn,
          amountOut: edgeAmountOut
        });
      } else {
        const reserve0 = nextPool.reserve0;
        const reserve1 = nextPool.reserve1;
        curRoute.push({
          type: "v2-pool",
          tokenIn: {
            chainId: tokenIn.chainId,
            decimals: tokenIn.decimals,
            address: tokenIn.address,
            symbol: tokenIn.symbol
          },
          tokenOut: {
            chainId: tokenOut.chainId,
            decimals: tokenOut.decimals,
            address: tokenOut.address,
            symbol: tokenOut.symbol
          },
          reserve0: {
            token: {
              chainId: reserve0.currency.wrapped.chainId,
              decimals: reserve0.currency.wrapped.decimals,
              address: reserve0.currency.wrapped.address,
              symbol: reserve0.currency.wrapped.symbol
            },
            quotient: reserve0.quotient.toString()
          },
          reserve1: {
            token: {
              chainId: reserve1.currency.wrapped.chainId,
              decimals: reserve1.currency.wrapped.decimals,
              address: reserve1.currency.wrapped.address,
              symbol: reserve1.currency.wrapped.symbol
            },
            quotient: reserve1.quotient.toString()
          },
          amountIn: edgeAmountIn,
          amountOut: edgeAmountOut
        });
      }
    }
    routeResponse.push(curRoute);
  }
  const result = {
    methodParameters,
    blockNumber: blockNumber.toString(),
    amount: amount.quotient.toString(),
    amountDecimals: amount.toExact(),
    quote: quote.quotient.toString(),
    quoteDecimals: quote.toExact(),
    quoteGasAdjusted: quoteGasAdjusted.quotient.toString(),
    quoteGasAdjustedDecimals: quoteGasAdjusted.toExact(),
    gasUseEstimateQuote: estimatedGasUsedQuoteToken.quotient.toString(),
    gasUseEstimateQuoteDecimals: estimatedGasUsedQuoteToken.toExact(),
    gasUseEstimate: estimatedGasUsed.toString(),
    gasUseEstimateUSD: estimatedGasUsedUSD.toExact(),
    gasPriceWei: gasPriceWei.toString(),
    route: routeResponse,
    routeString: smartOrderRouter.routeAmountsToString(route)
  };
  return {
    state: index.QuoteState.SUCCESS,
    data: {
      routing: index.URAQuoteType.CLASSIC,
      quote: result,
      allQuotes: []
    }
  };
}

const routers = new Map();
function getRouter(chainId) {
  const router = routers.get(chainId);
  if (router) return router;
  const supportedChainId = index.asSupportedChain(chainId);
  if (supportedChainId) {
    const provider = index.DEPRECATED_RPC_PROVIDERS[supportedChainId];
    const router = new smartOrderRouter.AlphaRouter({
      chainId,
      provider
    });
    routers.set(chainId, router);
    return router;
  }
  throw new Error(`Router does not support this chain (chainId: ${chainId}).`);
}
async function getQuote(_ref, router, routerConfig) {
  let {
    tradeType,
    tokenIn,
    tokenOut,
    amount: amountRaw
  } = _ref;
  const tokenInIsNative = Object.values(index.SwapRouterNativeAssets).includes(tokenIn.address);
  const tokenOutIsNative = Object.values(index.SwapRouterNativeAssets).includes(tokenOut.address);
  const currencyIn = tokenInIsNative ? index.nativeOnChain(tokenIn.chainId) : new sdkCore.Token(tokenIn.chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol);
  const currencyOut = tokenOutIsNative ? index.nativeOnChain(tokenOut.chainId) : new sdkCore.Token(tokenOut.chainId, tokenOut.address, tokenOut.decimals, tokenOut.symbol);
  const baseCurrency = tradeType === sdkCore.TradeType.EXACT_INPUT ? currencyIn : currencyOut;
  const quoteCurrency = tradeType === sdkCore.TradeType.EXACT_INPUT ? currencyOut : currencyIn;
  const amount = sdkCore.CurrencyAmount.fromRawAmount(baseCurrency, JSBI__default["default"].BigInt(amountRaw));
  // TODO (WEB-2055): explore initializing client side routing on first load (when amountRaw is null) if there are enough users using client-side router preference.
  const swapRoute = await router.route(amount, quoteCurrency, tradeType, /*swapConfig=*/undefined, routerConfig);
  if (!swapRoute) {
    return {
      state: index.QuoteState.NOT_FOUND
    };
  }
  return transformSwapRouteToGetQuoteResult(tradeType, amount, swapRoute);
}
async function getClientSideQuote(_ref2, router, config) {
  let {
    tokenInAddress,
    tokenInChainId,
    tokenInDecimals,
    tokenInSymbol,
    tokenOutAddress,
    tokenOutChainId,
    tokenOutDecimals,
    tokenOutSymbol,
    amount,
    tradeType
  } = _ref2;
  return getQuote({
    tradeType,
    tokenIn: {
      address: tokenInAddress,
      chainId: tokenInChainId,
      decimals: tokenInDecimals,
      symbol: tokenInSymbol
    },
    tokenOut: {
      address: tokenOutAddress,
      chainId: tokenOutChainId,
      decimals: tokenOutDecimals,
      symbol: tokenOutSymbol
    },
    amount
  }, router, config);
}

exports.getClientSideQuote = getClientSideQuote;
exports.getRouter = getRouter;
