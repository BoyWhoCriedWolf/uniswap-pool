import { Token } from '@uniswap/sdk-core';

function deserializeToken(serializedToken) {
  var Class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Token;
  return new Class(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}

export { deserializeToken };
