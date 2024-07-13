import '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import 'ethers/lib/utils';
import gql from '../../../../node_modules/graphql-tag/lib/index.js';
import 'react';
import '@babel/runtime/helpers/toConsumableArray';
import '../../../nft/components/icons.js';
import 'uuid';
import '@ethersproject/units';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../../nft/utils/pooledAssets.js';
import '../../../nft/utils/time.js';
import '@ethersproject/bignumber';
import { NftAssetSortableField } from '../__generated__/types-and-hooks.js';

var _templateObject;
gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query Asset(\n    $address: String!\n    $orderBy: NftAssetSortableField\n    $asc: Boolean\n    $filter: NftAssetsFilterInput\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n  ) {\n    nftAssets(\n      address: $address\n      orderBy: $orderBy\n      asc: $asc\n      filter: $filter\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n    ) {\n      edges {\n        node {\n          id\n          name\n          image {\n            url\n          }\n          smallImage {\n            url\n          }\n          tokenId\n          animationUrl\n          suspiciousFlag\n          collection {\n            name\n            isVerified\n            nftContracts {\n              address\n              standard\n            }\n          }\n          listings(first: 1) {\n            edges {\n              node {\n                address\n                createdAt\n                endAt\n                id\n                maker\n                marketplace\n                marketplaceUrl\n                orderHash\n                price {\n                  currency\n                  value\n                }\n                quantity\n                startAt\n                status\n                taker\n                tokenId\n                type\n                protocolParameters\n              }\n              cursor\n            }\n          }\n          rarities {\n            rank\n          }\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"])));
var ASSET_PAGE_SIZE = 25;
({
  orderBy: NftAssetSortableField.Price,
  asc: true,
  // tokenSearchQuery must be specified so that this exactly matches the initial query.
  filter: {
    listed: false,
    tokenSearchQuery: ""
  },
  first: ASSET_PAGE_SIZE
});

export { ASSET_PAGE_SIZE };
