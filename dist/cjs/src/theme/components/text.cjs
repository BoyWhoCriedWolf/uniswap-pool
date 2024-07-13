'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _extends = require('@babel/runtime/helpers/extends');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var rebass = require('rebass');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["error"];
var _templateObject;
var TextWrapper = styled__default["default"](rebass.Text).withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== "color";
  }
})(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref) {
  var color = _ref.color,
    theme = _ref.theme;
  return theme[color];
});
// todo: export each component individually
var ThemedText = {
  // todo: there should be just one `Body` with default color, no need to make all variations
  BodyPrimary: function BodyPrimary(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral1"
    }, props));
  },
  BodySecondary: function BodySecondary(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral2"
    }, props));
  },
  BodySmall: function BodySmall(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 14,
      color: "neutral1"
    }, props));
  },
  HeadlineSmall: function HeadlineSmall(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 20,
      lineHeight: "28px",
      color: "neutral1"
    }, props));
  },
  HeadlineMedium: function HeadlineMedium(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 28,
      color: "neutral1"
    }, props));
  },
  HeadlineLarge: function HeadlineLarge(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 36,
      lineHeight: "44px",
      color: "neutral1"
    }, props));
  },
  LargeHeader: function LargeHeader(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 36,
      color: "neutral1"
    }, props));
  },
  Hero: function Hero(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 48,
      color: "neutral1"
    }, props));
  },
  LabelSmall: function LabelSmall(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 14,
      color: "neutral2"
    }, props));
  },
  LabelMicro: function LabelMicro(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 12,
      color: "neutral2"
    }, props));
  },
  Caption: function Caption(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 12,
      lineHeight: "16px",
      color: "neutral1"
    }, props));
  },
  Link: function Link(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 14,
      color: "accent1"
    }, props));
  },
  MediumHeader: function MediumHeader(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 20,
      color: "neutral1"
    }, props));
  },
  SubHeaderLarge: function SubHeaderLarge(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 20,
      color: "neutral1"
    }, props));
  },
  SubHeader: function SubHeader(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral1",
      lineHeight: "24px"
    }, props));
  },
  SubHeaderSmall: function SubHeaderSmall(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 14,
      color: "neutral2"
    }, props));
  },
  UtilityBadge: function UtilityBadge(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: "8px",
      lineHeight: "12px"
    }, props));
  },
  DeprecatedMain: function DeprecatedMain(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "neutral2"
    }, props));
  },
  DeprecatedLink: function DeprecatedLink(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "accent1"
    }, props));
  },
  DeprecatedLabel: function DeprecatedLabel(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "neutral1"
    }, props));
  },
  DeprecatedBlack: function DeprecatedBlack(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "neutral1"
    }, props));
  },
  DeprecatedWhite: function DeprecatedWhite(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "white"
    }, props));
  },
  DeprecatedBody: function DeprecatedBody(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral1"
    }, props));
  },
  DeprecatedLargeHeader: function DeprecatedLargeHeader(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 535,
      fontSize: 24
    }, props));
  },
  DeprecatedMediumHeader: function DeprecatedMediumHeader(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 535,
      fontSize: 20
    }, props));
  },
  DeprecatedSubHeader: function DeprecatedSubHeader(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 14
    }, props));
  },
  DeprecatedSmall: function DeprecatedSmall(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 11
    }, props));
  },
  DeprecatedBlue: function DeprecatedBlue(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "accent1"
    }, props));
  },
  DeprecatedYellow: function DeprecatedYellow(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "deprecated_yellow3"
    }, props));
  },
  DeprecatedDarkGray: function DeprecatedDarkGray(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "neutral2"
    }, props));
  },
  DeprecatedGray: function DeprecatedGray(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: "surface2"
    }, props));
  },
  DeprecatedItalic: function DeprecatedItalic(props) {
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      fontSize: 12,
      fontStyle: "italic",
      color: "neutral2"
    }, props));
  },
  DeprecatedError: function DeprecatedError(_ref2) {
    var error = _ref2.error,
      props = _objectWithoutProperties__default["default"](_ref2, _excluded);
    return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      fontWeight: 485,
      color: error ? "critical" : "neutral2"
    }, props));
  }
};

exports.ThemedText = ThemedText;
