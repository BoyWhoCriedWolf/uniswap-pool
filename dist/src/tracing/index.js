import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { SharedEventName } from '@uniswap/analytics-events';
import '../analytics/index.js';
import store from '../state/index.js';
import { setOriginCountry } from '../state/user/reducer.js';
import { getEnvName, isSentryEnabled, isProductionEnv, isDevelopmentEnv } from '../utils/env.js';
import { v4 } from 'uuid';
import { beforeSend } from './errors.js';
import { initializeAnalytics, OriginApplication } from '@uniswap/analytics';

// Dump some metadata into the window to allow client verification.
window.GIT_COMMIT_HASH = process.env.REACT_APP_GIT_COMMIT_HASH;

// This is used to identify the user in Sentry.
const SENTRY_USER_ID_KEY = "sentry-user-id";

// Actual KEYs are set by proxy servers.
const AMPLITUDE_DUMMY_KEY = "00000000000000000000000000000000";
const STATSIG_DUMMY_KEY = "client-0000000000000000000000000000000000000000000";
Sentry.init({
  // dsn: process.env.REACT_APP_SENTRY_DSN,
  dsn: "https://a3c62e400b8748b5a8d007150e2f38b7@o1037921.ingest.sentry.io/4504255148851200",
  release: process.env.REACT_APP_GIT_COMMIT_HASH,
  environment: getEnvName(),
  enabled: isSentryEnabled(),
  tracesSampleRate: Number(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE ?? 0),
  integrations: [new BrowserTracing({
    startTransactionOnLocationChange: false,
    startTransactionOnPageLoad: true
  })],
  beforeSend
});
let sentryUserId = localStorage.getItem(SENTRY_USER_ID_KEY);
if (!sentryUserId) {
  localStorage.setItem(SENTRY_USER_ID_KEY, sentryUserId = v4());
}
Sentry.setUser({
  id: sentryUserId
});
initializeAnalytics(AMPLITUDE_DUMMY_KEY, OriginApplication.INTERFACE, {
  // proxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
  proxyUrl: "https://api.uniswap.org/v1/amplitude-proxy",
  defaultEventName: SharedEventName.PAGE_VIEWED,
  commitHash: process.env.REACT_APP_GIT_COMMIT_HASH,
  isProductionEnv: isProductionEnv(),
  debug: isDevelopmentEnv(),
  reportOriginCountry: country => store.dispatch(setOriginCountry(country))
});

export { STATSIG_DUMMY_KEY };
