import { useAtomValue } from 'jotai/utils';
import { shouldDisableNFTRoutesAtom } from '../state/application/atoms.js';

function useDisableNFTRoutes() {
  return useAtomValue(shouldDisableNFTRoutesAtom);
}

export { useDisableNFTRoutes };
