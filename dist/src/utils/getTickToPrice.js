import { tickToPrice } from '@uniswap/v3-sdk';

function getTickToPrice(baseToken, quoteToken, tick) {
  if (!baseToken || !quoteToken || typeof tick !== "number") {
    return undefined;
  }
  return tickToPrice(baseToken, quoteToken, tick);
}

export { getTickToPrice };
