'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var analyticsEvents = require('@uniswap/analytics-events');
var index = require('../../analytics/index.cjs');
var misc = require('../../constants/misc.cjs');
var React = require('react');
var hooks = require('../hooks.cjs');
var reducer = require('./reducer.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function useModalIsOpen(modal) {
  var openModal = hooks.useAppSelector(function (state) {
    return state.application.openModal;
  });
  return openModal === modal;
}

/** @ref https://dashboard.moonpay.com/api_reference/client_side_api#ip_addresses */
function getMoonpayAvailability() {
  return _getMoonpayAvailability.apply(this, arguments);
}
function _getMoonpayAvailability() {
  _getMoonpayAvailability = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
    var _data$isBuyAllowed;
    var moonpayPublishableKey, moonpayApiURI, res, data;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // const moonpayPublishableKey = process.env.REACT_APP_MOONPAY_PUBLISHABLE_KEY;
          moonpayPublishableKey = "pk_test_DycfESRid31UaSxhI5yWKe1r5E5kKSz";
          if (moonpayPublishableKey) {
            _context2.next = 3;
            break;
          }
          throw new Error("Must provide a publishable key for moonpay.");
        case 3:
          // const moonpayApiURI = process.env.REACT_APP_MOONPAY_API;
          moonpayApiURI = "https://api.moonpay.com";
          if (moonpayApiURI) {
            _context2.next = 6;
            break;
          }
          throw new Error("Must provide an api endpoint for moonpay.");
        case 6:
          _context2.next = 8;
          return fetch("".concat(moonpayApiURI, "/v4/ip_address?apiKey=").concat(moonpayPublishableKey));
        case 8:
          res = _context2.sent;
          _context2.next = 11;
          return res.json();
        case 11:
          data = _context2.sent;
          return _context2.abrupt("return", (_data$isBuyAllowed = data.isBuyAllowed) !== null && _data$isBuyAllowed !== void 0 ? _data$isBuyAllowed : false);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getMoonpayAvailability.apply(this, arguments);
}
function useFiatOnrampAvailability(shouldCheck, callback) {
  var dispatch = hooks.useAppDispatch();
  var _useAppSelector = hooks.useAppSelector(function (state) {
      return state.application.fiatOnramp;
    }),
    available = _useAppSelector.available,
    availabilityChecked = _useAppSelector.availabilityChecked;
  var _useState = React.useState(null),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  React.useEffect(function () {
    function checkAvailability() {
      return _checkAvailability.apply(this, arguments);
    }
    function _checkAvailability() {
      _checkAvailability = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
        var result;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              setError(null);
              setLoading(true);
              _context.prev = 2;
              _context.next = 5;
              return getMoonpayAvailability();
            case 5:
              result = _context.sent;
              index.sendAnalyticsEvent(analyticsEvents.MoonpayEventName.MOONPAY_GEOCHECK_COMPLETED, {
                success: result
              });
              if (!stale) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return");
            case 9:
              dispatch(reducer.setFiatOnrampAvailability(result));
              if (result && callback) {
                callback();
              }
              _context.next = 20;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](2);
              console.error("Error checking onramp availability", _context.t0.toString());
              if (!stale) {
                _context.next = 18;
                break;
              }
              return _context.abrupt("return");
            case 18:
              setError("Error, try again later.");
              dispatch(reducer.setFiatOnrampAvailability(false));
            case 20:
              _context.prev = 20;
              if (!stale) setLoading(false);
              return _context.finish(20);
            case 23:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 13, 20, 23]]);
      }));
      return _checkAvailability.apply(this, arguments);
    }
    if (!availabilityChecked && shouldCheck) {
      checkAvailability();
    }
    var stale = false;
    return function () {
      stale = true;
    };
  }, [availabilityChecked, callback, dispatch, shouldCheck]);
  return {
    available: available,
    availabilityChecked: availabilityChecked,
    loading: loading,
    error: error
  };
}
function useToggleModal(modal) {
  var isOpen = useModalIsOpen(modal);
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function () {
    return dispatch(reducer.setOpenModal(isOpen ? null : modal));
  }, [dispatch, modal, isOpen]);
}
function useCloseModal() {
  var dispatch = hooks.useAppDispatch();
  var currentlyOpenModal = hooks.useAppSelector(function (state) {
    return state.application.openModal;
  });
  return React.useCallback(function (modalToClose) {
    if (!modalToClose) {
      // Close any open modal if no modal is specified.
      dispatch(reducer.setOpenModal(null));
    } else if (currentlyOpenModal === modalToClose) {
      // Close the currently open modal if it is the one specified.
      dispatch(reducer.setOpenModal(null));
    }
  }, [currentlyOpenModal, dispatch]);
}
function useOpenModal(modal) {
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function () {
    return dispatch(reducer.setOpenModal(modal));
  }, [dispatch, modal]);
}
function useToggleSettingsMenu() {
  return useToggleModal(reducer.ApplicationModal.SETTINGS);
}
function useShowClaimPopup() {
  return useModalIsOpen(reducer.ApplicationModal.CLAIM_POPUP);
}
function useToggleShowClaimPopup() {
  return useToggleModal(reducer.ApplicationModal.CLAIM_POPUP);
}
function useToggleSelfClaimModal() {
  return useToggleModal(reducer.ApplicationModal.SELF_CLAIM);
}

// returns a function that allows adding a popup
function useAddPopup() {
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function (content, key, removeAfterMs) {
    dispatch(reducer.addPopup({
      content: content,
      key: key,
      removeAfterMs: removeAfterMs !== null && removeAfterMs !== void 0 ? removeAfterMs : misc.DEFAULT_TXN_DISMISS_MS
    }));
  }, [dispatch]);
}

// returns a function that allows removing a popup via its key
function useRemovePopup() {
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function (key) {
    dispatch(reducer.removePopup({
      key: key
    }));
  }, [dispatch]);
}

// get the list of active popups
function useActivePopups() {
  var list = hooks.useAppSelector(function (state) {
    return state.application.popupList;
  });
  return React.useMemo(function () {
    return list.filter(function (item) {
      return item.show;
    });
  }, [list]);
}

exports.useActivePopups = useActivePopups;
exports.useAddPopup = useAddPopup;
exports.useCloseModal = useCloseModal;
exports.useFiatOnrampAvailability = useFiatOnrampAvailability;
exports.useModalIsOpen = useModalIsOpen;
exports.useOpenModal = useOpenModal;
exports.useRemovePopup = useRemovePopup;
exports.useShowClaimPopup = useShowClaimPopup;
exports.useToggleModal = useToggleModal;
exports.useToggleSelfClaimModal = useToggleSelfClaimModal;
exports.useToggleSettingsMenu = useToggleSettingsMenu;
exports.useToggleShowClaimPopup = useToggleShowClaimPopup;
