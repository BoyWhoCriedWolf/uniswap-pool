import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import styled from 'styled-components';

var _templateObject, _templateObject2;
var ToggleWrapper = styled.button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: ", ";\n  padding: 1px;\n  background: ", ";\n  border-radius: 8px;\n  border: ", ";\n  cursor: pointer;\n  outline: none;\n"])), function (_ref) {
  var width = _ref.width;
  return width !== null && width !== void 0 ? width : "100%";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface2;
}, function (_ref3) {
  var theme = _ref3.theme;
  return "1px solid " + theme.surface3;
});
var ToggleElement = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: 4px 0.5rem;\n  border-radius: 6px;\n  justify-content: center;\n  height: 100%;\n  background: ", ";\n  color: ", ";\n  font-size: ", ";\n  font-weight: 535;\n  white-space: nowrap;\n  :hover {\n    user-select: initial;\n    color: ", ";\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme,
    isActive = _ref4.isActive;
  return isActive ? theme.surface1 : "none";
}, function (_ref5) {
  var theme = _ref5.theme,
    isActive = _ref5.isActive;
  return isActive ? theme.neutral1 : theme.neutral3;
}, function (_ref6) {
  var fontSize = _ref6.fontSize;
  return fontSize !== null && fontSize !== void 0 ? fontSize : "1rem";
}, function (_ref7) {
  var theme = _ref7.theme,
    isActive = _ref7.isActive;
  return isActive ? theme.neutral2 : theme.neutral3;
});

export { ToggleElement, ToggleWrapper };
