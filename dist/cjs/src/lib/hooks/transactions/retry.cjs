'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _createClass = require('@babel/runtime/helpers/createClass');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
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
function wait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
function waitRandom(min, max) {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}

/** Thrown if the function is canceled before resolving. */
var CanceledError = /*#__PURE__*/function (_Error) {
  function CanceledError() {
    var _this2;
    _classCallCheck__default["default"](this, CanceledError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _callSuper(this, CanceledError, [].concat(args));
    _defineProperty__default["default"](_this2, "name", "CanceledError");
    _defineProperty__default["default"](_this2, "message", "Retryable was canceled");
    return _this2;
  }
  _inherits__default["default"](CanceledError, _Error);
  return _createClass__default["default"](CanceledError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));

/** May be thrown to force a retry. */
var RetryableError = /*#__PURE__*/function (_Error2) {
  function RetryableError() {
    var _this3;
    _classCallCheck__default["default"](this, RetryableError);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _callSuper(this, RetryableError, [].concat(args));
    _defineProperty__default["default"](_this3, "name", "RetryableError");
    return _this3;
  }
  _inherits__default["default"](RetryableError, _Error2);
  return _createClass__default["default"](RetryableError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));
/**
 * Retries a function until its returned promise successfully resolves, up to n times.
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
function retry(fn, _ref) {
  var n = _ref.n,
    minWait = _ref.minWait,
    maxWait = _ref.maxWait;
  var completed = false;
  var rejectCancelled;
  // eslint-disable-next-line no-async-promise-executor
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(resolve, reject) {
      var result;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            rejectCancelled = reject;
            // eslint-disable-next-line no-constant-condition
          case 1:
            result = void 0;
            _context.prev = 3;
            _context.next = 6;
            return fn();
          case 6:
            result = _context.sent;
            if (!completed) {
              resolve(result);
              completed = true;
            }
            return _context.abrupt("break", 24);
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            if (!completed) {
              _context.next = 15;
              break;
            }
            return _context.abrupt("break", 24);
          case 15:
            if (!(n <= 0 || !(_context.t0 instanceof RetryableError))) {
              _context.next = 19;
              break;
            }
            reject(_context.t0);
            completed = true;
            return _context.abrupt("break", 24);
          case 19:
            n--;
          case 20:
            _context.next = 22;
            return waitRandom(minWait, maxWait);
          case 22:
            _context.next = 1;
            break;
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 11]]);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  return {
    promise: promise,
    cancel: function cancel() {
      if (completed) return;
      completed = true;
      rejectCancelled(new CanceledError());
    }
  };
}

exports.CanceledError = CanceledError;
exports.RetryableError = RetryableError;
exports.retry = retry;
