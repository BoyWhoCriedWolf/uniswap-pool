import { useAppSelector } from '../state/hooks.js';

function useStateRehydrated() {
  return useAppSelector(state => state._persist.rehydrated);
}

export { useStateRehydrated };
