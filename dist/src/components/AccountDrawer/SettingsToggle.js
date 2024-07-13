import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column } from '../Column/index.js';
import Row from '../Row/index.js';
import Toggle from '../Toggle/index.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var StyledColumn = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  margin-right: 10px;\n"])));
function SettingsToggle(_ref) {
  var title = _ref.title,
    description = _ref.description,
    dataid = _ref.dataid,
    isActive = _ref.isActive,
    toggle = _ref.toggle;
  return /*#__PURE__*/React__default.createElement(Row, {
    align: "center"
  }, /*#__PURE__*/React__default.createElement(StyledColumn, null, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "neutral1"
  }, title)), description && /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2",
    lineHeight: "16px"
  }, description))), /*#__PURE__*/React__default.createElement(Toggle, {
    id: dataid,
    isActive: isActive,
    toggle: toggle
  }));
}

export { SettingsToggle };
