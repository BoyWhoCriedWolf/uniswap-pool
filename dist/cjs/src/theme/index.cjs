'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var cssStringFromTheme = require('../nft/css/cssStringFromTheme.cjs');
var React = require('react');
var styled = require('styled-components');
var ThemeToggle = require('./components/ThemeToggle.cjs');
var sprinkles_css = require('../nft/css/sprinkles.css.cjs');
var colors = require('./colors.cjs');
var deprecatedColors = require('./deprecatedColors.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _templateObject, _templateObject2;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MEDIA_WIDTHS = {
  deprecated_upToExtraSmall: 500,
  deprecated_upToSmall: 720,
  deprecated_upToMedium: 960,
  deprecated_upToLarge: 1280
};
var MAX_CONTENT_WIDTH = "1200px";
var deprecated_mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(function (acc, size) {
  acc[size] = function (a, b, c) {
    return styled.css(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n    @media (max-width: ", "px) {\n      ", "\n    }\n  "])), MEDIA_WIDTHS[size], styled.css(a, b, c));
  };
  return acc;
}, {});
var BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920
};

// deprecated - please use the ones in styles.ts file
var transitions = {
  duration: {
    slow: "500ms",
    medium: "250ms",
    fast: "125ms"
  },
  timing: {
    ease: "ease",
    "in": "ease-in",
    out: "ease-out",
    inOut: "ease-in-out"
  }
};
var opacities = {
  hover: 0.6,
  click: 0.4,
  disabled: 0.5,
  enabled: 1
};
var fonts = {
  code: "courier, courier new, serif"
};
var gapValues = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "24px",
  xl: "32px"
};
function getSettings(darkMode) {
  return {
    grids: gapValues,
    fonts: fonts,
    // shadows
    shadow1: darkMode ? "#000" : "#2F80ED",
    // media queries
    deprecated_mediaWidth: deprecated_mediaWidthTemplates,
    navHeight: sprinkles_css.navDimensions.height,
    navVerticalPad: sprinkles_css.navDimensions.verticalPad,
    mobileBottomBarHeight: 48,
    maxWidth: MAX_CONTENT_WIDTH,
    // deprecated - please use hardcoded exported values instead of
    // adding to the theme object
    breakpoint: BREAKPOINTS,
    transition: transitions,
    opacity: opacities
  };
}

// eslint-disable-next-line import/no-unused-modules -- used in styled.d.ts
function getTheme(darkMode) {
  return _objectSpread(_objectSpread(_objectSpread({
    darkMode: darkMode
  }, darkMode ? colors.darkTheme : colors.lightTheme), darkMode ? deprecatedColors.darkDeprecatedTheme : deprecatedColors.lightDeprecatedTheme), getSettings(darkMode));
}
function ThemeProvider(_ref) {
  var children = _ref.children;
  var darkMode = ThemeToggle.useIsDarkMode() || true;
  var themeObject = React.useMemo(function () {
    return getTheme(darkMode);
  }, [darkMode]);
  return /*#__PURE__*/React__default["default"].createElement(styled.ThemeProvider, {
    theme: themeObject
  }, children);
}
var ThemedGlobalStyle = styled.createGlobalStyle(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  html {\n    color: ", ";\n    background-color: ", " !important;\n  }\n\n summary::-webkit-details-marker {\n    display:none;\n  }\n\n  a {\n    color: ", "; \n  }\n\n  :root {\n    ", "\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.background;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.accent1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return cssStringFromTheme.rootCssString(theme.darkMode);
});

exports.BREAKPOINTS = BREAKPOINTS;
exports.MEDIA_WIDTHS = MEDIA_WIDTHS;
exports.ThemedGlobalStyle = ThemedGlobalStyle;
exports["default"] = ThemeProvider;
exports.getTheme = getTheme;
