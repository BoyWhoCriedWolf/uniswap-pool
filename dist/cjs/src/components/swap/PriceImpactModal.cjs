'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$5 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$1 = require('../Button/index.cjs');
var index = require('../Column/index.cjs');
var index$3 = require('../Row/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$4 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var index$2 = require('../Modal/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var Wrapper = styled__default["default"](index.ColumnCenter)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 16px 24px;\n"])));
var IconContainer = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: 32px 0px;\n"])));
var WarningIcon = styled__default["default"](reactFeather.AlertTriangle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.critical;
});
var ButtonContainer = styled__default["default"](index.ColumnCenter)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  padding: 12px 0px 0px;\n"])));
var StyledThemeButton = styled__default["default"](index$1.ThemeButton)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n"])));
function PriceImpactModal(_ref2) {
  var priceImpact = _ref2.priceImpact,
    onDismiss = _ref2.onDismiss,
    onContinue = _ref2.onContinue;
  var _useFormatter = formatNumbers.useFormatter(),
    formatPriceImpact = _useFormatter.formatPriceImpact;
  return /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    isOpen: true,
    onDismiss: onDismiss
  }, /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
    padding: "8px 0px 4px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.CloseIcon, {
    size: 24,
    onClick: onDismiss
  })), /*#__PURE__*/React__default["default"].createElement(IconContainer, null, /*#__PURE__*/React__default["default"].createElement(WarningIcon, {
    size: 48
  })), /*#__PURE__*/React__default["default"].createElement(index.ColumnCenter, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    fontWeight: 535
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "r6y+jM",
    message: "Warning"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    lineHeight: "24px",
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "zjvO28",
    message: "This transaction will result in a <0>{0}</0> price impact on the market price of this pool. Do you wish to continue?",
    values: {
      "0": formatPriceImpact(priceImpact)
    },
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
        lineHeight: "24px",
        color: "critical",
        display: "inline"
      })
    }
  }))), /*#__PURE__*/React__default["default"].createElement(ButtonContainer, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(StyledThemeButton, {
    size: index$1.ButtonSize.large,
    emphasis: index$1.ButtonEmphasis.failure,
    onClick: onContinue
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "xGVfLh",
    message: "Continue"
  })), /*#__PURE__*/React__default["default"].createElement(StyledThemeButton, {
    size: index$1.ButtonSize.medium,
    emphasis: index$1.ButtonEmphasis.low,
    onClick: onDismiss
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "dEgA5A",
    message: "Cancel"
  })))));
}

module.exports = PriceImpactModal;
