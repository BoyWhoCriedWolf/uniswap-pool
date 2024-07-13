import React__default from 'react';
import '@babel/runtime/helpers/defineProperty';
import '@babel/runtime/helpers/asyncToGenerator';
import '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/regenerator';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import '@ethersproject/bignumber';
import '@uniswap/analytics-events';
import '@uniswap/sdk-core';
import '@uniswap/v3-sdk';
import '@web3-react/core';
import '../../analytics/index.js';
import '../../components/Badge/index.js';
import { ButtonPrimary, ButtonConfirmed } from '../../components/Button/index.js';
import '../../components/Card/index.js';
import '../../components/Column/index.js';
import '../../components/DoubleLogo/index.js';
import '../../components/Loader/styled.js';
import '@babel/runtime/helpers/extends';
import '../../components/Logo/AssetLogo.js';
import { RowBetween, RowFixed } from '../../components/Row/index.js';
import '../../components/swap/styled.js';
import '../../components/Toggle/index.js';
import '../../components/TransactionConfirmationModal/index.js';
import '../../constants/chains.js';
import '../../graphql/data/util.js';
import '../../constants/chainInfo.js';
import '../../constants/lists.js';
import '@ethersproject/bytes';
import '@ethersproject/strings';
import '../../constants/providers.js';
import '../../constants/tokens.js';
import '../../featureFlags/index.js';
import '@ethersproject/address';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import '../../lib/state/multicall.js';
import '@uniswap/redux-multicall';
import 'react-redux';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/possibleConstructorReturn';
import '@babel/runtime/helpers/getPrototypeOf';
import '@babel/runtime/helpers/inherits';
import '../../utils/listSort.js';
import '../../state/mint/v3/actions.js';
import '../../hooks/usePools.js';
import '../../hooks/useStablecoinPrice.js';
import '../../hooks/useV3PositionFees.js';
import { Link } from 'react-router-dom';
import '../../graphql/data/__generated__/types-and-hooks.js';
import '../../state/signatures/reducer.js';
import '../../utils/formatNumbers.js';
import '../../components/AccountDrawer/MiniPortfolio/constants.js';
import '@uniswap/router-sdk';
import '@uniswap/uniswapx-sdk';
import '../../constants/misc.js';
import '../../state/transactions/reducer.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import '@babel/runtime/helpers/typeof';
import '@babel/runtime/helpers/wrapNativeSuper';
import 'uuid';
import '../../locales/en-US.js';
import 'jsbi';
import '../../components/Badge/RangeBadge.js';
import '../../components/PositionListItem/index.js';
import '../../components/Toggle/MultiToggle.js';
import '../../components/SwitchLocaleLink/index.js';
import '../../utils/getExplorerLink.js';
import './styled.js';
import { ThemedText } from '../../theme/components/text.js';

var _excluded = ["end"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;
var PositionPageButtonPrimary = styled(ButtonPrimary)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 228px;\n  height: 40px;\n  font-size: 16px;\n  line-height: 20px;\n  border-radius: 12px;\n"])));
var PageWrapper = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 68px 16px 16px 16px;\n\n  min-width: 800px;\n  max-width: 960px;\n\n  @media only screen and (max-width: ", ") {\n    min-width: 100%;\n    padding: 16px;\n  }\n\n  @media only screen and (max-width: ", ") {\n    min-width: 100%;\n    padding: 16px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 14px;\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});

// responsive text
// disable the warning because we don't use the end prop, we just want to filter it out
// eslint-disable-next-line @typescript-eslint/no-unused-vars
styled(function (_ref4) {
  _ref4.end;
    var props = _objectWithoutProperties(_ref4, _excluded);
  return /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, props);
})(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  font-size: 16px;\n  justify-content: ", ";\n  align-items: center;\n"])), function (_ref5) {
  var end = _ref5.end;
  return end ? "flex-end" : "flex-start";
});
styled.span(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 14px;\n  text-align: center;\n  margin-right: 4px;\n  font-weight: 535;\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
});
styled(ThemedText.DeprecatedMain)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  text-decoration: none;\n  color: ", ";\n  :hover {\n    color: ", ";\n    text-decoration: none;\n  }\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.neutral2;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.neutral1;
});
styled.span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  color: ", ";\n  margin: 0 1rem;\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral3;
});
var ResponsiveRow = styled(RowBetween)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  @media only screen and (max-width: ", ") {\n    flex-direction: column;\n    align-items: flex-start;\n    row-gap: 16px;\n    width: 100%;\n  }\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled(ResponsiveRow)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  width: 50%;\n  justify-content: flex-end;\n\n  @media only screen and (max-width: ", ") {\n    width: 100%;\n    flex-direction: row;\n    * {\n      width: 100%;\n    }\n  }\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled(ButtonConfirmed)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  padding: 6px 8px;\n  width: fit-content;\n  font-size: 16px;\n\n  @media only screen and (max-width: ", ") {\n    width: fit-content;\n  }\n\n  @media only screen and (max-width: ", ") {\n    width: fit-content;\n  }\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref13) {
  var theme = _ref13.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  display: grid;\n  grid-template: \"overlap\";\n  min-height: 400px;\n"])));
styled.canvas(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  grid-area: overlap;\n"])));
styled.img(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  grid-area: overlap;\n  height: 400px;\n  /* Ensures SVG appears on top of canvas. */\n  z-index: 1;\n"])));
function PositionPageUnsupportedContent() {
  return /*#__PURE__*/React__default.createElement(PageWrapper, null, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineLarge, {
    style: {
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Ij/sE3",
    message: "Position unavailable"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    style: {
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Jbim1e",
    message: "To view a position, you must be connected to the network it belongs to."
  })), /*#__PURE__*/React__default.createElement(PositionPageButtonPrimary, {
    as: Link,
    to: "/pools",
    width: "fit-content"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7IwSeQ",
    message: "Back to Pools"
  }))));
}
styled(RowFixed)({
  flexWrap: "wrap",
  gap: 8
});

export { PositionPageUnsupportedContent };
