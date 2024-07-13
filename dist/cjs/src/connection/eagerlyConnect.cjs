'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _createClass = require('@babel/runtime/helpers/createClass');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var React = require('react');
var index = require('./index.cjs');
var meta$1 = require('./meta.cjs');
var types = require('./types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }
  derived = _getPrototypeOf__default["default"](derived);
  return _possibleConstructorReturn__default["default"](_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf__default["default"](_this).constructor) : derived.apply(_this, args));
}
var FailedToConnect = /*#__PURE__*/function (_Error) {
  function FailedToConnect() {
    _classCallCheck__default["default"](this, FailedToConnect);
    return _callSuper(this, FailedToConnect, arguments);
  }
  _inherits__default["default"](FailedToConnect, _Error);
  return _createClass__default["default"](FailedToConnect);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));
var connectionReady = true;
function useConnectionReady() {
  return React.useSyncExternalStore(function (onStoreChange) {
    if (connectionReady instanceof Promise) {
      connectionReady["finally"](onStoreChange);
    }
    return function () {
      return undefined;
    };
  }, function () {
    return connectionReady === true;
  });
}
function connect(_x, _x2) {
  return _connect.apply(this, arguments);
} // The Safe connector will only work from safe.global, which iframes;
// it is only necessary to try (and to load all the deps) if we are in an iframe.
function _connect() {
  _connect = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(connector, type) {
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          performance.mark("web3:connect:".concat(type, ":start"));
          _context.prev = 1;
          if (!connector.connectEagerly) {
            _context.next = 7;
            break;
          }
          _context.next = 5;
          return connector.connectEagerly();
        case 5:
          _context.next = 9;
          break;
        case 7:
          _context.next = 9;
          return connector.activate();
        case 9:
          return _context.abrupt("return", true);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.debug("web3-react eager connection error: ".concat(_context.t0));
          return _context.abrupt("return", false);
        case 16:
          _context.prev = 16;
          performance.measure("web3:connect:".concat(type), "web3:connect:".concat(type, ":start"));
          return _context.finish(16);
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12, 16, 19]]);
  }));
  return _connect.apply(this, arguments);
}
if (window !== window.parent) {
  connect(index.gnosisSafeConnection.connector, types.ConnectionType.GNOSIS_SAFE);
}
connect(index.deprecatedNetworkConnection.connector, types.ConnectionType.DEPRECATED_NETWORK);

// Get the persisted wallet type from the last session.
var meta = meta$1.getPersistedConnectionMeta();
if (meta !== null && meta !== void 0 && meta.type) {
  var selectedConnection = index.getConnection(meta.type);
  if (selectedConnection) {
    connectionReady = connect(selectedConnection.connector, meta.type).then(function (connected) {
      if (!connected) throw new FailedToConnect();
    })["catch"](function (error) {
      // Clear the persisted wallet type if it failed to connect.
      meta$1.deletePersistedConnectionMeta();
      // Log it if it threw an unknown error.
      if (!(error instanceof FailedToConnect)) {
        console.error(error);
      }
    })["finally"](function () {
      connectionReady = true;
    });
  }
}

exports.useConnectionReady = useConnectionReady;
