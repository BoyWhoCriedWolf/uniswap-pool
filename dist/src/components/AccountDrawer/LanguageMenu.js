import React__default from 'react';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { SUPPORTED_LOCALES, LOCALE_LABEL } from '../../constants/locales.js';
import { useActiveLocale } from '../../hooks/useActiveLocale.js';
import { useLocationLinkProps } from '../../hooks/useLocationLinkProps.js';
import { MenuColumn, MenuItem } from './shared.js';
import { SlideOutMenu } from './SlideOutMenu.js';

function LanguageMenuItem(_ref) {
  var locale = _ref.locale,
    isActive = _ref.isActive;
  var _useLocationLinkProps = useLocationLinkProps(),
    to = _useLocationLinkProps.to,
    onClick = _useLocationLinkProps.onClick;
  return /*#__PURE__*/React__default.createElement(MenuItem, {
    label: LOCALE_LABEL[locale],
    onClick: onClick,
    to: to,
    isActive: isActive,
    testId: "wallet-language-item"
  });
}
function LanguageMenuItems() {
  var activeLocale = useActiveLocale();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, SUPPORTED_LOCALES.map(function (locale) {
    return /*#__PURE__*/React__default.createElement(LanguageMenuItem, {
      locale: locale,
      isActive: activeLocale === locale,
      key: locale
    });
  }));
}
function LanguageMenu(_ref2) {
  var onClose = _ref2.onClose;
  return /*#__PURE__*/React__default.createElement(SlideOutMenu, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "vXIe7J",
      message: "Language"
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default.createElement(MenuColumn, null, /*#__PURE__*/React__default.createElement(LanguageMenuItems, null)));
}

export { LanguageMenuItems, LanguageMenu as default };
