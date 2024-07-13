import React__default, { useState, useRef } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { BrokenLinkIcon } from '../../icons.js';
import { NumericInput } from '../../layout/Input.js';
import { useUpdateInputAndWarnings } from './utils.js';
import { body } from '../../../css/common.css.js';
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
import { formatEth } from '../../../utils/currency.js';
import { Link, AlertTriangle } from 'react-feather';
import styled, { useTheme } from 'styled-components';
import { BREAKPOINTS } from '../../../../theme/index.js';
import { colors } from '../../../../theme/colors.js';
import { WarningType } from './shared.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var PriceTextInputWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 12px;\n  position: relative;\n"])));
var InputWrapper = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  height: 48px;\n  color: ", ";\n  padding: 12px;\n  border: 2px solid;\n  border-radius: 8px;\n  border-color: ", ";\n  margin-right: auto;\n  box-sizing: border-box;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral3;
}, function (_ref2) {
  var borderColor = _ref2.borderColor;
  return borderColor;
});
var CurrencyWrapper = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref3) {
  var listPrice = _ref3.listPrice,
    theme = _ref3.theme;
  return listPrice ? theme.neutral1 : theme.neutral2;
});
var GlobalPriceIcon = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  cursor: pointer;\n  position: absolute;\n  bottom: 32px;\n  right: -10px;\n  background-color: ", ";\n  border-radius: 50%;\n  height: 28px;\n  width: 28px;\n  align-items: center;\n  justify-content: center;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface1;
});
var WarningRow = styled(Row)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  gap: 4px;\n"])));
var WarningMessage = styled(Row)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  top: 52px;\n  width: max-content;\n  position: absolute;\n  right: 0;\n  font-weight: 535;\n  font-size: 10px;\n  line-height: 12px;\n  color: ", ";\n\n  @media screen and (min-width: ", "px) {\n    right: unset;\n  }\n"])), function (_ref5) {
  var $color = _ref5.$color;
  return $color;
}, BREAKPOINTS.md);
var WarningAction = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  color: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.accent1;
});
var getWarningMessage = function getWarningMessage(warning) {
  var message = /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
  switch (warning) {
    case WarningType.BELOW_FLOOR:
      message = /*#__PURE__*/React__default.createElement(Trans, {
        id: "rKgBmD",
        message: "below floor price."
      });
      break;
    case WarningType.ALREADY_LISTED:
      message = /*#__PURE__*/React__default.createElement(Trans, {
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
  var _useState = useState(WarningType.NONE),
    _useState2 = _slicedToArray(_useState, 2),
    warningType = _useState2[0],
    setWarningType = _useState2[1];
  var removeSellAsset = useSellAsset(function (state) {
    return state.removeSellAsset;
  });
  var showResolveIssues = useSellAsset(function (state) {
    return state.showResolveIssues;
  });
  var inputRef = useRef();
  var theme = useTheme();
  var percentBelowFloor = (1 - (listPrice !== null && listPrice !== void 0 ? listPrice : 0) / ((_asset$floorPrice = asset.floorPrice) !== null && _asset$floorPrice !== void 0 ? _asset$floorPrice : 0)) * 100;
  var warningColor = showResolveIssues && !listPrice || warningType === WarningType.ALREADY_LISTED || warningType === WarningType.BELOW_FLOOR && percentBelowFloor >= 20 ? colors.red400 : warningType === WarningType.BELOW_FLOOR ? theme.deprecated_accentWarning : isGlobalPrice || !!listPrice ? theme.accent1 : theme.neutral2;
  var setPrice = function setPrice(event) {
    if (!listPrice && event.target.value.includes(".") && parseFloat(event.target.value) === 0) {
      return;
    }
    var val = parseFloat(event.target.value);
    setListPrice(isNaN(val) ? undefined : val);
  };
  useUpdateInputAndWarnings(setWarningType, inputRef, asset, listPrice);
  return /*#__PURE__*/React__default.createElement(PriceTextInputWrapper, null, /*#__PURE__*/React__default.createElement(InputWrapper, {
    borderColor: warningColor
  }, /*#__PURE__*/React__default.createElement(NumericInput, {
    as: "input",
    pattern: "[0-9]",
    borderStyle: "none",
    className: body,
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
  }), /*#__PURE__*/React__default.createElement(CurrencyWrapper, {
    listPrice: listPrice
  }, "\xA0ETH"), (isGlobalPrice || globalOverride) && /*#__PURE__*/React__default.createElement(GlobalPriceIcon, {
    onClick: function onClick() {
      return setGlobalOverride(!globalOverride);
    }
  }, globalOverride ? /*#__PURE__*/React__default.createElement(BrokenLinkIcon, null) : /*#__PURE__*/React__default.createElement(Link, {
    size: 20,
    color: warningColor
  }))), /*#__PURE__*/React__default.createElement(WarningMessage, {
    $color: warningColor
  }, warningType !== WarningType.NONE && /*#__PURE__*/React__default.createElement(WarningRow, null, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    height: 16,
    width: 16,
    color: warningColor
  }), /*#__PURE__*/React__default.createElement("span", null, warningType === WarningType.BELOW_FLOOR && "".concat(percentBelowFloor.toFixed(0), "% "), getWarningMessage(warningType), "\xA0", warningType === WarningType.ALREADY_LISTED && "".concat(formatEth((_asset$floor_sell_ord = asset === null || asset === void 0 ? void 0 : asset.floor_sell_order_price) !== null && _asset$floor_sell_ord !== void 0 ? _asset$floor_sell_ord : 0), " ETH")), /*#__PURE__*/React__default.createElement(WarningAction, {
    onClick: function onClick() {
      warningType === WarningType.ALREADY_LISTED && removeSellAsset(asset);
      setWarningType(WarningType.NONE);
    }
  }, warningType === WarningType.BELOW_FLOOR ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "1QfxQT",
    message: "Dismiss"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "vop1s3",
    message: "Remove item"
  })))));
};

export { PriceTextInput };
