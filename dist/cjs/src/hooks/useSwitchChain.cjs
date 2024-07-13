'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var sdkCore = require('@uniswap/sdk-core');
var index = require('../connection/index.cjs');
var chainInfo = require('../constants/chainInfo.cjs');
var chains = require('../constants/chains.cjs');
var networks = require('../constants/networks.cjs');
var React = require('react');
var hooks = require('../state/hooks.cjs');
var reducer = require('../state/wallets/reducer.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function getRpcUrl(chainId) {
  switch (chainId) {
    case sdkCore.ChainId.MAINNET:
    case sdkCore.ChainId.GOERLI:
    case sdkCore.ChainId.SEPOLIA:
      return networks.RPC_URLS[chainId][0];
    // Attempting to add a chain using an infura URL will not work, as the URL will be unreachable from the MetaMask background page.
    // MetaMask allows switching to any publicly reachable URL, but for novel chains, it will display a warning if it is not on the "Safe" list.
    // See the definition of FALLBACK_URLS for more details.
    default:
      return networks.FALLBACK_URLS[chainId][0];
  }
}
function useSwitchChain() {
  var dispatch = hooks.useAppDispatch();
  return React.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(connector, chainId) {
      var info, addChainParameter;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (chains.isSupportedChain(chainId)) {
              _context.next = 4;
              break;
            }
            throw new Error("Chain ".concat(chainId, " not supported for connector (").concat(_typeof__default["default"](connector), ")"));
          case 4:
            dispatch(reducer.startSwitchingChain(chainId));
            _context.prev = 5;
            if (![index.walletConnectV2Connection.connector, index.uniwalletWCV2ConnectConnection.connector, index.networkConnection.connector, index.deprecatedNetworkConnection.connector].includes(connector)) {
              _context.next = 11;
              break;
            }
            _context.next = 9;
            return connector.activate(chainId);
          case 9:
            _context.next = 15;
            break;
          case 11:
            info = chainInfo.getChainInfo(chainId);
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
            dispatch(reducer.endSwitchingChain());
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

exports.useSwitchChain = useSwitchChain;
