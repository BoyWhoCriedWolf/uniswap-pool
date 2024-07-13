import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { parseEther } from 'ethers/lib/utils';
import gql from '../../../../node_modules/graphql-tag/lib/index.js';
import { useCallback, useMemo } from 'react';
import '@babel/runtime/helpers/toConsumableArray';
import '../../../nft/components/icons.js';
import 'uuid';
import { wrapScientificNotation } from '../../../nft/utils/currency.js';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../../nft/utils/pooledAssets.js';
import '../../../nft/utils/time.js';
import '@ethersproject/bignumber';
import '@ethersproject/units';
import { useNftBalanceQuery } from '../__generated__/types-and-hooks.js';

var _templateObject;
gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query NftBalance(\n    $ownerAddress: String!\n    $filter: NftBalancesFilterInput\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n  ) {\n    nftBalances(\n      ownerAddress: $ownerAddress\n      filter: $filter\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n    ) {\n      edges {\n        node {\n          ownedAsset {\n            id\n            animationUrl\n            collection {\n              id\n              isVerified\n              image {\n                id\n                url\n              }\n              name\n              twitterName\n              nftContracts {\n                id\n                address\n                chain\n                name\n                standard\n                symbol\n                totalSupply\n              }\n              markets(currencies: ETH) {\n                id\n                floorPrice {\n                  id\n                  value\n                }\n              }\n            }\n            description\n            flaggedBy\n            image {\n              id\n              url\n            }\n            originalImage {\n              id\n              url\n            }\n            name\n            ownerAddress\n            smallImage {\n              id\n              url\n            }\n            suspiciousFlag\n            tokenId\n            thumbnail {\n              id\n              url\n            }\n            listings(first: 1) {\n              edges {\n                node {\n                  price {\n                    id\n                    value\n                    currency\n                  }\n                  createdAt\n                  marketplace\n                  endAt\n                }\n              }\n            }\n          }\n          listedMarketplaces\n          listingFees {\n            id\n            payoutAddress\n            basisPoints\n          }\n          lastPrice {\n            id\n            currency\n            timestamp\n            value\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"])));
function useNftBalance(ownerAddress, collectionFilters, assetsFilter, first, after, last, before) {
  var _data$nftBalances, _data$nftBalances3, _data$nftBalances4;
  var skip = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var _useNftBalanceQuery = useNftBalanceQuery({
      variables: {
        ownerAddress: ownerAddress,
        filter: assetsFilter && assetsFilter.length > 0 ? {
          assets: assetsFilter
        } : {
          addresses: collectionFilters
        },
        first: first,
        after: after,
        last: last,
        before: before
      },
      skip: skip
    }),
    data = _useNftBalanceQuery.data,
    loading = _useNftBalanceQuery.loading,
    fetchMore = _useNftBalanceQuery.fetchMore;
  var hasNext = data === null || data === void 0 || (_data$nftBalances = data.nftBalances) === null || _data$nftBalances === void 0 || (_data$nftBalances = _data$nftBalances.pageInfo) === null || _data$nftBalances === void 0 ? void 0 : _data$nftBalances.hasNextPage;
  var loadMore = useCallback(function () {
    var _data$nftBalances2;
    return fetchMore({
      variables: {
        after: data === null || data === void 0 || (_data$nftBalances2 = data.nftBalances) === null || _data$nftBalances2 === void 0 || (_data$nftBalances2 = _data$nftBalances2.pageInfo) === null || _data$nftBalances2 === void 0 ? void 0 : _data$nftBalances2.endCursor
      }
    });
  }, [data === null || data === void 0 || (_data$nftBalances3 = data.nftBalances) === null || _data$nftBalances3 === void 0 || (_data$nftBalances3 = _data$nftBalances3.pageInfo) === null || _data$nftBalances3 === void 0 ? void 0 : _data$nftBalances3.endCursor, fetchMore]);
  var walletAssets = data === null || data === void 0 || (_data$nftBalances4 = data.nftBalances) === null || _data$nftBalances4 === void 0 || (_data$nftBalances4 = _data$nftBalances4.edges) === null || _data$nftBalances4 === void 0 ? void 0 : _data$nftBalances4.map(function (queryAsset) {
    var _asset$listings$edges, _asset$listings, _asset$image, _asset$smallImage, _asset$listings2, _asset$collection, _asset$collection2, _asset$collection3, _asset$collection4, _queryAsset$node, _asset$collection5, _asset$collection6, _asset$collection7, _asset$collection8, _asset$collection9, _asset$collection10, _queryAsset$node$last, _asset$collection11, _queryAsset$node$list, _queryAsset$node2, _asset$listings3, _queryAsset$node$last2, _asset$listings4, _asset$listings5;
    var asset = queryAsset === null || queryAsset === void 0 ? void 0 : queryAsset.node.ownedAsset;
    var ethPrice = parseEther(wrapScientificNotation((_asset$listings$edges = asset === null || asset === void 0 || (_asset$listings = asset.listings) === null || _asset$listings === void 0 || (_asset$listings = _asset$listings.edges[0]) === null || _asset$listings === void 0 ? void 0 : _asset$listings.node.price.value) !== null && _asset$listings$edges !== void 0 ? _asset$listings$edges : 0)).toString();
    return {
      id: asset === null || asset === void 0 ? void 0 : asset.id,
      imageUrl: asset === null || asset === void 0 || (_asset$image = asset.image) === null || _asset$image === void 0 ? void 0 : _asset$image.url,
      smallImageUrl: asset === null || asset === void 0 || (_asset$smallImage = asset.smallImage) === null || _asset$smallImage === void 0 ? void 0 : _asset$smallImage.url,
      notForSale: (asset === null || asset === void 0 || (_asset$listings2 = asset.listings) === null || _asset$listings2 === void 0 || (_asset$listings2 = _asset$listings2.edges) === null || _asset$listings2 === void 0 ? void 0 : _asset$listings2.length) === 0,
      animationUrl: asset === null || asset === void 0 ? void 0 : asset.animationUrl,
      susFlag: asset === null || asset === void 0 ? void 0 : asset.suspiciousFlag,
      priceInfo: {
        ETHPrice: ethPrice,
        baseAsset: "ETH",
        baseDecimals: "18",
        basePrice: ethPrice
      },
      name: asset === null || asset === void 0 ? void 0 : asset.name,
      tokenId: asset === null || asset === void 0 ? void 0 : asset.tokenId,
      asset_contract: {
        address: asset === null || asset === void 0 || (_asset$collection = asset.collection) === null || _asset$collection === void 0 || (_asset$collection = _asset$collection.nftContracts) === null || _asset$collection === void 0 || (_asset$collection = _asset$collection[0]) === null || _asset$collection === void 0 ? void 0 : _asset$collection.address,
        tokenType: asset === null || asset === void 0 || (_asset$collection2 = asset.collection) === null || _asset$collection2 === void 0 || (_asset$collection2 = _asset$collection2.nftContracts) === null || _asset$collection2 === void 0 || (_asset$collection2 = _asset$collection2[0]) === null || _asset$collection2 === void 0 ? void 0 : _asset$collection2.standard,
        name: asset === null || asset === void 0 || (_asset$collection3 = asset.collection) === null || _asset$collection3 === void 0 ? void 0 : _asset$collection3.name,
        description: asset === null || asset === void 0 ? void 0 : asset.description,
        image_url: asset === null || asset === void 0 || (_asset$collection4 = asset.collection) === null || _asset$collection4 === void 0 || (_asset$collection4 = _asset$collection4.image) === null || _asset$collection4 === void 0 ? void 0 : _asset$collection4.url,
        payout_address: queryAsset === null || queryAsset === void 0 || (_queryAsset$node = queryAsset.node) === null || _queryAsset$node === void 0 || (_queryAsset$node = _queryAsset$node.listingFees) === null || _queryAsset$node === void 0 || (_queryAsset$node = _queryAsset$node[0]) === null || _queryAsset$node === void 0 ? void 0 : _queryAsset$node.payoutAddress
      },
      collection: {
        name: (_asset$collection5 = asset.collection) === null || _asset$collection5 === void 0 ? void 0 : _asset$collection5.name,
        isVerified: (_asset$collection6 = asset.collection) === null || _asset$collection6 === void 0 ? void 0 : _asset$collection6.isVerified,
        imageUrl: (_asset$collection7 = asset.collection) === null || _asset$collection7 === void 0 || (_asset$collection7 = _asset$collection7.image) === null || _asset$collection7 === void 0 ? void 0 : _asset$collection7.url,
        twitterUrl: (_asset$collection8 = asset.collection) !== null && _asset$collection8 !== void 0 && _asset$collection8.twitterName ? "@".concat((_asset$collection9 = asset.collection) === null || _asset$collection9 === void 0 ? void 0 : _asset$collection9.twitterName) : undefined
      },
      collectionIsVerified: asset === null || asset === void 0 || (_asset$collection10 = asset.collection) === null || _asset$collection10 === void 0 ? void 0 : _asset$collection10.isVerified,
      lastPrice: (_queryAsset$node$last = queryAsset.node.lastPrice) === null || _queryAsset$node$last === void 0 ? void 0 : _queryAsset$node$last.value,
      floorPrice: asset === null || asset === void 0 || (_asset$collection11 = asset.collection) === null || _asset$collection11 === void 0 || (_asset$collection11 = _asset$collection11.markets) === null || _asset$collection11 === void 0 || (_asset$collection11 = _asset$collection11[0]) === null || _asset$collection11 === void 0 || (_asset$collection11 = _asset$collection11.floorPrice) === null || _asset$collection11 === void 0 ? void 0 : _asset$collection11.value,
      basisPoints: (_queryAsset$node$list = queryAsset === null || queryAsset === void 0 || (_queryAsset$node2 = queryAsset.node) === null || _queryAsset$node2 === void 0 || (_queryAsset$node2 = _queryAsset$node2.listingFees) === null || _queryAsset$node2 === void 0 || (_queryAsset$node2 = _queryAsset$node2[0]) === null || _queryAsset$node2 === void 0 ? void 0 : _queryAsset$node2.basisPoints) !== null && _queryAsset$node$list !== void 0 ? _queryAsset$node$list : 0 / 10000,
      listing_date: asset === null || asset === void 0 || (_asset$listings3 = asset.listings) === null || _asset$listings3 === void 0 || (_asset$listings3 = _asset$listings3.edges) === null || _asset$listings3 === void 0 || (_asset$listings3 = _asset$listings3[0]) === null || _asset$listings3 === void 0 || (_asset$listings3 = _asset$listings3.node) === null || _asset$listings3 === void 0 || (_asset$listings3 = _asset$listings3.createdAt) === null || _asset$listings3 === void 0 ? void 0 : _asset$listings3.toString(),
      date_acquired: (_queryAsset$node$last2 = queryAsset.node.lastPrice) === null || _queryAsset$node$last2 === void 0 || (_queryAsset$node$last2 = _queryAsset$node$last2.timestamp) === null || _queryAsset$node$last2 === void 0 ? void 0 : _queryAsset$node$last2.toString(),
      sellOrders: asset === null || asset === void 0 || (_asset$listings4 = asset.listings) === null || _asset$listings4 === void 0 ? void 0 : _asset$listings4.edges.map(function (edge) {
        return edge.node;
      }),
      floor_sell_order_price: asset === null || asset === void 0 || (_asset$listings5 = asset.listings) === null || _asset$listings5 === void 0 || (_asset$listings5 = _asset$listings5.edges) === null || _asset$listings5 === void 0 || (_asset$listings5 = _asset$listings5[0]) === null || _asset$listings5 === void 0 || (_asset$listings5 = _asset$listings5.node) === null || _asset$listings5 === void 0 || (_asset$listings5 = _asset$listings5.price) === null || _asset$listings5 === void 0 ? void 0 : _asset$listings5.value
    };
  });
  return useMemo(function () {
    return {
      walletAssets: walletAssets,
      hasNext: hasNext,
      loadMore: loadMore,
      loading: loading
    };
  }, [hasNext, loadMore, loading, walletAssets]);
}

export { useNftBalance };
