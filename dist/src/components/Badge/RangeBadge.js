import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Slash, AlertTriangle } from 'react-feather';
import styled, { useTheme } from 'styled-components';
import { MouseoverTooltip } from '../Tooltip/index.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var BadgeWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  font-size: 14px;\n  display: flex;\n  justify-content: flex-end;\n"])));
var BadgeText = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 14px;\n  margin-right: 8px;\n"])));
var ActiveDot = styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 50%;\n  height: 8px;\n  width: 8px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.success;
});
var LabelText = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n"])), function (_ref2) {
  var color = _ref2.color;
  return color;
});
function RangeBadge(_ref3) {
  var removed = _ref3.removed,
    inRange = _ref3.inRange;
  var theme = useTheme();
  return /*#__PURE__*/React__default.createElement(BadgeWrapper, null, removed ? /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "MZPP7t",
      message: "Your position has 0 liquidity, and is not earning fees."
    })
  }, /*#__PURE__*/React__default.createElement(LabelText, {
    color: theme.neutral2
  }, /*#__PURE__*/React__default.createElement(BadgeText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "D87pha",
    message: "Closed"
  })), /*#__PURE__*/React__default.createElement(Slash, {
    width: 12,
    height: 12
  }))) : inRange ? /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "aIvv/z",
      message: "The price of this pool is within your selected range. Your position is currently earning fees."
    })
  }, /*#__PURE__*/React__default.createElement(LabelText, {
    color: theme.success
  }, /*#__PURE__*/React__default.createElement(BadgeText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "vOyUlD",
    message: "In range"
  })), /*#__PURE__*/React__default.createElement(ActiveDot, null))) : /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "IwiTcw",
      message: "The price of this pool is outside of your selected range. Your position is not currently earning fees."
    })
  }, /*#__PURE__*/React__default.createElement(LabelText, {
    color: theme.deprecated_accentWarning
  }, /*#__PURE__*/React__default.createElement(BadgeText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "i3Z+/Z",
    message: "Out of range"
  })), /*#__PURE__*/React__default.createElement(AlertTriangle, {
    width: 12,
    height: 12
  }))));
}

export { RangeBadge as default };
