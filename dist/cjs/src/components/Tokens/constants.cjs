'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');

var SMALL_MEDIA_BREAKPOINT = "540px";
var MOBILE_MEDIA_BREAKPOINT = "420px";

// includes chains that the backend does not current source off-chain metadata for
[sdkCore.ChainId.BNB, sdkCore.ChainId.AVALANCHE];

exports.MOBILE_MEDIA_BREAKPOINT = MOBILE_MEDIA_BREAKPOINT;
exports.SMALL_MEDIA_BREAKPOINT = SMALL_MEDIA_BREAKPOINT;
