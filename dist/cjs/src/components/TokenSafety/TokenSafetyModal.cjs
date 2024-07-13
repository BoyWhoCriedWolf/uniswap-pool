'use strict';

var React = require('react');
var index = require('../Modal/index.cjs');
var index$1 = require('./index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function TokenSafetyModal(_ref) {
  var isOpen = _ref.isOpen,
    tokenAddress = _ref.tokenAddress,
    secondTokenAddress = _ref.secondTokenAddress,
    onContinue = _ref.onContinue,
    onCancel = _ref.onCancel,
    onBlocked = _ref.onBlocked,
    showCancel = _ref.showCancel;
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    isOpen: isOpen,
    onDismiss: onCancel
  }, /*#__PURE__*/React__default["default"].createElement(index$1, {
    tokenAddress: tokenAddress,
    secondTokenAddress: secondTokenAddress,
    onContinue: onContinue,
    onBlocked: onBlocked,
    onCancel: onCancel,
    showCancel: showCancel
  }));
}

module.exports = TokenSafetyModal;
