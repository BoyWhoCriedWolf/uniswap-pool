import { Interface } from '@ethersproject/abi';
import { toHex } from '@uniswap/v3-sdk';

var ERC20_INTERFACE = new Interface([{
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
  var approveData = ERC20_INTERFACE.encodeFunctionData("approve", [spender, toHex(amount.quotient)]);
  return {
    to: amount.currency.address,
    data: approveData,
    value: "0x0"
  };
}

export { approveAmountCalldata as default };
