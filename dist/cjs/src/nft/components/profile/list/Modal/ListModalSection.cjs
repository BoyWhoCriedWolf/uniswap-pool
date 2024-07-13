'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../../../../node_modules/@lingui/react/dist/index.cjs');
var index$1 = require('../../../../../components/Column/index.cjs');
var index$2 = require('../../../../../components/Common/index.cjs');
var index = require('../../../../../components/Row/index.cjs');
var index$5 = require('../../../../../components/Tooltip/index.cjs');
var icons = require('../../../icons.cjs');
require('../../../../hooks/useBag.cjs');
require('../../../../hooks/useCollectionFilters.cjs');
require('../../../../hooks/useFiltersExpanded.cjs');
require('../../../../hooks/useIsCollectionLoading.cjs');
require('../../../../../hooks/useScreenSize.cjs');
require('../../../../hooks/useNFTList.cjs');
require('../../../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../../../hooks/useSellAsset.cjs');
require('../../../../hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../../hooks/useUSDPrice.cjs');
require('../../../../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../../hooks/useWalletCollections.cjs');
var index$3 = require('../../../../types/sell/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var colors = require('../../../../../theme/colors.cjs');
require('../../../../../theme/components/index.cjs');
var styles = require('../../../../../theme/styles.cjs');
var ContentRow = require('./ContentRow.cjs');
var text = require('../../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var SectionHeader = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n"])));
var SectionTitle = styled__default["default"](text.ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  line-height: 24px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme,
    active = _ref.active,
    approved = _ref.approved;
  return approved ? theme.success : active ? theme.neutral1 : theme.neutral2;
});
var SectionArrow = styled__default["default"](icons.ChevronUpIcon)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  transition: ", "ms;\n  transform: rotate(", "deg);\n"])), styles.TRANSITION_DURATIONS.medium, function (_ref2) {
  var active = _ref2.active;
  return active ? 0 : 180;
});
var SectionBody = styled__default["default"](index$1.Column)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border-left: 1.5px solid ", ";\n  margin-top: 4px;\n  margin-left: 7px;\n  padding-top: 4px;\n  padding-left: 20px;\n  max-height: 394px;\n  overflow-y: auto;\n  ", "\n"])), colors.colors.gray650, index$2.ScrollBarStyles);
var StyledInfoIcon = styled__default["default"](reactFeather.Info)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 16px;\n  margin-left: 4px;\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var ContentRowContainer = styled__default["default"](index$1.Column)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  gap: 8px;\n  scroll-behavior: smooth;\n"])));
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
  var theme = styled.useTheme();
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var removeAssetMarketplace = useSellAsset.useSellAsset(function (state) {
    return state.removeAssetMarketplace;
  });
  var allContentApproved = React.useMemo(function () {
    return !content.some(function (row) {
      return row.status !== index$3.ListingStatus.APPROVED;
    });
  }, [content]);
  var isCollectionApprovalSection = sectionType === Section.APPROVE;
  var uniqueCollections = React.useMemo(function () {
    if (isCollectionApprovalSection) {
      var collections = content.map(function (collection) {
        return collection.collectionAddress;
      });
      var _uniqueCollections = _toConsumableArray__default["default"](new Set(collections));
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
  return /*#__PURE__*/React__default["default"].createElement(index$1.Column, null, /*#__PURE__*/React__default["default"].createElement(SectionHeader, null, /*#__PURE__*/React__default["default"].createElement(index["default"], null, active || allContentApproved ? /*#__PURE__*/React__default["default"].createElement(icons.ListingModalWindowActive, {
    fill: allContentApproved ? theme.success : theme.accent1
  }) : /*#__PURE__*/React__default["default"].createElement(icons.ListingModalWindowClosed, null), /*#__PURE__*/React__default["default"].createElement(SectionTitle, {
    active: active,
    marginLeft: "12px",
    approved: allContentApproved
  }, isCollectionApprovalSection ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "Z7ZXbT",
    message: "Approve"
  }), "\xA0", /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "8KNiOP",
    message: "{0, plural, =1 {collection} other {collections}}",
    values: {
      "0": uniqueCollections !== null && uniqueCollections !== void 0 ? uniqueCollections : 1
    }
  })) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "c+Fnce",
    message: "Sign"
  }), " \xA0", content.length, "\xA0", " ", /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "OOoi9e",
    message: "{0, plural, =1 {listing} other {listings}}",
    values: {
      "0": content.length
    }
  })))), /*#__PURE__*/React__default["default"].createElement(SectionArrow, {
    active: active,
    secondaryColor: active ? theme.neutral1 : theme.neutral2,
    onClick: toggleSection
  })), active && /*#__PURE__*/React__default["default"].createElement(SectionBody, null, isCollectionApprovalSection && /*#__PURE__*/React__default["default"].createElement(index["default"], {
    height: "16px",
    marginBottom: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    lineHeight: "16px",
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "CSw5a/",
    message: "Why is a transaction required?"
  })), /*#__PURE__*/React__default["default"].createElement(index$5.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
      id: "VsETB7",
      message: "Listing an NFT requires a one-time marketplace approval for each NFT collection."
    })
  }, /*#__PURE__*/React__default["default"].createElement(StyledInfoIcon, null))), /*#__PURE__*/React__default["default"].createElement(ContentRowContainer, null, content.map(function (row) {
    var _row$name;
    return /*#__PURE__*/React__default["default"].createElement(ContentRow.ContentRow, {
      row: row,
      key: (_row$name = row === null || row === void 0 ? void 0 : row.name) !== null && _row$name !== void 0 ? _row$name : row.marketplace.name,
      removeRow: removeRow,
      isCollectionApprovalSection: isCollectionApprovalSection
    });
  }))));
};

exports.ListModalSection = ListModalSection;
exports.Section = Section;
