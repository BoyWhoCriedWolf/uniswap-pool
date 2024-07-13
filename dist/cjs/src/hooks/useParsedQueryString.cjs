'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var qs = require('qs');

function parsedQueryString(search) {
  if (!search) {
    // react-router-dom places search string in the hash
    var hash = window.location.hash;
    search = hash.substr(hash.indexOf("?"));
  }
  return search && search.length > 1 ? qs.parse(search, {
    parseArrays: false,
    ignoreQueryPrefix: true
  }) : {};
}
function useParsedQueryString() {
  return {};
  // const { search } = useLocation();
  // return useMemo(() => parsedQueryString(search), [search]);
}

exports["default"] = useParsedQueryString;
exports.parsedQueryString = parsedQueryString;
