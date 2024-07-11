import { TradeType, Token, CurrencyAmount } from '@uniswap/sdk-core';
import { routeAmountsToString, AlphaRouter } from '@uniswap/smart-order-router';
import { bg as QuoteState, bh as URAQuoteType, bi as asSupportedChain, bj as DEPRECATED_RPC_PROVIDERS, bk as SwapRouterNativeAssets, bl as nativeOnChain } from './index-c9e94b5e.js';
import JSBI from 'jsbi';
import { Protocol } from '@uniswap/router-sdk';
import { Pool } from '@uniswap/v3-sdk';
import 'react';
import '@reach/dialog/styles.css';
import '@web3-react/coinbase-wallet';
import '@web3-react/core';
import '@web3-react/gnosis-safe';
import '@web3-react/metamask';
import '@web3-react/network';
import '@web3-react/types';
import 'ua-parser-js';
import '@ethersproject/providers';
import '@ethersproject/properties';
import '@reduxjs/toolkit';
import 'ms';
import '@web3-react/walletconnect-v2';
import '@babel/runtime/helpers/extends';
import '@uniswap/analytics';
import 'jotai/utils';
import 'inter-ui';
import 'polyfill-object.fromentries';
import '@juggle/resize-observer';
import 'array.prototype.flat';
import 'array.prototype.flatmap';
import 'buffer';
import '@sentry/react';
import '@sentry/tracing';
import '@uniswap/analytics-events';
import '@reduxjs/toolkit/query/react';
import 'redux-persist';
import '@uniswap/redux-multicall';
import 'tiny-invariant';
import 'statsig-react';
import '@ethersproject/address';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import 'localforage';
import '@uniswap/token-lists';
import '@uniswap/uniswapx-sdk';
import '@ethersproject/bignumber';
import '@uniswap/v2-sdk';
import '@uniswap/permit2-sdk';
import 'react-redux';
import 'uuid';
import '@apollo/client';
import '@apollo/client/utilities';
import 'react-query';
import 'rebass/styled-components';
import 'styled-components';
import 'jotai';
import 'react-feather';
import 'copy-to-clipboard';
import 'react-router-dom';
import 'rebass';
import '@ethersproject/bytes';
import '@ethersproject/strings';
import 'qs';
import 'polished';
import '@vanilla-extract/css';
import '@vanilla-extract/sprinkles';
import 'zustand/middleware';
import 'zustand/shallow';
import 'zustand/traditional';
import 'zustand';
import '@vanilla-extract/dynamic';
import '@ethersproject/abi';
import '@ethersproject/units';
import 'video-extensions';
import 'numbro';
import '@reach/dialog';
import 'react-spring';
import 'react-use-gesture';
import 'use-resize-observer';
import '@reach/portal';
import 'react-popper';
import '@ethersproject/hash';
import 'graphql';
import 'ethers/lib/utils';
import '@metamask/jazzicon';
import 'cids';
import 'multicodec';
import 'multihashes';
import '@babel/runtime/helpers/esm/typeof';
import 'clsx';
import 'focus-visible';
import 'react-infinite-scroll-component';
import 'ethers/lib/ethers';
import 'react-virtualized-auto-sizer';
import 'react-window';
import '@uniswap/universal-router-sdk';
import 'react-dom';
import '@looksrare/sdk';
import '@opensea/seaport-js';
import '@opensea/seaport-js/lib/constants';
import '@ethersproject/keccak256';
import '@ethersproject/random';
import 'react-window-infinite-loader';
import 'web-vitals';
import 'd3';
import 'jpeg-js';
import 'png-ts';

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
    const pools = subRoute.protocol === Protocol.V2 ? subRoute.route.pairs : subRoute.route.pools;
    const curRoute = [];
    for (let i = 0; i < pools.length; i++) {
      const nextPool = pools[i];
      const tokenIn = tokenPath[i];
      const tokenOut = tokenPath[i + 1];
      let edgeAmountIn = undefined;
      if (i === 0) {
        edgeAmountIn = tradeType === TradeType.EXACT_INPUT ? amount.quotient.toString() : quote.quotient.toString();
      }
      let edgeAmountOut = undefined;
      if (i === pools.length - 1) {
        edgeAmountOut = tradeType === TradeType.EXACT_INPUT ? quote.quotient.toString() : amount.quotient.toString();
      }
      if (nextPool instanceof Pool) {
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
    routeString: routeAmountsToString(route)
  };
  return {
    state: QuoteState.SUCCESS,
    data: {
      routing: URAQuoteType.CLASSIC,
      quote: result,
      allQuotes: []
    }
  };
}

const routers = new Map();
function getRouter(chainId) {
  const router = routers.get(chainId);
  if (router) return router;
  const supportedChainId = asSupportedChain(chainId);
  if (supportedChainId) {
    const provider = DEPRECATED_RPC_PROVIDERS[supportedChainId];
    const router = new AlphaRouter({
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
  const tokenInIsNative = Object.values(SwapRouterNativeAssets).includes(tokenIn.address);
  const tokenOutIsNative = Object.values(SwapRouterNativeAssets).includes(tokenOut.address);
  const currencyIn = tokenInIsNative ? nativeOnChain(tokenIn.chainId) : new Token(tokenIn.chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol);
  const currencyOut = tokenOutIsNative ? nativeOnChain(tokenOut.chainId) : new Token(tokenOut.chainId, tokenOut.address, tokenOut.decimals, tokenOut.symbol);
  const baseCurrency = tradeType === TradeType.EXACT_INPUT ? currencyIn : currencyOut;
  const quoteCurrency = tradeType === TradeType.EXACT_INPUT ? currencyOut : currencyIn;
  const amount = CurrencyAmount.fromRawAmount(baseCurrency, JSBI.BigInt(amountRaw));
  // TODO (WEB-2055): explore initializing client side routing on first load (when amountRaw is null) if there are enough users using client-side router preference.
  const swapRoute = await router.route(amount, quoteCurrency, tradeType, /*swapConfig=*/undefined, routerConfig);
  if (!swapRoute) {
    return {
      state: QuoteState.NOT_FOUND
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

export { getClientSideQuote, getRouter };
