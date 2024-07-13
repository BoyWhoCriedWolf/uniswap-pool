import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import Tooltip from '../Tooltip/index.js';
import useCopyClipboard from '../../hooks/useCopyClipboard.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var Container = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  cursor: pointer;\n"])));
function GitVersionRow() {
  var _useCopyClipboard = useCopyClipboard(),
    _useCopyClipboard2 = _slicedToArray(_useCopyClipboard, 2),
    isCopied = _useCopyClipboard2[0],
    staticCopy = _useCopyClipboard2[1];
  return process.env.REACT_APP_GIT_COMMIT_HASH ? /*#__PURE__*/React__default.createElement(Container, {
    onClick: function onClick() {
      staticCopy(process.env.REACT_APP_GIT_COMMIT_HASH);
    }
  }, /*#__PURE__*/React__default.createElement(Tooltip, {
    text: "Copied",
    show: isCopied
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral3"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "csCoda",
    message: "Version:"
  }), " " + process.env.REACT_APP_GIT_COMMIT_HASH.substring(0, 6)))) : null;
}

export { GitVersionRow };
