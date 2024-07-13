import { useWeb3React } from '@web3-react/core';
import { asSupportedChain } from '../../constants/chains.js';
import useDebounce from '../../hooks/useDebounce.js';
import useIsWindowVisible from '../../hooks/useIsWindowVisible.js';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks.js';
import { updateChainId } from './reducer.js';

function Updater() {
  const {
    chainId,
    provider
  } = useWeb3React();
  const dispatch = useAppDispatch();
  const windowVisible = useIsWindowVisible();
  const [activeChainId, setActiveChainId] = useState(chainId);
  useEffect(() => {
    if (provider && chainId && windowVisible) {
      setActiveChainId(chainId);
    }
  }, [dispatch, chainId, provider, windowVisible]);
  const debouncedChainId = useDebounce(activeChainId, 100);
  useEffect(() => {
    const chainId = debouncedChainId ? asSupportedChain(debouncedChainId) : null;
    dispatch(updateChainId({
      chainId
    }));
  }, [dispatch, debouncedChainId]);
  return null;
}

export { Updater as default };
