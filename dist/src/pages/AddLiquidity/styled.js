import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { AutoColumn } from '../../components/Column/index.js';
import { Input as MemoizedInput } from '../../components/NumericalInput/index.js';
import styled from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  padding: 26px 16px;\n"])));
var ScrollablePage = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: ", ";\n  position: relative;\n  display: flex;\n  flex-direction: column;\n\n  ", ";\n\n  @media only screen and (max-width: ", ") {\n    padding: 48px 8px 0px;\n  }\n\n  @media only screen and (max-width: ", ") {\n    padding-top: 20px;\n  }\n"])), function (_ref) {
  var _ref$noPadding = _ref.noPadding,
    noPadding = _ref$noPadding === void 0 ? false : _ref$noPadding;
  return noPadding ? "0px" : "20px 8px 0px";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    margin: 0 auto;\n  "])));
}, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var DynamicSection = styled(AutoColumn)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  opacity: ", ";\n  pointer-events: ", ";\n"])), function (_ref5) {
  var disabled = _ref5.disabled;
  return disabled ? "0.2" : "1";
}, function (_ref6) {
  var disabled = _ref6.disabled;
  return disabled ? "none" : "initial";
});
var StyledInput = styled(MemoizedInput)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  text-align: left;\n  font-size: 18px;\n  width: 100%;\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.surface1;
});

/* two-column layout where DepositAmount is moved at the very end on mobile. */
var ResponsiveTwoColumns = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding-top: 20px;\n\n  border-top: 1px solid ", ";\n\n  ", ";\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface3;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    margin-top: 0;\n  "])));
});
var MediumOnly = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  ", ";\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    display: none;\n  "])));
});

export { DynamicSection, MediumOnly, ResponsiveTwoColumns, ScrollablePage, StyledInput, Wrapper };
