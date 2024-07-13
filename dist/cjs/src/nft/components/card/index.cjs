'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var containers = require('./containers.cjs');
var icons = require('./icons.cjs');
var media = require('./media.cjs');
var utils = require('./utils.cjs');
var useBag = require('../../hooks/useBag.cjs');
require('../../hooks/useCollectionFilters.cjs');
require('../../hooks/useFiltersExpanded.cjs');
require('../../hooks/useIsCollectionLoading.cjs');
require('../../../hooks/useScreenSize.cjs');
require('../../hooks/useNFTList.cjs');
require('../../hooks/useProfilePageState.cjs');
require('../../hooks/useSellAsset.cjs');
require('../../hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../hooks/useUSDPrice.cjs');
require('../../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../../lib/hooks/useCurrencyBalance.cjs');
require('../../hooks/useWalletCollections.cjs');
var index = require('../../types/collection/index.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('../icons.cjs');
require('uuid');
require('video-extensions');
var numbers = require('../../utils/numbers.cjs');
require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
require('@ethersproject/bignumber');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    uniformAspectRatio = _ref$uniformAspectRat === void 0 ? index.UniformAspectRatios.square : _ref$uniformAspectRat,
    setUniformAspectRatio = _ref.setUniformAspectRatio,
    renderedHeight = _ref.renderedHeight,
    setRenderedHeight = _ref.setRenderedHeight,
    setCurrentTokenPlayingMedia = _ref.setCurrentTokenPlayingMedia,
    testId = _ref.testId,
    _ref$hideDetails = _ref.hideDetails,
    hideDetails = _ref$hideDetails === void 0 ? false : _ref$hideDetails;
  var clickActionButton = utils.useSelectAsset({
    selectAsset: selectAsset,
    unselectAsset: unselectAsset,
    isSelected: isSelected,
    isDisabled: isDisabled,
    onClick: onButtonClick
  });
  var _useBag = useBag.useBag(function (state) {
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
  var listedPrice = profileNft && !isDisabled && asset.floor_sell_order_price ? numbers.floorFormatter(asset.floor_sell_order_price) : undefined;
  return /*#__PURE__*/React__default["default"].createElement(containers.Container, {
    isSelected: isSelected,
    isDisabled: isDisabled,
    detailsHref: onCardClick ? undefined : utils.detailsHref(asset),
    testId: testId,
    onClick: function onClick() {
      if (bagExpanded) setBagExpanded({
        bagExpanded: false
      });
      onCardClick === null || onCardClick === void 0 || onCardClick();
      sendAnalyticsEvent === null || sendAnalyticsEvent === void 0 || sendAnalyticsEvent();
    }
  }, /*#__PURE__*/React__default["default"].createElement(media.MediaContainer, {
    isDisabled: isDisabled
  }, /*#__PURE__*/React__default["default"].createElement(icons.MarketplaceContainer, {
    hidePrice: hideDetails,
    isSelected: isSelected,
    marketplace: marketplace,
    tokenType: tokenType,
    listedPrice: listedPrice
  }), utils.getNftDisplayComponent(asset, mediaShouldBePlaying, setCurrentTokenPlayingMedia, uniformAspectRatio, setUniformAspectRatio, renderedHeight, setRenderedHeight)), !hideDetails && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(containers.DetailsRelativeContainer, null, /*#__PURE__*/React__default["default"].createElement(containers.DetailsContainer, null, /*#__PURE__*/React__default["default"].createElement(containers.InfoContainer, null, /*#__PURE__*/React__default["default"].createElement(containers.PrimaryRow, null, /*#__PURE__*/React__default["default"].createElement(containers.PrimaryDetails, null, /*#__PURE__*/React__default["default"].createElement(containers.PrimaryInfo, null, display.primaryInfo), display.primaryInfoIcon), display.primaryInfoRight), /*#__PURE__*/React__default["default"].createElement(containers.SecondaryRow, null, /*#__PURE__*/React__default["default"].createElement(containers.SecondaryDetails, null, /*#__PURE__*/React__default["default"].createElement(containers.SecondaryInfo, null, display.secondaryInfo)))))), /*#__PURE__*/React__default["default"].createElement(containers.ActionButton, {
    clickActionButton: clickActionButton,
    isDisabled: isDisabled,
    isSelected: isSelected
  }, isSelected ? display.selectedInfo : isDisabled ? display.disabledInfo : display.notSelectedInfo)));
};

exports.NftCard = NftCard;
