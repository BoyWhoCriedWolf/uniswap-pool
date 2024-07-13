'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var Flex = require('../Flex.cjs');
var icons = require('../icons.cjs');
var common_css = require('../../css/common.css.cjs');
var sprinkles_css = require('../../css/sprinkles.css.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledColumn = styled__default["default"](Flex.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  gap: 12px;\n  margin-top: 68px;\n"])));
var EmptyState = function EmptyState() {
  return /*#__PURE__*/React__default["default"].createElement(StyledColumn, null, /*#__PURE__*/React__default["default"].createElement(Flex.Center, null, /*#__PURE__*/React__default["default"].createElement(icons.BagIcon, {
    color: sprinkles_css.themeVars.colors.neutral3,
    height: "96px",
    width: "96px",
    strokeWidth: "1px"
  })), /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    gap: "16"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Center, {
    "data-testid": "nft-empty-bag",
    className: common_css.subhead,
    style: {
      lineHeight: "24px"
    }
  }, "Your bag is empty"), /*#__PURE__*/React__default["default"].createElement(Flex.Center, {
    fontSize: "12",
    fontWeight: "book",
    color: "neutral2",
    style: {
      lineHeight: "16px"
    }
  }, "Selected NFTs will appear here")));
};

module.exports = EmptyState;
