import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import searchIcon from '../../assets/svg/search.svg.js';
import { LoadingRows as LoadingRows$1 } from '../Loader/styled.js';
import styled from 'styled-components';
import { AutoColumn } from '../Column/index.js';
import { RowBetween } from '../Row/index.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var PaddedColumn = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 20px;\n"])));
var MenuItem = styled(RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 4px 20px;\n  height: 56px;\n  display: grid;\n  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);\n  grid-gap: 16px;\n  cursor: ", ";\n  pointer-events: ", ";\n  :hover {\n    background-color: ", ";\n  }\n  opacity: ", ";\n"])), function (_ref) {
  var disabled = _ref.disabled;
  return !disabled && "pointer";
}, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled && "none";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_hoverDefault;
}, function (_ref4) {
  var disabled = _ref4.disabled,
    selected = _ref4.selected,
    dim = _ref4.dim;
  return dim || disabled || selected ? 0.4 : 1;
});
var SearchInput = styled.input(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background: no-repeat scroll 7px 7px;\n  background-image: url(", ");\n  background-size: 20px 20px;\n  background-position: 12px center;\n  position: relative;\n  display: flex;\n  padding: 16px;\n  padding-left: 40px;\n  height: 40px;\n  align-items: center;\n  width: 100%;\n  white-space: nowrap;\n  background-color: ", ";\n  border: none;\n  outline: none;\n  border-radius: 12px;\n  color: ", ";\n  border-style: solid;\n  border: 1px solid ", ";\n  -webkit-appearance: none;\n  font-weight: 485;\n\n  font-size: 16px;\n\n  ::placeholder {\n    color: ", ";\n    font-size: 16px;\n  }\n  transition: border 100ms;\n  :focus {\n    border: 1px solid ", ";\n    background-color: ", ";\n    outline: none;\n  }\n"])), searchIcon, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface2;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral1;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.surface3;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.neutral3;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.surface3;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.surface2;
});
var Separator = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 1px;\n  background-color: ", ";\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return theme.surface3;
});
var LoadingRows = styled(LoadingRows$1)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  grid-column-gap: 0.5em;\n  grid-template-columns: repeat(12, 1fr);\n  max-width: 960px;\n  padding: 12px 20px;\n\n  & > div:nth-child(4n + 1) {\n    grid-column: 1 / 8;\n    height: 1em;\n    margin-bottom: 0.25em;\n  }\n  & > div:nth-child(4n + 2) {\n    grid-column: 12;\n    height: 1em;\n    margin-top: 0.25em;\n  }\n  & > div:nth-child(4n + 3) {\n    grid-column: 1 / 4;\n    height: 0.75em;\n  }\n"])));

export { LoadingRows, MenuItem, PaddedColumn, SearchInput, Separator };
