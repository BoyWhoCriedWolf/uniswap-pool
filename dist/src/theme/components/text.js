import React__default from 'react';
import _extends from '@babel/runtime/helpers/extends';
import { Text } from 'rebass';
import styled from 'styled-components';

const TextWrapper = styled(Text).withConfig({
  shouldForwardProp: prop => prop !== "color"
})`
  color: ${_ref => {
  let {
    color,
    theme
  } = _ref;
  return theme[color];
}};
`;
// todo: export each component individually
const ThemedText = {
  // todo: there should be just one `Body` with default color, no need to make all variations
  BodyPrimary(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral1"
    }, props));
  },
  BodySecondary(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral2"
    }, props));
  },
  BodySmall(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 14,
      color: "neutral1"
    }, props));
  },
  HeadlineSmall(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 20,
      lineHeight: "28px",
      color: "neutral1"
    }, props));
  },
  HeadlineMedium(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 28,
      color: "neutral1"
    }, props));
  },
  HeadlineLarge(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 36,
      lineHeight: "44px",
      color: "neutral1"
    }, props));
  },
  LargeHeader(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 36,
      color: "neutral1"
    }, props));
  },
  Hero(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 48,
      color: "neutral1"
    }, props));
  },
  LabelSmall(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 14,
      color: "neutral2"
    }, props));
  },
  LabelMicro(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 12,
      color: "neutral2"
    }, props));
  },
  Caption(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 12,
      lineHeight: "16px",
      color: "neutral1"
    }, props));
  },
  Link(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 14,
      color: "accent1"
    }, props));
  },
  MediumHeader(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 20,
      color: "neutral1"
    }, props));
  },
  SubHeaderLarge(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 20,
      color: "neutral1"
    }, props));
  },
  SubHeader(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral1",
      lineHeight: "24px"
    }, props));
  },
  SubHeaderSmall(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 14,
      color: "neutral2"
    }, props));
  },
  UtilityBadge(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: "8px",
      lineHeight: "12px"
    }, props));
  },
  DeprecatedMain(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "neutral2"
    }, props));
  },
  DeprecatedLink(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "accent1"
    }, props));
  },
  DeprecatedLabel(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "neutral1"
    }, props));
  },
  DeprecatedBlack(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "neutral1"
    }, props));
  },
  DeprecatedWhite(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "white"
    }, props));
  },
  DeprecatedBody(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 16,
      color: "neutral1"
    }, props));
  },
  DeprecatedLargeHeader(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 535,
      fontSize: 24
    }, props));
  },
  DeprecatedMediumHeader(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 535,
      fontSize: 20
    }, props));
  },
  DeprecatedSubHeader(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 14
    }, props));
  },
  DeprecatedSmall(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 11
    }, props));
  },
  DeprecatedBlue(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "accent1"
    }, props));
  },
  DeprecatedYellow(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "deprecated_yellow3"
    }, props));
  },
  DeprecatedDarkGray(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "neutral2"
    }, props));
  },
  DeprecatedGray(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: "surface2"
    }, props));
  },
  DeprecatedItalic(props) {
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      fontSize: 12,
      fontStyle: "italic",
      color: "neutral2"
    }, props));
  },
  DeprecatedError(_ref2) {
    let {
      error,
      ...props
    } = _ref2;
    return /*#__PURE__*/React__default.createElement(TextWrapper, _extends({
      fontWeight: 485,
      color: error ? "critical" : "neutral2"
    }, props));
  }
};

export { ThemedText };
