'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index$2 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../Expand/index.cjs');
var index$3 = require('../../QuestionHelper/index.cjs');
var index$1 = require('../../Row/index.cjs');
var index$4 = require('../Input/index.cjs');
var misc = require('../../../constants/misc.cjs');
var ms = require('ms');
var React = require('react');
var hooks = require('../../../state/user/hooks.cjs');
require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DeadlineError = /*#__PURE__*/function (DeadlineError) {
  DeadlineError["InvalidInput"] = "InvalidInput";
  return DeadlineError;
}(DeadlineError || {});
var THREE_DAYS_IN_SECONDS = ms__default["default"]("3d") / 1000;
var NUMBERS_ONLY = /^[0-9\b]+$/;
function TransactionDeadlineSettings() {
  var _useUserTransactionTT = hooks.useUserTransactionTTL(),
    _useUserTransactionTT2 = _slicedToArray__default["default"](_useUserTransactionTT, 2),
    deadline = _useUserTransactionTT2[0],
    setDeadline = _useUserTransactionTT2[1];
  var defaultInputValue = deadline && deadline !== misc.DEFAULT_DEADLINE_FROM_NOW ? (deadline / 60).toString() : "";

  // If user has previously entered a custom deadline, we want to show that value in the input field
  // instead of a placeholder by defualt
  var _useState = React.useState(defaultInputValue),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    deadlineInput = _useState2[0],
    setDeadlineInput = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    deadlineError = _useState4[0],
    setDeadlineError = _useState4[1];

  // If user has previously entered a custom deadline, we want to show the settings expanded by default.
  var _useState5 = React.useState(defaultInputValue.length > 0),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    isOpen = _useState6[0],
    setIsOpen = _useState6[1];
  function parseCustomDeadline(value) {
    // Do not allow non-numerical characters in the input field
    if (value.length > 0 && !NUMBERS_ONLY.test(value)) {
      return;
    }
    setDeadlineInput(value);
    setDeadlineError(false);

    // If the input is empty, set the deadline to the default
    if (value.length === 0) {
      setDeadline(misc.DEFAULT_DEADLINE_FROM_NOW);
      return;
    }

    // Parse user input and set the deadline if valid, error otherwise
    try {
      var parsed = Number.parseInt(value) * 60;
      if (parsed === 0 || parsed > THREE_DAYS_IN_SECONDS) {
        setDeadlineError(DeadlineError.InvalidInput);
      } else {
        setDeadline(parsed);
      }
    } catch (error) {
      setDeadlineError(DeadlineError.InvalidInput);
    }
  }
  return /*#__PURE__*/React__default["default"].createElement(index, {
    isOpen: isOpen,
    onToggle: function onToggle() {
      return setIsOpen(!isOpen);
    },
    testId: "transaction-deadline-settings",
    header: /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
      width: "auto"
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "T9SU2H",
      message: "Transaction deadline"
    })), /*#__PURE__*/React__default["default"].createElement(index$3, {
      text: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
        id: "Db/8lT",
        message: "Your transaction will revert if it is pending for more than this period of time."
      })
    })),
    button: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "ZSWUwq",
      message: "{0}m",
      values: {
        "0": deadline / 60
      }
    })
  }, /*#__PURE__*/React__default["default"].createElement(index$1["default"], null, /*#__PURE__*/React__default["default"].createElement(index$4.InputContainer, {
    gap: "md",
    error: !!deadlineError
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Input, {
    "data-testid": "deadline-input",
    placeholder: (misc.DEFAULT_DEADLINE_FROM_NOW / 60).toString(),
    value: deadlineInput,
    onChange: function onChange(e) {
      return parseCustomDeadline(e.target.value);
    },
    onBlur: function onBlur() {
      // When the input field is blurred, reset the input field to the current deadline
      setDeadlineInput(defaultInputValue);
      setDeadlineError(false);
    }
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "H9HlDe",
    message: "minutes"
  })))));
}

module.exports = TransactionDeadlineSettings;
