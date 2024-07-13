import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import ms from 'ms';
import { logSwapQuoteRequest } from '../../tracing/swapFlowLoggers.js';
import { trace } from '../../tracing/trace.js';
import { RouterPreference, QuoteState } from './types.js';
import { isExactInput, transformQuickRouteToTrade } from './utils.js';

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
const UNISWAP_API_URL = "https://api.uniswap.org/v2";
function getQuoteLatencyMeasure(mark) {
  performance.mark("quickroute-fetch-end");
  return performance.measure("quickroute-fetch-latency", mark.name, "quickroute-fetch-end");
}
const quickRouteApi = createApi({
  reducerPath: "quickRouteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: UNISWAP_API_URL
  }),
  endpoints: build => ({
    getQuickRoute: build.query({
      async onQueryStarted(args, _ref) {
        let {
          queryFulfilled
        } = _ref;
        trace("quickroute", async _ref2 => {
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
            ...args
          }
        });
      },
      async queryFn(args, _api, _extraOptions, fetch) {
        logSwapQuoteRequest(args.tokenInChainId, RouterPreference.API, true);
        const quoteStartMark = performance.mark(`quickroute-fetch-start-${Date.now()}`);
        const {
          tokenInAddress,
          tokenInChainId,
          tokenOutAddress,
          tokenOutChainId,
          amount,
          tradeType
        } = args;
        const type = isExactInput(tradeType) ? "EXACT_IN" : "EXACT_OUT";
        const requestBody = {
          tokenInChainId,
          tokenInAddress,
          tokenOutChainId,
          tokenOutAddress,
          amount,
          tradeType: type
        };
        const response = await fetch({
          method: "GET",
          url: "/quickroute",
          params: requestBody
        });
        if (response.error) {
          // cast as any here because we do a runtime check on it being an object before indexing into .errorCode
          const errorData = response.error.data;
          // NO_ROUTE should be treated as a valid response to prevent retries.
          if (typeof errorData === "object" && (errorData?.errorCode === "NO_ROUTE" || errorData?.detail === "No quotes available")) {
            sendAnalyticsEvent("No quote received from quickroute API", {
              requestBody,
              response
            });
            return {
              data: {
                state: QuoteState.NOT_FOUND,
                latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
              }
            };
          } else {
            return {
              error: response.error
            };
          }
        }
        const quickRouteResponse = response.data;
        const previewTrade = transformQuickRouteToTrade(args, quickRouteResponse);
        return {
          data: {
            state: QuoteState.SUCCESS,
            trade: previewTrade,
            latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
          }
        };
      },
      keepUnusedDataFor: ms(`10s`),
      extraOptions: {
        maxRetries: 0
      }
    })
  })
});
const {
  useGetQuickRouteQuery
} = quickRouteApi;
const useGetQuickRouteQueryState = quickRouteApi.endpoints.getQuickRoute.useQueryState;

export { quickRouteApi, useGetQuickRouteQuery, useGetQuickRouteQueryState };
