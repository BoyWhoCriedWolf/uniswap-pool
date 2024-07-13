import { useWeb3React } from '@web3-react/core';
import ArgentWalletContractABI from '../abis/argent-wallet-contract.json.js';
import { useContract } from './useContract.js';
import useIsArgentWallet from './useIsArgentWallet.js';

function useArgentWalletContract() {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var isArgentWallet = useIsArgentWallet();
  return useContract(isArgentWallet ? account !== null && account !== void 0 ? account : undefined : undefined, ArgentWalletContractABI, true);
}

export { useArgentWalletContract };
