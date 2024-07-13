'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index$1 = require('../../../../node_modules/@lingui/core/dist/index.cjs');
var Settings = require('../../Icons/Settings.cjs');
var index = require('../../Row/index.cjs');
var hooks = require('../../../state/user/hooks.cjs');
var types = require('../../../state/user/types.cjs');
var styled = require('styled-components');
require('../../../theme/components/index.cjs');
var formatNumbers = require('../../../utils/formatNumbers.cjs');
var validateUserSlippageTolerance = require('../../../utils/validateUserSlippageTolerance.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Icon = styled__default["default"](Settings.Settings)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: 24px;\n  width: 24px;\n  > * {\n    fill: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var Button = styled__default["default"].button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border: none;\n  background-color: transparent;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n\n  :not([disabled]):hover {\n    opacity: 0.7;\n  }\n\n  ", "\n"])), function (_ref2) {
  var isActive = _ref2.isActive;
  return isActive && "opacity: 0.7";
});
var IconContainer = styled__default["default"](index["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  padding: 6px 12px;\n  border-radius: 16px;\n"])));
var IconContainerWithSlippage = styled__default["default"](IconContainer)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  div {\n    color: ", ";\n  }\n\n  background-color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme,
    displayWarning = _ref3.displayWarning;
  return displayWarning ? theme.deprecated_accentWarning : theme.neutral2;
}, function (_ref4) {
  var theme = _ref4.theme,
    displayWarning = _ref4.displayWarning;
  return displayWarning ? theme.deprecated_accentWarningSoft : theme.surface2;
});
var ButtonContent = function ButtonContent() {
  var _useUserSlippageToler = hooks.useUserSlippageTolerance(),
    _useUserSlippageToler2 = _slicedToArray__default["default"](_useUserSlippageToler, 1),
    userSlippageTolerance = _useUserSlippageToler2[0];
  var _useFormatter = formatNumbers.useFormatter(),
    formatSlippage = _useFormatter.formatSlippage;
  if (userSlippageTolerance === types.SlippageTolerance.Auto) {
    return /*#__PURE__*/React__default["default"].createElement(IconContainer, null, /*#__PURE__*/React__default["default"].createElement(Icon, null));
  }
  var isInvalidSlippage = validateUserSlippageTolerance["default"](userSlippageTolerance) !== validateUserSlippageTolerance.SlippageValidationResult.Valid;
  return /*#__PURE__*/React__default["default"].createElement(IconContainerWithSlippage, {
    "data-testid": "settings-icon-with-slippage",
    gap: "sm",
    displayWarning: isInvalidSlippage
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "9+UNSg",
    message: "{0} slippage",
    values: {
      "0": formatSlippage(userSlippageTolerance)
    }
  })), /*#__PURE__*/React__default["default"].createElement(Icon, null));
};
function MenuButton(_ref5) {
  var disabled = _ref5.disabled,
    onClick = _ref5.onClick,
    isActive = _ref5.isActive;
  return /*#__PURE__*/React__default["default"].createElement(Button, {
    disabled: disabled,
    onClick: onClick,
    isActive: isActive,
    id: "open-settings-dialog-button",
    "data-testid": "open-settings-dialog-button",
    "aria-label": index$1.i18n._(
    /*i18n*/
    {
      id: "Kg8w08",
      message: "Transaction Settings"
    })
  }, /*#__PURE__*/React__default["default"].createElement(ButtonContent, null));
}

module.exports = MenuButton;
