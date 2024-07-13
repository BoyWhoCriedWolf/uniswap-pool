import { useBaseFlag, FeatureFlag } from '../index.js';
export { BaseVariant as TraceJsonRpcVariant } from '../index.js';

function useTraceJsonRpcFlag() {
  return useBaseFlag(FeatureFlag.traceJsonRpc);
}

export { useTraceJsonRpcFlag };
