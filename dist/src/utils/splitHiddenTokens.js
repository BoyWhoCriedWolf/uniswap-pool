import { TokenStandard } from '../graphql/data/__generated__/types-and-hooks.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var HIDE_SMALL_USD_BALANCES_THRESHOLD = 1;
function splitHiddenTokens(tokenBalances) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    hideSmallBalances: true
  };
  var visibleTokens = [];
  var hiddenTokens = [];
  var _iterator = _createForOfIteratorHelper(tokenBalances),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _tokenBalance$denomin, _tokenBalance$token, _tokenBalance$tokenPr;
      var tokenBalance = _step.value;
      // if undefined we keep visible (see https://linear.app/uniswap/issue/WEB-1940/[mp]-update-how-we-handle-what-goes-in-hidden-token-section-of-mini)
      var isUndefinedValue = typeof ((_tokenBalance$denomin = tokenBalance.denominatedValue) === null || _tokenBalance$denomin === void 0 ? void 0 : _tokenBalance$denomin.value) === "undefined";
      var shouldHideSmallBalance = (options === null || options === void 0 ? void 0 : options.hideSmallBalances) && !meetsThreshold(tokenBalance) &&
      // if below $1
      ((_tokenBalance$token = tokenBalance.token) === null || _tokenBalance$token === void 0 ? void 0 : _tokenBalance$token.standard) !== TokenStandard.Native; // do not hide native tokens regardless of small balance
      var isSpamToken = (_tokenBalance$tokenPr = tokenBalance.tokenProjectMarket) === null || _tokenBalance$tokenPr === void 0 || (_tokenBalance$tokenPr = _tokenBalance$tokenPr.tokenProject) === null || _tokenBalance$tokenPr === void 0 ? void 0 : _tokenBalance$tokenPr.isSpam;
      if ((isUndefinedValue || !shouldHideSmallBalance) && !isSpamToken) {
        visibleTokens.push(tokenBalance);
      } else {
        hiddenTokens.push(tokenBalance);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    visibleTokens: visibleTokens,
    hiddenTokens: hiddenTokens
  };
}
function meetsThreshold(tokenBalance) {
  var _tokenBalance$denomin2, _tokenBalance$denomin3;
  var value = (_tokenBalance$denomin2 = (_tokenBalance$denomin3 = tokenBalance.denominatedValue) === null || _tokenBalance$denomin3 === void 0 ? void 0 : _tokenBalance$denomin3.value) !== null && _tokenBalance$denomin2 !== void 0 ? _tokenBalance$denomin2 : 0;
  return value > HIDE_SMALL_USD_BALANCES_THRESHOLD;
}

export { splitHiddenTokens };
