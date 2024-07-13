import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { ChainId } from '@uniswap/sdk-core';
import { DEFAULT_COLOR } from '../constants/tokenColors.js';
import useAssetLogoSource from './useAssetLogoSource.js';
import { rgb } from 'polished';
import { useState, useEffect } from 'react';
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo.js';
import { getColor } from '../utils/getColor.js';

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
  _getColorFromToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(token, primarySrc) {
    var wrappedToken, color, colorArray, _colorArray, _colorArray2;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (token instanceof WrappedTokenInfo) {
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
          return getColor(primarySrc);
        case 8:
          colorArray = _context.sent;
          color = colorArray === DEFAULT_COLOR ? null : convertColorArrayToString(colorArray);
        case 10:
          if (!(!color && wrappedToken.logoURI)) {
            _context.next = 15;
            break;
          }
          _context.next = 13;
          return getColor(wrappedToken.logoURI);
        case 13:
          _colorArray = _context.sent;
          color = _colorArray === DEFAULT_COLOR ? null : convertColorArrayToString(_colorArray);
        case 15:
          if (!(!color && token.chainId === ChainId.MAINNET)) {
            _context.next = 20;
            break;
          }
          _context.next = 18;
          return getColor(URIForEthToken(wrappedToken.address));
        case 18:
          _colorArray2 = _context.sent;
          color = _colorArray2 === DEFAULT_COLOR ? null : convertColorArrayToString(_colorArray2);
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
  var _ref2 = _slicedToArray(_ref, 3),
    red = _ref2[0],
    green = _ref2[1],
    blue = _ref2[2];
  return rgb({
    red: red,
    green: green,
    blue: blue
  });
}
function useColor(token) {
  var _useState = useState("#2172E5"),
    _useState2 = _slicedToArray(_useState, 2),
    color = _useState2[0],
    setColor = _useState2[1];
  var _useTokenLogoSource = useAssetLogoSource(token === null || token === void 0 ? void 0 : token.address, token === null || token === void 0 ? void 0 : token.chainId, token === null || token === void 0 ? void 0 : token.isNative),
    _useTokenLogoSource2 = _slicedToArray(_useTokenLogoSource, 1),
    src = _useTokenLogoSource2[0];
  useEffect(function () {
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

export { useColor };
