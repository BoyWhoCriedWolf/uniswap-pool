import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import Badge from '../Badge/index.js';
import { PoolState } from '../../hooks/usePools.js';
import React__default from 'react';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

function FeeTierPercentageBadge(_ref) {
  var _distributions$feeAmo;
  var feeAmount = _ref.feeAmount,
    distributions = _ref.distributions,
    poolState = _ref.poolState;
  return /*#__PURE__*/React__default.createElement(Badge, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    fontSize: 10
  }, !distributions || poolState === PoolState.NOT_EXISTS || poolState === PoolState.INVALID ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "cKHbrZ",
    message: "Not created"
  }) : distributions[feeAmount] !== undefined ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "P1NNMy",
    message: "{0}% select",
    values: {
      "0": (_distributions$feeAmo = distributions[feeAmount]) === null || _distributions$feeAmo === void 0 ? void 0 : _distributions$feeAmo.toFixed(0)
    }
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "plhHQt",
    message: "No data"
  })));
}

export { FeeTierPercentageBadge };
