import React__default, { useState, useCallback, useReducer, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import clsx from 'clsx';
import { ThemeButton, ButtonEmphasis, ButtonSize } from '../../../components/Button/index.js';
import { TimedLoader } from './TimedLoader.js';
import { Box } from '../Box.js';
import { Suspicious } from '../card/icons.js';
import { Row, Column } from '../Flex.js';
import { VerifiedIcon, SquareArrowUpIcon, SquareArrowDownIcon, ChevronUpBagIcon, ChevronDownBagIcon, CloseTimerIcon, CircularCloseIcon } from '../icons.js';
import { bodySmall } from '../../css/common.css.js';
import { loadingBlock } from '../../css/loading.css.js';
import { getAssetHref } from '../../utils/asset.js';
import { formatWeiToDecimal, ethNumberStandardFormatter } from '../../utils/currency.js';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../utils/pooledAssets.js';
import '../../utils/time.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { bagRow, bagRowImage, grayscaleImage, assetName, collectionName, icon, bagRowPrice, priceChangeColumn, priceChangeRow, unavailableAssetsContainer } from './BagRow.css.js';

var _templateObject, _templateObject2, _templateObject3;
var RemoveButton = styled(ThemeButton)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  font-size: 14px;\n  line-height: 16px;\n  margin-left: 16px;\n  padding: 12px 14px;\n"])));
var ReviewButton = styled(ThemeButton)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  flex: 1 1 auto;\n  font-size: 14px;\n  padding: 8px;\n  width: 50%;\n"])));
var RemoveAssetOverlay = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  display: block;\n  right: -11px;\n  top: -11px;\n  z-index: 1;\n  transition: 250ms;\n  width: 45px;\n  height: 45px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var RemoveAssetButton = function RemoveAssetButton(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/React__default.createElement(RemoveAssetOverlay, {
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement(CircularCloseIcon, null));
};
var NoContentContainer = function NoContentContainer() {
  return /*#__PURE__*/React__default.createElement(Box, {
    position: "relative",
    background: "loadingBackground",
    className: bagRowImage
  }, /*#__PURE__*/React__default.createElement(Box, {
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
  }, "Image", /*#__PURE__*/React__default.createElement("br", null), "not", /*#__PURE__*/React__default.createElement("br", null), "available"));
};
var BagRow = function BagRow(_ref2) {
  var _asset$name;
  var asset = _ref2.asset,
    usdPrice = _ref2.usdPrice,
    removeAsset = _ref2.removeAsset,
    showRemove = _ref2.showRemove,
    grayscale = _ref2.grayscale,
    isMobile = _ref2.isMobile;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loadedImage = _useState2[0],
    setImageLoaded = _useState2[1];
  var _useState3 = useState(!asset.smallImageUrl),
    _useState4 = _slicedToArray(_useState3, 2),
    noImageAvailable = _useState4[0],
    setNoImageAvailable = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    cardHovered = _useState6[0],
    setCardHovered = _useState6[1];
  var handleMouseEnter = useCallback(function () {
    return setCardHovered(true);
  }, []);
  var handleMouseLeave = useCallback(function () {
    return setCardHovered(false);
  }, []);
  var showRemoveButton = Boolean(showRemove && cardHovered && !isMobile);
  var assetEthPrice = asset.updatedPriceInfo ? asset.updatedPriceInfo.ETHPrice : asset.priceInfo.ETHPrice;
  var assetEthPriceFormatted = formatWeiToDecimal(assetEthPrice);
  var assetUSDPriceFormatted = ethNumberStandardFormatter(usdPrice ? parseFloat(formatEther(assetEthPrice)) * usdPrice : usdPrice, true);
  var handleRemoveClick = useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    removeAsset([asset]);
  }, [asset, removeAsset]);
  return /*#__PURE__*/React__default.createElement(Link, {
    to: getAssetHref(asset),
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React__default.createElement(Row, {
    className: bagRow,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, /*#__PURE__*/React__default.createElement(Box, {
    position: "relative",
    display: "flex"
  }, showRemove && isMobile && /*#__PURE__*/React__default.createElement(RemoveAssetButton, {
    onClick: handleRemoveClick
  }), !noImageAvailable && /*#__PURE__*/React__default.createElement(Box, {
    as: "img",
    src: asset.smallImageUrl,
    alt: asset.name,
    className: clsx(bagRowImage, grayscale && !cardHovered && grayscaleImage),
    onLoad: function onLoad() {
      setImageLoaded(true);
    },
    onError: function onError() {
      setNoImageAvailable(true);
    },
    visibility: loadedImage ? "visible" : "hidden"
  }), !loadedImage && /*#__PURE__*/React__default.createElement(Box, {
    position: "absolute",
    className: "".concat(bagRowImage, " ").concat(loadingBlock)
  }), noImageAvailable && /*#__PURE__*/React__default.createElement(NoContentContainer, null)), /*#__PURE__*/React__default.createElement(Column, {
    overflow: "hidden",
    width: "full",
    color: grayscale ? "neutral2" : "neutral1"
  }, /*#__PURE__*/React__default.createElement(Row, {
    overflow: "hidden",
    width: "full",
    whiteSpace: "nowrap"
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: assetName
  }, (_asset$name = asset.name) !== null && _asset$name !== void 0 ? _asset$name : "#".concat(asset.tokenId)), asset.susFlag && /*#__PURE__*/React__default.createElement(Suspicious, null)), /*#__PURE__*/React__default.createElement(Row, {
    overflow: "hidden",
    whiteSpace: "nowrap",
    gap: "2"
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: collectionName
  }, asset.collectionName), asset.collectionIsVerified && /*#__PURE__*/React__default.createElement(VerifiedIcon, {
    className: icon
  }))), showRemoveButton && /*#__PURE__*/React__default.createElement(RemoveButton, {
    onClick: handleRemoveClick,
    emphasis: ButtonEmphasis.medium,
    size: ButtonSize.medium
  }, "Remove"), (!showRemoveButton || isMobile) && /*#__PURE__*/React__default.createElement(Column, {
    flexShrink: "0",
    alignItems: "flex-end"
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: bagRowPrice
  }, assetEthPriceFormatted, "\xA0ETH"), /*#__PURE__*/React__default.createElement(Box, {
    className: collectionName
  }, assetUSDPriceFormatted))));
};
var PriceChangeBagRow = function PriceChangeBagRow(_ref3) {
  var _asset$updatedPriceIn;
  var asset = _ref3.asset,
    usdPrice = _ref3.usdPrice,
    markAssetAsReviewed = _ref3.markAssetAsReviewed,
    top = _ref3.top,
    isMobile = _ref3.isMobile;
  var isPriceIncrease = BigNumber.from((_asset$updatedPriceIn = asset.updatedPriceInfo) === null || _asset$updatedPriceIn === void 0 ? void 0 : _asset$updatedPriceIn.ETHPrice).gt(BigNumber.from(asset.priceInfo.ETHPrice));
  var handleRemove = useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var toKeep = false;
    markAssetAsReviewed(asset, toKeep);
  }, [asset, markAssetAsReviewed]);
  var handleKeep = useCallback(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var toKeep = true;
    markAssetAsReviewed(asset, toKeep);
  }, [asset, markAssetAsReviewed]);
  return /*#__PURE__*/React__default.createElement(Column, {
    className: priceChangeColumn,
    borderTopColor: top ? "surface3" : "transparent"
  }, /*#__PURE__*/React__default.createElement(Row, {
    className: priceChangeRow
  }, isPriceIncrease ? /*#__PURE__*/React__default.createElement(SquareArrowUpIcon, null) : /*#__PURE__*/React__default.createElement(SquareArrowDownIcon, null), /*#__PURE__*/React__default.createElement(Box, null, "Price ".concat(isPriceIncrease ? "increased" : "decreased", " from ").concat(formatWeiToDecimal(asset.priceInfo.ETHPrice), " ETH"))), /*#__PURE__*/React__default.createElement(Box, {
    style: {
      marginLeft: "-8px",
      marginRight: "-8px"
    }
  }, /*#__PURE__*/React__default.createElement(BagRow, {
    asset: asset,
    usdPrice: usdPrice,
    removeAsset: function removeAsset() {
      return undefined;
    },
    isMobile: isMobile
  })), /*#__PURE__*/React__default.createElement(Row, {
    gap: "8",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default.createElement(ReviewButton, {
    onClick: handleRemove,
    emphasis: ButtonEmphasis.medium,
    size: ButtonSize.small
  }, "Remove"), /*#__PURE__*/React__default.createElement(ReviewButton, {
    onClick: handleKeep,
    emphasis: ButtonEmphasis.high,
    size: ButtonSize.small
  }, "Keep")));
};
var ASSET_PREVIEW_WIDTH = 32;
var ASSET_PREVIEW_OFFSET = 20;
var UnavailableAssetsPreview = function UnavailableAssetsPreview(_ref4) {
  var assets = _ref4.assets;
  return /*#__PURE__*/React__default.createElement(Column, {
    display: "grid",
    style: {
      gridTemplateColumns: "repeat(".concat(assets.length, ", 20px)"),
      width: "".concat(ASSET_PREVIEW_WIDTH + (assets.length - 1) * ASSET_PREVIEW_OFFSET, "px")
    }
  }, assets.map(function (asset, index) {
    return /*#__PURE__*/React__default.createElement(Box, {
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
      className: grayscaleImage
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
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    isOpen = _useReducer2[0],
    toggleOpen = _useReducer2[1];
  var timerLimit = 8;
  var _useState7 = useState(timerLimit),
    _useState8 = _slicedToArray(_useState7, 2),
    timeLeft = _useState8[0],
    setTimeLeft = _useState8[1];
  useEffect(function () {
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
  return /*#__PURE__*/React__default.createElement(Column, {
    className: unavailableAssetsContainer
  }, /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(Row, {
    justifyContent: "space-between",
    marginBottom: isShowingAssets ? "12" : "0",
    cursor: moreThanOneUnavailable ? "pointer" : "default",
    onClick: function onClick() {
      if (moreThanOneUnavailable) {
        !didOpenUnavailableAssets && setDidOpenUnavailableAssets(true);
        toggleOpen();
      }
    }
  }, /*#__PURE__*/React__default.createElement(Row, {
    gap: "12",
    color: "neutral2",
    className: bodySmall
  }, !isShowingAssets && /*#__PURE__*/React__default.createElement(UnavailableAssetsPreview, {
    assets: assets.slice(0, 5)
  }), "No longer available"), moreThanOneUnavailable && /*#__PURE__*/React__default.createElement(Row, {
    color: "neutral2"
  }, isOpen ? /*#__PURE__*/React__default.createElement(ChevronUpBagIcon, null) : /*#__PURE__*/React__default.createElement(ChevronDownBagIcon, null)), !didOpenUnavailableAssets && /*#__PURE__*/React__default.createElement(Row, {
    position: "relative",
    width: "20",
    height: "20",
    color: "neutral1",
    justifyContent: "center",
    cursor: "pointer",
    onClick: clearUnavailableAssets
  }, /*#__PURE__*/React__default.createElement(TimedLoader, null), /*#__PURE__*/React__default.createElement(CloseTimerIcon, null))), /*#__PURE__*/React__default.createElement(Column, {
    gap: "8",
    style: {
      marginLeft: "-8px",
      marginRight: "-8px"
    }
  }, isShowingAssets && assets.map(function (asset) {
    return /*#__PURE__*/React__default.createElement(BagRow, {
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

export { BagRow, PriceChangeBagRow, RemoveAssetButton, RemoveButton, UnavailableAssetsHeaderRow };
