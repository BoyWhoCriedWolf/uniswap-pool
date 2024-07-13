import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../Column/index.js';
import Row from '../Row/index.js';
import { LOCALE_LABEL } from '../../constants/locales.js';
import { useCurrencyConversionFlagEnabled } from '../../featureFlags/flags/currencyConversion.js';
import { useActiveLocalCurrency } from '../../hooks/useActiveLocalCurrency.js';
import { useActiveLocale } from '../../hooks/useActiveLocale.js';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';
import { ClickableStyle } from '../../theme/components/index.js';
import ThemeToggle from '../../theme/components/ThemeToggle.js';
import { AnalyticsToggle } from './AnalyticsToggle.js';
import { GitVersionRow } from './GitVersionRow.js';
import { LanguageMenuItems } from './LanguageMenu.js';
import { SlideOutMenu } from './SlideOutMenu.js';
import { SmallBalanceToggle } from './SmallBalanceToggle.js';
import { TestnetsToggle } from './TestnetsToggle.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var Container = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 100%;\n  justify-content: space-between;\n"])));
var SectionTitle = styled(ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  padding-bottom: 24px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var ToggleWrapper = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: ", ";\n"])), function (_ref2) {
  var currencyConversionEnabled = _ref2.currencyConversionEnabled;
  return currencyConversionEnabled ? "10px" : "24px";
});
var SettingsButtonWrapper = styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", "\n  padding: 16px 0px;\n"])), ClickableStyle);
var StyledChevron = styled(ChevronRight)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var LanguageLabel = styled(Row)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  white-space: nowrap;\n"])));
var SettingsButton = function SettingsButton(_ref4) {
  var title = _ref4.title,
    currentState = _ref4.currentState,
    onClick = _ref4.onClick,
    testId = _ref4.testId;
  return /*#__PURE__*/React__default.createElement(SettingsButtonWrapper, {
    "data-testid": testId,
    align: "center",
    justify: "space-between",
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "textPrimary"
  }, title), /*#__PURE__*/React__default.createElement(LanguageLabel, {
    gap: "xs",
    align: "center",
    width: "min-content"
  }, /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
    color: "textPrimary"
  }, currentState), /*#__PURE__*/React__default.createElement(StyledChevron, {
    size: 20
  })));
};
function SettingsMenu(_ref5) {
  var onClose = _ref5.onClose,
    openLanguageSettings = _ref5.openLanguageSettings,
    openLocalCurrencySettings = _ref5.openLocalCurrencySettings;
  var currencyConversionEnabled = useCurrencyConversionFlagEnabled();
  var activeLocale = useActiveLocale();
  var activeLocalCurrency = useActiveLocalCurrency();
  return /*#__PURE__*/React__default.createElement(SlideOutMenu, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "Tz0i8g",
      message: "Settings"
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(SectionTitle, {
    "data-testid": "wallet-header"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Q6hhn8",
    message: "Preferences"
  })), /*#__PURE__*/React__default.createElement(ToggleWrapper, {
    currencyConversionEnabled: currencyConversionEnabled
  }, /*#__PURE__*/React__default.createElement(ThemeToggle, null), /*#__PURE__*/React__default.createElement(SmallBalanceToggle, null), /*#__PURE__*/React__default.createElement(AnalyticsToggle, null), /*#__PURE__*/React__default.createElement(TestnetsToggle, null)), !currencyConversionEnabled && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(SectionTitle, {
    "data-testid": "wallet-header"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "vXIe7J",
    message: "Language"
  })), /*#__PURE__*/React__default.createElement(LanguageMenuItems, null)), currencyConversionEnabled && /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(SettingsButton, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "vXIe7J",
      message: "Language"
    }),
    currentState: LOCALE_LABEL[activeLocale],
    onClick: openLanguageSettings,
    testId: "language-settings-button"
  }), /*#__PURE__*/React__default.createElement(SettingsButton, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "Q2lUR2",
      message: "Currency"
    }),
    currentState: activeLocalCurrency,
    onClick: openLocalCurrencySettings,
    testId: "local-currency-settings-button"
  }))), /*#__PURE__*/React__default.createElement(GitVersionRow, null)));
}

export { SettingsMenu as default };
