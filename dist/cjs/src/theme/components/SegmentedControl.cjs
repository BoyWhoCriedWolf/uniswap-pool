'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../components/Row/index.cjs');
var styled = require('styled-components');
require('./index.cjs');
var text = require('./text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var SegmentWrapper = styled__default["default"](index.AutoRow)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n\n  cursor: pointer;\n\n  border-radius: 12px;\n  padding: 6px;\n  color: ", ";\n  gap: 4px;\n\n  ", ";\n\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  transition: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var theme = _ref2.theme,
    active = _ref2.active;
  return active && styled.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n      background-color: ", ";\n      color: ", ";\n    "])), theme.accent2, function (_ref3) {
    var theme = _ref3.theme;
    return theme.accent1;
  });
}, function (_ref4) {
  var theme = _ref4.theme,
    active = _ref4.active;
  return active ? theme.surface3 : theme.surface2;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease);
});
function Segment(_ref7) {
  var active = _ref7.active,
    value = _ref7.value,
    Icon = _ref7.Icon,
    onSelect = _ref7.onSelect,
    testId = _ref7.testId,
    children = _ref7.children;
  return /*#__PURE__*/React__default["default"].createElement(SegmentWrapper, {
    active: active,
    onClick: function onClick() {
      return onSelect === null || onSelect === void 0 ? void 0 : onSelect(value);
    },
    "data-testid": testId
  }, Icon && /*#__PURE__*/React__default["default"].createElement(Icon, {
    size: 20,
    stroke: "currentColor"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    color: "currentColor"
  }, children));
}
var SegmentedControlWrapper = styled__default["default"](index["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 16px;\n  gap: 4px;\n  padding: 4px;\n  outline: 1px solid ", ";\n  outline-offset: -1px;\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface3;
});
function SegmentedControl(_ref9) {
  var selected = _ref9.selected,
    onSelect = _ref9.onSelect,
    children = _ref9.children;
  return /*#__PURE__*/React__default["default"].createElement(SegmentedControlWrapper, null, children.map(function (segment, index) {
    var _segment$props$onSele, _segment$props$active;
    if ((segment === null || segment === void 0 ? void 0 : segment.type) != Segment) {
      console.warn("<SegmentedControl> children must be of type <Segment>");
      return null;
    }
    return /*#__PURE__*/React__default["default"].createElement(Segment, _extends__default["default"]({}, segment.props, {
      onSelect: (_segment$props$onSele = segment.props.onSelect) !== null && _segment$props$onSele !== void 0 ? _segment$props$onSele : onSelect,
      active: (_segment$props$active = segment.props.active) !== null && _segment$props$active !== void 0 ? _segment$props$active : segment.props.value === selected,
      key: "segment ".concat(index)
    }));
  }));
}

exports.Segment = Segment;
exports.SegmentedControl = SegmentedControl;
