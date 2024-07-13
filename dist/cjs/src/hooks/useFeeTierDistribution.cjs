'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var v3Sdk = require('@uniswap/v3-sdk');
var useBlockNumber = require('../lib/hooks/useBlockNumber.cjs');
var ms = require('ms');
var React = require('react');
var FeeTierDistributionQuery = require('../graphql/thegraph/FeeTierDistributionQuery.cjs');
var usePools = require('./usePools.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

// maximum number of blocks past which we consider the data stale
var MAX_DATA_BLOCK_AGE = 20;
function useFeeTierDistribution(currencyA, currencyB) {
  var _usePoolTVL = usePoolTVL(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped),
    isLoading = _usePoolTVL.isLoading,
    error = _usePoolTVL.error,
    distributions = _usePoolTVL.distributions;

  // fetch all pool states to determine pool state
  var _usePool = usePools.usePool(currencyA, currencyB, v3Sdk.FeeAmount.LOWEST),
    _usePool2 = _slicedToArray__default["default"](_usePool, 1),
    poolStateVeryLow = _usePool2[0];
  var _usePool3 = usePools.usePool(currencyA, currencyB, v3Sdk.FeeAmount.LOW),
    _usePool4 = _slicedToArray__default["default"](_usePool3, 1),
    poolStateLow = _usePool4[0];
  var _usePool5 = usePools.usePool(currencyA, currencyB, v3Sdk.FeeAmount.MEDIUM),
    _usePool6 = _slicedToArray__default["default"](_usePool5, 1),
    poolStateMedium = _usePool6[0];
  var _usePool7 = usePools.usePool(currencyA, currencyB, v3Sdk.FeeAmount.HIGH),
    _usePool8 = _slicedToArray__default["default"](_usePool7, 1),
    poolStateHigh = _usePool8[0];
  return React.useMemo(function () {
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
    var percentages = !isLoading && !error && distributions && poolStateVeryLow !== usePools.PoolState.LOADING && poolStateLow !== usePools.PoolState.LOADING && poolStateMedium !== usePools.PoolState.LOADING && poolStateHigh !== usePools.PoolState.LOADING ? _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, v3Sdk.FeeAmount.LOWEST, poolStateVeryLow === usePools.PoolState.EXISTS ? ((_distributions$FeeAmo = distributions[v3Sdk.FeeAmount.LOWEST]) !== null && _distributions$FeeAmo !== void 0 ? _distributions$FeeAmo : 0) * 100 : undefined), v3Sdk.FeeAmount.LOW, poolStateLow === usePools.PoolState.EXISTS ? ((_distributions$FeeAmo2 = distributions[v3Sdk.FeeAmount.LOW]) !== null && _distributions$FeeAmo2 !== void 0 ? _distributions$FeeAmo2 : 0) * 100 : undefined), v3Sdk.FeeAmount.MEDIUM, poolStateMedium === usePools.PoolState.EXISTS ? ((_distributions$FeeAmo3 = distributions[v3Sdk.FeeAmount.MEDIUM]) !== null && _distributions$FeeAmo3 !== void 0 ? _distributions$FeeAmo3 : 0) * 100 : undefined), v3Sdk.FeeAmount.HIGH, poolStateHigh === usePools.PoolState.EXISTS ? ((_distributions$FeeAmo4 = distributions[v3Sdk.FeeAmount.HIGH]) !== null && _distributions$FeeAmo4 !== void 0 ? _distributions$FeeAmo4 : 0) * 100 : undefined) : undefined;
    return {
      isLoading: isLoading,
      isError: !!error,
      distributions: percentages,
      largestUsageFeeTier: largestUsageFeeTier === -1 ? undefined : largestUsageFeeTier
    };
  }, [isLoading, error, distributions, poolStateVeryLow, poolStateLow, poolStateMedium, poolStateHigh]);
}
function usePoolTVL(token0, token1) {
  var latestBlock = useBlockNumber["default"]();
  var _useFeeTierDistributi = FeeTierDistributionQuery(token0 === null || token0 === void 0 ? void 0 : token0.address, token1 === null || token1 === void 0 ? void 0 : token1.address, ms__default["default"]("30s")),
    isLoading = _useFeeTierDistributi.isLoading,
    error = _useFeeTierDistributi.error,
    data = _useFeeTierDistributi.data;
  var _ref2 = data !== null && data !== void 0 ? data : {},
    asToken0 = _ref2.asToken0,
    asToken1 = _ref2.asToken1,
    _meta = _ref2._meta;
  return React.useMemo(function () {
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
    }, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, v3Sdk.FeeAmount.LOWEST, [undefined, undefined]), v3Sdk.FeeAmount.LOW, [undefined, undefined]), v3Sdk.FeeAmount.MEDIUM, [undefined, undefined]), v3Sdk.FeeAmount.HIGH, [undefined, undefined]));

    // sum total tvl for token0 and token1
    var _Object$values$reduce = Object.values(tvlByFeeTier).reduce(function (acc, value) {
        var _value$, _value$2;
        acc[0] += (_value$ = value[0]) !== null && _value$ !== void 0 ? _value$ : 0;
        acc[1] += (_value$2 = value[1]) !== null && _value$2 !== void 0 ? _value$2 : 0;
        return acc;
      }, [0, 0]),
      _Object$values$reduce2 = _slicedToArray__default["default"](_Object$values$reduce, 2),
      sumToken0Tvl = _Object$values$reduce2[0],
      sumToken1Tvl = _Object$values$reduce2[1];

    // returns undefined if both tvl0 and tvl1 are undefined (pool not created)
    var mean = function mean(tvl0, sumTvl0, tvl1, sumTvl1) {
      return tvl0 === undefined && tvl1 === undefined ? undefined : ((tvl0 !== null && tvl0 !== void 0 ? tvl0 : 0) + (tvl1 !== null && tvl1 !== void 0 ? tvl1 : 0)) / (sumTvl0 + sumTvl1) || 0;
    };
    var distributions = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, v3Sdk.FeeAmount.LOWEST, mean(tvlByFeeTier[v3Sdk.FeeAmount.LOWEST][0], sumToken0Tvl, tvlByFeeTier[v3Sdk.FeeAmount.LOWEST][1], sumToken1Tvl)), v3Sdk.FeeAmount.LOW, mean(tvlByFeeTier[v3Sdk.FeeAmount.LOW][0], sumToken0Tvl, tvlByFeeTier[v3Sdk.FeeAmount.LOW][1], sumToken1Tvl)), v3Sdk.FeeAmount.MEDIUM, mean(tvlByFeeTier[v3Sdk.FeeAmount.MEDIUM][0], sumToken0Tvl, tvlByFeeTier[v3Sdk.FeeAmount.MEDIUM][1], sumToken1Tvl)), v3Sdk.FeeAmount.HIGH, mean(tvlByFeeTier[v3Sdk.FeeAmount.HIGH][0], sumToken0Tvl, tvlByFeeTier[v3Sdk.FeeAmount.HIGH][1], sumToken1Tvl));
    return {
      isLoading: isLoading,
      error: error,
      distributions: distributions
    };
  }, [_meta, asToken0, asToken1, isLoading, error, latestBlock]);
}

exports.useFeeTierDistribution = useFeeTierDistribution;
