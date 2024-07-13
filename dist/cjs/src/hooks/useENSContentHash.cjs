'use strict';

var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');
var safeNamehash = require('../utils/safeNamehash.cjs');
var isZero = require('../utils/isZero.cjs');
var useContract = require('./useContract.cjs');
var reduxMulticall = require('@uniswap/redux-multicall');

/**
 * Does a lookup for an ENS name to find its contenthash.
 */
function useENSContentHash(ensName) {
  var _resolverAddressResul;
  var ensNodeArgument = React.useMemo(function () {
    return [ensName ? safeNamehash.safeNamehash(ensName) : undefined];
  }, [ensName]);
  var registrarContract = useContract.useENSRegistrarContract();
  var resolverAddressResult = multicall.useMainnetSingleCallResult(registrarContract, "resolver", ensNodeArgument, reduxMulticall.NEVER_RELOAD);
  var resolverAddress = (_resolverAddressResul = resolverAddressResult.result) === null || _resolverAddressResul === void 0 ? void 0 : _resolverAddressResul[0];
  var resolverContract = useContract.useENSResolverContract(resolverAddress && isZero(resolverAddress) ? undefined : resolverAddress);
  var contenthash = multicall.useMainnetSingleCallResult(resolverContract, "contenthash", ensNodeArgument, reduxMulticall.NEVER_RELOAD);
  return React.useMemo(function () {
    var _contenthash$result$, _contenthash$result;
    return {
      contenthash: (_contenthash$result$ = (_contenthash$result = contenthash.result) === null || _contenthash$result === void 0 ? void 0 : _contenthash$result[0]) !== null && _contenthash$result$ !== void 0 ? _contenthash$result$ : null,
      loading: resolverAddressResult.loading || contenthash.loading
    };
  }, [contenthash.loading, contenthash.result, resolverAddressResult.loading]);
}

module.exports = useENSContentHash;
