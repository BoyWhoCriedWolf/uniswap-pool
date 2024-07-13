import React__default, { useEffect } from 'react';
import { i18n } from '../../node_modules/@lingui/core/dist/index.mjs.js';
import { I18nProvider } from '../../node_modules/@lingui/react/dist/index.mjs.js';
import { DEFAULT_LOCALE } from '../constants/locales.js';
import enUS from '../locales/en-US.js';

// Initialize the locale immediately to DEFAULT_LOCALE/DEFAULT_MESSAGES,
// so that messages are shown while the appropriate translation load.
// This is necessary for initial macro translations (t``) to work in the DEFAULT_LOCALE.
i18n.load(DEFAULT_LOCALE, enUS.messages);
i18n.activate(DEFAULT_LOCALE);
async function dynamicActivate(locale) {
  if (i18n.locale === locale) return;
  try {
    const catalog = await import(`locales/${locale}.js`);
    // Bundlers will either export it as default or as a named export named default.
    i18n.load(locale, catalog.messages || catalog.default.messages);
  } catch (error) {
    console.error(new Error(`Unable to load locale (${locale}): ${error}`));
  }
  i18n.activate(locale);
}
function Provider(_ref) {
  let {
    locale,
    onActivate,
    children
  } = _ref;
  useEffect(() => {
    dynamicActivate(locale).then(() => onActivate?.(locale)).catch(error => {
      console.error("Failed to activate locale", locale, error);
    });
  }, [locale, onActivate]);
  return /*#__PURE__*/React__default.createElement(I18nProvider, {
    i18n: i18n
  }, children);
}

export { Provider, dynamicActivate };
