import "@reach/dialog/styles.css";
import "connection/eagerlyConnect";
import "inter-ui";
import "polyfills";
import "tracing";

import "./index.css"

import { ApolloProvider } from "@apollo/client";
import { FeatureFlagsProvider } from "featureFlags";
import { apolloClient } from "graphql/data/apollo";
import { BlockNumberProvider } from "lib/hooks/useBlockNumber";
import { MulticallUpdater } from "lib/state/multicall";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import {
  SystemThemeUpdater,
  ThemeColorMetaUpdater,
} from "theme/components/ThemeToggle";

import Web3Provider from "./components/Web3Provider";
import { LanguageProvider } from "./i18n";
import App from "./pages/App";
import store from "./state";
import ApplicationUpdater from "./state/application/updater";
import ListsUpdater from "./state/lists/updater";
import LogsUpdater from "./state/logs/updater";
import OrderUpdater from "./state/signatures/updater";
import TransactionUpdater from "./state/transactions/updater";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";
import RadialGradientByChainUpdater from "./theme/components/RadialGradientByChainUpdater";
import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updaters() {
  return (
    <>
      <RadialGradientByChainUpdater />
      <ListsUpdater />
      <SystemThemeUpdater />
      <ThemeColorMetaUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <OrderUpdater />
      <MulticallUpdater />
      <LogsUpdater />
    </>
  );
}

const queryClient = new QueryClient();

// const Router = isBrowserRouterEnabled() ? BrowserRouter : HashRouter;

export default function UniswapWidget() {
  return (
    <StrictMode>
      <Provider store={store}>
        <FeatureFlagsProvider>
          <QueryClientProvider client={queryClient}>
            {/* <Router> */}
            <LanguageProvider>
              <Web3Provider>
                <ApolloProvider client={apolloClient}>
                  <BlockNumberProvider>
                    <Updaters />
                    <ThemeProvider>
                      <ThemedGlobalStyle />
                      <App />
                    </ThemeProvider>
                  </BlockNumberProvider>
                </ApolloProvider>
              </Web3Provider>
            </LanguageProvider>
            {/* </Router> */}
          </QueryClientProvider>
        </FeatureFlagsProvider>
      </Provider>
    </StrictMode>
  );
}

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(<UniswapWidget />);

if (process.env.REACT_APP_SERVICE_WORKER !== "false") {
  serviceWorkerRegistration.register();
}
