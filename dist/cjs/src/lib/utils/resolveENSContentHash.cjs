'use strict';

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var contracts = require('@ethersproject/contracts');
var safeNamehash = require('../../utils/safeNamehash.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

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
  return new contracts.Contract(resolverAddress, RESOLVER_ABI, provider);
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
  _resolveENSContentHash = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(ensName, provider) {
    var ensRegistrarContract, hash, resolverAddress;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ensRegistrarContract = new contracts.Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider);
          hash = safeNamehash.safeNamehash(ensName);
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

module.exports = resolveENSContentHash;
