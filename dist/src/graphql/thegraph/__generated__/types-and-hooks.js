import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultOptions = {};
var AllV3TicksDocument = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    query AllV3Ticks($poolAddress: String, $skip: Int!) {\n  ticks(\n    first: 1000\n    skip: $skip\n    where: {poolAddress: $poolAddress}\n    orderBy: tickIdx\n  ) {\n    tick: tickIdx\n    liquidityNet\n    price0\n    price1\n  }\n}\n    "])));

/**
 * __useAllV3TicksQuery__
 *
 * To run a query within a React component, call `useAllV3TicksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllV3TicksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllV3TicksQuery({
 *   variables: {
 *      poolAddress: // value for 'poolAddress'
 *      skip: // value for 'skip'
 *   },
 * });
 */
function useAllV3TicksQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(AllV3TicksDocument, options);
}
gql(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    query FeeTierDistribution($token0: String!, $token1: String!) {\n  _meta {\n    block {\n      number\n    }\n  }\n  asToken0: pools(\n    orderBy: totalValueLockedToken0\n    orderDirection: desc\n    where: {token0: $token0, token1: $token1}\n  ) {\n    feeTier\n    totalValueLockedToken0\n    totalValueLockedToken1\n  }\n  asToken1: pools(\n    orderBy: totalValueLockedToken0\n    orderDirection: desc\n    where: {token0: $token1, token1: $token0}\n  ) {\n    feeTier\n    totalValueLockedToken0\n    totalValueLockedToken1\n  }\n}\n    "])));
gql(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    query PoolData($poolId: [ID!], $block: Block_height = null) {\n  pools(\n    where: {id_in: $poolId}\n    block: $block\n    orderBy: totalValueLockedUSD\n    orderDirection: desc\n    subgraphError: allow\n  ) {\n    id\n    feeTier\n    liquidity\n    sqrtPrice\n    tick\n    token0 {\n      id\n      symbol\n      name\n      decimals\n      derivedETH\n    }\n    token1 {\n      id\n      symbol\n      name\n      decimals\n      derivedETH\n    }\n    token0Price\n    token1Price\n    volumeUSD\n    volumeToken0\n    volumeToken1\n    txCount\n    totalValueLockedToken0\n    totalValueLockedToken1\n    totalValueLockedUSD\n  }\n  bundles(where: {id: \"1\"}) {\n    ethPriceUSD\n  }\n}\n    "])));

export { AllV3TicksDocument, useAllV3TicksQuery };
