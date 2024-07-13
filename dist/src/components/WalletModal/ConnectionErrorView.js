import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useCloseAccountDrawer } from '../AccountDrawer/index.js';
import { ButtonPrimary, ButtonEmpty } from '../Button/index.js';
import { useActivationState, ActivationStatus } from '../../connection/activate.js';
import { AlertTriangle } from 'react-feather';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { flexColumnNoWrap } from '../../theme/styles.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n"])), flexColumnNoWrap);
var AlertTriangleIcon = styled(AlertTriangle)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 90px;\n  height: 90px;\n  stroke-width: 1;\n  margin: 36px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.critical;
});

// TODO(cartcrom): move this to a top level modal, rather than inline in the drawer
function ConnectionErrorView() {
  var _useActivationState = useActivationState(),
    activationState = _useActivationState.activationState,
    tryActivation = _useActivationState.tryActivation,
    cancelActivation = _useActivationState.cancelActivation;
  var closeDrawer = useCloseAccountDrawer();
  if (activationState.status !== ActivationStatus.ERROR) return null;
  var retry = function retry() {
    return tryActivation(activationState.connection, closeDrawer);
  };
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(AlertTriangleIcon, null), /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    marginBottom: "8px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "J9LSy2",
    message: "Error connecting"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: "24px",
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "4QdSvW",
    message: "The connection attempt failed. Please click try again and follow the steps to connect in your wallet."
  })), /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    $borderRadius: "16px",
    onClick: retry
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "KDw4GX",
    message: "Try again"
  })), /*#__PURE__*/React__default.createElement(ButtonEmpty, {
    width: "fit-content",
    padding: "0",
    marginTop: 20
  }, /*#__PURE__*/React__default.createElement(ThemedText.Link, {
    onClick: cancelActivation,
    marginBottom: 12
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "f5iIBh",
    message: "Back to wallet selection"
  }))));
}

export { ConnectionErrorView as default };
