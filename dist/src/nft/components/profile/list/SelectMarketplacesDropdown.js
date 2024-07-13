import React__default, { useReducer, useMemo, useRef } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { SMALL_MEDIA_BREAKPOINT } from '../../../../components/Tokens/constants.js';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside.js';
import { Row, Column } from '../../Flex.js';
import { ChevronUpIcon } from '../../icons.js';
import { Checkbox } from '../../layout/Checkbox.js';
import { buttonTextMedium, caption } from '../../../css/common.css.js';
import { themeVars } from '../../../css/sprinkles.css.js';
import { getMarketplaceIcon } from '../../../utils/asset.js';
import '@ethersproject/units';
import 'video-extensions';
import '../../../../locales/en-US.js';
import 'numbro';
import '../../../utils/pooledAssets.js';
import '../../../utils/time.js';
import '@ethersproject/bignumber';
import { ListingMarkets } from '../../../utils/listNfts.js';
import styled from 'styled-components';
import '../../../../theme/components/index.js';
import { Z_INDEX } from '../../../../theme/zIndex.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var MarketplaceRowWrapper = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 6px;\n  height: 44px;\n  width: 100%;\n  cursor: pointer;\n  justify-content: space-between;\n  padding: 0px 16px;\n  &:hover {\n    background-color: ", ";\n  }\n  border-radius: 12px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var FeeText = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var MarketplaceRow = function MarketplaceRow(_ref3) {
  var market = _ref3.market,
    setSelectedMarkets = _ref3.setSelectedMarkets,
    selectedMarkets = _ref3.selectedMarkets;
  var isSelected = selectedMarkets.includes(market);
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    hovered = _useReducer2[0],
    toggleHovered = _useReducer2[1];
  var toggleSelected = function toggleSelected() {
    if (selectedMarkets.length === 1 && isSelected) return;
    isSelected ? setSelectedMarkets(selectedMarkets.filter(function (selected) {
      return selected !== market;
    })) : setSelectedMarkets([].concat(_toConsumableArray(selectedMarkets), [market]));
  };
  var handleCheckbox = function handleCheckbox(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  return /*#__PURE__*/React__default.createElement(MarketplaceRowWrapper, {
    onMouseEnter: toggleHovered,
    onMouseLeave: toggleHovered,
    onClick: toggleSelected
  }, /*#__PURE__*/React__default.createElement(Row, {
    gap: "12",
    onClick: toggleSelected
  }, getMarketplaceIcon(market.name, "24"), /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, market.name), /*#__PURE__*/React__default.createElement(FeeText, {
    className: caption
  }, market.fee, "% fee"))), /*#__PURE__*/React__default.createElement(Checkbox, {
    hovered: hovered,
    checked: isSelected,
    onClick: handleCheckbox
  }, /*#__PURE__*/React__default.createElement("span", null)));
};
var HeaderButtonWrap = styled(Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding: 12px;\n  border-radius: 12px;\n  width: 180px;\n  justify-content: space-between;\n  background: ", ";\n  cursor: pointer;\n  &:hover {\n    opacity: ", ";\n  }\n  @media screen and (min-width: ", ") {\n    width: 220px;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.opacity.hover;
}, SMALL_MEDIA_BREAKPOINT);
var HeaderButtonContentWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n"])));
var MarketIcon = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  height: 20px;\n  width: 20px;\n  margin-right: 8px;\n  outline: 1px solid ", ";\n  border-radius: 4px;\n  z-index: ", ";\n  margin-left: ", ";\n"])), function (_ref6) {
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
var Chevron = styled(ChevronUpIcon)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  height: 20px;\n  width: 20px;\n  fill: ", ";\n  transition: ", ";\n  transform: ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral1;
}, function (_ref10) {
  var duration = _ref10.theme.transition.duration;
  return "".concat(duration.fast, " transform");
}, function (_ref11) {
  var isOpen = _ref11.isOpen;
  return "rotate(".concat(isOpen ? 0 : 180, "deg)");
});
var ModalWrapper = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n"])));
var DropdownWrapper = styled(Column)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  padding: 16px 0px;\n  background-color: ", ";\n  display: ", ";\n  position: absolute;\n  top: 52px;\n  width: 100%;\n  border-radius: 12px;\n  gap: 12px;\n  z-index: ", ";\n  box-shadow: ", ";\n  border: 0.5px solid ", ";\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return theme.surface1;
}, function (_ref13) {
  var isOpen = _ref13.isOpen;
  return isOpen ? "flex" : "none";
}, Z_INDEX.modalBackdrop, function (_ref14) {
  var theme = _ref14.theme;
  return theme.deprecated_deepShadow;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.surface3;
});
var SelectMarketplacesDropdown = function SelectMarketplacesDropdown(_ref16) {
  var setSelectedMarkets = _ref16.setSelectedMarkets,
    selectedMarkets = _ref16.selectedMarkets;
  var _useReducer3 = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer4 = _slicedToArray(_useReducer3, 2),
    isOpen = _useReducer4[0],
    toggleIsOpen = _useReducer4[1];
  var dropdownDisplayText = useMemo(function () {
    return selectedMarkets.length === 1 ? selectedMarkets[0].name : "Multiple";
  }, [selectedMarkets]);
  var ref = useRef(null);
  useOnClickOutside(ref, function () {
    return isOpen && toggleIsOpen();
  });
  return /*#__PURE__*/React__default.createElement(ModalWrapper, {
    ref: ref
  }, /*#__PURE__*/React__default.createElement(HeaderButtonWrap, {
    className: buttonTextMedium,
    onClick: toggleIsOpen
  }, /*#__PURE__*/React__default.createElement(HeaderButtonContentWrapper, null, selectedMarkets.map(function (market, index) {
    return /*#__PURE__*/React__default.createElement(MarketIcon, {
      key: index,
      totalSelected: selectedMarkets.length,
      index: index
    }, getMarketplaceIcon(market.name, "20"));
  }), dropdownDisplayText), /*#__PURE__*/React__default.createElement(Chevron, {
    isOpen: isOpen,
    secondaryColor: themeVars.colors.neutral1
  })), /*#__PURE__*/React__default.createElement(DropdownWrapper, {
    isOpen: isOpen
  }, ListingMarkets.map(function (market) {
    return MarketplaceRow({
      market: market,
      setSelectedMarkets: setSelectedMarkets,
      selectedMarkets: selectedMarkets
    });
  })));
};

export { SelectMarketplacesDropdown };
