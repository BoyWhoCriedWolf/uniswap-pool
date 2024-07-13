import { useWeb3React } from '@web3-react/core';
import { isSupportedChain } from '../constants/chains.js';

function useAutoRouterSupported() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  return isSupportedChain(chainId);
}

export { useAutoRouterSupported as default };
