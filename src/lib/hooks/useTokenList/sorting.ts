import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "@uniswap/token-lists";
import { useMemo } from "react";

/** Sorts currency amounts (descending). */
function balanceComparator(a?: number, b?: number) {
  if (a && b) {
    return a > b ? -1 : a === b ? 0 : 1;
  } else if ((a ?? 0) > 0) {
    return -1;
  } else if ((b ?? 0) > 0) {
    return 1;
  }
  return 0;
}

export type TokenBalances = {
  [tokenAddress: string]: { usdValue: number; balance: number };
};

/** Sorts tokens by currency amount (descending), then safety, then symbol (ascending). */
export function tokenComparator(balances: TokenBalances, a: Token, b: Token) {
  // Sorts by balances
  const balanceComparison = balanceComparator(
    balances[a.address.toLowerCase()]?.usdValue,
    balances[b.address.toLowerCase()]?.usdValue
  );
  if (balanceComparison !== 0) return balanceComparison;

  // Sorts by symbol
  if (a.symbol && b.symbol) {
    return a.symbol.toLowerCase() < b.symbol.toLowerCase() ? -1 : 1;
  }

  return -1;
}

/** Sorts tokens by query, giving precedence to exact matches and partial matches. */
export function useSortTokensByQuery<T extends Token | TokenInfo>(
  query: string,
  tokens?: T[]
): T[] {
  return useMemo(() => {
    if (!tokens) {
      return [];
    }

    const matches = query
      .toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0);

    if (matches.length > 1) {
      return tokens;
    }

    const exactMatches: T[] = [];
    const symbolSubtrings: T[] = [];
    const rest: T[] = [];

    // sort tokens by exact match -> subtring on symbol match -> rest
    const trimmedQuery = query.toLowerCase().trim();
    tokens.map((token) => {
      const symbol = token.symbol?.toLowerCase();
      if (symbol === matches[0]) {
        return exactMatches.push(token);
      } else if (symbol?.startsWith(trimmedQuery)) {
        return symbolSubtrings.push(token);
      } else {
        return rest.push(token);
      }
    });

    return [...exactMatches, ...symbolSubtrings, ...rest];
  }, [tokens, query]);
}
