import 'react';
import styled from 'styled-components';
import { Z_INDEX } from '../theme/zIndex.js';

const BodyWrapper = styled.main`
  position: relative;
  max-width: ${_ref => {
  let {
    $maxWidth
  } = _ref;
  return $maxWidth ?? "420px";
}};
  width: 100%;
  background: ${_ref2 => {
  let {
    theme
  } = _ref2;
  return theme.surface1;
}};
  border-radius: 16px;
  border: 1px solid ${_ref3 => {
  let {
    theme
  } = _ref3;
  return theme.surface3;
}};
  margin-top: ${_ref4 => {
  let {
    $margin
  } = _ref4;
  return $margin ?? "1rem";
}};
  margin-left: auto;
  margin-right: auto;
  z-index: ${Z_INDEX.default};
  font-feature-settings: "ss01" on, "ss02" on, "cv01" on, "cv03" on;
`;

export { BodyWrapper };
