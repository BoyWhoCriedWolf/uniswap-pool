import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import Row from '../../../components/Row/index.js';
import { MouseoverTooltip } from '../../../components/Tooltip/index.js';
import { NftStandard } from '../../../graphql/data/__generated__/types-and-hooks.js';
import { getMarketplaceIcon } from './utils.js';
import { CollectionSelectedAssetIcon } from '../icons.js';
import '@babel/runtime/helpers/toConsumableArray';
import 'uuid';
import '@ethersproject/units';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../utils/pooledAssets.js';
import '../../utils/time.js';
import '@ethersproject/bignumber';
import { AlertTriangle, Check, Tag } from 'react-feather';
import styled from 'styled-components';
import '../../../theme/components/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var StyledMarketplaceContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  display: flex;\n  top: 12px;\n  left: 12px;\n  height: 32px;\n  width: ", ";\n  padding: ", ";\n  background: rgba(93, 103, 133, 0.24);\n  color: ", ";\n  justify-content: center;\n  align-items: center;\n  border-radius: 32px;\n  z-index: 2;\n"])), function (_ref) {
  var isText = _ref.isText;
  return isText ? "auto" : "32px";
}, function (_ref2) {
  var isText = _ref2.isText;
  return isText ? "0px 8px" : "0px";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_accentTextLightPrimary;
});
var ListPriceRowContainer = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  gap: 6px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 535;\n  line-height: 16px;\n  text-shadow: 1px 1px 3px rgba(51, 53, 72, 0.54);\n"])), function (_ref4) {
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
      return /*#__PURE__*/React__default.createElement(StyledMarketplaceContainer, null, /*#__PURE__*/React__default.createElement(Check, {
        size: 20
      }));
    }
    return /*#__PURE__*/React__default.createElement(StyledMarketplaceContainer, null, /*#__PURE__*/React__default.createElement(CollectionSelectedAssetIcon, {
      width: "20px",
      height: "20px",
      viewBox: "0 0 20 20"
    }));
  }
  if (listedPrice && !hidePrice) {
    return /*#__PURE__*/React__default.createElement(StyledMarketplaceContainer, {
      isText: true
    }, /*#__PURE__*/React__default.createElement(ListPriceRowContainer, null, /*#__PURE__*/React__default.createElement(Tag, {
      size: 20
    }), listedPrice, " ETH"));
  }
  if (!marketplace || tokenType === NftStandard.Erc1155) {
    return null;
  }
  return /*#__PURE__*/React__default.createElement(StyledMarketplaceContainer, null, getMarketplaceIcon(marketplace));
};
var SuspiciousIcon = styled(AlertTriangle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 16px;\n  height: 16px;\n  color: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.critical;
});
styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  margin-right: 8px;\n  width: 16px;\n"])));
styled(ThemedText.BodySmall)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n"])));
styled(ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  color: ", ";\n  background: ", ";\n  padding: 4px 6px;\n  border-radius: 4px;\n  font-weight: 535 !important;\n  line-height: 12px;\n  text-align: right;\n  cursor: pointer;\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.neutral2;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface3;
});
var SuspiciousIconContainer = styled(Row)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n"])));
var Suspicious = function Suspicious() {
  return /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "E7U2ed",
      message: "Blocked on OpenSea"
    })),
    placement: "top"
  }, /*#__PURE__*/React__default.createElement(SuspiciousIconContainer, null, /*#__PURE__*/React__default.createElement(SuspiciousIcon, null)));
};

export { MarketplaceContainer, Suspicious };
