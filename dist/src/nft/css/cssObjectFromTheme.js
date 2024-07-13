import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { themeVars } from './sprinkles.css.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var resolveTheme = function resolveTheme(theme) {
  return typeof theme === "function" ? theme() : theme;
};
function cssObjectFromTheme(theme) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    baseTheme = _ref["extends"];
  var resolvedThemeVars = _objectSpread({}, assignInlineVars(themeVars, resolveTheme(theme)));
  if (!baseTheme) {
    return resolvedThemeVars;
  }
  var resolvedBaseThemeVars = assignInlineVars(themeVars, resolveTheme(baseTheme));
  var filteredVars = Object.fromEntries(Object.entries(resolvedThemeVars).filter(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      varName = _ref3[0],
      value = _ref3[1];
    return value !== resolvedBaseThemeVars[varName];
  }));
  return filteredVars;
}

export { cssObjectFromTheme };
