import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { BrowserEvent, InterfaceEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { TraceEvent } from '../../analytics/index.js';
import { useToggleAccountDrawer } from '../AccountDrawer/index.js';
import Loader from '../Icons/LoadingSpinner.js';
import { useActivationState, ActivationStatus } from '../../connection/activate.js';
import styled from 'styled-components';
import { useIsDarkMode } from '../../theme/components/ThemeToggle.js';
import { flexColumnNoWrap, flexRowNoWrap } from '../../theme/styles.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var OptionCardLeft = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  flex-direction: row;\n  align-items: center;\n"])), flexColumnNoWrap);
var OptionCardClickable = styled.button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  align-items: center;\n  background-color: unset;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: row;\n  justify-content: space-between;\n  opacity: ", ";\n  padding: 18px;\n  transition: ", ";\n"])), function (_ref) {
  var disabled = _ref.disabled,
    selected = _ref.selected;
  return disabled && !selected ? "0.5" : "1";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.transition.duration.fast;
});
var HeaderText = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  justify-content: center;\n  color: ", ";\n  font-size: 16px;\n  font-weight: 535;\n  padding: 0 8px;\n"])), flexRowNoWrap, function (props) {
  return props.color === "blue" ? function (_ref3) {
    var theme = _ref3.theme;
    return theme.accent1;
  } : function (_ref4) {
    var theme = _ref4.theme;
    return theme.neutral1;
  };
});
var IconWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  justify-content: center;\n  img {\n    ", ";\n    border-radius: 12px;\n  }\n  & > img,\n  span {\n    height: 40px;\n    width: 40px;\n  }\n  ", ";\n"])), flexColumnNoWrap, function (_ref5) {
  var theme = _ref5.theme;
  return !theme.darkMode && "border: 1px solid ".concat(theme.surface3);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    align-items: flex-end;\n  "])));
});
var Wrapper = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  align-items: stretch;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  position: relative;\n  width: 100%;\n\n  background-color: ", ";\n\n  &:hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n  &:focus {\n    background-color: ", ";\n  }\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.surface2;
}, function (_ref8) {
  var disabled = _ref8.disabled;
  return !disabled && "pointer";
}, function (_ref9) {
  var theme = _ref9.theme,
    disabled = _ref9.disabled;
  return !disabled && theme.surface3;
}, function (_ref10) {
  var theme = _ref10.theme,
    disabled = _ref10.disabled;
  return !disabled && theme.surface3;
});
function Option(_ref11) {
  var _connection$getIcon;
  var connection = _ref11.connection;
  var _useActivationState = useActivationState(),
    activationState = _useActivationState.activationState,
    tryActivation = _useActivationState.tryActivation;
  var toggleAccountDrawer = useToggleAccountDrawer();
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var activate = function activate() {
    return tryActivation(connection, toggleAccountDrawer, chainId);
  };
  var isSomeOptionPending = activationState.status === ActivationStatus.PENDING;
  var isCurrentOptionPending = isSomeOptionPending && activationState.connection.type === connection.type;
  var isDarkMode = useIsDarkMode();
  return /*#__PURE__*/React__default.createElement(Wrapper, {
    disabled: isSomeOptionPending
  }, /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: InterfaceEventName.WALLET_SELECTED,
    properties: {
      wallet_type: connection.getName()
    },
    element: InterfaceElementName.WALLET_TYPE_OPTION
  }, /*#__PURE__*/React__default.createElement(OptionCardClickable, {
    disabled: isSomeOptionPending,
    onClick: activate,
    selected: isCurrentOptionPending,
    "data-testid": "wallet-option-".concat(connection.type)
  }, /*#__PURE__*/React__default.createElement(OptionCardLeft, null, /*#__PURE__*/React__default.createElement(IconWrapper, null, /*#__PURE__*/React__default.createElement("img", {
    src: (_connection$getIcon = connection.getIcon) === null || _connection$getIcon === void 0 ? void 0 : _connection$getIcon.call(connection, isDarkMode),
    alt: connection.getName()
  })), /*#__PURE__*/React__default.createElement(HeaderText, null, connection.getName())), isCurrentOptionPending && /*#__PURE__*/React__default.createElement(Loader, null))));
}

export { Option as default };
