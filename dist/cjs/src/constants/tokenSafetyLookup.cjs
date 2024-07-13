'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var reducer = require('../state/lists/reducer.cjs');
var lists = require('./lists.cjs');
var routing = require('./routing.cjs');
var broken_tokenlist = require('./tokenLists/broken.tokenlist.cjs');
var tokens = require('./tokens.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var TOKEN_LIST_TYPES = /*#__PURE__*/function (TOKEN_LIST_TYPES) {
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["UNI_DEFAULT"] = 1] = "UNI_DEFAULT";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["UNI_EXTENDED"] = 2] = "UNI_EXTENDED";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["UNKNOWN"] = 3] = "UNKNOWN";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["BLOCKED"] = 4] = "BLOCKED";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["BROKEN"] = 5] = "BROKEN";
  return TOKEN_LIST_TYPES;
}({});
var TokenSafetyLookupTable = /*#__PURE__*/function () {
  function TokenSafetyLookupTable() {
    _classCallCheck__default["default"](this, TokenSafetyLookupTable);
    _defineProperty__default["default"](this, "initialized", false);
    _defineProperty__default["default"](this, "dict", {});
  }
  return _createClass__default["default"](TokenSafetyLookupTable, [{
    key: "update",
    value:
    // TODO(WEB-2488): Index lookups by chainId
    function update(lists$1) {
      var _lists$byUrl$UNI_EXTE,
        _this = this,
        _lists$byUrl$UNI_LIST;
      this.initialized = true;

      // Initialize extended tokens first
      (_lists$byUrl$UNI_EXTE = lists$1.byUrl[lists.UNI_EXTENDED_LIST]) === null || _lists$byUrl$UNI_EXTE === void 0 || (_lists$byUrl$UNI_EXTE = _lists$byUrl$UNI_EXTE.current) === null || _lists$byUrl$UNI_EXTE === void 0 || _lists$byUrl$UNI_EXTE.tokens.forEach(function (token) {
        _this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.UNI_EXTENDED;
      });

      // Initialize default tokens second, so that any tokens on both default and extended will display as default (no warning)
      (_lists$byUrl$UNI_LIST = lists$1.byUrl[lists.UNI_LIST]) === null || _lists$byUrl$UNI_LIST === void 0 || (_lists$byUrl$UNI_LIST = _lists$byUrl$UNI_LIST.current) === null || _lists$byUrl$UNI_LIST === void 0 || _lists$byUrl$UNI_LIST.tokens.forEach(function (token) {
        _this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.UNI_DEFAULT;
      });

      // TODO: Figure out if this list is still relevant
      broken_tokenlist["default"].tokens.forEach(function (token) {
        _this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.BROKEN;
      });

      // Initialize blocked tokens from all urls included
      lists.UNSUPPORTED_LIST_URLS.map(function (url) {
        var _lists$byUrl$url;
        return (_lists$byUrl$url = lists$1.byUrl[url]) === null || _lists$byUrl$url === void 0 || (_lists$byUrl$url = _lists$byUrl$url.current) === null || _lists$byUrl$url === void 0 ? void 0 : _lists$byUrl$url.tokens;
      }).filter(function (x) {
        return !!x;
      }).flat(1).forEach(function (token) {
        _this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.BLOCKED;
      });
    }
  }, {
    key: "checkToken",
    value: function checkToken(address, chainId) {
      var _COMMON_BASES$chainId;
      if (!this.initialized) this.update(reducer.initialState);
      if (address === tokens.NATIVE_CHAIN_ID.toLowerCase()) {
        return TOKEN_LIST_TYPES.UNI_DEFAULT;
      } else if (chainId && (_COMMON_BASES$chainId = routing.COMMON_BASES[chainId]) !== null && _COMMON_BASES$chainId !== void 0 && _COMMON_BASES$chainId.some(function (base) {
        return address === base.wrapped.address.toLowerCase();
      })) {
        return TOKEN_LIST_TYPES.UNI_DEFAULT;
      } else {
        var _this$dict$address;
        return (_this$dict$address = this.dict[address]) !== null && _this$dict$address !== void 0 ? _this$dict$address : TOKEN_LIST_TYPES.UNKNOWN;
      }
    }
  }]);
}();
var TokenSafetyLookupTable$1 = new TokenSafetyLookupTable();

exports.TOKEN_LIST_TYPES = TOKEN_LIST_TYPES;
exports["default"] = TokenSafetyLookupTable$1;
