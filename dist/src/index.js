import React__default, { StrictMode } from 'react';
import '@reach/dialog/styles.css';
import './connection/eagerlyConnect.js';
import 'inter-ui';
import './polyfills.js';
import './tracing/index.js';
import { ApolloProvider } from '@apollo/client';
import { FeatureFlagsProvider } from './featureFlags/index.js';
import { apolloClient } from './graphql/data/apollo.js';
import { BlockNumberProvider } from './lib/hooks/useBlockNumber.js';
import { MulticallUpdater } from './lib/state/multicall.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { SystemThemeUpdater, ThemeColorMetaUpdater } from './theme/components/ThemeToggle.js';
import Web3Provider from './components/Web3Provider/index.js';
import { LanguageProvider } from './i18n.js';
import App from './pages/App.js';
import store from './state/index.js';
import Updater$1 from './state/application/updater.js';
import Updater from './state/lists/updater.js';
import Updater$4 from './state/logs/updater.js';
import Updater$3 from './state/signatures/updater.js';
import Updater$2 from './state/transactions/updater.js';
import ThemeProvider, { ThemedGlobalStyle } from './theme/index.js';
import RadialGradientByChainUpdater from './theme/components/RadialGradientByChainUpdater.js';

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
function Updaters() {
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(RadialGradientByChainUpdater, null), /*#__PURE__*/React__default.createElement(Updater, null), /*#__PURE__*/React__default.createElement(SystemThemeUpdater, null), /*#__PURE__*/React__default.createElement(ThemeColorMetaUpdater, null), /*#__PURE__*/React__default.createElement(Updater$1, null), /*#__PURE__*/React__default.createElement(Updater$2, null), /*#__PURE__*/React__default.createElement(Updater$3, null), /*#__PURE__*/React__default.createElement(MulticallUpdater, null), /*#__PURE__*/React__default.createElement(Updater$4, null));
}
const queryClient = new QueryClient();

// const Router = isBrowserRouterEnabled() ? BrowserRouter : HashRouter;

function UniswapWidget() {
  return /*#__PURE__*/React__default.createElement(StrictMode, null, /*#__PURE__*/React__default.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React__default.createElement(FeatureFlagsProvider, null, /*#__PURE__*/React__default.createElement(QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/React__default.createElement(LanguageProvider, null, /*#__PURE__*/React__default.createElement(Web3Provider, null, /*#__PURE__*/React__default.createElement(ApolloProvider, {
    client: apolloClient
  }, /*#__PURE__*/React__default.createElement(BlockNumberProvider, null, /*#__PURE__*/React__default.createElement(Updaters, null), /*#__PURE__*/React__default.createElement(ThemeProvider, null, /*#__PURE__*/React__default.createElement(ThemedGlobalStyle, null), /*#__PURE__*/React__default.createElement(App, null))))))))));
}

// const container = document.getElementById("root") as HTMLElement;

// createRoot(container).render(<UniswapWidget />);

// if (process.env.REACT_APP_SERVICE_WORKER !== "false") {
//   serviceWorkerRegistration.register();
// }

export { UniswapWidget as default };
