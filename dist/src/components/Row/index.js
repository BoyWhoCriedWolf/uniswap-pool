import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
// TODO(WEB-1983):
// Setting `width: 100%` by default prevents composability in complex flex layouts.
// Same applies to `RowFixed` and its negative margins. This component needs to be
// further investigated and improved to make UI work easier.
var Row = styled(Box)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: ", ";\n  display: flex;\n  padding: 0;\n  align-items: ", ";\n  justify-content: ", ";\n  padding: ", ";\n  border: ", ";\n  border-radius: ", ";\n  gap: ", ";\n"])), function (_ref) {
  var width = _ref.width;
  return width !== null && width !== void 0 ? width : "100%";
}, function (_ref2) {
  var align = _ref2.align;
  return align !== null && align !== void 0 ? align : "center";
}, function (_ref3) {
  var justify = _ref3.justify;
  return justify !== null && justify !== void 0 ? justify : "flex-start";
}, function (_ref4) {
  var padding = _ref4.padding;
  return padding;
}, function (_ref5) {
  var border = _ref5.border;
  return border;
}, function (_ref6) {
  var borderRadius = _ref6.borderRadius;
  return borderRadius;
}, function (_ref7) {
  var gap = _ref7.gap,
    theme = _ref7.theme;
  return gap && (theme.grids[gap] || gap);
});
var RowBetween = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n"])));
styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-end;\n"])));
var AutoRow = styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  flex-wrap: wrap;\n  margin: ", ";\n  justify-content: ", ";\n\n  & > * {\n    margin: ", " !important;\n  }\n"])), function (_ref8) {
  var gap = _ref8.gap;
  return gap && "-".concat(gap);
}, function (_ref9) {
  var justify = _ref9.justify;
  return justify && justify;
}, function (_ref10) {
  var gap = _ref10.gap;
  return gap;
});
var RowFixed = styled(Row)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: fit-content;\n  margin: ", ";\n"])), function (_ref11) {
  var gap = _ref11.gap;
  return gap && "-".concat(gap);
});

export { AutoRow, RowBetween, RowFixed, Row as default };
