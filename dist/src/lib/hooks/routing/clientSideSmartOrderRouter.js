import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Token, TradeType, CurrencyAmount } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import { asSupportedChain } from '../../../constants/chains.js';
import { DEPRECATED_RPC_PROVIDERS } from '../../../constants/providers.js';
import { nativeOnChain } from '../../../constants/tokens.js';
import JSBI from 'jsbi';
import { QuoteState, SwapRouterNativeAssets } from '../../../state/routing/types.js';
import { transformSwapRouteToGetQuoteResult } from '../../../utils/transformSwapRouteToGetQuoteResult.js';

var routers = new Map();
function getRouter(chainId) {
  var router = routers.get(chainId);
  if (router) return router;
  var supportedChainId = asSupportedChain(chainId);
  if (supportedChainId) {
    var provider = DEPRECATED_RPC_PROVIDERS[supportedChainId];
    var _router = new AlphaRouter({
      chainId: chainId,
      provider: provider
    });
    routers.set(chainId, _router);
    return _router;
  }
  throw new Error("Router does not support this chain (chainId: ".concat(chainId, ")."));
}
function getQuote(_x, _x2, _x3) {
  return _getQuote.apply(this, arguments);
}
function _getQuote() {
  _getQuote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, router, routerConfig) {
    var tradeType, tokenIn, tokenOut, amountRaw, tokenInIsNative, tokenOutIsNative, currencyIn, currencyOut, baseCurrency, quoteCurrency, amount, swapRoute;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          tradeType = _ref.tradeType, tokenIn = _ref.tokenIn, tokenOut = _ref.tokenOut, amountRaw = _ref.amount;
          tokenInIsNative = Object.values(SwapRouterNativeAssets).includes(tokenIn.address);
          tokenOutIsNative = Object.values(SwapRouterNativeAssets).includes(tokenOut.address);
          currencyIn = tokenInIsNative ? nativeOnChain(tokenIn.chainId) : new Token(tokenIn.chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol);
          currencyOut = tokenOutIsNative ? nativeOnChain(tokenOut.chainId) : new Token(tokenOut.chainId, tokenOut.address, tokenOut.decimals, tokenOut.symbol);
          baseCurrency = tradeType === TradeType.EXACT_INPUT ? currencyIn : currencyOut;
          quoteCurrency = tradeType === TradeType.EXACT_INPUT ? currencyOut : currencyIn;
          amount = CurrencyAmount.fromRawAmount(baseCurrency, JSBI.BigInt(amountRaw)); // TODO (WEB-2055): explore initializing client side routing on first load (when amountRaw is null) if there are enough users using client-side router preference.
          _context.next = 10;
          return router.route(amount, quoteCurrency, tradeType, /*swapConfig=*/undefined, routerConfig);
        case 10:
          swapRoute = _context.sent;
          if (swapRoute) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", {
            state: QuoteState.NOT_FOUND
          });
        case 13:
          return _context.abrupt("return", transformSwapRouteToGetQuoteResult(tradeType, amount, swapRoute));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getQuote.apply(this, arguments);
}
function getClientSideQuote(_x4, _x5, _x6) {
  return _getClientSideQuote.apply(this, arguments);
}
function _getClientSideQuote() {
  _getClientSideQuote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref2, router, config) {
    var tokenInAddress, tokenInChainId, tokenInDecimals, tokenInSymbol, tokenOutAddress, tokenOutChainId, tokenOutDecimals, tokenOutSymbol, amount, tradeType;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          tokenInAddress = _ref2.tokenInAddress, tokenInChainId = _ref2.tokenInChainId, tokenInDecimals = _ref2.tokenInDecimals, tokenInSymbol = _ref2.tokenInSymbol, tokenOutAddress = _ref2.tokenOutAddress, tokenOutChainId = _ref2.tokenOutChainId, tokenOutDecimals = _ref2.tokenOutDecimals, tokenOutSymbol = _ref2.tokenOutSymbol, amount = _ref2.amount, tradeType = _ref2.tradeType;
          return _context2.abrupt("return", getQuote({
            tradeType: tradeType,
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
            amount: amount
          }, router, config));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getClientSideQuote.apply(this, arguments);
}

export { getClientSideQuote, getRouter };
