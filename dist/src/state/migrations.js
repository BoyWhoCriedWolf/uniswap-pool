import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { createMigrate } from 'redux-persist';
import { migration0 } from './migrations/0.js';
import { legacyLocalStorageMigration } from './migrations/legacy.js';

/**
 * These run once per state re-hydration when a version mismatch is detected.
 * Keep them as lightweight as possible.
 *
 * Migration functions should not assume that any value exists in localStorage previously,
 * because a user may be visiting the site for the first time or have cleared their localStorage.
 */

// The target version number is the key
var migrations = {
  0: migration0
};

// We use a custom migration function for the initial state, because redux-persist
// skips migration if there is no initial state, but we want to migrate
// previous persisted state from redux-localstorage-simple.
function customCreateMigrate(migrations, options) {
  var defaultMigrate = createMigrate(migrations, options);
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(state, currentVersion) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(state === undefined)) {
              _context.next = 4;
              break;
            }
            _context.next = 3;
            return legacyLocalStorageMigration();
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

export { customCreateMigrate, migrations };
