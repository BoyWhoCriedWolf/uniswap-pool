import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Percent } from '@uniswap/sdk-core';
import Expand from '../../Expand/index.js';
import QuestionHelper from '../../QuestionHelper/index.js';
import Row, { RowBetween } from '../../Row/index.js';
import React__default, { useState } from 'react';
import { useUserSlippageTolerance } from '../../../state/user/hooks.js';
import { SlippageTolerance } from '../../../state/user/types.js';
import styled from 'styled-components';
import { CautionTriangle } from '../../../theme/components/index.js';
import { useFormatter } from '../../../utils/formatNumbers.js';
import { InputContainer, Input } from '../Input/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2;
var SlippageError = /*#__PURE__*/function (SlippageError) {
  SlippageError["InvalidInput"] = "InvalidInput";
  return SlippageError;
}(SlippageError || {});
var Option = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: auto;\n  cursor: pointer;\n  padding: 6px 12px;\n  text-align: center;\n  gap: 4px;\n  border-radius: 12px;\n  background: ", ";\n  pointer-events: ", ";\n"])), function (_ref) {
  var isActive = _ref.isActive,
    theme = _ref.theme;
  return isActive ? theme.surface3 : "transparent";
}, function (_ref2) {
  var isActive = _ref2.isActive;
  return isActive && "none";
});
var Switch = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: auto;\n  padding: 4px;\n  border: 1px solid ", ";\n  border-radius: 16px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var NUMBER_WITH_MAX_TWO_DECIMAL_PLACES = /^(?:\d*\.\d{0,2}|\d+)$/;
var MINIMUM_RECOMMENDED_SLIPPAGE = new Percent(5, 10000);
var MAXIMUM_RECOMMENDED_SLIPPAGE = new Percent(1, 100);
function useFormatSlippageInput() {
  var _useFormatter = useFormatter(),
    formatSlippage = _useFormatter.formatSlippage;
  return function (slippage) {
    return formatSlippage(slippage).slice(0, -1);
  }; // remove % sign
}

