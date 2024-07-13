'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var bignumber = require('@ethersproject/bignumber');
var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');
var useContract = require('./useContract.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useV3PositionsFromTokenIds(tokenIds) {
  var positionManager = useContract.useV3NFTPositionManagerContract();
  var inputs = React.useMemo(function () {
    return tokenIds ? tokenIds.map(function (tokenId) {
      return [bignumber.BigNumber.from(tokenId)];
    }) : [];
  }, [tokenIds]);
  var results = multicall.useSingleContractMultipleData(positionManager, "positions", inputs);
  var loading = React.useMemo(function () {
    return results.some(function (_ref) {
      var loading = _ref.loading;
      return loading;
    });
  }, [results]);
  var error = React.useMemo(function () {
    return results.some(function (_ref2) {
      var error = _ref2.error;
      return error;
    });
  }, [results]);
  var positions = React.useMemo(function () {
    if (!loading && !error && tokenIds) {
      return results.map(function (call, i) {
        var tokenId = tokenIds[i];
        var result = call.result;
        return {
          tokenId: tokenId,
          fee: result.fee,
          feeGrowthInside0LastX128: result.feeGrowthInside0LastX128,
          feeGrowthInside1LastX128: result.feeGrowthInside1LastX128,
          liquidity: result.liquidity,
          nonce: result.nonce,
          operator: result.operator,
          tickLower: result.tickLower,
          tickUpper: result.tickUpper,
          token0: result.token0,
          token1: result.token1,
          tokensOwed0: result.tokensOwed0,
          tokensOwed1: result.tokensOwed1
        };
      });
    }
    return undefined;
  }, [loading, error, results, tokenIds]);
  return {
    loading: loading,
    positions: positions === null || positions === void 0 ? void 0 : positions.map(function (position, i) {
      return _objectSpread(_objectSpread({}, position), {}, {
        tokenId: inputs[i][0]
      });
    })
  };
}
function useV3PositionFromTokenId(tokenId) {
  var _position$positions;
  var position = useV3PositionsFromTokenIds(tokenId ? [tokenId] : undefined);
  return {
    loading: position.loading,
    position: (_position$positions = position.positions) === null || _position$positions === void 0 ? void 0 : _position$positions[0]
  };
}
function useV3Positions(account) {
  var _balanceResult$;
  var positionManager = useContract.useV3NFTPositionManagerContract();
  var _useSingleCallResult = multicall.useSingleCallResult(positionManager, "balanceOf", [account !== null && account !== void 0 ? account : undefined]),
    balanceLoading = _useSingleCallResult.loading,
    balanceResult = _useSingleCallResult.result;

  // we don't expect any account balance to ever exceed the bounds of max safe int
  var accountBalance = balanceResult === null || balanceResult === void 0 || (_balanceResult$ = balanceResult[0]) === null || _balanceResult$ === void 0 ? void 0 : _balanceResult$.toNumber();
  var tokenIdsArgs = React.useMemo(function () {
    if (accountBalance && account) {
      var tokenRequests = [];
      for (var i = 0; i < accountBalance; i++) {
        tokenRequests.push([account, i]);
      }
      return tokenRequests;
    }
    return [];
  }, [account, accountBalance]);
  var tokenIdResults = multicall.useSingleContractMultipleData(positionManager, "tokenOfOwnerByIndex", tokenIdsArgs);
  var someTokenIdsLoading = React.useMemo(function () {
    return tokenIdResults.some(function (_ref3) {
      var loading = _ref3.loading;
      return loading;
    });
  }, [tokenIdResults]);
  var tokenIds = React.useMemo(function () {
    if (account) {
      return tokenIdResults.map(function (_ref4) {
        var result = _ref4.result;
        return result;
      }).filter(function (result) {
        return !!result;
      }).map(function (result) {
        return bignumber.BigNumber.from(result[0]);
      });
    }
    return [];
  }, [account, tokenIdResults]);
  var _useV3PositionsFromTo = useV3PositionsFromTokenIds(tokenIds),
    positions = _useV3PositionsFromTo.positions,
    positionsLoading = _useV3PositionsFromTo.loading;
  return {
    loading: someTokenIdsLoading || balanceLoading || positionsLoading,
    positions: positions
  };
}

exports.useV3PositionFromTokenId = useV3PositionFromTokenId;
exports.useV3Positions = useV3Positions;
