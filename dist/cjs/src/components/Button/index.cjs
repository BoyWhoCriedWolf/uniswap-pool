'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var polished = require('polished');
var reactFeather = require('react-feather');
var styledComponents = require('rebass/styled-components');
var styled = require('styled-components');
var index = require('../Row/index.cjs');
require('../../theme/components/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["confirmed", "altDisabledStyle"],
  _excluded2 = ["error"],
  _excluded5 = ["active", "children"],
  _excluded6 = ["children"],
  _excluded7 = ["children"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17;
var ButtonOverlay = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background-color: transparent;\n  bottom: 0;\n  border-radius: inherit;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  transition: 150ms ease background-color;\n  width: 100%;\n"])));
var BaseButton = styled__default["default"](styledComponents.Button)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: ", ";\n  width: ", ";\n  line-height: 24px;\n  font-weight: 535;\n  text-align: center;\n  border-radius: ", ";\n  outline: none;\n  border: 1px solid transparent;\n  color: ", ";\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  flex-wrap: nowrap;\n  align-items: center;\n  cursor: pointer;\n  position: relative;\n  z-index: 1;\n  &:disabled {\n    opacity: 50%;\n    cursor: auto;\n    pointer-events: none;\n  }\n\n  will-change: transform;\n  transition: transform 450ms ease;\n  transform: perspective(1px) translateZ(0);\n\n  > * {\n    user-select: none;\n  }\n\n  > a {\n    text-decoration: none;\n  }\n"])), function (_ref) {
  var padding = _ref.padding;
  return padding !== null && padding !== void 0 ? padding : "16px";
}, function (_ref2) {
  var width = _ref2.width;
  return width !== null && width !== void 0 ? width : "100%";
}, function (_ref3) {
  var $borderRadius = _ref3.$borderRadius;
  return $borderRadius !== null && $borderRadius !== void 0 ? $borderRadius : "16px";
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
});
var ButtonPrimary = styled__default["default"](BaseButton)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  font-size: 20px;\n  font-weight: 535;\n  padding: 16px;\n  color: ", ";\n  &:focus {\n    box-shadow: 0 0 0 1pt ", ";\n    background-color: ", ";\n  }\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    box-shadow: 0 0 0 1pt ", ";\n    background-color: ", ";\n  }\n  &:disabled {\n    background-color: ", ";\n    color: ", ";\n    cursor: auto;\n    box-shadow: none;\n    border: 1px solid transparent;\n    outline: none;\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.accent1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.white;
}, function (_ref7) {
  var theme = _ref7.theme;
  return polished.darken(0.05, theme.accent1);
}, function (_ref8) {
  var theme = _ref8.theme;
  return polished.darken(0.05, theme.accent1);
}, function (_ref9) {
  var theme = _ref9.theme;
  return polished.darken(0.05, theme.accent1);
}, function (_ref10) {
  var theme = _ref10.theme;
  return polished.darken(0.1, theme.accent1);
}, function (_ref11) {
  var theme = _ref11.theme;
  return polished.darken(0.1, theme.accent1);
}, function (_ref12) {
  var theme = _ref12.theme,
    altDisabledStyle = _ref12.altDisabledStyle,
    disabled = _ref12.disabled;
  return altDisabledStyle ? disabled ? theme.accent1 : theme.surface3 : theme.surface3;
}, function (_ref13) {
  var altDisabledStyle = _ref13.altDisabledStyle,
    disabled = _ref13.disabled,
    theme = _ref13.theme;
  return altDisabledStyle ? disabled ? theme.white : theme.neutral2 : theme.neutral2;
});
var SmallButtonPrimary = styled__default["default"](ButtonPrimary)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: auto;\n  font-size: 16px;\n  padding: ", ";\n\n  border-radius: 12px;\n"])), function (_ref14) {
  var padding = _ref14.padding;
  return padding !== null && padding !== void 0 ? padding : "8px 12px";
});
var BaseButtonLight = styled__default["default"](BaseButton)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  font-size: 20px;\n  font-weight: 535;\n\n  &:focus {\n    box-shadow: 0 0 0 1pt ", ";\n    background-color: ", ";\n  }\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    box-shadow: 0 0 0 1pt ", ";\n    background-color: ", ";\n  }\n\n  :hover {\n    ", " {\n      background-color: ", ";\n    }\n  }\n\n  :active {\n    ", " {\n      background-color: ", ";\n    }\n  }\n\n  :disabled {\n    opacity: 0.4;\n    :hover {\n      cursor: auto;\n      background-color: transparent;\n      box-shadow: none;\n      border: 1px solid transparent;\n      outline: none;\n    }\n  }\n"])), function (_ref15) {
  var theme = _ref15.theme;
  return theme.accent2;
}, function (_ref16) {
  var theme = _ref16.theme;
  return theme.accent1;
}, function (_ref17) {
  var theme = _ref17.theme,
    disabled = _ref17.disabled;
  return !disabled && theme.accent2;
}, function (_ref18) {
  var theme = _ref18.theme,
    disabled = _ref18.disabled;
  return !disabled && theme.accent2;
}, function (_ref19) {
  var theme = _ref19.theme,
    disabled = _ref19.disabled;
  return !disabled && theme.accent2;
}, function (_ref20) {
  var theme = _ref20.theme,
    disabled = _ref20.disabled;
  return !disabled && theme.accent2;
}, function (_ref21) {
  var theme = _ref21.theme,
    disabled = _ref21.disabled;
  return !disabled && theme.accent2;
}, ButtonOverlay, function (_ref22) {
  var theme = _ref22.theme;
  return theme.deprecated_stateOverlayHover;
}, ButtonOverlay, function (_ref23) {
  var theme = _ref23.theme;
  return theme.deprecated_stateOverlayPressed;
});
var ButtonGray = styled__default["default"](BaseButton)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  font-size: 16px;\n  font-weight: 535;\n\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    background-color: ", ";\n  }\n"])), function (_ref24) {
  var theme = _ref24.theme;
  return theme.surface1;
}, function (_ref25) {
  var theme = _ref25.theme;
  return theme.neutral2;
}, function (_ref26) {
  var theme = _ref26.theme;
  return theme.surface3;
}, function (_ref27) {
  var theme = _ref27.theme,
    disabled = _ref27.disabled;
  return !disabled && polished.darken(0.05, theme.surface2);
}, function (_ref28) {
  var theme = _ref28.theme,
    disabled = _ref28.disabled;
  return !disabled && polished.darken(0.1, theme.surface2);
});
styled__default["default"](BaseButton)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  color: ", ";\n  background-color: transparent;\n  font-size: 16px;\n  border-radius: 12px;\n  padding: ", ";\n\n  &:focus {\n    box-shadow: 0 0 0 1pt ", ";\n    border: 1px solid ", ";\n  }\n  &:hover {\n    border: 1px solid ", ";\n  }\n  &:active {\n    box-shadow: 0 0 0 1pt ", ";\n    border: 1px solid ", ";\n  }\n  &:disabled {\n    opacity: 50%;\n    cursor: auto;\n  }\n  a:hover {\n    text-decoration: none;\n  }\n"])), function (_ref29) {
  var theme = _ref29.theme;
  return theme.accent2;
}, function (_ref30) {
  var theme = _ref30.theme;
  return theme.accent1;
}, function (_ref31) {
  var padding = _ref31.padding;
  return padding ? padding : "10px";
}, function (_ref32) {
  var theme = _ref32.theme;
  return theme.accent2;
}, function (_ref33) {
  var theme = _ref33.theme;
  return theme.accent1;
}, function (_ref34) {
  var theme = _ref34.theme;
  return theme.accent1;
}, function (_ref35) {
  var theme = _ref35.theme;
  return theme.accent2;
}, function (_ref36) {
  var theme = _ref36.theme;
  return theme.accent1;
});
var ButtonOutlined = styled__default["default"](BaseButton)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  background-color: transparent;\n  color: ", ";\n  &:focus {\n    box-shadow: 0 0 0 1px ", ";\n  }\n  &:hover {\n    box-shadow: 0 0 0 1px ", ";\n  }\n  &:active {\n    box-shadow: 0 0 0 1px ", ";\n  }\n  &:disabled {\n    opacity: 50%;\n    cursor: auto;\n  }\n"])), function (_ref37) {
  var theme = _ref37.theme;
  return theme.surface3;
}, function (_ref38) {
  var theme = _ref38.theme;
  return theme.neutral1;
}, function (_ref39) {
  var theme = _ref39.theme;
  return theme.surface3;
}, function (_ref40) {
  var theme = _ref40.theme;
  return theme.neutral3;
}, function (_ref41) {
  var theme = _ref41.theme;
  return theme.surface3;
});
var ButtonEmpty = styled__default["default"](BaseButton)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  background-color: transparent;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:focus {\n    text-decoration: underline;\n  }\n  &:hover {\n    text-decoration: none;\n  }\n  &:active {\n    text-decoration: none;\n  }\n  &:disabled {\n    opacity: 50%;\n    cursor: auto;\n  }\n"])), function (_ref42) {
  var theme = _ref42.theme;
  return theme.accent1;
});
var ButtonText = styled__default["default"](BaseButton)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  padding: 0;\n  width: fit-content;\n  background: none;\n  text-decoration: none;\n  &:focus {\n    text-decoration: underline;\n  }\n  &:hover {\n    opacity: 0.9;\n  }\n  &:active {\n    text-decoration: underline;\n  }\n  &:disabled {\n    opacity: 50%;\n    cursor: auto;\n  }\n"])));
var ButtonConfirmedStyle = styled__default["default"](BaseButton)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  /* border: 1px solid ", "; */\n\n  &:disabled {\n    opacity: 50%;\n    background-color: ", ";\n    color: ", ";\n    cursor: auto;\n  }\n"])), function (_ref43) {
  var theme = _ref43.theme;
  return theme.surface2;
}, function (_ref44) {
  var theme = _ref44.theme;
  return theme.neutral1;
}, function (_ref45) {
  var theme = _ref45.theme;
  return theme.success;
}, function (_ref46) {
  var theme = _ref46.theme;
  return theme.surface3;
}, function (_ref47) {
  var theme = _ref47.theme;
  return theme.neutral2;
});
var ButtonErrorStyle = styled__default["default"](BaseButton)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border: 1px solid ", ";\n\n  &:focus {\n    box-shadow: 0 0 0 1pt ", ";\n    background-color: ", ";\n  }\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    box-shadow: 0 0 0 1pt ", ";\n    background-color: ", ";\n  }\n  &:disabled {\n    opacity: 50%;\n    cursor: auto;\n    box-shadow: none;\n    background-color: ", ";\n    border: 1px solid ", ";\n  }\n"])), function (_ref48) {
  var theme = _ref48.theme;
  return theme.critical;
}, function (_ref49) {
  var theme = _ref49.theme;
  return theme.critical;
}, function (_ref50) {
  var theme = _ref50.theme;
  return polished.darken(0.05, theme.critical);
}, function (_ref51) {
  var theme = _ref51.theme;
  return polished.darken(0.05, theme.critical);
}, function (_ref52) {
  var theme = _ref52.theme;
  return polished.darken(0.05, theme.critical);
}, function (_ref53) {
  var theme = _ref53.theme;
  return polished.darken(0.1, theme.critical);
}, function (_ref54) {
  var theme = _ref54.theme;
  return polished.darken(0.1, theme.critical);
}, function (_ref55) {
  var theme = _ref55.theme;
  return theme.critical;
}, function (_ref56) {
  var theme = _ref56.theme;
  return theme.critical;
});
function ButtonConfirmed(_ref57) {
  var confirmed = _ref57.confirmed,
    altDisabledStyle = _ref57.altDisabledStyle,
    rest = _objectWithoutProperties__default["default"](_ref57, _excluded);
  if (confirmed) {
    return /*#__PURE__*/React__default["default"].createElement(ButtonConfirmedStyle, rest);
  } else {
    return /*#__PURE__*/React__default["default"].createElement(ButtonPrimary, _extends__default["default"]({}, rest, {
      altDisabledStyle: altDisabledStyle
    }));
  }
}
function ButtonError(_ref58) {
  var error = _ref58.error,
    rest = _objectWithoutProperties__default["default"](_ref58, _excluded2);
  if (error) {
    return /*#__PURE__*/React__default["default"].createElement(ButtonErrorStyle, rest);
  } else {
    return /*#__PURE__*/React__default["default"].createElement(ButtonPrimary, rest);
  }
}
var ActiveOutlined = styled__default["default"](ButtonOutlined)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid;\n  border-color: ", ";\n"])), function (_ref61) {
  var theme = _ref61.theme;
  return theme.accent1;
});
var Circle = styled__default["default"].div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  height: 17px;\n  width: 17px;\n  border-radius: 50%;\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])), function (_ref62) {
  var theme = _ref62.theme;
  return theme.accent1;
});
var CheckboxWrapper = styled__default["default"].div(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral__default["default"](["\n  width: 20px;\n  padding: 0 10px;\n  position: absolute;\n  top: 11px;\n  right: 15px;\n"])));
var ResponsiveCheck = styled__default["default"](reactFeather.Check)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral__default["default"](["\n  size: 13px;\n"])));
function ButtonRadioChecked(_ref63) {
  var _ref63$active = _ref63.active,
    active = _ref63$active === void 0 ? false : _ref63$active,
    children = _ref63.children,
    rest = _objectWithoutProperties__default["default"](_ref63, _excluded5);
  var theme = styled.useTheme();
  if (!active) {
    return /*#__PURE__*/React__default["default"].createElement(ButtonOutlined, _extends__default["default"]({
      $borderRadius: "12px",
      padding: "12px 8px"
    }, rest), /*#__PURE__*/React__default["default"].createElement(index.RowBetween, null, children));
  } else {
    return /*#__PURE__*/React__default["default"].createElement(ActiveOutlined, _extends__default["default"]({}, rest, {
      padding: "12px 8px",
      $borderRadius: "12px"
    }), /*#__PURE__*/React__default["default"].createElement(index.RowBetween, null, children, /*#__PURE__*/React__default["default"].createElement(CheckboxWrapper, null, /*#__PURE__*/React__default["default"].createElement(Circle, null, /*#__PURE__*/React__default["default"].createElement(ResponsiveCheck, {
      size: 13,
      stroke: theme.white
    })))));
  }
}
var ButtonSize = /*#__PURE__*/function (ButtonSize) {
  ButtonSize[ButtonSize["small"] = 0] = "small";
  ButtonSize[ButtonSize["medium"] = 1] = "medium";
  ButtonSize[ButtonSize["large"] = 2] = "large";
  return ButtonSize;
}({});
var ButtonEmphasis = /*#__PURE__*/function (ButtonEmphasis) {
  ButtonEmphasis[ButtonEmphasis["high"] = 0] = "high";
  ButtonEmphasis[ButtonEmphasis["promotional"] = 1] = "promotional";
  ButtonEmphasis[ButtonEmphasis["highSoft"] = 2] = "highSoft";
  ButtonEmphasis[ButtonEmphasis["medium"] = 3] = "medium";
  ButtonEmphasis[ButtonEmphasis["low"] = 4] = "low";
  ButtonEmphasis[ButtonEmphasis["warning"] = 5] = "warning";
  ButtonEmphasis[ButtonEmphasis["destructive"] = 6] = "destructive";
  ButtonEmphasis[ButtonEmphasis["failure"] = 7] = "failure";
  return ButtonEmphasis;
}({});
function pickThemeButtonBackgroundColor(_ref64) {
  var theme = _ref64.theme,
    emphasis = _ref64.emphasis;
  switch (emphasis) {
    case ButtonEmphasis.high:
      return theme.accent1;
    case ButtonEmphasis.promotional:
    case ButtonEmphasis.highSoft:
      return theme.accent2;
    case ButtonEmphasis.low:
      return "transparent";
    case ButtonEmphasis.warning:
      return theme.deprecated_accentWarningSoft;
    case ButtonEmphasis.destructive:
      return theme.critical;
    case ButtonEmphasis.failure:
      return theme.deprecated_accentFailureSoft;
    case ButtonEmphasis.medium:
    default:
      return theme.surface3;
  }
}
function pickThemeButtonFontSize(_ref65) {
  var size = _ref65.size;
  switch (size) {
    case ButtonSize.large:
      return "20px";
    case ButtonSize.medium:
      return "16px";
    case ButtonSize.small:
      return "14px";
    default:
      return "16px";
  }
}
function pickThemeButtonLineHeight(_ref66) {
  var size = _ref66.size;
  switch (size) {
    case ButtonSize.large:
      return "24px";
    case ButtonSize.medium:
      return "20px";
    case ButtonSize.small:
      return "16px";
    default:
      return "20px";
  }
}
function pickThemeButtonPadding(_ref67) {
  var size = _ref67.size;
  switch (size) {
    case ButtonSize.large:
      return "16px";
    case ButtonSize.medium:
      return "10px 12px";
    case ButtonSize.small:
      return "8px";
    default:
      return "10px 12px";
  }
}
function pickThemeButtonTextColor(_ref68) {
  var theme = _ref68.theme,
    emphasis = _ref68.emphasis;
  switch (emphasis) {
    case ButtonEmphasis.high:
    case ButtonEmphasis.promotional:
      return theme.accent1;
    case ButtonEmphasis.highSoft:
      return theme.accent1;
    case ButtonEmphasis.low:
      return theme.neutral2;
    case ButtonEmphasis.warning:
      return theme.deprecated_accentWarning;
    case ButtonEmphasis.destructive:
      return theme.neutral1;
    case ButtonEmphasis.failure:
      return theme.critical;
    case ButtonEmphasis.medium:
    default:
      return theme.neutral1;
  }
}
var BaseThemeButton = styled__default["default"].button(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 16px;\n  border: 0;\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  font-size: ", ";\n  font-weight: 535;\n  gap: 12px;\n  justify-content: center;\n  line-height: ", ";\n  padding: ", ";\n  position: relative;\n  transition: 150ms ease opacity;\n  user-select: none;\n\n  :active {\n    ", " {\n      background-color: ", ";\n    }\n  }\n  :focus {\n    ", " {\n      background-color: ", ";\n    }\n  }\n  :hover {\n    ", " {\n      background-color: ", ";\n    }\n  }\n  :disabled {\n    cursor: default;\n    opacity: 0.6;\n  }\n  :disabled:active,\n  :disabled:focus,\n  :disabled:hover {\n    ", " {\n      background-color: transparent;\n    }\n  }\n"])), pickThemeButtonBackgroundColor, pickThemeButtonTextColor, pickThemeButtonFontSize, pickThemeButtonLineHeight, pickThemeButtonPadding, ButtonOverlay, function (_ref69) {
  var theme = _ref69.theme;
  return theme.deprecated_stateOverlayPressed;
}, ButtonOverlay, function (_ref70) {
  var theme = _ref70.theme;
  return theme.deprecated_stateOverlayPressed;
}, ButtonOverlay, function (_ref71) {
  var theme = _ref71.theme;
  return theme.deprecated_stateOverlayHover;
}, ButtonOverlay);

