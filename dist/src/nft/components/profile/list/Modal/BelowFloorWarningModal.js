import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { ButtonPrimary } from '../../../../../components/Button/index.js';
import { Column } from '../../../../../components/Column/index.js';
import { Portal } from '../../../common/Portal.js';
import { Overlay } from '../../../modals/Overlay.js';
import React__default from 'react';
import { X, AlertTriangle } from 'react-feather';
import styled, { useTheme } from 'styled-components';
import { BREAKPOINTS } from '../../../../../theme/index.js';
import '../../../../../theme/components/index.js';
import { Z_INDEX } from '../../../../../theme/zIndex.js';
import { ThemedText } from '../../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var ModalWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 420px;\n  z-index: ", ";\n  background: ", ";\n  border-radius: 20px;\n  border: 1px solid ", ";\n  box-shadow: ", ";\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n\n  @media screen and (max-width: ", "px) {\n    width: 100%;\n  }\n"])), Z_INDEX.modal, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_deepShadow;
}, BREAKPOINTS.sm);
var CloseIconWrapper = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n"])));
var CloseIcon = styled(X)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  &:hover {\n    opacity: 0.6;\n  }\n"])));
var HazardIconWrap = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  padding: 32px 120px;\n"])));
var ContinueButton = styled(ButtonPrimary)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 20px;\n  line-height: 24px;\n  margin-top: 12px;\n"])));
var EditListings = styled.span(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 20px;\n  color: ", ";\n  text-align: center;\n  cursor: pointer;\n  padding: 12px 16px;\n\n  &:hover {\n    opacity: 0.6;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.accent1;
});
var BelowFloorWarningModal = function BelowFloorWarningModal(_ref5) {
  var _listingsBelowFloor$, _listingsBelowFloor$2;
  var listingsBelowFloor = _ref5.listingsBelowFloor,
    closeModal = _ref5.closeModal,
    startListing = _ref5.startListing;
  var theme = useTheme();
  var clickContinue = function clickContinue(e) {
    e.preventDefault();
    e.stopPropagation();
    startListing();
    closeModal();
  };
  return /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement(ModalWrapper, null, /*#__PURE__*/React__default.createElement(CloseIconWrapper, null, /*#__PURE__*/React__default.createElement(CloseIcon, {
    width: 24,
    height: 24,
    onClick: closeModal
  }), " "), /*#__PURE__*/React__default.createElement(HazardIconWrap, null, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    height: 90,
    width: 90,
    color: theme.critical
  })), /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    lineHeight: "28px",
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "nJdoNI",
    message: "Low listing price"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "+VPrZ3",
    message: "{0, plural, =1 {{1}} other {{2}}}",
    values: {
      "0": listingsBelowFloor.length !== 1 ? 2 : 1,
      "1": i18n._(
      /*i18n*/
      {
        id: "r01GAQ",
        message: "One NFT is listed {0}%",
        values: {
          "0": ((1 - ((_listingsBelowFloor$ = listingsBelowFloor[0][1].price) !== null && _listingsBelowFloor$ !== void 0 ? _listingsBelowFloor$ : 0) / ((_listingsBelowFloor$2 = listingsBelowFloor[0][0].floorPrice) !== null && _listingsBelowFloor$2 !== void 0 ? _listingsBelowFloor$2 : 0)) * 100).toFixed(0)
        }
      }),
      "2": i18n._(
      /*i18n*/
      {
        id: "7fIIB5",
        message: "{0} NFTs are listed significantly",
        values: {
          "0": listingsBelowFloor.length
        }
      })
    }
  }), "\xA0", /*#__PURE__*/React__default.createElement(Trans, {
    id: "LngMh5",
    message: "below the collection\u2019s floor price. Are you sure you want to continue?"
  })), /*#__PURE__*/React__default.createElement(ContinueButton, {
    onClick: clickContinue
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xGVfLh",
    message: "Continue"
  })), /*#__PURE__*/React__default.createElement(EditListings, {
    onClick: closeModal
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "jUcBoP",
    message: "Edit listings"
  }))), /*#__PURE__*/React__default.createElement(Overlay, {
    onClick: closeModal
  }));
};

export { BelowFloorWarningModal };
