import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ThemeButton, ButtonSize, ButtonEmphasis } from '../Button/index.js';
import { ColumnCenter } from '../Column/index.js';
import Row from '../Row/index.js';
import { AlertTriangle } from 'react-feather';
import styled from 'styled-components';
import { CloseIcon } from '../../theme/components/index.js';
import { useFormatter } from '../../utils/formatNumbers.js';
import Modal from '../Modal/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var Wrapper = styled(ColumnCenter)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 16px 24px;\n"])));
var IconContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 32px 0px;\n"])));
var WarningIcon = styled(AlertTriangle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.critical;
});
var ButtonContainer = styled(ColumnCenter)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  padding: 12px 0px 0px;\n"])));
var StyledThemeButton = styled(ThemeButton)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: 100%;\n"])));
function PriceImpactModal(_ref2) {
  var priceImpact = _ref2.priceImpact,
    onDismiss = _ref2.onDismiss,
    onContinue = _ref2.onContinue;
  var _useFormatter = useFormatter(),
    formatPriceImpact = _useFormatter.formatPriceImpact;
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: true,
    onDismiss: onDismiss
  }, /*#__PURE__*/React__default.createElement(Wrapper, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(Row, {
    padding: "8px 0px 4px"
  }, /*#__PURE__*/React__default.createElement(CloseIcon, {
    size: 24,
    onClick: onDismiss
  })), /*#__PURE__*/React__default.createElement(IconContainer, null, /*#__PURE__*/React__default.createElement(WarningIcon, {
    size: 48
  })), /*#__PURE__*/React__default.createElement(ColumnCenter, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    fontWeight: 535
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "r6y+jM",
    message: "Warning"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    lineHeight: "24px",
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "zjvO28",
    message: "This transaction will result in a <0>{0}</0> price impact on the market price of this pool. Do you wish to continue?",
    values: {
      "0": formatPriceImpact(priceImpact)
    },
    components: {
      "0": /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
        lineHeight: "24px",
        color: "critical",
        display: "inline"
      })
    }
  }))), /*#__PURE__*/React__default.createElement(ButtonContainer, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(StyledThemeButton, {
    size: ButtonSize.large,
    emphasis: ButtonEmphasis.failure,
    onClick: onContinue
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xGVfLh",
    message: "Continue"
  })), /*#__PURE__*/React__default.createElement(StyledThemeButton, {
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.low,
    onClick: onDismiss
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "dEgA5A",
    message: "Cancel"
  })))));
}

export { PriceImpactModal as default };
