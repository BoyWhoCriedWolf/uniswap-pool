import { useMainnetSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo } from 'react';
import { safeNamehash } from '../utils/safeNamehash.js';
import { isAddress } from '../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import isZero from '../utils/isZero.js';
import { useENSRegistrarContract, useENSResolverContract } from './useContract.js';
import useDebounce from './useDebounce.js';
import useENSAddress from './useENSAddress.js';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
function useENSName(address) {
  var _resolverAddress$resu, _nameCallRes$result;
  var debouncedAddress = useDebounce(address, 200);
  var ensNodeArgument = useMemo(function () {
    if (!debouncedAddress || !isAddress(debouncedAddress)) return [undefined];
    return [safeNamehash("".concat(debouncedAddress.toLowerCase().substr(2), ".addr.reverse"))];
  }, [debouncedAddress]);
  var registrarContract = useENSRegistrarContract();
  var resolverAddress = useMainnetSingleCallResult(registrarContract, "resolver", ensNodeArgument, NEVER_RELOAD);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined);
  var nameCallRes = useMainnetSingleCallResult(resolverContract, "name", ensNodeArgument, NEVER_RELOAD);
  var name = (_nameCallRes$result = nameCallRes.result) === null || _nameCallRes$result === void 0 ? void 0 : _nameCallRes$result[0];

  // ENS does not enforce that an address owns a .eth domain before setting it as a reverse proxy
  // and recommends that you perform a match on the forward resolution
  // see: https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
  var fwdAddr = useENSAddress(name);
  var checkedName = address === (fwdAddr === null || fwdAddr === void 0 ? void 0 : fwdAddr.address) ? name : null;
  var changed = debouncedAddress !== address;
  var loading = changed || resolverAddress.loading || nameCallRes.loading || fwdAddr.loading;
  return useMemo(function () {
    return {
      ENSName: changed ? null : checkedName,
      loading: loading
    };
  }, [changed, checkedName, loading]);
}

export { useENSName as default };
