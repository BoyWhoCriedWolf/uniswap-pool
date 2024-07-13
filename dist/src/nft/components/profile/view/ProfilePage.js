import React__default, { useMemo, useEffect, Suspense, useState, useCallback } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { useNftBalance } from '../../../../graphql/data/nft/NftBalance.js';
import { Box, AnimatedBox } from '../../Box.js';
import { LoadingAssets } from '../../collection/CollectionAssetLoading.js';
import { assetList } from '../../collection/CollectionNfts.css.js';
import { FilterButton } from '../../collection/FilterButton.js';
import { ClearAllButton } from '../../collection/shared.js';
import { Column, Row } from '../../Flex.js';
import { CrossIcon } from '../../icons.js';
import { FilterSidebar } from './FilterSidebar.js';
import { subhead } from '../../../css/common.css.js';
import { useBag } from '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import { useFiltersExpanded } from '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../../hooks/useIsMobile.js';
import '../../../../hooks/useScreenSize.js';
import '../../../hooks/useNFTList.js';
import '../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../constants/tokens.js';
import 'jsbi';
import { useWalletBalance } from '../../../hooks/useWalletBalance.js';
import { useWalletCollections } from '../../../hooks/useWalletCollections.js';
import { ScreenBreakpointsPaddings } from '../../../pages/collection/index.css.js';
import { OSCollectionsFetcher } from '../../../queries/openSea/OSCollectionsFetcher.js';
import 'ms';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { useSpring, easings } from 'react-spring';
import styled from 'styled-components';
import { EmptyWalletModule } from './EmptyWalletContent.js';
import { collectionFilterBubbleText } from './ProfilePage.css.js';
import { ProfileBodyLoadingSkeleton } from './ProfilePageLoadingSkeleton.js';
import { ViewMyNftsAsset } from './ViewMyNftsAsset.js';

