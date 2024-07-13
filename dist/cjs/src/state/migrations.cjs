'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var reduxPersist = require('redux-persist');
var _0 = require('./migrations/0.cjs');
var legacy = require('./migrations/legacy.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

/**
 * These run once per state re-hydration when a version mismatch is detected.
 * Keep them as lightweight as possible.
 *
 * Migration functions should not assume that any value exists in localStorage previously,
 * because a user may be visiting the site for the first time or have cleared their localStorage.
 */

// The target version number is the key
var migrations = {
  0: _0.migration0
};

// We use a custom migration function for the initial state, because redux-persist
// skips migration if there is no initial state, but we want to migrate
// previous persisted state from redux-localstorage-simple.
function customCreateMigrate(migrations, options) {
  var defaultMigrate = reduxPersist.createMigrate(migrations, options);
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(state, currentVersion) {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(state === undefined)) {
              _context.next = 4;
              break;
            }
            _context.next = 3;
            return legacy.legacyLocalStorageMigration();
          case 3:
            state = _context.sent;
          case 4:
            return _context.abrupt("return", defaultMigrate(state, currentVersion));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

exports.customCreateMigrate = customCreateMigrate;
exports.migrations = migrations;
