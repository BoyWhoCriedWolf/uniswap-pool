import React__default, { useMemo, useReducer, useState, useEffect } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceModalName, NFTEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../../../../analytics/index.js';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { useStablecoinValue } from '../../../../hooks/useStablecoinPrice.js';
import useNativeCurrency from '../../../../lib/hooks/useNativeCurrency.js';
import tryParseCurrencyAmount from '../../../../lib/utils/tryParseCurrencyAmount.js';
import { ListingButton } from './ListingButton.js';
import { getTotalEthValue, useSubscribeListingState, approveCollectionRow, verifyStatus } from './utils.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../../hooks/useIsMobile.js';
import '../../../../hooks/useScreenSize.js';
import { useNFTList } from '../../../hooks/useNFTList.js';
import { useProfilePageState } from '../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import { LIST_PAGE_MARGIN, LIST_PAGE_MARGIN_MOBILE } from '../../../pages/profile/shared.js';
import { looksRareNonceFetcher } from '../../../queries/looksRare/looksRareNonceFetcher.js';
import { ProfilePageStateType } from '../../../types/sell/index.js';
import '@babel/runtime/helpers/toConsumableArray';
import '../../icons.js';
import 'uuid';
import { formatEth } from '../../../utils/currency.js';
import 'video-extensions';
import '../../../../locales/en-US.js';
import 'numbro';
import '../../../utils/pooledAssets.js';
import '../../../utils/time.js';
import '@ethersproject/bignumber';
import { ListingMarkets } from '../../../utils/listNfts.js';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../theme/index.js';
import '../../../../theme/components/index.js';
import { Z_INDEX } from '../../../../theme/zIndex.js';
import { useFormatter, NumberType } from '../../../../utils/formatNumbers.js';
import { ListModal } from './Modal/ListModal.js';
import { NFTListingsGrid } from './NFTListingsGrid.js';
import { SelectMarketplacesDropdown } from './SelectMarketplacesDropdown.js';
import { SetDurationModal } from './SetDurationModal.js';
import { ThemedText } from '../../../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ListingHeader = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 16px;\n  margin-top: 36px;\n\n  @media screen and (min-width: ", "px) {\n    gap: 4px;\n  }\n"])), BREAKPOINTS.xs);
var ArrowContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 4px;\n\n  @media screen and (min-width: ", "px) {\n    height: 40px;\n    width: 40px;\n  }\n"])), BREAKPOINTS.sm);
var BackArrow = styled(ArrowLeft)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  cursor: pointer;\n  color: ", ";\n\n  @media screen and (min-width: ", "px) {\n    height: 20px;\n    width: 20px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, BREAKPOINTS.sm);
var TitleWrapper = styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  gap: 4px;\n  margin-bottom: 12px;\n  white-space: nowrap;\n  width: min-content;\n  font-weight: 535;\n  font-size: 20px;\n  line-height: 28px;\n\n  @media screen and (min-width: ", "px) {\n    margin-bottom: 0px;\n    font-weight: 535;\n    font-size: 28px;\n    line-height: 36px;\n  }\n"])), BREAKPOINTS.xs);
var ButtonsWrapper = styled(Row)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  gap: 12px;\n  width: min-content;\n"])));
var MarketWrap = styled.section(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  gap: 48px;\n  margin: 0px auto;\n  width: 100%;\n  max-width: 1200px;\n"])));
var ListingHeaderRow = styled(Row)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n\n  @media screen and (min-width: ", "px) {\n    padding-left: 40px;\n  }\n"])), BREAKPOINTS.sm);
var GridWrapper = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  margin-top: 24px;\n  margin-bottom: 48px;\n"])));
var FloatingConfirmationBar = styled(Row)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  padding: 12px 12px 12px 32px;\n  border: 1px solid;\n  border-color: ", ";\n  border-radius: 20px;\n  white-space: nowrap;\n  justify-content: space-between;\n  background: ", ";\n  position: fixed;\n  bottom: 32px;\n  width: calc(100vw - ", "px);\n  left: 50%;\n  transform: translateX(-50%);\n  max-width: ", ";\n  z-index: ", ";\n  box-shadow: ", ";\n\n  @media screen and (max-width: ", "px) {\n    bottom: 68px;\n  }\n\n  @media screen and (max-width: ", "px) {\n    width: calc(100% - ", "px);\n    padding: 8px 8px 8px 16px;\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme,
    issues = _ref2.issues;
  return issues ? theme.surface3 : theme.accent1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface1;
}, LIST_PAGE_MARGIN * 2, function (_ref4) {
  var theme = _ref4.theme;
  return theme.maxWidth;
}, Z_INDEX.under_dropdown, function (_ref5) {
  var theme = _ref5.theme;
  return theme.deprecated_shallowShadow;
}, BREAKPOINTS.lg, BREAKPOINTS.sm, LIST_PAGE_MARGIN_MOBILE * 2);
var Overlay = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  position: fixed;\n  bottom: 0px;\n  left: 0px;\n  height: 158px;\n  width: 100vw;\n  background: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ".concat(theme.surface2, " 100%)");
});
var UsdValue = styled(ThemedText.SubHeader)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  line-height: 24px;\n  color: ", ";\n  display: none;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.neutral2;
}, BREAKPOINTS.lg);
var ProceedsAndButtonWrapper = styled(Row)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  width: min-content;\n  gap: 40px;\n\n  @media screen and (max-width: ", "px) {\n    gap: 20px;\n  }\n"])), BREAKPOINTS.sm);
var ProceedsWrapper = styled(Row)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  width: min-content;\n  gap: 16px;\n"])));
var EthValueWrapper = styled.span(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 20px;\n  line-height: 28px;\n  color: ", ";\n\n  @media screen and (max-width: ", "px) {\n    font-size: 16px;\n    line-height: 24px;\n  }\n"])), function (_ref8) {
  var theme = _ref8.theme,
    totalEthListingValue = _ref8.totalEthListingValue;
  return totalEthListingValue ? theme.neutral1 : theme.neutral2;
}, BREAKPOINTS.sm);
var ListPage = function ListPage() {
  var _useProfilePageState = useProfilePageState(),
    setSellPageState = _useProfilePageState.setProfilePageState;
  var _useWeb3React = useWeb3React(),
    provider = _useWeb3React.provider,
    chainId = _useWeb3React.chainId;
  var isMobile = useIsMobile();
  var trace = useTrace({
    modal: InterfaceModalName.NFT_LISTING
  });
  var _useFormatter = useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var _useSellAsset = useSellAsset(function (_ref9) {
      var setGlobalMarketplaces = _ref9.setGlobalMarketplaces,
        sellAssets = _ref9.sellAssets,
        issues = _ref9.issues;
      return {
        setGlobalMarketplaces: setGlobalMarketplaces,
        sellAssets: sellAssets,
        issues: issues
      };
    }),
    setGlobalMarketplaces = _useSellAsset.setGlobalMarketplaces,
    sellAssets = _useSellAsset.sellAssets,
    issues = _useSellAsset.issues;
  var _useNFTList = useNFTList(function (_ref10) {
      var listings = _ref10.listings,
        collectionsRequiringApproval = _ref10.collectionsRequiringApproval,
        setLooksRareNonce = _ref10.setLooksRareNonce,
        setCollectionStatusAndCallback = _ref10.setCollectionStatusAndCallback;
      return {
        listings: listings,
        collectionsRequiringApproval: collectionsRequiringApproval,
        setLooksRareNonce: setLooksRareNonce,
        setCollectionStatusAndCallback: setCollectionStatusAndCallback
      };
    }),
    listings = _useNFTList.listings,
    collectionsRequiringApproval = _useNFTList.collectionsRequiringApproval,
    setLooksRareNonce = _useNFTList.setLooksRareNonce,
    setCollectionStatusAndCallback = _useNFTList.setCollectionStatusAndCallback;
  var totalEthListingValue = useMemo(function () {
    return getTotalEthValue(sellAssets);
  }, [sellAssets]);
  var nativeCurrency = useNativeCurrency(chainId);
  var parsedAmount = tryParseCurrencyAmount(totalEthListingValue.toString(), nativeCurrency);
  var usdcValue = useStablecoinValue(parsedAmount);
  var usdcAmount = formatCurrencyAmount({
    amount: usdcValue,
    type: NumberType.FiatTokenPrice
  });
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    showListModal = _useReducer2[0],
    toggleShowListModal = _useReducer2[1];
  var _useState = useState([ListingMarkets[0]]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedMarkets = _useState2[0],
    setSelectedMarkets = _useState2[1]; // default marketplace: x2y2
  var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();

  // instantiate listings and collections to approve when users modify input data
  useSubscribeListingState();
  useEffect(function () {
    setGlobalMarketplaces(selectedMarkets);
  }, [selectedMarkets, setGlobalMarketplaces]);
  var startListingEventProperties = _objectSpread({
    collection_addresses: sellAssets.map(function (asset) {
      return asset.asset_contract.address;
    }),
    token_ids: sellAssets.map(function (asset) {
      return asset.tokenId;
    }),
    marketplaces: Array.from(new Set(listings.map(function (asset) {
      return asset.marketplace.name;
    }))),
    list_quantity: listings.length,
    usd_value: usdcAmount
  }, trace);
  var startListingFlow = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var signerAddress, nonce, _iterator, _step, collectionRow;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (signer) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            sendAnalyticsEvent(NFTEventName.NFT_SELL_START_LISTING, _objectSpread({}, startListingEventProperties));
            _context.next = 5;
            return signer.getAddress();
          case 5:
            signerAddress = _context.sent;
            _context.next = 8;
            return looksRareNonceFetcher(signerAddress);
          case 8:
            nonce = _context.sent;
            setLooksRareNonce(nonce !== null && nonce !== void 0 ? nonce : 0);

            // for all unique collection, marketplace combos -> approve collections
            _iterator = _createForOfIteratorHelper(collectionsRequiringApproval);
            _context.prev = 11;
            _iterator.s();
          case 13:
            if ((_step = _iterator.n()).done) {
              _context.next = 25;
              break;
            }
            collectionRow = _step.value;
            _context.t0 = verifyStatus(collectionRow.status);
            if (!_context.t0) {
              _context.next = 23;
              break;
            }
            if (!isMobile) {
              _context.next = 22;
              break;
            }
            _context.next = 20;
            return approveCollectionRow(collectionRow, signer, setCollectionStatusAndCallback);
          case 20:
            _context.next = 23;
            break;
          case 22:
            approveCollectionRow(collectionRow, signer, setCollectionStatusAndCallback);
          case 23:
            _context.next = 13;
            break;
          case 25:
            _context.next = 30;
            break;
          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](11);
            _iterator.e(_context.t1);
          case 30:
            _context.prev = 30;
            _iterator.f();
            return _context.finish(30);
          case 33:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[11, 27, 30, 33]]);
    }));
    return function startListingFlow() {
      return _ref11.apply(this, arguments);
    };
  }();
  var showModalAndStartListing = function showModalAndStartListing() {
    toggleShowListModal();
    startListingFlow();
  };
  var BannerText = isMobile ? /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "lDgVWA",
    message: "Receive"
  })) : /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    lineHeight: "28px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "88cUW+",
    message: "You receive"
  }));
  return /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(MarketWrap, null, /*#__PURE__*/React__default.createElement(ListingHeader, null, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(ArrowContainer, null, /*#__PURE__*/React__default.createElement(BackArrow, {
    onClick: function onClick() {
      return setSellPageState(ProfilePageStateType.VIEWING);
    }
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    lineHeight: "20px",
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "/7Thkl",
    message: "My NFTs"
  }))), /*#__PURE__*/React__default.createElement(ListingHeaderRow, null, /*#__PURE__*/React__default.createElement(TitleWrapper, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EjWd3p",
    message: "Sell NFTs"
  })), /*#__PURE__*/React__default.createElement(ButtonsWrapper, null, /*#__PURE__*/React__default.createElement(SelectMarketplacesDropdown, {
    setSelectedMarkets: setSelectedMarkets,
    selectedMarkets: selectedMarkets
  }), /*#__PURE__*/React__default.createElement(SetDurationModal, null)))), /*#__PURE__*/React__default.createElement(GridWrapper, null, /*#__PURE__*/React__default.createElement(NFTListingsGrid, {
    selectedMarkets: selectedMarkets
  }))), /*#__PURE__*/React__default.createElement(FloatingConfirmationBar, {
    issues: !!issues
  }, BannerText, /*#__PURE__*/React__default.createElement(ProceedsAndButtonWrapper, null, /*#__PURE__*/React__default.createElement(ProceedsWrapper, null, /*#__PURE__*/React__default.createElement(EthValueWrapper, {
    totalEthListingValue: !!totalEthListingValue
  }, totalEthListingValue > 0 ? formatEth(totalEthListingValue) : "-", " ", "ETH"), !!usdcValue && /*#__PURE__*/React__default.createElement(UsdValue, null, usdcAmount)), /*#__PURE__*/React__default.createElement(ListingButton, {
    onClick: showModalAndStartListing
  }))), /*#__PURE__*/React__default.createElement(Overlay, null), showListModal && /*#__PURE__*/React__default.createElement(ListModal, {
    overlayClick: toggleShowListModal
  }));
};

export { ListPage };
