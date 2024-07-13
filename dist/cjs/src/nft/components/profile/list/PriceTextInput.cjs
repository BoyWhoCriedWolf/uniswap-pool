'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../../../components/Column/index.cjs');
var index$1 = require('../../../../components/Row/index.cjs');
var icons = require('../../icons.cjs');
var Input = require('../../layout/Input.cjs');
var utils = require('./utils.cjs');
var common_css = require('../../../css/common.css.cjs');
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
var currency = require('../../../utils/currency.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$2 = require('../../../../theme/index.cjs');
var colors = require('../../../../theme/colors.cjs');
var shared = require('./shared.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var PriceTextInputWrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  gap: 12px;\n  position: relative;\n"])));
var InputWrapper = styled__default["default"](index$1["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  height: 48px;\n  color: ", ";\n  padding: 12px;\n  border: 2px solid;\n  border-radius: 8px;\n  border-color: ", ";\n  margin-right: auto;\n  box-sizing: border-box;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral3;
}, function (_ref2) {
  var borderColor = _ref2.borderColor;
  return borderColor;
});
var CurrencyWrapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref3) {
  var listPrice = _ref3.listPrice,
    theme = _ref3.theme;
  return listPrice ? theme.neutral1 : theme.neutral2;
});
var GlobalPriceIcon = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  cursor: pointer;\n  position: absolute;\n  bottom: 32px;\n  right: -10px;\n  background-color: ", ";\n  border-radius: 50%;\n  height: 28px;\n  width: 28px;\n  align-items: center;\n  justify-content: center;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface1;
});
var WarningRow = styled__default["default"](index$1["default"])(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  gap: 4px;\n"])));
var WarningMessage = styled__default["default"](index$1["default"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  top: 52px;\n  width: max-content;\n  position: absolute;\n  right: 0;\n  font-weight: 535;\n  font-size: 10px;\n  line-height: 12px;\n  color: ", ";\n\n  @media screen and (min-width: ", "px) {\n    right: unset;\n  }\n"])), function (_ref5) {
  var $color = _ref5.$color;
  return $color;
}, index$2.BREAKPOINTS.md);
var WarningAction = styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  color: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.accent1;
});
var getWarningMessage = function getWarningMessage(warning) {
  var message = /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null);
  switch (warning) {
    case shared.WarningType.BELOW_FLOOR:
      message = /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
        id: "rKgBmD",
        message: "below floor price."
      });
      break;
    case shared.WarningType.ALREADY_LISTED:
      message = /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
        id: "VnmT/F",
        message: "Already listed at"
      });
      break;
  }
  return message;
};
var PriceTextInput = function PriceTextInput(_ref7) {
  var _asset$floorPrice, _asset$floor_sell_ord;
  var listPrice = _ref7.listPrice,
    setListPrice = _ref7.setListPrice,
    isGlobalPrice = _ref7.isGlobalPrice,
    setGlobalOverride = _ref7.setGlobalOverride,
    globalOverride = _ref7.globalOverride,
    asset = _ref7.asset;
  var _useState = React.useState(shared.WarningType.NONE),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    warningType = _useState2[0],
    setWarningType = _useState2[1];
  var removeSellAsset = useSellAsset.useSellAsset(function (state) {
    return state.removeSellAsset;
  });
  var showResolveIssues = useSellAsset.useSellAsset(function (state) {
    return state.showResolveIssues;
  });
  var inputRef = React.useRef();
  var theme = styled.useTheme();
  var percentBelowFloor = (1 - (listPrice !== null && listPrice !== void 0 ? listPrice : 0) / ((_asset$floorPrice = asset.floorPrice) !== null && _asset$floorPrice !== void 0 ? _asset$floorPrice : 0)) * 100;
  var warningColor = showResolveIssues && !listPrice || warningType === shared.WarningType.ALREADY_LISTED || warningType === shared.WarningType.BELOW_FLOOR && percentBelowFloor >= 20 ? colors.colors.red400 : warningType === shared.WarningType.BELOW_FLOOR ? theme.deprecated_accentWarning : isGlobalPrice || !!listPrice ? theme.accent1 : theme.neutral2;
  var setPrice = function setPrice(event) {
    if (!listPrice && event.target.value.includes(".") && parseFloat(event.target.value) === 0) {
      return;
    }
    var val = parseFloat(event.target.value);
    setListPrice(isNaN(val) ? undefined : val);
  };
  utils.useUpdateInputAndWarnings(setWarningType, inputRef, asset, listPrice);
  return /*#__PURE__*/React__default["default"].createElement(PriceTextInputWrapper, null, /*#__PURE__*/React__default["default"].createElement(InputWrapper, {
    borderColor: warningColor
  }, /*#__PURE__*/React__default["default"].createElement(Input.NumericInput, {
    as: "input",
    pattern: "[0-9]",
    borderStyle: "none",
    className: common_css.body,
    color: {
      placeholder: "neutral2",
      "default": "neutral1"
    },
    placeholder: "0",
    backgroundColor: "none",
    width: {
      sm: "54",
      md: "68"
    },
    ref: inputRef,
    onChange: setPrice
  }), /*#__PURE__*/React__default["default"].createElement(CurrencyWrapper, {
    listPrice: listPrice
  }, "\xA0ETH"), (isGlobalPrice || globalOverride) && /*#__PURE__*/React__default["default"].createElement(GlobalPriceIcon, {
    onClick: function onClick() {
      return setGlobalOverride(!globalOverride);
    }
  }, globalOverride ? /*#__PURE__*/React__default["default"].createElement(icons.BrokenLinkIcon, null) : /*#__PURE__*/React__default["default"].createElement(reactFeather.Link, {
    size: 20,
    color: warningColor
  }))), /*#__PURE__*/React__default["default"].createElement(WarningMessage, {
    $color: warningColor
  }, warningType !== shared.WarningType.NONE && /*#__PURE__*/React__default["default"].createElement(WarningRow, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    height: 16,
    width: 16,
    color: warningColor
  }), /*#__PURE__*/React__default["default"].createElement("span", null, warningType === shared.WarningType.BELOW_FLOOR && "".concat(percentBelowFloor.toFixed(0), "% "), getWarningMessage(warningType), "\xA0", warningType === shared.WarningType.ALREADY_LISTED && "".concat(currency.formatEth((_asset$floor_sell_ord = asset === null || asset === void 0 ? void 0 : asset.floor_sell_order_price) !== null && _asset$floor_sell_ord !== void 0 ? _asset$floor_sell_ord : 0), " ETH")), /*#__PURE__*/React__default["default"].createElement(WarningAction, {
    onClick: function onClick() {
      warningType === shared.WarningType.ALREADY_LISTED && removeSellAsset(asset);
      setWarningType(shared.WarningType.NONE);
    }
  }, warningType === shared.WarningType.BELOW_FLOOR ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "1QfxQT",
    message: "Dismiss"
  }) : /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "vop1s3",
    message: "Remove item"
  })))));
};

exports.PriceTextInput = PriceTextInput;
