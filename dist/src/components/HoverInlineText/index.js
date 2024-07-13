import React__default, { useState } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import Tooltip from '../Tooltip/index.js';
import styled from 'styled-components';

var _excluded = ["text", "maxCharacters", "margin", "adjustSize", "fontSize", "textColor", "link"];
var _templateObject;
var TextWrapper = styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-left: ", ";\n  font-size: ", ";\n\n  @media screen and (max-width: 600px) {\n    font-size: ", ";\n  }\n"])), function (_ref) {
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
    rest = _objectWithoutProperties(_ref4, _excluded);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showHover = _useState2[0],
    setShowHover = _useState2[1];
  if (!text) {
    return /*#__PURE__*/React__default.createElement("span", null);
  }
  if (text.length > maxCharacters) {
    return /*#__PURE__*/React__default.createElement(Tooltip, {
      text: text,
      show: showHover
    }, /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
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
  return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
    margin: margin,
    adjustSize: adjustSize,
    link: link,
    fontSize: fontSize,
    textColor: textColor
  }, rest), text);
};

export { HoverInlineText as default };
