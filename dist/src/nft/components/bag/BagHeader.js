import React__default, { useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { OpacityHoverState } from '../../../components/Common/index.js';
import { BagCloseIcon } from '../icons.js';
import styled from 'styled-components';
import { ButtonText } from '../../../theme/components/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ClearButton = styled(ButtonText)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  cursor: pointer;\n  font-weight: 535;\n  font-size: 14px;\n  line-height: 16px;\n\n  :active {\n    text-decoration: none;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var IconWrapper = styled.button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  align-items: center;\n  background-color: transparent;\n  border-radius: 8px;\n  border: none;\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  margin-left: auto;\n  padding: 2px;\n  opacity: 1;\n\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
}, OpacityHoverState);
var CounterDot = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 100px;\n  font-weight: bold;\n  color: ", ";\n  display: flex;\n  font-size: 10px;\n  justify-content: center;\n  min-width: ", ";\n  min-height: ", ";\n  padding: 4px 6px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.accent1;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_accentTextLightPrimary;
}, function (_ref5) {
  var sizing = _ref5.sizing;
  return sizing;
}, function (_ref6) {
  var sizing = _ref6.sizing;
  return sizing;
});
var Wrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n  justify-content: flex-start;\n  margin: 16px 28px;\n  text-align: center;\n"])));
var BASE_SIZING = 17;
var INCREMENTAL_SIZING = 6;
var getCircleSizing = function getCircleSizing(numberOfAssets) {
  var numberOfCharacters = numberOfAssets.toString().length;

  // each digit adds 6px worth of width (approximately), so I set the height and width to be 6px larger for each digit added
  // 1 digit => 14 + 6, 2 digit 14 + 12, etc.
  return "".concat(BASE_SIZING + INCREMENTAL_SIZING * numberOfCharacters, "px");
};
var BagHeader = function BagHeader(_ref7) {
  var numberOfAssets = _ref7.numberOfAssets,
    closeBag = _ref7.closeBag,
    resetFlow = _ref7.resetFlow,
    isProfilePage = _ref7.isProfilePage;
  var sizing = useMemo(function () {
    return getCircleSizing(numberOfAssets);
  }, [numberOfAssets]);
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, null, isProfilePage ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "xNB0TS",
    message: "Sell"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "EnO7qf",
    message: "Bag"
  })), numberOfAssets > 0 && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(CounterDot, {
    sizing: sizing
  }, numberOfAssets), /*#__PURE__*/React__default.createElement(ClearButton, {
    onClick: resetFlow
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "yYxB17",
    message: "Clear all"
  }))), /*#__PURE__*/React__default.createElement(IconWrapper, {
    onClick: closeBag
  }, /*#__PURE__*/React__default.createElement(BagCloseIcon, {
    "data-testid": "nft-bag-close-icon"
  })));
};

export { BagHeader };
