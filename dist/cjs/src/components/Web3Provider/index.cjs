'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$2 = require('../../analytics/index.cjs');
var index = require('../../connection/index.cjs');
var chains = require('../../constants/chains.cjs');
var providers = require('../../constants/providers.cjs');
var fallbackProvider = require('../../featureFlags/flags/fallbackProvider.cjs');
var traceJsonRpc = require('../../featureFlags/flags/traceJsonRpc.cjs');
var usePrevious = require('../../hooks/usePrevious.cjs');
var hooks = require('../../state/wallets/hooks.cjs');
var walletMeta = require('../../utils/walletMeta.cjs');
var index$1 = require('../../featureFlags/index.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function Web3Provider(_ref) {
  var children = _ref.children;
  var connectors = index.connections.map(function (_ref2) {
    var hooks = _ref2.hooks,
      connector = _ref2.connector;
    return [connector, hooks];
  });
  return /*#__PURE__*/React__default["default"].createElement(core.Web3ReactProvider, {
    connectors: connectors
  }, /*#__PURE__*/React__default["default"].createElement(Updater, null), children);
}

/** A component to run hooks under the Web3ReactProvider context. */
function Updater() {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    connector = _useWeb3React.connector,
    provider = _useWeb3React.provider;
  // const { pathname } = useLocation();
  // const currentPage = getCurrentPageFromLocation(pathname);
  var currentPage = analyticsEvents.InterfacePageName.POOL_PAGE;
  var analyticsContext = analytics.useTrace();
  var providers$1 = fallbackProvider.useFallbackProviderEnabled() ? providers.RPC_PROVIDERS : providers.DEPRECATED_RPC_PROVIDERS;

  // Trace RPC calls (for debugging).
  var networkProvider = chains.isSupportedChain(chainId) ? providers$1[chainId] : undefined;
  var shouldTrace = traceJsonRpc.useTraceJsonRpcFlag() === index$1.BaseVariant.Enabled;
  React.useEffect(function () {
    if (shouldTrace) {
      provider === null || provider === void 0 || provider.on("debug", trace);
      if (provider !== networkProvider) {
        networkProvider === null || networkProvider === void 0 || networkProvider.on("debug", trace);
      }
    }
    return function () {
      provider === null || provider === void 0 || provider.off("debug", trace);
      networkProvider === null || networkProvider === void 0 || networkProvider.off("debug", trace);
    };
  }, [analyticsContext, networkProvider, provider, shouldTrace]);
  var previousConnectedChainId = usePrevious(chainId);
  React.useEffect(function () {
    var chainChanged = previousConnectedChainId && previousConnectedChainId !== chainId;
    if (chainChanged) {
      index$2.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.CHAIN_CHANGED, {
        result: analyticsEvents.WalletConnectionResult.SUCCEEDED,
        wallet_address: account,
        wallet_type: index.getConnection(connector).getName(),
        chain_id: chainId,
        previousConnectedChainId: previousConnectedChainId,
        page: currentPage
      });
    }
  }, [account, chainId, connector, currentPage, previousConnectedChainId]);

  // Send analytics events when the active account changes.
  var previousAccount = usePrevious(account);
  var _useConnectedWallets = hooks.useConnectedWallets(),
    _useConnectedWallets2 = _slicedToArray__default["default"](_useConnectedWallets, 2),
    connectedWallets = _useConnectedWallets2[0],
    addConnectedWallet = _useConnectedWallets2[1];
  React.useEffect(function () {
    if (account && account !== previousAccount) {
      var _getWalletMeta;
      var walletType = index.getConnection(connector).getName();
      var peerWalletAgent = provider ? (_getWalletMeta = walletMeta.getWalletMeta(provider)) === null || _getWalletMeta === void 0 ? void 0 : _getWalletMeta.agent : undefined;
      var isReconnect = connectedWallets.some(function (wallet) {
        return wallet.account === account && wallet.walletType === walletType;
      });
      provider === null || provider === void 0 || provider.send("web3_clientVersion", []).then(function (clientVersion) {
        analytics.user.set(analyticsEvents.CustomUserProperties.WALLET_VERSION, clientVersion);
      })["catch"](function (error) {
        console.warn("Failed to get client version", error);
      });

      // User properties *must* be set before sending corresponding event properties,
      // so that the event contains the correct and up-to-date user properties.
      analytics.user.set(analyticsEvents.CustomUserProperties.WALLET_ADDRESS, account);
      analytics.user.postInsert(analyticsEvents.CustomUserProperties.ALL_WALLET_ADDRESSES_CONNECTED, account);
      analytics.user.set(analyticsEvents.CustomUserProperties.WALLET_TYPE, walletType);
      analytics.user.set(analyticsEvents.CustomUserProperties.PEER_WALLET_AGENT, peerWalletAgent !== null && peerWalletAgent !== void 0 ? peerWalletAgent : "");
      if (chainId) {
        analytics.user.set(analyticsEvents.CustomUserProperties.CHAIN_ID, chainId);
        analytics.user.postInsert(analyticsEvents.CustomUserProperties.ALL_WALLET_CHAIN_IDS, chainId);
      }
      index$2.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WALLET_CONNECTED, {
        result: analyticsEvents.WalletConnectionResult.SUCCEEDED,
        wallet_address: account,
        wallet_type: walletType,
        is_reconnect: isReconnect,
        peer_wallet_agent: peerWalletAgent,
        page: currentPage
      });
      addConnectedWallet({
        account: account,
        walletType: walletType
      });
    }
  }, [account, addConnectedWallet, currentPage, chainId, connectedWallets, connector, previousAccount, provider]);
  return null;
}
function trace(event) {
  if (!(event !== null && event !== void 0 && event.request)) return;
  var _event$request = event.request,
    method = _event$request.method,
    id = _event$request.id,
    params = _event$request.params;
  console.groupCollapsed(method, id);
  console.debug(params);
  console.groupEnd();
}

module.exports = Web3Provider;
