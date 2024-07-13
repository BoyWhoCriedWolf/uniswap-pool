import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { _TypedDataEncoder } from '@ethersproject/hash';
import { getWalletMeta, WalletType } from './walletMeta.js';

// These are WalletConnect peers which do not implement eth_signTypedData_v4, but *do* implement eth_signTypedData.
// They are special-cased so that signing will still use EIP-712 (which is safer for the user).
var WC_PEERS_LACKING_V4_SUPPORT = ["SafePal Wallet", "Ledger Wallet Connect"];

// Assumes v4 support by default, except for known wallets.
function supportsV4(provider) {
  var meta = getWalletMeta(provider);
  if (meta) {
    var type = meta.type,
      name = meta.name;
    if (name) {
      if (type === WalletType.WALLET_CONNECT && name && WC_PEERS_LACKING_V4_SUPPORT.includes(name)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Signs TypedData with EIP-712, if available, or else by falling back to eth_sign.
 * Calls eth_signTypedData_v4, or eth_signTypedData for wallets with incomplete EIP-712 support.
 *
 * @see https://github.com/ethers-io/ethers.js/blob/c80fcddf50a9023486e9f9acb1848aba4c19f7b6/packages/providers/src.ts/json-rpc-provider.ts#L334
 */
function signTypedData(_x, _x2, _x3, _x4) {
  return _signTypedData.apply(this, arguments);
}
function _signTypedData() {
  _signTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(signer, domain, types,
  // Use Record<string, any> for the value to match the JsonRpcSigner._signTypedData signature.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value) {
    var populated, method, address, message, hash;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _TypedDataEncoder.resolveNames(domain, types, value, function (name) {
            return signer.provider.resolveName(name);
          });
        case 2:
          populated = _context.sent;
          method = supportsV4(signer.provider) ? "eth_signTypedData_v4" : "eth_signTypedData";
          _context.next = 6;
          return signer.getAddress();
        case 6:
          address = _context.sent.toLowerCase();
          message = JSON.stringify(_TypedDataEncoder.getPayload(populated.domain, types, populated.value));
          _context.prev = 8;
          _context.next = 11;
          return signer.provider.send(method, [address, message]);
        case 11:
          return _context.abrupt("return", _context.sent);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          if (!(typeof _context.t0.message === "string" && (_context.t0.message.match(/not (found|implemented)/i) || _context.t0.message.match(/TrustWalletConnect.WCError error 1/) || _context.t0.message.match(/Missing or invalid/)))) {
            _context.next = 22;
            break;
          }
          console.warn("signTypedData: wallet does not implement EIP-712, falling back to eth_sign", _context.t0.message);
          hash = _TypedDataEncoder.hash(populated.domain, types, populated.value);
          _context.next = 21;
          return signer.provider.send("eth_sign", [address, hash]);
        case 21:
          return _context.abrupt("return", _context.sent);
        case 22:
          throw _context.t0;
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 14]]);
  }));
  return _signTypedData.apply(this, arguments);
}

export { signTypedData };
