import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { BigNumber } from '@ethersproject/bignumber';
import { hexZeroPad } from '@ethersproject/bytes';
import { useWeb3React } from '@web3-react/core';
import { useMainnetSingleCallResult } from '../lib/hooks/multicall.js';
import uriToHttp from '../lib/utils/uriToHttp.js';
import { useMemo, useState, useEffect } from 'react';
import { safeNamehash } from '../utils/safeNamehash.js';
import { isAddress } from '../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import isZero from '../utils/isZero.js';
import { useENSRegistrarContract, useENSResolverContract, useERC721Contract, useERC1155Contract } from './useContract.js';
import useDebounce from './useDebounce.js';
import useENSName from './useENSName.js';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

/**
 * Returns the ENS avatar URI, if available.
 * Spec: https://gist.github.com/Arachnid/9db60bd75277969ee1689c8742b75182.
 */
function useENSAvatar(address) {
  var enforceOwnership = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var debouncedAddress = useDebounce(address, 200);
  var node = useMemo(function () {
    if (!debouncedAddress || !isAddress(debouncedAddress)) return undefined;
    return safeNamehash("".concat(debouncedAddress.toLowerCase().substr(2), ".addr.reverse"));
  }, [debouncedAddress]);
  var addressAvatar = useAvatarFromNode(node);
  var ENSName = useENSName(address).ENSName;
  var nameAvatar = useAvatarFromNode(ENSName === null ? undefined : safeNamehash(ENSName));
  var avatar = addressAvatar.avatar || nameAvatar.avatar;
  var nftAvatar = useAvatarFromNFT(avatar, enforceOwnership);
  avatar = nftAvatar.avatar || avatar;
  var http = avatar && uriToHttp(avatar)[0];
  var changed = debouncedAddress !== address;
  return useMemo(function () {
    return {
      avatar: changed ? null : http !== null && http !== void 0 ? http : null,
      loading: changed || addressAvatar.loading || nameAvatar.loading || nftAvatar.loading
    };
  }, [addressAvatar.loading, changed, http, nameAvatar.loading, nftAvatar.loading]);
}
function useAvatarFromNode(node) {
  var _resolverAddress$resu;
  var nodeArgument = useMemo(function () {
    return [node];
  }, [node]);
  var textArgument = useMemo(function () {
    return [node, "avatar"];
  }, [node]);
  var registrarContract = useENSRegistrarContract();
  var resolverAddress = useMainnetSingleCallResult(registrarContract, "resolver", nodeArgument, NEVER_RELOAD);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined);
  var avatar = useMainnetSingleCallResult(resolverContract, "text", textArgument, NEVER_RELOAD);
  return useMemo(function () {
    var _avatar$result;
    return {
      avatar: (_avatar$result = avatar.result) === null || _avatar$result === void 0 ? void 0 : _avatar$result[0],
      loading: resolverAddress.loading || avatar.loading
    };
  }, [avatar.loading, avatar.result, resolverAddress.loading]);
}
function useAvatarFromNFT() {
  var _parts$1$split, _parts$, _parts$2$split, _parts$2;
  var nftUri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var enforceOwnership = arguments.length > 1 ? arguments[1] : undefined;
  var parts = nftUri.toLowerCase().split(":");
  var protocol = parts[0];
  // ignore the chain from eip155
  // TODO: when we are able, pull only from the specified chain
  var _ref = (_parts$1$split = (_parts$ = parts[1]) === null || _parts$ === void 0 ? void 0 : _parts$.split("/")) !== null && _parts$1$split !== void 0 ? _parts$1$split : [],
    _ref2 = _slicedToArray(_ref, 2),
    erc = _ref2[1];
  var _ref3 = (_parts$2$split = (_parts$2 = parts[2]) === null || _parts$2 === void 0 ? void 0 : _parts$2.split("/")) !== null && _parts$2$split !== void 0 ? _parts$2$split : [],
    _ref4 = _slicedToArray(_ref3, 2),
    contractAddress = _ref4[0],
    id = _ref4[1];
  var isERC721 = protocol === "eip155" && erc === "erc721";
  var isERC1155 = protocol === "eip155" && erc === "erc1155";
  var erc721 = useERC721Uri(isERC721 ? contractAddress : undefined, isERC721 ? id : undefined, enforceOwnership);
  var erc1155 = useERC1155Uri(isERC1155 ? contractAddress : undefined, isERC1155 ? id : undefined, enforceOwnership);
  var uri = erc721.uri || erc1155.uri;
  var http = uri && uriToHttp(uri)[0];
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    avatar = _useState4[0],
    setAvatar = _useState4[1];
  useEffect(function () {
    setAvatar(undefined);
    if (http) {
      setLoading(true);
      fetch(http).then(function (res) {
        return res.json();
      }).then(function (_ref5) {
        var image = _ref5.image;
        setAvatar(image);
      })["catch"](function (e) {
        return console.warn(e);
      })["finally"](function () {
        setLoading(false);
      });
    }
  }, [http]);
  return useMemo(function () {
    return {
      avatar: avatar,
      loading: erc721.loading || erc1155.loading || loading
    };
  }, [avatar, erc1155.loading, erc721.loading, loading]);
}
function useERC721Uri(contractAddress, id, enforceOwnership) {
  var idArgument = useMemo(function () {
    return [id];
  }, [id]);
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var contract = useERC721Contract(contractAddress);
  var owner = useMainnetSingleCallResult(contract, "ownerOf", idArgument, NEVER_RELOAD);
  var uri = useMainnetSingleCallResult(contract, "tokenURI", idArgument, NEVER_RELOAD);
  return useMemo(function () {
    var _owner$result, _uri$result;
    return {
      uri: !enforceOwnership || account === ((_owner$result = owner.result) === null || _owner$result === void 0 ? void 0 : _owner$result[0]) ? (_uri$result = uri.result) === null || _uri$result === void 0 ? void 0 : _uri$result[0] : undefined,
      loading: owner.loading || uri.loading
    };
  }, [account, enforceOwnership, owner.loading, owner.result, uri.loading, uri.result]);
}
function useERC1155Uri(contractAddress, id, enforceOwnership) {
  var _useWeb3React2 = useWeb3React(),
    account = _useWeb3React2.account;
  var idArgument = useMemo(function () {
    return [id];
  }, [id]);
  var accountArgument = useMemo(function () {
    return [account || "", id];
  }, [account, id]);
  var contract = useERC1155Contract(contractAddress);
  var balance = useMainnetSingleCallResult(contract, "balanceOf", accountArgument, NEVER_RELOAD);
  var uri = useMainnetSingleCallResult(contract, "uri", idArgument, NEVER_RELOAD);
  return useMemo(function () {
    try {
      var _balance$result, _uri$result2;
      // ERC-1155 allows a generic {id} in the URL, so prepare to replace if relevant,
      // in lowercase hexadecimal (with no 0x prefix) and leading zero padded to 64 hex characters.
      var idHex = id ? hexZeroPad(BigNumber.from(id).toHexString(), 32).substring(2) : id;
      return {
        uri: !enforceOwnership || ((_balance$result = balance.result) === null || _balance$result === void 0 ? void 0 : _balance$result[0]) > 0 ? (_uri$result2 = uri.result) === null || _uri$result2 === void 0 || (_uri$result2 = _uri$result2[0]) === null || _uri$result2 === void 0 ? void 0 : _uri$result2.replaceAll("{id}", idHex) : undefined,
        loading: balance.loading || uri.loading
      };
    } catch (error) {
      console.error("Invalid token id", error);
      return {
        loading: false
      };
    }
  }, [balance.loading, balance.result, enforceOwnership, uri.loading, uri.result, id]);
}

export { useENSAvatar as default };
