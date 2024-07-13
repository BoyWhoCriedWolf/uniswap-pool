'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var media = require('./media.cjs');
var icons = require('../icons.cjs');
var index$1 = require('../../types/collection/index.cjs');
var index = require('../../types/common/index.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('uuid');
require('@ethersproject/units');
var isAudio = require('../../utils/isAudio.cjs');
var isVideo = require('../../utils/isVideo.cjs');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
require('@ethersproject/bignumber');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var AssetMediaType = /*#__PURE__*/function (AssetMediaType) {
  AssetMediaType[AssetMediaType["Image"] = 0] = "Image";
  AssetMediaType[AssetMediaType["Video"] = 1] = "Video";
  AssetMediaType[AssetMediaType["Audio"] = 2] = "Audio";
  return AssetMediaType;
}(AssetMediaType || {});
function getAssetImageUrl(asset) {
  return asset.imageUrl || asset.smallImageUrl;
}
function getAssetMediaUrl(asset) {
  return asset.animationUrl;
}
function detailsHref(asset) {
  if ("address" in asset) return "/nfts/asset/".concat(asset.address, "/").concat(asset.tokenId, "?origin=collection");
  if ("asset_contract" in asset) return "/nfts/asset/".concat(asset.asset_contract.address, "/").concat(asset.tokenId, "?origin=profile");
  return "/nfts/profile";
}
function getAssetMediaType(asset) {
  var assetMediaType = AssetMediaType.Image;
  if (asset.animationUrl) {
    if (isAudio.isAudio(asset.animationUrl)) {
      assetMediaType = AssetMediaType.Audio;
    } else if (isVideo.isVideo(asset.animationUrl)) {
      assetMediaType = AssetMediaType.Video;
    }
  }
  return assetMediaType;
}
function getNftDisplayComponent(asset, mediaShouldBePlaying, setCurrentTokenPlayingMedia, uniformAspectRatio, setUniformAspectRatio, renderedHeight, setRenderedHeight) {
  switch (getAssetMediaType(asset)) {
    case AssetMediaType.Image:
      return /*#__PURE__*/React__default["default"].createElement(media.NftImage, {
        src: getAssetImageUrl(asset),
        uniformAspectRatio: uniformAspectRatio,
        setUniformAspectRatio: setUniformAspectRatio,
        renderedHeight: renderedHeight,
        setRenderedHeight: setRenderedHeight
      });
    case AssetMediaType.Video:
      return /*#__PURE__*/React__default["default"].createElement(media.NftPlayableMedia, {
        src: getAssetImageUrl(asset),
        mediaSrc: getAssetMediaUrl(asset),
        tokenId: asset.tokenId,
        shouldPlay: mediaShouldBePlaying,
        setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
        uniformAspectRatio: uniformAspectRatio,
        setUniformAspectRatio: setUniformAspectRatio,
        renderedHeight: renderedHeight,
        setRenderedHeight: setRenderedHeight
      });
    case AssetMediaType.Audio:
      return /*#__PURE__*/React__default["default"].createElement(media.NftPlayableMedia, {
        isAudio: true,
        src: getAssetImageUrl(asset),
        mediaSrc: getAssetMediaUrl(asset),
        tokenId: asset.tokenId,
        shouldPlay: mediaShouldBePlaying,
        setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
        uniformAspectRatio: uniformAspectRatio,
        setUniformAspectRatio: setUniformAspectRatio,
        renderedHeight: renderedHeight,
        setRenderedHeight: setRenderedHeight
      });
  }
}
function useSelectAsset(_ref) {
  var selectAsset = _ref.selectAsset,
    unselectAsset = _ref.unselectAsset,
    isSelected = _ref.isSelected,
    isDisabled = _ref.isDisabled,
    onClick = _ref.onClick;
  return React.useCallback(function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    if (onClick) {
      onClick();
      return;
    }
    return isSelected ? unselectAsset === null || unselectAsset === void 0 ? void 0 : unselectAsset() : selectAsset === null || selectAsset === void 0 ? void 0 : selectAsset();
  }, [selectAsset, isDisabled, onClick, unselectAsset, isSelected]);
}
function getMarketplaceIcon(market) {
  switch (market) {
    case index.Markets.Opensea:
      return /*#__PURE__*/React__default["default"].createElement(icons.OpenSeaMarketplaceIcon, null);
    case index.Markets.LooksRare:
      return /*#__PURE__*/React__default["default"].createElement(icons.LooksRareIcon, null);
    case index.Markets.X2Y2:
      return /*#__PURE__*/React__default["default"].createElement(icons.X2y2Icon, null);
    case index.Markets.Sudoswap:
      return /*#__PURE__*/React__default["default"].createElement(icons.SudoSwapIcon, null);
    case index.Markets.NFT20:
      return /*#__PURE__*/React__default["default"].createElement(icons.Nft20Icon, null);
    case index.Markets.NFTX:
      return /*#__PURE__*/React__default["default"].createElement(icons.NftXIcon, null);
    case index.Markets.Cryptopunks:
      return /*#__PURE__*/React__default["default"].createElement(icons.LarvaLabsMarketplaceIcon, null);
    default:
      return null;
  }
}
var handleUniformAspectRatio = function handleUniformAspectRatio(uniformAspectRatio, e, setUniformAspectRatio, renderedHeight, setRenderedHeight) {
  if (uniformAspectRatio !== index$1.UniformAspectRatios.square && setUniformAspectRatio) {
    var height = e.currentTarget.clientHeight;
    var width = e.currentTarget.clientWidth;
    var aspectRatio = width / height;
    if ((!renderedHeight || renderedHeight !== height) && aspectRatio < 1 && uniformAspectRatio !== index$1.UniformAspectRatios.square && setRenderedHeight) {
      setRenderedHeight(height);
    }
    var variance = 0.05;
    if (uniformAspectRatio === index$1.UniformAspectRatios.unset) {
      setUniformAspectRatio(aspectRatio >= 1 ? index$1.UniformAspectRatios.square : aspectRatio);
    } else if (aspectRatio > uniformAspectRatio + variance || aspectRatio < uniformAspectRatio - variance) {
      setUniformAspectRatio(index$1.UniformAspectRatios.square);
      setRenderedHeight && setRenderedHeight(undefined);
    }
  }
};
function getHeightFromAspectRatio(uniformAspectRatio, renderedHeight) {
  return uniformAspectRatio === index$1.UniformAspectRatios.square || uniformAspectRatio === index$1.UniformAspectRatios.unset ? undefined : renderedHeight;
}
function getMediaAspectRatio(uniformAspectRatio, setUniformAspectRatio) {
  return uniformAspectRatio === index$1.UniformAspectRatios.square || !setUniformAspectRatio ? "1" : "auto";
}

exports.detailsHref = detailsHref;
exports.getHeightFromAspectRatio = getHeightFromAspectRatio;
exports.getMarketplaceIcon = getMarketplaceIcon;
exports.getMediaAspectRatio = getMediaAspectRatio;
exports.getNftDisplayComponent = getNftDisplayComponent;
exports.handleUniformAspectRatio = handleUniformAspectRatio;
exports.useSelectAsset = useSelectAsset;
