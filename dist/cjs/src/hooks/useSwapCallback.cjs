'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var React = require('react');
var types$1 = require('../state/routing/types.cjs');
var utils = require('../state/routing/utils.cjs');
var hooks$1 = require('../state/signatures/hooks.cjs');
var hooks = require('../state/transactions/hooks.cjs');
var types = require('../state/transactions/types.cjs');
var currencyId = require('../utils/currencyId.cjs');
var useTransactionDeadline = require('./useTransactionDeadline.cjs');
var useUniswapXSwapCallback = require('./useUniswapXSwapCallback.cjs');
var useUniversalRouter = require('./useUniversalRouter.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  var addTransaction = hooks.useTransactionAdder();
  var addOrder = hooks$1.useAddOrder();
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var uniswapXSwapCallback = useUniswapXSwapCallback.useUniswapXSwapCallback({
    trade: utils.isUniswapXTrade(trade) ? trade : undefined,
    allowedSlippage: allowedSlippage,
    fiatValues: fiatValues
  });
  var universalRouterSwapCallback = useUniversalRouter.useUniversalRouterSwapCallback(utils.isClassicTrade(trade) ? trade : undefined, fiatValues, {
    slippageTolerance: allowedSlippage,
    deadline: deadline,
    permit: permitSignature
  });
  var swapCallback = utils.isUniswapXTrade(trade) ? uniswapXSwapCallback : universalRouterSwapCallback;
  return React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    var result, swapInfo;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
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
            type: types.TransactionType.SWAP,
            inputCurrencyId: currencyId.currencyId(trade.inputAmount.currency),
            outputCurrencyId: currencyId.currencyId(trade.outputAmount.currency),
            isUniswapXOrder: result.type === types$1.TradeFillType.UniswapX
          }, trade.tradeType === sdkCore.TradeType.EXACT_INPUT ? {
            tradeType: sdkCore.TradeType.EXACT_INPUT,
            inputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
            expectedOutputCurrencyAmountRaw: trade.postTaxOutputAmount.quotient.toString(),
            minimumOutputCurrencyAmountRaw: trade.minimumAmountOut(allowedSlippage).quotient.toString()
          } : {
            tradeType: sdkCore.TradeType.EXACT_OUTPUT,
            maximumInputCurrencyAmountRaw: trade.maximumAmountIn(allowedSlippage).quotient.toString(),
            outputCurrencyAmountRaw: trade.postTaxOutputAmount.quotient.toString(),
            expectedInputCurrencyAmountRaw: trade.inputAmount.quotient.toString()
          });
          if (result.type === types$1.TradeFillType.UniswapX) {
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

exports.useSwapCallback = useSwapCallback;
