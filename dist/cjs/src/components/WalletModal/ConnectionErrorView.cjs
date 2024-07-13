'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../AccountDrawer/index.cjs');
var index$2 = require('../Button/index.cjs');
var activate = require('../../connection/activate.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var styles = require('../../theme/styles.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n"])), styles.flexColumnNoWrap);
var AlertTriangleIcon = styled__default["default"](reactFeather.AlertTriangle)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: 90px;\n  height: 90px;\n  stroke-width: 1;\n  margin: 36px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.critical;
});

// TODO(cartcrom): move this to a top level modal, rather than inline in the drawer
function ConnectionErrorView() {
  var _useActivationState = activate.useActivationState(),
    activationState = _useActivationState.activationState,
    tryActivation = _useActivationState.tryActivation,
    cancelActivation = _useActivationState.cancelActivation;
  var closeDrawer = index.useCloseAccountDrawer();
  if (activationState.status !== activate.ActivationStatus.ERROR) return null;
  var retry = function retry() {
    return tryActivation(activationState.connection, closeDrawer);
  };
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(AlertTriangleIcon, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    marginBottom: "8px"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "J9LSy2",
    message: "Error connecting"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: "24px",
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "4QdSvW",
    message: "The connection attempt failed. Please click try again and follow the steps to connect in your wallet."
  })), /*#__PURE__*/React__default["default"].createElement(index$2.ButtonPrimary, {
    $borderRadius: "16px",
    onClick: retry
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "KDw4GX",
    message: "Try again"
  })), /*#__PURE__*/React__default["default"].createElement(index$2.ButtonEmpty, {
    width: "fit-content",
    padding: "0",
    marginTop: 20
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Link, {
    onClick: cancelActivation,
    marginBottom: 12
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "f5iIBh",
    message: "Back to wallet selection"
  }))));
}

module.exports = ConnectionErrorView;
