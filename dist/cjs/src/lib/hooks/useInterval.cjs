'use strict';

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

/**
 * Invokes callback repeatedly over an interval defined by the delay
 *
 * @param callback
 * @param delay if null, the callback will not be invoked
 * @param leading by default, the callback will be invoked immediately (on the leading edge);
 *                if false, the callback will not be invoked until a first delay
 */
function useInterval(callback, delay) {
  var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  React.useEffect(function () {
    if (delay === null) {
      return;
    }
    var timeout;
    tick(delay, /* skip= */!leading);
    return function () {
      if (timeout) {
        clearInterval(timeout);
      }
    };
    function tick(_x) {
      return _tick.apply(this, arguments);
    }
    function _tick() {
      _tick = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(delay) {
        var skip,
          promise,
          _args = arguments;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              skip = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              if (skip) {
                _context.next = 6;
                break;
              }
              promise = callback(); // Defer the next interval until the current callback has resolved.
              if (!promise) {
                _context.next = 6;
                break;
              }
              _context.next = 6;
              return promise;
            case 6:
              timeout = setTimeout(function () {
                return tick(delay);
              }, delay);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _tick.apply(this, arguments);
    }
  }, [callback, delay, leading]);
}

module.exports = useInterval;
