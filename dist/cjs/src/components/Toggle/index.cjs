'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var polished = require('polished');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled__default["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background: ", ";\n  border: ", ";\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  outline: none;\n  padding: 4px;\n  width: fit-content;\n"])), function (_ref) {
  var isActive = _ref.isActive,
    theme = _ref.theme;
  return isActive ? theme.accent2 : "transparent";
}, function (_ref2) {
  var theme = _ref2.theme,
    isActive = _ref2.isActive;
  return isActive ? "1px solid transparent" : "1px solid ".concat(theme.surface3);
});
var turnOnToggle = styled.keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  from {\n    margin-left: 0em;\n    margin-right: 2.2em;\n  }\n  to {\n    margin-left: 2.2em;\n    margin-right: 0em;\n  }\n"])));
var turnOffToggle = styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  from {\n    margin-left: 2.2em;\n    margin-right: 0em;\n  }\n  to {\n    margin-left: 0em;\n    margin-right: 2.2em;\n  }\n"])));
var ToggleElementHoverStyle = function ToggleElementHoverStyle(hasBgColor, theme, isActive) {
  return hasBgColor ? {
    opacity: "0.8"
  } : {
    background: isActive ? polished.darken(0.05, theme.accent1) : polished.darken(0.05, theme.surface3),
    color: isActive ? theme.white : theme.neutral3
  };
};
var ToggleElement = styled__default["default"].span(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  animation: 0.1s\n    ", "\n    ease-in;\n  background: ", ";\n  border-radius: 50%;\n  height: 24px;\n  :hover {\n    ", "\n  }\n  margin-left: ", ";\n  margin-right: ", ";\n  width: 24px;\n"])), function (_ref3) {
  var isActive = _ref3.isActive,
    isInitialToggleLoad = _ref3.isInitialToggleLoad;
  return isInitialToggleLoad ? "none" : isActive ? turnOnToggle : turnOffToggle;
}, function (_ref4) {
  var theme = _ref4.theme,
    bgColor = _ref4.bgColor,
    isActive = _ref4.isActive;
  return isActive ? bgColor !== null && bgColor !== void 0 ? bgColor : theme.accent1 : bgColor ? theme.surface3 : theme.neutral3;
}, function (_ref5) {
  var bgColor = _ref5.bgColor,
    theme = _ref5.theme,
    isActive = _ref5.isActive;
  return ToggleElementHoverStyle(!!bgColor, theme, isActive);
}, function (_ref6) {
  var isActive = _ref6.isActive;
  return isActive && "2.2em";
}, function (_ref7) {
  var isActive = _ref7.isActive;
  return !isActive && "2.2em";
});
function Toggle(_ref8) {
  var id = _ref8.id,
    bgColor = _ref8.bgColor,
    isActive = _ref8.isActive,
    toggle = _ref8.toggle;
  var _useState = React.useState(true),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isInitialToggleLoad = _useState2[0],
    setIsInitialToggleLoad = _useState2[1];
  var switchToggle = function switchToggle() {
    toggle();
    if (isInitialToggleLoad) setIsInitialToggleLoad(false);
  };
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    id: id,
    "data-testid": id,
    role: "option",
    "aria-selected": isActive,
    isActive: isActive,
    onClick: switchToggle
  }, /*#__PURE__*/React__default["default"].createElement(ToggleElement, {
    isActive: isActive,
    bgColor: bgColor,
    isInitialToggleLoad: isInitialToggleLoad
  }));
}

module.exports = Toggle;
