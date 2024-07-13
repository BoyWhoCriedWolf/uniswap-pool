import { useMainnetSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo } from 'react';
import { safeNamehash } from '../utils/safeNamehash.js';
import isZero from '../utils/isZero.js';
import { useENSRegistrarContract, useENSResolverContract } from './useContract.js';
import useDebounce from './useDebounce.js';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

/**
 * Does a lookup for an ENS name to find its address.
 */
function useENSAddress(ensName) {
  var _resolverAddress$resu;
  var debouncedName = useDebounce(ensName, 200);
  var ensNodeArgument = useMemo(function () {
    return [debouncedName ? safeNamehash(debouncedName) : undefined];
  }, [debouncedName]);
  var registrarContract = useENSRegistrarContract();
  var resolverAddress = useMainnetSingleCallResult(registrarContract, "resolver", ensNodeArgument, NEVER_RELOAD);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined);
  var addr = useMainnetSingleCallResult(resolverContract, "addr", ensNodeArgument, NEVER_RELOAD);
  var changed = debouncedName !== ensName;
  return useMemo(function () {
    var _addr$result$, _addr$result;
    return {
      address: changed ? null : (_addr$result$ = (_addr$result = addr.result) === null || _addr$result === void 0 ? void 0 : _addr$result[0]) !== null && _addr$result$ !== void 0 ? _addr$result$ : null,
      loading: changed || resolverAddress.loading || addr.loading
    };
  }, [addr.loading, addr.result, changed, resolverAddress.loading]);
}

export { useENSAddress as default };
