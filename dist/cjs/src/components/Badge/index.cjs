'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var polished = require('polished');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var BadgeVariant = /*#__PURE__*/function (BadgeVariant) {
  BadgeVariant["DEFAULT"] = "DEFAULT";
  BadgeVariant["NEGATIVE"] = "NEGATIVE";
  BadgeVariant["POSITIVE"] = "POSITIVE";
  BadgeVariant["PRIMARY"] = "PRIMARY";
  BadgeVariant["WARNING"] = "WARNING";
  BadgeVariant["PROMOTIONAL"] = "PROMOTIONAL";
  BadgeVariant["BRANDED"] = "BRANDED";
  BadgeVariant["SOFT"] = "SOFT";
  BadgeVariant["WARNING_OUTLINE"] = "WARNING_OUTLINE";
  return BadgeVariant;
}({});
function pickBackgroundColor(variant, theme) {
  switch (variant) {
    case BadgeVariant.BRANDED:
      return theme.brandedGradient;
    case BadgeVariant.PROMOTIONAL:
      return theme.promotionalGradient;
    case BadgeVariant.NEGATIVE:
      return theme.critical;
    case BadgeVariant.POSITIVE:
      return theme.success;
    case BadgeVariant.SOFT:
      return theme.accent2;
    case BadgeVariant.PRIMARY:
      return theme.accent1;
    case BadgeVariant.WARNING:
      return theme.deprecated_accentWarning;
    case BadgeVariant.WARNING_OUTLINE:
      return "transparent";
    default:
      return theme.surface2;
  }
}
function pickBorder(variant, theme) {
  switch (variant) {
    case BadgeVariant.WARNING_OUTLINE:
      return "1px solid ".concat(theme.deprecated_accentWarning);
    default:
      return "unset";
  }
}
function pickFontColor(variant, theme) {
  switch (variant) {
    case BadgeVariant.BRANDED:
      return theme.darkMode ? theme.neutral1 : theme.white;
    case BadgeVariant.NEGATIVE:
      return polished.readableColor(theme.critical);
    case BadgeVariant.POSITIVE:
      return polished.readableColor(theme.success);
    case BadgeVariant.SOFT:
      return theme.accent1;
    case BadgeVariant.WARNING:
      return polished.readableColor(theme.deprecated_accentWarning);
    case BadgeVariant.WARNING_OUTLINE:
      return theme.deprecated_accentWarning;
    default:
      return polished.readableColor(theme.neutral2);
  }
}
var Badge = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background: ", ";\n  border: ", ";\n  border-radius: 0.5rem;\n  color: ", ";\n  display: inline-flex;\n  padding: 4px 6px;\n  justify-content: center;\n  font-weight: 535;\n"])), function (_ref) {
  var theme = _ref.theme,
    variant = _ref.variant;
  return pickBackgroundColor(variant, theme);
}, function (_ref2) {
  var theme = _ref2.theme,
    variant = _ref2.variant;
  return pickBorder(variant, theme);
}, function (_ref3) {
  var theme = _ref3.theme,
    variant = _ref3.variant;
  return pickFontColor(variant, theme);
});

exports.BadgeVariant = BadgeVariant;
exports["default"] = Badge;
