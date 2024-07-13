import React__default, { useState, useEffect, useRef } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Trace, sendAnalyticsEvent } from '../../analytics/index.js';
import { Column } from '../../components/Column/index.js';
import UniswapXBrandMark from '../../components/Logo/UniswapXBrandMark.js';
import { Arrow } from '../../components/Popover/index.js';
import UniswapXRouterLabel from '../../components/RouterLabel/UniswapXRouterLabel.js';
import Row from '../../components/Row/index.js';
import { SwapOptInSmallContainer, SwapMustache, UniswapXShine, SwapMustacheShadow, UniswapXOptInLargeContainerPositioner, UniswapXOptInLargeContainer, UniswapPopoverContainer } from '../../components/swap/styled.js';
import { formatCommonPropertiesForTrade } from '../../lib/utils/analytics.js';
import { X } from 'react-feather';
import { Text } from 'rebass';
import { useAppDispatch } from '../../state/hooks.js';
import { RouterPreference } from '../../state/routing/types.js';
import { isClassicTrade } from '../../state/routing/utils.js';
import { useUserDisabledUniswapX, useRouterPreference } from '../../state/user/hooks.js';
import { updateDisabledUniswapX } from '../../state/user/reducer.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var UniswapXOptIn = function UniswapXOptIn(props) {
  var _props$swapInfo = props.swapInfo,
    trade = _props$swapInfo.trade.trade,
    allowedSlippage = _props$swapInfo.allowedSlippage;
  var userDisabledUniswapX = useUserDisabledUniswapX();
  var isOnClassic = Boolean(trade && isClassicTrade(trade) && trade.isUniswapXBetter && !userDisabledUniswapX);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hasEverShown = _useState2[0],
    setHasEverShown = _useState2[1];
  if (isOnClassic && !hasEverShown) {
    setHasEverShown(true);
  }

  // avoid some work if never needed to show
  if (!hasEverShown) {
    return null;
  }
  return /*#__PURE__*/React__default.createElement(Trace, {
    shouldLogImpression: true,
    name: "UniswapX Opt In Impression",
    properties: trade ? formatCommonPropertiesForTrade(trade, allowedSlippage) : undefined
  }, /*#__PURE__*/React__default.createElement(OptInContents, _extends({
    isOnClassic: isOnClassic
  }, props)));
};
var OptInContents = function OptInContents(_ref) {
  var swapInfo = _ref.swapInfo,
    isOnClassic = _ref.isOnClassic,
    isSmall = _ref.isSmall;
  var trade = swapInfo.trade.trade,
    allowedSlippage = swapInfo.allowedSlippage;
  var _useRouterPreference = useRouterPreference(),
    _useRouterPreference2 = _slicedToArray(_useRouterPreference, 2),
    setRouterPreference = _useRouterPreference2[1];
  var dispatch = useAppDispatch();
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showYoureIn = _useState4[0],
    setShowYoureIn = _useState4[1];
  var isVisible = isOnClassic;

  // adding this as we need to mount and then set shouldAnimate = true after it mounts to avoid a flicker on initial mount
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    shouldAnimate = _useState6[0],
    setShouldAnimate = _useState6[1];
  useEffect(function () {
    if (!isVisible || shouldAnimate) return;
    // delay visible animation a bit
    var tm = setTimeout(function () {
      return setShouldAnimate(true);
    }, 350);
    return function () {
      return clearTimeout(tm);
    };
  }, [isVisible, shouldAnimate]);
  var tryItNowElement = /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, {
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
      sendAnalyticsEvent("UniswapX Opt In Toggled", _objectSpread(_objectSpread({}, formatCommonPropertiesForTrade(trade, allowedSlippage)), {}, {
        new_preference: RouterPreference.X
      }));
      setRouterPreference(RouterPreference.X);
    },
    style: {
      cursor: "pointer"
    }
  }, "Try it now");
  var containerRef = useRef();
  if (isSmall) {
    return /*#__PURE__*/React__default.createElement(SwapOptInSmallContainer, {
      ref: containerRef,
      visible: isVisible,
      shouldAnimate: shouldAnimate
    }, /*#__PURE__*/React__default.createElement(SwapMustache, null, /*#__PURE__*/React__default.createElement(UniswapXShine, null), /*#__PURE__*/React__default.createElement(SwapMustacheShadow, null), /*#__PURE__*/React__default.createElement(Row, {
      justify: "space-between",
      align: "center",
      flexWrap: "wrap"
    }, /*#__PURE__*/React__default.createElement(Text, {
      fontSize: 14,
      fontWeight: 485,
      lineHeight: "20px"
    }, /*#__PURE__*/React__default.createElement(Trans, {
      id: "VbTuR5",
      message: "Try gas free swaps with the"
    }), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(UniswapXBrandMark, {
      fontWeight: "bold",
      style: {
        transform: "translateY(1px)",
        margin: "0 2px"
      }
    }), " ", /*#__PURE__*/React__default.createElement(Trans, {
      id: "YBt9YP",
      message: "Beta"
    })), tryItNowElement)));
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(UniswapXOptInPopover, {
    shiny: true,
    visible: isVisible && !showYoureIn
  }, /*#__PURE__*/React__default.createElement(CloseIcon, {
    size: 18,
    onClick: function onClick() {
      if (!trade) return;
      sendAnalyticsEvent("UniswapX Opt In Toggled", _objectSpread(_objectSpread({}, formatCommonPropertiesForTrade(trade, allowedSlippage)), {}, {
        new_preference: RouterPreference.API
      }));
      setRouterPreference(RouterPreference.API);
      dispatch(updateDisabledUniswapX({
        disabledUniswapX: true
      }));
    }
  }), /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(Text, {
    fontSize: 14,
    fontWeight: 485,
    lineHeight: "20px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "+vJ0dp",
    message: "Try the"
  }), " ", /*#__PURE__*/React__default.createElement(UniswapXBrandMark, {
    fontWeight: "bold",
    style: {
      transform: "translateY(2px)",
      margin: "0 1px"
    }
  }), " ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "YBt9YP",
    message: "Beta"
  }), /*#__PURE__*/React__default.createElement("ul", {
    style: {
      margin: "5px 0 12px 24px",
      lineHeight: "24px",
      padding: 0
    }
  }, /*#__PURE__*/React__default.createElement("li", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EKgVpi",
    message: "Gas free swaps"
  })), /*#__PURE__*/React__default.createElement("li", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "qqaqnW",
    message: "MEV protection"
  })), /*#__PURE__*/React__default.createElement("li", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "A2PGmg",
    message: "Better prices and more liquidity"
  }))))), tryItNowElement), /*#__PURE__*/React__default.createElement(UniswapXOptInPopover, {
    visible: showYoureIn
  }, /*#__PURE__*/React__default.createElement(UniswapXRouterLabel, {
    disableTextGradient: true
  }, /*#__PURE__*/React__default.createElement(Text, {
    fontSize: 14,
    fontWeight: 535,
    lineHeight: "20px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "lVV20z",
    message: "You're in!"
  }))), /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, {
    style: {
      marginTop: 8
    },
    fontSize: 14
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Pb/2Uw",
    message: "You can turn it off at anytime in settings"
  }))));
};
var UniswapXOptInPopover = function UniswapXOptInPopover(props) {
  return (
    /*#__PURE__*/
    // positioner ensures no matter the height of the inner content
    // it sits at the same position from the top of the swap area
    React__default.createElement(UniswapXOptInLargeContainerPositioner, null, /*#__PURE__*/React__default.createElement(UniswapXOptInLargeContainer, {
      visible: props.visible
    }, /*#__PURE__*/React__default.createElement(Arrow, {
      className: "arrow-right",
      style: {
        position: "absolute",
        bottom: "50%",
        left: -3.5,
        zIndex: 100
      }
    }), /*#__PURE__*/React__default.createElement(UniswapPopoverContainer, null, props.shiny && /*#__PURE__*/React__default.createElement(UniswapXShine, {
      style: {
        zIndex: 0
      }
    }), props.children)))
  );
};
var CloseIcon = styled(X)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  cursor: pointer;\n  position: absolute;\n  top: 14px;\n  right: 14px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral3;
});

export { UniswapXOptIn };
