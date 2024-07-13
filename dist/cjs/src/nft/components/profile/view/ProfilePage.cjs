'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var NftBalance = require('../../../../graphql/data/nft/NftBalance.cjs');
var Box = require('../../Box.cjs');
var CollectionAssetLoading = require('../../collection/CollectionAssetLoading.cjs');
var CollectionNfts_css = require('../../collection/CollectionNfts.css.cjs');
var FilterButton = require('../../collection/FilterButton.cjs');
var shared = require('../../collection/shared.cjs');
var Flex = require('../../Flex.cjs');
var icons = require('../../icons.cjs');
var FilterSidebar = require('./FilterSidebar.cjs');
var common_css = require('../../../css/common.css.cjs');
var useBag = require('../../../hooks/useBag.cjs');
require('../../../hooks/useCollectionFilters.cjs');
var useFiltersExpanded = require('../../../hooks/useFiltersExpanded.cjs');
require('../../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../../hooks/useIsMobile.cjs');
require('../../../../hooks/useScreenSize.cjs');
require('../../../hooks/useNFTList.cjs');
require('../../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../../hooks/useSellAsset.cjs');
require('../../../hooks/useSendTransaction.cjs');
require('../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../hooks/useUSDPrice.cjs');
require('../../../../constants/tokens.cjs');
require('jsbi');
var useWalletBalance = require('../../../hooks/useWalletBalance.cjs');
var useWalletCollections = require('../../../hooks/useWalletCollections.cjs');
var index_css = require('../../../pages/collection/index.css.cjs');
var OSCollectionsFetcher = require('../../../queries/openSea/OSCollectionsFetcher.cjs');
require('ms');
var InfiniteScroll = require('react-infinite-scroll-component');
var reactQuery = require('react-query');
var reactSpring = require('react-spring');
var styled = require('styled-components');
var EmptyWalletContent = require('./EmptyWalletContent.cjs');
var ProfilePage_css = require('./ProfilePage.css.cjs');
var ProfilePageLoadingSkeleton = require('./ProfilePageLoadingSkeleton.cjs');
var ViewMyNftsAsset = require('./ViewMyNftsAsset.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var InfiniteScroll__default = /*#__PURE__*/_interopDefaultLegacy(InfiniteScroll);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var ProfilePageColumn = styled__default["default"](Flex.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), index_css.ScreenBreakpointsPaddings);
var ProfileHeader = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  font-size: 28px;\n  font-weight: 535;\n  line-height: 38px;\n  padding-bottom: 16px;\n  margin-bottom: 8px;\n  border-bottom: 1px solid ", ";\n\n  @media only screen and (max-width: ", ") {\n    font-size: 20px;\n    line-height: 28px;\n    margin-bottom: 0px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var EmptyStateContainer = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  margin-top: 164px;\n"])));
var DEFAULT_WALLET_ASSET_QUERY_AMOUNT = 25;
var WALLET_COLLECTIONS_PAGINATION_LIMIT = 300;
var FILTER_SIDEBAR_WIDTH = 300;
var PADDING = 16;
var ProfilePage = function ProfilePage() {
  var _useWalletBalance = useWalletBalance.useWalletBalance(),
    address = _useWalletBalance.address;
  var walletCollections = useWalletCollections.useWalletCollections(function (state) {
    return state.walletCollections;
  });
  var setWalletCollections = useWalletCollections.useWalletCollections(function (state) {
    return state.setWalletCollections;
  });
  var _useSellAsset = useSellAsset.useSellAsset(function (_ref3) {
      var reset = _ref3.reset;
      return {
        resetSellAssets: reset
      };
    }),
    resetSellAssets = _useSellAsset.resetSellAssets;
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var toggleBag = useBag.useBag(function (state) {
    return state.toggleBag;
  });
  var _useFiltersExpanded = useFiltersExpanded.useFiltersExpanded(),
    _useFiltersExpanded2 = _slicedToArray__default["default"](_useFiltersExpanded, 2),
    isFiltersExpanded = _useFiltersExpanded2[0],
    setFiltersExpanded = _useFiltersExpanded2[1];
  var isMobile = useIsMobile.useIsMobile();
  var getOwnerCollections = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref4) {
      var _ref4$pageParam, pageParam, res;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref4$pageParam = _ref4.pageParam, pageParam = _ref4$pageParam === void 0 ? 0 : _ref4$pageParam;
            _context.next = 3;
            return OSCollectionsFetcher.OSCollectionsFetcher({
              params: {
                asset_owner: address,
                offset: "".concat(pageParam * WALLET_COLLECTIONS_PAGINATION_LIMIT),
                limit: "".concat(WALLET_COLLECTIONS_PAGINATION_LIMIT)
              }
            });
          case 3:
            res = _context.sent;
            return _context.abrupt("return", {
              data: res,
              nextPage: pageParam + 1
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getOwnerCollections(_x) {
      return _ref5.apply(this, arguments);
    };
  }();
  var _useInfiniteQuery = reactQuery.useInfiniteQuery(["ownerCollections", {
      address: address
    }], getOwnerCollections, {
      getNextPageParam: function getNextPageParam(lastGroup) {
        return lastGroup.data.length === 0 ? undefined : lastGroup.nextPage;
      },
      refetchInterval: 15000,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }),
    ownerCollectionsData = _useInfiniteQuery.data,
    fetchNextPage = _useInfiniteQuery.fetchNextPage,
    hasNextPage = _useInfiniteQuery.hasNextPage,
    isFetchingNextPage = _useInfiniteQuery.isFetchingNextPage,
    isSuccess = _useInfiniteQuery.isSuccess;
  var ownerCollections = React.useMemo(function () {
    return isSuccess ? ownerCollectionsData === null || ownerCollectionsData === void 0 ? void 0 : ownerCollectionsData.pages.map(function (page) {
      return page.data;
    }).flat() : null;
  }, [isSuccess, ownerCollectionsData]);
  React.useEffect(function () {
    ownerCollections && setWalletCollections(ownerCollections);
  }, [ownerCollections, setWalletCollections]);
  return /*#__PURE__*/React__default["default"].createElement(ProfilePageColumn, {
    width: "full",
    paddingTop: {
      sm: "".concat(PADDING),
      md: "40"
    }
  }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ProfileHeader, null, "My NFTs"), /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    alignItems: "flex-start",
    position: "relative"
  }, /*#__PURE__*/React__default["default"].createElement(FilterSidebar.FilterSidebar, {
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
    isFetchingNextPage: isFetchingNextPage,
    walletCollections: walletCollections
  }), (!isMobile || !isFiltersExpanded) && /*#__PURE__*/React__default["default"].createElement(React.Suspense, {
    fallback: /*#__PURE__*/React__default["default"].createElement(ProfilePageLoadingSkeleton.ProfileBodyLoadingSkeleton, null)
  }, /*#__PURE__*/React__default["default"].createElement(ProfilePageNfts, {
    walletCollections: walletCollections,
    isFiltersExpanded: isFiltersExpanded,
    setFiltersExpanded: setFiltersExpanded
  })))), sellAssets.length > 0 && /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    display: {
      sm: "flex",
      md: "none"
    },
    position: "fixed",
    left: "16",
    height: "56",
    borderRadius: "12",
    paddingX: "16",
    paddingY: "12",
    background: "surface1",
    borderStyle: "solid",
    borderColor: "surface3",
    borderWidth: "1px",
    style: {
      bottom: "68px",
      width: "calc(100% - 32px)",
      lineHeight: "24px"
    },
    className: common_css.subhead
  }, sellAssets.length, " NFT", sellAssets.length === 1 ? "" : "s", /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    fontWeight: "medium",
    fontSize: "14",
    cursor: "pointer",
    color: "neutral2",
    marginRight: "20",
    marginLeft: "auto",
    onClick: resetSellAssets,
    lineHeight: "16"
  }, "Clear"), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    color: "white",
    marginRight: "0",
    fontWeight: "medium",
    fontSize: "14",
    cursor: "pointer",
    backgroundColor: "accent1",
    onClick: toggleBag,
    lineHeight: "16",
    borderRadius: "12",
    paddingY: "8",
    paddingX: "28"
  }, "List for sale")));
};
var ProfilePageNfts = function ProfilePageNfts(_ref6) {
  var _ownerAssets$length;
  var walletCollections = _ref6.walletCollections,
    isFiltersExpanded = _ref6.isFiltersExpanded,
    setFiltersExpanded = _ref6.setFiltersExpanded;
  var _useWalletBalance2 = useWalletBalance.useWalletBalance(),
    address = _useWalletBalance2.address;
  var setCollectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.setCollectionFilters;
  });
  var collectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.collectionFilters;
  });
  var clearCollectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.clearCollectionFilters;
  });
  var isBagExpanded = useBag.useBag(function (state) {
    return state.bagExpanded;
  });
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    currentTokenPlayingMedia = _useState2[0],
    setCurrentTokenPlayingMedia = _useState2[1];
  var isMobile = useIsMobile.useIsMobile();
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useNftBalance = NftBalance.useNftBalance(address, collectionFilters, [], DEFAULT_WALLET_ASSET_QUERY_AMOUNT),
    ownerAssets = _useNftBalance.walletAssets,
    loading = _useNftBalance.loading,
    hasNext = _useNftBalance.hasNext,
    loadMore = _useNftBalance.loadMore;
  var _useSpring = reactSpring.useSpring({
      gridX: isFiltersExpanded ? FILTER_SIDEBAR_WIDTH : -PADDING,
      config: {
        duration: 250,
        easing: reactSpring.easings.easeOutSine
      }
    }),
    gridX = _useSpring.gridX;
  if (loading) return /*#__PURE__*/React__default["default"].createElement(ProfilePageLoadingSkeleton.ProfileBodyLoadingSkeleton, null);
  return /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    width: "full"
  }, (ownerAssets === null || ownerAssets === void 0 ? void 0 : ownerAssets.length) === 0 ? /*#__PURE__*/React__default["default"].createElement(EmptyStateContainer, null, /*#__PURE__*/React__default["default"].createElement(EmptyWalletContent.EmptyWalletModule, null)) : /*#__PURE__*/React__default["default"].createElement(Box.AnimatedBox, {
    flexShrink: "0",
    position: isMobile && isBagExpanded ? "fixed" : "static",
    style: {
      transform: gridX.to(function (x) {
        return "translate(".concat(Number(x) - (!isMobile && isFiltersExpanded ? FILTER_SIDEBAR_WIDTH : -PADDING), "px)");
      })
    },
    paddingY: "20"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    gap: "8",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default["default"].createElement(FilterButton.FilterButton, {
    isMobile: isMobile,
    isFiltersExpanded: isFiltersExpanded,
    onClick: function onClick() {
      return setFiltersExpanded(!isFiltersExpanded);
    }
  })), /*#__PURE__*/React__default["default"].createElement(Flex.Row, null, /*#__PURE__*/React__default["default"].createElement(CollectionFiltersRow, {
    collections: walletCollections,
    collectionFilters: collectionFilters,
    setCollectionFilters: setCollectionFilters,
    clearCollectionFilters: clearCollectionFilters
  })), /*#__PURE__*/React__default["default"].createElement(InfiniteScroll__default["default"], {
    next: loadMore,
    hasMore: hasNext !== null && hasNext !== void 0 ? hasNext : false,
    loader: Boolean(hasNext && (ownerAssets === null || ownerAssets === void 0 ? void 0 : ownerAssets.length)) && /*#__PURE__*/React__default["default"].createElement(CollectionAssetLoading.LoadingAssets, {
      count: DEFAULT_WALLET_ASSET_QUERY_AMOUNT
    }),
    dataLength: (_ownerAssets$length = ownerAssets === null || ownerAssets === void 0 ? void 0 : ownerAssets.length) !== null && _ownerAssets$length !== void 0 ? _ownerAssets$length : 0,
    className: ownerAssets !== null && ownerAssets !== void 0 && ownerAssets.length ? CollectionNfts_css.assetList : undefined,
    style: {
      overflow: "unset"
    }
  }, ownerAssets !== null && ownerAssets !== void 0 && ownerAssets.length ? ownerAssets.map(function (asset, index) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/React__default["default"].createElement(ViewMyNftsAsset.ViewMyNftsAsset, {
      asset: asset,
      mediaShouldBePlaying: asset.tokenId === currentTokenPlayingMedia,
      setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
      hideDetails: sellAssets.length > 0
    }));
  }) : null)));
};
var CollectionFiltersRow = function CollectionFiltersRow(_ref7) {
  var collections = _ref7.collections,
    collectionFilters = _ref7.collectionFilters,
    setCollectionFilters = _ref7.setCollectionFilters,
    clearCollectionFilters = _ref7.clearCollectionFilters;
  var getCollection = function getCollection(collectionAddress) {
    return collections === null || collections === void 0 ? void 0 : collections.find(function (collection) {
      return collection.address === collectionAddress;
    });
  };
  var handleClearAllClick = React.useCallback(function () {
    return clearCollectionFilters();
  }, [clearCollectionFilters]);
  return /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    paddingY: "18",
    gap: "8",
    flexWrap: "wrap"
  }, Boolean(collectionFilters === null || collectionFilters === void 0 ? void 0 : collectionFilters.length) && collectionFilters.map(function (collectionAddress, index) {
    return /*#__PURE__*/React__default["default"].createElement(CollectionFilterItem, {
      collection: getCollection(collectionAddress),
      key: "CollectionFilterItem-".concat(collectionAddress, "-").concat(index),
      setCollectionFilters: setCollectionFilters
    });
  }), Boolean(collectionFilters === null || collectionFilters === void 0 ? void 0 : collectionFilters.length) && /*#__PURE__*/React__default["default"].createElement(shared.ClearAllButton, {
    onClick: handleClearAllClick
  }, "Clear all"));
};
var CollectionFilterItem = function CollectionFilterItem(_ref8) {
  var collection = _ref8.collection,
    setCollectionFilters = _ref8.setCollectionFilters;
  if (!collection) return null;
  return /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    justifyContent: "center",
    paddingTop: "6",
    paddingRight: "6",
    paddingBottom: "6",
    paddingLeft: "12",
    borderRadius: "8",
    background: "surface3",
    fontSize: "14"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "img",
    borderRadius: "round",
    width: "20",
    height: "20",
    src: collection.image
  }), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    marginLeft: "6",
    className: ProfilePage_css.collectionFilterBubbleText
  }, collection === null || collection === void 0 ? void 0 : collection.name), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    color: "neutral2",
    background: "none",
    height: "28",
    width: "28",
    padding: "0",
    as: "button",
    border: "none",
    cursor: "pointer",
    onClick: function onClick() {
      return setCollectionFilters(collection.address);
    }
  }, /*#__PURE__*/React__default["default"].createElement(icons.CrossIcon, null)));
};

exports.DEFAULT_WALLET_ASSET_QUERY_AMOUNT = DEFAULT_WALLET_ASSET_QUERY_AMOUNT;
exports.ProfilePage = ProfilePage;
exports.WALLET_COLLECTIONS_PAGINATION_LIMIT = WALLET_COLLECTIONS_PAGINATION_LIMIT;
