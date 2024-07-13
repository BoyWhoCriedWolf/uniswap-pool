import React__default, { useReducer, useState, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { VerifiedIcon } from '../../icons.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
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
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import { Trash2 } from 'react-feather';
import styled, { css, useTheme } from 'styled-components';
import { BREAKPOINTS } from '../../../../theme/index.js';
import '../../../../theme/components/index.js';
import { MarketplaceRow } from './MarketplaceRow.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var IMAGE_THUMBNAIL_SIZE = 60;
var NFTListRowWrapper = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 24px 0px;\n  align-items: center;\n  border-radius: 8px;\n\n  &:hover {\n    background: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var RemoveIconContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  padding-left: 12px;\n  align-self: flex-start;\n  align-items: center;\n  display: flex;\n\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n\n  &:hover {\n    opacity: ", ";\n  }\n"])), IMAGE_THUMBNAIL_SIZE, IMAGE_THUMBNAIL_SIZE, BREAKPOINTS.sm, function (_ref2) {
  var theme = _ref2.theme;
  return theme.opacity.hover;
});
var NFTInfoWrapper = styled(Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  min-width: 0px;\n  flex: 2;\n  margin-bottom: auto;\n\n  @media screen and (min-width: ", "px) {\n    flex: 1.5;\n  }\n"])), BREAKPOINTS.md);
var NFTImage = styled.img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  border-radius: 8px;\n  margin-right: 8px;\n"])), IMAGE_THUMBNAIL_SIZE, IMAGE_THUMBNAIL_SIZE);
var HideTextOverflow = css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"])));
var TokenInfoWrapper = styled(Column)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  margin-right: 8px;\n  min-width: 0px;\n"])));
var TokenName = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 24px;\n  ", "\n"])), HideTextOverflow);
var CollectionName = styled(ThemedText.BodySmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  color: ", ";\n  line-height: 20px;\n  ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
}, HideTextOverflow);
var MarketPlaceRowWrapper = styled(Column)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  gap: 24px;\n  flex: 1.5;\n  margin-right: 12px;\n  padding: 6px 0px;\n\n  @media screen and (min-width: ", "px) {\n    flex: 2;\n  }\n\n  @media screen and (min-width: ", "px) {\n    flex: 3;\n  }\n"])), BREAKPOINTS.md, BREAKPOINTS.md);
/**
 * NFTListRow is the outermost row wrapper for an NFT Listing, which shows either the composite of multiple marketplaces listings
 * or can be expanded to show listings per marketplace
 */
var NFTListRow = function NFTListRow(_ref4) {
  var _asset$collection;
  var asset = _ref4.asset,
    globalPriceMethod = _ref4.globalPriceMethod,
    globalPrice = _ref4.globalPrice,
    setGlobalPrice = _ref4.setGlobalPrice,
    selectedMarkets = _ref4.selectedMarkets;
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    expandMarketplaceRows = _useReducer2[0],
    toggleExpandMarketplaceRows = _useReducer2[1];
  var removeAsset = useSellAsset(function (state) {
    return state.removeSellAsset;
  });
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    localMarkets = _useState2[0],
    setLocalMarkets = _useState2[1];
  var _useReducer3 = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer4 = _slicedToArray(_useReducer3, 2),
    hovered = _useReducer4[0],
    toggleHovered = _useReducer4[1];
  var theme = useTheme();

  // Keep localMarkets up to date with changes to globalMarkets
  useEffect(function () {
    setLocalMarkets(JSON.parse(JSON.stringify(selectedMarkets)));
  }, [selectedMarkets]);
  return /*#__PURE__*/React__default.createElement(NFTListRowWrapper, {
    onMouseEnter: function onMouseEnter() {
      !hovered && toggleHovered();
    },
    onMouseLeave: function onMouseLeave() {
      hovered && toggleHovered();
    }
  }, /*#__PURE__*/React__default.createElement(RemoveIconContainer, null, hovered && /*#__PURE__*/React__default.createElement(Trash2, {
    size: 20,
    color: theme.neutral2,
    cursor: "pointer",
    onClick: function onClick() {
      removeAsset(asset);
    }
  })), /*#__PURE__*/React__default.createElement(NFTInfoWrapper, null, /*#__PURE__*/React__default.createElement(NFTImage, {
    alt: asset.name,
    src: asset.imageUrl || "/nft/svgs/image-placeholder.svg"
  }), /*#__PURE__*/React__default.createElement(TokenInfoWrapper, null, /*#__PURE__*/React__default.createElement(TokenName, null, asset.name ? asset.name : "#".concat(asset.tokenId)), /*#__PURE__*/React__default.createElement(CollectionName, null, (_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.name, asset.collectionIsVerified && /*#__PURE__*/React__default.createElement(VerifiedIcon, {
    style: {
      marginBottom: "-5px"
    }
  })))), /*#__PURE__*/React__default.createElement(MarketPlaceRowWrapper, null, expandMarketplaceRows && localMarkets.length > 1 ? localMarkets.map(function (market) {
    return /*#__PURE__*/React__default.createElement(MarketplaceRow, {
      globalPriceMethod: globalPriceMethod,
      globalPrice: globalPrice,
      setGlobalPrice: setGlobalPrice,
      selectedMarkets: [market],
      removeMarket: function removeMarket() {
        return setLocalMarkets(localMarkets.filter(function (oldMarket) {
          return oldMarket.name !== market.name;
        }));
      },
      asset: asset,
      key: asset.name + market.name,
      expandMarketplaceRows: expandMarketplaceRows,
      rowHovered: hovered,
      toggleExpandMarketplaceRows: toggleExpandMarketplaceRows
    });
  }) : /*#__PURE__*/React__default.createElement(MarketplaceRow, {
    globalPriceMethod: globalPriceMethod,
    globalPrice: globalPrice,
    setGlobalPrice: setGlobalPrice,
    selectedMarkets: localMarkets,
    asset: asset,
    rowHovered: hovered,
    toggleExpandMarketplaceRows: toggleExpandMarketplaceRows
  })));
};

export { NFTListRow };
