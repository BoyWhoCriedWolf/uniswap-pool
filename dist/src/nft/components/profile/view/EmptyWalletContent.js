import React__default, { useCallback } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { headlineMedium } from '../../../css/common.css.js';
import styled from 'styled-components';
import '../../../../theme/components/index.js';
import { EmptyNftsIcon, EmptyTokensIcon, EmptyActivityIcon, EmptyPoolsIcon } from './icons.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var EmptyWalletContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  height: 100%;\n  width: 100%;\n"])));
var EmptyWalletText = styled(ThemedText.SubHeader)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  white-space: normal;\n  margin-top: 12px;\n  text-align: center;\n"])));
var EmptyWalletSubtitle = styled(ThemedText.BodySmall)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  white-space: normal;\n  text-align: center;\n  margin-top: 8px;\n"])));
var ActionButton = styled.button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  padding: 10px 24px;\n  color: ", ";\n  width: min-content;\n  border: none;\n  outline: none;\n  border-radius: 12px;\n  white-space: nowrap;\n  cursor: pointer;\n  margin-top: 20px;\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 24px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.white;
});
var EMPTY_WALLET_CONTENT = {
  nft: {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "iOORS9",
      message: "No NFTs yet"
    }),
    subtitle: /*#__PURE__*/React__default.createElement(Trans, {
      id: "x9wwnn",
      message: "Buy or transfer NFTs to this wallet to get started."
    }),
    actionText: /*#__PURE__*/React__default.createElement(Trans, {
      id: "BM5Ajj",
      message: "Explore NFTs"
    }),
    urlPath: "/nfts",
    icon: /*#__PURE__*/React__default.createElement(EmptyNftsIcon, null)
  },
  token: {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "0DlQl0",
      message: "No tokens yet"
    }),
    subtitle: /*#__PURE__*/React__default.createElement(Trans, {
      id: "QFcBRM",
      message: "Buy or transfer tokens to this wallet to get started."
    }),
    actionText: /*#__PURE__*/React__default.createElement(Trans, {
      id: "1ru2CS",
      message: "Explore tokens"
    }),
    urlPath: "/tokens",
    icon: /*#__PURE__*/React__default.createElement(EmptyTokensIcon, null)
  },
  activity: {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "aXFOuf",
      message: "No activity yet"
    }),
    subtitle: /*#__PURE__*/React__default.createElement(Trans, {
      id: "/VqGJ3",
      message: "Your onchain transactions and crypto purchases will appear here."
    }),
    icon: /*#__PURE__*/React__default.createElement(EmptyActivityIcon, null)
  },
  pool: {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "GMDG9/",
      message: "No pools yet"
    }),
    subtitle: /*#__PURE__*/React__default.createElement(Trans, {
      id: "x4ZE2q",
      message: "Open a new position or create a pool to get started."
    }),
    actionText: /*#__PURE__*/React__default.createElement(Trans, {
      id: "A5wsxk",
      message: "+ New position"
    }),
    urlPath: "/pool",
    icon: /*#__PURE__*/React__default.createElement(EmptyPoolsIcon, null)
  }
};
var EmptyWalletContent = function EmptyWalletContent(_ref3) {
  var _ref3$type = _ref3.type,
    type = _ref3$type === void 0 ? "nft" : _ref3$type,
    onNavigateClick = _ref3.onNavigateClick,
    _ref3$onOpen = _ref3.onOpen,
    onOpen = _ref3$onOpen === void 0 ? function () {
      return null;
    } : _ref3$onOpen;
  var content = EMPTY_WALLET_CONTENT[type];
  var actionButtonClick = useCallback(function () {
    if (content.urlPath) {
      onNavigateClick === null || onNavigateClick === void 0 || onNavigateClick();
      // navigate(content.urlPath);
      onOpen(content.urlPath);
    }
  }, [content.urlPath, onOpen, onNavigateClick]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, content.icon, /*#__PURE__*/React__default.createElement(EmptyWalletText, {
    className: headlineMedium
  }, content.title), /*#__PURE__*/React__default.createElement(EmptyWalletSubtitle, {
    color: "neutral2"
  }, content.subtitle), content.actionText && /*#__PURE__*/React__default.createElement(ActionButton, {
    "data-testid": "nft-explore-nfts-button",
    onClick: actionButtonClick
  }, content.actionText));
};
var EmptyWalletModule = function EmptyWalletModule(props) {
  return /*#__PURE__*/React__default.createElement(EmptyWalletContainer, null, /*#__PURE__*/React__default.createElement(EmptyWalletContent, _extends({}, props, {
    onOpen: props === null || props === void 0 ? void 0 : props.onOpen
  })));
};

export { EmptyWalletModule };
