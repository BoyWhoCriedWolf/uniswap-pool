'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
require('@uniswap/v2-sdk');
var core = require('@web3-react/core');
var chains = require('../../constants/chains.cjs');
var misc = require('../../constants/misc.cjs');
var JSBI = require('jsbi');
var React = require('react');
var hooks = require('../hooks.cjs');
require('../../constants/routing.cjs');
require('@babel/runtime/helpers/defineProperty');
require('../../constants/chainInfo.cjs');
require('../../constants/lists.cjs');
require('@ethersproject/bytes');
require('@ethersproject/strings');
require('@uniswap/analytics-events');
require('../../analytics/index.cjs');
require('../../constants/providers.cjs');
require('../../constants/tokens.cjs');
require('../../featureFlags/index.cjs');
require('@ethersproject/address');
require('@ethersproject/constants');
require('@ethersproject/contracts');
require('../../lib/state/multicall.cjs');
require('@uniswap/redux-multicall');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/possibleConstructorReturn');
require('@babel/runtime/helpers/getPrototypeOf');
require('@babel/runtime/helpers/inherits');
require('../../utils/listSort.cjs');
var reducer = require('./reducer.cjs');
var types = require('./types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function serializeToken(token) {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name
  };
}
function useUserLocale() {
  return hooks.useAppSelector(function (state) {
    return state.user.userLocale;
  });
}
function useUserLocaleManager() {
  var dispatch = hooks.useAppDispatch();
  var locale = useUserLocale();
  var setLocale = React.useCallback(function (newLocale) {
    dispatch(reducer.updateUserLocale({
      userLocale: newLocale
    }));
  }, [dispatch]);
  return [locale, setLocale];
}
function useRouterPreference() {
  var dispatch = hooks.useAppDispatch();
  var routerPreference = hooks.useAppSelector(function (state) {
    return state.user.userRouterPreference;
  });
  var setRouterPreference = React.useCallback(function (newRouterPreference) {
    dispatch(reducer.updateUserRouterPreference({
      userRouterPreference: newRouterPreference
    }));
  }, [dispatch]);
  return [routerPreference, setRouterPreference];
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
function useUserSlippageTolerance() {
  var userSlippageToleranceRaw = hooks.useAppSelector(function (state) {
    return state.user.userSlippageTolerance;
  });

  // TODO(WEB-1985): Keep `userSlippageTolerance` as Percent in Redux store and remove this conversion
  var userSlippageTolerance = React.useMemo(function () {
    return userSlippageToleranceRaw === types.SlippageTolerance.Auto ? types.SlippageTolerance.Auto : new sdkCore.Percent(userSlippageToleranceRaw, 10000);
  }, [userSlippageToleranceRaw]);
  var dispatch = hooks.useAppDispatch();
  var setUserSlippageTolerance = React.useCallback(function (userSlippageTolerance) {
    var value;
    try {
      value = userSlippageTolerance === types.SlippageTolerance.Auto ? types.SlippageTolerance.Auto : JSBI__default["default"].toNumber(userSlippageTolerance.multiply(10000).quotient);
    } catch (error) {
      value = types.SlippageTolerance.Auto;
    }
    dispatch(reducer.updateUserSlippageTolerance({
      userSlippageTolerance: value
    }));
  }, [dispatch]);
  return [userSlippageTolerance, setUserSlippageTolerance];
}

/**
 *Returns user slippage tolerance, replacing the auto with a default value
 * @param defaultSlippageTolerance the value to replace auto with
 */
function useUserSlippageToleranceWithDefault(defaultSlippageTolerance) {
  var _useUserSlippageToler = useUserSlippageTolerance(),
    _useUserSlippageToler2 = _slicedToArray__default["default"](_useUserSlippageToler, 1),
    allowedSlippage = _useUserSlippageToler2[0];
  return allowedSlippage === types.SlippageTolerance.Auto ? defaultSlippageTolerance : allowedSlippage;
}
function useUserHideClosedPositions() {
  var dispatch = hooks.useAppDispatch();
  var hideClosedPositions = hooks.useAppSelector(function (state) {
    return state.user.userHideClosedPositions;
  });
  var setHideClosedPositions = React.useCallback(function (newHideClosedPositions) {
    dispatch(reducer.updateHideClosedPositions({
      userHideClosedPositions: newHideClosedPositions
    }));
  }, [dispatch]);
  return [hideClosedPositions, setHideClosedPositions];
}
function useUserTransactionTTL() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var dispatch = hooks.useAppDispatch();
  var userDeadline = hooks.useAppSelector(function (state) {
    return state.user.userDeadline;
  });
  var onL2 = Boolean(chainId && chains.L2_CHAIN_IDS.includes(chainId));
  var deadline = onL2 ? misc.L2_DEADLINE_FROM_NOW : userDeadline;
  var setUserDeadline = React.useCallback(function (userDeadline) {
    dispatch(reducer.updateUserDeadline({
      userDeadline: userDeadline
    }));
  }, [dispatch]);
  return [deadline, setUserDeadline];
}
function useAddUserToken() {
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function (token) {
    dispatch(reducer.addSerializedToken({
      serializedToken: serializeToken(token)
    }));
  }, [dispatch]);
}
function useHideBaseWalletBanner() {
  var dispatch = hooks.useAppDispatch();
  var hideBaseWalletBanner = hooks.useAppSelector(function (state) {
    return state.user.hideBaseWalletBanner;
  });
  var toggleHideBaseWalletBanner = React.useCallback(function () {
    dispatch(reducer.updateHideBaseWalletBanner({
      hideBaseWalletBanner: true
    }));
  }, [dispatch]);
  return [hideBaseWalletBanner, toggleHideBaseWalletBanner];
}
function useUserDisabledUniswapX() {
  var _useAppSelector;
  return (_useAppSelector = hooks.useAppSelector(function (state) {
    return state.user.disabledUniswapX;
  })) !== null && _useAppSelector !== void 0 ? _useAppSelector : false;
}
function useUserOptedOutOfUniswapX() {
  var _useAppSelector2;
  return (_useAppSelector2 = hooks.useAppSelector(function (state) {
    return state.user.optedOutOfUniswapX;
  })) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : false;
}

exports.serializeToken = serializeToken;
exports.useAddUserToken = useAddUserToken;
exports.useHideBaseWalletBanner = useHideBaseWalletBanner;
exports.useRouterPreference = useRouterPreference;
exports.useUserDisabledUniswapX = useUserDisabledUniswapX;
exports.useUserHideClosedPositions = useUserHideClosedPositions;
exports.useUserLocale = useUserLocale;
exports.useUserLocaleManager = useUserLocaleManager;
exports.useUserOptedOutOfUniswapX = useUserOptedOutOfUniswapX;
exports.useUserSlippageTolerance = useUserSlippageTolerance;
exports.useUserSlippageToleranceWithDefault = useUserSlippageToleranceWithDefault;
exports.useUserTransactionTTL = useUserTransactionTTL;
