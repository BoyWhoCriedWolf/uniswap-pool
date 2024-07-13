import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import Expand from '../../Expand/index.js';
import QuestionHelper from '../../QuestionHelper/index.js';
import Row from '../../Row/index.js';
import { InputContainer, Input } from '../Input/index.js';
import { DEFAULT_DEADLINE_FROM_NOW } from '../../../constants/misc.js';
import ms from 'ms';
import React__default, { useState } from 'react';
import { useUserTransactionTTL } from '../../../state/user/hooks.js';
import '../../../theme/components/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var DeadlineError = /*#__PURE__*/function (DeadlineError) {
  DeadlineError["InvalidInput"] = "InvalidInput";
  return DeadlineError;
}(DeadlineError || {});
var THREE_DAYS_IN_SECONDS = ms("3d") / 1000;
var NUMBERS_ONLY = /^[0-9\b]+$/;
function TransactionDeadlineSettings() {
  var _useUserTransactionTT = useUserTransactionTTL(),
    _useUserTransactionTT2 = _slicedToArray(_useUserTransactionTT, 2),
    deadline = _useUserTransactionTT2[0],
    setDeadline = _useUserTransactionTT2[1];
  var defaultInputValue = deadline && deadline !== DEFAULT_DEADLINE_FROM_NOW ? (deadline / 60).toString() : "";

  // If user has previously entered a custom deadline, we want to show that value in the input field
  // instead of a placeholder by defualt
  var _useState = useState(defaultInputValue),
    _useState2 = _slicedToArray(_useState, 2),
    deadlineInput = _useState2[0],
    setDeadlineInput = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    deadlineError = _useState4[0],
    setDeadlineError = _useState4[1];

  // If user has previously entered a custom deadline, we want to show the settings expanded by default.
  var _useState5 = useState(defaultInputValue.length > 0),
    _useState6 = _slicedToArray(_useState5, 2),
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
      setDeadline(DEFAULT_DEADLINE_FROM_NOW);
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
  return /*#__PURE__*/React__default.createElement(Expand, {
    isOpen: isOpen,
    onToggle: function onToggle() {
      return setIsOpen(!isOpen);
    },
    testId: "transaction-deadline-settings",
    header: /*#__PURE__*/React__default.createElement(Row, {
      width: "auto"
    }, /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "T9SU2H",
      message: "Transaction deadline"
    })), /*#__PURE__*/React__default.createElement(QuestionHelper, {
      text: /*#__PURE__*/React__default.createElement(Trans, {
        id: "Db/8lT",
        message: "Your transaction will revert if it is pending for more than this period of time."
      })
    })),
    button: /*#__PURE__*/React__default.createElement(Trans, {
      id: "ZSWUwq",
      message: "{0}m",
      values: {
        "0": deadline / 60
      }
    })
  }, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(InputContainer, {
    gap: "md",
    error: !!deadlineError
  }, /*#__PURE__*/React__default.createElement(Input, {
    "data-testid": "deadline-input",
    placeholder: (DEFAULT_DEADLINE_FROM_NOW / 60).toString(),
    value: deadlineInput,
    onChange: function onChange(e) {
      return parseCustomDeadline(e.target.value);
    },
    onBlur: function onBlur() {
      // When the input field is blurred, reset the input field to the current deadline
      setDeadlineInput(defaultInputValue);
      setDeadlineError(false);
    }
  }), /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "H9HlDe",
    message: "minutes"
  })))));
}

export { TransactionDeadlineSettings as default };
