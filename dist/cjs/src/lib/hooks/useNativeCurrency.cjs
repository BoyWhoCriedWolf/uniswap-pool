'use strict';

var sdkCore = require('@uniswap/sdk-core');
var tokens = require('../../constants/tokens.cjs');
var React = require('react');

function useNativeCurrency(chainId) {
  return React.useMemo(function () {
    return chainId ? tokens.nativeOnChain(chainId) :
    // display mainnet when not connected
    tokens.nativeOnChain(sdkCore.ChainId.MAINNET);
  }, [chainId]);
}

module.exports = useNativeCurrency;
