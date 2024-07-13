'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Sentry = require('@sentry/react');
var noop = require('../utils/noop.cjs');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var Sentry__namespace = /*#__PURE__*/_interopNamespace(Sentry);

/* Utility type to mark all properties of a type as optional */

/**
 * This enhancer will automatically store the latest state in Sentry's scope, so that it will be available
 * in the Sentry dashboard when an exception happens.
 */
var sentryEnhancer = Sentry__namespace.createReduxEnhancer({
  /**
   * We don't want to store actions as breadcrumbs in Sentry, so we return null to disable the default behavior.
   */
  actionTransformer: noop,
  /**
   * We only want to store a subset of the state in Sentry, containing only the relevant parts for debugging.
   * Note: This function runs on every state update, so we're keeping it as fast as possible by avoiding any function
   * calls and deep object traversals.
   */
  stateTransformer: function stateTransformer(state) {
    var application = state.application,
      user = state.user,
      transactions = state.transactions;
    return {
      application: {
        fiatOnramp: application.fiatOnramp,
        chainId: application.chainId,
        openModal: application.openModal,
        popupList: application.popupList
      },
      user: {
        selectedWallet: user.selectedWallet,
        lastUpdateVersionTimestamp: user.lastUpdateVersionTimestamp,
        userLocale: user.userLocale,
        userRouterPreference: user.userRouterPreference,
        userHideClosedPositions: user.userHideClosedPositions,
        userSlippageTolerance: user.userSlippageTolerance,
        userSlippageToleranceHasBeenMigratedToAuto: user.userSlippageToleranceHasBeenMigratedToAuto,
        userDeadline: user.userDeadline,
        timestamp: user.timestamp,
        showSurveyPopup: user.showSurveyPopup
      },
      transactions: transactions
    };
  }
});

exports.sentryEnhancer = sentryEnhancer;
