import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Position } from '@uniswap/v3-sdk';
import { usePool } from './usePools.js';
import { useCurrency } from './Tokens.js';

function useDerivedPositionInfo(positionDetails) {
  var currency0 = useCurrency(positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.token0);
  var currency1 = useCurrency(positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.token1);

  // construct pool data
  var _usePool = usePool(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined, positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.fee),
    _usePool2 = _slicedToArray(_usePool, 2),
    pool = _usePool2[1];
  var position = undefined;
  if (pool && positionDetails) {
    position = new Position({
      pool: pool,
      liquidity: positionDetails.liquidity.toString(),
      tickLower: positionDetails.tickLower,
      tickUpper: positionDetails.tickUpper
    });
  }
  return {
    position: position,
    pool: pool !== null && pool !== void 0 ? pool : undefined
  };
}

export { useDerivedPositionInfo };
