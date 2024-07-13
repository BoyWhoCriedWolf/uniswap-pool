import { parseEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useNativeCurrencyBalances } from '../../lib/hooks/useCurrencyBalance.js';

function useWalletBalance() {
  var _useNativeCurrencyBal;
  var _useWeb3React = useWeb3React(),
    address = _useWeb3React.account,
    provider = _useWeb3React.provider;
  var balanceString = ((_useNativeCurrencyBal = useNativeCurrencyBalances(address ? [address] : [])) === null || _useNativeCurrencyBal === void 0 || (_useNativeCurrencyBal = _useNativeCurrencyBal[address !== null && address !== void 0 ? address : ""]) === null || _useNativeCurrencyBal === void 0 ? void 0 : _useNativeCurrencyBal.toSignificant(3)) || "0";
  return address == null ? {
    address: "",
    balance: "0",
    weiBalance: parseEther("0"),
    provider: undefined
  } : {
    address: address,
    balance: balanceString,
    weiBalance: parseEther(balanceString),
    provider: provider
  };
}

export { useWalletBalance };
