'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var sdkCore = require('@uniswap/sdk-core');
var tokenColors = require('../constants/tokenColors.cjs');
var useAssetLogoSource = require('./useAssetLogoSource.cjs');
var polished = require('polished');
var React = require('react');
var wrappedTokenInfo = require('../state/lists/wrappedTokenInfo.cjs');
var getColor = require('../utils/getColor.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function URIForEthToken(address) {
  return "https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/".concat(address, "/logo.png");
}

/**
 * Retrieves the average color from a token's symbol using various sources.
 *
 * @param {Token} token - The token for which to fetch the color.
 * @param {string} primarySrc - Primary source URL for color retrieval (optional).
 *
 * @returns {Promise< | null>} A promise that resolves to a color string or null if color cannot be determined.
 */
function getColorFromToken(_x, _x2) {
  return _getColorFromToken.apply(this, arguments);
}
function _getColorFromToken() {
  _getColorFromToken = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(token, primarySrc) {
    var wrappedToken, color, colorArray, _colorArray, _colorArray2;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (token instanceof wrappedTokenInfo.WrappedTokenInfo) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", null);
        case 2:
          wrappedToken = token;
          color = null;
          _context.prev = 4;
          if (!primarySrc) {
            _context.next = 10;
            break;
          }
          _context.next = 8;
          return getColor.getColor(primarySrc);
        case 8:
          colorArray = _context.sent;
          color = colorArray === tokenColors.DEFAULT_COLOR ? null : convertColorArrayToString(colorArray);
        case 10:
          if (!(!color && wrappedToken.logoURI)) {
            _context.next = 15;
            break;
          }
          _context.next = 13;
          return getColor.getColor(wrappedToken.logoURI);
        case 13:
          _colorArray = _context.sent;
          color = _colorArray === tokenColors.DEFAULT_COLOR ? null : convertColorArrayToString(_colorArray);
        case 15:
          if (!(!color && token.chainId === sdkCore.ChainId.MAINNET)) {
            _context.next = 20;
            break;
          }
          _context.next = 18;
          return getColor.getColor(URIForEthToken(wrappedToken.address));
        case 18:
          _colorArray2 = _context.sent;
          color = _colorArray2 === tokenColors.DEFAULT_COLOR ? null : convertColorArrayToString(_colorArray2);
        case 20:
          return _context.abrupt("return", color);
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          console.warn("Unable to load logoURI (".concat(token.symbol, "): ").concat(primarySrc, ", ").concat(wrappedToken.logoURI));
          return _context.abrupt("return", null);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 23]]);
  }));
  return _getColorFromToken.apply(this, arguments);
}
function convertColorArrayToString(_ref) {
  var _ref2 = _slicedToArray__default["default"](_ref, 3),
    red = _ref2[0],
    green = _ref2[1],
    blue = _ref2[2];
  return polished.rgb({
    red: red,
    green: green,
    blue: blue
  });
}
function useColor(token) {
  var _useState = React.useState("#2172E5"),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    color = _useState2[0],
    setColor = _useState2[1];
  var _useTokenLogoSource = useAssetLogoSource(token === null || token === void 0 ? void 0 : token.address, token === null || token === void 0 ? void 0 : token.chainId, token === null || token === void 0 ? void 0 : token.isNative),
    _useTokenLogoSource2 = _slicedToArray__default["default"](_useTokenLogoSource, 1),
    src = _useTokenLogoSource2[0];
  React.useEffect(function () {
    var stale = false;
    if (token) {
      getColorFromToken(token, src).then(function (tokenColor) {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor);
        }
      });
    }
    return function () {
      stale = true;
      setColor("#2172E5");
    };
  }, [src, token]);
  return color;
}

exports.useColor = useColor;
