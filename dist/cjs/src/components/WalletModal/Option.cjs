'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$1 = require('../../analytics/index.cjs');
var index = require('../AccountDrawer/index.cjs');
var LoadingSpinner = require('../Icons/LoadingSpinner.cjs');
var activate = require('../../connection/activate.cjs');
var styled = require('styled-components');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var styles = require('../../theme/styles.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var OptionCardLeft = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  flex-direction: row;\n  align-items: center;\n"])), styles.flexColumnNoWrap);
var OptionCardClickable = styled__default["default"].button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background-color: unset;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: row;\n  justify-content: space-between;\n  opacity: ", ";\n  padding: 18px;\n  transition: ", ";\n"])), function (_ref) {
  var disabled = _ref.disabled,
    selected = _ref.selected;
  return disabled && !selected ? "0.5" : "1";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.transition.duration.fast;
});
var HeaderText = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  justify-content: center;\n  color: ", ";\n  font-size: 16px;\n  font-weight: 535;\n  padding: 0 8px;\n"])), styles.flexRowNoWrap, function (props) {
  return props.color === "blue" ? function (_ref3) {
    var theme = _ref3.theme;
    return theme.accent1;
  } : function (_ref4) {
    var theme = _ref4.theme;
    return theme.neutral1;
  };
});
var IconWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  justify-content: center;\n  img {\n    ", ";\n    border-radius: 12px;\n  }\n  & > img,\n  span {\n    height: 40px;\n    width: 40px;\n  }\n  ", ";\n"])), styles.flexColumnNoWrap, function (_ref5) {
  var theme = _ref5.theme;
  return !theme.darkMode && "border: 1px solid ".concat(theme.surface3);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n    align-items: flex-end;\n  "])));
});
var Wrapper = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  align-items: stretch;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  position: relative;\n  width: 100%;\n\n  background-color: ", ";\n\n  &:hover {\n    cursor: ", ";\n    background-color: ", ";\n  }\n  &:focus {\n    background-color: ", ";\n  }\n"])), function (_ref7) {
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
  var _useActivationState = activate.useActivationState(),
    activationState = _useActivationState.activationState,
    tryActivation = _useActivationState.tryActivation;
  var toggleAccountDrawer = index.useToggleAccountDrawer();
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var activate$1 = function activate() {
    return tryActivation(connection, toggleAccountDrawer, chainId);
  };
  var isSomeOptionPending = activationState.status === activate.ActivationStatus.PENDING;
  var isCurrentOptionPending = isSomeOptionPending && activationState.connection.type === connection.type;
  var isDarkMode = ThemeToggle.useIsDarkMode();
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    disabled: isSomeOptionPending
  }, /*#__PURE__*/React__default["default"].createElement(index$1.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.InterfaceEventName.WALLET_SELECTED,
    properties: {
      wallet_type: connection.getName()
    },
    element: analyticsEvents.InterfaceElementName.WALLET_TYPE_OPTION
  }, /*#__PURE__*/React__default["default"].createElement(OptionCardClickable, {
    disabled: isSomeOptionPending,
    onClick: activate$1,
    selected: isCurrentOptionPending,
    "data-testid": "wallet-option-".concat(connection.type)
  }, /*#__PURE__*/React__default["default"].createElement(OptionCardLeft, null, /*#__PURE__*/React__default["default"].createElement(IconWrapper, null, /*#__PURE__*/React__default["default"].createElement("img", {
    src: (_connection$getIcon = connection.getIcon) === null || _connection$getIcon === void 0 ? void 0 : _connection$getIcon.call(connection, isDarkMode),
    alt: connection.getName()
  })), /*#__PURE__*/React__default["default"].createElement(HeaderText, null, connection.getName())), isCurrentOptionPending && /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], null))));
}

module.exports = Option;
