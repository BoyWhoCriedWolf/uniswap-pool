'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../Tooltip/index.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["text", "maxCharacters", "margin", "adjustSize", "fontSize", "textColor", "link"];
var _templateObject;
var TextWrapper = styled__default["default"].span(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin-left: ", ";\n  font-size: ", ";\n\n  @media screen and (max-width: 600px) {\n    font-size: ", ";\n  }\n"])), function (_ref) {
  var margin = _ref.margin;
  return margin && "4px";
}, function (_ref2) {
  var fontSize = _ref2.fontSize;
  return fontSize !== null && fontSize !== void 0 ? fontSize : "inherit";
}, function (_ref3) {
  var adjustSize = _ref3.adjustSize;
  return adjustSize && "12px";
});
var HoverInlineText = function HoverInlineText(_ref4) {
  var text = _ref4.text,
    _ref4$maxCharacters = _ref4.maxCharacters,
    maxCharacters = _ref4$maxCharacters === void 0 ? 20 : _ref4$maxCharacters,
    _ref4$margin = _ref4.margin,
    margin = _ref4$margin === void 0 ? false : _ref4$margin,
    _ref4$adjustSize = _ref4.adjustSize,
    adjustSize = _ref4$adjustSize === void 0 ? false : _ref4$adjustSize,
    fontSize = _ref4.fontSize,
    textColor = _ref4.textColor,
    link = _ref4.link,
    rest = _objectWithoutProperties__default["default"](_ref4, _excluded);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showHover = _useState2[0],
    setShowHover = _useState2[1];
  if (!text) {
    return /*#__PURE__*/React__default["default"].createElement("span", null);
  }
  if (text.length > maxCharacters) {
    return /*#__PURE__*/React__default["default"].createElement(index["default"], {
      text: text,
      show: showHover
    }, /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
      onMouseEnter: function onMouseEnter() {
        return setShowHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowHover(false);
      },
      margin: margin,
      adjustSize: adjustSize,
      textColor: textColor,
      link: link,
      fontSize: fontSize
    }, rest), " " + text.slice(0, maxCharacters - 1) + "..."));
  }
  return /*#__PURE__*/React__default["default"].createElement(TextWrapper, _extends__default["default"]({
    margin: margin,
    adjustSize: adjustSize,
    link: link,
    fontSize: fontSize,
    textColor: textColor
  }, rest), text);
};

module.exports = HoverInlineText;
