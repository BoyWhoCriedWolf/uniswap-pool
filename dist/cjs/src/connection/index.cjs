'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
var coinbaseWallet = require('@web3-react/coinbase-wallet');
var core = require('@web3-react/core');
var gnosisSafe = require('@web3-react/gnosis-safe');
var metamask = require('@web3-react/metamask');
var network = require('@web3-react/network');
var types$1 = require('@web3-react/types');
var gnosis = require('../assets/images/gnosis.cjs');
var logo = require('../assets/svg/logo.cjs');
var coinbaseIcon = require('../assets/wallets/coinbase-icon.cjs');
var uniswapWalletIcon = require('../assets/wallets/uniswap-wallet-icon.cjs');
var walletconnectIcon = require('../assets/wallets/walletconnect-icon.cjs');
var React = require('react');
var userAgent = require('../utils/userAgent.cjs');
var networks = require('../constants/networks.cjs');
var providers = require('../constants/providers.cjs');
var types = require('./types.cjs');
var utils = require('./utils.cjs');
var WalletConnectV2 = require('./WalletConnectV2.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function onError(error) {
  console.debug("web3-react error: ".concat(error));
}
var _initializeConnector = core.initializeConnector(function (actions) {
    return new network.Network({
      actions: actions,
      urlMap: providers.RPC_PROVIDERS,
      defaultChainId: 1
    });
  }),
  _initializeConnector2 = _slicedToArray__default["default"](_initializeConnector, 2),
  web3Network = _initializeConnector2[0],
  web3NetworkHooks = _initializeConnector2[1];
var networkConnection = {
  getName: function getName() {
    return "Network";
  },
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: types.ConnectionType.NETWORK,
  shouldDisplay: function shouldDisplay() {
    return false;
  }
};
var _initializeConnector3 = core.initializeConnector(function (actions) {
    return new network.Network({
      actions: actions,
      urlMap: providers.DEPRECATED_RPC_PROVIDERS,
      defaultChainId: 1
    });
  }),
  _initializeConnector4 = _slicedToArray__default["default"](_initializeConnector3, 2),
  deprecatedWeb3Network = _initializeConnector4[0],
  deprecatedWeb3NetworkHooks = _initializeConnector4[1];
var deprecatedNetworkConnection = {
  getName: function getName() {
    return "Network";
  },
  connector: deprecatedWeb3Network,
  hooks: deprecatedWeb3NetworkHooks,
  type: types.ConnectionType.NETWORK,
  shouldDisplay: function shouldDisplay() {
    return false;
  }
};
var getIsCoinbaseWalletBrowser = function getIsCoinbaseWalletBrowser() {
  return userAgent.isMobile && utils.getIsCoinbaseWallet();
};
var getIsMetaMaskBrowser = function getIsMetaMaskBrowser() {
  return userAgent.isMobile && utils.getIsMetaMaskWallet();
};
var getIsInjectedMobileBrowser = function getIsInjectedMobileBrowser() {
  return getIsCoinbaseWalletBrowser() || getIsMetaMaskBrowser();
};
var getShouldAdvertiseMetaMask = function getShouldAdvertiseMetaMask() {
  return !utils.getIsMetaMaskWallet() && !userAgent.isMobile && (!utils.getIsInjected() || utils.getIsCoinbaseWallet());
};
var getIsGenericInjector = function getIsGenericInjector() {
  return utils.getIsInjected() && !utils.getIsMetaMaskWallet() && !utils.getIsCoinbaseWallet();
};
var _initializeConnector5 = core.initializeConnector(function (actions) {
    return new metamask.MetaMask({
      actions: actions,
      onError: onError
    });
  }),
  _initializeConnector6 = _slicedToArray__default["default"](_initializeConnector5, 2),
  web3Injected = _initializeConnector6[0],
  web3InjectedHooks = _initializeConnector6[1];
