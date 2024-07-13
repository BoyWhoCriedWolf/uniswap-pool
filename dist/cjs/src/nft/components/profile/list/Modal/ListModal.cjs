'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$3 = require('../../../../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$2 = require('../../../../../analytics/index.cjs');
var useStablecoinPrice = require('../../../../../hooks/useStablecoinPrice.cjs');
var useNativeCurrency = require('../../../../../lib/hooks/useNativeCurrency.cjs');
var tryParseCurrencyAmount = require('../../../../../lib/utils/tryParseCurrencyAmount.cjs');
var Portal = require('../../../common/Portal.cjs');
var Overlay = require('../../../modals/Overlay.cjs');
var utils = require('../utils.cjs');
require('../../../../hooks/useBag.cjs');
require('../../../../hooks/useCollectionFilters.cjs');
require('../../../../hooks/useFiltersExpanded.cjs');
require('../../../../hooks/useIsCollectionLoading.cjs');
require('../../../../../hooks/useScreenSize.cjs');
var useNFTList = require('../../../../hooks/useNFTList.cjs');
require('../../../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../../../hooks/useSellAsset.cjs');
require('../../../../hooks/useSendTransaction.cjs');
require('../../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../../hooks/useUSDPrice.cjs');
require('../../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../../hooks/useWalletCollections.cjs');
var index$1 = require('../../../../types/sell/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index = require('../../../../../theme/index.cjs');
require('../../../../../theme/components/index.cjs');
var zIndex = require('../../../../../theme/zIndex.cjs');
var formatNumbers = require('../../../../../utils/formatNumbers.cjs');
var shared = require('../shared.cjs');
var ListModalSection = require('./ListModalSection.cjs');
var SuccessScreen = require('./SuccessScreen.cjs');
var text = require('../../../../../theme/components/text.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ListModalWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 420px;\n  z-index: ", ";\n  background: ", ";\n  border-radius: 20px;\n  border: 1px solid ", ";\n  box-shadow: ", ";\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n\n  @media screen and (max-width: ", "px) {\n    width: 100%;\n    height: 100%;\n  }\n"])), zIndex.Z_INDEX.modal, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_deepShadow;
}, index.BREAKPOINTS.sm);
var ListModal = function ListModal(_ref4) {
  var overlayClick = _ref4.overlayClick;
  var _useWeb3React = core.useWeb3React(),
    provider = _useWeb3React.provider,
    chainId = _useWeb3React.chainId;
  var signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
  var trace = analytics.useTrace({
    modal: analyticsEvents.InterfaceModalName.NFT_LISTING
  });
  var _useFormatter = formatNumbers.useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useNFTList = useNFTList.useNFTList(function (_ref5) {
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
  var totalEthListingValue = React.useMemo(function () {
    return utils.getTotalEthValue(sellAssets);
  }, [sellAssets]);
  var _useReducer = React.useReducer(function (s) {
      return s === ListModalSection.Section.APPROVE ? ListModalSection.Section.SIGN : ListModalSection.Section.APPROVE;
    }, ListModalSection.Section.APPROVE),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    openSection = _useReducer2[0],
    toggleOpenSection = _useReducer2[1];
  var nativeCurrency = useNativeCurrency(chainId);
  var parsedAmount = tryParseCurrencyAmount(totalEthListingValue.toString(), nativeCurrency);
  var usdcValue = useStablecoinPrice.useStablecoinValue(parsedAmount);
  var usdcAmount = formatCurrencyAmount({
    amount: usdcValue,
    type: formatNumbers.NumberType.FiatTokenPrice
  });
  var allCollectionsApproved = React.useMemo(function () {
    return collectionsRequiringApproval.every(function (collection) {
      return collection.status === index$1.ListingStatus.APPROVED;
    });
  }, [collectionsRequiringApproval]);
  var allListingsApproved = React.useMemo(function () {
    return listings.every(function (listing) {
      return listing.status === index$1.ListingStatus.APPROVED;
    });
  }, [listings]);
  var signListings = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _iterator, _step, listing;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
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
            return utils.signListingRow(listing, signer, provider, getLooksRareNonce, setLooksRareNonce, setListingStatusAndCallback);
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
            index$2.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_LISTING_COMPLETED, _objectSpread({
              signatures_approved: listings.filter(function (asset) {
                return asset.status === index$1.ListingStatus.APPROVED;
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
  React.useEffect(function () {
    if (allCollectionsApproved) {
      signListings();
      openSection === ListModalSection.Section.APPROVE && toggleOpenSection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCollectionsApproved]);
  var closeModalOnClick = React.useCallback(function () {
    allListingsApproved ? window.location.reload() : overlayClick();
  }, [allListingsApproved, overlayClick]);

  // In the case that a user removes all listings via retry logic, close modal
  React.useEffect(function () {
    !listings.length && closeModalOnClick();
  }, [listings, closeModalOnClick]);
  return /*#__PURE__*/React__default["default"].createElement(Portal.Portal, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trace, {
    modal: analyticsEvents.InterfaceModalName.NFT_LISTING
  }, /*#__PURE__*/React__default["default"].createElement(ListModalWrapper, null, allListingsApproved ? /*#__PURE__*/React__default["default"].createElement(SuccessScreen.SuccessScreen, {
    overlayClick: closeModalOnClick
  }) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(shared.TitleRow, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    lineHeight: "28px"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "k6Nkrt",
    message: "List NFTs"
  })), /*#__PURE__*/React__default["default"].createElement(reactFeather.X, {
    size: 24,
    cursor: "pointer",
    onClick: closeModalOnClick
  })), /*#__PURE__*/React__default["default"].createElement(ListModalSection.ListModalSection, {
    sectionType: ListModalSection.Section.APPROVE,
    active: openSection === ListModalSection.Section.APPROVE,
    content: collectionsRequiringApproval,
    toggleSection: toggleOpenSection
  }), /*#__PURE__*/React__default["default"].createElement(ListModalSection.ListModalSection, {
    sectionType: ListModalSection.Section.SIGN,
    active: openSection === ListModalSection.Section.SIGN,
    content: listings,
    toggleSection: toggleOpenSection
  })))), /*#__PURE__*/React__default["default"].createElement(Overlay.Overlay, {
    onClick: closeModalOnClick
  }));
};

exports.ListModal = ListModal;
