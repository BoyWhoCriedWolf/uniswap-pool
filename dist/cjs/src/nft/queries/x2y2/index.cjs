'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var X2Y2_TRANSFER_CONTRACT_721 = "0xf849de01b080adc3a814fabe1e2087475cf2e354";
var X2Y2_TRANSFER_CONTRACT_1155 = "0x024ac22acdb367a3ae52a3d94ac6649fdc1f0779";
var newX2Y2Order = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(payload) {
    var body, url, ac, req, timeout, res, data;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          body = JSON.stringify(payload); // const url = `${process.env.REACT_APP_TEMP_API_URL}/nft/postX2Y2SellOrderWithApiKey`;
          url = "https://temp.api.uniswap.org/v1".concat("/nft/postX2Y2SellOrderWithApiKey");
          ac = new AbortController();
          req = new Request(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: body,
            signal: ac.signal
          });
          timeout = setTimeout(function () {
            return ac.abort();
          }, 60 * 1000);
          _context.prev = 5;
          _context.next = 8;
          return fetch(req);
        case 8:
          res = _context.sent;
          _context.next = 11;
          return res.json();
        case 11:
          data = _context.sent;
          return _context.abrupt("return", data.code === 200);
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", false);
        case 18:
          _context.prev = 18;
          clearTimeout(timeout);
          return _context.finish(18);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 15, 18, 21]]);
  }));
  return function newX2Y2Order(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getX2Y2OrderId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(collectionAddress, tokenId) {
    var _data$data;
    var url, r, data;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // const url = `${process.env.REACT_APP_TEMP_API_URL}/nft/getX2Y2OrderId?collectionAddress=${collectionAddress}&tokenId=${tokenId}`;
          url = "https://temp.api.uniswap.org/v1".concat("/nft/getX2Y2OrderId?collectionAddress=", collectionAddress, "&tokenId=").concat(tokenId);
          _context2.next = 3;
          return fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          });
        case 3:
          r = _context2.sent;
          _context2.next = 6;
          return r.json();
        case 6:
          data = _context2.sent;
          return _context2.abrupt("return", data === null || data === void 0 || (_data$data = data.data) === null || _data$data === void 0 || (_data$data = _data$data.data) === null || _data$data === void 0 || (_data$data = _data$data[0]) === null || _data$data === void 0 ? void 0 : _data$data.id);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getX2Y2OrderId(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.X2Y2_TRANSFER_CONTRACT_1155 = X2Y2_TRANSFER_CONTRACT_1155;
exports.X2Y2_TRANSFER_CONTRACT_721 = X2Y2_TRANSFER_CONTRACT_721;
exports.getX2Y2OrderId = getX2Y2OrderId;
exports.newX2Y2Order = newX2Y2Order;
