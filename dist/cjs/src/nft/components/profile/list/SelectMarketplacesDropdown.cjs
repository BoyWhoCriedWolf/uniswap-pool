'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var constants = require('../../../../components/Tokens/constants.cjs');
var useOnClickOutside = require('../../../../hooks/useOnClickOutside.cjs');
var Flex = require('../../Flex.cjs');
var icons = require('../../icons.cjs');
var Checkbox = require('../../layout/Checkbox.cjs');
var common_css = require('../../../css/common.css.cjs');
var sprinkles_css = require('../../../css/sprinkles.css.cjs');
var asset = require('../../../utils/asset.cjs');
require('@ethersproject/units');
require('video-extensions');
require('../../../../locales/en-US.cjs');
require('numbro');
require('../../../utils/pooledAssets.cjs');
require('../../../utils/time.cjs');
require('@ethersproject/bignumber');
var listNfts = require('../../../utils/listNfts.cjs');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var zIndex = require('../../../../theme/zIndex.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var MarketplaceRowWrapper = styled__default["default"](Flex.Row)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  gap: 6px;\n  height: 44px;\n  width: 100%;\n  cursor: pointer;\n  justify-content: space-between;\n  padding: 0px 16px;\n  &:hover {\n    background-color: ", ";\n  }\n  border-radius: 12px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var FeeText = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var MarketplaceRow = function MarketplaceRow(_ref3) {
  var market = _ref3.market,
    setSelectedMarkets = _ref3.setSelectedMarkets,
    selectedMarkets = _ref3.selectedMarkets;
  var isSelected = selectedMarkets.includes(market);
  var _useReducer = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    hovered = _useReducer2[0],
    toggleHovered = _useReducer2[1];
  var toggleSelected = function toggleSelected() {
    if (selectedMarkets.length === 1 && isSelected) return;
    isSelected ? setSelectedMarkets(selectedMarkets.filter(function (selected) {
      return selected !== market;
    })) : setSelectedMarkets([].concat(_toConsumableArray__default["default"](selectedMarkets), [market]));
  };
  var handleCheckbox = function handleCheckbox(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  return /*#__PURE__*/React__default["default"].createElement(MarketplaceRowWrapper, {
    onMouseEnter: toggleHovered,
    onMouseLeave: toggleHovered,
    onClick: toggleSelected
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    gap: "12",
    onClick: toggleSelected
  }, asset.getMarketplaceIcon(market.name, "24"), /*#__PURE__*/React__default["default"].createElement(Flex.Column, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, market.name), /*#__PURE__*/React__default["default"].createElement(FeeText, {
    className: common_css.caption
  }, market.fee, "% fee"))), /*#__PURE__*/React__default["default"].createElement(Checkbox.Checkbox, {
    hovered: hovered,
    checked: isSelected,
    onClick: handleCheckbox
  }, /*#__PURE__*/React__default["default"].createElement("span", null)));
};
var HeaderButtonWrap = styled__default["default"](Flex.Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  padding: 12px;\n  border-radius: 12px;\n  width: 180px;\n  justify-content: space-between;\n  background: ", ";\n  cursor: pointer;\n  &:hover {\n    opacity: ", ";\n  }\n  @media screen and (min-width: ", ") {\n    width: 220px;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.opacity.hover;
}, constants.SMALL_MEDIA_BREAKPOINT);
var HeaderButtonContentWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n"])));
var MarketIcon = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  height: 20px;\n  width: 20px;\n  margin-right: 8px;\n  outline: 1px solid ", ";\n  border-radius: 4px;\n  z-index: ", ";\n  margin-left: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
}, function (_ref7) {
  var index = _ref7.index,
    totalSelected = _ref7.totalSelected;
  return totalSelected - index;
}, function (_ref8) {
  var index = _ref8.index;
  return "".concat(index === 0 ? 0 : -18, "px");
});
var Chevron = styled__default["default"](icons.ChevronUpIcon)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  height: 20px;\n  width: 20px;\n  fill: ", ";\n  transition: ", ";\n  transform: ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral1;
}, function (_ref10) {
  var duration = _ref10.theme.transition.duration;
  return "".concat(duration.fast, " transform");
}, function (_ref11) {
  var isOpen = _ref11.isOpen;
  return "rotate(".concat(isOpen ? 0 : 180, "deg)");
});
var ModalWrapper = styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n"])));
var DropdownWrapper = styled__default["default"](Flex.Column)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  padding: 16px 0px;\n  background-color: ", ";\n  display: ", ";\n  position: absolute;\n  top: 52px;\n  width: 100%;\n  border-radius: 12px;\n  gap: 12px;\n  z-index: ", ";\n  box-shadow: ", ";\n  border: 0.5px solid ", ";\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return theme.surface1;
}, function (_ref13) {
  var isOpen = _ref13.isOpen;
  return isOpen ? "flex" : "none";
}, zIndex.Z_INDEX.modalBackdrop, function (_ref14) {
  var theme = _ref14.theme;
  return theme.deprecated_deepShadow;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.surface3;
});
var SelectMarketplacesDropdown = function SelectMarketplacesDropdown(_ref16) {
  var setSelectedMarkets = _ref16.setSelectedMarkets,
    selectedMarkets = _ref16.selectedMarkets;
  var _useReducer3 = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer4 = _slicedToArray__default["default"](_useReducer3, 2),
    isOpen = _useReducer4[0],
    toggleIsOpen = _useReducer4[1];
  var dropdownDisplayText = React.useMemo(function () {
    return selectedMarkets.length === 1 ? selectedMarkets[0].name : "Multiple";
  }, [selectedMarkets]);
  var ref = React.useRef(null);
  useOnClickOutside.useOnClickOutside(ref, function () {
    return isOpen && toggleIsOpen();
  });
  return /*#__PURE__*/React__default["default"].createElement(ModalWrapper, {
    ref: ref
  }, /*#__PURE__*/React__default["default"].createElement(HeaderButtonWrap, {
    className: common_css.buttonTextMedium,
    onClick: toggleIsOpen
  }, /*#__PURE__*/React__default["default"].createElement(HeaderButtonContentWrapper, null, selectedMarkets.map(function (market, index) {
    return /*#__PURE__*/React__default["default"].createElement(MarketIcon, {
      key: index,
      totalSelected: selectedMarkets.length,
      index: index
    }, asset.getMarketplaceIcon(market.name, "20"));
  }), dropdownDisplayText), /*#__PURE__*/React__default["default"].createElement(Chevron, {
    isOpen: isOpen,
    secondaryColor: sprinkles_css.themeVars.colors.neutral1
  })), /*#__PURE__*/React__default["default"].createElement(DropdownWrapper, {
    isOpen: isOpen
  }, listNfts.ListingMarkets.map(function (market) {
    return MarketplaceRow({
      market: market,
      setSelectedMarkets: setSelectedMarkets,
      selectedMarkets: selectedMarkets
    });
  })));
};

exports.SelectMarketplacesDropdown = SelectMarketplacesDropdown;
