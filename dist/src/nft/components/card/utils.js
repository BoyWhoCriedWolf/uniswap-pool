import React__default, { useCallback } from 'react';
import { NftPlayableMedia, NftImage } from './media.js';
import { LarvaLabsMarketplaceIcon, NftXIcon, Nft20Icon, SudoSwapIcon, X2y2Icon, LooksRareIcon, OpenSeaMarketplaceIcon } from '../icons.js';
import { UniformAspectRatios } from '../../types/collection/index.js';
import { Markets } from '../../types/common/index.js';
import '@babel/runtime/helpers/toConsumableArray';
import 'uuid';
import '@ethersproject/units';
import { isAudio } from '../../utils/isAudio.js';
import { isVideo } from '../../utils/isVideo.js';
import '../../../locales/en-US.js';
import 'numbro';
import '../../utils/pooledAssets.js';
import '../../utils/time.js';
import '@ethersproject/bignumber';

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
    if (isAudio(asset.animationUrl)) {
      assetMediaType = AssetMediaType.Audio;
    } else if (isVideo(asset.animationUrl)) {
      assetMediaType = AssetMediaType.Video;
    }
  }
  return assetMediaType;
}
function getNftDisplayComponent(asset, mediaShouldBePlaying, setCurrentTokenPlayingMedia, uniformAspectRatio, setUniformAspectRatio, renderedHeight, setRenderedHeight) {
  switch (getAssetMediaType(asset)) {
    case AssetMediaType.Image:
      return /*#__PURE__*/React__default.createElement(NftImage, {
        src: getAssetImageUrl(asset),
        uniformAspectRatio: uniformAspectRatio,
        setUniformAspectRatio: setUniformAspectRatio,
        renderedHeight: renderedHeight,
        setRenderedHeight: setRenderedHeight
      });
    case AssetMediaType.Video:
      return /*#__PURE__*/React__default.createElement(NftPlayableMedia, {
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
      return /*#__PURE__*/React__default.createElement(NftPlayableMedia, {
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
  return useCallback(function (e) {
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
    case Markets.Opensea:
      return /*#__PURE__*/React__default.createElement(OpenSeaMarketplaceIcon, null);
    case Markets.LooksRare:
      return /*#__PURE__*/React__default.createElement(LooksRareIcon, null);
    case Markets.X2Y2:
      return /*#__PURE__*/React__default.createElement(X2y2Icon, null);
    case Markets.Sudoswap:
      return /*#__PURE__*/React__default.createElement(SudoSwapIcon, null);
    case Markets.NFT20:
      return /*#__PURE__*/React__default.createElement(Nft20Icon, null);
    case Markets.NFTX:
      return /*#__PURE__*/React__default.createElement(NftXIcon, null);
    case Markets.Cryptopunks:
      return /*#__PURE__*/React__default.createElement(LarvaLabsMarketplaceIcon, null);
    default:
      return null;
  }
}
var handleUniformAspectRatio = function handleUniformAspectRatio(uniformAspectRatio, e, setUniformAspectRatio, renderedHeight, setRenderedHeight) {
  if (uniformAspectRatio !== UniformAspectRatios.square && setUniformAspectRatio) {
    var height = e.currentTarget.clientHeight;
    var width = e.currentTarget.clientWidth;
    var aspectRatio = width / height;
    if ((!renderedHeight || renderedHeight !== height) && aspectRatio < 1 && uniformAspectRatio !== UniformAspectRatios.square && setRenderedHeight) {
      setRenderedHeight(height);
    }
    var variance = 0.05;
    if (uniformAspectRatio === UniformAspectRatios.unset) {
      setUniformAspectRatio(aspectRatio >= 1 ? UniformAspectRatios.square : aspectRatio);
    } else if (aspectRatio > uniformAspectRatio + variance || aspectRatio < uniformAspectRatio - variance) {
      setUniformAspectRatio(UniformAspectRatios.square);
      setRenderedHeight && setRenderedHeight(undefined);
    }
  }
};
function getHeightFromAspectRatio(uniformAspectRatio, renderedHeight) {
  return uniformAspectRatio === UniformAspectRatios.square || uniformAspectRatio === UniformAspectRatios.unset ? undefined : renderedHeight;
}
function getMediaAspectRatio(uniformAspectRatio, setUniformAspectRatio) {
  return uniformAspectRatio === UniformAspectRatios.square || !setUniformAspectRatio ? "1" : "auto";
}

export { detailsHref, getHeightFromAspectRatio, getMarketplaceIcon, getMediaAspectRatio, getNftDisplayComponent, handleUniformAspectRatio, useSelectAsset };
