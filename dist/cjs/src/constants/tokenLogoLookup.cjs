'use strict';

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../state/index.cjs');
var lists = require('./lists.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var TokenLogoLookupTable = /*#__PURE__*/function () {
  function TokenLogoLookupTable() {
    _classCallCheck__default["default"](this, TokenLogoLookupTable);
    _defineProperty__default["default"](this, "dict", {});
    _defineProperty__default["default"](this, "initialized", false);
  }
  return _createClass__default["default"](TokenLogoLookupTable, [{
    key: "initialize",
    value: function initialize() {
      var dict = {};
      lists.DEFAULT_LIST_OF_LISTS.forEach(function (list) {
        var _listData$current;
        var listData = index["default"].getState().lists.byUrl[list];
        if (!listData) {
          return;
        }
        (_listData$current = listData.current) === null || _listData$current === void 0 || _listData$current.tokens.forEach(function (token) {
          if (token.logoURI) {
            var lowercaseAddress = token.address.toLowerCase();
            var currentEntry = dict[lowercaseAddress + ":" + token.chainId];
            if (currentEntry) {
              currentEntry.push(token.logoURI);
            } else {
              dict[lowercaseAddress + ":" + token.chainId] = [token.logoURI];
            }
          }
        });
      });
      this.dict = dict;
      this.initialized = true;
    }
  }, {
    key: "getIcons",
    value: function getIcons(address) {
      var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      if (!address) return undefined;
      if (!this.initialized) {
        this.initialize();
      }
      return this.dict[address.toLowerCase() + ":" + chainId];
    }
  }]);
}();
var tokenLogoLookup = new TokenLogoLookupTable();

module.exports = tokenLogoLookup;
