import React__default, { useMemo, useReducer, useEffect, useCallback } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceModalName, NFTEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { Trace, sendAnalyticsEvent } from '../../../../../analytics/index.js';
import { useStablecoinValue } from '../../../../../hooks/useStablecoinPrice.js';
import useNativeCurrency from '../../../../../lib/hooks/useNativeCurrency.js';
import tryParseCurrencyAmount from '../../../../../lib/utils/tryParseCurrencyAmount.js';
import { Portal } from '../../../common/Portal.js';
import { Overlay } from '../../../modals/Overlay.js';
import { getTotalEthValue, signListingRow } from '../utils.js';
import '../../../../hooks/useBag.js';
import '../../../../hooks/useCollectionFilters.js';
import '../../../../hooks/useFiltersExpanded.js';
import '../../../../hooks/useIsCollectionLoading.js';
import '../../../../../hooks/useScreenSize.js';
import { useNFTList } from '../../../../hooks/useNFTList.js';
import '../../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../../hooks/useSellAsset.js';
import '../../../../hooks/useSendTransaction.js';
import '../../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../../hooks/useUSDPrice.js';
import '../../../../../lib/hooks/useCurrencyBalance.js';
import '../../../../hooks/useWalletCollections.js';
import { ListingStatus } from '../../../../types/sell/index.js';
import { X } from 'react-feather';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../../theme/index.js';
import '../../../../../theme/components/index.js';
import { Z_INDEX } from '../../../../../theme/zIndex.js';
import { useFormatter, NumberType } from '../../../../../utils/formatNumbers.js';
import { TitleRow } from '../shared.js';
import { Section, ListModalSection } from './ListModalSection.js';
import { SuccessScreen } from './SuccessScreen.js';
import { ThemedText } from '../../../../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ListModalWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 420px;\n  z-index: ", ";\n  background: ", ";\n  border-radius: 20px;\n  border: 1px solid ", ";\n  box-shadow: ", ";\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n\n  @media screen and (max-width: ", "px) {\n    width: 100%;\n    height: 100%;\n  }\n"])), Z_INDEX.modal, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_deepShadow;
}, BREAKPOINTS.sm);
var ListModal = function ListModal(_ref4) {
  var overlayClick = _ref4.overlayClick;
  var _useWeb3React = useWeb3React(),
    provider = _useWeb3React.provider,
    chainId = _useWeb3React.chainId;
  var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
  var trace = useTrace({
    modal: InterfaceModalName.NFT_LISTING
  });
  var _useFormatter = useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useNFTList = useNFTList(function (_ref5) {
      var setListingStatusAndCallback = _ref5.setListingStatusAndCallback,
        setLooksRareNonce = _ref5.setLooksRareNonce,
        getLooksRareNonce = _ref5.getLooksRareNonce,
        collectionsRequiringApproval = _ref5.collectionsRequiringApproval,
        listings = _ref5.listings;
      return {
        setListingStatusAndCallback: setListingStatusAndCallback,
        setLooksRareNonce: setLooksRareNonce,
        getLooksRareNonce: getLooksRareNonce,
        collectionsRequiringApproval: collectionsRequiringApproval,
        listings: listings
      };
    }),
    setListingStatusAndCallback = _useNFTList.setListingStatusAndCallback,
    setLooksRareNonce = _useNFTList.setLooksRareNonce,
    getLooksRareNonce = _useNFTList.getLooksRareNonce,
    collectionsRequiringApproval = _useNFTList.collectionsRequiringApproval,
    listings = _useNFTList.listings;
  var totalEthListingValue = useMemo(function () {
    return getTotalEthValue(sellAssets);
  }, [sellAssets]);
  var _useReducer = useReducer(function (s) {
      return s === Section.APPROVE ? Section.SIGN : Section.APPROVE;
    }, Section.APPROVE),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    openSection = _useReducer2[0],
    toggleOpenSection = _useReducer2[1];
  var nativeCurrency = useNativeCurrency(chainId);
  var parsedAmount = tryParseCurrencyAmount(totalEthListingValue.toString(), nativeCurrency);
  var usdcValue = useStablecoinValue(parsedAmount);
  var usdcAmount = formatCurrencyAmount({
    amount: usdcValue,
    type: NumberType.FiatTokenPrice
  });
  var allCollectionsApproved = useMemo(function () {
    return collectionsRequiringApproval.every(function (collection) {
      return collection.status === ListingStatus.APPROVED;
    });
  }, [collectionsRequiringApproval]);
  var allListingsApproved = useMemo(function () {
    return listings.every(function (listing) {
      return listing.status === ListingStatus.APPROVED;
    });
  }, [listings]);
  var signListings = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _iterator, _step, listing;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(!signer || !provider)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            // sign listings
            _iterator = _createForOfIteratorHelper(listings);
            _context.prev = 3;
            _iterator.s();
          case 5:
            if ((_step = _iterator.n()).done) {
              _context.next = 11;
              break;
            }
            listing = _step.value;
            _context.next = 9;
            return signListingRow(listing, signer, provider, getLooksRareNonce, setLooksRareNonce, setListingStatusAndCallback);
          case 9:
            _context.next = 5;
            break;
          case 11:
            _context.next = 16;
            break;
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            _iterator.e(_context.t0);
          case 16:
            _context.prev = 16;
            _iterator.f();
            return _context.finish(16);
          case 19:
            sendAnalyticsEvent(NFTEventName.NFT_LISTING_COMPLETED, _objectSpread({
              signatures_approved: listings.filter(function (asset) {
                return asset.status === ListingStatus.APPROVED;
              }),
              list_quantity: listings.length,
              usd_value: usdcAmount
            }, trace));
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 13, 16, 19]]);
    }));
    return function signListings() {
      return _ref6.apply(this, arguments);
    };
  }();

  // Once all collections have been approved, go to next section and start signing listings
  useEffect(function () {
    if (allCollectionsApproved) {
      signListings();
      openSection === Section.APPROVE && toggleOpenSection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCollectionsApproved]);
  var closeModalOnClick = useCallback(function () {
    allListingsApproved ? window.location.reload() : overlayClick();
  }, [allListingsApproved, overlayClick]);

  // In the case that a user removes all listings via retry logic, close modal
  useEffect(function () {
    !listings.length && closeModalOnClick();
  }, [listings, closeModalOnClick]);
  return /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement(Trace, {
    modal: InterfaceModalName.NFT_LISTING
  }, /*#__PURE__*/React__default.createElement(ListModalWrapper, null, allListingsApproved ? /*#__PURE__*/React__default.createElement(SuccessScreen, {
    overlayClick: closeModalOnClick
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(TitleRow, null, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    lineHeight: "28px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "k6Nkrt",
    message: "List NFTs"
  })), /*#__PURE__*/React__default.createElement(X, {
    size: 24,
    cursor: "pointer",
    onClick: closeModalOnClick
  })), /*#__PURE__*/React__default.createElement(ListModalSection, {
    sectionType: Section.APPROVE,
    active: openSection === Section.APPROVE,
    content: collectionsRequiringApproval,
    toggleSection: toggleOpenSection
  }), /*#__PURE__*/React__default.createElement(ListModalSection, {
    sectionType: Section.SIGN,
    active: openSection === Section.SIGN,
    content: listings,
    toggleSection: toggleOpenSection
  })))), /*#__PURE__*/React__default.createElement(Overlay, {
    onClick: closeModalOnClick
  }));
};

export { ListModal };
