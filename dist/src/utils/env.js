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
  let {
    hostname
  } = _ref;
  return hostname === "app.uniswap.org";
}
function isAppUniswapStagingOrg(_ref2) {
  let {
    hostname
  } = _ref2;
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

export { getEnvName, isAppUniswapOrg, isAppUniswapStagingOrg, isDevelopmentEnv, isProductionEnv, isSentryEnabled, isStagingEnv };
