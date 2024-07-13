import React__default, { useReducer, useState, useCallback, useMemo, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { MouseoverTooltip } from '../../../../components/Tooltip/index.js';
import { RowsExpandedIcon, RowsCollpsedIcon } from '../../icons.js';
import { getRoyalty, useHandleGlobalPriceToggle, useSyncPriceWithGlobalMethod } from './utils.js';
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
import { useNativeUsdPrice } from '../../../hooks/useUsdPrice.js';
import '@ethersproject/units';
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import { getMarketplaceIcon } from '../../../utils/asset.js';
import { formatEth, formatUsdPrice } from '../../../utils/currency.js';
import 'video-extensions';
import '../../../../locales/en-US.js';
import 'numbro';
import '../../../utils/pooledAssets.js';
import '../../../utils/time.js';
import '@ethersproject/bignumber';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../theme/index.js';
import '../../../../theme/components/index.js';
import { PriceTextInput } from './PriceTextInput.js';
import { RoyaltyTooltip } from './RoyaltyTooltip.js';
import { RemoveIconWrap, SetPriceMethod } from './shared.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var LastPriceInfo = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  text-align: left;\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.lg);
var FloorPriceInfo = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  text-align: left;\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.md);
var RemoveMarketplaceWrap = styled(RemoveIconWrap)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  top: 8px;\n  left: 16px;\n  z-index: 3;\n"])));
var MarketIconsWrapper = styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: relative;\n  margin-right: 12px;\n  width: 44px;\n  justify-content: flex-end;\n\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n"])), BREAKPOINTS.sm);
var MarketIconWrapper = styled(Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  position: relative;\n  cursor: pointer;\n"])));
var MarketIcon = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  z-index: ", ";\n  margin-left: ", ";\n  outline: 1px solid ", ";\n"])), function (_ref) {
  var index = _ref.index;
  return 2 - index;
}, function (_ref2) {
  var index = _ref2.index;
  return "".concat(index === 0 ? 0 : -8, "px");
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var ExpandMarketIconWrapper = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  margin-left: 4px;\n  height: 28px;\n\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n"])), BREAKPOINTS.sm);
var FeeColumnWrapper = styled(Column)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  flex: 1;\n  align-items: flex-end;\n  display: none;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.md);
var FeeWrapper = styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  width: min-content;\n  white-space: nowrap;\n"])));
var ReturnColumn = styled(Column)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  flex: 1.5;\n  display: none;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.md);
var MarketplaceRow = function MarketplaceRow(_ref4) {
  var globalPriceMethod = _ref4.globalPriceMethod,
    globalPrice = _ref4.globalPrice,
    setGlobalPrice = _ref4.setGlobalPrice,
    selectedMarkets = _ref4.selectedMarkets,
    _ref4$removeMarket = _ref4.removeMarket,
    removeMarket = _ref4$removeMarket === void 0 ? undefined : _ref4$removeMarket,
    asset = _ref4.asset,
    expandMarketplaceRows = _ref4.expandMarketplaceRows,
    toggleExpandMarketplaceRows = _ref4.toggleExpandMarketplaceRows,
    rowHovered = _ref4.rowHovered;
  var setAssetListPrice = useSellAsset(function (state) {
    return state.setAssetListPrice;
  });
  var removeAssetMarketplace = useSellAsset(function (state) {
    return state.removeAssetMarketplace;
  });
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    marketIconHovered = _useReducer2[0],
    toggleMarketIconHovered = _useReducer2[1];
  var _useReducer3 = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer4 = _slicedToArray(_useReducer3, 2),
    marketRowHovered = _useReducer4[0],
    toggleMarketRowHovered = _useReducer4[1];
  var _useState = useState(function () {
      var _asset$newListings;
      return (_asset$newListings = asset.newListings) === null || _asset$newListings === void 0 || (_asset$newListings = _asset$newListings.find(function (listing) {
        return expandMarketplaceRows ? listing.marketplace.name === (selectedMarkets === null || selectedMarkets === void 0 ? void 0 : selectedMarkets[0].name) : !!listing.price;
      })) === null || _asset$newListings === void 0 ? void 0 : _asset$newListings.price;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    listPrice = _useState2[0],
    setListPrice = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    globalOverride = _useState4[0],
    setGlobalOverride = _useState4[1];
  var showGlobalPrice = globalPriceMethod === SetPriceMethod.SAME_PRICE && !globalOverride;
  var price = showGlobalPrice ? globalPrice : listPrice;
  var setPrice = useCallback(function (price) {
    showGlobalPrice ? setGlobalPrice(price) : setListPrice(price);
    var _iterator = _createForOfIteratorHelper(selectedMarkets),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var marketplace = _step.value;
        setAssetListPrice(asset, price, marketplace);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, [asset, selectedMarkets, setAssetListPrice, setGlobalPrice, showGlobalPrice]);
  var fees = useMemo(function () {
    var maxFee = 0;
    var _iterator2 = _createForOfIteratorHelper(selectedMarkets),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var selectedMarket = _step2.value;
        var fee = getRoyalty(selectedMarket, asset) + selectedMarket.fee;
        maxFee = Math.max(fee, maxFee);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return maxFee;
  }, [asset, selectedMarkets]);
  var feeInEth = price && price * fees / 100;
  var userReceives = price && feeInEth && price - feeInEth;
  useHandleGlobalPriceToggle(globalOverride, setListPrice, setPrice, listPrice, globalPrice);
  useSyncPriceWithGlobalMethod(asset, setListPrice, setGlobalPrice, setGlobalOverride, listPrice, globalPrice, globalPriceMethod);

  // When in Same Price Mode and not overriding, update local price when global price changes
  useEffect(function () {
    if (showGlobalPrice) {
      setPrice(globalPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPrice]);
  return /*#__PURE__*/React__default.createElement(Row, {
    onMouseEnter: toggleMarketRowHovered,
    onMouseLeave: toggleMarketRowHovered
  }, /*#__PURE__*/React__default.createElement(FloorPriceInfo, null, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    color: "neutral2",
    lineHeight: "24px"
  }, asset.floorPrice ? "".concat(asset.floorPrice.toFixed(3), " ETH") : "-")), /*#__PURE__*/React__default.createElement(LastPriceInfo, null, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    color: "neutral2",
    lineHeight: "24px"
  }, asset.lastPrice ? "".concat(asset.lastPrice.toFixed(3), " ETH") : "-")), /*#__PURE__*/React__default.createElement(Row, {
    flex: "2"
  }, (expandMarketplaceRows || selectedMarkets.length > 1) && /*#__PURE__*/React__default.createElement(MarketIconsWrapper, {
    onMouseEnter: toggleMarketIconHovered,
    onMouseLeave: toggleMarketIconHovered
  }, selectedMarkets.map(function (market, index) {
    var _asset$collection;
    return /*#__PURE__*/React__default.createElement(MarketIconWrapper, {
      key: market.name + ((_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.address) + asset.tokenId,
      onClick: function onClick(e) {
        e.stopPropagation();
        removeAssetMarketplace(asset, market);
        removeMarket && removeMarket();
      }
    }, /*#__PURE__*/React__default.createElement(MarketIcon, {
      index: index
    }, getMarketplaceIcon(market.name, "20")), /*#__PURE__*/React__default.createElement(RemoveMarketplaceWrap, {
      hovered: marketIconHovered && (expandMarketplaceRows !== null && expandMarketplaceRows !== void 0 ? expandMarketplaceRows : false)
    }, /*#__PURE__*/React__default.createElement("img", {
      width: "20px",
      src: "/nft/svgs/minusCircle.svg",
      alt: "Remove item"
    })));
  })), /*#__PURE__*/React__default.createElement(PriceTextInput, {
    listPrice: price,
    setListPrice: setPrice,
    isGlobalPrice: showGlobalPrice,
    setGlobalOverride: setGlobalOverride,
    globalOverride: globalOverride,
    asset: asset
  }), rowHovered && (expandMarketplaceRows && marketRowHovered || selectedMarkets.length > 1) && /*#__PURE__*/React__default.createElement(ExpandMarketIconWrapper, {
    onClick: toggleExpandMarketplaceRows
  }, expandMarketplaceRows ? /*#__PURE__*/React__default.createElement(RowsExpandedIcon, null) : /*#__PURE__*/React__default.createElement(RowsCollpsedIcon, null))), /*#__PURE__*/React__default.createElement(FeeColumnWrapper, null, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(RoyaltyTooltip, {
      selectedMarkets: selectedMarkets,
      asset: asset,
      fees: feeInEth
    }),
    placement: "left"
  }, /*#__PURE__*/React__default.createElement(FeeWrapper, null, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    color: "neutral2"
  }, fees > 0 ? "".concat(fees.toFixed(2)).concat(selectedMarkets.length > 1 ? i18n._(
  /*i18n*/
  {
    id: "Txus1W",
    message: "% max"
  }) : "%") : "--%")))), /*#__PURE__*/React__default.createElement(ReturnColumn, null, /*#__PURE__*/React__default.createElement(EthPriceDisplay, {
    ethPrice: userReceives
  })));
};
var EthPriceDisplay = function EthPriceDisplay(_ref5) {
  var _ref5$ethPrice = _ref5.ethPrice,
    ethPrice = _ref5$ethPrice === void 0 ? 0 : _ref5$ethPrice;
  var ethUsdPrice = useNativeUsdPrice();
  return /*#__PURE__*/React__default.createElement(Row, {
    width: "100%",
    justify: "flex-end"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    lineHeight: "24px",
    color: ethPrice ? "neutral1" : "neutral2",
    textAlign: "right"
  }, ethPrice !== 0 ? /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement("span", null, formatEth(ethPrice), " ETH"), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    color: "neutral2"
  }, formatUsdPrice(ethPrice * ethUsdPrice))) : "- ETH"));
};

export { MarketplaceRow };
