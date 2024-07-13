'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var createLooksRareOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(payload) {
    var url, res, data;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // const url = `${process.env.REACT_APP_TEMP_API_URL}/nft/createLooksRareOrder`;
          url = "https://temp.api.uniswap.org/v1".concat("/nft/createLooksRareOrder");
          _context.next = 3;
          return fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
        case 3:
          res = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return res.json();
        case 7:
          data = _context.sent;
          return _context.abrupt("return", data.success);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", false);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 11]]);
  }));
  return function createLooksRareOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createLooksRareOrder = createLooksRareOrder;
