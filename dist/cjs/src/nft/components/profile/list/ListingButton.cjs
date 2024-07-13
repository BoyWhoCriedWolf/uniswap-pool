'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../../node_modules/@lingui/react/dist/index.cjs');
var index$3 = require('../../../../../node_modules/@lingui/core/dist/index.cjs');
var index = require('../../../../components/Button/index.cjs');
var BelowFloorWarningModal = require('./Modal/BelowFloorWarningModal.cjs');
require('../../../hooks/useBag.cjs');
require('../../../hooks/useCollectionFilters.cjs');
require('../../../hooks/useFiltersExpanded.cjs');
require('../../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../../hooks/useIsMobile.cjs');
require('../../../../hooks/useScreenSize.cjs');
require('../../../hooks/useNFTList.cjs');
require('../../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../../hooks/useSellAsset.cjs');
require('../../../hooks/useSendTransaction.cjs');
require('../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../hooks/useUSDPrice.cjs');
require('../../../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../hooks/useWalletCollections.cjs');
var styled = require('styled-components');
var index$1 = require('../../../../theme/index.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledListingButton = styled__default["default"](index.BaseButton)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background: ", ";\n  color: ", ";\n  font-weight: 535;\n  font-size: 20px;\n  line-height: 24px;\n  padding: 16px;\n  border-radius: 12px;\n  width: min-content;\n  border: none;\n  cursor: ", ";\n  opacity: ", ";\n\n  @media screen and (max-width: ", "px) {\n    font-size: 16px;\n    line-height: 20px;\n    padding: 10px 12px;\n  }\n"])), function (_ref) {
  var showResolveIssues = _ref.showResolveIssues,
    theme = _ref.theme;
  return showResolveIssues ? theme.critical : theme.accent1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_accentTextLightPrimary;
}, function (_ref3) {
  var missingPrices = _ref3.missingPrices;
  return missingPrices ? "auto" : "pointer";
}, function (_ref4) {
  var showResolveIssues = _ref4.showResolveIssues,
    missingPrices = _ref4.missingPrices;
  return !showResolveIssues && missingPrices && "0.3";
}, index$1.BREAKPOINTS.sm);
var ListingButton = function ListingButton(_ref5) {
  var onClick = _ref5.onClick;
  var _useSellAsset = useSellAsset.useSellAsset(function (_ref6) {
      var sellAssets = _ref6.sellAssets,
        showResolveIssues = _ref6.showResolveIssues,
        toggleShowResolveIssues = _ref6.toggleShowResolveIssues,
        issues = _ref6.issues,
        setIssues = _ref6.setIssues;
      return {
        sellAssets: sellAssets,
        showResolveIssues: showResolveIssues,
        toggleShowResolveIssues: toggleShowResolveIssues,
        issues: issues,
        setIssues: setIssues
      };
    }),
    sellAssets = _useSellAsset.sellAssets,
    showResolveIssues = _useSellAsset.showResolveIssues,
    toggleShowResolveIssues = _useSellAsset.toggleShowResolveIssues,
    issues = _useSellAsset.issues,
    setIssues = _useSellAsset.setIssues;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showWarning = _useState2[0],
    setShowWarning = _useState2[1];
  var isMobile = useIsMobile.useIsMobile();

  // Find issues with item listing data
  var _useMemo = React.useMemo(function () {
      var _findListingIssues = utils.findListingIssues(sellAssets),
        missingExpiration = _findListingIssues.missingExpiration,
        overMaxExpiration = _findListingIssues.overMaxExpiration,
        listingsMissingPrice = _findListingIssues.listingsMissingPrice,
        listingsBelowFloor = _findListingIssues.listingsBelowFloor,
        listingsAboveSellOrderFloor = _findListingIssues.listingsAboveSellOrderFloor;

      // set number of issues
      var foundIssues = Number(missingExpiration) + Number(overMaxExpiration) + listingsMissingPrice.length + listingsAboveSellOrderFloor.length;
      setIssues(foundIssues);
      !foundIssues && showResolveIssues && toggleShowResolveIssues();
      // Only show Resolve Issue text if there was a user submitted error (ie not when page loads with no prices set)
      if ((missingExpiration || overMaxExpiration || listingsAboveSellOrderFloor.length) && !showResolveIssues) toggleShowResolveIssues();
      return [listingsMissingPrice, listingsBelowFloor];
    }, [sellAssets, setIssues, showResolveIssues, toggleShowResolveIssues]),
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 2),
    listingsMissingPrice = _useMemo2[0],
    listingsBelowFloor = _useMemo2[1];
  var warningWrappedClick = function warningWrappedClick() {
    if (issues) !showResolveIssues && toggleShowResolveIssues();else if (listingsBelowFloor.length) setShowWarning(true);else onClick();
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(StyledListingButton, {
    onClick: warningWrappedClick,
    missingPrices: !!listingsMissingPrice.length,
    showResolveIssues: showResolveIssues
  }, showResolveIssues ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "KbR9EP",
    message: "{0, plural, =1 {Resolve issue} other {{1}}}",
    values: {
      "0": issues !== 1 ? 2 : 1,
      "1": index$3.i18n._(
      /*i18n*/
      {
        id: "mTYnTI",
        message: "Resolve {issues} issues",
        values: {
          issues: issues
        }
      })
    }
  }) : listingsMissingPrice.length && !isMobile ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "FULt6J",
    message: "Set prices to continue"
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "HmkXCG",
    message: "Start listing"
  })), showWarning && /*#__PURE__*/React__default["default"].createElement(BelowFloorWarningModal.BelowFloorWarningModal, {
    listingsBelowFloor: listingsBelowFloor,
    closeModal: function closeModal() {
      return setShowWarning(false);
    },
    startListing: onClick
  }));
};

exports.ListingButton = ListingButton;
