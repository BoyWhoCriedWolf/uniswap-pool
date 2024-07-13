'use strict';

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _get = require('@babel/runtime/helpers/get');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var properties = require('@ethersproject/properties');
var providers = require('@ethersproject/providers');
var toolkit = require('@reduxjs/toolkit');
var chainInfo = require('../constants/chainInfo.cjs');
var chains = require('../constants/chains.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }
  derived = _getPrototypeOf__default["default"](derived);
  return _possibleConstructorReturn__default["default"](_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf__default["default"](_this).constructor) : derived.apply(_this, args));
}
var AppStaticJsonRpcProvider = /*#__PURE__*/function (_StaticJsonRpcProvide) {
  function AppStaticJsonRpcProvider(chainId, url) {
    var _this2;
    _classCallCheck__default["default"](this, AppStaticJsonRpcProvider);
    // Including networkish allows ethers to skip the initial detectNetwork call.
    _this2 = _callSuper(this, AppStaticJsonRpcProvider, [url, /* networkish= */{
      chainId: chainId,
      name: chains.CHAIN_IDS_TO_NAMES[chainId]
    }]);

    // NB: Third-party providers (eg MetaMask) will have their own polling intervals,
    // which should be left as-is to allow operations (eg transaction confirmation) to resolve faster.
    // Network providers (eg AppStaticJsonRpcProvider) need to update less frequently to be considered responsive.
    _defineProperty__default["default"](_this2, "_blockCache", new Map());
    _this2.pollingInterval = chainInfo.AVERAGE_L1_BLOCK_TIME;
    return _this2;
  }
  _inherits__default["default"](AppStaticJsonRpcProvider, _StaticJsonRpcProvide);
  return _createClass__default["default"](AppStaticJsonRpcProvider, [{
    key: "blockCache",
    get: function get() {
      var _this3 = this;
      // If the blockCache has not yet been initialized this block, do so by
      // setting a listener to clear it on the next block.
      if (!this._blockCache.size) {
        this.once("block", function () {
          return _this3._blockCache.clear();
        });
      }
      return this._blockCache;
    }
  }, {
    key: "send",
    value: function send(method, params) {
      // Only cache eth_call's.
      if (method !== "eth_call") return _get__default["default"](_getPrototypeOf__default["default"](AppStaticJsonRpcProvider.prototype), "send", this).call(this, method, params);

      // Only cache if params are serializable.
      if (!toolkit.isPlain(params)) return _get__default["default"](_getPrototypeOf__default["default"](AppStaticJsonRpcProvider.prototype), "send", this).call(this, method, params);
      var key = "call:".concat(JSON.stringify(params));
      var cached = this.blockCache.get(key);
      if (cached) {
        this.emit("debug", {
          action: "request",
          request: properties.deepCopy({
            method: method,
            params: params,
            id: "cache"
          }),
          provider: this
        });
        return cached;
      }
      var result = _get__default["default"](_getPrototypeOf__default["default"](AppStaticJsonRpcProvider.prototype), "send", this).call(this, method, params);
      this.blockCache.set(key, result);
      return result;
    }
  }]);
}(providers.StaticJsonRpcProvider);

module.exports = AppStaticJsonRpcProvider;
