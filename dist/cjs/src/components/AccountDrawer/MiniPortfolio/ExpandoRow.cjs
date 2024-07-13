'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../node_modules/@lingui/core/dist/index.cjs');
var index$1 = require('../../Column/index.cjs');
var index = require('../../Row/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var ExpandIcon = styled__default["default"](reactFeather.ChevronDown)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  transform: ", ";\n  transition: transform ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var $expanded = _ref2.$expanded;
  return $expanded ? "rotate(180deg)" : "rotate(0deg)";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.transition.duration.medium;
});
var ToggleButton = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 12px;\n  padding: 4px 8px 4px 12px;\n  height: 100%;\n  width: fit-content;\n  cursor: pointer;\n  :hover {\n    opacity: 0.8;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
});
var Wrapper = styled__default["default"](index$1.Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: ", ";\n  transition: ", ";\n  overflow: hidden;\n"])), function (_ref5) {
  var numItems = _ref5.numItems,
    isExpanded = _ref5.isExpanded;
  return isExpanded ? numItems * 68 + "px" : 0;
}, function (_ref6) {
  var theme = _ref6.theme;
  return "height ".concat(theme.transition.duration.medium, " ease-in-out");
});

// TODO(WEB-1982): Replace this component to use `components/Expand` under the hood

function ExpandoRow(_ref7) {
  var _ref7$title = _ref7.title,
    title = _ref7$title === void 0 ? index$2.i18n._(
    /*i18n*/
    {
      id: "D+zLDD",
      message: "Hidden"
    }) : _ref7$title,
    numItems = _ref7.numItems,
    isExpanded = _ref7.isExpanded,
    toggle = _ref7.toggle,
    children = _ref7.children;
  if (numItems === 0) return null;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index["default"], {
    align: "center",
    justify: "space-between",
    padding: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    color: "neutral2",
    variant: "subheadSmall"
  }, "".concat(title, " (").concat(numItems, ")")), /*#__PURE__*/React__default["default"].createElement(ToggleButton, {
    align: "center",
    onClick: toggle
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "neutral2",
    variant: "buttonLabelSmall"
  }, isExpanded ? index$2.i18n._(
  /*i18n*/
  {
    id: "vLyv1R",
    message: "Hide"
  }) : index$2.i18n._(
  /*i18n*/
  {
    id: "8vETh9",
    message: "Show"
  })), /*#__PURE__*/React__default["default"].createElement(ExpandIcon, {
    $expanded: isExpanded
  }))), /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    numItems: numItems,
    isExpanded: isExpanded
  }, children));
}

exports.ExpandoRow = ExpandoRow;
