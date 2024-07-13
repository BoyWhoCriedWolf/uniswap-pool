import { ChainId } from '@uniswap/sdk-core';

var SMALL_MEDIA_BREAKPOINT = "540px";
var MOBILE_MEDIA_BREAKPOINT = "420px";

// includes chains that the backend does not current source off-chain metadata for
[ChainId.BNB, ChainId.AVALANCHE];

export { MOBILE_MEDIA_BREAKPOINT, SMALL_MEDIA_BREAKPOINT };