// eslint-disable

var ThemeButton = /*#__PURE__*/React.forwardRef(function ThemeButton(_ref72, ref) {
  var children = _ref72.children,
    rest = _objectWithoutProperties__default["default"](_ref72, _excluded6);
  return /*#__PURE__*/React__default["default"].createElement(BaseThemeButton, _extends__default["default"]({}, rest, {
    ref: ref
  }), /*#__PURE__*/React__default["default"].createElement(ButtonOverlay, null), children);
});
var ButtonLight = function ButtonLight(_ref73) {
  var children = _ref73.children,
    rest = _objectWithoutProperties__default["default"](_ref73, _excluded7);
  return /*#__PURE__*/React__default["default"].createElement(BaseButtonLight, rest, /*#__PURE__*/React__default["default"].createElement(ButtonOverlay, null), children);
};

exports.BaseButton = BaseButton;
exports.ButtonConfirmed = ButtonConfirmed;
exports.ButtonEmphasis = ButtonEmphasis;
exports.ButtonEmpty = ButtonEmpty;
exports.ButtonError = ButtonError;
exports.ButtonGray = ButtonGray;
exports.ButtonLight = ButtonLight;
exports.ButtonOutlined = ButtonOutlined;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonRadioChecked = ButtonRadioChecked;
exports.ButtonSize = ButtonSize;
exports.ButtonText = ButtonText;
exports.SmallButtonPrimary = SmallButtonPrimary;
exports.ThemeButton = ThemeButton;
