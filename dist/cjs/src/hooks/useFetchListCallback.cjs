'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var toolkit = require('@reduxjs/toolkit');
var sdkCore = require('@uniswap/sdk-core');
var providers = require('../constants/providers.cjs');
var fallbackProvider = require('../featureFlags/flags/fallbackProvider.cjs');
var fetchTokenList = require('../lib/hooks/useTokenList/fetchTokenList.cjs');
var resolveENSContentHash = require('../lib/utils/resolveENSContentHash.cjs');
var React = require('react');
var hooks = require('../state/hooks.cjs');
var actions = require('../state/lists/actions.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function useFetchListCallback() {
  var dispatch = hooks.useAppDispatch();
  var providers$1 = fallbackProvider.useFallbackProviderEnabled() ? providers.RPC_PROVIDERS : providers.DEPRECATED_RPC_PROVIDERS;
  return React.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(listUrl, skipValidation) {
      var requestId;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            requestId = toolkit.nanoid();
            dispatch(actions.fetchTokenList.pending({
              requestId: requestId,
              url: listUrl
            }));
            return _context.abrupt("return", fetchTokenList(listUrl, function (ensName) {
              return resolveENSContentHash(ensName, providers$1[sdkCore.ChainId.MAINNET]);
            }, skipValidation).then(function (tokenList) {
              dispatch(actions.fetchTokenList.fulfilled({
                url: listUrl,
                tokenList: tokenList,
                requestId: requestId
              }));
              return tokenList;
            })["catch"](function (error) {
              console.debug("Failed to get list at url ".concat(listUrl), error);
              dispatch(actions.fetchTokenList.rejected({
                url: listUrl,
                requestId: requestId,
                errorMessage: error.message
              }));
              throw error;
            }));
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), [dispatch, providers$1]);
}

exports.useFetchListCallback = useFetchListCallback;
