'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var analyticsEvents = require('@uniswap/analytics-events');
var index = require('../analytics/index.cjs');
var userAgent = require('./userAgent.cjs');

var APP_STORE_LINK = "https://apps.apple.com/app/apple-store/id6443944476";
var MICROSITE_LINK = "https://wallet.uniswap.org/";
var defaultDownloadAppOptions = {
  appStoreParams: "pt=123625782&ct=In-App-Banners&mt=8"
};

/**
 * Note: openDownloadApp and getDownloadAppLink are equivalent functions, the first just runs imperatively
 * and adds an analytics event, where the other only returns a link. Typically you'll use both:
 *
 * <a href={getDownloadAppLink(options)} onClick={() => openDownloadApp(options)} />
 *
 * This way with JS disabled and when hovering the <a /> you see and nav to the full href properly,
 * but with JS on it will send the analytics event before navigating to the href.
 *
 * I've added a helper `getDownloadAppLinkProps` that unifies this behavior into one thing.
 */

function openDownloadApp() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDownloadAppOptions;
  if (userAgent.isIOS) {
    openAppStore({
      element: options === null || options === void 0 ? void 0 : options.element,
      urlParamString: options === null || options === void 0 ? void 0 : options.appStoreParams
    });
  } else {
    openWalletMicrosite({
      element: options === null || options === void 0 ? void 0 : options.element,
      urlParamString: options === null || options === void 0 ? void 0 : options.microSiteParams
    });
  }
}
var openAppStore = function openAppStore(options) {
  index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.UNISWAP_WALLET_APP_DOWNLOAD_OPENED, {
    element: options === null || options === void 0 ? void 0 : options.element
  });
  window.open(linkWithParams(APP_STORE_LINK, options === null || options === void 0 ? void 0 : options.urlParamString), /* target = */"uniswap_wallet_appstore");
};
var openWalletMicrosite = function openWalletMicrosite(options) {
  index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.UNISWAP_WALLET_MICROSITE_OPENED, {
    element: options === null || options === void 0 ? void 0 : options.element
  });
  window.open(linkWithParams(MICROSITE_LINK, options === null || options === void 0 ? void 0 : options.urlParamString), /* target = */"uniswap_wallet_microsite");
};
var linkWithParams = function linkWithParams(link, params) {
  return link + (params ? "?".concat(params) : "");
};

exports.openDownloadApp = openDownloadApp;
exports.openWalletMicrosite = openWalletMicrosite;
