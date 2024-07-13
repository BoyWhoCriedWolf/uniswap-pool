'use strict';

var abi = require('@ethersproject/abi');
var v3Sdk = require('@uniswap/v3-sdk');

var ERC20_INTERFACE = new abi.Interface([{
  constant: false,
  inputs: [{
    name: "_spender",
    type: "address"
  }, {
    name: "_value",
    type: "uint256"
  }],
  name: "approve",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}]);
function approveAmountCalldata(amount, spender) {
  if (!amount.currency.isToken) throw new Error("Must call with an amount of token");
  var approveData = ERC20_INTERFACE.encodeFunctionData("approve", [spender, v3Sdk.toHex(amount.quotient)]);
  return {
    to: amount.currency.address,
    data: approveData,
    value: "0x0"
  };
}

module.exports = approveAmountCalldata;
