'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var NftBalance = require('../../../../graphql/data/nft/NftBalance.cjs');
var CollectionAssetLoading = require('../../../../nft/components/collection/CollectionAssetLoading.cjs');
var EmptyWalletContent = require('../../../../nft/components/profile/view/EmptyWalletContent.cjs');
var InfiniteScroll = require('react-infinite-scroll-component');
var styled = require('styled-components');
var index = require('../../index.cjs');
var constants = require('../constants.cjs');
var NFTItem = require('./NFTItem.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var InfiniteScroll__default = /*#__PURE__*/_interopDefaultLegacy(InfiniteScroll);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
function NFTs(_ref) {
  var _walletAssets$length;
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var _useAccountDrawer = index.useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray__default["default"](_useAccountDrawer, 2),
    walletDrawerOpen = _useAccountDrawer2[0],
    toggleWalletDrawer = _useAccountDrawer2[1];
  var _useNftBalance = NftBalance.useNftBalance(account, [], [], constants.DEFAULT_NFT_QUERY_AMOUNT, undefined, undefined, undefined, !walletDrawerOpen),
    walletAssets = _useNftBalance.walletAssets,
    loading = _useNftBalance.loading,
    hasNext = _useNftBalance.hasNext,
    loadMore = _useNftBalance.loadMore;
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    currentTokenPlayingMedia = _useState2[0],
    setCurrentTokenPlayingMedia = _useState2[1];
  if (loading && !walletAssets) return /*#__PURE__*/React__default["default"].createElement(AssetsContainer, null, /*#__PURE__*/React__default["default"].createElement(CollectionAssetLoading.LoadingAssets, {
    count: 2
  }));
  if (!walletAssets || (walletAssets === null || walletAssets === void 0 ? void 0 : walletAssets.length) === 0) {
    return /*#__PURE__*/React__default["default"].createElement(EmptyWalletContent.EmptyWalletModule, {
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  }
  return /*#__PURE__*/React__default["default"].createElement(InfiniteScroll__default["default"], {
    next: loadMore,
    hasMore: hasNext !== null && hasNext !== void 0 ? hasNext : false,
    loader: Boolean(hasNext && (walletAssets === null || walletAssets === void 0 ? void 0 : walletAssets.length)) && /*#__PURE__*/React__default["default"].createElement(AssetsContainer, null, /*#__PURE__*/React__default["default"].createElement(CollectionAssetLoading.LoadingAssets, {
      count: 2
    })),
    dataLength: (_walletAssets$length = walletAssets === null || walletAssets === void 0 ? void 0 : walletAssets.length) !== null && _walletAssets$length !== void 0 ? _walletAssets$length : 0,
    style: {
      overflow: "unset"
    },
    scrollableTarget: "wallet-dropdown-scroll-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement(AssetsContainer, null, walletAssets !== null && walletAssets !== void 0 && walletAssets.length ? walletAssets.map(function (asset, index) {
    return /*#__PURE__*/React__default["default"].createElement(NFTItem.NFT, {
      setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
      mediaShouldBePlaying: currentTokenPlayingMedia === asset.tokenId,
      key: index,
      asset: asset
    });
  }) : null));
}
var AssetsContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n  gap: 12px;\n\n  // use minmax to not let grid items escape the parent container\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  margin: 16px;\n"])));

module.exports = NFTs;
