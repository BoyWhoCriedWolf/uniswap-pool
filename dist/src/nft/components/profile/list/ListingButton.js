import React__default, { useState, useMemo } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { BaseButton } from '../../../../components/Button/index.js';
import { BelowFloorWarningModal } from './Modal/BelowFloorWarningModal.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../../hooks/useIsMobile.js';
import '../../../../hooks/useScreenSize.js';
import '../../../hooks/useNFTList.js';
import '../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../theme/index.js';
import { findListingIssues } from './utils.js';

var _templateObject;
var StyledListingButton = styled(BaseButton)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n  font-weight: 535;\n  font-size: 20px;\n  line-height: 24px;\n  padding: 16px;\n  border-radius: 12px;\n  width: min-content;\n  border: none;\n  cursor: ", ";\n  opacity: ", ";\n\n  @media screen and (max-width: ", "px) {\n    font-size: 16px;\n    line-height: 20px;\n    padding: 10px 12px;\n  }\n"])), function (_ref) {
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
}, BREAKPOINTS.sm);
var ListingButton = function ListingButton(_ref5) {
  var onClick = _ref5.onClick;
  var _useSellAsset = useSellAsset(function (_ref6) {
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
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showWarning = _useState2[0],
    setShowWarning = _useState2[1];
  var isMobile = useIsMobile();

  // Find issues with item listing data
  var _useMemo = useMemo(function () {
      var _findListingIssues = findListingIssues(sellAssets),
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
    _useMemo2 = _slicedToArray(_useMemo, 2),
    listingsMissingPrice = _useMemo2[0],
    listingsBelowFloor = _useMemo2[1];
  var warningWrappedClick = function warningWrappedClick() {
    if (issues) !showResolveIssues && toggleShowResolveIssues();else if (listingsBelowFloor.length) setShowWarning(true);else onClick();
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(StyledListingButton, {
    onClick: warningWrappedClick,
    missingPrices: !!listingsMissingPrice.length,
    showResolveIssues: showResolveIssues
  }, showResolveIssues ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "KbR9EP",
    message: "{0, plural, =1 {Resolve issue} other {{1}}}",
    values: {
      "0": issues !== 1 ? 2 : 1,
      "1": i18n._(
      /*i18n*/
      {
        id: "mTYnTI",
        message: "Resolve {issues} issues",
        values: {
          issues: issues
        }
      })
    }
  }) : listingsMissingPrice.length && !isMobile ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "FULt6J",
    message: "Set prices to continue"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "HmkXCG",
    message: "Start listing"
  })), showWarning && /*#__PURE__*/React__default.createElement(BelowFloorWarningModal, {
    listingsBelowFloor: listingsBelowFloor,
    closeModal: function closeModal() {
      return setShowWarning(false);
    },
    startListing: onClick
  }));
};

export { ListingButton };
