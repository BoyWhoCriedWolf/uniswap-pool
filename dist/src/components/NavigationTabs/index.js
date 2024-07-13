import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import SettingsTab from '../Settings/index.js';
import { ArrowLeft } from 'react-feather';
import 'react-router-dom';
import { Box } from 'rebass';
import { useAppDispatch } from '../../state/hooks.js';
import { resetMintState } from '../../state/mint/actions.js';
import { resetMintState as resetMintState$1 } from '../../state/mint/v3/actions.js';
import styled, { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { flexRowNoWrap } from '../../theme/styles.js';
import { RowBetween } from '../Row/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var Tabs = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  border-radius: 3rem;\n  justify-content: space-evenly;\n"])), flexRowNoWrap);
var StyledLink = styled.a(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex: ", ";\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ", ";\n"])), function (_ref) {
  var flex = _ref.flex;
  return flex !== null && flex !== void 0 ? flex : "none";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    flex: none;\n    margin-right: 10px;\n  "])));
});
styled(ThemedText.SubHeaderLarge)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n"])));
var StyledArrowLeft = styled(ArrowLeft)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
});
var AddRemoveTitleText = styled(ThemedText.SubHeaderLarge)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  flex: 1;\n  margin: auto;\n"])));
function AddRemoveTabs(_ref5) {
  var adding = _ref5.adding,
    creating = _ref5.creating,
    autoSlippage = _ref5.autoSlippage,
    onBack = _ref5.onBack,
    children = _ref5.children;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var theme = useTheme();
  // reset states on back
  var dispatch = useAppDispatch();
  // const location = useLocation();

  // detect if back should redirect to v3 or v2 pool page
  // const poolLink = location.pathname.includes("add/v2")
  //   ? "/pools/v2"
  //   : "/pools" + (positionID ? `/${positionID.toString()}` : "");

  return /*#__PURE__*/React__default.createElement(Tabs, null, /*#__PURE__*/React__default.createElement(RowBetween, {
    style: {
      padding: "1rem 1rem 0 1rem"
    },
    align: "center"
  }, /*#__PURE__*/React__default.createElement(StyledLink
  // to={poolLink}
  , {
    onClick: function onClick() {
      if (adding) {
        // not 100% sure both of these are needed
        dispatch(resetMintState());
        dispatch(resetMintState$1());
      }
      onBack === null || onBack === void 0 || onBack();
    },
    flex: children ? "1" : undefined
  }, /*#__PURE__*/React__default.createElement(StyledArrowLeft, {
    stroke: theme.neutral2
  })), /*#__PURE__*/React__default.createElement(AddRemoveTitleText, {
    textAlign: children ? "start" : "center"
  }, creating ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "ma87bD",
    message: "Create a pair"
  }) : adding ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "E6MqGy",
    message: "Add liquidity"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "cJtosk",
    message: "Remove liquidity"
  })), children && /*#__PURE__*/React__default.createElement(Box, {
    style: {
      marginRight: ".5rem"
    }
  }, children), /*#__PURE__*/React__default.createElement(SettingsTab, {
    autoSlippage: autoSlippage,
    chainId: chainId,
    showRoutingSettings: false
  })));
}

export { AddRemoveTabs };
