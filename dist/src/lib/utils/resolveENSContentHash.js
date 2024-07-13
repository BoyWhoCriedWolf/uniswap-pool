import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Contract } from '@ethersproject/contracts';
import { safeNamehash } from '../../utils/safeNamehash.js';

var REGISTRAR_ABI = [{
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }],
  name: "resolver",
  outputs: [{
    name: "resolverAddress",
    type: "address"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}];
var REGISTRAR_ADDRESS = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
var RESOLVER_ABI = [{
  constant: true,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }],
  name: "contenthash",
  outputs: [{
    internalType: "bytes",
    name: "",
    type: "bytes"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}];

// cache the resolver contracts since most of them are the public resolver
function resolverContract(resolverAddress, provider) {
  return new Contract(resolverAddress, RESOLVER_ABI, provider);
}

/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */
function resolveENSContentHash(_x, _x2) {
  return _resolveENSContentHash.apply(this, arguments);
}
function _resolveENSContentHash() {
  _resolveENSContentHash = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ensName, provider) {
    var ensRegistrarContract, hash, resolverAddress;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ensRegistrarContract = new Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider);
          hash = safeNamehash(ensName);
          _context.next = 4;
          return ensRegistrarContract.resolver(hash);
        case 4:
          resolverAddress = _context.sent;
          return _context.abrupt("return", resolverContract(resolverAddress, provider).contenthash(hash));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _resolveENSContentHash.apply(this, arguments);
}

export { resolveENSContentHash as default };
