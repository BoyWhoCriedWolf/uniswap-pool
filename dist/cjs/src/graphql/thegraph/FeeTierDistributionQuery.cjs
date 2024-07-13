'use strict';

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var Apollo = require('@apollo/client');
var index = require('../../../node_modules/graphql-tag/lib/index.cjs');
var React = require('react');
var apollo = require('./apollo.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);

var _templateObject;
var query = index["default"](_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  query FeeTierDistribution($token0: String!, $token1: String!) {\n    _meta {\n      block {\n        number\n      }\n    }\n    asToken0: pools(\n      orderBy: totalValueLockedToken0\n      orderDirection: desc\n      where: { token0: $token0, token1: $token1 }\n    ) {\n      feeTier\n      totalValueLockedToken0\n      totalValueLockedToken1\n    }\n    asToken1: pools(\n      orderBy: totalValueLockedToken0\n      orderDirection: desc\n      where: { token0: $token1, token1: $token0 }\n    ) {\n      feeTier\n      totalValueLockedToken0\n      totalValueLockedToken1\n    }\n  }\n"])));
function useFeeTierDistributionQuery(token0, token1, interval) {
  var _useQuery = Apollo.useQuery(query, {
      variables: {
        token0: token0 === null || token0 === void 0 ? void 0 : token0.toLowerCase(),
        token1: token1 === null || token1 === void 0 ? void 0 : token1.toLowerCase()
      },
      pollInterval: interval,
      client: apollo.apolloClient
    }),
    data = _useQuery.data,
    isLoading = _useQuery.loading,
    error = _useQuery.error;
  return React.useMemo(function () {
    return {
      error: error,
      isLoading: isLoading,
      data: data
    };
  }, [data, error, isLoading]);
}

module.exports = useFeeTierDistributionQuery;
