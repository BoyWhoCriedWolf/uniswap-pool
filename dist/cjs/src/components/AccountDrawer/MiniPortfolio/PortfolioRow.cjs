'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../Column/index.cjs');
var index = require('../../Row/index.cjs');
var loading = require('../../Tokens/loading.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var PortfolioRowWrapper = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  gap: 12px;\n  height: 68px;\n  padding: 0 16px;\n\n  transition: ", ";\n\n  ", ";\n\n  &:hover {\n    cursor: pointer;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " background-color");
}, function (_ref2) {
  var onClick = _ref2.onClick;
  return onClick && "cursor: pointer";
});
var EndColumn = styled__default["default"](index$1.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  align-items: flex-end;\n"])));
function PortfolioRow(_ref3) {
  var testId = _ref3["data-testid"],
    left = _ref3.left,
    title = _ref3.title,
    descriptor = _ref3.descriptor,
    right = _ref3.right,
    onClick = _ref3.onClick;
  return /*#__PURE__*/React__default["default"].createElement(PortfolioRowWrapper, {
    "data-testid": testId,
    onClick: onClick
  }, left, /*#__PURE__*/React__default["default"].createElement(index$1.AutoColumn, {
    grow: true
  }, title, descriptor), right && /*#__PURE__*/React__default["default"].createElement(EndColumn, null, right));
}
function PortfolioSkeletonRow(_ref4) {
  var shrinkRight = _ref4.shrinkRight;
  return /*#__PURE__*/React__default["default"].createElement(PortfolioRowWrapper, null, /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "40px",
    width: "40px",
    round: true
  }), /*#__PURE__*/React__default["default"].createElement(index$1.AutoColumn, {
    grow: true,
    gap: "4px"
  }, /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "16px",
    width: "60px",
    delay: "300ms"
  }), /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "10px",
    width: "90px",
    delay: "300ms"
  })), /*#__PURE__*/React__default["default"].createElement(EndColumn, {
    gap: "xs"
  }, shrinkRight ? /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "12px",
    width: "20px",
    delay: "600ms"
  }) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "14px",
    width: "70px",
    delay: "600ms"
  }), /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "14px",
    width: "50px",
    delay: "600ms"
  }))));
}
function PortfolioSkeleton(_ref5) {
  var _ref5$shrinkRight = _ref5.shrinkRight,
    shrinkRight = _ref5$shrinkRight === void 0 ? false : _ref5$shrinkRight;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, Array.from({
    length: 5
  }).map(function (_, i) {
    return /*#__PURE__*/React__default["default"].createElement(PortfolioSkeletonRow, {
      shrinkRight: shrinkRight,
      key: "portfolio loading row".concat(i)
    });
  }));
}
var fadeIn = styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  from { opacity: .25 }\n  to { opacity: 1 }\n"])));
var portfolioFadeInAnimation = styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), fadeIn, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing["in"]);
});
var PortfolioTabWrapper = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), portfolioFadeInAnimation);

exports.PortfolioRowWrapper = PortfolioRowWrapper;
exports.PortfolioSkeleton = PortfolioSkeleton;
exports.PortfolioTabWrapper = PortfolioTabWrapper;
exports["default"] = PortfolioRow;
exports.portfolioFadeInAnimation = portfolioFadeInAnimation;
