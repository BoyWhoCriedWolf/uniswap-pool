import React__default from 'react';
import _extends from '@babel/runtime/helpers/extends';
import Row, { AutoRow } from '../../components/Row/index.js';
import styled, { css } from 'styled-components';
import './index.js';
import { ThemedText } from './text.js';

const SegmentWrapper = styled(AutoRow)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  cursor: pointer;

  border-radius: 12px;
  padding: 6px;
  color: ${_ref => {
  let {
    theme
  } = _ref;
  return theme.neutral2;
}};
  gap: 4px;

  ${_ref2 => {
  let {
    theme,
    active
  } = _ref2;
  return active && css`
      background-color: ${theme.accent2};
      color: ${_ref3 => {
    let {
      theme
    } = _ref3;
    return theme.accent1;
  }};
    `;
}};

  :hover {
    background-color: ${_ref4 => {
  let {
    theme,
    active
  } = _ref4;
  return active ? theme.surface3 : theme.surface2;
}};
    color: ${_ref5 => {
  let {
    theme
  } = _ref5;
  return theme.neutral1;
}};
  }

  transition: ${_ref6 => {
  let {
    theme
  } = _ref6;
  return `${theme.transition.duration.medium} ${theme.transition.timing.ease}`;
}};
`;
function Segment(_ref7) {
  let {
    active,
    value,
    Icon,
    onSelect,
    testId,
    children
  } = _ref7;
  return /*#__PURE__*/React__default.createElement(SegmentWrapper, {
    active: active,
    onClick: () => onSelect?.(value),
    "data-testid": testId
  }, Icon && /*#__PURE__*/React__default.createElement(Icon, {
    size: 20,
    stroke: "currentColor"
  }), /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    color: "currentColor"
  }, children));
}
const SegmentedControlWrapper = styled(Row)`
  border-radius: 16px;
  gap: 4px;
  padding: 4px;
  outline: 1px solid ${_ref8 => {
  let {
    theme
  } = _ref8;
  return theme.surface3;
}};
  outline-offset: -1px;
`;
function SegmentedControl(_ref9) {
  let {
    selected,
    onSelect,
    children
  } = _ref9;
  return /*#__PURE__*/React__default.createElement(SegmentedControlWrapper, null, children.map((segment, index) => {
    if (segment?.type != Segment) {
      console.warn("<SegmentedControl> children must be of type <Segment>");
      return null;
    }
    return /*#__PURE__*/React__default.createElement(Segment, _extends({}, segment.props, {
      onSelect: segment.props.onSelect ?? onSelect,
      active: segment.props.active ?? segment.props.value === selected,
      key: `segment ${index}`
    }));
  }));
}

export { Segment, SegmentedControl };
