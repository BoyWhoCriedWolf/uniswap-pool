'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var OSCollectionsFetcher = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref) {
    var params, hasEmptyFields, _i, _Object$values, v, r, walletCollections;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _ref.params;
          hasEmptyFields = false;
          for (_i = 0, _Object$values = Object.values(params); _i < _Object$values.length; _i++) {
            v = _Object$values[_i];
            if (v === undefined) {
              hasEmptyFields = true;
            }
          }
          if (!hasEmptyFields) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", []);
        case 5:
          _context.next = 7;
          return fetch("https://api.opensea.io/api/v1/collections?".concat(new URLSearchParams(params).toString()));
        case 7:
          r = _context.sent;
          _context.next = 10;
          return r.json();
        case 10:
          walletCollections = _context.sent;
          if (!walletCollections) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", walletCollections.filter(function (collection) {
            return collection.primary_asset_contracts.length;
          }).map(function (collection) {
            return {
              address: collection.primary_asset_contracts[0].address,
              name: collection.name,
              image: collection.image_url,
              count: collection.owned_asset_count
            };
          }));
        case 15:
          return _context.abrupt("return", []);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function OSCollectionsFetcher(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.OSCollectionsFetcher = OSCollectionsFetcher;
