'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../components/Column/index.cjs');
var index$2 = require('../../../components/Row/index.cjs');
var media = require('./media.cjs');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
var index$1 = require('../../../theme/index.cjs');
require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var BORDER_RADIUS = "12";
var StyledDetailsRelativeContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  height: 84px;\n"])));
var StyledDetailsContainer = styled__default["default"](index.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  width: 100%;\n  padding: 16px 8px 0px;\n  justify-content: space-between;\n  gap: 8px;\n  height: 84px;\n  background: ", ";\n  will-change: transform;\n  transition: ", ";\n\n  @media screen and (max-width: ", "px) {\n    height: 112px;\n    transform: translateY(-28px);\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " transform");
}, index$1.BREAKPOINTS.sm);
var StyledActionButton = styled__default["default"](text.ThemedText.BodySmall)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  display: flex;\n  padding: 8px 0px;\n  bottom: -32px;\n  left: 8px;\n  right: 8px;\n  color: ", ";\n  background: ", ";\n  transition: ", ";\n  will-change: transform;\n  border-radius: 8px;\n  justify-content: center;\n  font-weight: 535 !important;\n  line-height: 16px;\n  visibility: hidden;\n  cursor: ", ";\n\n  @media screen and (max-width: ", "px) {\n    visibility: visible;\n    bottom: 8px;\n  }\n\n  &:before {\n    background-size: 100%;\n    border-radius: inherit;\n\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n    content: \"\";\n  }\n\n  &:hover:before {\n    background-color: ", ";\n  }\n\n  &:active:before {\n    background-color: ", ";\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme,
    isDisabled = _ref3.isDisabled;
  return isDisabled ? theme.neutral1 : theme.deprecated_accentTextLightPrimary;
}, function (_ref4) {
  var theme = _ref4.theme,
    selected = _ref4.selected,
    isDisabled = _ref4.isDisabled;
  return selected ? theme.critical : isDisabled ? theme.surface3 : theme.accent1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " bottom, ").concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " visibility");
}, function (_ref6) {
  var isDisabled = _ref6.isDisabled;
  return isDisabled ? "default" : "pointer";
}, index$1.BREAKPOINTS.sm, function (_ref7) {
  var theme = _ref7.theme,
    isDisabled = _ref7.isDisabled;
  return !isDisabled && theme.deprecated_stateOverlayHover;
}, function (_ref8) {
  var theme = _ref8.theme,
    isDisabled = _ref8.isDisabled;
  return !isDisabled && theme.deprecated_stateOverlayPressed;
});
var ActionButton = function ActionButton(_ref9) {
  var isDisabled = _ref9.isDisabled,
    isSelected = _ref9.isSelected,
    clickActionButton = _ref9.clickActionButton,
    children = _ref9.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledActionButton, {
    selected: isSelected,
    isDisabled: isDisabled,
    onClick: function onClick(e) {
      return isDisabled ? undefined : clickActionButton(e);
    }
  }, children);
};
var StyledCardContainer = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  border-radius: ", "px;\n  background-color: ", ";\n  overflow: hidden;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  isolation: isolate;\n\n  :after {\n    content: \"\";\n    position: absolute;\n    top: 0px;\n    right: 0px;\n    bottom: 0px;\n    left: 0px;\n    border: ", " solid;\n    border-radius: ", "px;\n    border-color: ", ";\n    pointer-events: none;\n    transition: ", ";\n    will-change: border;\n\n    @media screen and (max-width: ", "px) {\n      ", ";\n    }\n  }\n\n  :hover::after {\n    ", ";\n  }\n\n  :hover {\n    ", " {\n      visibility: visible;\n      bottom: 8px;\n    }\n\n    ", " {\n      height: 112px;\n      transform: translateY(-28px);\n    }\n\n    ", " {\n      transform: scale(1.15);\n    }\n  }\n"])), BORDER_RADIUS, function (_ref10) {
  var theme = _ref10.theme;
  return theme.surface1;
}, function (_ref11) {
  var selected = _ref11.selected;
  return selected ? "3px" : "1px";
}, BORDER_RADIUS, function (_ref12) {
  var theme = _ref12.theme,
    selected = _ref12.selected;
  return selected ? theme.accent1 : theme.surface3;
}, function (_ref13) {
  var theme = _ref13.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " border");
}, index$1.BREAKPOINTS.sm, function (_ref14) {
  var selected = _ref14.selected,
    theme = _ref14.theme;
  return selected && "border-color: ".concat(theme.critical);
}, function (_ref15) {
  var selected = _ref15.selected,
    theme = _ref15.theme;
  return selected && "border-color: ".concat(theme.critical);
}, StyledActionButton, StyledDetailsContainer, media.StyledImage);
var CardContainer = function CardContainer(_ref16) {
  var isSelected = _ref16.isSelected,
    isDisabled = _ref16.isDisabled,
    children = _ref16.children,
    testId = _ref16.testId,
    onClick = _ref16.onClick;
  return /*#__PURE__*/React__default["default"].createElement(StyledCardContainer, {
    selected: isSelected,
    isDisabled: isDisabled,
    draggable: false,
    "data-testid": testId,
    onClick: onClick
  }, children);
};
var StyledLink = styled__default["default"](reactRouterDom.Link)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  text-decoration: none;\n"])));
var Container = function Container(_ref17) {
  var isSelected = _ref17.isSelected,
    isDisabled = _ref17.isDisabled,
    detailsHref = _ref17.detailsHref,
    testId = _ref17.testId,
    onClick = _ref17.onClick,
    children = _ref17.children;
  return /*#__PURE__*/React__default["default"].createElement(CardContainer, {
    isSelected: isSelected,
    isDisabled: isDisabled,
    testId: testId,
    onClick: onClick
  }, detailsHref ? /*#__PURE__*/React__default["default"].createElement(StyledLink, {
    to: detailsHref
  }, children) : children);
};
var DetailsRelativeContainer = function DetailsRelativeContainer(_ref18) {
  var children = _ref18.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledDetailsRelativeContainer, null, children);
};
var DetailsContainer = function DetailsContainer(_ref19) {
  var children = _ref19.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledDetailsContainer, null, children);
};
var StyledInfoContainer = styled__default["default"](index.Column)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  gap: 4px;\n  overflow: hidden;\n  width: 100%;\n  padding: 0px 8px;\n  height: 48px;\n"])));
var InfoContainer = function InfoContainer(_ref20) {
  var children = _ref20.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledInfoContainer, null, children);
};
var StyledPrimaryRow = styled__default["default"](index$2["default"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  gap: 8px;\n  justify-content: space-between;\n"])));
var PrimaryRow = function PrimaryRow(_ref21) {
  var children = _ref21.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledPrimaryRow, null, children);
};
var StyledPrimaryDetails = styled__default["default"](index$2["default"])(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  justify-items: center;\n  overflow: hidden;\n  white-space: nowrap;\n  gap: 8px;\n"])));
var PrimaryDetails = function PrimaryDetails(_ref22) {
  var children = _ref22.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledPrimaryDetails, null, children);
};
var PrimaryInfoContainer = styled__default["default"](text.ThemedText.BodySmall)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font-weight: 535 !important;\n  line-height: 20px;\n"])));
var PrimaryInfo = function PrimaryInfo(_ref23) {
  var children = _ref23.children;
  return /*#__PURE__*/React__default["default"].createElement(PrimaryInfoContainer, null, children);
};
var StyledSecondaryRow = styled__default["default"](index$2["default"])(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n"])));
var SecondaryRow = function SecondaryRow(_ref24) {
  var children = _ref24.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledSecondaryRow, null, children);
};
var StyledSecondaryDetails = styled__default["default"](index$2["default"])(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  overflow: hidden;\n  white-space: nowrap;\n"])));
var SecondaryDetails = function SecondaryDetails(_ref25) {
  var children = _ref25.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledSecondaryDetails, null, children);
};
var SecondaryInfoContainer = styled__default["default"](text.ThemedText.BodyPrimary)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  line-height: 24px;\n"])));
var SecondaryInfo = function SecondaryInfo(_ref26) {
  var children = _ref26.children;
  return /*#__PURE__*/React__default["default"].createElement(SecondaryInfoContainer, null, children);
};

exports.ActionButton = ActionButton;
exports.Container = Container;
exports.DetailsContainer = DetailsContainer;
exports.DetailsRelativeContainer = DetailsRelativeContainer;
exports.InfoContainer = InfoContainer;
exports.PrimaryDetails = PrimaryDetails;
exports.PrimaryInfo = PrimaryInfo;
exports.PrimaryRow = PrimaryRow;
exports.SecondaryDetails = SecondaryDetails;
exports.SecondaryInfo = SecondaryInfo;
exports.SecondaryRow = SecondaryRow;
