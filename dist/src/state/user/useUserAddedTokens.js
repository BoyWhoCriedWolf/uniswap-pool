import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useAppSelector } from '../hooks.js';
import { deserializeToken } from './deserializeToken.js';
import { UserAddedToken } from '../../types/tokens.js';

function useUserAddedTokensOnChain(chainId) {
  var serializedTokensMap = useAppSelector(function (_ref) {
    var tokens = _ref.user.tokens;
    return tokens;
  });
  return useMemo(function () {
    if (!chainId) return [];
    var tokenMap = serializedTokensMap !== null && serializedTokensMap !== void 0 && serializedTokensMap[chainId] ? Object.values(serializedTokensMap[chainId]).map(function (value) {
      return deserializeToken(value, UserAddedToken);
    }) : [];
    return tokenMap;
  }, [serializedTokensMap, chainId]);
}
function useUserAddedTokens() {
  return useUserAddedTokensOnChain(useWeb3React().chainId);
}

export { useUserAddedTokens };
