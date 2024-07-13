'use strict';

var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');
var safeNamehash = require('../utils/safeNamehash.cjs');
var addresses = require('../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var isZero = require('../utils/isZero.cjs');
var useContract = require('./useContract.cjs');
var useDebounce = require('./useDebounce.cjs');
var useENSAddress = require('./useENSAddress.cjs');
var reduxMulticall = require('@uniswap/redux-multicall');

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
function useENSName(address) {
  var _resolverAddress$resu, _nameCallRes$result;
  var debouncedAddress = useDebounce(address, 200);
  var ensNodeArgument = React.useMemo(function () {
    if (!debouncedAddress || !addresses.isAddress(debouncedAddress)) return [undefined];
    return [safeNamehash.safeNamehash("".concat(debouncedAddress.toLowerCase().substr(2), ".addr.reverse"))];
  }, [debouncedAddress]);
  var registrarContract = useContract.useENSRegistrarContract();
  var resolverAddress = multicall.useMainnetSingleCallResult(registrarContract, "resolver", ensNodeArgument, reduxMulticall.NEVER_RELOAD);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useContract.useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined);
  var nameCallRes = multicall.useMainnetSingleCallResult(resolverContract, "name", ensNodeArgument, reduxMulticall.NEVER_RELOAD);
  var name = (_nameCallRes$result = nameCallRes.result) === null || _nameCallRes$result === void 0 ? void 0 : _nameCallRes$result[0];

  // ENS does not enforce that an address owns a .eth domain before setting it as a reverse proxy
  // and recommends that you perform a match on the forward resolution
  // see: https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
  var fwdAddr = useENSAddress(name);
  var checkedName = address === (fwdAddr === null || fwdAddr === void 0 ? void 0 : fwdAddr.address) ? name : null;
  var changed = debouncedAddress !== address;
  var loading = changed || resolverAddress.loading || nameCallRes.loading || fwdAddr.loading;
  return React.useMemo(function () {
    return {
      ENSName: changed ? null : checkedName,
      loading: loading
    };
  }, [changed, checkedName, loading]);
}

module.exports = useENSName;
