import React__default, { useState, useCallback, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ButtonGray } from '../Button/index.js';
import { OutlineCard } from '../Card/index.js';
import { AutoColumn } from '../Column/index.js';
import { Plus, Minus } from 'react-feather';
import styled, { keyframes } from 'styled-components';
import '../../theme/components/index.js';
import { Input as MemoizedInput } from '../NumericalInput/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var pulse = function pulse(color) {
  return keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0% {\n    box-shadow: 0 0 0 0 ", ";\n  }\n\n  70% {\n    box-shadow: 0 0 0 2px ", ";\n  }\n\n  100% {\n    box-shadow: 0 0 0 0 ", ";\n  }\n"])), color, color, color);
};
var InputRow = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n"])));
var SmallButton = styled(ButtonGray)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-radius: 8px;\n  padding: 4px;\n"])));
var FocusedOutlineCard = styled(OutlineCard)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-color: ", ";\n  padding: 12px;\n  animation: ", " 0.8s\n    linear;\n"])), function (_ref) {
  var active = _ref.active,
    theme = _ref.theme;
  return active && theme.deprecated_stateOverlayPressed;
}, function (_ref2) {
  var pulsing = _ref2.pulsing,
    theme = _ref2.theme;
  return pulsing && pulse(theme.accent1);
});
var StyledInput = styled(MemoizedInput)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  background-color: transparent;\n  font-weight: 535;\n  text-align: left;\n  width: 100%;\n\n  ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    font-size: 16px;\n  "])));
});
var InputColumn = styled(AutoColumn)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 100%;\n"])));
var InputTitle = styled(ThemedText.DeprecatedSmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 12px;\n  font-weight: 535;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral2;
});
var ButtonLabel = styled(ThemedText.DeprecatedWhite)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  color: ", " !important;\n  display: flex;\n"])), function (_ref5) {
  var theme = _ref5.theme,
    disabled = _ref5.disabled;
  return disabled ? theme.neutral2 : theme.neutral1;
});
var StepCounter = function StepCounter(_ref6) {
  var value = _ref6.value,
    decrement = _ref6.decrement,
    increment = _ref6.increment,
    _ref6$decrementDisabl = _ref6.decrementDisabled,
    decrementDisabled = _ref6$decrementDisabl === void 0 ? false : _ref6$decrementDisabl,
    _ref6$incrementDisabl = _ref6.incrementDisabled,
    incrementDisabled = _ref6$incrementDisabl === void 0 ? false : _ref6$incrementDisabl,
    width = _ref6.width,
    locked = _ref6.locked,
    onUserInput = _ref6.onUserInput,
    title = _ref6.title,
    tokenA = _ref6.tokenA,
    tokenB = _ref6.tokenB;
  //  for focus state, styled components doesnt let you select input parent container
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];

  // let user type value and only update parent value on blur
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    localValue = _useState4[0],
    setLocalValue = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    useLocalValue = _useState6[0],
    setUseLocalValue = _useState6[1];

  // animation if parent value updates local value
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    pulsing = _useState8[0],
    setPulsing = _useState8[1];
  var handleOnFocus = function handleOnFocus() {
    setUseLocalValue(true);
    setActive(true);
  };
  var handleOnBlur = useCallback(function () {
    setUseLocalValue(false);
    setActive(false);
    onUserInput(localValue); // trigger update on parent value
  }, [localValue, onUserInput]);

  // for button clicks
  var handleDecrement = useCallback(function () {
    setUseLocalValue(false);
    onUserInput(decrement());
  }, [decrement, onUserInput]);
  var handleIncrement = useCallback(function () {
    setUseLocalValue(false);
    onUserInput(increment());
  }, [increment, onUserInput]);
  useEffect(function () {
    if (localValue !== value && !useLocalValue) {
      setTimeout(function () {
        setLocalValue(value); // reset local value to match parent
        setPulsing(true); // trigger animation
        setTimeout(function () {
          setPulsing(false);
        }, 1800);
      }, 0);
    }
  }, [localValue, useLocalValue, value]);
  return /*#__PURE__*/React__default.createElement(FocusedOutlineCard, {
    pulsing: pulsing,
    active: active,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    width: width
  }, /*#__PURE__*/React__default.createElement(InputRow, null, /*#__PURE__*/React__default.createElement(InputColumn, {
    justify: "flex-start"
  }, /*#__PURE__*/React__default.createElement(InputTitle, {
    fontSize: 12,
    textAlign: "center"
  }, title), /*#__PURE__*/React__default.createElement(StyledInput, {
    className: "rate-input-0",
    value: localValue,
    fontSize: "20px",
    disabled: locked,
    onUserInput: function onUserInput(val) {
      setLocalValue(val);
    }
  }), /*#__PURE__*/React__default.createElement(InputTitle, {
    fontSize: 12,
    textAlign: "left"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "1/LP4K",
    message: "{tokenB} per {tokenA}",
    values: {
      tokenB: tokenB,
      tokenA: tokenA
    }
  }))), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "8px"
  }, !locked && /*#__PURE__*/React__default.createElement(SmallButton, {
    "data-testid": "increment-price-range",
    onClick: handleIncrement,
    disabled: incrementDisabled
  }, /*#__PURE__*/React__default.createElement(ButtonLabel, {
    disabled: incrementDisabled,
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Plus, {
    size: 18
  }))), !locked && /*#__PURE__*/React__default.createElement(SmallButton, {
    "data-testid": "decrement-price-range",
    onClick: handleDecrement,
    disabled: decrementDisabled
  }, /*#__PURE__*/React__default.createElement(ButtonLabel, {
    disabled: decrementDisabled,
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Minus, {
    size: 18
  }))))));
};

export { StepCounter as default };
