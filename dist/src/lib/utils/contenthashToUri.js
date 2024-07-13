import CID from 'cids';
import { getNameFromData, rmPrefix } from 'multicodec';
import { decode, toB58String } from 'multihashes';

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
  var codec = getNameFromData(data);
  switch (codec) {
    case "ipfs-ns":
      {
        var unprefixedData = rmPrefix(data);
        var cid = new CID(unprefixedData);
        return "ipfs://".concat(toB58String(cid.multihash));
      }
    case "ipns-ns":
      {
        var _unprefixedData = rmPrefix(data);
        var _cid = new CID(_unprefixedData);
        var multihash = decode(_cid.multihash);
        if (multihash.name === "identity") {
          return "ipns://".concat(UTF_8_DECODER.decode(multihash.digest).trim());
        } else {
          return "ipns://".concat(toB58String(_cid.multihash));
        }
      }
    default:
      throw new Error("Unrecognized codec: ".concat(codec));
  }
}

export { contenthashToUri as default, hexToUint8Array };
