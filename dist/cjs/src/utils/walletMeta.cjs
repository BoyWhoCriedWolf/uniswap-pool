'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function isWeb3Provider(provider) {
  return "provider" in provider;
}
function isWalletConnectProvider(provider) {
  return provider.isWalletConnect;
}
var WalletType = /*#__PURE__*/function (WalletType) {
  WalletType["WALLET_CONNECT"] = "WalletConnect";
  WalletType["INJECTED"] = "Injected";
  return WalletType;
}({});

/**
 * WalletMeta for WalletConnect or Injected wallets.
 *
 * For WalletConnect wallets, name, description, url, and icons are taken from WalletConnect's peerMeta
 * v1: @see https://docs.walletconnect.com/1.0/specs#session-request
 * v2: @see https://docs.walletconnect.com/2.0/specs/clients/core/pairing/data-structures#metadata
 *
 * For Injected wallets, the name is derived from the `is*` properties on the provider (eg `isCoinbaseWallet`).
 */

function getWalletConnectMeta(provider) {
  var _provider$session;
  var metadata = (_provider$session = provider.session) === null || _provider$session === void 0 ? void 0 : _provider$session.peer.metadata;
  return _objectSpread({
    type: WalletType.WALLET_CONNECT,
    agent: metadata ? "".concat(metadata.name, " (WalletConnect)") : "(WalletConnect)"
  }, metadata);
}
function getInjectedMeta(provider) {
  var _properties$filter$ma;
  var properties = Object.getOwnPropertyNames(provider);
  var names = (_properties$filter$ma = properties.filter(function (name) {
    return name.match(/^is.*$/) && provider[name] === true;
  }).map(function (name) {
    return name.slice(2);
  })) !== null && _properties$filter$ma !== void 0 ? _properties$filter$ma : [];

  // Many wallets spoof MetaMask by setting `isMetaMask` along with their own identifier,
  // so we sort MetaMask last so that these wallets' names come first.
  names.sort(function (a, b) {
    return a === "MetaMask" ? 1 : b === "MetaMask" ? -1 : 0;
  });

  // Coinbase Wallet can be connected through an extension or a QR code, with `qrUrl` as the only differentiator,
  // so we capture `qrUrl` in the agent string.
  if (properties.includes("qrUrl") && provider["qrUrl"]) {
    names.push("qrUrl");
  }
  return {
    type: WalletType.INJECTED,
    agent: [].concat(_toConsumableArray__default["default"](names), ["(Injected)"]).join(" "),
    name: names[0]
    // TODO(WEB-2914): Populate description, url, and icons for known wallets.
  };
}

function getWalletMeta(provider) {
  if (!isWeb3Provider(provider)) return undefined;
  if (isWalletConnectProvider(provider.provider)) {
    return getWalletConnectMeta(provider.provider);
  } else {
    return getInjectedMeta(provider.provider);
  }
}

exports.WalletType = WalletType;
exports.getWalletMeta = getWalletMeta;
