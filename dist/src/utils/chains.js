import { getChainInfo, NetworkType } from '../constants/chainInfo.js';

function isL2ChainId(chainId) {
  const chainInfo = getChainInfo(chainId);
  return chainInfo?.networkType === NetworkType.L2;
}

export { isL2ChainId };
