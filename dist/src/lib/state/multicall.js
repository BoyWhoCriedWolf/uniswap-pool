import React__default, { useMemo } from 'react';
import { createMulticall } from '@uniswap/redux-multicall';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { useInterfaceMulticall, useMainnetInterfaceMulticall } from '../../hooks/useContract.js';
import useBlockNumber, { useMainnetBlockNumber } from '../hooks/useBlockNumber.js';

const multicall = createMulticall();

/**
 *
 * @param chainId
 * @returns The approximate whole number of blocks written to the corresponding chainId per Ethereum mainnet epoch.
 */
function getBlocksPerFetchForChainId(chainId) {
  // TODO(WEB-2437): See if these numbers need to be updated
  switch (chainId) {
    case ChainId.ARBITRUM_ONE:
    case ChainId.OPTIMISM:
      return 15;
    case ChainId.AVALANCHE:
    case ChainId.BNB:
    case ChainId.CELO:
    case ChainId.CELO_ALFAJORES:
      return 5;
    default:
      return 1;
  }
}
function MulticallUpdater() {
  const {
    chainId
  } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const latestMainnetBlockNumber = useMainnetBlockNumber();
  const contract = useInterfaceMulticall();
  const mainnetContract = useMainnetInterfaceMulticall();
  const listenerOptions = useMemo(() => ({
    blocksPerFetch: getBlocksPerFetchForChainId(chainId)
  }), [chainId]);
  const mainnetListener = useMemo(() => ({
    blocksPerFetch: getBlocksPerFetchForChainId(ChainId.MAINNET)
  }), []);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(multicall.Updater, {
    chainId: ChainId.MAINNET,
    latestBlockNumber: latestMainnetBlockNumber,
    contract: mainnetContract,
    listenerOptions: mainnetListener
  }), chainId !== ChainId.MAINNET && /*#__PURE__*/React__default.createElement(multicall.Updater, {
    chainId: chainId,
    latestBlockNumber: latestBlockNumber,
    contract: contract,
    listenerOptions: listenerOptions
  }));
}

export { MulticallUpdater, multicall as default };
