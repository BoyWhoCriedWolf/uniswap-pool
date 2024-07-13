'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CID = require('cids');
var multicodec = require('multicodec');
var multihashes = require('multihashes');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CID__default = /*#__PURE__*/_interopDefaultLegacy(CID);

function hexToUint8Array(hex) {
  hex = hex.startsWith("0x") ? hex.substr(2) : hex;
  if (hex.length % 2 !== 0) throw new Error("hex must have length that is multiple of 2");
  var arr = new Uint8Array(hex.length / 2);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return arr;
}
var UTF_8_DECODER = new TextDecoder("utf-8");

/**
 * Returns the URI representation of the content hash for supported codecs
 * @param contenthash to decode
 */
function contenthashToUri(contenthash) {
  var data = hexToUint8Array(contenthash);
  var codec = multicodec.getNameFromData(data);
  switch (codec) {
    case "ipfs-ns":
      {
        var unprefixedData = multicodec.rmPrefix(data);
        var cid = new CID__default["default"](unprefixedData);
        return "ipfs://".concat(multihashes.toB58String(cid.multihash));
      }
    case "ipns-ns":
      {
        var _unprefixedData = multicodec.rmPrefix(data);
        var _cid = new CID__default["default"](_unprefixedData);
        var multihash = multihashes.decode(_cid.multihash);
        if (multihash.name === "identity") {
          return "ipns://".concat(UTF_8_DECODER.decode(multihash.digest).trim());
        } else {
          return "ipns://".concat(multihashes.toB58String(_cid.multihash));
        }
      }
    default:
      throw new Error("Unrecognized codec: ".concat(codec));
  }
}

exports["default"] = contenthashToUri;
exports.hexToUint8Array = hexToUint8Array;
