import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { WARNING_LEVEL } from '../../constants/tokenSafety.js';
import { AlertTriangle, Slash } from 'react-feather';
import styled, { css } from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var WarningContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-left: 4px;\n  display: flex;\n  justify-content: center;\n"])));
var WarningIconStyle = css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n"])), function (_ref) {
  var size = _ref.size;
  return size !== null && size !== void 0 ? size : "1em";
}, function (_ref2) {
  var size = _ref2.size;
  return size !== null && size !== void 0 ? size : "1em";
});
var WarningIcon = styled(AlertTriangle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", ";\n  color: ", ";\n"])), WarningIconStyle, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral3;
});
var BlockedIcon = styled(Slash)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", "\n  color: ", ";\n"])), WarningIconStyle, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral2;
});
function TokenSafetyIcon(_ref5) {
  var warning = _ref5.warning;
  switch (warning === null || warning === void 0 ? void 0 : warning.level) {
    case WARNING_LEVEL.BLOCKED:
      return /*#__PURE__*/React__default.createElement(WarningContainer, null, /*#__PURE__*/React__default.createElement(BlockedIcon, {
        "data-cy": "blocked-icon",
        strokeWidth: 2.5
      }));
    case WARNING_LEVEL.UNKNOWN:
      return /*#__PURE__*/React__default.createElement(WarningContainer, null, /*#__PURE__*/React__default.createElement(WarningIcon, null));
    default:
      return null;
  }
}

export { BlockedIcon, TokenSafetyIcon as default };
