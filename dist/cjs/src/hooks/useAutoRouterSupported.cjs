'use strict';

var core = require('@web3-react/core');
var chains = require('../constants/chains.cjs');

function useAutoRouterSupported() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  return chains.isSupportedChain(chainId);
}

module.exports = useAutoRouterSupported;
