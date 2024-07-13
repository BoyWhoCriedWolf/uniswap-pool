import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Protocol } from '@uniswap/router-sdk';
import { TradeType } from '@uniswap/sdk-core';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { isUniswapXSupportedChain } from '../../constants/chains.js';
import ms from 'ms';
import { logSwapQuoteRequest } from '../../tracing/swapFlowLoggers.js';
import { trace } from '../../tracing/trace.js';
import { INTERNAL_ROUTER_PREFERENCE_PRICE, RouterPreference, QuoteState, QuoteMethod, URAQuoteType, SwapRouterNativeAssets } from './types.js';
import { shouldUseAPIRouter, isExactInput, transformRoutesToTrade } from './utils.js';

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
const UNISWAP_API_URL = "https://api.uniswap.org/v2";
const CLIENT_PARAMS = {
  protocols: [Protocol.V2, Protocol.V3, Protocol.MIXED]
};
const protocols = [Protocol.V2, Protocol.V3, Protocol.MIXED];

// routing API quote query params: https://github.com/Uniswap/routing-api/blob/main/lib/handlers/quote/schema/quote-schema.ts
const DEFAULT_QUERY_PARAMS = {
  protocols
};
function getQuoteLatencyMeasure(mark) {
  performance.mark("quote-fetch-end");
  return performance.measure("quote-fetch-latency", mark.name, "quote-fetch-end");
}
function getRoutingAPIConfig(args) {
  const {
    account,
    tradeType,
    tokenOutAddress,
    tokenInChainId,
    uniswapXForceSyntheticQuotes,
    uniswapXEthOutputEnabled,
    uniswapXExactOutputEnabled,
    routerPreference
  } = args;
  const uniswapx = {
    useSyntheticQuotes: uniswapXForceSyntheticQuotes,
    // Protocol supports swap+send to different destination address, but
    // for now recipient === swapper
    recipient: account,
    swapper: account,
    routingType: URAQuoteType.DUTCH_LIMIT
  };
  const classic = {
    ...DEFAULT_QUERY_PARAMS,
    routingType: URAQuoteType.CLASSIC
  };
  const tokenOutIsNative = Object.values(SwapRouterNativeAssets).includes(tokenOutAddress);

  // UniswapX doesn't support native out, exact-out, or non-mainnet trades (yet),
  // so even if the user has selected UniswapX as their router preference, force them to receive a Classic quote.
  if (
  // If the user has opted out of UniswapX during the opt-out transition period, we should respect that preference and only request classic quotes.
  args.userOptedOutOfUniswapX && routerPreference !== RouterPreference.X || tokenOutIsNative && !uniswapXEthOutputEnabled || !uniswapXExactOutputEnabled && tradeType === TradeType.EXACT_OUTPUT || !isUniswapXSupportedChain(tokenInChainId) || routerPreference === INTERNAL_ROUTER_PREFERENCE_PRICE) {
    return [classic];
  }
  return [uniswapx, classic];
}
const routingApi = createApi({
  reducerPath: "routingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: UNISWAP_API_URL
  }),
  endpoints: build => ({
    getQuote: build.query({
      async onQueryStarted(args, _ref) {
        let {
          queryFulfilled
        } = _ref;
        trace("quote", async _ref2 => {
          let {
            setTraceError,
            setTraceStatus
          } = _ref2;
          try {
            await queryFulfilled;
          } catch (error) {
            if (error && typeof error === "object" && "error" in error) {
              const queryError = error.error;
              if (typeof queryError.status === "number") {
                setTraceStatus(queryError.status);
              }
              setTraceError(queryError);
            } else {
              throw error;
            }
          }
        }, {
          data: {
            ...args,
            isPrice: args.routerPreference === INTERNAL_ROUTER_PREFERENCE_PRICE,
            isAutoRouter: args.routerPreference === RouterPreference.API
          }
        });
      },
      async queryFn(args, _api, _extraOptions, fetch) {
        let fellBack = false;
        logSwapQuoteRequest(args.tokenInChainId, args.routerPreference, false);
        const quoteStartMark = performance.mark(`quote-fetch-start-${Date.now()}`);
        if (shouldUseAPIRouter(args)) {
          fellBack = true;
          try {
            const {
              tokenInAddress,
              tokenInChainId,
              tokenOutAddress,
              tokenOutChainId,
              amount,
              tradeType
            } = args;
            const type = isExactInput(tradeType) ? "EXACT_INPUT" : "EXACT_OUTPUT";
            const requestBody = {
              tokenInChainId,
              tokenIn: tokenInAddress,
              tokenOutChainId,
              tokenOut: tokenOutAddress,
              amount,
              type,
              intent: args.routerPreference === INTERNAL_ROUTER_PREFERENCE_PRICE ? "pricing" : undefined,
              configs: getRoutingAPIConfig(args)
            };
            const response = await fetch({
              method: "POST",
              url: "/quote",
              body: JSON.stringify(requestBody)
            });
            if (response.error) {
              try {
                // cast as any here because we do a runtime check on it being an object before indexing into .errorCode
                const errorData = response.error.data;
                // NO_ROUTE should be treated as a valid response to prevent retries.
                if (typeof errorData === "object" && (errorData?.errorCode === "NO_ROUTE" || errorData?.detail === "No quotes available")) {
                  sendAnalyticsEvent("No quote received from routing API", {
                    requestBody,
                    response,
                    routerPreference: args.routerPreference
                  });
                  return {
                    data: {
                      state: QuoteState.NOT_FOUND,
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    }
                  };
                }
              } catch {
                throw response.error;
              }
            }
            const uraQuoteResponse = response.data;
            const tradeResult = await transformRoutesToTrade(args, uraQuoteResponse, QuoteMethod.ROUTING_API);
            return {
              data: {
                ...tradeResult,
                latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
              }
            };
          } catch (error) {
            console.warn(`GetQuote failed on Unified Routing API, falling back to client: ${error?.message ?? error?.detail ?? error}`);
          }
        }
        try {
          const method = fellBack ? QuoteMethod.CLIENT_SIDE_FALLBACK : QuoteMethod.CLIENT_SIDE;
          const {
            getRouter,
            getClientSideQuote
          } = await import('../../lib/hooks/routing/clientSideSmartOrderRouter.js');
          const router = getRouter(args.tokenInChainId);
          const quoteResult = await getClientSideQuote(args, router, CLIENT_PARAMS);
          if (quoteResult.state === QuoteState.SUCCESS) {
            const trade = await transformRoutesToTrade(args, quoteResult.data, method);
            return {
              data: {
                ...trade,
                latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
              }
            };
          } else {
            return {
              data: {
                ...quoteResult,
                latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
              }
            };
          }
        } catch (error) {
          console.warn(`GetQuote failed on client: ${error}`);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error?.detail ?? error?.message ?? error
            }
          };
        }
      },
      keepUnusedDataFor: ms(`10s`),
      extraOptions: {
        maxRetries: 0
      }
    })
  })
});
const {
  useGetQuoteQuery
} = routingApi;
const useGetQuoteQueryState = routingApi.endpoints.getQuote.useQueryState;

export { routingApi, useGetQuoteQuery, useGetQuoteQueryState };
