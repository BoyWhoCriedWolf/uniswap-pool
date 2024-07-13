import React__default, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRemovePopup } from '../../state/application/hooks.js';
import { PopupType } from '../../state/application/reducer.js';
import { FailedNetworkSwitchPopup, UniswapXOrderPopupContent, TransactionPopupContent } from './PopupContent.js';

function PopupItem(_ref) {
  var removeAfterMs = _ref.removeAfterMs,
    content = _ref.content,
    popKey = _ref.popKey;
  var removePopup = useRemovePopup();
  var onClose = function onClose() {
    return removePopup(popKey);
  };
  useEffect(function () {
    if (removeAfterMs === null) return undefined;
    var timeout = setTimeout(function () {
      removePopup(popKey);
    }, removeAfterMs);
    return function () {
      clearTimeout(timeout);
    };
  }, [popKey, removeAfterMs, removePopup]);
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  switch (content.type) {
    case PopupType.Transaction:
      {
        return chainId ? /*#__PURE__*/React__default.createElement(TransactionPopupContent, {
          hash: content.hash,
          chainId: chainId,
          onClose: onClose
        }) : null;
      }
    case PopupType.Order:
      {
        return /*#__PURE__*/React__default.createElement(UniswapXOrderPopupContent, {
          orderHash: content.orderHash,
          onClose: onClose
        });
      }
    case PopupType.FailedSwitchNetwork:
      {
        return /*#__PURE__*/React__default.createElement(FailedNetworkSwitchPopup, {
          chainId: content.failedSwitchNetwork,
          onClose: onClose
        });
      }
  }
}

export { PopupItem as default };
