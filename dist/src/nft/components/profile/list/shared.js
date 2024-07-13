import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import Row from '../../../../components/Row/index.js';
import styled from 'styled-components';

var _templateObject, _templateObject2;
var RemoveIconWrap = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 50%;\n  top: 30px;\n  transform: translateX(-50%);\n  width: 32px;\n  visibility: ", ";\n"])), function (_ref) {
  var hovered = _ref.hovered;
  return hovered ? "visible" : "hidden";
});
var TitleRow = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n  margin-bottom: 8px;\n"])));
var SetPriceMethod = /*#__PURE__*/function (SetPriceMethod) {
  SetPriceMethod[SetPriceMethod["SAME_PRICE"] = 0] = "SAME_PRICE";
  SetPriceMethod[SetPriceMethod["FLOOR_PRICE"] = 1] = "FLOOR_PRICE";
  SetPriceMethod[SetPriceMethod["LAST_PRICE"] = 2] = "LAST_PRICE";
  SetPriceMethod[SetPriceMethod["CUSTOM"] = 3] = "CUSTOM";
  return SetPriceMethod;
}({});
var WarningType = /*#__PURE__*/function (WarningType) {
  WarningType[WarningType["BELOW_FLOOR"] = 0] = "BELOW_FLOOR";
  WarningType[WarningType["ALREADY_LISTED"] = 1] = "ALREADY_LISTED";
  WarningType[WarningType["NONE"] = 2] = "NONE";
  return WarningType;
}({});

export { RemoveIconWrap, SetPriceMethod, TitleRow, WarningType };
