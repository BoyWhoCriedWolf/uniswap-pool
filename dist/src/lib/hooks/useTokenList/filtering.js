import { isAddress } from '../../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';

var alwaysTrue = function alwaysTrue() {
  return true;
};

/** Creates a filter function that filters tokens that do not match the query. */
function getTokenFilter(query) {
  var searchingAddress = isAddress(query);
  if (searchingAddress) {
    var address = searchingAddress.toLowerCase();
    return function (t) {
      return "address" in t && address === t.address.toLowerCase();
    };
  }
  var queryParts = query.toLowerCase().split(/\s+/).filter(function (s) {
    return s.length > 0;
  });
  if (queryParts.length === 0) return alwaysTrue;
  var match = function match(s) {
    var parts = s.toLowerCase().split(/\s+/).filter(function (s) {
      return s.length > 0;
    });
    return queryParts.every(function (p) {
      return p.length === 0 || parts.some(function (sp) {
        return sp.startsWith(p) || sp.endsWith(p);
      });
    });
  };
  return function (_ref) {
    var name = _ref.name,
      symbol = _ref.symbol;
    return Boolean(symbol && match(symbol) || name && match(name));
  };
}

export { getTokenFilter };