var injectedConnection = {
  getName: function getName() {
    return utils.getInjection().name;
  },
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: types.ConnectionType.INJECTED,
  getIcon: function getIcon(isDarkMode) {
    return utils.getInjection(isDarkMode).icon;
  },
  shouldDisplay: function shouldDisplay() {
    return utils.getIsMetaMaskWallet() || getShouldAdvertiseMetaMask() || getIsGenericInjector();
  },
  // If on non-injected, non-mobile browser, prompt user to install Metamask
  overrideActivate: function overrideActivate() {
    if (getShouldAdvertiseMetaMask()) {
      window.open("https://metamask.io/", "inst_metamask");
      return true;
    }
    return false;
  }
};
var _initializeConnector7 = core.initializeConnector(function (actions) {
    return new gnosisSafe.GnosisSafe({
      actions: actions
    });
  }),
  _initializeConnector8 = _slicedToArray__default["default"](_initializeConnector7, 2),
  web3GnosisSafe = _initializeConnector8[0],
  web3GnosisSafeHooks = _initializeConnector8[1];
var gnosisSafeConnection = {
  getName: function getName() {
    return "Gnosis Safe";
  },
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: types.ConnectionType.GNOSIS_SAFE,
  getIcon: function getIcon() {
    return gnosis;
  },
  shouldDisplay: function shouldDisplay() {
    return false;
  }
};
var walletConnectV2Connection = new ( /*#__PURE__*/function () {
  function _class2() {
    var _this = this;
    _classCallCheck__default["default"](this, _class2);
    _defineProperty__default["default"](this, "initializer", function (actions) {
      var defaultChainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sdkCore.ChainId.MAINNET;
      return new WalletConnectV2.WalletConnectV2({
        actions: actions,
        defaultChainId: defaultChainId,
        onError: onError
      });
    });
    _defineProperty__default["default"](this, "type", types.ConnectionType.WALLET_CONNECT_V2);
    _defineProperty__default["default"](this, "getName", function () {
      return "WalletConnect";
    });
    _defineProperty__default["default"](this, "getIcon", function () {
      return walletconnectIcon;
    });
    _defineProperty__default["default"](this, "shouldDisplay", function () {
      return !getIsInjectedMobileBrowser();
    });
    _defineProperty__default["default"](this, "activeConnector", core.initializeConnector(this.initializer));
    // The web3-react Provider requires referentially stable connectors, so we use proxies to allow lazy connections
    // whilst maintaining referential equality.
    _defineProperty__default["default"](this, "proxyConnector", new Proxy({}, {
      get: function get(target, p, receiver) {
        return Reflect.get(_this.activeConnector[0], p, receiver);
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, p) {
        return Reflect.getOwnPropertyDescriptor(_this.activeConnector[0], p);
      },
      getPrototypeOf: function getPrototypeOf() {
        return WalletConnectV2.WalletConnectV2.prototype;
      },
      set: function set(target, p, receiver) {
        return Reflect.set(_this.activeConnector[0], p, receiver);
      }
    }));
    _defineProperty__default["default"](this, "proxyHooks", new Proxy({}, {
      get: function get(target, p, receiver) {
        return function () {
          // Because our connectors are referentially stable (through proxying), we need a way to trigger React renders
          // from outside of the React lifecycle when our connector is re-initialized. This is done via 'change' events
          // with `useSyncExternalStore`:
          var hooks = React.useSyncExternalStore(function (onChange) {
            _this.onActivate = onChange;
            return function () {
              return _this.onActivate = undefined;
            };
          }, function () {
            return _this.activeConnector[1];
          });
          return Reflect.get(hooks, p, receiver)();
        };
      }
    }));
    _defineProperty__default["default"](this, "overrideActivate", function (chainId) {
      var _this$onActivate;
      // Always re-create the connector, so that the chainId is updated.
      _this.activeConnector = core.initializeConnector(function (actions) {
        return _this.initializer(actions, chainId);
      });
      (_this$onActivate = _this.onActivate) === null || _this$onActivate === void 0 || _this$onActivate.call(_this);
      return false;
    });
  }
  return _createClass__default["default"](_class2, [{
    key: "connector",
    get: function get() {
      return this.proxyConnector;
    }
  }, {
    key: "hooks",
    get: function get() {
      return this.proxyHooks;
    }
  }]);
}())();
var _initializeConnector9 = core.initializeConnector(function (actions) {
    return new WalletConnectV2.UniwalletConnect({
      actions: actions,
      onError: onError
    });
  }),
  _initializeConnector10 = _slicedToArray__default["default"](_initializeConnector9, 2),
  web3WCV2UniwalletConnect = _initializeConnector10[0],
  web3WCV2UniwalletConnectHooks = _initializeConnector10[1];
