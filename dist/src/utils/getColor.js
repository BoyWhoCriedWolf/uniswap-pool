import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Buffer } from '../../node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js';
import JPEG from 'jpeg-js';
import PNG from 'png-ts';
import { DEFAULT_COLOR, predefinedTokenColors } from '../constants/tokenColors.js';

function getColor(_x) {
  return _getColor.apply(this, arguments);
}
function _getColor() {
  _getColor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(image) {
    var checkDistance,
      _data$headers$get,
      data,
      buffer,
      arrayBuffer,
      type,
      _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          checkDistance = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
          if (image) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", DEFAULT_COLOR);
        case 3:
          if (!(image in predefinedTokenColors)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", predefinedTokenColors[image]);
        case 5:
          _context.prev = 5;
          _context.next = 8;
          return fetch(image);
        case 8:
          data = _context.sent;
          _context.next = 11;
          return data.arrayBuffer();
        case 11:
          buffer = _context.sent;
          arrayBuffer = Buffer.from(buffer);
          type = (_data$headers$get = data.headers.get("content-type")) !== null && _data$headers$get !== void 0 ? _data$headers$get : "";
          return _context.abrupt("return", getAverageColor(arrayBuffer, type, checkDistance));
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", DEFAULT_COLOR);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 17]]);
  }));
  return _getColor.apply(this, arguments);
}
function getAverageColor(arrayBuffer, type, checkDistance) {
  var pixels;
  switch (type) {
    case "image/png":
      {
        var image = PNG.load(arrayBuffer);
        pixels = image.decode();
        break;
      }
    case "image/jpeg" :
      {
        var jpeg = JPEG.decode(arrayBuffer, {
          useTArray: true
        });
        pixels = jpeg.data;
        break;
      }
    default:
      {
        return DEFAULT_COLOR;
      }
  }
  var pixelCount = pixels.length / 4;
  var transparentPixels = 0;
  var r = 0;
  var g = 0;
  var b = 0;
  for (var i = 0; i < pixelCount; i++) {
    if (pixels[i * 4 + 3] === 0) {
      transparentPixels++;
      continue;
    }
    r += pixels[i * 4];
    g += pixels[i * 4 + 1];
    b += pixels[i * 4 + 2];
  }
  r = Math.floor(r / (pixelCount - transparentPixels));
  g = Math.floor(g / (pixelCount - transparentPixels));
  b = Math.floor(b / (pixelCount - transparentPixels));
  if (checkDistance) {
    var distance = Math.sqrt(Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2));
    if (distance < 50) {
      return DEFAULT_COLOR;
    }
  }
  return [r, g, b];
}

export { getColor };
