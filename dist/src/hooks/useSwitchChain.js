import _typeof from '@babel/runtime/helpers/typeof';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { ChainId } from '@uniswap/sdk-core';
import { walletConnectV2Connection, uniwalletWCV2ConnectConnection, networkConnection, deprecatedNetworkConnection } from '../connection/index.js';
import { getChainInfo } from '../constants/chainInfo.js';
import { isSupportedChain } from '../constants/chains.js';
import { FALLBACK_URLS, RPC_URLS } from '../constants/networks.js';
import { useCallback } from 'react';
import { useAppDispatch } from '../state/hooks.js';
import { endSwitchingChain, startSwitchingChain } from '../state/wallets/reducer.js';

function getRpcUrl(chainId) {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.GOERLI:
    case ChainId.SEPOLIA:
      return RPC_URLS[chainId][0];
    // Attempting to add a chain using an infura URL will not work, as the URL will be unreachable from the MetaMask background page.
    // MetaMask allows switching to any publicly reachable URL, but for novel chains, it will display a warning if it is not on the "Safe" list.
    // See the definition of FALLBACK_URLS for more details.
    default:
      return FALLBACK_URLS[chainId][0];
  }
}
function useSwitchChain() {
  var dispatch = useAppDispatch();
  return useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(connector, chainId) {
      var info, addChainParameter;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (isSupportedChain(chainId)) {
              _context.next = 4;
              break;
            }
            throw new Error("Chain ".concat(chainId, " not supported for connector (").concat(_typeof(connector), ")"));
          case 4:
            dispatch(startSwitchingChain(chainId));
            _context.prev = 5;
            if (![walletConnectV2Connection.connector, uniwalletWCV2ConnectConnection.connector, networkConnection.connector, deprecatedNetworkConnection.connector].includes(connector)) {
              _context.next = 11;
              break;
            }
            _context.next = 9;
            return connector.activate(chainId);
          case 9:
            _context.next = 15;
            break;
          case 11:
            info = getChainInfo(chainId);
            addChainParameter = {
              chainId: chainId,
              chainName: info.label,
              rpcUrls: [getRpcUrl(chainId)],
              nativeCurrency: info.nativeCurrency,
              blockExplorerUrls: [info.explorer]
            };
            _context.next = 15;
            return connector.activate(addChainParameter);
          case 15:
            _context.next = 28;
            break;
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](5);
            _context.prev = 19;
            _context.next = 22;
            return connector.activate();
          case 22:
            _context.next = 27;
            break;
          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](19);
            console.error("Failed to re-activate connector", _context.t1);
          case 27:
            throw _context.t0;
          case 28:
            _context.prev = 28;
            dispatch(endSwitchingChain());
            return _context.finish(28);
          case 31:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[5, 17, 28, 31], [19, 24]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), [dispatch]);
}

export { useSwitchChain };
