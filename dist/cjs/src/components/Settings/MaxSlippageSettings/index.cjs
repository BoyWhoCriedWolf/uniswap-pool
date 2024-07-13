'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var index$1 = require('../../Expand/index.cjs');
var index$3 = require('../../QuestionHelper/index.cjs');
var index = require('../../Row/index.cjs');
var React = require('react');
var hooks = require('../../../state/user/hooks.cjs');
var types = require('../../../state/user/types.cjs');
var styled = require('styled-components');
var index$5 = require('../../../theme/components/index.cjs');
var formatNumbers = require('../../../utils/formatNumbers.cjs');
var index$4 = require('../Input/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var SlippageError = /*#__PURE__*/function (SlippageError) {
  SlippageError["InvalidInput"] = "InvalidInput";
  return SlippageError;
}(SlippageError || {});
var Option = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: auto;\n  cursor: pointer;\n  padding: 6px 12px;\n  text-align: center;\n  gap: 4px;\n  border-radius: 12px;\n  background: ", ";\n  pointer-events: ", ";\n"])), function (_ref) {
  var isActive = _ref.isActive,
    theme = _ref.theme;
  return isActive ? theme.surface3 : "transparent";
}, function (_ref2) {
  var isActive = _ref2.isActive;
  return isActive && "none";
});
var Switch = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: auto;\n  padding: 4px;\n  border: 1px solid ", ";\n  border-radius: 16px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var NUMBER_WITH_MAX_TWO_DECIMAL_PLACES = /^(?:\d*\.\d{0,2}|\d+)$/;
var MINIMUM_RECOMMENDED_SLIPPAGE = new sdkCore.Percent(5, 10000);
var MAXIMUM_RECOMMENDED_SLIPPAGE = new sdkCore.Percent(1, 100);
function useFormatSlippageInput() {
  var _useFormatter = formatNumbers.useFormatter(),
    formatSlippage = _useFormatter.formatSlippage;
  return function (slippage) {
    return formatSlippage(slippage).slice(0, -1);
  }; // remove % sign
}

function MaxSlippageSettings(_ref4) {
  var autoSlippage = _ref4.autoSlippage;
  var _useUserSlippageToler = hooks.useUserSlippageTolerance(),
    _useUserSlippageToler2 = _slicedToArray__default["default"](_useUserSlippageToler, 2),
    userSlippageTolerance = _useUserSlippageToler2[0],
    setUserSlippageTolerance = _useUserSlippageToler2[1];
  var _useFormatter2 = formatNumbers.useFormatter(),
    formatSlippage = _useFormatter2.formatSlippage;
  var formatSlippageInput = useFormatSlippageInput();

  // In order to trigger `custom` mode, we need to set `userSlippageTolerance` to a value that is not `auto`.
  // To do so, we use `autoSlippage` value. However, since users are likely to change that value,
  // we render it as a placeholder instead of a value.
  var defaultSlippageInputValue = userSlippageTolerance !== types.SlippageTolerance.Auto && !userSlippageTolerance.equalTo(autoSlippage) ? formatSlippageInput(userSlippageTolerance) : "";

  // If user has previously entered a custom slippage, we want to show that value in the input field
  // instead of a placeholder.
  var _useState = React.useState(defaultSlippageInputValue),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    slippageInput = _useState2[0],
    setSlippageInput = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    slippageError = _useState4[0],
    setSlippageError = _useState4[1];

  // If user has previously entered a custom slippage, we want to show the settings expanded by default.
  var _useState5 = React.useState(defaultSlippageInputValue.length > 0),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
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
      setUserSlippageTolerance(types.SlippageTolerance.Auto);
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
        setUserSlippageTolerance(new sdkCore.Percent(parsed, 10000));
      }
    } catch (e) {
      setSlippageError(SlippageError.InvalidInput);
    }
  };
  var tooLow = userSlippageTolerance !== types.SlippageTolerance.Auto && userSlippageTolerance.lessThan(MINIMUM_RECOMMENDED_SLIPPAGE);
  var tooHigh = userSlippageTolerance !== types.SlippageTolerance.Auto && userSlippageTolerance.greaterThan(MAXIMUM_RECOMMENDED_SLIPPAGE);
  return /*#__PURE__*/React__default["default"].createElement(index$1, {
    testId: "max-slippage-settings",
    isOpen: isOpen,
    onToggle: function onToggle() {
      return setIsOpen(!isOpen);
    },
    header: /*#__PURE__*/React__default["default"].createElement(index["default"], {
      width: "auto"
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "KtLldi",
      message: "Max. slippage"
    })), /*#__PURE__*/React__default["default"].createElement(index$3, {
      text: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
        id: "gXdBQ2",
        message: "Your transaction will revert if the price changes unfavorably by more than this percentage."
      })
    })),
    button: /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, userSlippageTolerance === types.SlippageTolerance.Auto ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "R9Khdg",
      message: "Auto"
    }) : formatSlippage(userSlippageTolerance))
  }, /*#__PURE__*/React__default["default"].createElement(index.RowBetween, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(Switch, null, /*#__PURE__*/React__default["default"].createElement(Option, {
    onClick: function onClick() {
      // Reset the input field when switching to auto
      setSlippageInput("");
      setUserSlippageTolerance(types.SlippageTolerance.Auto);
    },
    isActive: userSlippageTolerance === types.SlippageTolerance.Auto
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "R9Khdg",
    message: "Auto"
  }))), /*#__PURE__*/React__default["default"].createElement(Option, {
    onClick: function onClick() {
      // When switching to custom slippage, use `auto` value as a default.
      setUserSlippageTolerance(autoSlippage);
    },
    isActive: userSlippageTolerance !== types.SlippageTolerance.Auto
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "8Tg/JR",
    message: "Custom"
  })))), /*#__PURE__*/React__default["default"].createElement(index$4.InputContainer, {
    gap: "md",
    error: !!slippageError
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Input, {
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
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, "%"))), tooLow || tooHigh ? /*#__PURE__*/React__default["default"].createElement(index.RowBetween, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.CautionTriangle, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "deprecated_accentWarning"
  }, tooLow ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "tElbXW",
    message: "Slippage below {0} may result in a failed transaction",
    values: {
      "0": formatSlippage(MINIMUM_RECOMMENDED_SLIPPAGE)
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "+DFtUf",
    message: "Your transaction may be frontrun and result in an unfavorable trade."
  }))) : null);
}

module.exports = MaxSlippageSettings;
