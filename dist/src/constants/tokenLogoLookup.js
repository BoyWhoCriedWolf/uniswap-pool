import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import store from '../state/index.js';
import { DEFAULT_LIST_OF_LISTS } from './lists.js';

var TokenLogoLookupTable = /*#__PURE__*/function () {
  function TokenLogoLookupTable() {
    _classCallCheck(this, TokenLogoLookupTable);
    _defineProperty(this, "dict", {});
    _defineProperty(this, "initialized", false);
  }
  return _createClass(TokenLogoLookupTable, [{
    key: "initialize",
    value: function initialize() {
      var dict = {};
      DEFAULT_LIST_OF_LISTS.forEach(function (list) {
        var _listData$current;
        var listData = store.getState().lists.byUrl[list];
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

export { tokenLogoLookup as default };
