'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index = require('../../node_modules/@lingui/core/dist/index.cjs');
var index$1 = require('../../node_modules/@lingui/react/dist/index.cjs');
var locales = require('../constants/locales.cjs');
var enUS = require('../locales/en-US.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

// Initialize the locale immediately to DEFAULT_LOCALE/DEFAULT_MESSAGES,
// so that messages are shown while the appropriate translation load.
// This is necessary for initial macro translations (t``) to work in the DEFAULT_LOCALE.
index.i18n.load(locales.DEFAULT_LOCALE, enUS.messages);
index.i18n.activate(locales.DEFAULT_LOCALE);
function dynamicActivate(_x) {
  return _dynamicActivate.apply(this, arguments);
}
function _dynamicActivate() {
  _dynamicActivate = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(locale) {
    var catalog;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(index.i18n.locale === locale)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          _context.prev = 2;
          _context.next = 5;
          return (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })("locales/".concat(locale, ".js"));
        case 5:
          catalog = _context.sent;
          // Bundlers will either export it as default or as a named export named default.
          index.i18n.load(locale, catalog.messages || catalog["default"].messages);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error(new Error("Unable to load locale (".concat(locale, "): ").concat(_context.t0)));
        case 12:
          index.i18n.activate(locale);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _dynamicActivate.apply(this, arguments);
}
function Provider(_ref) {
  var locale = _ref.locale,
    onActivate = _ref.onActivate,
    children = _ref.children;
  React.useEffect(function () {
    dynamicActivate(locale).then(function () {
      return onActivate === null || onActivate === void 0 ? void 0 : onActivate(locale);
    })["catch"](function (error) {
      console.error("Failed to activate locale", locale, error);
    });
  }, [locale, onActivate]);
  return /*#__PURE__*/React__default["default"].createElement(index$1.I18nProvider, {
    i18n: index.i18n
  }, children);
}

exports.Provider = Provider;
exports.dynamicActivate = dynamicActivate;
