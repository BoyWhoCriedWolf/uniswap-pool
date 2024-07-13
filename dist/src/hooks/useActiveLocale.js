import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../constants/locales.js';
import { useMemo } from 'react';
import store from '../state/index.js';
import { useUserLocale } from '../state/user/hooks.js';
import useParsedQueryString, { parsedQueryString } from './useParsedQueryString.js';

/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param maybeSupportedLocale the fuzzy locale identifier
 */
function parseLocale(maybeSupportedLocale) {
  if (typeof maybeSupportedLocale !== "string") return undefined;
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
  return SUPPORTED_LOCALES.find(locale => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split("-")[0] === lowerMaybeSupportedLocale);
}

/**
 * Returns the supported locale read from the user agent (navigator)
 */
function navigatorLocale() {
  if (!navigator.language) return undefined;
  const [language, region] = navigator.language.split("-");
  if (region) {
    return parseLocale(`${language}-${region.toUpperCase()}`) ?? parseLocale(language);
  }
  return parseLocale(language);
}
function storeLocale() {
  return store.getState().user.userLocale ?? undefined;
}
const initialLocale = parseLocale(parsedQueryString().lng) ?? storeLocale() ?? navigatorLocale() ?? DEFAULT_LOCALE;
function useUrlLocale() {
  const parsed = useParsedQueryString();
  return parseLocale(parsed.lng);
}

/**
 * Returns the currently active locale, from a combination of user agent, query string, and user settings stored in redux
 * Stores the query string locale in redux (if set) to persist across sessions
 */
function useActiveLocale() {
  const urlLocale = useUrlLocale();
  const userLocale = useUserLocale();
  return useMemo(() => urlLocale ?? userLocale ?? navigatorLocale() ?? DEFAULT_LOCALE, [urlLocale, userLocale]);
}

export { initialLocale, navigatorLocale, useActiveLocale };
