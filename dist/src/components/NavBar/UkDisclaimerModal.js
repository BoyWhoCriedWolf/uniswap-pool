import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ThemeButton, ButtonSize, ButtonEmphasis } from '../Button/index.js';
import { Column } from '../Column/index.js';
import Modal from '../Modal/index.js';
import { X } from 'react-feather';
import { useModalIsOpen, useCloseModal } from '../../state/application/hooks.js';
import { ApplicationModal } from '../../state/application/reducer.js';
import styled from 'styled-components';
import { ButtonText } from '../../theme/components/index.js';
import { bannerText } from './UkBanner.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 8px;\n"])));
var ButtonContainer = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 8px 12px 4px;\n"])));
var CloseIconWrapper = styled(ButtonText)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  color: ", ";\n  justify-content: flex-end;\n  padding: 8px 0px 4px;\n\n  :focus {\n    text-decoration: none;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var StyledThemeButton = styled(ThemeButton)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 100%;\n"])));
function UkDisclaimerModal() {
  var isOpen = useModalIsOpen(ApplicationModal.UK_DISCLAIMER);
  var closeModal = useCloseModal();
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: isOpen,
    onDismiss: closeModal
  }, /*#__PURE__*/React__default.createElement(Wrapper, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(CloseIconWrapper, {
    onClick: function onClick() {
      return closeModal();
    }
  }, /*#__PURE__*/React__default.createElement(X, {
    size: 24
  })), /*#__PURE__*/React__default.createElement(Column, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineLarge, {
    padding: "0px 8px",
    fontSize: "24px",
    lineHeight: "32px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "mCcDO+",
    message: "Disclaimer for UK residents"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    padding: "8px 8px 12px",
    lineHeight: "24px"
  }, bannerText)), /*#__PURE__*/React__default.createElement(ButtonContainer, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(StyledThemeButton, {
    size: ButtonSize.large,
    emphasis: ButtonEmphasis.medium,
    onClick: function onClick() {
      return closeModal();
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "1QfxQT",
    message: "Dismiss"
  })))));
}

export { UkDisclaimerModal };
