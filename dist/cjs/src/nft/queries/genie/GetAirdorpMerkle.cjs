'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var CollectionRewardsFetcher = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(address) {
    var url, controller, timeoutId, r, data;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // const url = `${process.env.REACT_APP_TEMP_API_URL}/nft/rewards/${address}?category=GENIE_UNISWAP_USDC_AIRDROP`;
          url = "https://temp.api.uniswap.org/v1".concat("/nft/rewards/", address, "?category=GENIE_UNISWAP_USDC_AIRDROP");
          controller = new AbortController();
          timeoutId = setTimeout(function () {
            return controller.abort();
          }, 3000);
          _context.next = 5;
          return fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
        case 5:
          r = _context.sent;
          clearInterval(timeoutId);
          _context.next = 9;
          return r.json();
        case 9:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function CollectionRewardsFetcher(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.CollectionRewardsFetcher = CollectionRewardsFetcher;
