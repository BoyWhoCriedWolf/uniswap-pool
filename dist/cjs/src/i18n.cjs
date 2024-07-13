'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var locales = require('./constants/locales.cjs');
var useActiveLocale = require('./hooks/useActiveLocale.cjs');
var i18n = require('./lib/i18n.cjs');
var hooks = require('./state/user/hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

i18n.dynamicActivate(useActiveLocale.initialLocale);
function LanguageProvider(_ref) {
  var children = _ref.children;
  // const locale = useActiveLocale();
  var locale = locales.DEFAULT_LOCALE;
  var _useUserLocaleManager = hooks.useUserLocaleManager(),
    _useUserLocaleManager2 = _slicedToArray__default["default"](_useUserLocaleManager, 2),
    setUserLocale = _useUserLocaleManager2[1];
  var onActivate = React.useCallback(function (locale) {
    document.documentElement.setAttribute("lang", locale);
    setUserLocale(locale); // stores the selected locale to persist across sessions
  }, [setUserLocale]);
  return /*#__PURE__*/React__default["default"].createElement(i18n.Provider, {
    locale: locale,
    onActivate: onActivate
  }, children);
}

exports.LanguageProvider = LanguageProvider;
