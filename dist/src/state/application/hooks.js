import { MoonpayEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { DEFAULT_TXN_DISMISS_MS } from '../../constants/misc.js';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks.js';
import { setOpenModal, ApplicationModal, addPopup, removePopup, setFiatOnrampAvailability } from './reducer.js';

function useModalIsOpen(modal) {
  const openModal = useAppSelector(state => state.application.openModal);
  return openModal === modal;
}

/** @ref https://dashboard.moonpay.com/api_reference/client_side_api#ip_addresses */

async function getMoonpayAvailability() {
  // const moonpayPublishableKey = process.env.REACT_APP_MOONPAY_PUBLISHABLE_KEY;
  const moonpayPublishableKey = "pk_test_DycfESRid31UaSxhI5yWKe1r5E5kKSz";
  // const moonpayApiURI = process.env.REACT_APP_MOONPAY_API;
  const moonpayApiURI = "https://api.moonpay.com";
  const res = await fetch(`${moonpayApiURI}/v4/ip_address?apiKey=${moonpayPublishableKey}`);
  const data = await res.json();
  return data.isBuyAllowed ?? false;
}
function useFiatOnrampAvailability(shouldCheck, callback) {
  const dispatch = useAppDispatch();
  const {
    available,
    availabilityChecked
  } = useAppSelector(state => state.application.fiatOnramp);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function checkAvailability() {
      setError(null);
      setLoading(true);
      try {
        const result = await getMoonpayAvailability();
        sendAnalyticsEvent(MoonpayEventName.MOONPAY_GEOCHECK_COMPLETED, {
          success: result
        });
        if (stale) return;
        dispatch(setFiatOnrampAvailability(result));
        if (result && callback) {
          callback();
        }
      } catch (e) {
        console.error("Error checking onramp availability", e.toString());
        if (stale) return;
        setError("Error, try again later.");
        dispatch(setFiatOnrampAvailability(false));
      } finally {
        if (!stale) setLoading(false);
      }
    }
    if (!availabilityChecked && shouldCheck) {
      checkAvailability();
    }
    let stale = false;
    return () => {
      stale = true;
    };
  }, [availabilityChecked, callback, dispatch, shouldCheck]);
  return {
    available,
    availabilityChecked,
    loading,
    error
  };
}
function useToggleModal(modal) {
  const isOpen = useModalIsOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(isOpen ? null : modal)), [dispatch, modal, isOpen]);
}
function useCloseModal() {
  const dispatch = useAppDispatch();
  const currentlyOpenModal = useAppSelector(state => state.application.openModal);
  return useCallback(modalToClose => {
    if (!modalToClose) {
      // Close any open modal if no modal is specified.
      dispatch(setOpenModal(null));
    } else if (currentlyOpenModal === modalToClose) {
      // Close the currently open modal if it is the one specified.
      dispatch(setOpenModal(null));
    }
  }, [currentlyOpenModal, dispatch]);
}
function useOpenModal(modal) {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}
function useToggleSettingsMenu() {
  return useToggleModal(ApplicationModal.SETTINGS);
}
function useShowClaimPopup() {
  return useModalIsOpen(ApplicationModal.CLAIM_POPUP);
}
function useToggleShowClaimPopup() {
  return useToggleModal(ApplicationModal.CLAIM_POPUP);
}
function useToggleSelfClaimModal() {
  return useToggleModal(ApplicationModal.SELF_CLAIM);
}

// returns a function that allows adding a popup
function useAddPopup() {
  const dispatch = useAppDispatch();
  return useCallback((content, key, removeAfterMs) => {
    dispatch(addPopup({
      content,
      key,
      removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS
    }));
  }, [dispatch]);
}

// returns a function that allows removing a popup via its key
function useRemovePopup() {
  const dispatch = useAppDispatch();
  return useCallback(key => {
    dispatch(removePopup({
      key
    }));
  }, [dispatch]);
}

// get the list of active popups
function useActivePopups() {
  const list = useAppSelector(state => state.application.popupList);
  return useMemo(() => list.filter(item => item.show), [list]);
}

export { useActivePopups, useAddPopup, useCloseModal, useFiatOnrampAvailability, useModalIsOpen, useOpenModal, useRemovePopup, useShowClaimPopup, useToggleModal, useToggleSelfClaimModal, useToggleSettingsMenu, useToggleShowClaimPopup };
