import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */

/**
 *  Types, unions, and inputs (alphabetized):
 * These are colocated to highlight the relationship between some types and their inputs.
 */

/**
 *  Enums (alphabetized):
 * deprecated and replaced with TransactionType, please do not use this
 */
var ActivityType = /*#__PURE__*/function (ActivityType) {
  ActivityType["Approve"] = "APPROVE";
  ActivityType["Borrow"] = "BORROW";
  ActivityType["Burn"] = "BURN";
  ActivityType["Cancel"] = "CANCEL";
  ActivityType["Claim"] = "CLAIM";
  ActivityType["Deployment"] = "DEPLOYMENT";
  ActivityType["Lend"] = "LEND";
  ActivityType["Mint"] = "MINT";
  ActivityType["Nft"] = "NFT";
  ActivityType["OnRamp"] = "ON_RAMP";
  ActivityType["Receive"] = "RECEIVE";
  ActivityType["Repay"] = "REPAY";
  ActivityType["Send"] = "SEND";
  ActivityType["Stake"] = "STAKE";
  ActivityType["Swap"] = "SWAP";
  ActivityType["SwapOrder"] = "SWAP_ORDER";
  ActivityType["Staking"] = "Staking";
  ActivityType["Unknown"] = "UNKNOWN";
  ActivityType["Unstake"] = "UNSTAKE";
  ActivityType["Withdraw"] = "WITHDRAW";
  ActivityType["Market"] = "market";
  ActivityType["Money"] = "money";
  return ActivityType;
}({});
var Chain = /*#__PURE__*/function (Chain) {
  Chain["Arbitrum"] = "ARBITRUM";
  Chain["Avalanche"] = "AVALANCHE";
  Chain["Base"] = "BASE";
  Chain["Blast"] = "BLAST";
  Chain["Bnb"] = "BNB";
  Chain["Celo"] = "CELO";
  Chain["Ethereum"] = "ETHEREUM";
  Chain["EthereumGoerli"] = "ETHEREUM_GOERLI";
  Chain["EthereumSepolia"] = "ETHEREUM_SEPOLIA";
  Chain["Optimism"] = "OPTIMISM";
  Chain["Polygon"] = "POLYGON";
  Chain["UnknownChain"] = "UNKNOWN_CHAIN";
  Chain["Zksync"] = "ZKSYNC";
  Chain["Zora"] = "ZORA";
  return Chain;
}({});
var Currency = /*#__PURE__*/function (Currency) {
  Currency["Aud"] = "AUD";
  Currency["Brl"] = "BRL";
  Currency["Cad"] = "CAD";
  Currency["Cny"] = "CNY";
  Currency["Eth"] = "ETH";
  Currency["Eur"] = "EUR";
  Currency["Gbp"] = "GBP";
  Currency["Hkd"] = "HKD";
  Currency["Idr"] = "IDR";
  Currency["Inr"] = "INR";
  Currency["Jpy"] = "JPY";
  Currency["Matic"] = "MATIC";
  Currency["Ngn"] = "NGN";
  Currency["Pkr"] = "PKR";
  Currency["Rub"] = "RUB";
  Currency["Sgd"] = "SGD";
  Currency["Thb"] = "THB";
  Currency["Try"] = "TRY";
  Currency["Uah"] = "UAH";
  Currency["Usd"] = "USD";
  Currency["Vnd"] = "VND";
  return Currency;
}({});
var NftAssetSortableField = /*#__PURE__*/function (NftAssetSortableField) {
  NftAssetSortableField["Price"] = "PRICE";
  NftAssetSortableField["Rarity"] = "RARITY";
  return NftAssetSortableField;
}({});
var NftStandard = /*#__PURE__*/function (NftStandard) {
  NftStandard["Erc721"] = "ERC721";
  NftStandard["Erc1155"] = "ERC1155";
  NftStandard["Noncompliant"] = "NONCOMPLIANT";
  return NftStandard;
}({});
var SwapOrderStatus = /*#__PURE__*/function (SwapOrderStatus) {
  SwapOrderStatus["Cancelled"] = "CANCELLED";
  SwapOrderStatus["Error"] = "ERROR";
  SwapOrderStatus["Expired"] = "EXPIRED";
  SwapOrderStatus["Filled"] = "FILLED";
  SwapOrderStatus["InsufficientFunds"] = "INSUFFICIENT_FUNDS";
  SwapOrderStatus["Open"] = "OPEN";
  return SwapOrderStatus;
}({});
var TokenStandard = /*#__PURE__*/function (TokenStandard) {
  TokenStandard["Erc20"] = "ERC20";
  TokenStandard["Native"] = "NATIVE";
  return TokenStandard;
}({});
var TokenTradeType = /*#__PURE__*/function (TokenTradeType) {
  TokenTradeType["ExactInput"] = "EXACT_INPUT";
  TokenTradeType["ExactOutput"] = "EXACT_OUTPUT";
  return TokenTradeType;
}({});
var TransactionStatus = /*#__PURE__*/function (TransactionStatus) {
  TransactionStatus["Confirmed"] = "CONFIRMED";
  TransactionStatus["Failed"] = "FAILED";
  TransactionStatus["Pending"] = "PENDING";
  return TransactionStatus;
}({});
gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    fragment TransactionParts on Transaction {\n  id\n  blockNumber\n  hash\n  status\n  to\n  from\n  nonce\n}\n    "])));
var TokenAssetPartsFragmentDoc = gql(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    fragment TokenAssetParts on Token {\n  id\n  name\n  symbol\n  address\n  decimals\n  chain\n  standard\n  project {\n    id\n    isSpam\n    logo {\n      id\n      url\n    }\n  }\n}\n    "])));
var TokenTransferPartsFragmentDoc = gql(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    fragment TokenTransferParts on TokenTransfer {\n  id\n  asset {\n    ...TokenAssetParts\n  }\n  tokenStandard\n  quantity\n  sender\n  recipient\n  direction\n  transactedValue {\n    id\n    currency\n    value\n  }\n}\n    ", ""])), TokenAssetPartsFragmentDoc);
var NftAssetPartsFragmentDoc = gql(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    fragment NFTAssetParts on NftAsset {\n  id\n  name\n  nftContract {\n    id\n    chain\n    address\n  }\n  tokenId\n  image {\n    id\n    url\n  }\n  collection {\n    id\n    name\n  }\n}\n    "])));
var NftTransferPartsFragmentDoc = gql(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    fragment NFTTransferParts on NftTransfer {\n  id\n  asset {\n    ...NFTAssetParts\n  }\n  nftStandard\n  sender\n  recipient\n  direction\n}\n    ", ""])), NftAssetPartsFragmentDoc);
var TokenApprovalPartsFragmentDoc = gql(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    fragment TokenApprovalParts on TokenApproval {\n  id\n  asset {\n    ...TokenAssetParts\n  }\n  tokenStandard\n  approvedAddress\n  quantity\n}\n    ", ""])), TokenAssetPartsFragmentDoc);
var NftApprovalPartsFragmentDoc = gql(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    fragment NFTApprovalParts on NftApproval {\n  id\n  asset {\n    ...NFTAssetParts\n  }\n  nftStandard\n  approvedAddress\n}\n    ", ""])), NftAssetPartsFragmentDoc);
var NftApproveForAllPartsFragmentDoc = gql(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    fragment NFTApproveForAllParts on NftApproveForAll {\n  id\n  asset {\n    ...NFTAssetParts\n  }\n  nftStandard\n  operatorAddress\n  approved\n}\n    ", ""])), NftAssetPartsFragmentDoc);
var TransactionDetailsPartsFragmentDoc = gql(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    fragment TransactionDetailsParts on TransactionDetails {\n  id\n  type\n  from\n  to\n  hash\n  nonce\n  status\n  assetChanges {\n    __typename\n    ... on TokenTransfer {\n      ...TokenTransferParts\n    }\n    ... on NftTransfer {\n      ...NFTTransferParts\n    }\n    ... on TokenApproval {\n      ...TokenApprovalParts\n    }\n    ... on NftApproval {\n      ...NFTApprovalParts\n    }\n    ... on NftApproveForAll {\n      ...NFTApproveForAllParts\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""])), TokenTransferPartsFragmentDoc, NftTransferPartsFragmentDoc, TokenApprovalPartsFragmentDoc, NftApprovalPartsFragmentDoc, NftApproveForAllPartsFragmentDoc);
var SwapOrderDetailsPartsFragmentDoc = gql(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    fragment SwapOrderDetailsParts on SwapOrderDetails {\n  id\n  offerer\n  hash\n  orderStatus: status\n  inputToken {\n    ...TokenAssetParts\n  }\n  inputTokenQuantity\n  outputToken {\n    ...TokenAssetParts\n  }\n  outputTokenQuantity\n}\n    ", ""])), TokenAssetPartsFragmentDoc);
var AssetActivityPartsFragmentDoc = gql(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n    fragment AssetActivityParts on AssetActivity {\n  id\n  timestamp\n  chain\n  details {\n    __typename\n    ... on TransactionDetails {\n      ...TransactionDetailsParts\n    }\n    ... on SwapOrderDetails {\n      ...SwapOrderDetailsParts\n    }\n  }\n}\n    ", "\n", ""])), TransactionDetailsPartsFragmentDoc, SwapOrderDetailsPartsFragmentDoc);
var ConvertDocument = gql(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n    query Convert($toCurrency: Currency!) {\n  convert(fromAmount: {currency: USD, value: 1.0}, toCurrency: $toCurrency) {\n    id\n    value\n    currency\n  }\n}\n    "])));

/**
 * __useConvertQuery__
 *
 * To run a query within a React component, call `useConvertQuery` and pass it any options that fit your needs.
 * When your component renders, `useConvertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConvertQuery({
 *   variables: {
 *      toCurrency: // value for 'toCurrency'
 *   },
 * });
 */
function useConvertQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(ConvertDocument, options);
}
gql(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n    query RecentlySearchedAssets($collectionAddresses: [String!]!, $contracts: [ContractInput!]!) {\n  nftCollections(filter: {addresses: $collectionAddresses}) {\n    edges {\n      node {\n        collectionId\n        image {\n          url\n        }\n        isVerified\n        name\n        numAssets\n        nftContracts {\n          address\n        }\n        markets(currencies: ETH) {\n          floorPrice {\n            currency\n            value\n          }\n        }\n      }\n    }\n  }\n  tokens(contracts: $contracts) {\n    id\n    decimals\n    name\n    chain\n    standard\n    address\n    symbol\n    market(currency: USD) {\n      id\n      price {\n        id\n        value\n        currency\n      }\n      pricePercentChange(duration: DAY) {\n        id\n        value\n      }\n      volume24H: volume(duration: DAY) {\n        id\n        value\n        currency\n      }\n    }\n    project {\n      id\n      logoUrl\n      safetyLevel\n    }\n  }\n}\n    "])));
gql(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n    query SearchTokens($searchQuery: String!) {\n  searchTokens(searchQuery: $searchQuery) {\n    id\n    decimals\n    name\n    chain\n    standard\n    address\n    symbol\n    market(currency: USD) {\n      id\n      price {\n        id\n        value\n        currency\n      }\n      pricePercentChange(duration: DAY) {\n        id\n        value\n      }\n      volume24H: volume(duration: DAY) {\n        id\n        value\n        currency\n      }\n    }\n    project {\n      id\n      logoUrl\n      safetyLevel\n    }\n  }\n}\n    "])));
gql(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n    query Token($chain: Chain!, $address: String = null) {\n  token(chain: $chain, address: $address) {\n    id\n    decimals\n    name\n    chain\n    address\n    symbol\n    standard\n    market(currency: USD) {\n      id\n      totalValueLocked {\n        id\n        value\n        currency\n      }\n      price {\n        id\n        value\n        currency\n      }\n      volume24H: volume(duration: DAY) {\n        id\n        value\n        currency\n      }\n      priceHigh52W: priceHighLow(duration: YEAR, highLow: HIGH) {\n        id\n        value\n      }\n      priceLow52W: priceHighLow(duration: YEAR, highLow: LOW) {\n        id\n        value\n      }\n    }\n    project {\n      id\n      description\n      homepageUrl\n      twitterName\n      logoUrl\n      tokens {\n        id\n        chain\n        address\n      }\n    }\n  }\n}\n    "])));
gql(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n    query TokenPrice($chain: Chain!, $address: String = null, $duration: HistoryDuration!) {\n  token(chain: $chain, address: $address) {\n    id\n    address\n    chain\n    market(currency: USD) {\n      id\n      price {\n        id\n        value\n      }\n      priceHistory(duration: $duration) {\n        id\n        timestamp\n        value\n      }\n    }\n  }\n}\n    "])));
var UniswapPricesDocument = gql(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n    query UniswapPrices($contracts: [ContractInput!]!) {\n  tokens(contracts: $contracts) {\n    id\n    address\n    chain\n    standard\n    project {\n      id\n      markets(currencies: [USD]) {\n        id\n        price {\n          id\n          value\n        }\n      }\n    }\n  }\n}\n    "])));

/**
 * __useUniswapPricesQuery__
 *
 * To run a query within a React component, call `useUniswapPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUniswapPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUniswapPricesQuery({
 *   variables: {
 *      contracts: // value for 'contracts'
 *   },
 * });
 */
function useUniswapPricesQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(UniswapPricesDocument, options);
}
var TokenSpotPriceDocument = gql(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n    query TokenSpotPrice($chain: Chain!, $address: String = null) {\n  token(chain: $chain, address: $address) {\n    id\n    address\n    chain\n    name\n    symbol\n    project {\n      id\n      markets(currencies: [USD]) {\n        id\n        price {\n          id\n          value\n        }\n      }\n    }\n  }\n}\n    "])));

/**
 * __useTokenSpotPriceQuery__
 *
 * To run a query within a React component, call `useTokenSpotPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useTokenSpotPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenSpotPriceQuery({
 *   variables: {
 *      chain: // value for 'chain'
 *      address: // value for 'address'
 *   },
 * });
 */
function useTokenSpotPriceQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(TokenSpotPriceDocument, options);
}
gql(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n    query TopTokens100($duration: HistoryDuration!, $chain: Chain!) {\n  topTokens(pageSize: 100, page: 1, chain: $chain, orderBy: VOLUME) {\n    id\n    name\n    chain\n    address\n    symbol\n    standard\n    market(currency: USD) {\n      id\n      totalValueLocked {\n        id\n        value\n        currency\n      }\n      price {\n        id\n        value\n        currency\n      }\n      pricePercentChange(duration: $duration) {\n        id\n        currency\n        value\n      }\n      volume(duration: $duration) {\n        id\n        value\n        currency\n      }\n    }\n    project {\n      id\n      logoUrl\n    }\n  }\n}\n    "])));
gql(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n    query TopTokensSparkline($duration: HistoryDuration!, $chain: Chain!) {\n  topTokens(pageSize: 100, page: 1, chain: $chain, orderBy: VOLUME) {\n    id\n    address\n    chain\n    market(currency: USD) {\n      id\n      priceHistory(duration: $duration) {\n        id\n        timestamp\n        value\n      }\n    }\n  }\n}\n    "])));
gql(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n    query TrendingTokens($chain: Chain!) {\n  topTokens(pageSize: 4, page: 1, chain: $chain, orderBy: VOLUME) {\n    id\n    decimals\n    name\n    chain\n    standard\n    address\n    symbol\n    market(currency: USD) {\n      id\n      price {\n        id\n        value\n        currency\n      }\n      pricePercentChange(duration: DAY) {\n        id\n        value\n      }\n      volume24H: volume(duration: DAY) {\n        id\n        value\n        currency\n      }\n    }\n    project {\n      id\n      logoUrl\n      safetyLevel\n    }\n  }\n}\n    "])));
var ActivityDocument = gql(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["\n    query Activity($account: String!) {\n  portfolios(ownerAddresses: [$account]) {\n    id\n    assetActivities(pageSize: 100, page: 1, includeOffChain: true) {\n      ...AssetActivityParts\n    }\n  }\n}\n    ", ""])), AssetActivityPartsFragmentDoc);

/**
 * __useActivityQuery__
 *
 * To run a query within a React component, call `useActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
function useActivityQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(ActivityDocument, options);
}
gql(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["\n    query Asset($address: String!, $orderBy: NftAssetSortableField, $asc: Boolean, $filter: NftAssetsFilterInput, $first: Int, $after: String, $last: Int, $before: String) {\n  nftAssets(\n    address: $address\n    orderBy: $orderBy\n    asc: $asc\n    filter: $filter\n    first: $first\n    after: $after\n    last: $last\n    before: $before\n  ) {\n    edges {\n      node {\n        id\n        name\n        image {\n          url\n        }\n        smallImage {\n          url\n        }\n        tokenId\n        animationUrl\n        suspiciousFlag\n        collection {\n          name\n          isVerified\n          nftContracts {\n            address\n            standard\n          }\n        }\n        listings(first: 1) {\n          edges {\n            node {\n              address\n              createdAt\n              endAt\n              id\n              maker\n              marketplace\n              marketplaceUrl\n              orderHash\n              price {\n                currency\n                value\n              }\n              quantity\n              startAt\n              status\n              taker\n              tokenId\n              type\n              protocolParameters\n            }\n            cursor\n          }\n        }\n        rarities {\n          rank\n        }\n      }\n      cursor\n    }\n    totalCount\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n    "])));
gql(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["\n    query Collection($addresses: [String!]!) {\n  nftCollections(filter: {addresses: $addresses}) {\n    edges {\n      cursor\n      node {\n        bannerImage {\n          url\n        }\n        collectionId\n        description\n        discordUrl\n        homepageUrl\n        image {\n          url\n        }\n        instagramName\n        isVerified\n        name\n        numAssets\n        twitterName\n        nftContracts {\n          address\n          chain\n          name\n          standard\n          symbol\n          totalSupply\n        }\n        traits {\n          name\n          values\n          stats {\n            name\n            value\n            assets\n            listings\n          }\n        }\n        markets(currencies: ETH) {\n          floorPrice {\n            currency\n            value\n          }\n          owners\n          totalVolume {\n            value\n            currency\n          }\n          listings {\n            value\n          }\n          volume(duration: DAY) {\n            value\n            currency\n          }\n          volumePercentChange(duration: DAY) {\n            value\n            currency\n          }\n          floorPricePercentChange(duration: DAY) {\n            value\n            currency\n          }\n          marketplaces {\n            marketplace\n            listings\n            floorPrice\n          }\n        }\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n    "])));
gql(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["\n    query CollectionSearch($query: String!) {\n  nftCollections(filter: {nameQuery: $query}) {\n    edges {\n      cursor\n      node {\n        image {\n          url\n        }\n        isVerified\n        name\n        numAssets\n        nftContracts {\n          address\n          chain\n          name\n          symbol\n          totalSupply\n        }\n        markets(currencies: ETH) {\n          floorPrice {\n            currency\n            value\n          }\n        }\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n    "])));
gql(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["\n    query Details($address: String!, $tokenId: String!) {\n  nftAssets(address: $address, filter: {listed: false, tokenIds: [$tokenId]}) {\n    edges {\n      node {\n        id\n        name\n        ownerAddress\n        image {\n          url\n        }\n        smallImage {\n          url\n        }\n        originalImage {\n          url\n        }\n        tokenId\n        description\n        animationUrl\n        suspiciousFlag\n        creator {\n          address\n          profileImage {\n            url\n          }\n          isVerified\n        }\n        collection {\n          name\n          isVerified\n          numAssets\n          twitterName\n          discordUrl\n          homepageUrl\n          image {\n            url\n          }\n          nftContracts {\n            address\n            standard\n          }\n          description\n        }\n        listings(first: 1) {\n          edges {\n            node {\n              address\n              createdAt\n              endAt\n              id\n              maker\n              marketplace\n              marketplaceUrl\n              orderHash\n              price {\n                currency\n                value\n              }\n              quantity\n              startAt\n              status\n              taker\n              tokenId\n              type\n              protocolParameters\n            }\n            cursor\n          }\n        }\n        rarities {\n          provider\n          rank\n          score\n        }\n        metadataUrl\n        traits {\n          name\n          value\n        }\n      }\n    }\n  }\n}\n    "])));
gql(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["\n    query NftActivity($filter: NftActivityFilterInput, $after: String, $first: Int) {\n  nftActivity(filter: $filter, after: $after, first: $first) {\n    edges {\n      node {\n        id\n        address\n        tokenId\n        asset {\n          id\n          metadataUrl\n          image {\n            id\n            url\n          }\n          smallImage {\n            id\n            url\n          }\n          name\n          rarities {\n            id\n            provider\n            rank\n            score\n          }\n          suspiciousFlag\n          nftContract {\n            id\n            standard\n          }\n          collection {\n            id\n            image {\n              id\n              url\n            }\n          }\n        }\n        type\n        marketplace\n        fromAddress\n        toAddress\n        transactionHash\n        price {\n          id\n          value\n        }\n        orderStatus\n        quantity\n        url\n        timestamp\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n    "])));
var NftBalanceDocument = gql(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["\n    query NftBalance($ownerAddress: String!, $filter: NftBalancesFilterInput, $first: Int, $after: String, $last: Int, $before: String) {\n  nftBalances(\n    ownerAddress: $ownerAddress\n    filter: $filter\n    first: $first\n    after: $after\n    last: $last\n    before: $before\n  ) {\n    edges {\n      node {\n        ownedAsset {\n          id\n          animationUrl\n          collection {\n            id\n            isVerified\n            image {\n              id\n              url\n            }\n            name\n            twitterName\n            nftContracts {\n              id\n              address\n              chain\n              name\n              standard\n              symbol\n              totalSupply\n            }\n            markets(currencies: ETH) {\n              id\n              floorPrice {\n                id\n                value\n              }\n            }\n          }\n          description\n          flaggedBy\n          image {\n            id\n            url\n          }\n          originalImage {\n            id\n            url\n          }\n          name\n          ownerAddress\n          smallImage {\n            id\n            url\n          }\n          suspiciousFlag\n          tokenId\n          thumbnail {\n            id\n            url\n          }\n          listings(first: 1) {\n            edges {\n              node {\n                price {\n                  id\n                  value\n                  currency\n                }\n                createdAt\n                marketplace\n                endAt\n              }\n            }\n          }\n        }\n        listedMarketplaces\n        listingFees {\n          id\n          payoutAddress\n          basisPoints\n        }\n        lastPrice {\n          id\n          currency\n          timestamp\n          value\n        }\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n    "])));

/**
 * __useNftBalanceQuery__
 *
 * To run a query within a React component, call `useNftBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftBalanceQuery({
 *   variables: {
 *      ownerAddress: // value for 'ownerAddress'
 *      filter: // value for 'filter'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
function useNftBalanceQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(NftBalanceDocument, options);
}
var NftUniversalRouterAddressDocument = gql(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["\n    query NftUniversalRouterAddress($chain: Chain = ETHEREUM) {\n  nftRoute(chain: $chain, senderAddress: \"\", nftTrades: []) {\n    toAddress\n  }\n}\n    "])));

/**
 * __useNftUniversalRouterAddressQuery__
 *
 * To run a query within a React component, call `useNftUniversalRouterAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftUniversalRouterAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftUniversalRouterAddressQuery({
 *   variables: {
 *      chain: // value for 'chain'
 *   },
 * });
 */
function useNftUniversalRouterAddressQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(NftUniversalRouterAddressDocument, options);
}
var NftRouteDocument = gql(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["\n    query NftRoute($chain: Chain = ETHEREUM, $senderAddress: String!, $nftTrades: [NftTradeInput!]!, $tokenTrades: [TokenTradeInput!]) {\n  nftRoute(\n    chain: $chain\n    senderAddress: $senderAddress\n    nftTrades: $nftTrades\n    tokenTrades: $tokenTrades\n  ) {\n    id\n    calldata\n    route {\n      amount\n      contractAddress\n      id\n      marketplace\n      price {\n        id\n        currency\n        value\n      }\n      quotePrice {\n        id\n        currency\n        value\n      }\n      tokenId\n      tokenType\n    }\n    sendAmount {\n      id\n      currency\n      value\n    }\n    toAddress\n  }\n}\n    "])));
function useNftRouteLazyQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useLazyQuery(NftRouteDocument, options);
}
gql(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["\n    query TrendingCollections($size: Int, $timePeriod: HistoryDuration) {\n  topCollections(first: $size, duration: $timePeriod) {\n    edges {\n      node {\n        name\n        nftContracts {\n          address\n          totalSupply\n        }\n        image {\n          url\n        }\n        bannerImage {\n          url\n        }\n        isVerified\n        markets(currencies: ETH) {\n          floorPrice {\n            value\n          }\n          owners\n          totalVolume {\n            value\n          }\n          volume(duration: $timePeriod) {\n            value\n          }\n          volumePercentChange(duration: $timePeriod) {\n            value\n          }\n          floorPricePercentChange(duration: $timePeriod) {\n            value\n          }\n          sales {\n            value\n          }\n          listings {\n            value\n          }\n        }\n      }\n    }\n  }\n}\n    "])));
var PortfolioBalancesDocument = gql(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["\n    query PortfolioBalances($ownerAddress: String!, $chains: [Chain!]!) {\n  portfolios(ownerAddresses: [$ownerAddress], chains: $chains) {\n    id\n    tokensTotalDenominatedValue {\n      id\n      value\n    }\n    tokensTotalDenominatedValueChange(duration: DAY) {\n      absolute {\n        id\n        value\n      }\n      percentage {\n        id\n        value\n      }\n    }\n    tokenBalances {\n      id\n      quantity\n      denominatedValue {\n        id\n        currency\n        value\n      }\n      tokenProjectMarket {\n        id\n        pricePercentChange(duration: DAY) {\n          id\n          value\n        }\n        tokenProject {\n          id\n          logoUrl\n          isSpam\n        }\n      }\n      token {\n        id\n        chain\n        address\n        name\n        symbol\n        standard\n        decimals\n      }\n    }\n  }\n}\n    "])));

/**
 * __usePortfolioBalancesQuery__
 *
 * To run a query within a React component, call `usePortfolioBalancesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioBalancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioBalancesQuery({
 *   variables: {
 *      ownerAddress: // value for 'ownerAddress'
 *      chains: // value for 'chains'
 *   },
 * });
 */
function usePortfolioBalancesQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useQuery(PortfolioBalancesDocument, options);
}
function usePortfolioBalancesLazyQuery(baseOptions) {
  var options = _objectSpread(_objectSpread({}, defaultOptions), baseOptions);
  return Apollo.useLazyQuery(PortfolioBalancesDocument, options);
}

export { ActivityDocument, ActivityType, AssetActivityPartsFragmentDoc, Chain, ConvertDocument, Currency, NftApprovalPartsFragmentDoc, NftApproveForAllPartsFragmentDoc, NftAssetPartsFragmentDoc, NftAssetSortableField, NftBalanceDocument, NftRouteDocument, NftStandard, NftTransferPartsFragmentDoc, NftUniversalRouterAddressDocument, PortfolioBalancesDocument, SwapOrderDetailsPartsFragmentDoc, SwapOrderStatus, TokenApprovalPartsFragmentDoc, TokenAssetPartsFragmentDoc, TokenSpotPriceDocument, TokenStandard, TokenTradeType, TokenTransferPartsFragmentDoc, TransactionDetailsPartsFragmentDoc, TransactionStatus, UniswapPricesDocument, useActivityQuery, useConvertQuery, useNftBalanceQuery, useNftRouteLazyQuery, useNftUniversalRouterAddressQuery, usePortfolioBalancesLazyQuery, usePortfolioBalancesQuery, useTokenSpotPriceQuery, useUniswapPricesQuery };
