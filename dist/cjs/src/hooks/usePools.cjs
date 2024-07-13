'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var abi = require('@ethersproject/abi');
var sdkCore = require('@uniswap/sdk-core');
var IUniswapV3PoolState = require('../../node_modules/@uniswap/v3-core/artifacts/contracts/interfaces/pool/IUniswapV3PoolState.sol/IUniswapV3PoolState.cjs');
var v3Sdk = require('@uniswap/v3-sdk');
var core = require('@web3-react/core');
var JSBI = require('jsbi');
var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

var POOL_STATE_INTERFACE = new abi.Interface(IUniswapV3PoolState["default"].abi);

// Classes are expensive to instantiate, so this caches the recently instantiated pools.
// This avoids re-instantiating pools as the other pools in the same request are loaded.
var PoolCache = /*#__PURE__*/function () {
  function PoolCache() {
    _classCallCheck__default["default"](this, PoolCache);
  }
  return _createClass__default["default"](PoolCache, null, [{
    key: "getPoolAddress",
    value: function getPoolAddress(factoryAddress, tokenA, tokenB, fee) {
      if (this.addresses.length > this.MAX_ENTRIES) {
        this.addresses = this.addresses.slice(0, this.MAX_ENTRIES / 2);
      }
      var addressA = tokenA.address;
      var addressB = tokenB.address;
      var key = "".concat(factoryAddress, ":").concat(addressA, ":").concat(addressB, ":").concat(fee.toString());
      var found = this.addresses.find(function (address) {
        return address.key === key;
      });
      if (found) return found.address;
      var address = {
        key: key,
        address: v3Sdk.computePoolAddress({
          factoryAddress: factoryAddress,
          tokenA: tokenA,
          tokenB: tokenB,
          fee: fee
        })
      };
      this.addresses.unshift(address);
      return address.address;
    }
  }, {
    key: "getPool",
    value: function getPool(tokenA, tokenB, fee, sqrtPriceX96, liquidity, tick) {
      if (this.pools.length > this.MAX_ENTRIES) {
        this.pools = this.pools.slice(0, this.MAX_ENTRIES / 2);
      }
      var found = this.pools.find(function (pool) {
        return pool.token0 === tokenA && pool.token1 === tokenB && pool.fee === fee && JSBI__default["default"].EQ(pool.sqrtRatioX96, sqrtPriceX96) && JSBI__default["default"].EQ(pool.liquidity, liquidity) && pool.tickCurrent === tick;
      });
      if (found) return found;
      var pool = new v3Sdk.Pool(tokenA, tokenB, fee, sqrtPriceX96, liquidity, tick);
      this.pools.unshift(pool);
      return pool;
    }
  }]);
}();
// Evict after 128 entries. Empirically, a swap uses 64 entries.
_defineProperty__default["default"](PoolCache, "MAX_ENTRIES", 128);
// These are FIFOs, using unshift/pop. This makes recent entries faster to find.
_defineProperty__default["default"](PoolCache, "pools", []);
_defineProperty__default["default"](PoolCache, "addresses", []);
var PoolState = /*#__PURE__*/function (PoolState) {
  PoolState[PoolState["LOADING"] = 0] = "LOADING";
  PoolState[PoolState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
  PoolState[PoolState["EXISTS"] = 2] = "EXISTS";
  PoolState[PoolState["INVALID"] = 3] = "INVALID";
  return PoolState;
}({});
function usePools(poolKeys) {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var poolTokens = React.useMemo(function () {
    if (!chainId) return new Array(poolKeys.length);
    return poolKeys.map(function (_ref) {
      var _ref2 = _slicedToArray__default["default"](_ref, 3),
        currencyA = _ref2[0],
        currencyB = _ref2[1],
        feeAmount = _ref2[2];
      if (currencyA && currencyB && feeAmount) {
        var tokenA = currencyA.wrapped;
        var tokenB = currencyB.wrapped;
        if (tokenA.equals(tokenB)) return undefined;
        return tokenA.sortsBefore(tokenB) ? [tokenA, tokenB, feeAmount] : [tokenB, tokenA, feeAmount];
      }
      return undefined;
    });
  }, [chainId, poolKeys]);
  var poolAddresses = React.useMemo(function () {
    var v3CoreFactoryAddress = chainId && sdkCore.V3_CORE_FACTORY_ADDRESSES[chainId];
    if (!v3CoreFactoryAddress) return new Array(poolTokens.length);
    return poolTokens.map(function (value) {
      return value && PoolCache.getPoolAddress.apply(PoolCache, [v3CoreFactoryAddress].concat(_toConsumableArray__default["default"](value)));
    });
  }, [chainId, poolTokens]);
  var slot0s = multicall.useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, "slot0");
  var liquidities = multicall.useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, "liquidity");
  return React.useMemo(function () {
    return poolKeys.map(function (_key, index) {
      var tokens = poolTokens[index];
      if (!tokens) return [PoolState.INVALID, null];
      var _tokens = _slicedToArray__default["default"](tokens, 3),
        token0 = _tokens[0],
        token1 = _tokens[1],
        fee = _tokens[2];
      if (!slot0s[index]) return [PoolState.INVALID, null];
      var _slot0s$index = slot0s[index],
        slot0 = _slot0s$index.result,
        slot0Loading = _slot0s$index.loading,
        slot0Valid = _slot0s$index.valid;
      if (!liquidities[index]) return [PoolState.INVALID, null];
      var _liquidities$index = liquidities[index],
        liquidity = _liquidities$index.result,
        liquidityLoading = _liquidities$index.loading,
        liquidityValid = _liquidities$index.valid;
      if (!tokens || !slot0Valid || !liquidityValid) return [PoolState.INVALID, null];
      if (slot0Loading || liquidityLoading) return [PoolState.LOADING, null];
      if (!slot0 || !liquidity) return [PoolState.NOT_EXISTS, null];
      if (!slot0.sqrtPriceX96 || slot0.sqrtPriceX96.eq(0)) return [PoolState.NOT_EXISTS, null];
      try {
        var pool = PoolCache.getPool(token0, token1, fee, slot0.sqrtPriceX96, liquidity[0], slot0.tick);
        return [PoolState.EXISTS, pool];
      } catch (error) {
        console.error("Error when constructing the pool", error);
        return [PoolState.NOT_EXISTS, null];
      }
    });
  }, [liquidities, poolKeys, slot0s, poolTokens]);
}
function usePool(currencyA, currencyB, feeAmount) {
  var poolKeys = React.useMemo(function () {
    return [[currencyA, currencyB, feeAmount]];
  }, [currencyA, currencyB, feeAmount]);
  return usePools(poolKeys)[0];
}

exports.PoolState = PoolState;
exports.usePool = usePool;
exports.usePools = usePools;
