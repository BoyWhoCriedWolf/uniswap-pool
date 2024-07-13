'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var analyticsEvents = require('@uniswap/analytics-events');
var index$2 = require('../../analytics/index.cjs');
var index = require('../Common/index.cjs');
var useDisableScrolling = require('../../hooks/useDisableScrolling.cjs');
var usePrevious = require('../../hooks/usePrevious.cjs');
var useWindowSize = require('../../hooks/useWindowSize.cjs');
var jotai = require('jotai');
var utils = require('jotai/utils');
var reactFeather = require('react-feather');
var reactUseGesture = require('react-use-gesture');
var styled = require('styled-components');
var index$3 = require('../../theme/index.cjs');
var index$1 = require('../../theme/components/index.cjs');
var zIndex = require('../../theme/zIndex.cjs');
var userAgent = require('../../utils/userAgent.cjs');
var DefaultMenu = require('./DefaultMenu.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DRAWER_WIDTH_XL = "390px";
var DRAWER_WIDTH = "320px";
var DRAWER_MARGIN = "8px";
var DRAWER_OFFSET = "10px";
var DRAWER_TOP_MARGIN_MOBILE_WEB = "72px";
var accountDrawerOpenAtom = jotai.atom(false);
function useToggleAccountDrawer() {
  var updateAccountDrawerOpen = utils.useUpdateAtom(accountDrawerOpenAtom);
  return React.useCallback(function () {
    updateAccountDrawerOpen(function (open) {
      return !open;
    });
  }, [updateAccountDrawerOpen]);
}
function useCloseAccountDrawer() {
  var updateAccountDrawerOpen = utils.useUpdateAtom(accountDrawerOpenAtom);
  return React.useCallback(function () {
    return updateAccountDrawerOpen(false);
  }, [updateAccountDrawerOpen]);
}
function useAccountDrawer() {
  var accountDrawerOpen = utils.useAtomValue(accountDrawerOpenAtom);
  return [accountDrawerOpen, useToggleAccountDrawer()];
}
var ScrimBackground = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  z-index: ", ";\n  overflow: hidden;\n  top: 0;\n  left: 0;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n\n  opacity: 0;\n  pointer-events: none;\n  @media only screen and (max-width: ", ") {\n    opacity: ", ";\n    pointer-events: ", ";\n    transition: opacity ", "\n      ease-in-out;\n  }\n"])), zIndex.Z_INDEX.modalBackdrop, function (_ref) {
  var theme = _ref.theme;
  return theme.scrim;
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
}, function (_ref3) {
  var $open = _ref3.$open;
  return $open ? 1 : 0;
}, function (_ref4) {
  var $open = _ref4.$open;
  return $open ? "auto" : "none";
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.transition.duration.medium;
});
var Scrim = function Scrim(props) {
  var _useWindowSize = useWindowSize.useWindowSize(),
    width = _useWindowSize.width;
  React.useEffect(function () {
    if (width && width < index$3.BREAKPOINTS.sm && props.$open) document.body.style.overflow = "hidden";
    return function () {
      document.body.style.overflow = "visible";
    };
  }, [props.$open, width]);
  return /*#__PURE__*/React__default["default"].createElement(ScrimBackground, props);
};
var AccountDrawerScrollWrapper = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  overflow: hidden;\n  &:hover {\n    overflow-y: auto;\n  }\n\n  ", "\n\n  scrollbar-gutter: stable;\n  overscroll-behavior: contain;\n  border-radius: 12px;\n"])), index.ScrollBarStyles);
var Container = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: row;\n  height: calc(100% - 2 * ", ");\n  overflow: hidden;\n  position: fixed;\n  right: ", ";\n  top: ", ";\n  z-index: ", ";\n\n  @media only screen and (max-width: ", ") {\n    top: 100vh;\n    left: 0;\n    right: 0;\n    width: 100%;\n    overflow: visible;\n  }\n"])), DRAWER_MARGIN, DRAWER_MARGIN, DRAWER_MARGIN, zIndex.Z_INDEX.fixed, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var AccountDrawerWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  margin-right: ", ";\n  height: 100%;\n  overflow: hidden;\n\n  @media only screen and (max-width: ", ") {\n    z-index: ", ";\n    position: absolute;\n    margin-right: 0;\n    top: ", ";\n\n    width: 100%;\n    border-bottom-right-radius: 0px;\n    border-bottom-left-radius: 0px;\n    box-shadow: unset;\n    transition: top ", ";\n  }\n\n  @media screen and (min-width: 1440px) {\n    margin-right: ", ";\n    width: ", ";\n  }\n\n  border-radius: 12px;\n  width: ", ";\n  font-size: 16px;\n  background-color: ", ";\n  border: ", ";\n\n  box-shadow: ", ";\n  transition: margin-right ", ";\n"])), function (_ref7) {
  var open = _ref7.open;
  return open ? 0 : "-" + DRAWER_WIDTH;
}, function (_ref8) {
  var theme = _ref8.theme;
  return "".concat(theme.breakpoint.sm, "px");
}, zIndex.Z_INDEX.modal, function (_ref9) {
  var open = _ref9.open;
  return open ? "calc(-1 * (100% - ".concat(DRAWER_TOP_MARGIN_MOBILE_WEB, "))") : 0;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.transition.duration.medium;
}, function (_ref11) {
  var open = _ref11.open;
  return open ? 0 : "-".concat(DRAWER_WIDTH_XL);
}, DRAWER_WIDTH_XL, DRAWER_WIDTH, function (_ref12) {
  var theme = _ref12.theme;
  return theme.surface1;
}, function (_ref13) {
  var theme = _ref13.theme;
  return "1px solid ".concat(theme.surface3);
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.deprecated_deepShadow;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.transition.duration.medium;
});
var CloseIcon = styled__default["default"](reactFeather.ChevronsRight).attrs({
  size: 24
})(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  stroke: ", ";\n"])), function (_ref16) {
  var theme = _ref16.theme;
  return theme.neutral2;
});
var CloseDrawer = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  cursor: pointer;\n  height: 100%;\n  // When the drawer is not hovered, the icon should be 18px from the edge of the sidebar.\n  padding: 24px calc(18px + ", ") 24px 14px;\n  border-radius: 20px 0 0 20px;\n  transition: ", ";\n  &:hover {\n    z-index: -1;\n    margin: 0 -8px 0 0;\n    background-color: ", ";\n  }\n  @media only screen and (max-width: ", ") {\n    display: none;\n  }\n"])), index$1.ClickableStyle, DRAWER_OFFSET, function (_ref17) {
  var theme = _ref17.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " background-color, ").concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " margin");
}, function (_ref18) {
  var theme = _ref18.theme;
  return theme.deprecated_stateOverlayHover;
}, function (_ref19) {
  var theme = _ref19.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
function AccountDrawer() {
  var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref20$onShowNftProfi = _ref20.onShowNftProfile,
    onShowNftProfile = _ref20$onShowNftProfi === void 0 ? function () {
      return null;
    } : _ref20$onShowNftProfi;
  var _useAccountDrawer = useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray__default["default"](_useAccountDrawer, 2),
    walletDrawerOpen = _useAccountDrawer2[0],
    toggleWalletDrawer = _useAccountDrawer2[1];
  var wasWalletDrawerOpen = usePrevious(walletDrawerOpen);
  var scrollRef = React.useRef(null);
  React.useEffect(function () {
    if (wasWalletDrawerOpen && !walletDrawerOpen) {
      var _scrollRef$current;
      (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 || _scrollRef$current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [walletDrawerOpen, wasWalletDrawerOpen]);

  // close on escape keypress
  React.useEffect(function () {
    var escapeKeyDownHandler = function escapeKeyDownHandler(event) {
      if (event.key === "Escape" && walletDrawerOpen) {
        event.preventDefault();
        toggleWalletDrawer();
      }
    };
    document.addEventListener("keydown", escapeKeyDownHandler);
    return function () {
      document.removeEventListener("keydown", escapeKeyDownHandler);
    };
  }, [walletDrawerOpen, toggleWalletDrawer]);

  // useStates for detecting swipe gestures
  var _useState = React.useState(0),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    yPosition = _useState2[0],
    setYPosition = _useState2[1];
  var _useState3 = React.useState(true),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    dragStartTop = _useState4[0],
    setDragStartTop = _useState4[1];
  useDisableScrolling(walletDrawerOpen);

  // useGesture hook for detecting swipe gestures
  var bind = reactUseGesture.useGesture({
    // if the drawer is open and the user is dragging down, close the drawer
    onDrag: function onDrag(state) {
      // if the user is dragging up, set dragStartTop to false
      if (state.movement[1] < 0) {
        setDragStartTop(false);
        if (scrollRef.current) {
          scrollRef.current.style.overflowY = "auto";
        }
      } else if ((state.movement[1] > 300 || state.velocity > 3 && state.direction[1] > 0) && walletDrawerOpen && dragStartTop) {
        toggleWalletDrawer();
      } else if (walletDrawerOpen && dragStartTop && state.movement[1] > 0) {
        setYPosition(state.movement[1]);
        if (scrollRef.current) {
          scrollRef.current.style.overflowY = "hidden";
        }
      }
    },
    // reset the yPosition when the user stops dragging
    onDragEnd: function onDragEnd() {
      setYPosition(0);
      if (scrollRef.current) {
        scrollRef.current.style.overflowY = "auto";
      }
    },
    // set dragStartTop to true if the user starts dragging from the top of the drawer
    onDragStart: function onDragStart() {
      var _scrollRef$current2, _scrollRef$current3;
      if (!((_scrollRef$current2 = scrollRef.current) !== null && _scrollRef$current2 !== void 0 && _scrollRef$current2.scrollTop) || ((_scrollRef$current3 = scrollRef.current) === null || _scrollRef$current3 === void 0 ? void 0 : _scrollRef$current3.scrollTop) < 30) {
        setDragStartTop(true);
      } else {
        setDragStartTop(false);
        if (scrollRef.current) {
          scrollRef.current.style.overflowY = "auto";
        }
      }
    }
  });
  return /*#__PURE__*/React__default["default"].createElement(Container, null, walletDrawerOpen && /*#__PURE__*/React__default["default"].createElement(index$2.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.InterfaceEventName.MINI_PORTFOLIO_TOGGLED,
    properties: {
      type: "close"
    }
  }, /*#__PURE__*/React__default["default"].createElement(CloseDrawer, {
    onClick: toggleWalletDrawer,
    "data-testid": "close-account-drawer"
  }, /*#__PURE__*/React__default["default"].createElement(CloseIcon, null))), /*#__PURE__*/React__default["default"].createElement(Scrim, {
    onClick: toggleWalletDrawer,
    $open: walletDrawerOpen
  }), /*#__PURE__*/React__default["default"].createElement(AccountDrawerWrapper, _extends__default["default"]({
    open: walletDrawerOpen
  }, userAgent.isMobile ? _objectSpread(_objectSpread({}, bind()), {}, {
    style: {
      transform: "translateY(".concat(yPosition, "px)")
    }
  }) : {}), /*#__PURE__*/React__default["default"].createElement(AccountDrawerScrollWrapper, {
    ref: scrollRef,
    id: "wallet-dropdown-scroll-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement(DefaultMenu, {
    drawerOpen: walletDrawerOpen,
    onShowNftProfile: onShowNftProfile
  }))));
}

exports.Scrim = Scrim;
exports["default"] = AccountDrawer;
exports.useAccountDrawer = useAccountDrawer;
exports.useCloseAccountDrawer = useCloseAccountDrawer;
exports.useToggleAccountDrawer = useToggleAccountDrawer;
