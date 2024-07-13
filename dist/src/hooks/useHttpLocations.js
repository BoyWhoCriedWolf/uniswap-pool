import contenthashToUri from '../lib/utils/contenthashToUri.js';
import parseENSAddress from '../lib/utils/parseENSAddress.js';
import uriToHttp from '../lib/utils/uriToHttp.js';
import { useMemo } from 'react';
import useENSContentHash from './useENSContentHash.js';

function useHttpLocations(uri) {
  var ens = useMemo(function () {
    return uri ? parseENSAddress(uri) : undefined;
  }, [uri]);
  var resolvedContentHash = useENSContentHash(ens === null || ens === void 0 ? void 0 : ens.ensName);
  return useMemo(function () {
    if (ens) {
      return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : [];
    } else {
      return uri ? uriToHttp(uri) : [];
    }
  }, [ens, resolvedContentHash.contenthash, uri]);
}

export { useHttpLocations as default };
