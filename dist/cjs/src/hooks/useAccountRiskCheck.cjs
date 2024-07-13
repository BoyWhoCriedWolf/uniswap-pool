'use strict';

var ms = require('ms');
var React = require('react');
var reducer = require('../state/application/reducer.cjs');
var hooks = require('../state/hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function useAccountRiskCheck(account) {
  var dispatch = hooks.useAppDispatch();
  React.useEffect(function () {
    if (account) {
      var riskCheckLocalStorageKey = "risk-check-".concat(account);
      var now = Date.now();
      try {
        // Check local browser cache
        var storedTime = localStorage.getItem(riskCheckLocalStorageKey);
        var checkExpirationTime = storedTime ? parseInt(storedTime) : now - 1;
        if (checkExpirationTime < Date.now()) {
          var headers = new Headers({
            "Content-Type": "application/json"
          });
          fetch("https://api.uniswap.org/v1/screen", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              address: account
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            if (data.block) {
              dispatch(reducer.setOpenModal(reducer.ApplicationModal.BLOCKED_ACCOUNT));
            }
          })["catch"](function () {
            dispatch(reducer.setOpenModal(null));
          });
        }
      } finally {
        // Set item to have 1 day local cache storage
        localStorage.setItem(riskCheckLocalStorageKey, (now + ms__default["default"]("1d")).toString());
      }
    }
  }, [account, dispatch]);
}

module.exports = useAccountRiskCheck;
