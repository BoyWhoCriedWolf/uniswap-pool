import { useMemo } from 'react';
import { isAddress } from '../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import useENSAddress from './useENSAddress.js';
import useENSName from './useENSName.js';

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
function useENS(nameOrAddress) {
  var validated = isAddress(nameOrAddress);
  var reverseLookup = useENSName(validated ? validated : undefined);
  var lookup = useENSAddress(nameOrAddress);
  return useMemo(function () {
    return {
      loading: reverseLookup.loading || lookup.loading,
      address: validated ? validated : lookup.address,
      name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null
    };
  }, [lookup.address, lookup.loading, nameOrAddress, reverseLookup.ENSName, reverseLookup.loading, validated]);
}

export { useENS as default };
