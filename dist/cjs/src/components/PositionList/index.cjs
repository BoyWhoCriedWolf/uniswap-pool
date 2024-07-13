'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$2 = require('../PositionListItem/index.cjs');
var React = require('react');
var styled = require('styled-components');
var index = require('../../theme/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var DesktopHeader = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: none;\n  font-size: 14px;\n  padding: 16px;\n  border-bottom: 1px solid ", ";\n\n  @media screen and (min-width: ", "px) {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    & > div:last-child {\n      text-align: right;\n      margin-right: 12px;\n    }\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, index.MEDIA_WIDTHS.deprecated_upToSmall);
var MobileHeader = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  font-weight: medium;\n  padding: 8px;\n  font-weight: 535;\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n  border-bottom: 1px solid ", ";\n\n  @media screen and (min-width: ", "px) {\n    display: none;\n  }\n\n  @media screen and (max-width: ", "px) {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, index.MEDIA_WIDTHS.deprecated_upToSmall, index.MEDIA_WIDTHS.deprecated_upToExtraSmall);
var ToggleWrap = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])));
var ToggleLabel = styled__default["default"].button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 485;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.accent1;
});
function PositionList(_ref4) {
  var positions = _ref4.positions,
    setUserHideClosedPositions = _ref4.setUserHideClosedPositions,
    userHideClosedPositions = _ref4.userHideClosedPositions;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(DesktopHeader, null, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "LcLwJZ",
    message: "Your positions"
  }), positions && " (" + positions.length + ")"), /*#__PURE__*/React__default["default"].createElement(ToggleLabel, {
    id: "desktop-hide-closed-positions",
    onClick: function onClick() {
      setUserHideClosedPositions(!userHideClosedPositions);
    }
  }, userHideClosedPositions ? /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "GOctE4",
    message: "Show closed positions"
  }) : /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "l+HNUa",
    message: "Hide closed positions"
  }))), /*#__PURE__*/React__default["default"].createElement(MobileHeader, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "LcLwJZ",
    message: "Your positions"
  }), /*#__PURE__*/React__default["default"].createElement(ToggleWrap, null, /*#__PURE__*/React__default["default"].createElement(ToggleLabel, {
    onClick: function onClick() {
      setUserHideClosedPositions(!userHideClosedPositions);
    }
  }, userHideClosedPositions ? /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "GOctE4",
    message: "Show closed positions"
  }) : /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "l+HNUa",
    message: "Hide closed positions"
  })))), positions.map(function (p) {
    return /*#__PURE__*/React__default["default"].createElement(index$2["default"], _extends__default["default"]({
      key: p.tokenId.toString()
    }, p));
  }));
}

module.exports = PositionList;
