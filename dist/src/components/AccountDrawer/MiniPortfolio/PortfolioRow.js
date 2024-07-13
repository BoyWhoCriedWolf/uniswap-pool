import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column, AutoColumn } from '../../Column/index.js';
import Row from '../../Row/index.js';
import { LoadingBubble } from '../../Tokens/loading.js';
import styled, { keyframes, css } from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var PortfolioRowWrapper = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 12px;\n  height: 68px;\n  padding: 0 16px;\n\n  transition: ", ";\n\n  ", ";\n\n  &:hover {\n    cursor: pointer;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " background-color");
}, function (_ref2) {
  var onClick = _ref2.onClick;
  return onClick && "cursor: pointer";
});
var EndColumn = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  align-items: flex-end;\n"])));
function PortfolioRow(_ref3) {
  var testId = _ref3["data-testid"],
    left = _ref3.left,
    title = _ref3.title,
    descriptor = _ref3.descriptor,
    right = _ref3.right,
    onClick = _ref3.onClick;
  return /*#__PURE__*/React__default.createElement(PortfolioRowWrapper, {
    "data-testid": testId,
    onClick: onClick
  }, left, /*#__PURE__*/React__default.createElement(AutoColumn, {
    grow: true
  }, title, descriptor), right && /*#__PURE__*/React__default.createElement(EndColumn, null, right));
}
function PortfolioSkeletonRow(_ref4) {
  var shrinkRight = _ref4.shrinkRight;
  return /*#__PURE__*/React__default.createElement(PortfolioRowWrapper, null, /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "40px",
    width: "40px",
    round: true
  }), /*#__PURE__*/React__default.createElement(AutoColumn, {
    grow: true,
    gap: "4px"
  }, /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "16px",
    width: "60px",
    delay: "300ms"
  }), /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "10px",
    width: "90px",
    delay: "300ms"
  })), /*#__PURE__*/React__default.createElement(EndColumn, {
    gap: "xs"
  }, shrinkRight ? /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "12px",
    width: "20px",
    delay: "600ms"
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "14px",
    width: "70px",
    delay: "600ms"
  }), /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "14px",
    width: "50px",
    delay: "600ms"
  }))));
}
function PortfolioSkeleton(_ref5) {
  var _ref5$shrinkRight = _ref5.shrinkRight,
    shrinkRight = _ref5$shrinkRight === void 0 ? false : _ref5$shrinkRight;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, Array.from({
    length: 5
  }).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PortfolioSkeletonRow, {
      shrinkRight: shrinkRight,
      key: "portfolio loading row".concat(i)
    });
  }));
}
var fadeIn = keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  from { opacity: .25 }\n  to { opacity: 1 }\n"])));
var portfolioFadeInAnimation = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  animation: ", "\n    ", ";\n"])), fadeIn, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing["in"]);
});
var PortfolioTabWrapper = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  ", "\n"])), portfolioFadeInAnimation);

export { PortfolioRowWrapper, PortfolioSkeleton, PortfolioTabWrapper, PortfolioRow as default, portfolioFadeInAnimation };
