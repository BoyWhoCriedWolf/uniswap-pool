'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var v3Sdk = require('@uniswap/v3-sdk');

function getTickToPrice(baseToken, quoteToken, tick) {
  if (!baseToken || !quoteToken || typeof tick !== "number") {
    return undefined;
  }
  return v3Sdk.tickToPrice(baseToken, quoteToken, tick);
}

exports.getTickToPrice = getTickToPrice;
