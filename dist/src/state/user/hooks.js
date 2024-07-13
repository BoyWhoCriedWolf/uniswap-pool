import { Percent } from '@uniswap/sdk-core';
import '@uniswap/v2-sdk';
import { useWeb3React } from '@web3-react/core';
import { L2_CHAIN_IDS } from '../../constants/chains.js';
import { L2_DEADLINE_FROM_NOW } from '../../constants/misc.js';
import JSBI from 'jsbi';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import '../../constants/routing.js';
import '@babel/runtime/helpers/defineProperty';
import '../../constants/chainInfo.js';
import '../../constants/lists.js';
import '@ethersproject/bytes';
import '@ethersproject/strings';
import '@uniswap/analytics-events';
import '../../analytics/index.js';
import '../../constants/providers.js';
import '../../constants/tokens.js';
import '../../featureFlags/index.js';
import '@ethersproject/address';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import '../../lib/state/multicall.js';
import '@uniswap/redux-multicall';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/possibleConstructorReturn';
import '@babel/runtime/helpers/getPrototypeOf';
import '@babel/runtime/helpers/inherits';
import '@babel/runtime/helpers/slicedToArray';
import '../../utils/listSort.js';
import { updateUserRouterPreference, updateHideClosedPositions, updateUserLocale, updateUserSlippageTolerance, addSerializedToken, updateHideBaseWalletBanner, updateUserDeadline } from './reducer.js';
import { SlippageTolerance } from './types.js';

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
  return useAppSelector(state => state.user.userLocale);
}
function useUserLocaleManager() {
  const dispatch = useAppDispatch();
  const locale = useUserLocale();
  const setLocale = useCallback(newLocale => {
    dispatch(updateUserLocale({
      userLocale: newLocale
    }));
  }, [dispatch]);
  return [locale, setLocale];
}
function useRouterPreference() {
  const dispatch = useAppDispatch();
  const routerPreference = useAppSelector(state => state.user.userRouterPreference);
  const setRouterPreference = useCallback(newRouterPreference => {
    dispatch(updateUserRouterPreference({
      userRouterPreference: newRouterPreference
    }));
  }, [dispatch]);
  return [routerPreference, setRouterPreference];
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
function useUserSlippageTolerance() {
  const userSlippageToleranceRaw = useAppSelector(state => {
    return state.user.userSlippageTolerance;
  });

  // TODO(WEB-1985): Keep `userSlippageTolerance` as Percent in Redux store and remove this conversion
  const userSlippageTolerance = useMemo(() => userSlippageToleranceRaw === SlippageTolerance.Auto ? SlippageTolerance.Auto : new Percent(userSlippageToleranceRaw, 10_000), [userSlippageToleranceRaw]);
  const dispatch = useAppDispatch();
  const setUserSlippageTolerance = useCallback(userSlippageTolerance => {
    let value;
    try {
      value = userSlippageTolerance === SlippageTolerance.Auto ? SlippageTolerance.Auto : JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient);
    } catch (error) {
      value = SlippageTolerance.Auto;
    }
    dispatch(updateUserSlippageTolerance({
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
  const [allowedSlippage] = useUserSlippageTolerance();
  return allowedSlippage === SlippageTolerance.Auto ? defaultSlippageTolerance : allowedSlippage;
}
function useUserHideClosedPositions() {
  const dispatch = useAppDispatch();
  const hideClosedPositions = useAppSelector(state => state.user.userHideClosedPositions);
  const setHideClosedPositions = useCallback(newHideClosedPositions => {
    dispatch(updateHideClosedPositions({
      userHideClosedPositions: newHideClosedPositions
    }));
  }, [dispatch]);
  return [hideClosedPositions, setHideClosedPositions];
}
function useUserTransactionTTL() {
  const {
    chainId
  } = useWeb3React();
  const dispatch = useAppDispatch();
  const userDeadline = useAppSelector(state => state.user.userDeadline);
  const onL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
  const deadline = onL2 ? L2_DEADLINE_FROM_NOW : userDeadline;
  const setUserDeadline = useCallback(userDeadline => {
    dispatch(updateUserDeadline({
      userDeadline
    }));
  }, [dispatch]);
  return [deadline, setUserDeadline];
}
function useAddUserToken() {
  const dispatch = useAppDispatch();
  return useCallback(token => {
    dispatch(addSerializedToken({
      serializedToken: serializeToken(token)
    }));
  }, [dispatch]);
}
function useHideBaseWalletBanner() {
  const dispatch = useAppDispatch();
  const hideBaseWalletBanner = useAppSelector(state => state.user.hideBaseWalletBanner);
  const toggleHideBaseWalletBanner = useCallback(() => {
    dispatch(updateHideBaseWalletBanner({
      hideBaseWalletBanner: true
    }));
  }, [dispatch]);
  return [hideBaseWalletBanner, toggleHideBaseWalletBanner];
}
function useUserDisabledUniswapX() {
  return useAppSelector(state => state.user.disabledUniswapX) ?? false;
}
function useUserOptedOutOfUniswapX() {
  return useAppSelector(state => state.user.optedOutOfUniswapX) ?? false;
}

export { serializeToken, useAddUserToken, useHideBaseWalletBanner, useRouterPreference, useUserDisabledUniswapX, useUserHideClosedPositions, useUserLocale, useUserLocaleManager, useUserOptedOutOfUniswapX, useUserSlippageTolerance, useUserSlippageToleranceWithDefault, useUserTransactionTTL };
