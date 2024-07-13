import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { FeeAmount } from '@uniswap/v3-sdk';
import useBlockNumber from '../lib/hooks/useBlockNumber.js';
import ms from 'ms';
import { useMemo } from 'react';
import useFeeTierDistributionQuery from '../graphql/thegraph/FeeTierDistributionQuery.js';
import { usePool, PoolState } from './usePools.js';

// maximum number of blocks past which we consider the data stale
var MAX_DATA_BLOCK_AGE = 20;
function useFeeTierDistribution(currencyA, currencyB) {
  var _usePoolTVL = usePoolTVL(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped),
    isLoading = _usePoolTVL.isLoading,
    error = _usePoolTVL.error,
    distributions = _usePoolTVL.distributions;

  // fetch all pool states to determine pool state
  var _usePool = usePool(currencyA, currencyB, FeeAmount.LOWEST),
    _usePool2 = _slicedToArray(_usePool, 1),
    poolStateVeryLow = _usePool2[0];
  var _usePool3 = usePool(currencyA, currencyB, FeeAmount.LOW),
    _usePool4 = _slicedToArray(_usePool3, 1),
    poolStateLow = _usePool4[0];
  var _usePool5 = usePool(currencyA, currencyB, FeeAmount.MEDIUM),
    _usePool6 = _slicedToArray(_usePool5, 1),
    poolStateMedium = _usePool6[0];
  var _usePool7 = usePool(currencyA, currencyB, FeeAmount.HIGH),
    _usePool8 = _slicedToArray(_usePool7, 1),
    poolStateHigh = _usePool8[0];
  return useMemo(function () {
    var _distributions$FeeAmo, _distributions$FeeAmo2, _distributions$FeeAmo3, _distributions$FeeAmo4;
    if (isLoading || error || !distributions) {
      return {
        isLoading: isLoading,
        isError: !!error,
        distributions: distributions
      };
    }
    var largestUsageFeeTier = Object.keys(distributions).map(function (d) {
      return Number(d);
    }).filter(function (d) {
      return distributions[d] !== 0 && distributions[d] !== undefined;
    }).reduce(function (a, b) {
      var _distributions$a, _distributions$b;
      return ((_distributions$a = distributions[a]) !== null && _distributions$a !== void 0 ? _distributions$a : 0) > ((_distributions$b = distributions[b]) !== null && _distributions$b !== void 0 ? _distributions$b : 0) ? a : b;
    }, -1);
    var percentages = !isLoading && !error && distributions && poolStateVeryLow !== PoolState.LOADING && poolStateLow !== PoolState.LOADING && poolStateMedium !== PoolState.LOADING && poolStateHigh !== PoolState.LOADING ? _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, FeeAmount.LOWEST, poolStateVeryLow === PoolState.EXISTS ? ((_distributions$FeeAmo = distributions[FeeAmount.LOWEST]) !== null && _distributions$FeeAmo !== void 0 ? _distributions$FeeAmo : 0) * 100 : undefined), FeeAmount.LOW, poolStateLow === PoolState.EXISTS ? ((_distributions$FeeAmo2 = distributions[FeeAmount.LOW]) !== null && _distributions$FeeAmo2 !== void 0 ? _distributions$FeeAmo2 : 0) * 100 : undefined), FeeAmount.MEDIUM, poolStateMedium === PoolState.EXISTS ? ((_distributions$FeeAmo3 = distributions[FeeAmount.MEDIUM]) !== null && _distributions$FeeAmo3 !== void 0 ? _distributions$FeeAmo3 : 0) * 100 : undefined), FeeAmount.HIGH, poolStateHigh === PoolState.EXISTS ? ((_distributions$FeeAmo4 = distributions[FeeAmount.HIGH]) !== null && _distributions$FeeAmo4 !== void 0 ? _distributions$FeeAmo4 : 0) * 100 : undefined) : undefined;
    return {
      isLoading: isLoading,
      isError: !!error,
      distributions: percentages,
      largestUsageFeeTier: largestUsageFeeTier === -1 ? undefined : largestUsageFeeTier
    };
  }, [isLoading, error, distributions, poolStateVeryLow, poolStateLow, poolStateMedium, poolStateHigh]);
}
function usePoolTVL(token0, token1) {
  var latestBlock = useBlockNumber();
  var _useFeeTierDistributi = useFeeTierDistributionQuery(token0 === null || token0 === void 0 ? void 0 : token0.address, token1 === null || token1 === void 0 ? void 0 : token1.address, ms("30s")),
    isLoading = _useFeeTierDistributi.isLoading,
    error = _useFeeTierDistributi.error,
    data = _useFeeTierDistributi.data;
  var _ref2 = data !== null && data !== void 0 ? data : {},
    asToken0 = _ref2.asToken0,
    asToken1 = _ref2.asToken1,
    _meta = _ref2._meta;
  return useMemo(function () {
    var _meta$block$number, _meta$block;
    if (!latestBlock || !_meta || !asToken0 || !asToken1) {
      return {
        isLoading: isLoading,
        error: error
      };
    }
    if (latestBlock - ((_meta$block$number = _meta === null || _meta === void 0 || (_meta$block = _meta.block) === null || _meta$block === void 0 ? void 0 : _meta$block.number) !== null && _meta$block$number !== void 0 ? _meta$block$number : 0) > MAX_DATA_BLOCK_AGE) {
      console.log("Graph stale (latest block: ".concat(latestBlock, ")"));
      return {
        isLoading: isLoading,
        error: error
      };
    }
    var all = asToken0.concat(asToken1);

    // sum tvl for token0 and token1 by fee tier
    var tvlByFeeTier = all.reduce(function (acc, value) {
      var _acc$value$feeTier$, _acc$value$feeTier$2;
      acc[value.feeTier][0] = ((_acc$value$feeTier$ = acc[value.feeTier][0]) !== null && _acc$value$feeTier$ !== void 0 ? _acc$value$feeTier$ : 0) + Number(value.totalValueLockedToken0);
      acc[value.feeTier][1] = ((_acc$value$feeTier$2 = acc[value.feeTier][1]) !== null && _acc$value$feeTier$2 !== void 0 ? _acc$value$feeTier$2 : 0) + Number(value.totalValueLockedToken1);
      return acc;
    }, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, FeeAmount.LOWEST, [undefined, undefined]), FeeAmount.LOW, [undefined, undefined]), FeeAmount.MEDIUM, [undefined, undefined]), FeeAmount.HIGH, [undefined, undefined]));

    // sum total tvl for token0 and token1
    var _Object$values$reduce = Object.values(tvlByFeeTier).reduce(function (acc, value) {
        var _value$, _value$2;
        acc[0] += (_value$ = value[0]) !== null && _value$ !== void 0 ? _value$ : 0;
        acc[1] += (_value$2 = value[1]) !== null && _value$2 !== void 0 ? _value$2 : 0;
        return acc;
      }, [0, 0]),
      _Object$values$reduce2 = _slicedToArray(_Object$values$reduce, 2),
      sumToken0Tvl = _Object$values$reduce2[0],
      sumToken1Tvl = _Object$values$reduce2[1];

    // returns undefined if both tvl0 and tvl1 are undefined (pool not created)
    var mean = function mean(tvl0, sumTvl0, tvl1, sumTvl1) {
      return tvl0 === undefined && tvl1 === undefined ? undefined : ((tvl0 !== null && tvl0 !== void 0 ? tvl0 : 0) + (tvl1 !== null && tvl1 !== void 0 ? tvl1 : 0)) / (sumTvl0 + sumTvl1) || 0;
    };
    var distributions = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, FeeAmount.LOWEST, mean(tvlByFeeTier[FeeAmount.LOWEST][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.LOWEST][1], sumToken1Tvl)), FeeAmount.LOW, mean(tvlByFeeTier[FeeAmount.LOW][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.LOW][1], sumToken1Tvl)), FeeAmount.MEDIUM, mean(tvlByFeeTier[FeeAmount.MEDIUM][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.MEDIUM][1], sumToken1Tvl)), FeeAmount.HIGH, mean(tvlByFeeTier[FeeAmount.HIGH][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.HIGH][1], sumToken1Tvl));
    return {
      isLoading: isLoading,
      error: error,
      distributions: distributions
    };
  }, [_meta, asToken0, asToken1, isLoading, error, latestBlock]);
}

export { useFeeTierDistribution };
