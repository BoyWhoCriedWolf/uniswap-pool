'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../../../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var index$2 = require('../../../../analytics/index.cjs');
var index$1 = require('../../card/index.cjs');
var utils = require('../../card/utils.cjs');
var icons = require('../../icons.cjs');
var useBag = require('../../../hooks/useBag.cjs');
require('../../../hooks/useCollectionFilters.cjs');
require('../../../hooks/useFiltersExpanded.cjs');
require('../../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../../hooks/useIsMobile.cjs');
require('../../../../hooks/useScreenSize.cjs');
require('../../../hooks/useNFTList.cjs');
require('../../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../../hooks/useSellAsset.cjs');
require('../../../hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../hooks/useUSDPrice.cjs');
require('../../../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../hooks/useWalletCollections.cjs');
var reactRouterDom = require('react-router-dom');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ViewMyNftsAsset = function ViewMyNftsAsset(_ref) {
  var asset = _ref.asset,
    mediaShouldBePlaying = _ref.mediaShouldBePlaying,
    setCurrentTokenPlayingMedia = _ref.setCurrentTokenPlayingMedia,
    hideDetails = _ref.hideDetails;
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var selectSellAsset = useSellAsset.useSellAsset(function (state) {
    return state.selectSellAsset;
  });
  var removeSellAsset = useSellAsset.useSellAsset(function (state) {
    return state.removeSellAsset;
  });
  var cartExpanded = useBag.useBag(function (state) {
    return state.bagExpanded;
  });
  var toggleCart = useBag.useBag(function (state) {
    return state.toggleBag;
  });
  var isMobile = useIsMobile.useIsMobile();
  var navigate = reactRouterDom.useNavigate();
  var isSelected = React.useMemo(function () {
    return sellAssets.some(function (item) {
      return item.tokenId === asset.tokenId && item.asset_contract.address === asset.asset_contract.address;
    });
  }, [asset, sellAssets]);
  var trace = analytics.useTrace();
  var toggleSelect = function toggleSelect() {
    return handleSelect(isSelected);
  };
  var handleSelect = function handleSelect(removeAsset) {
    if (removeAsset) {
      removeSellAsset(asset);
    } else {
      selectSellAsset(asset);
      index$2.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_SELL_ITEM_ADDED, _objectSpread({
        collection_address: asset.asset_contract.address,
        token_id: asset.tokenId
      }, trace));
    }
    if (!cartExpanded && !sellAssets.find(function (x) {
      return x.tokenId === asset.tokenId && x.asset_contract.address === asset.asset_contract.address;
    }) && !isMobile) toggleCart();
  };
  var isDisabled = asset.susFlag;
  var display = React.useMemo(function () {
    var _asset$name;
    return {
      primaryInfo: !!asset.asset_contract.name && asset.asset_contract.name,
      primaryInfoIcon: asset.collectionIsVerified && /*#__PURE__*/React__default["default"].createElement(icons.VerifiedIcon, {
        height: "16px",
        width: "16px"
      }),
      secondaryInfo: asset.name || asset.tokenId ? (_asset$name = asset.name) !== null && _asset$name !== void 0 ? _asset$name : "#".concat(asset.tokenId) : null,
      selectedInfo: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "77UrnP",
        message: "Remove from bag"
      }),
      notSelectedInfo: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "9AgVn/",
        message: "List for sale"
      }),
      disabledInfo: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
        id: "KWvmby",
        message: "Unavailable for listing"
      })
    };
  }, [asset.asset_contract.name, asset.collectionIsVerified, asset.name, asset.tokenId]);
  return /*#__PURE__*/React__default["default"].createElement(index$1.NftCard, {
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
      if (!hideDetails) navigate(utils.detailsHref(asset));
    },
    mediaShouldBePlaying: mediaShouldBePlaying,
    setCurrentTokenPlayingMedia: setCurrentTokenPlayingMedia,
    testId: "nft-profile-asset"
  });
};

exports.ViewMyNftsAsset = ViewMyNftsAsset;
