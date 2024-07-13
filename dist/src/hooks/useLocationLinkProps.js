// eslint-disable-next-line
function useLocationLinkProps(locale) {
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

export { useLocationLinkProps };
