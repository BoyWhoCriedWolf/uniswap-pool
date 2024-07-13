'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../../../node_modules/@lingui/core/dist/index.cjs');
var index = require('../../../../components/Column/index.cjs');
var index$2 = require('../../../../components/Row/index.cjs');
var index$3 = require('../../../../components/Tooltip/index.cjs');
var icons = require('../../icons.cjs');
var utils = require('./utils.cjs');
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
var useUsdPrice = require('../../../hooks/useUsdPrice.cjs');
require('@ethersproject/units');
require('@web3-react/core');
require('../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../hooks/useWalletCollections.cjs');
var asset = require('../../../utils/asset.cjs');
var currency = require('../../../utils/currency.cjs');
require('video-extensions');
require('../../../../locales/en-US.cjs');
require('numbro');
require('../../../utils/pooledAssets.cjs');
require('../../../utils/time.cjs');
require('@ethersproject/bignumber');
var styled = require('styled-components');
var index$1 = require('../../../../theme/index.cjs');
require('../../../../theme/components/index.cjs');
var PriceTextInput = require('./PriceTextInput.cjs');
var RoyaltyTooltip = require('./RoyaltyTooltip.cjs');
var shared = require('./shared.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var LastPriceInfo = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  text-align: left;\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index$1.BREAKPOINTS.lg);
var FloorPriceInfo = styled__default["default"](index.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  text-align: left;\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index$1.BREAKPOINTS.md);
var RemoveMarketplaceWrap = styled__default["default"](shared.RemoveIconWrap)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  top: 8px;\n  left: 16px;\n  z-index: 3;\n"])));
var MarketIconsWrapper = styled__default["default"](index$2["default"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  margin-right: 12px;\n  width: 44px;\n  justify-content: flex-end;\n\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n"])), index$1.BREAKPOINTS.sm);
var MarketIconWrapper = styled__default["default"](index.Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  cursor: pointer;\n"])));
var MarketIcon = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  z-index: ", ";\n  margin-left: ", ";\n  outline: 1px solid ", ";\n"])), function (_ref) {
  var index = _ref.index;
  return 2 - index;
}, function (_ref2) {
  var index = _ref2.index;
  return "".concat(index === 0 ? 0 : -8, "px");
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var ExpandMarketIconWrapper = styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  margin-left: 4px;\n  height: 28px;\n\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n"])), index$1.BREAKPOINTS.sm);
var FeeColumnWrapper = styled__default["default"](index.Column)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  flex: 1;\n  align-items: flex-end;\n  display: none;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index$1.BREAKPOINTS.md);
var FeeWrapper = styled__default["default"].div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  width: min-content;\n  white-space: nowrap;\n"])));
var ReturnColumn = styled__default["default"](index.Column)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  flex: 1.5;\n  display: none;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index$1.BREAKPOINTS.md);
var MarketplaceRow = function MarketplaceRow(_ref4) {
  var globalPriceMethod = _ref4.globalPriceMethod,
    globalPrice = _ref4.globalPrice,
    setGlobalPrice = _ref4.setGlobalPrice,
    selectedMarkets = _ref4.selectedMarkets,
    _ref4$removeMarket = _ref4.removeMarket,
    removeMarket = _ref4$removeMarket === void 0 ? undefined : _ref4$removeMarket,
    asset$1 = _ref4.asset,
    expandMarketplaceRows = _ref4.expandMarketplaceRows,
    toggleExpandMarketplaceRows = _ref4.toggleExpandMarketplaceRows,
    rowHovered = _ref4.rowHovered;
  var setAssetListPrice = useSellAsset.useSellAsset(function (state) {
    return state.setAssetListPrice;
  });
  var removeAssetMarketplace = useSellAsset.useSellAsset(function (state) {
    return state.removeAssetMarketplace;
  });
  var _useReducer = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    marketIconHovered = _useReducer2[0],
    toggleMarketIconHovered = _useReducer2[1];
  var _useReducer3 = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer4 = _slicedToArray__default["default"](_useReducer3, 2),
    marketRowHovered = _useReducer4[0],
    toggleMarketRowHovered = _useReducer4[1];
  var _useState = React.useState(function () {
      var _asset$newListings;
      return (_asset$newListings = asset$1.newListings) === null || _asset$newListings === void 0 || (_asset$newListings = _asset$newListings.find(function (listing) {
        return expandMarketplaceRows ? listing.marketplace.name === (selectedMarkets === null || selectedMarkets === void 0 ? void 0 : selectedMarkets[0].name) : !!listing.price;
      })) === null || _asset$newListings === void 0 ? void 0 : _asset$newListings.price;
    }),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    listPrice = _useState2[0],
    setListPrice = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    globalOverride = _useState4[0],
    setGlobalOverride = _useState4[1];
  var showGlobalPrice = globalPriceMethod === shared.SetPriceMethod.SAME_PRICE && !globalOverride;
  var price = showGlobalPrice ? globalPrice : listPrice;
  var setPrice = React.useCallback(function (price) {
    showGlobalPrice ? setGlobalPrice(price) : setListPrice(price);
    var _iterator = _createForOfIteratorHelper(selectedMarkets),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var marketplace = _step.value;
        setAssetListPrice(asset$1, price, marketplace);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, [asset$1, selectedMarkets, setAssetListPrice, setGlobalPrice, showGlobalPrice]);
  var fees = React.useMemo(function () {
    var maxFee = 0;
    var _iterator2 = _createForOfIteratorHelper(selectedMarkets),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var selectedMarket = _step2.value;
        var fee = utils.getRoyalty(selectedMarket, asset$1) + selectedMarket.fee;
        maxFee = Math.max(fee, maxFee);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return maxFee;
  }, [asset$1, selectedMarkets]);
  var feeInEth = price && price * fees / 100;
  var userReceives = price && feeInEth && price - feeInEth;
  utils.useHandleGlobalPriceToggle(globalOverride, setListPrice, setPrice, listPrice, globalPrice);
  utils.useSyncPriceWithGlobalMethod(asset$1, setListPrice, setGlobalPrice, setGlobalOverride, listPrice, globalPrice, globalPriceMethod);

  // When in Same Price Mode and not overriding, update local price when global price changes
  React.useEffect(function () {
    if (showGlobalPrice) {
      setPrice(globalPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPrice]);
  return /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    onMouseEnter: toggleMarketRowHovered,
    onMouseLeave: toggleMarketRowHovered
  }, /*#__PURE__*/React__default["default"].createElement(FloorPriceInfo, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    color: "neutral2",
    lineHeight: "24px"
  }, asset$1.floorPrice ? "".concat(asset$1.floorPrice.toFixed(3), " ETH") : "-")), /*#__PURE__*/React__default["default"].createElement(LastPriceInfo, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    color: "neutral2",
    lineHeight: "24px"
  }, asset$1.lastPrice ? "".concat(asset$1.lastPrice.toFixed(3), " ETH") : "-")), /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    flex: "2"
  }, (expandMarketplaceRows || selectedMarkets.length > 1) && /*#__PURE__*/React__default["default"].createElement(MarketIconsWrapper, {
    onMouseEnter: toggleMarketIconHovered,
    onMouseLeave: toggleMarketIconHovered
  }, selectedMarkets.map(function (market, index) {
    var _asset$collection;
    return /*#__PURE__*/React__default["default"].createElement(MarketIconWrapper, {
      key: market.name + ((_asset$collection = asset$1.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.address) + asset$1.tokenId,
      onClick: function onClick(e) {
        e.stopPropagation();
        removeAssetMarketplace(asset$1, market);
        removeMarket && removeMarket();
      }
    }, /*#__PURE__*/React__default["default"].createElement(MarketIcon, {
      index: index
    }, asset.getMarketplaceIcon(market.name, "20")), /*#__PURE__*/React__default["default"].createElement(RemoveMarketplaceWrap, {
      hovered: marketIconHovered && (expandMarketplaceRows !== null && expandMarketplaceRows !== void 0 ? expandMarketplaceRows : false)
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      width: "20px",
      src: "/nft/svgs/minusCircle.svg",
      alt: "Remove item"
    })));
  })), /*#__PURE__*/React__default["default"].createElement(PriceTextInput.PriceTextInput, {
    listPrice: price,
    setListPrice: setPrice,
    isGlobalPrice: showGlobalPrice,
    setGlobalOverride: setGlobalOverride,
    globalOverride: globalOverride,
    asset: asset$1
  }), rowHovered && (expandMarketplaceRows && marketRowHovered || selectedMarkets.length > 1) && /*#__PURE__*/React__default["default"].createElement(ExpandMarketIconWrapper, {
    onClick: toggleExpandMarketplaceRows
  }, expandMarketplaceRows ? /*#__PURE__*/React__default["default"].createElement(icons.RowsExpandedIcon, null) : /*#__PURE__*/React__default["default"].createElement(icons.RowsCollpsedIcon, null))), /*#__PURE__*/React__default["default"].createElement(FeeColumnWrapper, null, /*#__PURE__*/React__default["default"].createElement(index$3.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(RoyaltyTooltip.RoyaltyTooltip, {
      selectedMarkets: selectedMarkets,
      asset: asset$1,
      fees: feeInEth
    }),
    placement: "left"
  }, /*#__PURE__*/React__default["default"].createElement(FeeWrapper, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    color: "neutral2"
  }, fees > 0 ? "".concat(fees.toFixed(2)).concat(selectedMarkets.length > 1 ? index$4.i18n._(
  /*i18n*/
  {
    id: "Txus1W",
    message: "% max"
  }) : "%") : "--%")))), /*#__PURE__*/React__default["default"].createElement(ReturnColumn, null, /*#__PURE__*/React__default["default"].createElement(EthPriceDisplay, {
    ethPrice: userReceives
  })));
};
var EthPriceDisplay = function EthPriceDisplay(_ref5) {
  var _ref5$ethPrice = _ref5.ethPrice,
    ethPrice = _ref5$ethPrice === void 0 ? 0 : _ref5$ethPrice;
  var ethUsdPrice = useUsdPrice.useNativeUsdPrice();
  return /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    width: "100%",
    justify: "flex-end"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    lineHeight: "24px",
    color: ethPrice ? "neutral1" : "neutral2",
    textAlign: "right"
  }, ethPrice !== 0 ? /*#__PURE__*/React__default["default"].createElement(index.Column, null, /*#__PURE__*/React__default["default"].createElement("span", null, currency.formatEth(ethPrice), " ETH"), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    color: "neutral2"
  }, currency.formatUsdPrice(ethPrice * ethUsdPrice))) : "- ETH"));
};

exports.MarketplaceRow = MarketplaceRow;
