import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column, Center } from '../Flex.js';
import { BagIcon } from '../icons.js';
import { subhead } from '../../css/common.css.js';
import { themeVars } from '../../css/sprinkles.css.js';
import styled from 'styled-components';

var _templateObject;
var StyledColumn = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 12px;\n  margin-top: 68px;\n"])));
var EmptyState = function EmptyState() {
  return /*#__PURE__*/React__default.createElement(StyledColumn, null, /*#__PURE__*/React__default.createElement(Center, null, /*#__PURE__*/React__default.createElement(BagIcon, {
    color: themeVars.colors.neutral3,
    height: "96px",
    width: "96px",
    strokeWidth: "1px"
  })), /*#__PURE__*/React__default.createElement(Column, {
    gap: "16"
  }, /*#__PURE__*/React__default.createElement(Center, {
    "data-testid": "nft-empty-bag",
    className: subhead,
    style: {
      lineHeight: "24px"
    }
  }, "Your bag is empty"), /*#__PURE__*/React__default.createElement(Center, {
    fontSize: "12",
    fontWeight: "book",
    color: "neutral2",
    style: {
      lineHeight: "16px"
    }
  }, "Selected NFTs will appear here")));
};

export { EmptyState as default };
