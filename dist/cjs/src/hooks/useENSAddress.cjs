'use strict';

var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');
var safeNamehash = require('../utils/safeNamehash.cjs');
var isZero = require('../utils/isZero.cjs');
var useContract = require('./useContract.cjs');
var useDebounce = require('./useDebounce.cjs');
var reduxMulticall = require('@uniswap/redux-multicall');

/**
 * Does a lookup for an ENS name to find its address.
 */
function useENSAddress(ensName) {
  var _resolverAddress$resu;
  var debouncedName = useDebounce(ensName, 200);
  var ensNodeArgument = React.useMemo(function () {
    return [debouncedName ? safeNamehash.safeNamehash(debouncedName) : undefined];
  }, [debouncedName]);
  var registrarContract = useContract.useENSRegistrarContract();
  var resolverAddress = multicall.useMainnetSingleCallResult(registrarContract, "resolver", ensNodeArgument, reduxMulticall.NEVER_RELOAD);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useContract.useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined);
  var addr = multicall.useMainnetSingleCallResult(resolverContract, "addr", ensNodeArgument, reduxMulticall.NEVER_RELOAD);
  var changed = debouncedName !== ensName;
  return React.useMemo(function () {
    var _addr$result$, _addr$result;
    return {
      address: changed ? null : (_addr$result$ = (_addr$result = addr.result) === null || _addr$result === void 0 ? void 0 : _addr$result[0]) !== null && _addr$result$ !== void 0 ? _addr$result$ : null,
      loading: changed || resolverAddress.loading || addr.loading
    };
  }, [addr.loading, addr.result, changed, resolverAddress.loading]);
}

module.exports = useENSAddress;
