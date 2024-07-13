'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var locales = require('../constants/locales.cjs');
var React = require('react');
var index = require('../state/index.cjs');
var hooks = require('../state/user/hooks.cjs');
var useParsedQueryString = require('./useParsedQueryString.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var _ref, _ref2, _parseLocale2;

/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param maybeSupportedLocale the fuzzy locale identifier
 */
function parseLocale(maybeSupportedLocale) {
  if (typeof maybeSupportedLocale !== "string") return undefined;
  var lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
  return locales.SUPPORTED_LOCALES.find(function (locale) {
    return locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split("-")[0] === lowerMaybeSupportedLocale;
  });
}

/**
 * Returns the supported locale read from the user agent (navigator)
 */
function navigatorLocale() {
  if (!navigator.language) return undefined;
  var _navigator$language$s = navigator.language.split("-"),
    _navigator$language$s2 = _slicedToArray__default["default"](_navigator$language$s, 2),
    language = _navigator$language$s2[0],
    region = _navigator$language$s2[1];
  if (region) {
    var _parseLocale;
    return (_parseLocale = parseLocale("".concat(language, "-").concat(region.toUpperCase()))) !== null && _parseLocale !== void 0 ? _parseLocale : parseLocale(language);
  }
  return parseLocale(language);
}
function storeLocale() {
  var _store$getState$user$;
  return (_store$getState$user$ = index["default"].getState().user.userLocale) !== null && _store$getState$user$ !== void 0 ? _store$getState$user$ : undefined;
}
var initialLocale = (_ref = (_ref2 = (_parseLocale2 = parseLocale(useParsedQueryString.parsedQueryString().lng)) !== null && _parseLocale2 !== void 0 ? _parseLocale2 : storeLocale()) !== null && _ref2 !== void 0 ? _ref2 : navigatorLocale()) !== null && _ref !== void 0 ? _ref : locales.DEFAULT_LOCALE;
function useUrlLocale() {
  var parsed = useParsedQueryString["default"]();
  return parseLocale(parsed.lng);
}

/**
 * Returns the currently active locale, from a combination of user agent, query string, and user settings stored in redux
 * Stores the query string locale in redux (if set) to persist across sessions
 */
function useActiveLocale() {
  var urlLocale = useUrlLocale();
  var userLocale = hooks.useUserLocale();
  return React.useMemo(function () {
    var _ref3, _ref4;
    return (_ref3 = (_ref4 = urlLocale !== null && urlLocale !== void 0 ? urlLocale : userLocale) !== null && _ref4 !== void 0 ? _ref4 : navigatorLocale()) !== null && _ref3 !== void 0 ? _ref3 : locales.DEFAULT_LOCALE;
  }, [urlLocale, userLocale]);
}

exports.initialLocale = initialLocale;
exports.navigatorLocale = navigatorLocale;
exports.useActiveLocale = useActiveLocale;
