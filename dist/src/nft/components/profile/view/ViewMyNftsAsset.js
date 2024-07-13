import React__default, { useMemo } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { NFTEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../../../analytics/index.js';
import { NftCard } from '../../card/index.js';
import { detailsHref } from '../../card/utils.js';
import { VerifiedIcon } from '../../icons.js';
import { useBag } from '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../../hooks/useIsMobile.js';
import '../../../../hooks/useScreenSize.js';
import '../../../hooks/useNFTList.js';
import '../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import { useNavigate } from 'react-router-dom';
import { useTrace } from '@uniswap/analytics';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ViewMyNftsAsset = function ViewMyNftsAsset(_ref) {
  var asset = _ref.asset,
    mediaShouldBePlaying = _ref.mediaShouldBePlaying,
    setCurrentTokenPlayingMedia = _ref.setCurrentTokenPlayingMedia,
    hideDetails = _ref.hideDetails;
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var selectSellAsset = useSellAsset(function (state) {
    return state.selectSellAsset;
  });
  var removeSellAsset = useSellAsset(function (state) {
    return state.removeSellAsset;
  });
  var cartExpanded = useBag(function (state) {
    return state.bagExpanded;
  });
  var toggleCart = useBag(function (state) {
    return state.toggleBag;
  });
  var isMobile = useIsMobile();
  var navigate = useNavigate();
  var isSelected = useMemo(function () {
    return sellAssets.some(function (item) {
      return item.tokenId === asset.tokenId && item.asset_contract.address === asset.asset_contract.address;
    });
  }, [asset, sellAssets]);
  var trace = useTrace();
  var toggleSelect = function toggleSelect() {
    return handleSelect(isSelected);
  };
  var handleSelect = function handleSelect(removeAsset) {
    if (removeAsset) {
      removeSellAsset(asset);
    } else {
      selectSellAsset(asset);
      sendAnalyticsEvent(NFTEventName.NFT_SELL_ITEM_ADDED, _objectSpread({
        collection_address: asset.asset_contract.address,
        token_id: asset.tokenId
      }, trace));
    }
    if (!cartExpanded && !sellAssets.find(function (x) {
      return x.tokenId === asset.tokenId && x.asset_contract.address === asset.asset_contract.address;
    }) && !isMobile) toggleCart();
  };
  var isDisabled = asset.susFlag;
  var display = useMemo(function () {
    var _asset$name;
    return {
      primaryInfo: !!asset.asset_contract.name && asset.asset_contract.name,
      primaryInfoIcon: asset.collectionIsVerified && /*#__PURE__*/React__default.createElement(VerifiedIcon, {
        height: "16px",
        width: "16px"
      }),
      secondaryInfo: asset.name || asset.tokenId ? (_asset$name = asset.name) !== null && _asset$name !== void 0 ? _asset$name : "#".concat(asset.tokenId) : null,
      selectedInfo: /*#__PURE__*/React__default.createElement(Trans, {
        id: "77UrnP",
        message: "Remove from bag"
      }),
      notSelectedInfo: /*#__PURE__*/React__default.createElement(Trans, {
        id: "9AgVn/",
        message: "List for sale"
      }),
      disabledInfo: /*#__PURE__*/React__default.createElement(Trans, {
        id: "KWvmby",
        message: "Unavailable for listing"
      })
    };
  }, [asset.asset_contract.name, asset.collectionIsVerified, asset.name, asset.tokenId]);
  return /*#__PURE__*/React__default.createElement(NftCard, {
    asset: asset,
    display: display,
    isSelected: isSelected,
    isDisabled: Boolean(isDisabled),
    selectAsset: function selectAsset() {
      return handleSelect(false);
    },
    unselectAsset: function unselectAsset() {
      return handleSelect(true);
    },
    onButtonClick: toggleSelect,
    onCardClick: function onCardClick() {
      if (!hideDetails) navigate(detailsHref(asset));
    },
    mediaShouldBePlaying: mediaShouldBePlaying,
    setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
    testId: "nft-profile-asset"
  });
};

export { ViewMyNftsAsset };
