'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../components/Column/index.cjs');
var index$1 = require('../../components/Row/index.cjs');
var index$3 = require('../../components/SwitchLocaleLink/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var PageWrapper = styled__default["default"](index.AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 68px 8px 0px;\n  max-width: 870px;\n  width: 100%;\n\n  @media (max-width: ", ") {\n    max-width: 800px;\n    padding-top: 48px;\n  }\n\n  @media (max-width: ", ") {\n    max-width: 500px;\n    padding-top: 20px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var TitleRow = styled__default["default"](index$1.RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  @media (max-width: ", ") {\n    flex-wrap: wrap;\n    gap: 12px;\n    width: 100%;\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
}, function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var ErrorContainer = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin: auto;\n  max-width: 300px;\n  min-height: 25vh;\n"])));
var IconStyle = styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.5rem;\n"])));
var NetworkIcon = styled__default["default"](reactFeather.AlertTriangle)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), IconStyle);
var MainContentWrapper = styled__default["default"].main(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border: 1px solid ", ";\n  padding: 0;\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
});
function WrongNetworkCard() {
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(PageWrapper, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "lg",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "lg",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React__default["default"].createElement(TitleRow, {
    padding: "0"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LargeHeader, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "lQfOr9",
    message: "Pools"
  }))), /*#__PURE__*/React__default["default"].createElement(MainContentWrapper, null, /*#__PURE__*/React__default["default"].createElement(ErrorContainer, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    color: theme.neutral3,
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(NetworkIcon, {
    strokeWidth: 1.2
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    "data-testid": "pools-unsupported-err"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "nFZR3H",
    message: "Your connected network is unsupported."
  })))))))), /*#__PURE__*/React__default["default"].createElement(index$3.SwitchLocaleLink, null));
}

module.exports = WrongNetworkCard;
