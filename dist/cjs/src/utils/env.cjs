'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isDevelopmentEnv() {
  return process.env.NODE_ENV === "development";
}
function isStagingEnv() {
  // This is set in vercel builds and deploys from releases/staging.
  return Boolean(process.env.REACT_APP_STAGING);
}
function isProductionEnv() {
  return process.env.NODE_ENV === "production" && !isStagingEnv();
}
function isAppUniswapOrg(_ref) {
  var hostname = _ref.hostname;
  return hostname === "app.uniswap.org";
}
function isAppUniswapStagingOrg(_ref2) {
  var hostname = _ref2.hostname;
  return hostname === "app.corn-staging.com";
}
function isSentryEnabled() {
  // Disable in e2e test environments
  if (isStagingEnv() && !isAppUniswapStagingOrg(window.location)) return false;
  if (isProductionEnv() && !isAppUniswapOrg(window.location)) return false;
  return process.env.REACT_APP_SENTRY_ENABLED === "true";
}
function getEnvName() {
  if (isStagingEnv()) {
    return "staging";
  }
  if (isProductionEnv()) {
    return "production";
  }
  return "development";
}

exports.getEnvName = getEnvName;
exports.isAppUniswapOrg = isAppUniswapOrg;
exports.isAppUniswapStagingOrg = isAppUniswapStagingOrg;
exports.isDevelopmentEnv = isDevelopmentEnv;
exports.isProductionEnv = isProductionEnv;
exports.isSentryEnabled = isSentryEnabled;
exports.isStagingEnv = isStagingEnv;
