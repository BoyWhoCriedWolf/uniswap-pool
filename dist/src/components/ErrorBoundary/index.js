import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import * as Sentry from '@sentry/react';
import { useWeb3React } from '@web3-react/core';
import { ButtonLight, SmallButtonPrimary } from '../Button/index.js';
import { ChevronUpIcon } from '../../nft/components/icons.js';
import '../../nft/hooks/useBag.js';
import '../../nft/hooks/useCollectionFilters.js';
import '../../nft/hooks/useFiltersExpanded.js';
import '../../nft/hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../nft/hooks/useIsMobile.js';
import '../../hooks/useScreenSize.js';
import '../../nft/hooks/useNFTList.js';
import '../../nft/hooks/useProfilePageState.js';
import '../../nft/hooks/useSellAsset.js';
import '../../nft/hooks/useSendTransaction.js';
import React__default, { useState } from 'react';
import '../../nft/hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../hooks/useUSDPrice.js';
import '../../constants/tokens.js';
import 'jsbi';
import '../../lib/hooks/useCurrencyBalance.js';
import '../../nft/hooks/useWalletCollections.js';
import { Copy } from 'react-feather';
import styled from 'styled-components';
import { CopyToClipboard, ExternalLink } from '../../theme/components/index.js';
import { isSentryEnabled } from '../../utils/env.js';
import { Column } from '../Column/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;
var FallbackWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n"])));
var BodyWrapper = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  max-width: 500px;\n  margin: auto;\n  padding: 1rem;\n"])));
var SmallButtonLight = styled(ButtonLight)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-size: 16px;\n  padding: 10px 16px;\n  border-radius: 12px;\n"])));
var StretchedRow = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  gap: 24px;\n\n  > * {\n    display: flex;\n    flex: 1;\n  }\n"])));
var Code = styled.code(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font-weight: 485;\n  font-size: 12px;\n  line-height: 16px;\n  word-wrap: break-word;\n  width: 100%;\n  color: ", ";\n  font-family: ", ";\n  overflow: scroll;\n  max-height: calc(100vh - 450px);\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.fonts.code;
});
var Separator = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  border-bottom: 1px solid ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var CodeBlockWrapper = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),\n    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);\n  border-radius: 24px;\n  padding: 24px;\n  gap: 10px;\n  color: ", ";\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface2;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral1;
});
var ShowMoreButton = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  display: flex;\n  cursor: pointer;\n  justify-content: space-between;\n"])));
var CopyIcon = styled(Copy)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  stroke: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
});
var ShowMoreIcon = styled(ChevronUpIcon)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  transform: ", ";\n"])), function (_ref7) {
  var $isExpanded = _ref7.$isExpanded;
  return $isExpanded ? "none" : "rotate(180deg)";
});
var CodeTitle = styled.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  display: flex;\n  gap: 14px;\n  align-items: center;\n  justify-content: space-between;\n  word-break: break-word;\n"])));
var Fallback = function Fallback(_ref8) {
  var error = _ref8.error,
    eventId = _ref8.eventId;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isExpanded = _useState2[0],
    setExpanded = _useState2[1];
  var isMobile = useIsMobile();

  // @todo: ThemedText components should be responsive by default
  var _ref9 = isMobile ? [ThemedText.HeadlineSmall, ThemedText.BodySmall] : [ThemedText.HeadlineLarge, ThemedText.BodySecondary],
    _ref10 = _slicedToArray(_ref9, 2),
    Title = _ref10[0],
    Description = _ref10[1];
  var showErrorId = isSentryEnabled() && eventId;
  var showMoreButton = /*#__PURE__*/React__default.createElement(ShowMoreButton, {
    onClick: function onClick() {
      return setExpanded(function (s) {
        return !s;
      });
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.Link, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": isExpanded ? "Show less" : "Show more"
    }
  })), /*#__PURE__*/React__default.createElement(ShowMoreIcon, {
    $isExpanded: isExpanded,
    secondaryWidth: "20",
    secondaryHeight: "20"
  }));
  var errorDetails = error.stack || error.message;
  return /*#__PURE__*/React__default.createElement(FallbackWrapper, null, /*#__PURE__*/React__default.createElement(BodyWrapper, null, /*#__PURE__*/React__default.createElement(Column, {
    gap: "xl"
  }, showErrorId ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Column, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(Title, {
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "nwtY4N",
    message: "Something went wrong"
  })), /*#__PURE__*/React__default.createElement(Description, {
    textAlign: "center",
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Q1aovZ",
    message: "Sorry, an error occured while processing your request. If you request support, be sure to provide your error ID."
  }))), /*#__PURE__*/React__default.createElement(CodeBlockWrapper, null, /*#__PURE__*/React__default.createElement(CodeTitle, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "y4nM4g",
    message: "Error ID: {eventId}",
    values: {
      eventId: eventId
    }
  })), /*#__PURE__*/React__default.createElement(CopyToClipboard, {
    toCopy: eventId
  }, /*#__PURE__*/React__default.createElement(CopyIcon, null))), /*#__PURE__*/React__default.createElement(Separator, null), isExpanded && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Code, null, errorDetails), /*#__PURE__*/React__default.createElement(Separator, null)), showMoreButton)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Column, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(Title, {
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "nwtY4N",
    message: "Something went wrong"
  })), /*#__PURE__*/React__default.createElement(Description, {
    textAlign: "center",
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "8C/AK6",
    message: "Sorry, an error occured while processing your request. If you request support, be sure to copy the details of this error."
  }))), /*#__PURE__*/React__default.createElement(CodeBlockWrapper, null, /*#__PURE__*/React__default.createElement(CodeTitle, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, "Error details"), /*#__PURE__*/React__default.createElement(CopyToClipboard, {
    toCopy: errorDetails
  }, /*#__PURE__*/React__default.createElement(CopyIcon, null))), /*#__PURE__*/React__default.createElement(Separator, null), /*#__PURE__*/React__default.createElement(Code, null, errorDetails.split("\n").slice(0, isExpanded ? undefined : 4)), /*#__PURE__*/React__default.createElement(Separator, null), showMoreButton)), /*#__PURE__*/React__default.createElement(StretchedRow, null, /*#__PURE__*/React__default.createElement(SmallButtonPrimary, {
    onClick: function onClick() {
      return window.location.reload();
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "L7XriH",
    message: "Reload the app"
  })), /*#__PURE__*/React__default.createElement(ExternalLink, {
    id: "get-support-on-discord",
    href: "https://discord.gg/FCfyBSbCU5",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(SmallButtonLight, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EyYG53",
    message: "Get support"
  })))))));
};
function updateServiceWorker() {
  return _updateServiceWorker.apply(this, arguments);
}
function _updateServiceWorker() {
  _updateServiceWorker = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var ready;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return navigator.serviceWorker.ready;
        case 2:
          ready = _context2.sent;
          return _context2.abrupt("return", ready.update());
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _updateServiceWorker.apply(this, arguments);
}
var updateServiceWorkerInBackground = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var registration;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return updateServiceWorker();
        case 3:
          registration = _context.sent;
          if (!(registration !== null && registration !== void 0 && registration.waiting)) {
            _context.next = 8;
            break;
          }
          _context.next = 7;
          return registration.unregister();
        case 7:
          // Makes Workbox call skipWaiting().
          // For more info on skipWaiting see: https://web.dev/service-worker-lifecycle/#skip-the-waiting-phase
          registration.waiting.postMessage({
            type: "SKIP_WAITING"
          });
        case 8:
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("Failed to update service worker", _context.t0);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function updateServiceWorkerInBackground() {
    return _ref11.apply(this, arguments);
  };
}();
function ErrorBoundary(_ref12) {
  var children = _ref12.children;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  return /*#__PURE__*/React__default.createElement(Sentry.ErrorBoundary, {
    fallback: function fallback(_ref13) {
      var error = _ref13.error,
        eventId = _ref13.eventId;
      return /*#__PURE__*/React__default.createElement(Fallback, {
        error: error,
        eventId: eventId
      });
    },
    beforeCapture: function beforeCapture(scope) {
      scope.setLevel("fatal");
      scope.setTag("chain_id", chainId);
    },
    onError: function onError() {
      updateServiceWorkerInBackground();
    }
  }, children);
}

export { ErrorBoundary as default };
