import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';

var looksRareApiAddress = "https://api.looksrare.org/api/v1";
var looksRareNonceFetcher = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(address) {
    var res, json;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch("".concat(looksRareApiAddress, "/orders/nonce?address=").concat(address));
        case 2:
          res = _context.sent;
          if (!(res.status !== 200)) {
            _context.next = 6;
            break;
          }
          console.log("LooksRare nonce API errored with status ".concat(res.statusText));
          return _context.abrupt("return");
        case 6:
          _context.next = 8;
          return res.json();
        case 8:
          json = _context.sent;
          return _context.abrupt("return", parseFloat(json.data));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function looksRareNonceFetcher(_x) {
    return _ref.apply(this, arguments);
  };
}();

export { looksRareNonceFetcher };
