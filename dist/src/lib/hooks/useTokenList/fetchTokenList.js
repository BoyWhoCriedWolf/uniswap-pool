import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import contenthashToUri from '../../utils/contenthashToUri.js';
import parseENSAddress from '../../utils/parseENSAddress.js';
import uriToHttp from '../../utils/uriToHttp.js';
import { validateTokenList } from '../../../utils/validateTokenList.js';

var listCache = new Map();

/**
 * Fetches and validates a token list.
 * For a given token list URL, we try to fetch the list from all the possible HTTP URLs.
 * For example, IPFS URLs can be fetched through multiple gateways.
 */
function fetchTokenList(_x, _x2, _x3) {
  return _fetchTokenList.apply(this, arguments);
}
function _fetchTokenList() {
  _fetchTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(listUrl, resolveENSContentHash, skipValidation) {
    var cached, urls, parsedENS, _parsedENS$ensPath, contentHashUri, message, translatedUri, _message, i, url, response, json, list;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cached = listCache === null || listCache === void 0 ? void 0 : listCache.get(listUrl); // avoid spurious re-fetches
          if (!cached) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", cached);
        case 3:
          parsedENS = parseENSAddress(listUrl);
          if (!parsedENS) {
            _context.next = 28;
            break;
          }
          _context.prev = 5;
          _context.next = 8;
          return resolveENSContentHash(parsedENS.ensName);
        case 8:
          contentHashUri = _context.sent;
          _context.next = 16;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          message = "failed to resolve ENS name: ".concat(parsedENS.ensName);
          console.debug(message, _context.t0);
          throw new Error(message);
        case 16:
          _context.prev = 16;
          translatedUri = contenthashToUri(contentHashUri);
          _context.next = 25;
          break;
        case 20:
          _context.prev = 20;
          _context.t1 = _context["catch"](16);
          _message = "failed to translate contenthash to URI: ".concat(contentHashUri);
          console.debug(_message, _context.t1);
          throw new Error(_message);
        case 25:
          urls = uriToHttp("".concat(translatedUri).concat((_parsedENS$ensPath = parsedENS.ensPath) !== null && _parsedENS$ensPath !== void 0 ? _parsedENS$ensPath : ""));
          _context.next = 29;
          break;
        case 28:
          urls = uriToHttp(listUrl);
        case 29:
          if (!(urls.length === 0)) {
            _context.next = 31;
            break;
          }
          throw new Error("Unrecognized list URL protocol.");
        case 31:
          i = 0;
        case 32:
          if (!(i < urls.length)) {
            _context.next = 71;
            break;
          }
          url = urls[i];
          response = void 0;
          _context.prev = 35;
          _context.next = 38;
          return fetch(url, {
            credentials: "omit"
          });
        case 38:
          response = _context.sent;
          _context.next = 45;
          break;
        case 41:
          _context.prev = 41;
          _context.t2 = _context["catch"](35);
          console.debug("failed to fetch list: ".concat(listUrl, " (").concat(url, ")"), _context.t2);
          return _context.abrupt("continue", 68);
        case 45:
          if (response.ok) {
            _context.next = 48;
            break;
          }
          console.debug("failed to fetch list ".concat(listUrl, " (").concat(url, ")"), response.statusText);
          return _context.abrupt("continue", 68);
        case 48:
          _context.prev = 48;
          _context.next = 51;
          return response.json();
        case 51:
          json = _context.sent;
          if (!skipValidation) {
            _context.next = 56;
            break;
          }
          _context.t3 = json;
          _context.next = 59;
          break;
        case 56:
          _context.next = 58;
          return validateTokenList(json);
        case 58:
          _context.t3 = _context.sent;
        case 59:
          list = _context.t3;
          listCache === null || listCache === void 0 || listCache.set(listUrl, list);
          return _context.abrupt("return", list);
        case 64:
          _context.prev = 64;
          _context.t4 = _context["catch"](48);
          console.debug("failed to parse and validate list response: ".concat(listUrl, " (").concat(url, ")"), _context.t4);
          return _context.abrupt("continue", 68);
        case 68:
          i++;
          _context.next = 32;
          break;
        case 71:
          throw new Error("No valid token list found at any URLs derived from ".concat(listUrl, "."));
        case 72:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 11], [16, 20], [35, 41], [48, 64]]);
  }));
  return _fetchTokenList.apply(this, arguments);
}

export { fetchTokenList as default };
