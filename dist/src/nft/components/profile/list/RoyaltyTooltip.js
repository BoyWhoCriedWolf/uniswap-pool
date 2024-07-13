import React__default from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../../../../components/Column/index.js';
import Row from '../../../../components/Row/index.js';
import { getRoyalty } from './utils.js';
import { getMarketplaceIcon } from '../../../utils/asset.js';
import { formatEth } from '../../../utils/currency.js';
import 'video-extensions';
import '../../../../locales/en-US.js';
import 'numbro';
import '../../../utils/pooledAssets.js';
import '../../../utils/time.js';
import '@ethersproject/bignumber';
import '@ethersproject/units';
import styled, { css } from 'styled-components';
import '../../../../theme/components/index.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var FeeWrap = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-bottom: 4px;\n  justify-content: space-between;\n"])));
var RoyaltyContainer = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  gap: 12px;\n  padding: 4px 0px;\n"])));
var iconStyles = css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 16px;\n  height: 16px;\n  outline: 1px solid ", ";\n  margin-right: 8px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var MarketIcon = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-radius: 4px;\n  ", "\n"])), iconStyles);
var CollectionIcon = styled.img(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  object-fit: cover;\n  border-radius: 50%;\n  ", "\n"])), iconStyles);
var FeePercent = styled(ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  line-height: 16px;\n  color: ", ";\n  white-space: nowrap;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var MaxFeeContainer = styled(Row)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n  padding-top: 12px;\n  border-top: 1px solid ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var RoyaltyTooltip = function RoyaltyTooltip(_ref4) {
  var _asset$collection2;
  var selectedMarkets = _ref4.selectedMarkets,
    asset = _ref4.asset,
    fees = _ref4.fees;
  var maxRoyalty = Math.max.apply(Math, _toConsumableArray(selectedMarkets.map(function (market) {
    var _getRoyalty;
    return (_getRoyalty = getRoyalty(market, asset)) !== null && _getRoyalty !== void 0 ? _getRoyalty : 0;
  }))).toFixed(2);
  return /*#__PURE__*/React__default.createElement(RoyaltyContainer, null, selectedMarkets.map(function (market) {
    var _asset$collection$add, _asset$collection;
    return /*#__PURE__*/React__default.createElement(FeeWrap, {
      key: (_asset$collection$add = (_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.address) !== null && _asset$collection$add !== void 0 ? _asset$collection$add : "" + asset.tokenId + market.name + "fee"
    }, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(MarketIcon, null, getMarketplaceIcon(market.name, "16")), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
      lineHeight: "16px",
      marginRight: "12px"
    }, market.name, "\xA0", /*#__PURE__*/React__default.createElement(Trans, {
      id: "9JsPP+",
      message: "fee"
    }))), /*#__PURE__*/React__default.createElement(FeePercent, null, market.fee, "%"));
  }), /*#__PURE__*/React__default.createElement(FeeWrap, null, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(CollectionIcon, {
    src: (_asset$collection2 = asset.collection) === null || _asset$collection2 === void 0 ? void 0 : _asset$collection2.imageUrl
  }), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    lineHeight: "16px",
    marginRight: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "5KArrt",
    message: "Max creator royalties"
  }))), /*#__PURE__*/React__default.createElement(FeePercent, null, maxRoyalty, "%")), /*#__PURE__*/React__default.createElement(MaxFeeContainer, null, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    lineHeight: "16px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "b/e652",
    message: "Max fees"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    lineHeight: "16px",
    color: fees ? "neutral1" : "neutral2"
  }, fees ? formatEth(fees) : "-", " ETH")));
};

export { RoyaltyTooltip };
