import React__default, { useState } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useNftBalance } from '../../../../graphql/data/nft/NftBalance.js';
import { LoadingAssets } from '../../../../nft/components/collection/CollectionAssetLoading.js';
import { EmptyWalletModule } from '../../../../nft/components/profile/view/EmptyWalletContent.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { useAccountDrawer } from '../../index.js';
import { DEFAULT_NFT_QUERY_AMOUNT } from '../constants.js';
import { NFT } from './NFTItem.js';

var _templateObject;
function NFTs(_ref) {
  var _walletAssets$length;
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var _useAccountDrawer = useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray(_useAccountDrawer, 2),
    walletDrawerOpen = _useAccountDrawer2[0],
    toggleWalletDrawer = _useAccountDrawer2[1];
  var _useNftBalance = useNftBalance(account, [], [], DEFAULT_NFT_QUERY_AMOUNT, undefined, undefined, undefined, !walletDrawerOpen),
    walletAssets = _useNftBalance.walletAssets,
    loading = _useNftBalance.loading,
    hasNext = _useNftBalance.hasNext,
    loadMore = _useNftBalance.loadMore;
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    currentTokenPlayingMedia = _useState2[0],
    setCurrentTokenPlayingMedia = _useState2[1];
  if (loading && !walletAssets) return /*#__PURE__*/React__default.createElement(AssetsContainer, null, /*#__PURE__*/React__default.createElement(LoadingAssets, {
    count: 2
  }));
  if (!walletAssets || (walletAssets === null || walletAssets === void 0 ? void 0 : walletAssets.length) === 0) {
    return /*#__PURE__*/React__default.createElement(EmptyWalletModule, {
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  }
  return /*#__PURE__*/React__default.createElement(InfiniteScroll, {
    next: loadMore,
    hasMore: hasNext !== null && hasNext !== void 0 ? hasNext : false,
    loader: Boolean(hasNext && (walletAssets === null || walletAssets === void 0 ? void 0 : walletAssets.length)) && /*#__PURE__*/React__default.createElement(AssetsContainer, null, /*#__PURE__*/React__default.createElement(LoadingAssets, {
      count: 2
    })),
    dataLength: (_walletAssets$length = walletAssets === null || walletAssets === void 0 ? void 0 : walletAssets.length) !== null && _walletAssets$length !== void 0 ? _walletAssets$length : 0,
    style: {
      overflow: "unset"
    },
    scrollableTarget: "wallet-dropdown-scroll-wrapper"
  }, /*#__PURE__*/React__default.createElement(AssetsContainer, null, walletAssets !== null && walletAssets !== void 0 && walletAssets.length ? walletAssets.map(function (asset, index) {
    return /*#__PURE__*/React__default.createElement(NFT, {
      setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
      mediaShouldBePlaying: currentTokenPlayingMedia === asset.tokenId,
      key: index,
      asset: asset
    });
  }) : null));
}
var AssetsContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: grid;\n  gap: 12px;\n\n  // use minmax to not let grid items escape the parent container\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  margin: 16px;\n"])));

export { NFTs as default };
