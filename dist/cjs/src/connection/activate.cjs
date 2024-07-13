'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var analyticsEvents = require('@uniswap/analytics-events');
var index = require('../analytics/index.cjs');
var jotai = require('jotai');
var utils = require('jotai/utils');
var React = require('react');
var hooks = require('../state/hooks.cjs');
var reducer = require('../state/user/reducer.cjs');
var utils$1 = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var ActivationStatus = /*#__PURE__*/function (ActivationStatus) {
  ActivationStatus[ActivationStatus["PENDING"] = 0] = "PENDING";
  ActivationStatus[ActivationStatus["ERROR"] = 1] = "ERROR";
  ActivationStatus[ActivationStatus["IDLE"] = 2] = "IDLE";
  return ActivationStatus;
}({});
var IDLE_ACTIVATION_STATE = {
  status: ActivationStatus.IDLE
};
var activationStateAtom = jotai.atom(IDLE_ACTIVATION_STATE);
function useTryActivation() {
  var dispatch = hooks.useAppDispatch();
  var setActivationState = utils.useUpdateAtom(activationStateAtom);
  // const { pathname } = useLocation();
  // const currentPage = getCurrentPageFromLocation(pathname);
  var currentPage = analyticsEvents.InterfacePageName.POOL_PAGE;
  return React.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(connection, onSuccess, chainId) {
      var _connection$overrideA;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!((_connection$overrideA = connection.overrideActivate) !== null && _connection$overrideA !== void 0 && _connection$overrideA.call(connection, chainId))) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            _context.prev = 2;
            setActivationState({
              status: ActivationStatus.PENDING,
              connection: connection
            });
            console.debug("Connection activating: ".concat(connection.getName()));
            dispatch(reducer.updateSelectedWallet({
              wallet: undefined
            }));
            _context.next = 8;
            return connection.connector.activate();
          case 8:
            console.debug("Connection activated: ".concat(connection.getName()));
            dispatch(reducer.updateSelectedWallet({
              wallet: connection.type
            }));

            // Clears pending connection state
            setActivationState(IDLE_ACTIVATION_STATE);
            onSuccess();
            _context.next = 23;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            if (!utils$1.didUserReject(connection, _context.t0)) {
              _context.next = 19;
              break;
            }
            setActivationState(IDLE_ACTIVATION_STATE);
            return _context.abrupt("return");
          case 19:
            // TODO(WEB-1859): re-add special treatment for already-pending injected errors & move debug to after didUserReject() check
            console.debug("Connection failed: ".concat(connection.getName()));
            console.error(_context.t0);

            // Failed Connection events are logged here, while successful ones are logged by Web3Provider
            index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WALLET_CONNECTED, {
              result: analyticsEvents.WalletConnectionResult.FAILED,
              wallet_type: connection.getName(),
              page: currentPage,
              error: _context.t0.message
            });
            setActivationState({
              status: ActivationStatus.ERROR,
              connection: connection,
              error: _context.t0
            });
          case 23:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 14]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(), [currentPage, dispatch, setActivationState]);
}
function useCancelActivation() {
  var setActivationState = utils.useUpdateAtom(activationStateAtom);
  return React.useCallback(function () {
    return setActivationState(function (activationState) {
      var _activationState$conn, _activationState$conn2;
      if (activationState.status !== ActivationStatus.IDLE) (_activationState$conn = (_activationState$conn2 = activationState.connection.connector).deactivate) === null || _activationState$conn === void 0 || _activationState$conn.call(_activationState$conn2);
      return IDLE_ACTIVATION_STATE;
    });
  }, [setActivationState]);
}
function useActivationState() {
  var activationState = utils.useAtomValue(activationStateAtom);
  var tryActivation = useTryActivation();
  var cancelActivation = useCancelActivation();
  return {
    activationState: activationState,
    tryActivation: tryActivation,
    cancelActivation: cancelActivation
  };
}

exports.ActivationStatus = ActivationStatus;
exports.useActivationState = useActivationState;
