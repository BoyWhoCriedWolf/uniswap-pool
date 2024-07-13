import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import styled from 'styled-components';

var _templateObject, _templateObject2, _templateObject3;
var Column = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  gap: ", ";\n"])), function (_ref) {
  var gap = _ref.gap,
    theme = _ref.theme;
  return gap && theme.grids[gap];
});
var ColumnCenter = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  align-items: center;\n"])));
var AutoColumn = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: grid;\n  grid-auto-rows: auto;\n  grid-row-gap: ", ";\n  justify-items: ", ";\n  flex-grow: ", ";\n"])), function (_ref2) {
  var gap = _ref2.gap,
    theme = _ref2.theme;
  return gap && theme.grids[gap] || gap;
}, function (_ref3) {
  var justify = _ref3.justify;
  return justify && justify;
}, function (_ref4) {
  var grow = _ref4.grow;
  return grow && 1;
});

export { AutoColumn, Column, ColumnCenter, Column as default };
