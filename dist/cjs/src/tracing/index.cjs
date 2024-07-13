'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Sentry = require('@sentry/react');
var tracing = require('@sentry/tracing');
var analyticsEvents = require('@uniswap/analytics-events');
require('../analytics/index.cjs');
var index = require('../state/index.cjs');
var reducer = require('../state/user/reducer.cjs');
var env = require('../utils/env.cjs');
var uuid = require('uuid');
var errors = require('./errors.cjs');
var analytics = require('@uniswap/analytics');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var Sentry__namespace = /*#__PURE__*/_interopNamespace(Sentry);

var _process$env$REACT_AP;

// Dump some metadata into the window to allow client verification.
window.GIT_COMMIT_HASH = process.env.REACT_APP_GIT_COMMIT_HASH;

// This is used to identify the user in Sentry.
var SENTRY_USER_ID_KEY = "sentry-user-id";

// Actual KEYs are set by proxy servers.
var AMPLITUDE_DUMMY_KEY = "00000000000000000000000000000000";
var STATSIG_DUMMY_KEY = "client-0000000000000000000000000000000000000000000";
Sentry__namespace.init({
  // dsn: process.env.REACT_APP_SENTRY_DSN,
  dsn: "https://a3c62e400b8748b5a8d007150e2f38b7@o1037921.ingest.sentry.io/4504255148851200",
  release: process.env.REACT_APP_GIT_COMMIT_HASH,
  environment: env.getEnvName(),
  enabled: env.isSentryEnabled(),
  tracesSampleRate: Number((_process$env$REACT_AP = process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE) !== null && _process$env$REACT_AP !== void 0 ? _process$env$REACT_AP : 0),
  integrations: [new tracing.BrowserTracing({
    startTransactionOnLocationChange: false,
    startTransactionOnPageLoad: true
  })],
  beforeSend: errors.beforeSend
});
var sentryUserId = localStorage.getItem(SENTRY_USER_ID_KEY);
if (!sentryUserId) {
  localStorage.setItem(SENTRY_USER_ID_KEY, sentryUserId = uuid.v4());
}
Sentry__namespace.setUser({
  id: sentryUserId
});
analytics.initializeAnalytics(AMPLITUDE_DUMMY_KEY, analytics.OriginApplication.INTERFACE, {
  // proxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
  proxyUrl: "https://api.uniswap.org/v1/amplitude-proxy",
  defaultEventName: analyticsEvents.SharedEventName.PAGE_VIEWED,
  commitHash: process.env.REACT_APP_GIT_COMMIT_HASH,
  isProductionEnv: env.isProductionEnv(),
  debug: env.isDevelopmentEnv(),
  reportOriginCountry: function reportOriginCountry(country) {
    return index["default"].dispatch(reducer.setOriginCountry(country));
  }
});

exports.STATSIG_DUMMY_KEY = STATSIG_DUMMY_KEY;
