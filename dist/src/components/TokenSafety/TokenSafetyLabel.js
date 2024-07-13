import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { useTokenWarningTextColor, useTokenWarningColor } from '../../hooks/useTokenWarningColor.js';
import { AlertTriangle, Slash } from 'react-feather';
import { Text } from 'rebass';
import styled from 'styled-components';

var _templateObject, _templateObject2;
var Label = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 4px 4px;\n  font-size: 12px;\n  background-color: ", ";\n  border-radius: 8px;\n  color: ", ";\n  display: inline-flex;\n  align-items: center;\n"])), function (_ref) {
  var backgroundColor = _ref.backgroundColor;
  return backgroundColor;
}, function (_ref2) {
  var color = _ref2.color;
  return color;
});
var Title = styled(Text)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-right: 5px;\n  font-weight: 535;\n  font-size: 12px;\n"])));
function TokenSafetyLabel(_ref3) {
  var level = _ref3.level,
    canProceed = _ref3.canProceed,
    children = _ref3.children;
  return /*#__PURE__*/React__default.createElement(Label, {
    color: useTokenWarningTextColor(level),
    backgroundColor: useTokenWarningColor(level)
  }, /*#__PURE__*/React__default.createElement(Title, {
    marginRight: "5px"
  }, children), canProceed ? /*#__PURE__*/React__default.createElement(AlertTriangle, {
    strokeWidth: 2.5,
    size: "14px"
  }) : /*#__PURE__*/React__default.createElement(Slash, {
    strokeWidth: 2.5,
    size: "14px"
  }));
}

export { TokenSafetyLabel as default };
