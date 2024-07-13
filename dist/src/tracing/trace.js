import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import * as Sentry from '@sentry/react';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Modify this type if you want to add any Trace tags.

// These methods are provided as an abstraction so that users will not interact with Sentry directly.
// This avoids tightly coupling Sentry to our instrumentation outside of this file, in case we swap services.
/**
 * Sets up TraceCallbackOptions for a Span (NB: Transaction extends Span).
 * @returns a handler which will run a TraceCallback and propagate its result.
 */
function traceSpan(span) {
  var traceChild = function traceChild(name, callback, metadata) {
    var child = span === null || span === void 0 ? void 0 : span.startChild(_objectSpread(_objectSpread({}, metadata), {}, {
      op: name
    }));
    return traceSpan(child)(callback);
  };
  var setTraceData = function setTraceData(key, value) {
    span === null || span === void 0 || span.setData(key, value);
  };
  var setTraceTag = function setTraceTag(key, value) {
    span === null || span === void 0 || span.setTag(key, value);
  };
  var setTraceStatus = function setTraceStatus(status) {
    if (typeof status === "number") {
      span === null || span === void 0 || span.setHttpStatus(status);
    } else {
      span === null || span === void 0 || span.setStatus(status);
    }
  };
  var setTraceError = function setTraceError(error) {
    span === null || span === void 0 || span.setData("error", error);
  };
  return /*#__PURE__*/function () {
    var _boundTrace = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(callback) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return callback({
              traceChild: traceChild,
              setTraceData: setTraceData,
              setTraceTag: setTraceTag,
              setTraceStatus: setTraceStatus,
              setTraceError: setTraceError
            });
          case 3:
            return _context.abrupt("return", _context.sent);
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            // Do not overwrite any custom status or error data that was already set.
            if (!(span !== null && span !== void 0 && span.status)) span === null || span === void 0 || span.setStatus("internal_error");
            if (!(span !== null && span !== void 0 && span.data.error)) span === null || span === void 0 || span.setData("error", _context.t0);
            throw _context.t0;
          case 11:
            _context.prev = 11;
            // If no status was reported, assume that it was 'ok'. Otherwise, it will default to 'unknown'.
            if (!(span !== null && span !== void 0 && span.status)) span === null || span === void 0 || span.setStatus("ok");
            span === null || span === void 0 || span.finish();
            return _context.finish(11);
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6, 11, 15]]);
    }));
    function boundTrace(_x) {
      return _boundTrace.apply(this, arguments);
    }
    return boundTrace;
  }();
}

/**
 * Traces the callback, adding any metadata to the trace.
 * @param name - The name of your trace.
 * @param callback - The callback to trace. The trace will run for the duration of the callback.
 * @param metadata - Any data or tags to include in the trace.
 */
function trace(_x2, _x3, _x4) {
  return _trace.apply(this, arguments);
}
function _trace() {
  _trace = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(name, callback, metadata) {
    var transaction;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          transaction = Sentry.startTransaction({
            name: name,
            data: metadata === null || metadata === void 0 ? void 0 : metadata.data,
            tags: metadata === null || metadata === void 0 ? void 0 : metadata.tags
          });
          return _context2.abrupt("return", traceSpan(transaction)(callback));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _trace.apply(this, arguments);
}

export { trace };
