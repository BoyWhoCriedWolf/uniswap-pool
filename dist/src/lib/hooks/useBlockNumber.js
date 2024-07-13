import React__default, { useState, useCallback, useEffect, useMemo, createContext, useContext } from 'react';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { RPC_PROVIDERS, DEPRECATED_RPC_PROVIDERS } from '../../constants/providers.js';
import { useFallbackProviderEnabled } from '../../featureFlags/flags/fallbackProvider.js';
import useIsWindowVisible from '../../hooks/useIsWindowVisible.js';

const MISSING_PROVIDER = Symbol();
const BlockNumberContext = /*#__PURE__*/createContext(MISSING_PROVIDER);
function useBlockNumberContext() {
  const blockNumber = useContext(BlockNumberContext);
  if (blockNumber === MISSING_PROVIDER) {
    throw new Error("BlockNumber hooks must be wrapped in a <BlockNumberProvider>");
  }
  return blockNumber;
}
function useFastForwardBlockNumber() {
  return useBlockNumberContext().fastForward;
}

/** Requires that BlockUpdater be installed in the DOM tree. */
function useBlockNumber() {
  return useBlockNumberContext().block;
}
function useMainnetBlockNumber() {
  return useBlockNumberContext().mainnetBlock;
}
function BlockNumberProvider(_ref) {
  let {
    children
  } = _ref;
  const {
    chainId: activeChainId,
    provider
  } = useWeb3React();
  const [{
    chainId,
    block,
    mainnetBlock
  }, setChainBlock] = useState({});
  const activeBlock = chainId === activeChainId ? block : undefined;
  const onChainBlock = useCallback((chainId, block) => {
    setChainBlock(chainBlock => {
      if (chainBlock.chainId === chainId) {
        if (!chainBlock.block || chainBlock.block < block) {
          return {
            chainId,
            block,
            mainnetBlock: chainId === ChainId.MAINNET ? block : chainBlock.mainnetBlock
          };
        }
      } else if (chainId === ChainId.MAINNET) {
        if (!chainBlock.mainnetBlock || chainBlock.mainnetBlock < block) {
          return {
            ...chainBlock,
            mainnetBlock: block
          };
        }
      }
      return chainBlock;
    });
  }, []);
  const windowVisible = useIsWindowVisible();
  useEffect(() => {
    let stale = false;
    if (provider && activeChainId && windowVisible) {
      setChainBlock(chainBlock => {
        // If chainId hasn't changed, don't clear the block. This prevents re-fetching still valid data.
        if (chainBlock.chainId !== activeChainId) {
          return {
            chainId: activeChainId,
            mainnetBlock: chainBlock.mainnetBlock
          };
        }
        return chainBlock;
      });
      provider.getBlockNumber().then(block => {
        if (!stale) onChainBlock(activeChainId, block);
      }).catch(error => {
        console.error(`Failed to get block number for chainId ${activeChainId}`, error);
      });
      const onBlock = block => onChainBlock(activeChainId, block);
      provider.on("block", onBlock);
      return () => {
        stale = true;
        provider.removeListener("block", onBlock);
      };
    }
    return void 0;
  }, [activeChainId, provider, windowVisible, onChainBlock]);
  const networkProviders = useFallbackProviderEnabled() ? RPC_PROVIDERS : DEPRECATED_RPC_PROVIDERS;
  useEffect(() => {
    if (mainnetBlock === undefined) {
      networkProviders[ChainId.MAINNET].getBlockNumber().then(block => {
        onChainBlock(ChainId.MAINNET, block);
      })
      // swallow errors - it's ok if this fails, as we'll try again if we activate mainnet
      .catch(() => undefined);
    }
  }, [mainnetBlock, networkProviders, onChainBlock]);
  const value = useMemo(() => ({
    fastForward: update => {
      if (activeBlock && update > activeBlock) {
        setChainBlock({
          chainId: activeChainId,
          block: update,
          mainnetBlock: activeChainId === ChainId.MAINNET ? update : mainnetBlock
        });
      }
    },
    block: activeBlock,
    mainnetBlock
  }), [activeBlock, activeChainId, mainnetBlock]);
  return /*#__PURE__*/React__default.createElement(BlockNumberContext.Provider, {
    value: value
  }, children);
}

export { BlockNumberProvider, useBlockNumber as default, useFastForwardBlockNumber, useMainnetBlockNumber };
