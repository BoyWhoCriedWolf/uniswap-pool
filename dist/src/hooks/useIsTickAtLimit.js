import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { nearestUsableTick, TickMath, TICK_SPACINGS } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import { Bound } from '../state/mint/v3/actions.js';

function useIsTickAtLimit(feeAmount, tickLower, tickUpper) {
  return useMemo(function () {
    return _defineProperty(_defineProperty({}, Bound.LOWER, feeAmount && tickLower ? tickLower === nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]) : undefined), Bound.UPPER, feeAmount && tickUpper ? tickUpper === nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]) : undefined);
  }, [feeAmount, tickLower, tickUpper]);
}

export { useIsTickAtLimit as default };
