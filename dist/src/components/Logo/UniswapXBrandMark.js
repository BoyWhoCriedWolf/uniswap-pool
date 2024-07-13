import React__default from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import '../../theme/components/index.js';
import UniswapXRouterLabel from '../RouterLabel/UniswapXRouterLabel.js';
import { ThemedText } from '../../theme/components/text.js';

var _excluded = ["fontWeight"];
function UniswapXBrandMark(_ref) {
  var fontWeight = _ref.fontWeight,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React__default.createElement(UniswapXRouterLabel, props, /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, _extends({
    fontSize: "inherit"
  }, fontWeight === "bold" && {
    fontWeight: "535"
  }), /*#__PURE__*/React__default.createElement(Trans, {
    id: "mzky5m",
    message: "UniswapX"
  })));
}

export { UniswapXBrandMark as default };
