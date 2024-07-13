import { Interface } from '@ethersproject/abi';
import ERC20_ABI from '../abis/erc20.json.js';
import { useMultipleContractSingleData } from '../lib/hooks/multicall.js';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

var ERC20Interface = new Interface(ERC20_ABI);
function useTokenContractsConstant(tokens, field) {
  return useMultipleContractSingleData(tokens, ERC20Interface, field, undefined, NEVER_RELOAD);
}

export { useTokenContractsConstant };
