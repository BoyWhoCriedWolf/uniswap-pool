'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../components/Column/index.cjs');
var index = require('../../../../components/Row/index.cjs');
var icons = require('../../icons.cjs');
require('../../../hooks/useBag.cjs');
require('../../../hooks/useCollectionFilters.cjs');
require('../../../hooks/useFiltersExpanded.cjs');
require('../../../hooks/useIsCollectionLoading.cjs');
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
require('@web3-react/core');
require('../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../hooks/useWalletCollections.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$1 = require('../../../../theme/index.cjs');
require('../../../../theme/components/index.cjs');
var MarketplaceRow = require('./MarketplaceRow.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var IMAGE_THUMBNAIL_SIZE = 60;
var NFTListRowWrapper = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 24px 0px;\n  align-items: center;\n  border-radius: 8px;\n\n  &:hover {\n    background: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var RemoveIconContainer = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: ", "px;\n  height: ", "px;\n  padding-left: 12px;\n  align-self: flex-start;\n  align-items: center;\n  display: flex;\n\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n\n  &:hover {\n    opacity: ", ";\n  }\n"])), IMAGE_THUMBNAIL_SIZE, IMAGE_THUMBNAIL_SIZE, index$1.BREAKPOINTS.sm, function (_ref2) {
  var theme = _ref2.theme;
  return theme.opacity.hover;
});
var NFTInfoWrapper = styled__default["default"](index["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  min-width: 0px;\n  flex: 2;\n  margin-bottom: auto;\n\n  @media screen and (min-width: ", "px) {\n    flex: 1.5;\n  }\n"])), index$1.BREAKPOINTS.md);
var NFTImage = styled__default["default"].img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: ", "px;\n  height: ", "px;\n  border-radius: 8px;\n  margin-right: 8px;\n"])), IMAGE_THUMBNAIL_SIZE, IMAGE_THUMBNAIL_SIZE);
var HideTextOverflow = styled.css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"])));
var TokenInfoWrapper = styled__default["default"](index$2.Column)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  margin-right: 8px;\n  min-width: 0px;\n"])));
var TokenName = styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 24px;\n  ", "\n"])), HideTextOverflow);
var CollectionName = styled__default["default"](text.ThemedText.BodySmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  line-height: 20px;\n  ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
}, HideTextOverflow);
var MarketPlaceRowWrapper = styled__default["default"](index$2.Column)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  gap: 24px;\n  flex: 1.5;\n  margin-right: 12px;\n  padding: 6px 0px;\n\n  @media screen and (min-width: ", "px) {\n    flex: 2;\n  }\n\n  @media screen and (min-width: ", "px) {\n    flex: 3;\n  }\n"])), index$1.BREAKPOINTS.md, index$1.BREAKPOINTS.md);
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
  var _useReducer = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    expandMarketplaceRows = _useReducer2[0],
    toggleExpandMarketplaceRows = _useReducer2[1];
  var removeAsset = useSellAsset.useSellAsset(function (state) {
    return state.removeSellAsset;
  });
  var _useState = React.useState([]),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    localMarkets = _useState2[0],
    setLocalMarkets = _useState2[1];
  var _useReducer3 = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer4 = _slicedToArray__default["default"](_useReducer3, 2),
    hovered = _useReducer4[0],
    toggleHovered = _useReducer4[1];
  var theme = styled.useTheme();

  // Keep localMarkets up to date with changes to globalMarkets
  React.useEffect(function () {
    setLocalMarkets(JSON.parse(JSON.stringify(selectedMarkets)));
  }, [selectedMarkets]);
  return /*#__PURE__*/React__default["default"].createElement(NFTListRowWrapper, {
    onMouseEnter: function onMouseEnter() {
      !hovered && toggleHovered();
    },
    onMouseLeave: function onMouseLeave() {
      hovered && toggleHovered();
    }
  }, /*#__PURE__*/React__default["default"].createElement(RemoveIconContainer, null, hovered && /*#__PURE__*/React__default["default"].createElement(reactFeather.Trash2, {
    size: 20,
    color: theme.neutral2,
    cursor: "pointer",
    onClick: function onClick() {
      removeAsset(asset);
    }
  })), /*#__PURE__*/React__default["default"].createElement(NFTInfoWrapper, null, /*#__PURE__*/React__default["default"].createElement(NFTImage, {
    alt: asset.name,
    src: asset.imageUrl || "/nft/svgs/image-placeholder.svg"
  }), /*#__PURE__*/React__default["default"].createElement(TokenInfoWrapper, null, /*#__PURE__*/React__default["default"].createElement(TokenName, null, asset.name ? asset.name : "#".concat(asset.tokenId)), /*#__PURE__*/React__default["default"].createElement(CollectionName, null, (_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.name, asset.collectionIsVerified && /*#__PURE__*/React__default["default"].createElement(icons.VerifiedIcon, {
    style: {
      marginBottom: "-5px"
    }
  })))), /*#__PURE__*/React__default["default"].createElement(MarketPlaceRowWrapper, null, expandMarketplaceRows && localMarkets.length > 1 ? localMarkets.map(function (market) {
    return /*#__PURE__*/React__default["default"].createElement(MarketplaceRow.MarketplaceRow, {
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
  }) : /*#__PURE__*/React__default["default"].createElement(MarketplaceRow.MarketplaceRow, {
    globalPriceMethod: globalPriceMethod,
    globalPrice: globalPrice,
    setGlobalPrice: setGlobalPrice,
    selectedMarkets: localMarkets,
    asset: asset,
    rowHovered: hovered,
    toggleExpandMarketplaceRows: toggleExpandMarketplaceRows
  })));
};

exports.NFTListRow = NFTListRow;
