import { useMemo } from 'react';

/** Sorts currency amounts (descending). */
function balanceComparator(a, b) {
  if (a && b) {
    return a > b ? -1 : a === b ? 0 : 1;
  } else if ((a !== null && a !== void 0 ? a : 0) > 0) {
    return -1;
  } else if ((b !== null && b !== void 0 ? b : 0) > 0) {
    return 1;
  }
  return 0;
}
/** Sorts tokens by currency amount (descending), then safety, then symbol (ascending). */
function tokenComparator(balances, a, b) {
  var _balances$a$address$t, _balances$b$address$t;
  // Sorts by balances
  var balanceComparison = balanceComparator((_balances$a$address$t = balances[a.address.toLowerCase()]) === null || _balances$a$address$t === void 0 ? void 0 : _balances$a$address$t.usdValue, (_balances$b$address$t = balances[b.address.toLowerCase()]) === null || _balances$b$address$t === void 0 ? void 0 : _balances$b$address$t.usdValue);
  if (balanceComparison !== 0) return balanceComparison;

  // Sorts by symbol
  if (a.symbol && b.symbol) {
    return a.symbol.toLowerCase() < b.symbol.toLowerCase() ? -1 : 1;
  }
  return -1;
}

/** Sorts tokens by query, giving precedence to exact matches and partial matches. */
function useSortTokensByQuery(query, tokens) {
  return useMemo(function () {
    if (!tokens) {
      return [];
    }
    var matches = query.toLowerCase().split(/\s+/).filter(function (s) {
      return s.length > 0;
    });
    if (matches.length > 1) {
      return tokens;
    }
    var exactMatches = [];
    var symbolSubtrings = [];
    var rest = [];

    // sort tokens by exact match -> subtring on symbol match -> rest
    var trimmedQuery = query.toLowerCase().trim();
    tokens.map(function (token) {
      var _token$symbol;
      var symbol = (_token$symbol = token.symbol) === null || _token$symbol === void 0 ? void 0 : _token$symbol.toLowerCase();
      if (symbol === matches[0]) {
        return exactMatches.push(token);
      } else if (symbol !== null && symbol !== void 0 && symbol.startsWith(trimmedQuery)) {
        return symbolSubtrings.push(token);
      } else {
        return rest.push(token);
      }
    });
    return [].concat(exactMatches, symbolSubtrings, rest);
  }, [tokens, query]);
}

export { tokenComparator, useSortTokensByQuery };
