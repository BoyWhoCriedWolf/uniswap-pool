'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var core = require('@web3-react/core');
var React = require('react');
var useBag = require('./useBag.cjs');
var useSendTransaction = require('./useSendTransaction.cjs');
var useTransactionResponse = require('./useTransactionResponse.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function usePurchaseAssets() {
  var _useWeb3React = core.useWeb3React(),
    provider = _useWeb3React.provider;
  var sendTransaction = useSendTransaction.useSendTransaction(function (state) {
    return state.sendTransaction;
  });
  var setTransactionResponse = useTransactionResponse.useTransactionResponse(function (state) {
    return state.setTransactionResponse;
  });
  var _useBag = useBag.useBag(function (_ref) {
      var setLocked = _ref.setLocked,
        setBagExpanded = _ref.setBagExpanded,
        reset = _ref.reset;
      return {
        setLocked: setLocked,
        setBagExpanded: setBagExpanded,
        reset: reset
      };
    }),
    setBagLocked = _useBag.setLocked,
    setBagExpanded = _useBag.setBagExpanded,
    resetBag = _useBag.reset;
  return React.useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(routingData, assetsToBuy) {
      var purchasingWithErc20,
        purchaseResponse,
        _args = arguments;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            purchasingWithErc20 = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            if (provider) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            _context.next = 5;
            return sendTransaction(provider.getSigner(), assetsToBuy, routingData, purchasingWithErc20);
          case 5:
            purchaseResponse = _context.sent;
            if (purchaseResponse) {
              setBagLocked(false);
              setTransactionResponse(purchaseResponse);
              setBagExpanded({
                bagExpanded: false
              });
              resetBag();
            }
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [provider, resetBag, sendTransaction, setBagExpanded, setBagLocked, setTransactionResponse]);
}

exports.usePurchaseAssets = usePurchaseAssets;
