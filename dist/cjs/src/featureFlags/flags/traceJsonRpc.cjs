'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useTraceJsonRpcFlag() {
  return index.useBaseFlag(index.FeatureFlag.traceJsonRpc);
}

exports.TraceJsonRpcVariant = index.BaseVariant;
exports.useTraceJsonRpcFlag = useTraceJsonRpcFlag;
