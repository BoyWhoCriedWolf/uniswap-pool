'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var bignumber = require('@ethersproject/bignumber');
var units = require('@ethersproject/units');
var clsx = require('clsx');
var index = require('../../../components/Button/index.cjs');
var TimedLoader = require('./TimedLoader.cjs');
var Box = require('../Box.cjs');
var icons = require('../card/icons.cjs');
var Flex = require('../Flex.cjs');
var icons$1 = require('../icons.cjs');
var common_css = require('../../css/common.css.cjs');
var loading_css = require('../../css/loading.css.cjs');
var asset = require('../../utils/asset.cjs');
var currency = require('../../utils/currency.cjs');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
var BagRow_css = require('./BagRow.css.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var RemoveButton = styled__default["default"](index.ThemeButton)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  font-size: 14px;\n  line-height: 16px;\n  margin-left: 16px;\n  padding: 12px 14px;\n"])));
var ReviewButton = styled__default["default"](index.ThemeButton)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  flex: 1 1 auto;\n  font-size: 14px;\n  padding: 8px;\n  width: 50%;\n"])));
var RemoveAssetOverlay = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  display: block;\n  right: -11px;\n  top: -11px;\n  z-index: 1;\n  transition: 250ms;\n  width: 45px;\n  height: 45px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var RemoveAssetButton = function RemoveAssetButton(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/React__default["default"].createElement(RemoveAssetOverlay, {
    onClick: onClick
  }, /*#__PURE__*/React__default["default"].createElement(icons$1.CircularCloseIcon, null));
};
var NoContentContainer = function NoContentContainer() {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    position: "relative",
    background: "loadingBackground",
    className: BagRow_css.bagRowImage
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    position: "absolute",
    textAlign: "center",
    left: "1/2",
    top: "1/2",
    style: {
      transform: "translate3d(-50%, -50%, 0)"
    },
    color: "gray500",
    fontSize: "12",
    fontWeight: "book"
  }, "Image", /*#__PURE__*/React__default["default"].createElement("br", null), "not", /*#__PURE__*/React__default["default"].createElement("br", null), "available"));
};
var BagRow = function BagRow(_ref2) {
  var _asset$name;
  var asset$1 = _ref2.asset,
    usdPrice = _ref2.usdPrice,
    removeAsset = _ref2.removeAsset,
    showRemove = _ref2.showRemove,
    grayscale = _ref2.grayscale,
    isMobile = _ref2.isMobile;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    loadedImage = _useState2[0],
    setImageLoaded = _useState2[1];
  var _useState3 = React.useState(!asset$1.smallImageUrl),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    noImageAvailable = _useState4[0],
    setNoImageAvailable = _useState4[1];
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    cardHovered = _useState6[0],
    setCardHovered = _useState6[1];
  var handleMouseEnter = React.useCallback(function () {
    return setCardHovered(true);
  }, []);
  var handleMouseLeave = React.useCallback(function () {
    return setCardHovered(false);
  }, []);
  var showRemoveButton = Boolean(showRemove && cardHovered && !isMobile);
  var assetEthPrice = asset$1.updatedPriceInfo ? asset$1.updatedPriceInfo.ETHPrice : asset$1.priceInfo.ETHPrice;
  var assetEthPriceFormatted = currency.formatWeiToDecimal(assetEthPrice);
  var assetUSDPriceFormatted = currency.ethNumberStandardFormatter(usdPrice ? parseFloat(units.formatEther(assetEthPrice)) * usdPrice : usdPrice, true);
  var handleRemoveClick = React.useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    removeAsset([asset$1]);
  }, [asset$1, removeAsset]);
  return /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Link, {
    to: asset.getAssetHref(asset$1),
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    className: BagRow_css.bagRow,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    position: "relative",
    display: "flex"
  }, showRemove && isMobile && /*#__PURE__*/React__default["default"].createElement(RemoveAssetButton, {
    onClick: handleRemoveClick
  }), !noImageAvailable && /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "img",
    src: asset$1.smallImageUrl,
    alt: asset$1.name,
    className: clsx__default["default"](BagRow_css.bagRowImage, grayscale && !cardHovered && BagRow_css.grayscaleImage),
    onLoad: function onLoad() {
      setImageLoaded(true);
    },
    onError: function onError() {
      setNoImageAvailable(true);
    },
    visibility: loadedImage ? "visible" : "hidden"
  }), !loadedImage && /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    position: "absolute",
    className: "".concat(BagRow_css.bagRowImage, " ").concat(loading_css.loadingBlock)
  }), noImageAvailable && /*#__PURE__*/React__default["default"].createElement(NoContentContainer, null)), /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    overflow: "hidden",
    width: "full",
    color: grayscale ? "neutral2" : "neutral1"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    overflow: "hidden",
    width: "full",
    whiteSpace: "nowrap"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: BagRow_css.assetName
  }, (_asset$name = asset$1.name) !== null && _asset$name !== void 0 ? _asset$name : "#".concat(asset$1.tokenId)), asset$1.susFlag && /*#__PURE__*/React__default["default"].createElement(icons.Suspicious, null)), /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    overflow: "hidden",
    whiteSpace: "nowrap",
    gap: "2"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: BagRow_css.collectionName
  }, asset$1.collectionName), asset$1.collectionIsVerified && /*#__PURE__*/React__default["default"].createElement(icons$1.VerifiedIcon, {
    className: BagRow_css.icon
  }))), showRemoveButton && /*#__PURE__*/React__default["default"].createElement(RemoveButton, {
    onClick: handleRemoveClick,
    emphasis: index.ButtonEmphasis.medium,
    size: index.ButtonSize.medium
  }, "Remove"), (!showRemoveButton || isMobile) && /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    flexShrink: "0",
    alignItems: "flex-end"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: BagRow_css.bagRowPrice
  }, assetEthPriceFormatted, "\xA0ETH"), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: BagRow_css.collectionName
  }, assetUSDPriceFormatted))));
};
var PriceChangeBagRow = function PriceChangeBagRow(_ref3) {
  var _asset$updatedPriceIn;
  var asset = _ref3.asset,
    usdPrice = _ref3.usdPrice,
    markAssetAsReviewed = _ref3.markAssetAsReviewed,
    top = _ref3.top,
    isMobile = _ref3.isMobile;
  var isPriceIncrease = bignumber.BigNumber.from((_asset$updatedPriceIn = asset.updatedPriceInfo) === null || _asset$updatedPriceIn === void 0 ? void 0 : _asset$updatedPriceIn.ETHPrice).gt(bignumber.BigNumber.from(asset.priceInfo.ETHPrice));
  var handleRemove = React.useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var toKeep = false;
    markAssetAsReviewed(asset, toKeep);
  }, [asset, markAssetAsReviewed]);
  var handleKeep = React.useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var toKeep = true;
    markAssetAsReviewed(asset, toKeep);
  }, [asset, markAssetAsReviewed]);
  return /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    className: BagRow_css.priceChangeColumn,
    borderTopColor: top ? "surface3" : "transparent"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    className: BagRow_css.priceChangeRow
  }, isPriceIncrease ? /*#__PURE__*/React__default["default"].createElement(icons$1.SquareArrowUpIcon, null) : /*#__PURE__*/React__default["default"].createElement(icons$1.SquareArrowDownIcon, null), /*#__PURE__*/React__default["default"].createElement(Box.Box, null, "Price ".concat(isPriceIncrease ? "increased" : "decreased", " from ").concat(currency.formatWeiToDecimal(asset.priceInfo.ETHPrice), " ETH"))), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    style: {
      marginLeft: "-8px",
      marginRight: "-8px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(BagRow, {
    asset: asset,
    usdPrice: usdPrice,
    removeAsset: function removeAsset() {
      return undefined;
    },
    isMobile: isMobile
  })), /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    gap: "8",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default["default"].createElement(ReviewButton, {
    onClick: handleRemove,
    emphasis: index.ButtonEmphasis.medium,
    size: index.ButtonSize.small
  }, "Remove"), /*#__PURE__*/React__default["default"].createElement(ReviewButton, {
    onClick: handleKeep,
    emphasis: index.ButtonEmphasis.high,
    size: index.ButtonSize.small
  }, "Keep")));
};
var ASSET_PREVIEW_WIDTH = 32;
var ASSET_PREVIEW_OFFSET = 20;
var UnavailableAssetsPreview = function UnavailableAssetsPreview(_ref4) {
  var assets = _ref4.assets;
  return /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    display: "grid",
    style: {
      gridTemplateColumns: "repeat(".concat(assets.length, ", 20px)"),
      width: "".concat(ASSET_PREVIEW_WIDTH + (assets.length - 1) * ASSET_PREVIEW_OFFSET, "px")
    }
  }, assets.map(function (asset, index) {
    return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      key: "".concat(asset.address, "-").concat(asset.tokenId),
      as: "img",
      src: asset.smallImageUrl,
      width: "32",
      height: "32",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "surface1",
      borderRadius: "4",
      style: {
        zIndex: index
      },
      className: BagRow_css.grayscaleImage
    });
  }));
};
var UnavailableAssetsHeaderRow = function UnavailableAssetsHeaderRow(_ref5) {
  var assets = _ref5.assets,
    usdPrice = _ref5.usdPrice,
    clearUnavailableAssets = _ref5.clearUnavailableAssets,
    didOpenUnavailableAssets = _ref5.didOpenUnavailableAssets,
    setDidOpenUnavailableAssets = _ref5.setDidOpenUnavailableAssets,
    isMobile = _ref5.isMobile;
  var _useReducer = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    isOpen = _useReducer2[0],
    toggleOpen = _useReducer2[1];
  var timerLimit = 8;
  var _useState7 = React.useState(timerLimit),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    timeLeft = _useState8[0],
    setTimeLeft = _useState8[1];
  React.useEffect(function () {
    if (!timeLeft) {
      if (!didOpenUnavailableAssets) {
        clearUnavailableAssets();
        setDidOpenUnavailableAssets(false);
      }
      return;
    }
    var intervalId = setInterval(function () {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return function () {
      return clearInterval(intervalId);
    };
  }, [timeLeft, clearUnavailableAssets, didOpenUnavailableAssets, setDidOpenUnavailableAssets]);
  if (!assets || assets.length === 0) return null;
  var moreThanOneUnavailable = assets.length > 1;
  var isShowingAssets = isOpen || !moreThanOneUnavailable;
  return /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    className: BagRow_css.unavailableAssetsContainer
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Column, null, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    justifyContent: "space-between",
    marginBottom: isShowingAssets ? "12" : "0",
    cursor: moreThanOneUnavailable ? "pointer" : "default",
    onClick: function onClick() {
      if (moreThanOneUnavailable) {
        !didOpenUnavailableAssets && setDidOpenUnavailableAssets(true);
        toggleOpen();
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    gap: "12",
    color: "neutral2",
    className: common_css.bodySmall
  }, !isShowingAssets && /*#__PURE__*/React__default["default"].createElement(UnavailableAssetsPreview, {
    assets: assets.slice(0, 5)
  }), "No longer available"), moreThanOneUnavailable && /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    color: "neutral2"
  }, isOpen ? /*#__PURE__*/React__default["default"].createElement(icons$1.ChevronUpBagIcon, null) : /*#__PURE__*/React__default["default"].createElement(icons$1.ChevronDownBagIcon, null)), !didOpenUnavailableAssets && /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    position: "relative",
    width: "20",
    height: "20",
    color: "neutral1",
    justifyContent: "center",
    cursor: "pointer",
    onClick: clearUnavailableAssets
  }, /*#__PURE__*/React__default["default"].createElement(TimedLoader.TimedLoader, null), /*#__PURE__*/React__default["default"].createElement(icons$1.CloseTimerIcon, null))), /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    gap: "8",
    style: {
      marginLeft: "-8px",
      marginRight: "-8px"
    }
  }, isShowingAssets && assets.map(function (asset) {
    return /*#__PURE__*/React__default["default"].createElement(BagRow, {
      key: asset.id,
      asset: asset,
      usdPrice: usdPrice,
      removeAsset: function removeAsset() {
        return undefined;
      },
      grayscale: true,
      isMobile: isMobile
    });
  }))));
};

exports.BagRow = BagRow;
exports.PriceChangeBagRow = PriceChangeBagRow;
exports.RemoveAssetButton = RemoveAssetButton;
exports.RemoveButton = RemoveButton;
exports.UnavailableAssetsHeaderRow = UnavailableAssetsHeaderRow;
