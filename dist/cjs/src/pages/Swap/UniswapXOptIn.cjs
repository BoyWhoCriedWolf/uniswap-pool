'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../analytics/index.cjs');
var index$3 = require('../../components/Column/index.cjs');
var UniswapXBrandMark = require('../../components/Logo/UniswapXBrandMark.cjs');
var index$4 = require('../../components/Popover/index.cjs');
var UniswapXRouterLabel = require('../../components/RouterLabel/UniswapXRouterLabel.cjs');
var index$1 = require('../../components/Row/index.cjs');
var styled$1 = require('../../components/swap/styled.cjs');
var analytics = require('../../lib/utils/analytics.cjs');
var reactFeather = require('react-feather');
var rebass = require('rebass');
var hooks$1 = require('../../state/hooks.cjs');
var types = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');
var hooks = require('../../state/user/hooks.cjs');
var reducer = require('../../state/user/reducer.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var UniswapXOptIn = function UniswapXOptIn(props) {
  var _props$swapInfo = props.swapInfo,
    trade = _props$swapInfo.trade.trade,
    allowedSlippage = _props$swapInfo.allowedSlippage;
  var userDisabledUniswapX = hooks.useUserDisabledUniswapX();
  var isOnClassic = Boolean(trade && utils.isClassicTrade(trade) && trade.isUniswapXBetter && !userDisabledUniswapX);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    hasEverShown = _useState2[0],
    setHasEverShown = _useState2[1];
  if (isOnClassic && !hasEverShown) {
    setHasEverShown(true);
  }

  // avoid some work if never needed to show
  if (!hasEverShown) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(index.Trace, {
    shouldLogImpression: true,
    name: "UniswapX Opt In Impression",
    properties: trade ? analytics.formatCommonPropertiesForTrade(trade, allowedSlippage) : undefined
  }, /*#__PURE__*/React__default["default"].createElement(OptInContents, _extends__default["default"]({
    isOnClassic: isOnClassic
  }, props)));
};
var OptInContents = function OptInContents(_ref) {
  var swapInfo = _ref.swapInfo,
    isOnClassic = _ref.isOnClassic,
    isSmall = _ref.isSmall;
  var trade = swapInfo.trade.trade,
    allowedSlippage = swapInfo.allowedSlippage;
  var _useRouterPreference = hooks.useRouterPreference(),
    _useRouterPreference2 = _slicedToArray__default["default"](_useRouterPreference, 2),
    setRouterPreference = _useRouterPreference2[1];
  var dispatch = hooks$1.useAppDispatch();
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    showYoureIn = _useState4[0],
    setShowYoureIn = _useState4[1];
  var isVisible = isOnClassic;

  // adding this as we need to mount and then set shouldAnimate = true after it mounts to avoid a flicker on initial mount
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    shouldAnimate = _useState6[0],
    setShouldAnimate = _useState6[1];
  React.useEffect(function () {
    if (!isVisible || shouldAnimate) return;
    // delay visible animation a bit
    var tm = setTimeout(function () {
      return setShouldAnimate(true);
    }, 350);
    return function () {
      return clearTimeout(tm);
    };
  }, [isVisible, shouldAnimate]);
  var tryItNowElement = /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, {
    color: "accent1",
    fontSize: 14,
    fontWeight: "500",
    onClick: function onClick() {
      // slight delay before hiding
      setTimeout(function () {
        setShowYoureIn(true);
        setTimeout(function () {
          setShowYoureIn(false);
        }, 5000);
      }, 200);
      if (!trade) return;
      index.sendAnalyticsEvent("UniswapX Opt In Toggled", _objectSpread(_objectSpread({}, analytics.formatCommonPropertiesForTrade(trade, allowedSlippage)), {}, {
        new_preference: types.RouterPreference.X
      }));
      setRouterPreference(types.RouterPreference.X);
    },
    style: {
      cursor: "pointer"
    }
  }, "Try it now");
  var containerRef = React.useRef();
  if (isSmall) {
    return /*#__PURE__*/React__default["default"].createElement(styled$1.SwapOptInSmallContainer, {
      ref: containerRef,
      visible: isVisible,
      shouldAnimate: shouldAnimate
    }, /*#__PURE__*/React__default["default"].createElement(styled$1.SwapMustache, null, /*#__PURE__*/React__default["default"].createElement(styled$1.UniswapXShine, null), /*#__PURE__*/React__default["default"].createElement(styled$1.SwapMustacheShadow, null), /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
      justify: "space-between",
      align: "center",
      flexWrap: "wrap"
    }, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
      fontSize: 14,
      fontWeight: 485,
      lineHeight: "20px"
    }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "VbTuR5",
      message: "Try gas free swaps with the"
    }), /*#__PURE__*/React__default["default"].createElement("br", null), /*#__PURE__*/React__default["default"].createElement(UniswapXBrandMark, {
      fontWeight: "bold",
      style: {
        transform: "translateY(1px)",
        margin: "0 2px"
      }
    }), " ", /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "YBt9YP",
      message: "Beta"
    })), tryItNowElement)));
  }
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UniswapXOptInPopover, {
    shiny: true,
    visible: isVisible && !showYoureIn
  }, /*#__PURE__*/React__default["default"].createElement(CloseIcon, {
    size: 18,
    onClick: function onClick() {
      if (!trade) return;
      index.sendAnalyticsEvent("UniswapX Opt In Toggled", _objectSpread(_objectSpread({}, analytics.formatCommonPropertiesForTrade(trade, allowedSlippage)), {}, {
        new_preference: types.RouterPreference.API
      }));
      setRouterPreference(types.RouterPreference.API);
      dispatch(reducer.updateDisabledUniswapX({
        disabledUniswapX: true
      }));
    }
  }), /*#__PURE__*/React__default["default"].createElement(index$3.Column, null, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
    fontSize: 14,
    fontWeight: 485,
    lineHeight: "20px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "+vJ0dp",
    message: "Try the"
  }), " ", /*#__PURE__*/React__default["default"].createElement(UniswapXBrandMark, {
    fontWeight: "bold",
    style: {
      transform: "translateY(2px)",
      margin: "0 1px"
    }
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "YBt9YP",
    message: "Beta"
  }), /*#__PURE__*/React__default["default"].createElement("ul", {
    style: {
      margin: "5px 0 12px 24px",
      lineHeight: "24px",
      padding: 0
    }
  }, /*#__PURE__*/React__default["default"].createElement("li", null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "EKgVpi",
    message: "Gas free swaps"
  })), /*#__PURE__*/React__default["default"].createElement("li", null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "qqaqnW",
    message: "MEV protection"
  })), /*#__PURE__*/React__default["default"].createElement("li", null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "A2PGmg",
    message: "Better prices and more liquidity"
  }))))), tryItNowElement), /*#__PURE__*/React__default["default"].createElement(UniswapXOptInPopover, {
    visible: showYoureIn
  }, /*#__PURE__*/React__default["default"].createElement(UniswapXRouterLabel["default"], {
    disableTextGradient: true
  }, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
    fontSize: 14,
    fontWeight: 535,
    lineHeight: "20px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "lVV20z",
    message: "You're in!"
  }))), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, {
    style: {
      marginTop: 8
    },
    fontSize: 14
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Pb/2Uw",
    message: "You can turn it off at anytime in settings"
  }))));
};
var UniswapXOptInPopover = function UniswapXOptInPopover(props) {
  return (
    /*#__PURE__*/
    // positioner ensures no matter the height of the inner content
    // it sits at the same position from the top of the swap area
    React__default["default"].createElement(styled$1.UniswapXOptInLargeContainerPositioner, null, /*#__PURE__*/React__default["default"].createElement(styled$1.UniswapXOptInLargeContainer, {
      visible: props.visible
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Arrow, {
      className: "arrow-right",
      style: {
        position: "absolute",
        bottom: "50%",
        left: -3.5,
        zIndex: 100
      }
    }), /*#__PURE__*/React__default["default"].createElement(styled$1.UniswapPopoverContainer, null, props.shiny && /*#__PURE__*/React__default["default"].createElement(styled$1.UniswapXShine, {
      style: {
        zIndex: 0
      }
    }), props.children)))
  );
};
var CloseIcon = styled__default["default"](reactFeather.X)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  cursor: pointer;\n  position: absolute;\n  top: 14px;\n  right: 14px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral3;
});

exports.UniswapXOptIn = UniswapXOptIn;
