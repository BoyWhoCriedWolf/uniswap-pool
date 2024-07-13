import React__default, { useMemo } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../../../../../components/Column/index.js';
import { ScrollBarStyles } from '../../../../../components/Common/index.js';
import Row from '../../../../../components/Row/index.js';
import { MouseoverTooltip } from '../../../../../components/Tooltip/index.js';
import { ChevronUpIcon, ListingModalWindowActive, ListingModalWindowClosed } from '../../../icons.js';
import '../../../../hooks/useBag.js';
import '../../../../hooks/useCollectionFilters.js';
import '../../../../hooks/useFiltersExpanded.js';
import '../../../../hooks/useIsCollectionLoading.js';
import '../../../../../hooks/useScreenSize.js';
import '../../../../hooks/useNFTList.js';
import '../../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../../hooks/useSellAsset.js';
import '../../../../hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../../hooks/useUSDPrice.js';
import '../../../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../../../lib/hooks/useCurrencyBalance.js';
import '../../../../hooks/useWalletCollections.js';
import { ListingStatus } from '../../../../types/sell/index.js';
import { Info } from 'react-feather';
import styled, { useTheme } from 'styled-components';
import { colors } from '../../../../../theme/colors.js';
import '../../../../../theme/components/index.js';
import { TRANSITION_DURATIONS } from '../../../../../theme/styles.js';
import { ContentRow } from './ContentRow.js';
import { ThemedText } from '../../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var SectionHeader = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  justify-content: space-between;\n"])));
var SectionTitle = styled(ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  line-height: 24px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme,
    active = _ref.active,
    approved = _ref.approved;
  return approved ? theme.success : active ? theme.neutral1 : theme.neutral2;
});
var SectionArrow = styled(ChevronUpIcon)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  transition: ", "ms;\n  transform: rotate(", "deg);\n"])), TRANSITION_DURATIONS.medium, function (_ref2) {
  var active = _ref2.active;
  return active ? 0 : 180;
});
var SectionBody = styled(Column)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-left: 1.5px solid ", ";\n  margin-top: 4px;\n  margin-left: 7px;\n  padding-top: 4px;\n  padding-left: 20px;\n  max-height: 394px;\n  overflow-y: auto;\n  ", "\n"])), colors.gray650, ScrollBarStyles);
var StyledInfoIcon = styled(Info)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  margin-left: 4px;\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var ContentRowContainer = styled(Column)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  gap: 8px;\n  scroll-behavior: smooth;\n"])));
var Section = /*#__PURE__*/function (Section) {
  Section[Section["APPROVE"] = 0] = "APPROVE";
  Section[Section["SIGN"] = 1] = "SIGN";
  return Section;
}({});
var ListModalSection = function ListModalSection(_ref4) {
  var sectionType = _ref4.sectionType,
    active = _ref4.active,
    content = _ref4.content,
    toggleSection = _ref4.toggleSection;
  var theme = useTheme();
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var removeAssetMarketplace = useSellAsset(function (state) {
    return state.removeAssetMarketplace;
  });
  var allContentApproved = useMemo(function () {
    return !content.some(function (row) {
      return row.status !== ListingStatus.APPROVED;
    });
  }, [content]);
  var isCollectionApprovalSection = sectionType === Section.APPROVE;
  var uniqueCollections = useMemo(function () {
    if (isCollectionApprovalSection) {
      var collections = content.map(function (collection) {
        return collection.collectionAddress;
      });
      var _uniqueCollections = _toConsumableArray(new Set(collections));
      return _uniqueCollections.length;
    }
    return undefined;
  }, [content, isCollectionApprovalSection]);
  var removeRow = function removeRow(row) {
    // collections
    if (isCollectionApprovalSection) {
      var collectionRow = row;
      var _iterator = _createForOfIteratorHelper(sellAssets),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var asset = _step.value;
          if (asset.asset_contract.address === collectionRow.collectionAddress) removeAssetMarketplace(asset, collectionRow.marketplace);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    // listings
    else {
      var listingRow = row;
      removeAssetMarketplace(listingRow.asset, listingRow.marketplace);
    }
  };
  return /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(SectionHeader, null, /*#__PURE__*/React__default.createElement(Row, null, active || allContentApproved ? /*#__PURE__*/React__default.createElement(ListingModalWindowActive, {
    fill: allContentApproved ? theme.success : theme.accent1
  }) : /*#__PURE__*/React__default.createElement(ListingModalWindowClosed, null), /*#__PURE__*/React__default.createElement(SectionTitle, {
    active: active,
    marginLeft: "12px",
    approved: allContentApproved
  }, isCollectionApprovalSection ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Z7ZXbT",
    message: "Approve"
  }), "\xA0", /*#__PURE__*/React__default.createElement(Trans, {
    id: "8KNiOP",
    message: "{0, plural, =1 {collection} other {collections}}",
    values: {
      "0": uniqueCollections !== null && uniqueCollections !== void 0 ? uniqueCollections : 1
    }
  })) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "c+Fnce",
    message: "Sign"
  }), " \xA0", content.length, "\xA0", " ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "OOoi9e",
    message: "{0, plural, =1 {listing} other {listings}}",
    values: {
      "0": content.length
    }
  })))), /*#__PURE__*/React__default.createElement(SectionArrow, {
    active: active,
    secondaryColor: active ? theme.neutral1 : theme.neutral2,
    onClick: toggleSection
  })), active && /*#__PURE__*/React__default.createElement(SectionBody, null, isCollectionApprovalSection && /*#__PURE__*/React__default.createElement(Row, {
    height: "16px",
    marginBottom: "16px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    lineHeight: "16px",
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "CSw5a/",
    message: "Why is a transaction required?"
  })), /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "VsETB7",
      message: "Listing an NFT requires a one-time marketplace approval for each NFT collection."
    })
  }, /*#__PURE__*/React__default.createElement(StyledInfoIcon, null))), /*#__PURE__*/React__default.createElement(ContentRowContainer, null, content.map(function (row) {
    var _row$name;
    return /*#__PURE__*/React__default.createElement(ContentRow, {
      row: row,
      key: (_row$name = row === null || row === void 0 ? void 0 : row.name) !== null && _row$name !== void 0 ? _row$name : row.marketplace.name,
      removeRow: removeRow,
      isCollectionApprovalSection: isCollectionApprovalSection
    });
  }))));
};

export { ListModalSection, Section };
