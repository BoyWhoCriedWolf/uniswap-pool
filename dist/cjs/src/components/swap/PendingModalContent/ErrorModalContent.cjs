'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index$5 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index$4 = require('../../Button/index.cjs');
var index$1 = require('../../Column/index.cjs');
var index$3 = require('../../QuestionHelper/index.cjs');
var index$2 = require('../../Row/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../../theme/components/index.cjs');
var index = require('./index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PendingModalError = /*#__PURE__*/function (PendingModalError) {
  PendingModalError[PendingModalError["TOKEN_APPROVAL_ERROR"] = 0] = "TOKEN_APPROVAL_ERROR";
  PendingModalError[PendingModalError["PERMIT_ERROR"] = 1] = "PERMIT_ERROR";
  PendingModalError[PendingModalError["CONFIRMATION_ERROR"] = 2] = "CONFIRMATION_ERROR";
  PendingModalError[PendingModalError["WRAP_ERROR"] = 3] = "WRAP_ERROR";
  return PendingModalError;
}({});
function getErrorContent(errorType) {
  switch (errorType) {
    case PendingModalError.TOKEN_APPROVAL_ERROR:
      return {
        title: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "Wr7IHJ",
          message: "Token approval failed"
        }),
        label: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "4a36gT",
          message: "Why are approvals required?"
        }),
        tooltipText: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "x3WrJX",
          message: "This provides the Uniswap protocol access to your token for trading. For security, this will expire after 30 days."
        })
      };
    case PendingModalError.PERMIT_ERROR:
      return {
        title: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "8BiOLf",
          message: "Permit approval failed"
        }),
        label: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "O1PW4y",
          message: "Why are permits required?"
        }),
        tooltipText: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "uQ9Z9H",
          message: "Permit2 allows token approvals to be shared and managed across different applications."
        })
      };
    case PendingModalError.CONFIRMATION_ERROR:
      return {
        title: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "CfRvLF",
          message: "Swap failed"
        })
      };
    case PendingModalError.WRAP_ERROR:
      return {
        title: /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
          id: "ddvxSw",
          message: "Wrap failed"
        })
      };
  }
}
function ErrorModalContent(_ref) {
  var errorType = _ref.errorType,
    onRetry = _ref.onRetry;
  var theme = styled.useTheme();
  var _getErrorContent = getErrorContent(errorType),
    title = _getErrorContent.title,
    label = _getErrorContent.label,
    tooltipText = _getErrorContent.tooltipText;
  return /*#__PURE__*/React__default["default"].createElement(index.PendingModalContainer, {
    gap: "lg"
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    "data-testid": "pending-modal-failure-icon",
    strokeWidth: 1,
    color: theme.critical,
    size: "48px"
  }), /*#__PURE__*/React__default["default"].createElement(index$1.ColumnCenter, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, null, title), /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    justify: "center"
  }, label && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, label), tooltipText && /*#__PURE__*/React__default["default"].createElement(index$3, {
    text: tooltipText
  }))), /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.ButtonPrimary, {
    marginX: "24px",
    marginBottom: "16px",
    onClick: onRetry
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "6gRgw8",
    message: "Retry"
  }))));
}

exports.ErrorModalContent = ErrorModalContent;
exports.PendingModalError = PendingModalError;
