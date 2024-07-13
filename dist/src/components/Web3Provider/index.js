import React__default, { useEffect } from 'react';
import { InterfacePageName, WalletConnectionResult, InterfaceEventName, CustomUserProperties } from '@uniswap/analytics-events';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { connections, getConnection } from '../../connection/index.js';
import { isSupportedChain } from '../../constants/chains.js';
import { RPC_PROVIDERS, DEPRECATED_RPC_PROVIDERS } from '../../constants/providers.js';
import { useFallbackProviderEnabled } from '../../featureFlags/flags/fallbackProvider.js';
import { useTraceJsonRpcFlag } from '../../featureFlags/flags/traceJsonRpc.js';
import usePrevious from '../../hooks/usePrevious.js';
import { useConnectedWallets } from '../../state/wallets/hooks.js';
import { getWalletMeta } from '../../utils/walletMeta.js';
import { BaseVariant } from '../../featureFlags/index.js';
import { useTrace, user } from '@uniswap/analytics';

function Web3Provider(_ref) {
  let {
    children
  } = _ref;
  const connectors = connections.map(_ref2 => {
    let {
      hooks,
      connector
    } = _ref2;
    return [connector, hooks];
  });
  return /*#__PURE__*/React__default.createElement(Web3ReactProvider, {
    connectors: connectors
  }, /*#__PURE__*/React__default.createElement(Updater, null), children);
}

/** A component to run hooks under the Web3ReactProvider context. */
function Updater() {
  const {
    account,
    chainId,
    connector,
    provider
  } = useWeb3React();
  // const { pathname } = useLocation();
  // const currentPage = getCurrentPageFromLocation(pathname);
  const currentPage = InterfacePageName.POOL_PAGE;
  const analyticsContext = useTrace();
  const providers = useFallbackProviderEnabled() ? RPC_PROVIDERS : DEPRECATED_RPC_PROVIDERS;

  // Trace RPC calls (for debugging).
  const networkProvider = isSupportedChain(chainId) ? providers[chainId] : undefined;
  const shouldTrace = useTraceJsonRpcFlag() === BaseVariant.Enabled;
  useEffect(() => {
    if (shouldTrace) {
      provider?.on("debug", trace);
      if (provider !== networkProvider) {
        networkProvider?.on("debug", trace);
      }
    }
    return () => {
      provider?.off("debug", trace);
      networkProvider?.off("debug", trace);
    };
  }, [analyticsContext, networkProvider, provider, shouldTrace]);
  const previousConnectedChainId = usePrevious(chainId);
  useEffect(() => {
    const chainChanged = previousConnectedChainId && previousConnectedChainId !== chainId;
    if (chainChanged) {
      sendAnalyticsEvent(InterfaceEventName.CHAIN_CHANGED, {
        result: WalletConnectionResult.SUCCEEDED,
        wallet_address: account,
        wallet_type: getConnection(connector).getName(),
        chain_id: chainId,
        previousConnectedChainId,
        page: currentPage
      });
    }
  }, [account, chainId, connector, currentPage, previousConnectedChainId]);

  // Send analytics events when the active account changes.
  const previousAccount = usePrevious(account);
  const [connectedWallets, addConnectedWallet] = useConnectedWallets();
  useEffect(() => {
    if (account && account !== previousAccount) {
      const walletType = getConnection(connector).getName();
      const peerWalletAgent = provider ? getWalletMeta(provider)?.agent : undefined;
      const isReconnect = connectedWallets.some(wallet => wallet.account === account && wallet.walletType === walletType);
      provider?.send("web3_clientVersion", []).then(clientVersion => {
        user.set(CustomUserProperties.WALLET_VERSION, clientVersion);
      }).catch(error => {
        console.warn("Failed to get client version", error);
      });

      // User properties *must* be set before sending corresponding event properties,
      // so that the event contains the correct and up-to-date user properties.
      user.set(CustomUserProperties.WALLET_ADDRESS, account);
      user.postInsert(CustomUserProperties.ALL_WALLET_ADDRESSES_CONNECTED, account);
      user.set(CustomUserProperties.WALLET_TYPE, walletType);
      user.set(CustomUserProperties.PEER_WALLET_AGENT, peerWalletAgent ?? "");
      if (chainId) {
        user.set(CustomUserProperties.CHAIN_ID, chainId);
        user.postInsert(CustomUserProperties.ALL_WALLET_CHAIN_IDS, chainId);
      }
      sendAnalyticsEvent(InterfaceEventName.WALLET_CONNECTED, {
        result: WalletConnectionResult.SUCCEEDED,
        wallet_address: account,
        wallet_type: walletType,
        is_reconnect: isReconnect,
        peer_wallet_agent: peerWalletAgent,
        page: currentPage
      });
      addConnectedWallet({
        account,
        walletType
      });
    }
  }, [account, addConnectedWallet, currentPage, chainId, connectedWallets, connector, previousAccount, provider]);
  return null;
}
function trace(event) {
  if (!event?.request) return;
  const {
    method,
    id,
    params
  } = event.request;
  console.groupCollapsed(method, id);
  console.debug(params);
  console.groupEnd();
}

export { Web3Provider as default };
