import { useBaseFlag, FeatureFlag } from '../index.js';
export { BaseVariant as DebounceSwapQuoteVariant } from '../index.js';

function useDebounceSwapQuoteFlag() {
  return useBaseFlag(FeatureFlag.debounceSwapQuote);
}

export { useDebounceSwapQuoteFlag };
