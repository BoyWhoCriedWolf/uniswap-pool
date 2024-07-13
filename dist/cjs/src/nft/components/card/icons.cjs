'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../../components/Row/index.cjs');
var index$1 = require('../../../components/Tooltip/index.cjs');
var typesAndHooks = require('../../../graphql/data/__generated__/types-and-hooks.cjs');
var utils = require('./utils.cjs');
var icons = require('../icons.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('uuid');
require('@ethersproject/units');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
require('@ethersproject/bignumber');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var StyledMarketplaceContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  display: flex;\n  top: 12px;\n  left: 12px;\n  height: 32px;\n  width: ", ";\n  padding: ", ";\n  background: rgba(93, 103, 133, 0.24);\n  color: ", ";\n  justify-content: center;\n  align-items: center;\n  border-radius: 32px;\n  z-index: 2;\n"])), function (_ref) {
  var isText = _ref.isText;
  return isText ? "auto" : "32px";
}, function (_ref2) {
  var isText = _ref2.isText;
  return isText ? "0px 8px" : "0px";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_accentTextLightPrimary;
});
var ListPriceRowContainer = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  gap: 6px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 535;\n  line-height: 16px;\n  text-shadow: 1px 1px 3px rgba(51, 53, 72, 0.54);\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_accentTextLightPrimary;
});
var MarketplaceContainer = function MarketplaceContainer(_ref5) {
  var isSelected = _ref5.isSelected,
    marketplace = _ref5.marketplace,
    tokenType = _ref5.tokenType,
    listedPrice = _ref5.listedPrice,
    hidePrice = _ref5.hidePrice;
  if (isSelected) {
    if (!marketplace) {
      return /*#__PURE__*/React__default["default"].createElement(StyledMarketplaceContainer, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.Check, {
        size: 20
      }));
    }
    return /*#__PURE__*/React__default["default"].createElement(StyledMarketplaceContainer, null, /*#__PURE__*/React__default["default"].createElement(icons.CollectionSelectedAssetIcon, {
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20"
    }));
  }
  if (listedPrice && !hidePrice) {
    return /*#__PURE__*/React__default["default"].createElement(StyledMarketplaceContainer, {
      isText: true
    }, /*#__PURE__*/React__default["default"].createElement(ListPriceRowContainer, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.Tag, {
      size: 20
    }), listedPrice, " ETH"));
  }
  if (!marketplace || tokenType === typesAndHooks.NftStandard.Erc1155) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(StyledMarketplaceContainer, null, utils.getMarketplaceIcon(marketplace));
};
var SuspiciousIcon = styled__default["default"](reactFeather.AlertTriangle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 16px;\n  height: 16px;\n  color: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.critical;
});
styled__default["default"](index["default"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  margin-right: 8px;\n  width: 16px;\n"])));
styled__default["default"](text.ThemedText.BodySmall)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n"])));
styled__default["default"](text.ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  flex-shrink: 0;\n  color: ", ";\n  background: ", ";\n  padding: 4px 6px;\n  border-radius: 4px;\n  font-weight: 535 !important;\n  line-height: 12px;\n  text-align: right;\n  cursor: pointer;\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.neutral2;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface3;
});
var SuspiciousIconContainer = styled__default["default"](index["default"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  flex-shrink: 0;\n"])));
var Suspicious = function Suspicious() {
  return /*#__PURE__*/React__default["default"].createElement(index$1.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "E7U2ed",
      message: "Blocked on OpenSea"
    })),
    placement: "top"
  }, /*#__PURE__*/React__default["default"].createElement(SuspiciousIconContainer, null, /*#__PURE__*/React__default["default"].createElement(SuspiciousIcon, null)));
};

exports.MarketplaceContainer = MarketplaceContainer;
exports.Suspicious = Suspicious;
