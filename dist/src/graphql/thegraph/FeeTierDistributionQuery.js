import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { useQuery } from '@apollo/client';
import gql from '../../../node_modules/graphql-tag/lib/index.js';
import { useMemo } from 'react';
import { apolloClient } from './apollo.js';

var _templateObject;
var query = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query FeeTierDistribution($token0: String!, $token1: String!) {\n    _meta {\n      block {\n        number\n      }\n    }\n    asToken0: pools(\n      orderBy: totalValueLockedToken0\n      orderDirection: desc\n      where: { token0: $token0, token1: $token1 }\n    ) {\n      feeTier\n      totalValueLockedToken0\n      totalValueLockedToken1\n    }\n    asToken1: pools(\n      orderBy: totalValueLockedToken0\n      orderDirection: desc\n      where: { token0: $token1, token1: $token0 }\n    ) {\n      feeTier\n      totalValueLockedToken0\n      totalValueLockedToken1\n    }\n  }\n"])));
function useFeeTierDistributionQuery(token0, token1, interval) {
  var _useQuery = useQuery(query, {
      variables: {
        token0: token0 === null || token0 === void 0 ? void 0 : token0.toLowerCase(),
        token1: token1 === null || token1 === void 0 ? void 0 : token1.toLowerCase()
      },
      pollInterval: interval,
      client: apolloClient
    }),
    data = _useQuery.data,
    isLoading = _useQuery.loading,
    error = _useQuery.error;
  return useMemo(function () {
    return {
      error: error,
      isLoading: isLoading,
      data: data
    };
  }, [data, error, isLoading]);
}

export { useFeeTierDistributionQuery as default };
