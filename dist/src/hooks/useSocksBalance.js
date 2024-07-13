import { Token, ChainId, SOCKS_CONTROLLER_ADDRESSES } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useTokenBalance } from '../lib/hooks/useCurrencyBalance.js';

// technically a 721, not an ERC20, but suffices for our purposes
var SOCKS = new Token(ChainId.MAINNET, SOCKS_CONTROLLER_ADDRESSES[ChainId.MAINNET], 0);
function useHasSocks() {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var balance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId === ChainId.MAINNET ? SOCKS : undefined);
  return useMemo(function () {
    return Boolean(balance === null || balance === void 0 ? void 0 : balance.greaterThan(0));
  }, [balance]);
}

export { useHasSocks };
