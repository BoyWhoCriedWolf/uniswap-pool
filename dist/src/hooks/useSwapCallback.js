import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { TradeType } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { TradeFillType } from '../state/routing/types.js';
import { isUniswapXTrade, isClassicTrade } from '../state/routing/utils.js';
import { useAddOrder } from '../state/signatures/hooks.js';
import { useTransactionAdder } from '../state/transactions/hooks.js';
import { TransactionType } from '../state/transactions/types.js';
import { currencyId } from '../utils/currencyId.js';
import useTransactionDeadline from './useTransactionDeadline.js';
import { useUniswapXSwapCallback } from './useUniswapXSwapCallback.js';
import { useUniversalRouterSwapCallback } from './useUniversalRouter.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
function useSwapCallback(trade,
// trade to execute, required
fiatValues,
// usd values for amount in and out, logged for analytics
allowedSlippage,
// in bips
permitSignature) {
  var deadline = useTransactionDeadline();
  var addTransaction = useTransactionAdder();
  var addOrder = useAddOrder();
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var uniswapXSwapCallback = useUniswapXSwapCallback({
    trade: isUniswapXTrade(trade) ? trade : undefined,
    allowedSlippage: allowedSlippage,
    fiatValues: fiatValues
  });
  var universalRouterSwapCallback = useUniversalRouterSwapCallback(isClassicTrade(trade) ? trade : undefined, fiatValues, {
    slippageTolerance: allowedSlippage,
    deadline: deadline,
    permit: permitSignature
  });
  var swapCallback = isUniswapXTrade(trade) ? uniswapXSwapCallback : universalRouterSwapCallback;
  return useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var result, swapInfo;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (trade) {
            _context.next = 2;
            break;
          }
          throw new Error("missing trade");
        case 2:
          if (!(!account || !chainId)) {
            _context.next = 4;
            break;
          }
          throw new Error("wallet must be connected to swap");
        case 4:
          _context.next = 6;
          return swapCallback();
        case 6:
          result = _context.sent;
          swapInfo = _objectSpread({
            type: TransactionType.SWAP,
            inputCurrencyId: currencyId(trade.inputAmount.currency),
            outputCurrencyId: currencyId(trade.outputAmount.currency),
            isUniswapXOrder: result.type === TradeFillType.UniswapX
          }, trade.tradeType === TradeType.EXACT_INPUT ? {
            tradeType: TradeType.EXACT_INPUT,
            inputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
            expectedOutputCurrencyAmountRaw: trade.postTaxOutputAmount.quotient.toString(),
            minimumOutputCurrencyAmountRaw: trade.minimumAmountOut(allowedSlippage).quotient.toString()
          } : {
            tradeType: TradeType.EXACT_OUTPUT,
            maximumInputCurrencyAmountRaw: trade.maximumAmountIn(allowedSlippage).quotient.toString(),
            outputCurrencyAmountRaw: trade.postTaxOutputAmount.quotient.toString(),
            expectedInputCurrencyAmountRaw: trade.inputAmount.quotient.toString()
          });
          if (result.type === TradeFillType.UniswapX) {
            addOrder(account, result.response.orderHash, chainId, result.response.deadline, swapInfo);
          } else {
            addTransaction(result.response, swapInfo, deadline === null || deadline === void 0 ? void 0 : deadline.toNumber());
          }
          return _context.abrupt("return", result);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [account, addOrder, addTransaction, allowedSlippage, chainId, deadline, swapCallback, trade]);
}

export { useSwapCallback };
