'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$2 = require('../Button/index.cjs');
var index = require('../Column/index.cjs');
var index$3 = require('../Modal/index.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var styled = require('styled-components');
var index$1 = require('../../theme/components/index.cjs');
var UkBanner = require('./UkBanner.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 8px;\n"])));
var ButtonContainer = styled__default["default"](index.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: 8px 12px 4px;\n"])));
var CloseIconWrapper = styled__default["default"](index$1.ButtonText)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  color: ", ";\n  justify-content: flex-end;\n  padding: 8px 0px 4px;\n\n  :focus {\n    text-decoration: none;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var StyledThemeButton = styled__default["default"](index$2.ThemeButton)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n"])));
function UkDisclaimerModal() {
  var isOpen = hooks.useModalIsOpen(reducer.ApplicationModal.UK_DISCLAIMER);
  var closeModal = hooks.useCloseModal();
  return /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
    isOpen: isOpen,
    onDismiss: closeModal
  }, /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(CloseIconWrapper, {
    onClick: function onClick() {
      return closeModal();
    }
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.X, {
    size: 24
  })), /*#__PURE__*/React__default["default"].createElement(index.Column, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineLarge, {
    padding: "0px 8px",
    fontSize: "24px",
    lineHeight: "32px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "mCcDO+",
    message: "Disclaimer for UK residents"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    padding: "8px 8px 12px",
    lineHeight: "24px"
  }, UkBanner.bannerText)), /*#__PURE__*/React__default["default"].createElement(ButtonContainer, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(StyledThemeButton, {
    size: index$2.ButtonSize.large,
    emphasis: index$2.ButtonEmphasis.medium,
    onClick: function onClick() {
      return closeModal();
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "1QfxQT",
    message: "Dismiss"
  })))));
}

exports.UkDisclaimerModal = UkDisclaimerModal;
