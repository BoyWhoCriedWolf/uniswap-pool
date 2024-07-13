import { parse } from 'qs';

function parsedQueryString(search) {
  if (!search) {
    // react-router-dom places search string in the hash
    const hash = window.location.hash;
    search = hash.substr(hash.indexOf("?"));
  }
  return search && search.length > 1 ? parse(search, {
    parseArrays: false,
    ignoreQueryPrefix: true
  }) : {};
}
function useParsedQueryString() {
  return {};
  // const { search } = useLocation();
  // return useMemo(() => parsedQueryString(search), [search]);
}

export { useParsedQueryString as default, parsedQueryString };
