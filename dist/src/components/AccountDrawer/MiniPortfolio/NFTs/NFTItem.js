import React__default from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { InterfaceElementName, SharedEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../../../analytics/index.js';
import { useToggleAccountDrawer } from '../../index.js';
import { Column } from '../../../Column/index.js';
import Row from '../../../Row/index.js';
import { Box } from '../../../../nft/components/Box.js';
import { NftCard } from '../../../../nft/components/card/index.js';
import { detailsHref } from '../../../../nft/components/card/utils.js';
import { VerifiedIcon } from '../../../../nft/components/icons.js';
import '@babel/runtime/helpers/toConsumableArray';
import 'uuid';
import '@ethersproject/units';
import 'video-extensions';
import { floorFormatter } from '../../../../nft/utils/numbers.js';
import '../../../../nft/utils/pooledAssets.js';
import '../../../../nft/utils/time.js';
import '@ethersproject/bignumber';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../../theme/components/index.js';
import { ThemedText } from '../../../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var FloorPrice = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  opacity: 0;\n\n  // prevent empty whitespace from collapsing line height to maintain\n  // consistent spacing below rows\n  white-space: pre;\n"])));
var NFTContainer = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  gap: 8px;\n  min-height: 150px;\n\n  &:hover {\n    ", " {\n      opacity: 1;\n    }\n  }\n"])), FloorPrice);
var NFTCollectionName = styled(ThemedText.BodySmall)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  white-space: pre;\n  text-overflow: ellipsis;\n  overflow: hidden;\n"])));
function NFT(_ref) {
  var asset = _ref.asset,
    mediaShouldBePlaying = _ref.mediaShouldBePlaying,
    setCurrentTokenPlayingMedia = _ref.setCurrentTokenPlayingMedia;
  var toggleWalletDrawer = useToggleAccountDrawer();
  var navigate = useNavigate();
  var trace = useTrace();
  var navigateToNFTDetails = function navigateToNFTDetails() {
    toggleWalletDrawer();
    navigate(detailsHref(asset));
  };
  return /*#__PURE__*/React__default.createElement(NFTContainer, null, /*#__PURE__*/React__default.createElement(NftCard, {
    asset: asset,
    hideDetails: true,
    display: {
      disabledInfo: true
    },
    isSelected: false,
    isDisabled: false,
    onCardClick: navigateToNFTDetails,
    sendAnalyticsEvent: function sendAnalyticsEvent$1() {
      var _asset$collection, _asset$collection2;
      return sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, _objectSpread({
        element: InterfaceElementName.MINI_PORTFOLIO_NFT_ITEM,
        collection_name: (_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.name,
        collection_address: (_asset$collection2 = asset.collection) === null || _asset$collection2 === void 0 ? void 0 : _asset$collection2.address,
        token_id: asset.tokenId
      }, trace));
    },
    mediaShouldBePlaying: mediaShouldBePlaying,
    setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
    testId: "mini-portfolio-nft"
  }), /*#__PURE__*/React__default.createElement(NFTDetails, {
    asset: asset
  }));
}
function NFTDetails(_ref2) {
  var asset = _ref2.asset;
  return /*#__PURE__*/React__default.createElement(Box, {
    overflow: "hidden",
    width: "full",
    flexWrap: "nowrap"
  }, /*#__PURE__*/React__default.createElement(Row, {
    gap: "4px"
  }, /*#__PURE__*/React__default.createElement(NFTCollectionName, null, asset.asset_contract.name), asset.collectionIsVerified && /*#__PURE__*/React__default.createElement(Verified, null)), /*#__PURE__*/React__default.createElement(FloorPrice, null, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, asset.floorPrice ? "".concat(floorFormatter(asset.floorPrice), " ETH") : " ")));
}
var BADGE_SIZE = "18px";
function Verified() {
  return /*#__PURE__*/React__default.createElement(Row, {
    width: "unset",
    flexShrink: "0"
  }, /*#__PURE__*/React__default.createElement(VerifiedIcon, {
    height: BADGE_SIZE,
    width: BADGE_SIZE
  }));
}

export { NFT };
