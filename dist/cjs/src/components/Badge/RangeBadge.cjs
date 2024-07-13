'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index = require('../Tooltip/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var BadgeWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  font-size: 14px;\n  display: flex;\n  justify-content: flex-end;\n"])));
var BadgeText = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 14px;\n  margin-right: 8px;\n"])));
var ActiveDot = styled__default["default"].span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 50%;\n  height: 8px;\n  width: 8px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.success;
});
var LabelText = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n"])), function (_ref2) {
  var color = _ref2.color;
  return color;
});
function RangeBadge(_ref3) {
  var removed = _ref3.removed,
    inRange = _ref3.inRange;
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(BadgeWrapper, null, removed ? /*#__PURE__*/React__default["default"].createElement(index.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "MZPP7t",
      message: "Your position has 0 liquidity, and is not earning fees."
    })
  }, /*#__PURE__*/React__default["default"].createElement(LabelText, {
    color: theme.neutral2
  }, /*#__PURE__*/React__default["default"].createElement(BadgeText, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "D87pha",
    message: "Closed"
  })), /*#__PURE__*/React__default["default"].createElement(reactFeather.Slash, {
    width: 12,
    height: 12
  }))) : inRange ? /*#__PURE__*/React__default["default"].createElement(index.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "aIvv/z",
      message: "The price of this pool is within your selected range. Your position is currently earning fees."
    })
  }, /*#__PURE__*/React__default["default"].createElement(LabelText, {
    color: theme.success
  }, /*#__PURE__*/React__default["default"].createElement(BadgeText, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "vOyUlD",
    message: "In range"
  })), /*#__PURE__*/React__default["default"].createElement(ActiveDot, null))) : /*#__PURE__*/React__default["default"].createElement(index.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "IwiTcw",
      message: "The price of this pool is outside of your selected range. Your position is not currently earning fees."
    })
  }, /*#__PURE__*/React__default["default"].createElement(LabelText, {
    color: theme.deprecated_accentWarning
  }, /*#__PURE__*/React__default["default"].createElement(BadgeText, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "i3Z+/Z",
    message: "Out of range"
  })), /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    width: 12,
    height: 12
  }))));
}

module.exports = RangeBadge;
