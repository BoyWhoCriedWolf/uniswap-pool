import React__default from 'react';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ButtonPrimary } from '../../Button/index.js';
import { ColumnCenter } from '../../Column/index.js';
import QuestionHelper from '../../QuestionHelper/index.js';
import Row from '../../Row/index.js';
import { AlertTriangle } from 'react-feather';
import { useTheme } from 'styled-components';
import '../../../theme/components/index.js';
import { PendingModalContainer } from './index.js';
import { ThemedText } from '../../../theme/components/text.js';

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
        title: /*#__PURE__*/React__default.createElement(Trans, {
          id: "Wr7IHJ",
          message: "Token approval failed"
        }),
        label: /*#__PURE__*/React__default.createElement(Trans, {
          id: "4a36gT",
          message: "Why are approvals required?"
        }),
        tooltipText: /*#__PURE__*/React__default.createElement(Trans, {
          id: "x3WrJX",
          message: "This provides the Uniswap protocol access to your token for trading. For security, this will expire after 30 days."
        })
      };
    case PendingModalError.PERMIT_ERROR:
      return {
        title: /*#__PURE__*/React__default.createElement(Trans, {
          id: "8BiOLf",
          message: "Permit approval failed"
        }),
        label: /*#__PURE__*/React__default.createElement(Trans, {
          id: "O1PW4y",
          message: "Why are permits required?"
        }),
        tooltipText: /*#__PURE__*/React__default.createElement(Trans, {
          id: "uQ9Z9H",
          message: "Permit2 allows token approvals to be shared and managed across different applications."
        })
      };
    case PendingModalError.CONFIRMATION_ERROR:
      return {
        title: /*#__PURE__*/React__default.createElement(Trans, {
          id: "CfRvLF",
          message: "Swap failed"
        })
      };
    case PendingModalError.WRAP_ERROR:
      return {
        title: /*#__PURE__*/React__default.createElement(Trans, {
          id: "ddvxSw",
          message: "Wrap failed"
        })
      };
  }
}
function ErrorModalContent(_ref) {
  var errorType = _ref.errorType,
    onRetry = _ref.onRetry;
  var theme = useTheme();
  var _getErrorContent = getErrorContent(errorType),
    title = _getErrorContent.title,
    label = _getErrorContent.label,
    tooltipText = _getErrorContent.tooltipText;
  return /*#__PURE__*/React__default.createElement(PendingModalContainer, {
    gap: "lg"
  }, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    "data-testid": "pending-modal-failure-icon",
    strokeWidth: 1,
    color: theme.critical,
    size: "48px"
  }), /*#__PURE__*/React__default.createElement(ColumnCenter, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, null, title), /*#__PURE__*/React__default.createElement(Row, {
    justify: "center"
  }, label && /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, label), tooltipText && /*#__PURE__*/React__default.createElement(QuestionHelper, {
    text: tooltipText
  }))), /*#__PURE__*/React__default.createElement(Row, {
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    marginX: "24px",
    marginBottom: "16px",
    onClick: onRetry
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "6gRgw8",
    message: "Retry"
  }))));
}

export { ErrorModalContent, PendingModalError };
