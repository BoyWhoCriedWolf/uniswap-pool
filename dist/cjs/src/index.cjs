'use strict';

var React = require('react');
require('@reach/dialog/styles.css');
require('./connection/eagerlyConnect.cjs');
require('inter-ui');
require('./polyfills.cjs');
require('./tracing/index.cjs');
var Apollo = require('@apollo/client');
var index$1 = require('./featureFlags/index.cjs');
var apollo = require('./graphql/data/apollo.cjs');
var useBlockNumber = require('./lib/hooks/useBlockNumber.cjs');
var multicall = require('./lib/state/multicall.cjs');
var reactQuery = require('react-query');
var reactRedux = require('react-redux');
var ThemeToggle = require('./theme/components/ThemeToggle.cjs');
var index$2 = require('./components/Web3Provider/index.cjs');
var i18n = require('./i18n.cjs');
var App = require('./pages/App.cjs');
var index = require('./state/index.cjs');
var updater$1 = require('./state/application/updater.cjs');
var updater = require('./state/lists/updater.cjs');
var updater$4 = require('./state/logs/updater.cjs');
var updater$3 = require('./state/signatures/updater.cjs');
var updater$2 = require('./state/transactions/updater.cjs');
var index$3 = require('./theme/index.cjs');
var RadialGradientByChainUpdater = require('./theme/components/RadialGradientByChainUpdater.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
function Updaters() {
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(RadialGradientByChainUpdater, null), /*#__PURE__*/React__default["default"].createElement(updater, null), /*#__PURE__*/React__default["default"].createElement(ThemeToggle.SystemThemeUpdater, null), /*#__PURE__*/React__default["default"].createElement(ThemeToggle.ThemeColorMetaUpdater, null), /*#__PURE__*/React__default["default"].createElement(updater$1, null), /*#__PURE__*/React__default["default"].createElement(updater$2["default"], null), /*#__PURE__*/React__default["default"].createElement(updater$3, null), /*#__PURE__*/React__default["default"].createElement(multicall.MulticallUpdater, null), /*#__PURE__*/React__default["default"].createElement(updater$4, null));
}
var queryClient = new reactQuery.QueryClient();

// const Router = isBrowserRouterEnabled() ? BrowserRouter : HashRouter;

function UniswapWidget() {
  return /*#__PURE__*/React__default["default"].createElement(React.StrictMode, null, /*#__PURE__*/React__default["default"].createElement(reactRedux.Provider, {
    store: index["default"]
  }, /*#__PURE__*/React__default["default"].createElement(index$1.FeatureFlagsProvider, null, /*#__PURE__*/React__default["default"].createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/React__default["default"].createElement(i18n.LanguageProvider, null, /*#__PURE__*/React__default["default"].createElement(index$2, null, /*#__PURE__*/React__default["default"].createElement(Apollo.ApolloProvider, {
    client: apollo.apolloClient
  }, /*#__PURE__*/React__default["default"].createElement(useBlockNumber.BlockNumberProvider, null, /*#__PURE__*/React__default["default"].createElement(Updaters, null), /*#__PURE__*/React__default["default"].createElement(index$3["default"], null, /*#__PURE__*/React__default["default"].createElement(index$3.ThemedGlobalStyle, null), /*#__PURE__*/React__default["default"].createElement(App, null))))))))));
}

// const container = document.getElementById("root") as HTMLElement;

// createRoot(container).render(<UniswapWidget />);

// if (process.env.REACT_APP_SERVICE_WORKER !== "false") {
//   serviceWorkerRegistration.register();
// }

module.exports = UniswapWidget;
