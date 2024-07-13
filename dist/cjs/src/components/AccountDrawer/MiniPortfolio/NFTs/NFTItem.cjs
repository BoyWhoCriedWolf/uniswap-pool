'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var analyticsEvents = require('@uniswap/analytics-events');
var index$4 = require('../../../../analytics/index.cjs');
var index$2 = require('../../index.cjs');
var index$1 = require('../../../Column/index.cjs');
var index = require('../../../Row/index.cjs');
var Box = require('../../../../nft/components/Box.cjs');
var index$3 = require('../../../../nft/components/card/index.cjs');
var utils = require('../../../../nft/components/card/utils.cjs');
var icons = require('../../../../nft/components/icons.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('uuid');
require('@ethersproject/units');
require('video-extensions');
var numbers = require('../../../../nft/utils/numbers.cjs');
require('../../../../nft/utils/pooledAssets.cjs');
require('../../../../nft/utils/time.cjs');
require('@ethersproject/bignumber');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var text = require('../../../../theme/components/text.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var FloorPrice = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  opacity: 0;\n\n  // prevent empty whitespace from collapsing line height to maintain\n  // consistent spacing below rows\n  white-space: pre;\n"])));
var NFTContainer = styled__default["default"](index$1.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  gap: 8px;\n  min-height: 150px;\n\n  &:hover {\n    ", " {\n      opacity: 1;\n    }\n  }\n"])), FloorPrice);
var NFTCollectionName = styled__default["default"](text.ThemedText.BodySmall)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  white-space: pre;\n  text-overflow: ellipsis;\n  overflow: hidden;\n"])));
function NFT(_ref) {
  var asset = _ref.asset,
    mediaShouldBePlaying = _ref.mediaShouldBePlaying,
    setCurrentTokenPlayingMedia = _ref.setCurrentTokenPlayingMedia;
  var toggleWalletDrawer = index$2.useToggleAccountDrawer();
  var navigate = reactRouterDom.useNavigate();
  var trace = analytics.useTrace();
  var navigateToNFTDetails = function navigateToNFTDetails() {
    toggleWalletDrawer();
    navigate(utils.detailsHref(asset));
  };
  return /*#__PURE__*/React__default["default"].createElement(NFTContainer, null, /*#__PURE__*/React__default["default"].createElement(index$3.NftCard, {
    asset: asset,
    hideDetails: true,
    display: {
      disabledInfo: true
    },
    isSelected: false,
    isDisabled: false,
    onCardClick: navigateToNFTDetails,
    sendAnalyticsEvent: function sendAnalyticsEvent() {
      var _asset$collection, _asset$collection2;
      return index$4.sendAnalyticsEvent(analyticsEvents.SharedEventName.ELEMENT_CLICKED, _objectSpread({
        element: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_NFT_ITEM,
        collection_name: (_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.name,
        collection_address: (_asset$collection2 = asset.collection) === null || _asset$collection2 === void 0 ? void 0 : _asset$collection2.address,
        token_id: asset.tokenId
      }, trace));
    },
    mediaShouldBePlaying: mediaShouldBePlaying,
    setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
    testId: "mini-portfolio-nft"
  }), /*#__PURE__*/React__default["default"].createElement(NFTDetails, {
    asset: asset
  }));
}
function NFTDetails(_ref2) {
  var asset = _ref2.asset;
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    overflow: "hidden",
    width: "full",
    flexWrap: "nowrap"
  }, /*#__PURE__*/React__default["default"].createElement(index["default"], {
    gap: "4px"
  }, /*#__PURE__*/React__default["default"].createElement(NFTCollectionName, null, asset.asset_contract.name), asset.collectionIsVerified && /*#__PURE__*/React__default["default"].createElement(Verified, null)), /*#__PURE__*/React__default["default"].createElement(FloorPrice, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, asset.floorPrice ? "".concat(numbers.floorFormatter(asset.floorPrice), " ETH") : " ")));
}
var BADGE_SIZE = "18px";
function Verified() {
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    width: "unset",
    flexShrink: "0"
  }, /*#__PURE__*/React__default["default"].createElement(icons.VerifiedIcon, {
    height: BADGE_SIZE,
    width: BADGE_SIZE
  }));
}

exports.NFT = NFT;
