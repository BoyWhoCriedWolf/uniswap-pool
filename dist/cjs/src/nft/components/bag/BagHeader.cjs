'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index$1 = require('../../../components/Common/index.cjs');
var icons = require('../icons.cjs');
var styled = require('styled-components');
var index = require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ClearButton = styled__default["default"](index.ButtonText)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  cursor: pointer;\n  font-weight: 535;\n  font-size: 14px;\n  line-height: 16px;\n\n  :active {\n    text-decoration: none;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var IconWrapper = styled__default["default"].button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background-color: transparent;\n  border-radius: 8px;\n  border: none;\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  margin-left: auto;\n  padding: 2px;\n  opacity: 1;\n\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
}, index$1.OpacityHoverState);
var CounterDot = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 100px;\n  font-weight: bold;\n  color: ", ";\n  display: flex;\n  font-size: 10px;\n  justify-content: center;\n  min-width: ", ";\n  min-height: ", ";\n  padding: 4px 6px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.accent1;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_accentTextLightPrimary;
}, function (_ref5) {
  var sizing = _ref5.sizing;
  return sizing;
}, function (_ref6) {
  var sizing = _ref6.sizing;
  return sizing;
});
var Wrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n  justify-content: flex-start;\n  margin: 16px 28px;\n  text-align: center;\n"])));
var BASE_SIZING = 17;
var INCREMENTAL_SIZING = 6;
var getCircleSizing = function getCircleSizing(numberOfAssets) {
  var numberOfCharacters = numberOfAssets.toString().length;

  // each digit adds 6px worth of width (approximately), so I set the height and width to be 6px larger for each digit added
  // 1 digit => 14 + 6, 2 digit 14 + 12, etc.
  return "".concat(BASE_SIZING + INCREMENTAL_SIZING * numberOfCharacters, "px");
};
var BagHeader = function BagHeader(_ref7) {
  var numberOfAssets = _ref7.numberOfAssets,
    closeBag = _ref7.closeBag,
    resetFlow = _ref7.resetFlow,
    isProfilePage = _ref7.isProfilePage;
  var sizing = React.useMemo(function () {
    return getCircleSizing(numberOfAssets);
  }, [numberOfAssets]);
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, null, isProfilePage ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "xNB0TS",
    message: "Sell"
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "EnO7qf",
    message: "Bag"
  })), numberOfAssets > 0 && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(CounterDot, {
    sizing: sizing
  }, numberOfAssets), /*#__PURE__*/React__default["default"].createElement(ClearButton, {
    onClick: resetFlow
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "yYxB17",
    message: "Clear all"
  }))), /*#__PURE__*/React__default["default"].createElement(IconWrapper, {
    onClick: closeBag
  }, /*#__PURE__*/React__default["default"].createElement(icons.BagCloseIcon, {
    "data-testid": "nft-bag-close-icon"
  })));
};

exports.BagHeader = BagHeader;
