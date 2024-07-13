'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../../node_modules/@lingui/react/dist/index.cjs');
var index$1 = require('../../../../components/Column/index.cjs');
var index = require('../../../../components/Row/index.cjs');
var utils = require('./utils.cjs');
var asset = require('../../../utils/asset.cjs');
var currency = require('../../../utils/currency.cjs');
require('video-extensions');
require('../../../../locales/en-US.cjs');
require('numbro');
require('../../../utils/pooledAssets.cjs');
require('../../../utils/time.cjs');
require('@ethersproject/bignumber');
require('@ethersproject/units');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var FeeWrap = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin-bottom: 4px;\n  justify-content: space-between;\n"])));
var RoyaltyContainer = styled__default["default"](index$1.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  gap: 12px;\n  padding: 4px 0px;\n"])));
var iconStyles = styled.css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 16px;\n  height: 16px;\n  outline: 1px solid ", ";\n  margin-right: 8px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var MarketIcon = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 4px;\n  ", "\n"])), iconStyles);
var CollectionIcon = styled__default["default"].img(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  object-fit: cover;\n  border-radius: 50%;\n  ", "\n"])), iconStyles);
var FeePercent = styled__default["default"](text.ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  line-height: 16px;\n  color: ", ";\n  white-space: nowrap;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var MaxFeeContainer = styled__default["default"](index["default"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n  padding-top: 12px;\n  border-top: 1px solid ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var RoyaltyTooltip = function RoyaltyTooltip(_ref4) {
  var _asset$collection2;
  var selectedMarkets = _ref4.selectedMarkets,
    asset$1 = _ref4.asset,
    fees = _ref4.fees;
  var maxRoyalty = Math.max.apply(Math, _toConsumableArray__default["default"](selectedMarkets.map(function (market) {
    var _getRoyalty;
    return (_getRoyalty = utils.getRoyalty(market, asset$1)) !== null && _getRoyalty !== void 0 ? _getRoyalty : 0;
  }))).toFixed(2);
  return /*#__PURE__*/React__default["default"].createElement(RoyaltyContainer, null, selectedMarkets.map(function (market) {
    var _asset$collection$add, _asset$collection;
    return /*#__PURE__*/React__default["default"].createElement(FeeWrap, {
      key: (_asset$collection$add = (_asset$collection = asset$1.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.address) !== null && _asset$collection$add !== void 0 ? _asset$collection$add : "" + asset$1.tokenId + market.name + "fee"
    }, /*#__PURE__*/React__default["default"].createElement(index["default"], null, /*#__PURE__*/React__default["default"].createElement(MarketIcon, null, asset.getMarketplaceIcon(market.name, "16")), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
      lineHeight: "16px",
      marginRight: "12px"
    }, market.name, "\xA0", /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "9JsPP+",
      message: "fee"
    }))), /*#__PURE__*/React__default["default"].createElement(FeePercent, null, market.fee, "%"));
  }), /*#__PURE__*/React__default["default"].createElement(FeeWrap, null, /*#__PURE__*/React__default["default"].createElement(index["default"], null, /*#__PURE__*/React__default["default"].createElement(CollectionIcon, {
    src: (_asset$collection2 = asset$1.collection) === null || _asset$collection2 === void 0 ? void 0 : _asset$collection2.imageUrl
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    lineHeight: "16px",
    marginRight: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "5KArrt",
    message: "Max creator royalties"
  }))), /*#__PURE__*/React__default["default"].createElement(FeePercent, null, maxRoyalty, "%")), /*#__PURE__*/React__default["default"].createElement(MaxFeeContainer, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    lineHeight: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "b/e652",
    message: "Max fees"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    lineHeight: "16px",
    color: fees ? "neutral1" : "neutral2"
  }, fees ? currency.formatEth(fees) : "-", " ETH")));
};

exports.RoyaltyTooltip = RoyaltyTooltip;
