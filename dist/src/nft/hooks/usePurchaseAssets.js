import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useBag } from './useBag.js';
import { useSendTransaction } from './useSendTransaction.js';
import { useTransactionResponse } from './useTransactionResponse.js';

function usePurchaseAssets() {
  var _useWeb3React = useWeb3React(),
    provider = _useWeb3React.provider;
  var sendTransaction = useSendTransaction(function (state) {
    return state.sendTransaction;
  });
  var setTransactionResponse = useTransactionResponse(function (state) {
    return state.setTransactionResponse;
  });
  var _useBag = useBag(function (_ref) {
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
  return useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(routingData, assetsToBuy) {
      var purchasingWithErc20,
        purchaseResponse,
        _args = arguments;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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

export { usePurchaseAssets };
