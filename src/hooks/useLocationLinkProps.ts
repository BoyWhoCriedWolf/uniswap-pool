import { SupportedLocale } from "constants/locales";
import type { To } from "react-router-dom";

export function useLocationLinkProps(locale: SupportedLocale | null): {
  to?: To;
  onClick?: () => void;
} {
  return {};

  // const location = useLocation();
  // const qs = useParsedQueryString();

  // return useMemo(
  //   () =>
  //     !locale
  //       ? {}
  //       : {
  //           to: {
  //             ...location,
  //             search: stringify({ ...qs, lng: locale }),
  //           },
  //         },
  //   [location, qs, locale]
  // );
}
