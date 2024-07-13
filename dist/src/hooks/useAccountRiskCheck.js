import ms from 'ms';
import { useEffect } from 'react';
import { setOpenModal, ApplicationModal } from '../state/application/reducer.js';
import { useAppDispatch } from '../state/hooks.js';

function useAccountRiskCheck(account) {
  var dispatch = useAppDispatch();
  useEffect(function () {
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
              dispatch(setOpenModal(ApplicationModal.BLOCKED_ACCOUNT));
            }
          })["catch"](function () {
            dispatch(setOpenModal(null));
          });
        }
      } finally {
        // Set item to have 1 day local cache storage
        localStorage.setItem(riskCheckLocalStorageKey, (now + ms("1d")).toString());
      }
    }
  }, [account, dispatch]);
}

export { useAccountRiskCheck as default };
