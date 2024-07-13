'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var ms = require('ms');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function PostOpenSeaSellOrder(_x) {
  return _PostOpenSeaSellOrder.apply(this, arguments);
}
function _PostOpenSeaSellOrder() {
  _PostOpenSeaSellOrder = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(payload) {
    var body, url, ac, req, timeout, res, data;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          body = payload ? JSON.stringify(payload) : undefined; // const url = `${process.env.REACT_APP_TEMP_API_URL}/nft/postOpenSeaSellOrderWithApiKey`;
          url = "https://temp.api.uniswap.org/v1".concat("/nft/postOpenSeaSellOrderWithApiKey");
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
          }, ms__default["default"]("60s"));
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
  return _PostOpenSeaSellOrder.apply(this, arguments);
}

exports.PostOpenSeaSellOrder = PostOpenSeaSellOrder;
