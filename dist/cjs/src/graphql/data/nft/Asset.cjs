'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
require('ethers/lib/utils');
var index = require('../../../../node_modules/graphql-tag/lib/index.cjs');
require('react');
require('@babel/runtime/helpers/toConsumableArray');
require('../../../nft/components/icons.cjs');
require('uuid');
require('@ethersproject/units');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../../nft/utils/pooledAssets.cjs');
require('../../../nft/utils/time.cjs');
require('@ethersproject/bignumber');
var typesAndHooks = require('../__generated__/types-and-hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);

var _templateObject;
index["default"](_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  query Asset(\n    $address: String!\n    $orderBy: NftAssetSortableField\n    $asc: Boolean\n    $filter: NftAssetsFilterInput\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n  ) {\n    nftAssets(\n      address: $address\n      orderBy: $orderBy\n      asc: $asc\n      filter: $filter\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n    ) {\n      edges {\n        node {\n          id\n          name\n          image {\n            url\n          }\n          smallImage {\n            url\n          }\n          tokenId\n          animationUrl\n          suspiciousFlag\n          collection {\n            name\n            isVerified\n            nftContracts {\n              address\n              standard\n            }\n          }\n          listings(first: 1) {\n            edges {\n              node {\n                address\n                createdAt\n                endAt\n                id\n                maker\n                marketplace\n                marketplaceUrl\n                orderHash\n                price {\n                  currency\n                  value\n                }\n                quantity\n                startAt\n                status\n                taker\n                tokenId\n                type\n                protocolParameters\n              }\n              cursor\n            }\n          }\n          rarities {\n            rank\n          }\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"])));
var ASSET_PAGE_SIZE = 25;
({
  orderBy: typesAndHooks.NftAssetSortableField.Price,
  asc: true,
  // tokenSearchQuery must be specified so that this exactly matches the initial query.
  filter: {
    listed: false,
    tokenSearchQuery: ""
  },
  first: ASSET_PAGE_SIZE
});

exports.ASSET_PAGE_SIZE = ASSET_PAGE_SIZE;