var uniwalletWCV2ConnectConnection = {
  getName: function getName() {
    return "Uniswap Wallet";
  },
  connector: web3WCV2UniwalletConnect,
  hooks: web3WCV2UniwalletConnectHooks,
  type: types.ConnectionType.UNISWAP_WALLET_V2,
  getIcon: function getIcon() {
    return uniswapWalletIcon;
  },
  shouldDisplay: function shouldDisplay() {
    return Boolean(!getIsInjectedMobileBrowser() && !userAgent.isNonIOSPhone);
  }
};
var _initializeConnector11 = core.initializeConnector(function (actions) {
    return new coinbaseWallet.CoinbaseWallet({
      actions: actions,
      options: {
        url: networks.RPC_URLS[sdkCore.ChainId.MAINNET][0],
        appName: "Uniswap",
        appLogoUrl: logo,
        reloadOnDisconnect: false
      },
      onError: onError
    });
  }),
  _initializeConnector12 = _slicedToArray__default["default"](_initializeConnector11, 2),
  web3CoinbaseWallet = _initializeConnector12[0],
  web3CoinbaseWalletHooks = _initializeConnector12[1];
var coinbaseWalletConnection = {
  getName: function getName() {
    return "Coinbase Wallet";
  },
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: types.ConnectionType.COINBASE_WALLET,
  getIcon: function getIcon() {
    return coinbaseIcon;
  },
  shouldDisplay: function shouldDisplay() {
    return Boolean(userAgent.isMobile && !getIsInjectedMobileBrowser() || !userAgent.isMobile || getIsCoinbaseWalletBrowser());
  },
  // If on a mobile browser that isn't the coinbase wallet browser, deeplink to the coinbase wallet app
  overrideActivate: function overrideActivate() {
    if (userAgent.isMobile && !getIsInjectedMobileBrowser()) {
      window.open("https://go.cb-w.com/mtUDhEZPy1", "cbwallet");
      return true;
    }
    return false;
  }
};
var connections = [gnosisSafeConnection, uniwalletWCV2ConnectConnection, injectedConnection, walletConnectV2Connection, coinbaseWalletConnection, networkConnection, deprecatedNetworkConnection];
function getConnection(c) {
  if (c instanceof types$1.Connector) {
    var connection = connections.find(function (connection) {
      return connection.connector === c;
    });
    if (!connection) {
      throw Error("unsupported connector");
    }
    return connection;
  } else {
    switch (c) {
      case types.ConnectionType.INJECTED:
        return injectedConnection;
      case types.ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection;
      case types.ConnectionType.WALLET_CONNECT_V2:
        return walletConnectV2Connection;
      case types.ConnectionType.UNISWAP_WALLET_V2:
        return uniwalletWCV2ConnectConnection;
      case types.ConnectionType.NETWORK:
        return networkConnection;
      case types.ConnectionType.DEPRECATED_NETWORK:
        return deprecatedNetworkConnection;
      case types.ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection;
    }
  }
}

exports.connections = connections;
exports.deprecatedNetworkConnection = deprecatedNetworkConnection;
exports.getConnection = getConnection;
exports.gnosisSafeConnection = gnosisSafeConnection;
exports.injectedConnection = injectedConnection;
exports.networkConnection = networkConnection;
exports.uniwalletWCV2ConnectConnection = uniwalletWCV2ConnectConnection;
exports.walletConnectV2Connection = walletConnectV2Connection;