var _templateObject, _templateObject2, _templateObject3;
var ProfilePageColumn = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n"])), ScreenBreakpointsPaddings);
var ProfileHeader = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  font-size: 28px;\n  font-weight: 535;\n  line-height: 38px;\n  padding-bottom: 16px;\n  margin-bottom: 8px;\n  border-bottom: 1px solid ", ";\n\n  @media only screen and (max-width: ", ") {\n    font-size: 20px;\n    line-height: 28px;\n    margin-bottom: 0px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var EmptyStateContainer = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  margin-top: 164px;\n"])));
var DEFAULT_WALLET_ASSET_QUERY_AMOUNT = 25;
var WALLET_COLLECTIONS_PAGINATION_LIMIT = 300;
var FILTER_SIDEBAR_WIDTH = 300;
var PADDING = 16;
var ProfilePage = function ProfilePage() {
  var _useWalletBalance = useWalletBalance(),
    address = _useWalletBalance.address;
  var walletCollections = useWalletCollections(function (state) {
    return state.walletCollections;
  });
  var setWalletCollections = useWalletCollections(function (state) {
    return state.setWalletCollections;
  });
  var _useSellAsset = useSellAsset(function (_ref3) {
      var reset = _ref3.reset;
      return {
        resetSellAssets: reset
      };
    }),
    resetSellAssets = _useSellAsset.resetSellAssets;
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var toggleBag = useBag(function (state) {
    return state.toggleBag;
  });
  var _useFiltersExpanded = useFiltersExpanded(),
    _useFiltersExpanded2 = _slicedToArray(_useFiltersExpanded, 2),
    isFiltersExpanded = _useFiltersExpanded2[0],
    setFiltersExpanded = _useFiltersExpanded2[1];
  var isMobile = useIsMobile();
  var getOwnerCollections = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref4) {
      var _ref4$pageParam, pageParam, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref4$pageParam = _ref4.pageParam, pageParam = _ref4$pageParam === void 0 ? 0 : _ref4$pageParam;
            _context.next = 3;
            return OSCollectionsFetcher({
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
  var _useInfiniteQuery = useInfiniteQuery(["ownerCollections", {
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
  var ownerCollections = useMemo(function () {
    return isSuccess ? ownerCollectionsData === null || ownerCollectionsData === void 0 ? void 0 : ownerCollectionsData.pages.map(function (page) {
      return page.data;
    }).flat() : null;
  }, [isSuccess, ownerCollectionsData]);
  useEffect(function () {
    ownerCollections && setWalletCollections(ownerCollections);
  }, [ownerCollections, setWalletCollections]);
  return /*#__PURE__*/React__default.createElement(ProfilePageColumn, {
    width: "full",
    paddingTop: {
      sm: "".concat(PADDING),
      md: "40"
    }
  }, /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ProfileHeader, null, "My NFTs"), /*#__PURE__*/React__default.createElement(Row, {
    alignItems: "flex-start",
    position: "relative"
  }, /*#__PURE__*/React__default.createElement(FilterSidebar, {
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
    isFetchingNextPage: isFetchingNextPage,
    walletCollections: walletCollections
  }), (!isMobile || !isFiltersExpanded) && /*#__PURE__*/React__default.createElement(Suspense, {
    fallback: /*#__PURE__*/React__default.createElement(ProfileBodyLoadingSkeleton, null)
  }, /*#__PURE__*/React__default.createElement(ProfilePageNfts, {
    walletCollections: walletCollections,
    isFiltersExpanded: isFiltersExpanded,
    setFiltersExpanded: setFiltersExpanded
  })))), sellAssets.length > 0 && /*#__PURE__*/React__default.createElement(Row, {
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
    className: subhead
  }, sellAssets.length, " NFT", sellAssets.length === 1 ? "" : "s", /*#__PURE__*/React__default.createElement(Box, {
    fontWeight: "medium",
    fontSize: "14",
    cursor: "pointer",
    color: "neutral2",
    marginRight: "20",
    marginLeft: "auto",
    onClick: resetSellAssets,
    lineHeight: "16"
  }, "Clear"), /*#__PURE__*/React__default.createElement(Box, {
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
  var _useWalletBalance2 = useWalletBalance(),
    address = _useWalletBalance2.address;
  var setCollectionFilters = useWalletCollections(function (state) {
    return state.setCollectionFilters;
  });
  var collectionFilters = useWalletCollections(function (state) {
    return state.collectionFilters;
  });
  var clearCollectionFilters = useWalletCollections(function (state) {
    return state.clearCollectionFilters;
  });
  var isBagExpanded = useBag(function (state) {
    return state.bagExpanded;
  });
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    currentTokenPlayingMedia = _useState2[0],
    setCurrentTokenPlayingMedia = _useState2[1];
  var isMobile = useIsMobile();
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useNftBalance = useNftBalance(address, collectionFilters, [], DEFAULT_WALLET_ASSET_QUERY_AMOUNT),
    ownerAssets = _useNftBalance.walletAssets,
    loading = _useNftBalance.loading,
    hasNext = _useNftBalance.hasNext,
    loadMore = _useNftBalance.loadMore;
  var _useSpring = useSpring({
      gridX: isFiltersExpanded ? FILTER_SIDEBAR_WIDTH : -PADDING,
      config: {
        duration: 250,
        easing: easings.easeOutSine
      }
    }),
    gridX = _useSpring.gridX;
  if (loading) return /*#__PURE__*/React__default.createElement(ProfileBodyLoadingSkeleton, null);
  return /*#__PURE__*/React__default.createElement(Column, {
    width: "full"
  }, (ownerAssets === null || ownerAssets === void 0 ? void 0 : ownerAssets.length) === 0 ? /*#__PURE__*/React__default.createElement(EmptyStateContainer, null, /*#__PURE__*/React__default.createElement(EmptyWalletModule, null)) : /*#__PURE__*/React__default.createElement(AnimatedBox, {
    flexShrink: "0",
    position: isMobile && isBagExpanded ? "fixed" : "static",
    style: {
      transform: gridX.to(function (x) {
        return "translate(".concat(Number(x) - (!isMobile && isFiltersExpanded ? FILTER_SIDEBAR_WIDTH : -PADDING), "px)");
      })
    },
    paddingY: "20"
  }, /*#__PURE__*/React__default.createElement(Row, {
    gap: "8",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default.createElement(FilterButton, {
    isMobile: isMobile,
    isFiltersExpanded: isFiltersExpanded,
    onClick: function onClick() {
      return setFiltersExpanded(!isFiltersExpanded);
    }
  })), /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(CollectionFiltersRow, {
    collections: walletCollections,
    collectionFilters: collectionFilters,
    setCollectionFilters: setCollectionFilters,
    clearCollectionFilters: clearCollectionFilters
  })), /*#__PURE__*/React__default.createElement(InfiniteScroll, {
    next: loadMore,
    hasMore: hasNext !== null && hasNext !== void 0 ? hasNext : false,
    loader: Boolean(hasNext && (ownerAssets === null || ownerAssets === void 0 ? void 0 : ownerAssets.length)) && /*#__PURE__*/React__default.createElement(LoadingAssets, {
      count: DEFAULT_WALLET_ASSET_QUERY_AMOUNT
    }),
    dataLength: (_ownerAssets$length = ownerAssets === null || ownerAssets === void 0 ? void 0 : ownerAssets.length) !== null && _ownerAssets$length !== void 0 ? _ownerAssets$length : 0,
    className: ownerAssets !== null && ownerAssets !== void 0 && ownerAssets.length ? assetList : undefined,
    style: {
      overflow: "unset"
    }
  }, ownerAssets !== null && ownerAssets !== void 0 && ownerAssets.length ? ownerAssets.map(function (asset, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: index
    }, /*#__PURE__*/React__default.createElement(ViewMyNftsAsset, {
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
  var handleClearAllClick = useCallback(function () {
    return clearCollectionFilters();
  }, [clearCollectionFilters]);
  return /*#__PURE__*/React__default.createElement(Row, {
    paddingY: "18",
    gap: "8",
    flexWrap: "wrap"
  }, Boolean(collectionFilters === null || collectionFilters === void 0 ? void 0 : collectionFilters.length) && collectionFilters.map(function (collectionAddress, index) {
    return /*#__PURE__*/React__default.createElement(CollectionFilterItem, {
      collection: getCollection(collectionAddress),
      key: "CollectionFilterItem-".concat(collectionAddress, "-").concat(index),
      setCollectionFilters: setCollectionFilters
    });
  }), Boolean(collectionFilters === null || collectionFilters === void 0 ? void 0 : collectionFilters.length) && /*#__PURE__*/React__default.createElement(ClearAllButton, {
    onClick: handleClearAllClick
  }, "Clear all"));
};
var CollectionFilterItem = function CollectionFilterItem(_ref8) {
  var collection = _ref8.collection,
    setCollectionFilters = _ref8.setCollectionFilters;
  if (!collection) return null;
  return /*#__PURE__*/React__default.createElement(Row, {
    justifyContent: "center",
    paddingTop: "6",
    paddingRight: "6",
    paddingBottom: "6",
    paddingLeft: "12",
    borderRadius: "8",
    background: "surface3",
    fontSize: "14"
  }, /*#__PURE__*/React__default.createElement(Box, {
    as: "img",
    borderRadius: "round",
    width: "20",
    height: "20",
    src: collection.image
  }), /*#__PURE__*/React__default.createElement(Box, {
    marginLeft: "6",
    className: collectionFilterBubbleText
  }, collection === null || collection === void 0 ? void 0 : collection.name), /*#__PURE__*/React__default.createElement(Box, {
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
  }, /*#__PURE__*/React__default.createElement(CrossIcon, null)));
};

export { DEFAULT_WALLET_ASSET_QUERY_AMOUNT, ProfilePage, WALLET_COLLECTIONS_PAGINATION_LIMIT };
