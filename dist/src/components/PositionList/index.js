import _extends from '@babel/runtime/helpers/extends';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import PositionListItem from '../PositionListItem/index.js';
import React__default from 'react';
import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme/index.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var DesktopHeader = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: none;\n  font-size: 14px;\n  padding: 16px;\n  border-bottom: 1px solid ", ";\n\n  @media screen and (min-width: ", "px) {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    & > div:last-child {\n      text-align: right;\n      margin-right: 12px;\n    }\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, MEDIA_WIDTHS.deprecated_upToSmall);
var MobileHeader = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  font-weight: medium;\n  padding: 8px;\n  font-weight: 535;\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n  border-bottom: 1px solid ", ";\n\n  @media screen and (min-width: ", "px) {\n    display: none;\n  }\n\n  @media screen and (max-width: ", "px) {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, MEDIA_WIDTHS.deprecated_upToSmall, MEDIA_WIDTHS.deprecated_upToExtraSmall);
var ToggleWrap = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])));
var ToggleLabel = styled.button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 485;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.accent1;
});
function PositionList(_ref4) {
  var positions = _ref4.positions,
    setUserHideClosedPositions = _ref4.setUserHideClosedPositions,
    userHideClosedPositions = _ref4.userHideClosedPositions;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DesktopHeader, null, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "LcLwJZ",
    message: "Your positions"
  }), positions && " (" + positions.length + ")"), /*#__PURE__*/React__default.createElement(ToggleLabel, {
    id: "desktop-hide-closed-positions",
    onClick: function onClick() {
      setUserHideClosedPositions(!userHideClosedPositions);
    }
  }, userHideClosedPositions ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "GOctE4",
    message: "Show closed positions"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "l+HNUa",
    message: "Hide closed positions"
  }))), /*#__PURE__*/React__default.createElement(MobileHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "LcLwJZ",
    message: "Your positions"
  }), /*#__PURE__*/React__default.createElement(ToggleWrap, null, /*#__PURE__*/React__default.createElement(ToggleLabel, {
    onClick: function onClick() {
      setUserHideClosedPositions(!userHideClosedPositions);
    }
  }, userHideClosedPositions ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "GOctE4",
    message: "Show closed positions"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "l+HNUa",
    message: "Hide closed positions"
  })))), positions.map(function (p) {
    return /*#__PURE__*/React__default.createElement(PositionListItem, _extends({
      key: p.tokenId.toString()
    }, p));
  }));
}

export { PositionList as default };
