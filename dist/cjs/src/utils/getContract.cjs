'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('@ethersproject/constants');
var contracts = require('@ethersproject/contracts');
var addresses = require('./addresses.cjs');

function getContract(address, ABI, provider, account) {
  if (!addresses.isAddress(address) || address === constants.AddressZero) {
    throw Error("Invalid 'address' parameter '".concat(address, "'."));
  }
  return new contracts.Contract(address, ABI, getProviderOrSigner(provider, account));
}

// account is optional
function getProviderOrSigner(provider, account) {
  return account ? provider.getSigner(account).connectUnchecked() : provider;
}

exports.getContract = getContract;
