'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../../node_modules/@lingui/react/dist/index.cjs');
var index$2 = require('../../../../components/Column/index.cjs');
var index$1 = require('../../../../components/Row/index.cjs');
var useOnClickOutside = require('../../../../hooks/useOnClickOutside.cjs');
require('../../../hooks/useBag.cjs');
require('../../../hooks/useCollectionFilters.cjs');
require('../../../hooks/useFiltersExpanded.cjs');
require('../../../hooks/useIsCollectionLoading.cjs');
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
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index = require('../../../../theme/index.cjs');
var Dropdown = require('./Dropdown.cjs');
var NFTListRow = require('./NFTListRow.cjs');
var shared = require('./shared.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
var TableHeader = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  position: sticky;\n  align-items: center;\n  top: 72px;\n  padding-top: 24px;\n  padding-bottom: 24px;\n  z-index: 3;\n  background-color: ", ";\n  color: ", ";\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 20px;\n  border-radius: 12px;\n\n  @media screen and (min-width: ", "px) {\n    padding-left: 48px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
}, index.BREAKPOINTS.sm);
var NFTHeader = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  flex: 2;\n\n  @media screen and (min-width: ", "px) {\n    flex: 1.5;\n  }\n"])), index.BREAKPOINTS.md);
var PriceHeaders = styled__default["default"](index$1["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  flex: 1.5;\n  margin-right: 12px;\n\n  @media screen and (min-width: ", "px) {\n    flex: 3;\n  }\n"])), index.BREAKPOINTS.md);
var LastPriceHeader = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index.BREAKPOINTS.lg);
var FloorPriceHeader = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  display: none;\n  flex: 1;\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index.BREAKPOINTS.md);
var DropdownAndHeaderWrapper = styled__default["default"](index$1["default"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  flex: 2;\n  gap: 4px;\n"])));
var DropdownPromptContainer = styled__default["default"](index$2.Column)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  @media screen and (max-width: ", "px) {\n    display: none;\n  }\n"])), index.BREAKPOINTS.sm);
var DropdownPrompt = styled__default["default"](index$1["default"])(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  gap: 4px;\n  background-color: ", ";\n  cursor: pointer;\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 16px;\n  border-radius: 4px;\n  padding: 2px 6px;\n  width: min-content;\n  white-space: nowrap;\n  color: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.opacity.hover;
});
var DropdownChevron = styled__default["default"](reactFeather.ChevronDown)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 16px;\n  color: ", ";\n  transform: ", ";\n  transition: ", ";\n"])), function (_ref6) {
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
var DropdownContainer = styled__default["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  top: 36px;\n  right: 0px;\n"])));
var FeeUserReceivesSharedStyles = styled.css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  display: none;\n  justify-content: flex-end;\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), index.BREAKPOINTS.md);
var FeeHeader = styled__default["default"].div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  flex: 1;\n  ", "\n"])), FeeUserReceivesSharedStyles);
var UserReceivesHeader = styled__default["default"].div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  flex: 1.5;\n  ", "\n"])), FeeUserReceivesSharedStyles);
var RowDivider = styled__default["default"].hr(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  height: 0px;\n  width: 100%;\n  border-radius: 20px;\n  border-width: 0.5px;\n  border-style: solid;\n  margin: 0;\n  border-color: ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.surface3;
});
var NFTListingsGrid = function NFTListingsGrid(_ref10) {
  var selectedMarkets = _ref10.selectedMarkets;
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useState = React.useState(shared.SetPriceMethod.CUSTOM),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    globalPriceMethod = _useState2[0],
    setGlobalPriceMethod = _useState2[1];
  var _useState3 = React.useState(),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    globalPrice = _useState4[0],
    setGlobalPrice = _useState4[1];
  var _useReducer = React.useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    showDropdown = _useReducer2[0],
    toggleShowDropdown = _useReducer2[1];
  var dropdownRef = React.useRef(null);
  useOnClickOutside.useOnClickOutside(dropdownRef, showDropdown ? toggleShowDropdown : undefined);
  var priceDropdownOptions = React.useMemo(function () {
    return [{
      displayText: "Custom",
      isSelected: globalPriceMethod === shared.SetPriceMethod.CUSTOM,
      onClick: function onClick() {
        setGlobalPriceMethod(shared.SetPriceMethod.CUSTOM);
        toggleShowDropdown();
      }
    }, {
      displayText: "Floor price",
      isSelected: globalPriceMethod === shared.SetPriceMethod.FLOOR_PRICE,
      onClick: function onClick() {
        setGlobalPriceMethod(shared.SetPriceMethod.FLOOR_PRICE);
        toggleShowDropdown();
      }
    }, {
      displayText: "Last price",
      isSelected: globalPriceMethod === shared.SetPriceMethod.LAST_PRICE,
      onClick: function onClick() {
        setGlobalPriceMethod(shared.SetPriceMethod.LAST_PRICE);
        toggleShowDropdown();
      }
    }, {
      displayText: "Same price",
      isSelected: globalPriceMethod === shared.SetPriceMethod.SAME_PRICE,
      onClick: function onClick() {
        setGlobalPriceMethod(shared.SetPriceMethod.SAME_PRICE);
        toggleShowDropdown();
      }
    }];
  }, [globalPriceMethod]);
  var prompt;
  switch (globalPriceMethod) {
    case shared.SetPriceMethod.CUSTOM:
      prompt = /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
        id: "8Tg/JR",
        message: "Custom"
      });
      break;
    case shared.SetPriceMethod.FLOOR_PRICE:
      prompt = /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
        id: "IX1M/E",
        message: "Floor price"
      });
      break;
    case shared.SetPriceMethod.LAST_PRICE:
      prompt = /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
        id: "HoGOsT",
        message: "Last price"
      });
      break;
    case shared.SetPriceMethod.SAME_PRICE:
      prompt = /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
        id: "uK2Qlr",
        message: "Same price"
      });
      break;
  }
  return /*#__PURE__*/React__default["default"].createElement(index$2.Column, null, /*#__PURE__*/React__default["default"].createElement(TableHeader, null, /*#__PURE__*/React__default["default"].createElement(NFTHeader, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "zJlXbX",
    message: "NFT"
  })), /*#__PURE__*/React__default["default"].createElement(PriceHeaders, null, /*#__PURE__*/React__default["default"].createElement(FloorPriceHeader, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "WEXsZg",
    message: "Floor"
  })), /*#__PURE__*/React__default["default"].createElement(LastPriceHeader, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "RtKKbA",
    message: "Last"
  })), /*#__PURE__*/React__default["default"].createElement(DropdownAndHeaderWrapper, {
    ref: dropdownRef
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "a7u1N9",
    message: "Price"
  }), /*#__PURE__*/React__default["default"].createElement(DropdownPromptContainer, null, /*#__PURE__*/React__default["default"].createElement(DropdownPrompt, {
    onClick: toggleShowDropdown
  }, prompt, " ", /*#__PURE__*/React__default["default"].createElement(DropdownChevron, {
    isOpen: showDropdown
  })), showDropdown && /*#__PURE__*/React__default["default"].createElement(DropdownContainer, null, /*#__PURE__*/React__default["default"].createElement(Dropdown.Dropdown, {
    dropDownOptions: priceDropdownOptions,
    width: 200
  })))), /*#__PURE__*/React__default["default"].createElement(FeeHeader, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "/mfICu",
    message: "Fees"
  })), /*#__PURE__*/React__default["default"].createElement(UserReceivesHeader, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "88cUW+",
    message: "You receive"
  })))), sellAssets.map(function (asset) {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(NFTListRow.NFTListRow, {
      asset: asset,
      globalPriceMethod: globalPriceMethod,
      globalPrice: globalPrice,
      setGlobalPrice: setGlobalPrice,
      selectedMarkets: selectedMarkets
    }), sellAssets.indexOf(asset) < sellAssets.length - 1 && /*#__PURE__*/React__default["default"].createElement(RowDivider, null));
  }));
};

exports.NFTListingsGrid = NFTListingsGrid;
