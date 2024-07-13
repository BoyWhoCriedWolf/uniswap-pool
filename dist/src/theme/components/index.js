import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { outboundLink } from '../../components/analytics/index.js';
import { MOBILE_MEDIA_BREAKPOINT } from '../../components/Tokens/constants.js';
import useCopyClipboard from '../../hooks/useCopyClipboard.js';
import React__default, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { X, Copy, CheckCircle, ArrowLeft, AlertTriangle } from 'react-feather';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Z_INDEX } from '../zIndex.js';
import { ReactComponent as SvgTooltipTriangle } from '../../assets/svg/tooltip_triangle.svg.js';
import { anonymizeLink } from '../../utils/anonymizeLink.js';
export { ThemedText } from './text.js';

var _excluded = ["target", "href", "rel"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40;
var CloseIcon = styled(X)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  cursor: pointer;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});

// A button that triggers some onClick result, but looks like a link.
var LinkStyledButton = styled.button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border: none;\n  text-decoration: none;\n  background: none;\n\n  cursor: ", ";\n  color: ", ";\n  font-weight: 500;\n\n  :hover {\n    text-decoration: ", ";\n  }\n\n  :focus {\n    outline: none;\n    text-decoration: ", ";\n  }\n\n  :active {\n    text-decoration: none;\n  }\n"])), function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled ? "default" : "pointer";
}, function (_ref3) {
  var theme = _ref3.theme,
    disabled = _ref3.disabled;
  return disabled ? theme.neutral2 : theme.accent1;
}, function (_ref4) {
  var disabled = _ref4.disabled;
  return disabled ? null : "underline";
}, function (_ref5) {
  var disabled = _ref5.disabled;
  return disabled ? null : "underline";
});
var ButtonText = styled.button(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  outline: none;\n  border: none;\n  font-size: inherit;\n  padding: 0;\n  margin: 0;\n  background: none;\n  cursor: pointer;\n  transition-duration: ", ";\n  transition-timing-function: ease-in-out;\n  transition-property: opacity, color, background-color;\n\n  :hover {\n    opacity: ", ";\n  }\n\n  :focus {\n    text-decoration: underline;\n  }\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.transition.duration.fast;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.opacity.hover;
});
var EllipsisStyle = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"])));
var ClickableStyle = css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  text-decoration: none;\n  cursor: pointer;\n  transition-duration: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n  :active {\n    opacity: ", ";\n  }\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.transition.duration.fast;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.opacity.hover;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.opacity.click;
});
var LinkStyle = css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  color: ", ";\n  stroke: ", ";\n  font-weight: 500;\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return theme.accent1;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.accent1;
});

