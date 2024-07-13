import React__default, { useCallback } from 'react';
import { DEFAULT_LOCALE } from './constants/locales.js';
import { initialLocale } from './hooks/useActiveLocale.js';
import { dynamicActivate, Provider } from './lib/i18n.js';
import { useUserLocaleManager } from './state/user/hooks.js';

dynamicActivate(initialLocale);
function LanguageProvider(_ref) {
  let {
    children
  } = _ref;
  // const locale = useActiveLocale();
  const locale = DEFAULT_LOCALE;
  const [, setUserLocale] = useUserLocaleManager();
  const onActivate = useCallback(locale => {
    document.documentElement.setAttribute("lang", locale);
    setUserLocale(locale); // stores the selected locale to persist across sessions
  }, [setUserLocale]);
  return /*#__PURE__*/React__default.createElement(Provider, {
    locale: locale,
    onActivate: onActivate
  }, children);
}

export { LanguageProvider };
