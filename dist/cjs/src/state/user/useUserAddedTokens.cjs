'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@web3-react/core');
var React = require('react');
var hooks = require('../hooks.cjs');
var deserializeToken = require('./deserializeToken.cjs');
var tokens = require('../../types/tokens.cjs');

function useUserAddedTokensOnChain(chainId) {
  var serializedTokensMap = hooks.useAppSelector(function (_ref) {
    var tokens = _ref.user.tokens;
    return tokens;
  });
  return React.useMemo(function () {
    if (!chainId) return [];
    var tokenMap = serializedTokensMap !== null && serializedTokensMap !== void 0 && serializedTokensMap[chainId] ? Object.values(serializedTokensMap[chainId]).map(function (value) {
      return deserializeToken.deserializeToken(value, tokens.UserAddedToken);
    }) : [];
    return tokenMap;
  }, [serializedTokensMap, chainId]);
}
function useUserAddedTokens() {
  return useUserAddedTokensOnChain(core.useWeb3React().chainId);
}

exports.useUserAddedTokens = useUserAddedTokens;
