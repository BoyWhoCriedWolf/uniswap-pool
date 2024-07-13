import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { isAddress } from './addresses.js';

function getContract(address, ABI, provider, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error("Invalid 'address' parameter '".concat(address, "'."));
  }
  return new Contract(address, ABI, getProviderOrSigner(provider, account));
}

// account is optional
function getProviderOrSigner(provider, account) {
  return account ? provider.getSigner(account).connectUnchecked() : provider;
}

export { getContract };
