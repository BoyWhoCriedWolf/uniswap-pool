import { useMainnetSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo } from 'react';
import { safeNamehash } from '../utils/safeNamehash.js';
import isZero from '../utils/isZero.js';
import { useENSRegistrarContract, useENSResolverContract } from './useContract.js';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

/**
 * Does a lookup for an ENS name to find its contenthash.
 */
function useENSContentHash(ensName) {
  var _resolverAddressResul;
  var ensNodeArgument = useMemo(function () {
    return [ensName ? safeNamehash(ensName) : undefined];
  }, [ensName]);
  var registrarContract = useENSRegistrarContract();
  var resolverAddressResult = useMainnetSingleCallResult(registrarContract, "resolver", ensNodeArgument, NEVER_RELOAD);
  var resolverAddress = (_resolverAddressResul = resolverAddressResult.result) === null || _resolverAddressResul === void 0 ? void 0 : _resolverAddressResul[0];
  var resolverContract = useENSResolverContract(resolverAddress && isZero(resolverAddress) ? undefined : resolverAddress);
  var contenthash = useMainnetSingleCallResult(resolverContract, "contenthash", ensNodeArgument, NEVER_RELOAD);
  return useMemo(function () {
    var _contenthash$result$, _contenthash$result;
    return {
      contenthash: (_contenthash$result$ = (_contenthash$result = contenthash.result) === null || _contenthash$result === void 0 ? void 0 : _contenthash$result[0]) !== null && _contenthash$result$ !== void 0 ? _contenthash$result$ : null,
      loading: resolverAddressResult.loading || contenthash.loading
    };
  }, [contenthash.loading, contenthash.result, resolverAddressResult.loading]);
}

export { useENSContentHash as default };
