'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abi = require('@ethersproject/abi');
var erc20 = require('../abis/erc20.cjs');
var multicall = require('../lib/hooks/multicall.cjs');
var reduxMulticall = require('@uniswap/redux-multicall');

var ERC20Interface = new abi.Interface(erc20);
function useTokenContractsConstant(tokens, field) {
  return multicall.useMultipleContractSingleData(tokens, ERC20Interface, field, undefined, reduxMulticall.NEVER_RELOAD);
}

exports.useTokenContractsConstant = useTokenContractsConstant;
