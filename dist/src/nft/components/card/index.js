import React__default from 'react';
import { Container, DetailsRelativeContainer, DetailsContainer, InfoContainer, PrimaryRow, PrimaryDetails, PrimaryInfo, SecondaryRow, SecondaryDetails, SecondaryInfo, ActionButton } from './containers.js';
import { MarketplaceContainer } from './icons.js';
import { MediaContainer } from './media.js';
import { useSelectAsset, detailsHref, getNftDisplayComponent } from './utils.js';
import { useBag } from '../../hooks/useBag.js';
import '../../hooks/useCollectionFilters.js';
import '../../hooks/useFiltersExpanded.js';
import '../../hooks/useIsCollectionLoading.js';
import '../../../hooks/useScreenSize.js';
import '../../hooks/useNFTList.js';
import '../../hooks/useProfilePageState.js';
import '../../hooks/useSellAsset.js';
import '../../hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../hooks/useUSDPrice.js';
import '../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../lib/hooks/useCurrencyBalance.js';
import '../../hooks/useWalletCollections.js';
import { UniformAspectRatios } from '../../types/collection/index.js';
import '@babel/runtime/helpers/toConsumableArray';
import '../icons.js';
import 'uuid';
import 'video-extensions';
import { floorFormatter } from '../../utils/numbers.js';
import '../../utils/pooledAssets.js';
import '../../utils/time.js';
import '@ethersproject/bignumber';

/**
 * NftCard is a component that displays an NFT asset.
 *
 * By default, clicking on the card will navigate to the details page.
 * If you wish to override this behavior, pass a value for the onCardClick prop.
 */
var NftCard = function NftCard(_ref) {
  var asset = _ref.asset,
    display = _ref.display,
    isSelected = _ref.isSelected,
    selectAsset = _ref.selectAsset,
    unselectAsset = _ref.unselectAsset,
    isDisabled = _ref.isDisabled,
    onButtonClick = _ref.onButtonClick,
    onCardClick = _ref.onCardClick,
    sendAnalyticsEvent = _ref.sendAnalyticsEvent,
    mediaShouldBePlaying = _ref.mediaShouldBePlaying,
    _ref$uniformAspectRat = _ref.uniformAspectRatio,
    uniformAspectRatio = _ref$uniformAspectRat === void 0 ? UniformAspectRatios.square : _ref$uniformAspectRat,
    setUniformAspectRatio = _ref.setUniformAspectRatio,
    renderedHeight = _ref.renderedHeight,
    setRenderedHeight = _ref.setRenderedHeight,
    setCurrentTokenPlayingMedia = _ref.setCurrentTokenPlayingMedia,
    testId = _ref.testId,
    _ref$hideDetails = _ref.hideDetails,
    hideDetails = _ref$hideDetails === void 0 ? false : _ref$hideDetails;
  var clickActionButton = useSelectAsset({
    selectAsset: selectAsset,
    unselectAsset: unselectAsset,
    isSelected: isSelected,
    isDisabled: isDisabled,
    onClick: onButtonClick
  });
  var _useBag = useBag(function (state) {
      return {
        bagExpanded: state.bagExpanded,
        setBagExpanded: state.setBagExpanded
      };
    }),
    bagExpanded = _useBag.bagExpanded,
    setBagExpanded = _useBag.setBagExpanded;
  var collectionNft = ("marketplace" in asset);
  var profileNft = ("asset_contract" in asset);
  var tokenType = collectionNft ? asset.tokenType : profileNft ? asset.asset_contract.tokenType : undefined;
  var marketplace = collectionNft ? asset.marketplace : undefined;
  var listedPrice = profileNft && !isDisabled && asset.floor_sell_order_price ? floorFormatter(asset.floor_sell_order_price) : undefined;
  return /*#__PURE__*/React__default.createElement(Container, {
    isSelected: isSelected,
    isDisabled: isDisabled,
    detailsHref: onCardClick ? undefined : detailsHref(asset),
    testId: testId,
    onClick: function onClick() {
      if (bagExpanded) setBagExpanded({
        bagExpanded: false
      });
      onCardClick === null || onCardClick === void 0 || onCardClick();
      sendAnalyticsEvent === null || sendAnalyticsEvent === void 0 || sendAnalyticsEvent();
    }
  }, /*#__PURE__*/React__default.createElement(MediaContainer, {
    isDisabled: isDisabled
  }, /*#__PURE__*/React__default.createElement(MarketplaceContainer, {
    hidePrice: hideDetails,
    isSelected: isSelected,
    marketplace: marketplace,
    tokenType: tokenType,
    listedPrice: listedPrice
  }), getNftDisplayComponent(asset, mediaShouldBePlaying, setCurrentTokenPlayingMedia, uniformAspectRatio, setUniformAspectRatio, renderedHeight, setRenderedHeight)), !hideDetails && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DetailsRelativeContainer, null, /*#__PURE__*/React__default.createElement(DetailsContainer, null, /*#__PURE__*/React__default.createElement(InfoContainer, null, /*#__PURE__*/React__default.createElement(PrimaryRow, null, /*#__PURE__*/React__default.createElement(PrimaryDetails, null, /*#__PURE__*/React__default.createElement(PrimaryInfo, null, display.primaryInfo), display.primaryInfoIcon), display.primaryInfoRight), /*#__PURE__*/React__default.createElement(SecondaryRow, null, /*#__PURE__*/React__default.createElement(SecondaryDetails, null, /*#__PURE__*/React__default.createElement(SecondaryInfo, null, display.secondaryInfo)))))), /*#__PURE__*/React__default.createElement(ActionButton, {
    clickActionButton: clickActionButton,
    isDisabled: isDisabled,
    isSelected: isSelected
  }, isSelected ? display.selectedInfo : isDisabled ? display.disabledInfo : display.notSelectedInfo)));
};

export { NftCard };
