import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { Settings } from '../../Icons/Settings.js';
import Row from '../../Row/index.js';
import { useUserSlippageTolerance } from '../../../state/user/hooks.js';
import { SlippageTolerance } from '../../../state/user/types.js';
import styled from 'styled-components';
import '../../../theme/components/index.js';
import { useFormatter } from '../../../utils/formatNumbers.js';
import validateUserSlippageTolerance, { SlippageValidationResult } from '../../../utils/validateUserSlippageTolerance.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Icon = styled(Settings)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 24px;\n  width: 24px;\n  > * {\n    fill: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var Button = styled.button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border: none;\n  background-color: transparent;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n\n  :not([disabled]):hover {\n    opacity: 0.7;\n  }\n\n  ", "\n"])), function (_ref2) {
  var isActive = _ref2.isActive;
  return isActive && "opacity: 0.7";
});
var IconContainer = styled(Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding: 6px 12px;\n  border-radius: 16px;\n"])));
var IconContainerWithSlippage = styled(IconContainer)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  div {\n    color: ", ";\n  }\n\n  background-color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme,
    displayWarning = _ref3.displayWarning;
  return displayWarning ? theme.deprecated_accentWarning : theme.neutral2;
}, function (_ref4) {
  var theme = _ref4.theme,
    displayWarning = _ref4.displayWarning;
  return displayWarning ? theme.deprecated_accentWarningSoft : theme.surface2;
});
var ButtonContent = function ButtonContent() {
  var _useUserSlippageToler = useUserSlippageTolerance(),
    _useUserSlippageToler2 = _slicedToArray(_useUserSlippageToler, 1),
    userSlippageTolerance = _useUserSlippageToler2[0];
  var _useFormatter = useFormatter(),
    formatSlippage = _useFormatter.formatSlippage;
  if (userSlippageTolerance === SlippageTolerance.Auto) {
    return /*#__PURE__*/React__default.createElement(IconContainer, null, /*#__PURE__*/React__default.createElement(Icon, null));
  }
  var isInvalidSlippage = validateUserSlippageTolerance(userSlippageTolerance) !== SlippageValidationResult.Valid;
  return /*#__PURE__*/React__default.createElement(IconContainerWithSlippage, {
    "data-testid": "settings-icon-with-slippage",
    gap: "sm",
    displayWarning: isInvalidSlippage
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "9+UNSg",
    message: "{0} slippage",
    values: {
      "0": formatSlippage(userSlippageTolerance)
    }
  })), /*#__PURE__*/React__default.createElement(Icon, null));
};
function MenuButton(_ref5) {
  var disabled = _ref5.disabled,
    onClick = _ref5.onClick,
    isActive = _ref5.isActive;
  return /*#__PURE__*/React__default.createElement(Button, {
    disabled: disabled,
    onClick: onClick,
    isActive: isActive,
    id: "open-settings-dialog-button",
    "data-testid": "open-settings-dialog-button",
    "aria-label": i18n._(
    /*i18n*/
    {
      id: "Kg8w08",
      message: "Transaction Settings"
    })
  }, /*#__PURE__*/React__default.createElement(ButtonContent, null));
}

export { MenuButton as default };
