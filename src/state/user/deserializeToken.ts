import { Token } from "@uniswap/sdk-core";

import { SerializedToken } from "./types";

export function deserializeToken(
  serializedToken: SerializedToken,
  Class: typeof Token = Token
): Token {
  return new Class(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  );
}
