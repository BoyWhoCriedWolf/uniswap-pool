'use strict';

var React = require('react');
var core = require('@web3-react/core');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var PopupContent = require('./PopupContent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function PopupItem(_ref) {
  var removeAfterMs = _ref.removeAfterMs,
    content = _ref.content,
    popKey = _ref.popKey;
  var removePopup = hooks.useRemovePopup();
  var onClose = function onClose() {
    return removePopup(popKey);
  };
  React.useEffect(function () {
    if (removeAfterMs === null) return undefined;
    var timeout = setTimeout(function () {
      removePopup(popKey);
    }, removeAfterMs);
    return function () {
      clearTimeout(timeout);
    };
  }, [popKey, removeAfterMs, removePopup]);
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  switch (content.type) {
    case reducer.PopupType.Transaction:
      {
        return chainId ? /*#__PURE__*/React__default["default"].createElement(PopupContent.TransactionPopupContent, {
          hash: content.hash,
          chainId: chainId,
          onClose: onClose
        }) : null;
      }
    case reducer.PopupType.Order:
      {
        return /*#__PURE__*/React__default["default"].createElement(PopupContent.UniswapXOrderPopupContent, {
          orderHash: content.orderHash,
          onClose: onClose
        });
      }
    case reducer.PopupType.FailedSwitchNetwork:
      {
        return /*#__PURE__*/React__default["default"].createElement(PopupContent.FailedNetworkSwitchPopup, {
          chainId: content.failedSwitchNetwork,
          onClose: onClose
        });
      }
  }
}

module.exports = PopupItem;