// An internal link from the react-router-dom library that is correctly styled
var StyledInternalLink = styled(Link)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  ", "\n  ", "\n"])), ClickableStyle, LinkStyle);
var IconStyle = css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 18px;\n  margin-left: 10px;\n"])));
var CopyIcon = styled(Copy)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  stroke: ", ";\n"])), IconStyle, ClickableStyle, LinkStyle, function (_ref13) {
  var theme = _ref13.theme;
  return theme.accent1;
});
var rotateImg = keyframes(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  0% {\n    transform: perspective(1000px) rotateY(0deg);\n  }\n\n  100% {\n    transform: perspective(1000px) rotateY(360deg);\n  }\n"])));
var UniTokenAnimated = styled.img(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  animation: ", " 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;\n  padding: 2rem 0 0 0;\n  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));\n"])), rotateImg);
function handleClickExternalLink(event) {
  var _event$currentTarget = event.currentTarget,
    target = _event$currentTarget.target,
    href = _event$currentTarget.href;
  var anonymizedHref = anonymizeLink(href);

  // don't prevent default, don't redirect if it's a new tab
  if (target === "_blank" || event.ctrlKey || event.metaKey) {
    outboundLink({
      label: anonymizedHref
    });
  } else {
    event.preventDefault();
    // send a ReactGA event and then trigger a location change
    outboundLink({
      label: anonymizedHref
    });
  }
}
var StyledLink = styled.a(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  ", "\n  ", "\n"])), ClickableStyle, LinkStyle);
styled(Link)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  ", "\n  ", "\n"])), ClickableStyle, LinkStyle);

/**
 * Outbound link that handles firing google analytics events
 */
function ExternalLink(_ref14) {
  var _ref14$target = _ref14.target,
    target = _ref14$target === void 0 ? "_blank" : _ref14$target,
    href = _ref14.href,
    _ref14$rel = _ref14.rel,
    rel = _ref14$rel === void 0 ? "noopener noreferrer" : _ref14$rel,
    rest = _objectWithoutProperties(_ref14, _excluded);
  return /*#__PURE__*/React__default.createElement(StyledLink, _extends({
    target: target,
    rel: rel,
    href: href,
    onClick: handleClickExternalLink
  }, rest));
}
var TOOLTIP_WIDTH = 60;
var ToolTipWrapper = styled.div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: absolute;\n  left: ", ";\n  transform: translate(5px, 32px);\n  z-index: ", ";\n"])), function (_ref15) {
  var isCopyContractTooltip = _ref15.isCopyContractTooltip,
    tooltipX = _ref15.tooltipX;
  return isCopyContractTooltip && (tooltipX ? "".concat(tooltipX - TOOLTIP_WIDTH / 2, "px") : "50%");
}, Z_INDEX.tooltip);
var StyledTooltipTriangle = styled(SvgTooltipTriangle)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  path {\n    fill: ", ";\n  }\n"])), function (_ref16) {
  var theme = _ref16.theme;
  return theme.black;
});
var CopiedTooltip = styled.div(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  text-align: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n  line-height: ", ";\n\n  padding: ", ";\n  border-radius: 8px;\n\n  color: ", ";\n  font-size: 12px;\n"])), function (_ref17) {
  var theme = _ref17.theme;
  return theme.black;
}, function (_ref18) {
  var isCopyContractTooltip = _ref18.isCopyContractTooltip;
  return !isCopyContractTooltip && "".concat(TOOLTIP_WIDTH, "px");
}, function (_ref19) {
  var isCopyContractTooltip = _ref19.isCopyContractTooltip;
  return !isCopyContractTooltip && "32px";
}, function (_ref20) {
  var isCopyContractTooltip = _ref20.isCopyContractTooltip;
  return !isCopyContractTooltip && "32px";
}, function (_ref21) {
  var isCopyContractTooltip = _ref21.isCopyContractTooltip;
  return isCopyContractTooltip && "8px";
}, function (_ref22) {
  var theme = _ref22.theme;
  return theme.white;
});
function Tooltip(_ref23) {
  var isCopyContractTooltip = _ref23.isCopyContractTooltip,
    tooltipX = _ref23.tooltipX;
  return /*#__PURE__*/React__default.createElement(ToolTipWrapper, {
    isCopyContractTooltip: isCopyContractTooltip,
    tooltipX: tooltipX
  }, /*#__PURE__*/React__default.createElement(StyledTooltipTriangle, null), /*#__PURE__*/React__default.createElement(CopiedTooltip, {
    isCopyContractTooltip: isCopyContractTooltip
  }, "Copied!"));
}
var CopyIconWrapper = styled.div(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n  text-decoration: none;\n  cursor: pointer;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n"])));
function CopyToClipboard(_ref24) {
  var toCopy = _ref24.toCopy,
    children = _ref24.children;
  var _useCopyClipboard = useCopyClipboard(),
    _useCopyClipboard2 = _slicedToArray(_useCopyClipboard, 2),
    isCopied = _useCopyClipboard2[0],
    setCopied = _useCopyClipboard2[1];
  var copy = useCallback(function () {
    setCopied(toCopy);
  }, [toCopy, setCopied]);
  return /*#__PURE__*/React__default.createElement(CopyIconWrapper, {
    onClick: copy
  }, children, isCopied && /*#__PURE__*/React__default.createElement(Tooltip, {
    isCopyContractTooltip: false
  }));
}
function CopyLinkIcon(_ref25) {
  var toCopy = _ref25.toCopy;
  return /*#__PURE__*/React__default.createElement(CopyToClipboard, {
    toCopy: toCopy
  }, /*#__PURE__*/React__default.createElement(CopyIcon, null));
}
styled.span(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n  @media only screen and (max-width: ", ") {\n    display: none;\n  }\n"])), MOBILE_MEDIA_BREAKPOINT);
styled.span(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n  display: none;\n  @media only screen and (max-width: ", ") {\n    display: flex;\n  }\n"])), MOBILE_MEDIA_BREAKPOINT);
styled.div(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n  ", "\n  color: inherit;\n  stroke: inherit;\n  cursor: pointer;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  gap: 6px;\n  ", "\n"])), ClickableStyle, function (_ref26) {
  var theme = _ref26.theme,
    isClicked = _ref26.isClicked;
  return isClicked && "opacity: ".concat(theme.opacity.click, " !important");
});
styled.div(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n  align-items: center;\n  justify-content: center;\n  display: flex;\n"])));
var CopyHelperContainer = styled.div(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["\n  ", "\n  display: flex;\n  flex-direction: row;\n  gap: ", ";\n  align-items: center;\n  color: ", ";\n"])), ClickableStyle, function (_ref28) {
  var gap = _ref28.gap;
  return gap + "px";
}, function (_ref29) {
  var color = _ref29.color;
  return color !== null && color !== void 0 ? color : "inherit";
});
var CopyHelperText = styled.div(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["\n  ", "\n  ", ";\n  max-width: calc(100% - ", ");\n"])), EllipsisStyle, function (_ref30) {
  var fontSize = _ref30.fontSize;
  return fontSize ? "font-size: " + fontSize + "px" : "inherit";
}, function (_ref31) {
  var offset = _ref31.offset;
  return offset + "px";
});
var StyledCheckCircle = styled(CheckCircle)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["\n  color: ", ";\n  stroke-width: 1.5px;\n"])), function (_ref32) {
  var theme = _ref32.theme;
  return theme.success;
});
function isEllipsisActive(element) {
  return Boolean(element && element.offsetWidth < element.scrollWidth);
}
var CopyHelper = /*#__PURE__*/forwardRef(function (_ref33, ref) {
  var _ref33$InitialIcon = _ref33.InitialIcon,
    InitialIcon = _ref33$InitialIcon === void 0 ? Copy : _ref33$InitialIcon,
    _ref33$CopiedIcon = _ref33.CopiedIcon,
    CopiedIcon = _ref33$CopiedIcon === void 0 ? StyledCheckCircle : _ref33$CopiedIcon,
    toCopy = _ref33.toCopy,
    color = _ref33.color,
    fontSize = _ref33.fontSize,
    _ref33$iconSize = _ref33.iconSize,
    iconSize = _ref33$iconSize === void 0 ? 20 : _ref33$iconSize,
    _ref33$gap = _ref33.gap,
    gap = _ref33$gap === void 0 ? 4 : _ref33$gap,
    _ref33$iconPosition = _ref33.iconPosition,
    iconPosition = _ref33$iconPosition === void 0 ? "left" : _ref33$iconPosition,
    _ref33$iconColor = _ref33.iconColor,
    iconColor = _ref33$iconColor === void 0 ? "currentColor" : _ref33$iconColor,
    children = _ref33.children;
  var _useCopyClipboard5 = useCopyClipboard(),
    _useCopyClipboard6 = _slicedToArray(_useCopyClipboard5, 2),
    isCopied = _useCopyClipboard6[0],
    setCopied = _useCopyClipboard6[1];
  var copy = useCallback(function () {
    setCopied(toCopy);
  }, [toCopy, setCopied]);
  useImperativeHandle(ref, function () {
    return {
      forceCopy: function forceCopy() {
        copy();
      }
    };
  });

  // Detects is text is ellipsing in order to shorten gap caused by extra space browsers add after ... chars
  var textRef = useRef(null);
  var isEllipsis = isEllipsisActive(textRef.current);
  var displayGap = isEllipsis ? gap - 4 : gap;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isHover = _useState4[0],
    setIsHover = _useState4[1];
  var onHover = useCallback(function () {
    return setIsHover(true);
  }, []);
  var offHover = useCallback(function () {
    return setIsHover(false);
  }, []);

  // Copy-helpers w/ left icon always show icon & display "Copied!" in copied state
  // Copy-helpers w/ right icon show icon on hover & do not change text
  var showIcon = Boolean(iconPosition === "left" || isHover || isCopied);
  var Icon = isCopied ? CopiedIcon : showIcon ? InitialIcon : null;
  var offset = showIcon ? gap + iconSize : 0;
  return /*#__PURE__*/React__default.createElement(CopyHelperContainer, {
    onClick: copy,
    color: color,
    clicked: isCopied,
    gap: displayGap,
    onMouseEnter: onHover,
    onMouseLeave: offHover
  }, iconPosition === "left" && Icon && /*#__PURE__*/React__default.createElement(Icon, {
    size: iconSize,
    strokeWidth: 1.5,
    color: iconColor
  }), /*#__PURE__*/React__default.createElement(CopyHelperText, {
    ref: textRef,
    fontSize: fontSize,
    offset: offset
  }, isCopied && iconPosition === "left" ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "PiH3UR",
    message: "Copied!"
  }) : children), /*#__PURE__*/React__default.createElement("div", {
    style: {
      clear: "both"
    }
  }), iconPosition === "right" && Icon && /*#__PURE__*/React__default.createElement(Icon, {
    size: iconSize,
    strokeWidth: 1.5,
    color: iconColor
  }));
});
CopyHelper.displayName = "CopyHelper";
var rotate = keyframes(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var SpinnerCss = css(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["\n  animation: 2s ", " linear infinite;\n"])), rotate);
var Spinner = styled.img(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["\n  ", "\n  width: 16px;\n  height: 16px;\n"])), SpinnerCss);
var SpinnerSVG = styled.svg(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["\n  ", "\n"])), SpinnerCss);
styled(ArrowLeft)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref34) {
  var theme = _ref34.theme;
  return theme.neutral1;
});
var CustomLightSpinner = styled(Spinner)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["\n  height: ", ";\n  width: ", ";\n"])), function (_ref36) {
  var size = _ref36.size;
  return size;
}, function (_ref37) {
  var size = _ref37.size;
  return size;
});
var HideSmall = styled.span(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["\n  ", ";\n"])), function (_ref38) {
  var theme = _ref38.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["\n    display: none;\n  "])));
});
styled.span(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["\n  ", ";\n"])), function (_ref39) {
  var theme = _ref39.theme;
  return theme.deprecated_mediaWidth.deprecated_upToExtraSmall(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["\n    display: none;\n  "])));
});
var SmallOnly = styled.span(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["\n  display: none;\n  ", ";\n"])), function (_ref40) {
  var theme = _ref40.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["\n    display: block;\n  "])));
});
styled.span(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["\n  display: none;\n  @media (max-width: ", "px) {\n    display: block;\n  }\n"])), function (_ref41) {
  var theme = _ref41.theme;
  return theme.breakpoint.md;
});
var Separator = styled.div(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 1px;\n  background-color: ", ";\n"])), function (_ref42) {
  var theme = _ref42.theme;
  return theme.surface3;
});
var CautionTriangle = styled(AlertTriangle)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref43) {
  var theme = _ref43.theme;
  return theme.deprecated_accentWarning;
});
var Divider = styled.div(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 1px;\n  border-width: 0;\n  margin: 0;\n  background-color: ", ";\n"])), function (_ref44) {
  var theme = _ref44.theme;
  return theme.surface3;
});

export { ButtonText, CautionTriangle, ClickableStyle, CloseIcon, CopyHelper, CopyLinkIcon, CopyToClipboard, CustomLightSpinner, Divider, EllipsisStyle, ExternalLink, HideSmall, LinkStyledButton, Separator, SmallOnly, SpinnerSVG, StyledInternalLink, UniTokenAnimated };
