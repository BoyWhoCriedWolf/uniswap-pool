import React__default, { useState, useReducer, useRef, useMemo } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
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
import { ChevronDown } from 'react-feather';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../../../theme/index.js';
import { Dropdown } from './Dropdown.js';
import { NFTListRow } from './NFTListRow.js';
import { SetPriceMethod } from './shared.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
var TableHeader = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  position: sticky;\n  align-items: center;\n  top: 72px;\n  padding-top: 24px;\n  padding-bottom: 24px;\n  z-index: 3;\n  background-color: ", ";\n  color: ", ";\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 20px;\n  border-radius: 12px;\n\n  @media screen and (min-width: ", "px) {\n    padding-left: 48px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
}, BREAKPOINTS.sm);
var NFTHeader = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex: 2;\n\n  @media screen and (min-width: ", "px) {\n    flex: 1.5;\n  }\n"])), BREAKPOINTS.md);
var PriceHeaders = styled(Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  flex: 1.5;\n  margin-right: 12px;\n\n  @media screen and (min-width: ", "px) {\n    flex: 3;\n  }\n"])), BREAKPOINTS.md);
var LastPriceHeader = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.lg);
var FloorPriceHeader = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.md);
var DropdownAndHeaderWrapper = styled(Row)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  flex: 2;\n  gap: 4px;\n"])));
var DropdownPromptContainer = styled(Column)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: relative;\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n"])), BREAKPOINTS.sm);
var DropdownPrompt = styled(Row)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  gap: 4px;\n  background-color: ", ";\n  cursor: pointer;\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 16px;\n  border-radius: 4px;\n  padding: 2px 6px;\n  width: min-content;\n  white-space: nowrap;\n  color: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.opacity.hover;
});
var DropdownChevron = styled(ChevronDown)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  color: ", ";\n  transform: ", ";\n  transition: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
}, function (_ref7) {
  var isOpen = _ref7.isOpen;
  return isOpen && "rotate(180deg)";
}, function (_ref8) {
  var _ref8$theme$transitio = _ref8.theme.transition,
    duration = _ref8$theme$transitio.duration,
    timing = _ref8$theme$transitio.timing;
  return "transform ".concat(duration.fast, " ").concat(timing.ease);
});
var DropdownContainer = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 36px;\n  right: 0px;\n"])));
var FeeUserReceivesSharedStyles = css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  display: none;\n  justify-content: flex-end;\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), BREAKPOINTS.md);
var FeeHeader = styled.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  flex: 1;\n  ", "\n"])), FeeUserReceivesSharedStyles);
var UserReceivesHeader = styled.div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  flex: 1.5;\n  ", "\n"])), FeeUserReceivesSharedStyles);
var RowDivider = styled.hr(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  height: 0px;\n  width: 100%;\n  border-radius: 20px;\n  border-width: 0.5px;\n  border-style: solid;\n  margin: 0;\n  border-color: ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.surface3;
});
var NFTListingsGrid = function NFTListingsGrid(_ref10) {
  var selectedMarkets = _ref10.selectedMarkets;
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useState = useState(SetPriceMethod.CUSTOM),
    _useState2 = _slicedToArray(_useState, 2),
    globalPriceMethod = _useState2[0],
    setGlobalPriceMethod = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    globalPrice = _useState4[0],
    setGlobalPrice = _useState4[1];
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    showDropdown = _useReducer2[0],
    toggleShowDropdown = _useReducer2[1];
  var dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, showDropdown ? toggleShowDropdown : undefined);
  var priceDropdownOptions = useMemo(function () {
    return [{
      displayText: "Custom",
      isSelected: globalPriceMethod === SetPriceMethod.CUSTOM,
      onClick: function onClick() {
        setGlobalPriceMethod(SetPriceMethod.CUSTOM);
        toggleShowDropdown();
      }
    }, {
      displayText: "Floor price",
      isSelected: globalPriceMethod === SetPriceMethod.FLOOR_PRICE,
      onClick: function onClick() {
        setGlobalPriceMethod(SetPriceMethod.FLOOR_PRICE);
        toggleShowDropdown();
      }
    }, {
      displayText: "Last price",
      isSelected: globalPriceMethod === SetPriceMethod.LAST_PRICE,
      onClick: function onClick() {
        setGlobalPriceMethod(SetPriceMethod.LAST_PRICE);
        toggleShowDropdown();
      }
    }, {
      displayText: "Same price",
      isSelected: globalPriceMethod === SetPriceMethod.SAME_PRICE,
      onClick: function onClick() {
        setGlobalPriceMethod(SetPriceMethod.SAME_PRICE);
        toggleShowDropdown();
      }
    }];
  }, [globalPriceMethod]);
  var prompt;
  switch (globalPriceMethod) {
    case SetPriceMethod.CUSTOM:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "8Tg/JR",
        message: "Custom"
      });
      break;
    case SetPriceMethod.FLOOR_PRICE:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "IX1M/E",
        message: "Floor price"
      });
      break;
    case SetPriceMethod.LAST_PRICE:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "HoGOsT",
        message: "Last price"
      });
      break;
    case SetPriceMethod.SAME_PRICE:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "uK2Qlr",
        message: "Same price"
      });
      break;
  }
  return /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(TableHeader, null, /*#__PURE__*/React__default.createElement(NFTHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "zJlXbX",
    message: "NFT"
  })), /*#__PURE__*/React__default.createElement(PriceHeaders, null, /*#__PURE__*/React__default.createElement(FloorPriceHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "WEXsZg",
    message: "Floor"
  })), /*#__PURE__*/React__default.createElement(LastPriceHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "RtKKbA",
    message: "Last"
  })), /*#__PURE__*/React__default.createElement(DropdownAndHeaderWrapper, {
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "a7u1N9",
    message: "Price"
  }), /*#__PURE__*/React__default.createElement(DropdownPromptContainer, null, /*#__PURE__*/React__default.createElement(DropdownPrompt, {
    onClick: toggleShowDropdown
  }, prompt, " ", /*#__PURE__*/React__default.createElement(DropdownChevron, {
    isOpen: showDropdown
  })), showDropdown && /*#__PURE__*/React__default.createElement(DropdownContainer, null, /*#__PURE__*/React__default.createElement(Dropdown, {
    dropDownOptions: priceDropdownOptions,
    width: 200
  })))), /*#__PURE__*/React__default.createElement(FeeHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "/mfICu",
    message: "Fees"
  })), /*#__PURE__*/React__default.createElement(UserReceivesHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "88cUW+",
    message: "You receive"
  })))), sellAssets.map(function (asset) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(NFTListRow, {
      asset: asset,
      globalPriceMethod: globalPriceMethod,
      globalPrice: globalPrice,
      setGlobalPrice: setGlobalPrice,
      selectedMarkets: selectedMarkets
    }), sellAssets.indexOf(asset) < sellAssets.length - 1 && /*#__PURE__*/React__default.createElement(RowDivider, null));
  }));
};

export { NFTListingsGrid };