function MaxSlippageSettings(_ref4) {
  var autoSlippage = _ref4.autoSlippage;
  var _useUserSlippageToler = useUserSlippageTolerance(),
    _useUserSlippageToler2 = _slicedToArray(_useUserSlippageToler, 2),
    userSlippageTolerance = _useUserSlippageToler2[0],
    setUserSlippageTolerance = _useUserSlippageToler2[1];
  var _useFormatter2 = useFormatter(),
    formatSlippage = _useFormatter2.formatSlippage;
  var formatSlippageInput = useFormatSlippageInput();

  // In order to trigger `custom` mode, we need to set `userSlippageTolerance` to a value that is not `auto`.
  // To do so, we use `autoSlippage` value. However, since users are likely to change that value,
  // we render it as a placeholder instead of a value.
  var defaultSlippageInputValue = userSlippageTolerance !== SlippageTolerance.Auto && !userSlippageTolerance.equalTo(autoSlippage) ? formatSlippageInput(userSlippageTolerance) : "";

  // If user has previously entered a custom slippage, we want to show that value in the input field
  // instead of a placeholder.
  var _useState = useState(defaultSlippageInputValue),
    _useState2 = _slicedToArray(_useState, 2),
    slippageInput = _useState2[0],
    setSlippageInput = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    slippageError = _useState4[0],
    setSlippageError = _useState4[1];

  // If user has previously entered a custom slippage, we want to show the settings expanded by default.
  var _useState5 = useState(defaultSlippageInputValue.length > 0),
    _useState6 = _slicedToArray(_useState5, 2),
    isOpen = _useState6[0],
    setIsOpen = _useState6[1];
  var parseSlippageInput = function parseSlippageInput(value) {
    // Do not allow non-numerical characters in the input field or more than two decimals
    if (value.length > 0 && !NUMBER_WITH_MAX_TWO_DECIMAL_PLACES.test(value)) {
      return;
    }
    setSlippageInput(value);
    setSlippageError(false);

    // If the input is empty, set the slippage to the default
    if (value.length === 0) {
      setUserSlippageTolerance(SlippageTolerance.Auto);
      return;
    }
    if (value === ".") {
      return;
    }

    // Parse user input and set the slippage if valid, error otherwise
    try {
      var parsed = Math.floor(Number.parseFloat(value) * 100);
      if (parsed > 5000) {
        setSlippageError(SlippageError.InvalidInput);
      } else {
        setUserSlippageTolerance(new Percent(parsed, 10000));
      }
    } catch (e) {
      setSlippageError(SlippageError.InvalidInput);
    }
  };
  var tooLow = userSlippageTolerance !== SlippageTolerance.Auto && userSlippageTolerance.lessThan(MINIMUM_RECOMMENDED_SLIPPAGE);
  var tooHigh = userSlippageTolerance !== SlippageTolerance.Auto && userSlippageTolerance.greaterThan(MAXIMUM_RECOMMENDED_SLIPPAGE);
  return /*#__PURE__*/React__default.createElement(Expand, {
    testId: "max-slippage-settings",
    isOpen: isOpen,
    onToggle: function onToggle() {
      return setIsOpen(!isOpen);
    },
    header: /*#__PURE__*/React__default.createElement(Row, {
      width: "auto"
    }, /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "KtLldi",
      message: "Max. slippage"
    })), /*#__PURE__*/React__default.createElement(QuestionHelper, {
      text: /*#__PURE__*/React__default.createElement(Trans, {
        id: "gXdBQ2",
        message: "Your transaction will revert if the price changes unfavorably by more than this percentage."
      })
    })),
    button: /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, userSlippageTolerance === SlippageTolerance.Auto ? /*#__PURE__*/React__default.createElement(Trans, {
      id: "R9Khdg",
      message: "Auto"
    }) : formatSlippage(userSlippageTolerance))
  }, /*#__PURE__*/React__default.createElement(RowBetween, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(Switch, null, /*#__PURE__*/React__default.createElement(Option, {
    onClick: function onClick() {
      // Reset the input field when switching to auto
      setSlippageInput("");
      setUserSlippageTolerance(SlippageTolerance.Auto);
    },
    isActive: userSlippageTolerance === SlippageTolerance.Auto
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "R9Khdg",
    message: "Auto"
  }))), /*#__PURE__*/React__default.createElement(Option, {
    onClick: function onClick() {
      // When switching to custom slippage, use `auto` value as a default.
      setUserSlippageTolerance(autoSlippage);
    },
    isActive: userSlippageTolerance !== SlippageTolerance.Auto
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "8Tg/JR",
    message: "Custom"
  })))), /*#__PURE__*/React__default.createElement(InputContainer, {
    gap: "md",
    error: !!slippageError
  }, /*#__PURE__*/React__default.createElement(Input, {
    "data-testid": "slippage-input",
    placeholder: formatSlippageInput(autoSlippage),
    value: slippageInput,
    onChange: function onChange(e) {
      return parseSlippageInput(e.target.value);
    },
    onBlur: function onBlur() {
      // When the input field is blurred, reset the input field to the default value
      setSlippageInput(defaultSlippageInputValue);
      setSlippageError(false);
    }
  }), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, "%"))), tooLow || tooHigh ? /*#__PURE__*/React__default.createElement(RowBetween, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(CautionTriangle, null), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "deprecated_accentWarning"
  }, tooLow ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "tElbXW",
    message: "Slippage below {0} may result in a failed transaction",
    values: {
      "0": formatSlippage(MINIMUM_RECOMMENDED_SLIPPAGE)
    }
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "+DFtUf",
    message: "Your transaction may be frontrun and result in an unfavorable trade."
  }))) : null);
}

export { MaxSlippageSettings as default };
