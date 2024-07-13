import React__default from 'react';
import Modal from '../Modal/index.js';
import TokenSafety from './index.js';

function TokenSafetyModal(_ref) {
  var isOpen = _ref.isOpen,
    tokenAddress = _ref.tokenAddress,
    secondTokenAddress = _ref.secondTokenAddress,
    onContinue = _ref.onContinue,
    onCancel = _ref.onCancel,
    onBlocked = _ref.onBlocked,
    showCancel = _ref.showCancel;
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: isOpen,
    onDismiss: onCancel
  }, /*#__PURE__*/React__default.createElement(TokenSafety, {
    tokenAddress: tokenAddress,
    secondTokenAddress: secondTokenAddress,
    onContinue: onContinue,
    onBlocked: onBlocked,
    onCancel: onCancel,
    showCancel: showCancel
  }));
}

export { TokenSafetyModal as default };
