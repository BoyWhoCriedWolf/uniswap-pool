'use strict';

function DarkModeQueryParamReader() {
  return null;
  // const { search } = useLocation();
  // const [, updateMode] = useDarkModeManager();

  // useEffect(() => {
  //   if (!search) return;
  //   if (search.length < 2) return;

  //   const parsed = parse(search, {
  //     parseArrays: false,
  //     ignoreQueryPrefix: true,
  //   });

  //   const theme = parsed.theme;

  //   if (typeof theme !== "string") return;

  //   if (theme.toLowerCase() === "light") {
  //     updateMode(ThemeMode.LIGHT);
  //   } else if (theme.toLowerCase() === "dark") {
  //     updateMode(ThemeMode.DARK);
  //   }
  // }, [search, updateMode]);

  // return null;
}

module.exports = DarkModeQueryParamReader;
