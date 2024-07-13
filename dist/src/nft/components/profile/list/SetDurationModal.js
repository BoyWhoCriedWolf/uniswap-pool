import React__default, { useState, useReducer, useRef, useMemo, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside.js';
import ms from 'ms';
import { Column, Row } from '../../Flex.js';
import { NumericInput } from '../../layout/Input.js';
import { body, caption } from '../../../css/common.css.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import '../../../../hooks/useScreenSize.js';
import '../../../hooks/useNFTList.js';
import '../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import { ChevronDown, AlertTriangle } from 'react-feather';
import styled from 'styled-components';
import { Z_INDEX } from '../../../../theme/zIndex.js';
import { Dropdown } from './Dropdown.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var ModalWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  gap: 4px;\n  position: relative;\n"])));
var InputWrapper = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 6px 6px 6px 12px;\n  border: 1px solid;\n  position: relative;\n  height: 44px;\n  border-radius: 8px;\n  border-color: ", ";\n  width: 160px;\n  justify-content: space-between;\n"])), function (_ref) {
  var isInvalid = _ref.isInvalid,
    theme = _ref.theme;
  return isInvalid ? theme.critical : theme.surface3;
});
var DropdownPrompt = styled(Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  gap: 4px;\n  background-color: ", ";\n  cursor: pointer;\n  font-weight: 535;\n  font-size: 14px;\n  line-height: 16px;\n  border-radius: 8px;\n  padding: 6px 4px 6px 8px;\n  white-space: nowrap;\n  color: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.opacity.hover;
});
var DropdownChevron = styled(ChevronDown)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  height: 20px;\n  width: 20px;\n  color: ", ";\n  transform: ", ";\n  transition: ", ";\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral2;
}, function (_ref6) {
  var isOpen = _ref6.isOpen;
  return isOpen && "rotate(180deg)";
}, function (_ref7) {
  var _ref7$theme$transitio = _ref7.theme.transition,
    duration = _ref7$theme$transitio.duration,
    timing = _ref7$theme$transitio.timing;
  return "transform ".concat(duration.fast, " ").concat(timing.ease);
});
var DropdownContainer = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 48px;\n  right: 0px;\n  z-index: ", ";\n"])), Z_INDEX.dropdown);
var ErrorMessage = styled(Row)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  color: ", ";\n  gap: 4px;\n  position: absolute;\n  top: 44px;\n  white-space: nowrap;\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.critical;
});
var WarningIcon = styled(AlertTriangle)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 16px;\n  color: ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.critical;
});
var Duration = /*#__PURE__*/function (Duration) {
  Duration["hour"] = "hour";
  Duration["day"] = "day";
  Duration["week"] = "week";
  Duration["month"] = "month";
  return Duration;
}(Duration || {});
var ErrorState = /*#__PURE__*/function (ErrorState) {
  ErrorState[ErrorState["valid"] = 0] = "valid";
  ErrorState[ErrorState["empty"] = 1] = "empty";
  ErrorState[ErrorState["overMax"] = 2] = "overMax";
  return ErrorState;
}(ErrorState || {});
var SetDurationModal = function SetDurationModal() {
  var _useState = useState(Duration.day),
    _useState2 = _slicedToArray(_useState, 2),
    duration = _useState2[0],
    setDuration = _useState2[1];
  var _useState3 = useState("7"),
    _useState4 = _slicedToArray(_useState3, 2),
    amount = _useState4[0],
    setAmount = _useState4[1];
  var _useState5 = useState(ErrorState.valid),
    _useState6 = _slicedToArray(_useState5, 2),
    errorState = _useState6[0],
    setErrorState = _useState6[1];
  var setGlobalExpiration = useSellAsset(function (state) {
    return state.setGlobalExpiration;
  });
  var _useReducer = useReducer(function (s) {
      return !s;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    showDropdown = _useReducer2[0],
    toggleShowDropdown = _useReducer2[1];
  var durationDropdownRef = useRef(null);
  useOnClickOutside(durationDropdownRef, showDropdown ? toggleShowDropdown : undefined);
  var setCustomExpiration = function setCustomExpiration(event) {
    setAmount(event.target.value.length ? event.target.value : "");
  };
  var durationOptions = useMemo(function () {
    return [{
      displayText: "hours",
      isSelected: duration === Duration.hour,
      onClick: function onClick() {
        setDuration(Duration.hour);
        toggleShowDropdown();
      }
    }, {
      displayText: "days",
      isSelected: duration === Duration.day,
      onClick: function onClick() {
        setDuration(Duration.day);
        toggleShowDropdown();
      }
    }, {
      displayText: "weeks",
      isSelected: duration === Duration.week,
      onClick: function onClick() {
        setDuration(Duration.week);
        toggleShowDropdown();
      }
    }, {
      displayText: "months",
      isSelected: duration === Duration.month,
      onClick: function onClick() {
        setDuration(Duration.month);
        toggleShowDropdown();
      }
    }];
  }, [duration]);
  var prompt;
  switch (duration) {
    case Duration.hour:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "JC1A6G",
        message: "{amount, plural, =1 {hour} other {hours}}",
        values: {
          amount: amount
        }
      });
      break;
    case Duration.day:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "/TUNHz",
        message: "{amount, plural, =1 {day} other {days}}",
        values: {
          amount: amount
        }
      });
      break;
    case Duration.week:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "v3mlu/",
        message: "{amount, plural, =1 {week} other {weeks}}",
        values: {
          amount: amount
        }
      });
      break;
    case Duration.month:
      prompt = /*#__PURE__*/React__default.createElement(Trans, {
        id: "zo+8I3",
        message: "{amount, plural, =1 {month} other {months}}",
        values: {
          amount: amount
        }
      });
      break;
  }
  useEffect(function () {
    var expiration = convertDurationToExpiration(parseFloat(amount), duration);
    if (expiration * 1000 - Date.now() < ms("60s") || isNaN(expiration)) setErrorState(ErrorState.empty);else if (expiration * 1000 - Date.now() > ms("180d")) setErrorState(ErrorState.overMax);else setErrorState(ErrorState.valid);
    setGlobalExpiration(expiration);
  }, [amount, duration, setGlobalExpiration]);
  return /*#__PURE__*/React__default.createElement(ModalWrapper, {
    ref: durationDropdownRef
  }, /*#__PURE__*/React__default.createElement(InputWrapper, {
    isInvalid: errorState !== ErrorState.valid
  }, /*#__PURE__*/React__default.createElement(NumericInput, {
    as: "input",
    type: "number",
    pattern: "[0-9]",
    borderStyle: "none",
    className: body,
    color: {
      placeholder: "neutral2",
      "default": "neutral1"
    },
    value: amount,
    width: "40",
    marginRight: "4",
    backgroundColor: "none",
    onChange: setCustomExpiration,
    flexShrink: "0"
  }), /*#__PURE__*/React__default.createElement(DropdownPrompt, {
    onClick: toggleShowDropdown
  }, prompt, " ", /*#__PURE__*/React__default.createElement(DropdownChevron, {
    isOpen: showDropdown
  })), showDropdown && /*#__PURE__*/React__default.createElement(DropdownContainer, null, /*#__PURE__*/React__default.createElement(Dropdown, {
    dropDownOptions: durationOptions,
    width: 125
  }))), errorState !== ErrorState.valid && /*#__PURE__*/React__default.createElement(ErrorMessage, {
    className: caption
  }, " ", /*#__PURE__*/React__default.createElement(WarningIcon, null), " ", errorState === ErrorState.overMax ? "Maximum 6 months" : "Set duration"));
};
var convertDurationToExpiration = function convertDurationToExpiration(amount, duration) {
  var durationFactor = function durationFactor() {
    switch (duration) {
      case Duration.hour:
        return 1;
      case Duration.day:
        return 24;
      case Duration.week:
        return 24 * 7;
      default:
        // month
        return 24 * 30;
    }
  };
  return Math.round((Date.now() + ms("1h") * durationFactor() * amount) / 1000);
};

export { SetDurationModal };
