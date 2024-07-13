'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Column/index.cjs');
var index$1 = require('../Row/index.cjs');
var locales = require('../../constants/locales.cjs');
var currencyConversion = require('../../featureFlags/flags/currencyConversion.cjs');
var useActiveLocalCurrency = require('../../hooks/useActiveLocalCurrency.cjs');
var useActiveLocale = require('../../hooks/useActiveLocale.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var AnalyticsToggle = require('./AnalyticsToggle.cjs');
var GitVersionRow = require('./GitVersionRow.cjs');
var LanguageMenu = require('./LanguageMenu.cjs');
var SlideOutMenu = require('./SlideOutMenu.cjs');
var SmallBalanceToggle = require('./SmallBalanceToggle.cjs');
var TestnetsToggle = require('./TestnetsToggle.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var Container = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: 100%;\n  justify-content: space-between;\n"])));
var SectionTitle = styled__default["default"](text.ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  padding-bottom: 24px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var ToggleWrapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: ", ";\n"])), function (_ref2) {
  var currencyConversionEnabled = _ref2.currencyConversionEnabled;
  return currencyConversionEnabled ? "10px" : "24px";
});
var SettingsButtonWrapper = styled__default["default"](index$1["default"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  padding: 16px 0px;\n"])), index$2.ClickableStyle);
var StyledChevron = styled__default["default"](reactFeather.ChevronRight)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var LanguageLabel = styled__default["default"](index$1["default"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  white-space: nowrap;\n"])));
var SettingsButton = function SettingsButton(_ref4) {
  var title = _ref4.title,
    currentState = _ref4.currentState,
    onClick = _ref4.onClick,
    testId = _ref4.testId;
  return /*#__PURE__*/React__default["default"].createElement(SettingsButtonWrapper, {
    "data-testid": testId,
    align: "center",
    justify: "space-between",
    onClick: onClick
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "textPrimary"
  }, title), /*#__PURE__*/React__default["default"].createElement(LanguageLabel, {
    gap: "xs",
    align: "center",
    width: "min-content"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "textPrimary"
  }, currentState), /*#__PURE__*/React__default["default"].createElement(StyledChevron, {
    size: 20
  })));
};
function SettingsMenu(_ref5) {
  var onClose = _ref5.onClose,
    openLanguageSettings = _ref5.openLanguageSettings,
    openLocalCurrencySettings = _ref5.openLocalCurrencySettings;
  var currencyConversionEnabled = currencyConversion.useCurrencyConversionFlagEnabled();
  var activeLocale = useActiveLocale.useActiveLocale();
  var activeLocalCurrency = useActiveLocalCurrency.useActiveLocalCurrency();
  return /*#__PURE__*/React__default["default"].createElement(SlideOutMenu.SlideOutMenu, {
    title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "Tz0i8g",
      message: "Settings"
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default["default"].createElement(Container, null, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(SectionTitle, {
    "data-testid": "wallet-header"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "Q6hhn8",
    message: "Preferences"
  })), /*#__PURE__*/React__default["default"].createElement(ToggleWrapper, {
    currencyConversionEnabled: currencyConversionEnabled
  }, /*#__PURE__*/React__default["default"].createElement(ThemeToggle["default"], null), /*#__PURE__*/React__default["default"].createElement(SmallBalanceToggle.SmallBalanceToggle, null), /*#__PURE__*/React__default["default"].createElement(AnalyticsToggle.AnalyticsToggle, null), /*#__PURE__*/React__default["default"].createElement(TestnetsToggle.TestnetsToggle, null)), !currencyConversionEnabled && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(SectionTitle, {
    "data-testid": "wallet-header"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "vXIe7J",
    message: "Language"
  })), /*#__PURE__*/React__default["default"].createElement(LanguageMenu.LanguageMenuItems, null)), currencyConversionEnabled && /*#__PURE__*/React__default["default"].createElement(index.Column, null, /*#__PURE__*/React__default["default"].createElement(SettingsButton, {
    title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "vXIe7J",
      message: "Language"
    }),
    currentState: locales.LOCALE_LABEL[activeLocale],
    onClick: openLanguageSettings,
    testId: "language-settings-button"
  }), /*#__PURE__*/React__default["default"].createElement(SettingsButton, {
    title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "Q2lUR2",
      message: "Currency"
    }),
    currentState: activeLocalCurrency,
    onClick: openLocalCurrencySettings,
    testId: "local-currency-settings-button"
  }))), /*#__PURE__*/React__default["default"].createElement(GitVersionRow.GitVersionRow, null)));
}

module.exports = SettingsMenu;
