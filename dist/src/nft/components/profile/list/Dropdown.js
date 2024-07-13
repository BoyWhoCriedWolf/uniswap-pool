import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { Check } from 'react-feather';
import styled, { useTheme } from 'styled-components';
import '../../../../theme/components/index.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2;
var DropdownWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 4px;\n  background: ", ";\n  padding: 8px;\n  width: ", "px;\n  border-radius: 12px;\n  box-shadow: ", ";\n  border: 1px solid ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var $width = _ref2.$width;
  return $width;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_deepShadow;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
});
var DropdownRow = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n  padding: 8px;\n  cursor: pointer;\n  border-radius: 12px;\n\n  &:hover {\n    background: ", ";\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface3;
});
var Dropdown = function Dropdown(_ref6) {
  var dropDownOptions = _ref6.dropDownOptions,
    width = _ref6.width;
  var theme = useTheme();
  return /*#__PURE__*/React__default.createElement(DropdownWrapper, {
    $width: width
  }, dropDownOptions.map(function (option) {
    return /*#__PURE__*/React__default.createElement(DropdownRow, {
      key: option.displayText,
      onClick: option.onClick
    }, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
      lineHeight: "24px"
    }, option.displayText), option.isSelected && /*#__PURE__*/React__default.createElement(Check, {
      height: 20,
      width: 20,
      color: theme.accent1
    }));
  }));
};

export { Dropdown };
